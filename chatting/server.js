const express = require( 'express' ),
  app = express(),
  http = require( 'http' ).Server( app ),
  io = require( 'socket.io' )( http ),
  upload = require( 'express-fileupload' ),
  moment = require( 'moment' ),
  multer = require( 'multer' ),
  upload_setting = multer( {
    dest: "../images/"
  } );




var url = require( 'url' );

app.use( upload() );

// const server = app.listen(3000, () =>{
//   console.log("start server : localhost:3000");
// });


app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
app.engine( 'html', require( 'ejs' ).renderFile );

app.use( express.json() );
app.use( express.urlencoded( {
  extended: true
} ) )

app.use( "/newroom", require( "./routes/chat_room_result" ) );
// app.use("/open_chat", require("./routes/chat_room_member"));



var mysql = require( 'mysql' );
var pool = mysql.createPool( {
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'tkfkdgo',
  port: 3306,
  database: 'userinfo',
  multipleStatements: true
  // insecureAuth : true
} );



app.get( '/chat_home', function( req, res ) {


  // 로그인 한 상태로 chat_home 을 접근한 경우 query string 상에 user_id 로 user 구분됨
  // user_id 가 값이 있는 경우 db에서 user info 데이터 가져옴
  var queryData = url.parse( req.url, true ).query;
  var user_id = queryData.id;


  if ( user_id != "" || user_id != undefined ) {

    pool.getConnection( function( err, connection ) {
      if ( err ) throw err; // not connected!

      var open_chat_query = `

      SELECT o.*, 
        (SELECT COUNT(*) FROM open_chat_member m WHERE o.open_chat_no = m.open_chat_no) AS join_member_qty

      FROM 
        open_chat o

      WHERE o.deleted=0 ORDER BY o.open_chat_no DESC`

      connection.query( open_chat_query, function( error, results, fields ) {
        connection.release();

        if ( error ) throw error;
        // console.log( results );

        res.render( 'chat_home.html', {
          open_chat_data: results,
          userId: user_id
        } );

      } );
    } );
  }


} );

// setting html 만들어야함.
app.get( '/chat_setting', function( req, res ) {
  res.render( 'index.html' );
} );



// 채팅화면으로 들어오는 경로
app.get( '/chat_room', function( req, res ) {


  // chat_room 을 들어오는 경로는 총 3가지
  // 1) 왼쪽 tap버튼 클릭으로 들어오는 경우 url파라미터에 user_id 만 존재 => 해당 user_id 를 통해 연결된 모든 채팅방을 load
  // 2) 오픈채팅방 목록에서 룸 참여하기를 클릭했을때 redirect로 url 상에 room_type과 room_no를 받아옴 => 해당room 을 보여줌  
  // 3) 1:1 채팅을 신청했을때 url 상에 room_type과 room_no를 받아옴 =>해당 room을 보여줌

  var queryData = url.parse( req.url, true ).query;
  var user_id = queryData.id;

  if ( user_id != "" || user_id != undefined ) {

    var room_type = queryData.room_type;
    var room_no = queryData.room_no;




    pool.getConnection( function( err, connection ) {
      if ( err ) throw err; // not connected!

      var open_chat_query =
        `SELECT o.*, m.last_visit_time, m.last_leave_time, 
      (SELECT COUNT(*) FROM open_chat_member c WHERE c.open_chat_no=m.open_chat_no GROUP BY open_chat_no) AS member_count
    
     FROM 
       open_chat AS o  
    
     JOIN 
       open_chat_member AS m ON m.open_chat_no = o.open_chat_no 
    
     WHERE m.member_id='${user_id}' AND o.deleted = 0
    
     ORDER BY o.last_message_time DESC;`;

      var user_info_query = 'SELECT * FROM topic WHERE id = \'' + user_id + '\';';

      var open_chat_member_query =
        `SELECT o.open_chat_no, t.nickname, t.profileimg, t.id

     FROM 
        open_chat AS o  
     LEFT JOIN 
        open_chat_member AS m ON m.open_chat_no = o.open_chat_no 
      
     LEFT JOIN 
        topic AS t ON m.member_id = t.id 
      
     WHERE o.deleted=0
      
     ORDER BY m.join_date ASC;`;

      connection.query( open_chat_query + user_info_query + open_chat_member_query, function( error, results, fields ) {
        connection.release();

        if ( error ) throw error;

        // console.log( results[ 0 ] );
        // console.log(results[1]);
        // console.log( results[ 2 ] );

        res.render( 'chat_room.html', {
          open_chat_room_data: results[ 0 ],
          join_user_data: results[ 1 ],
          open_chat_member: results[ 2 ],
          userId: user_id
        } );

      } );
    } );

  }
} );

io.sockets.on( 'connection', function( socket ) {
  console.log( 'user connected: ', socket.id );


  socket.on( 'join_room', function( data, fn ) {
    console.log( socket.rooms );

    var room_id = data.room_id; // 입장하려는 방의 room_id 는 "open_chat_1" 이런식으로 넘어옴
    var room_no = room_id.split( '_' )[ 2 ]; // 현재 입장하려하는 room 의 넘버만 가져옴

    var now_time_long = new Date().valueOf(); // 현재시간


    // join_room 이 호출되면 room_id의 방으로 입장하게 된다
    socket.join( data.room_id, function() {} );
    console.log( '192 라인 socket id : ' + socket.id )
    console.log( '193 라인 user connected join: ', data.user_id + ' 룸 넘버 ' + data.room_id, data.member_type, data.before_visit_room_id );



    if ( data.before_visit_room_id != '' && data.before_visit_room_id != undefined ) {

      var before_room_id = data.before_visit_room_id;
      var before_room_no = before_room_id.split( '_' )[ 2 ]; // 기존 입장했었던 room 의 넘버만 가져옴


      // user 기존 방문했었던 채팅방의 나간시간을 저장
      pool.getConnection( function( err, connection ) {
        if ( err ) throw err; // not connected!

        var open_chat_leave_time_query =

          `UPDATE open_chat_member 
     
             SET 
               last_leave_time = ${now_time_long}
             
             WHERE 
               open_chat_no = ${before_room_no} AND member_id = '${data.user_id}';`;

        connection.query( open_chat_leave_time_query, function( error, results, fields ) {
          connection.release();

          if ( error ) throw error;

        } );
      } );
    }

    // user 의 채팅방 방문시간을 저장
    pool.getConnection( function( err, connection ) {
      if ( err ) throw err; // not connected!

      var open_chat_visit_time_query =

        `UPDATE open_chat_member 
     
             SET 
               last_visit_time = ${now_time_long}
             
             WHERE 
               open_chat_no = ${room_no} AND member_id = '${data.user_id}';`;

      connection.query( open_chat_visit_time_query, function( error, results, fields ) {
        connection.release();

        if ( error ) throw error;

      } );
    } );


    pool.getConnection( function( err, connection ) {
      if ( err ) throw err; // not connected!


      // room_id 가 open_chat 인 경우 open_chat_conversation 의 테이블조회 쿼리 작성
      // room_id 가 person_chat 인 경우 person_chat_conversation 의 테이블조회 쿼리 작성
      if ( room_id.substr( 0, 1 ) == 'o' ) {


        var chat_conversation_query =

          `SELECT c.*, t.nickname, t.profileimg

                    FROM 
                      open_chat_conversation AS c 
                      
                    LEFT JOIN 
                      topic AS t ON 
                      c.sent_id = t.id 
                      
                    WHERE c.open_chat_no = ${room_no}

                    ORDER BY sent_time ASC;`


        var chat_room_info =

          `SELECT o.*, m.member_id, t.nickname, t.profileimg

                    FROM 
                      open_chat AS o 

                    LEFT JOIN 
                      open_chat_member AS m ON 
                      o.open_chat_no = m.open_chat_no 

                    LEFT JOIN 
                      topic AS t ON 
                      m.member_id = t.id

                    WHERE o.open_chat_no = ${room_no} ORDER BY m.join_date ASC;`;

      } else if ( room_id.substr( 0, 1 ) == 'p' ) {

        var chat_conversation_query =

          `SELECT c.*, t.nickname, t.profileimg

                      FROM 
                        personal_chat_conversation AS c 
                        
                      LEFT JOIN 
                        topic AS t ON 
                        c.sent_id = t.id 
                        
                      WHERE c.open_chat_no = ${room_no}

                      ORDER BY sent_time ASC;`;



      }

      connection.query( chat_conversation_query + chat_room_info, function( error, results, fields ) {
        connection.release();

        if ( error ) throw error;

        // console.log(results[0]);
        // console.log(results[1]);


        io.to( socket.id ).emit( 'chat_data', results[ 0 ], results[ 1 ] );


      } );
    } );


  } )


  // 클라이언트에서 전달된 채팅내용을 db에 저장 후 현재 접속중인 룸에만 emit 
  socket.on( 'chat', function( user_id, nickname, profile, text, room_id, now_time, message_type ) {

    console.log( 'chat 클라이언트에서 보낸 room_id', room_id )
    // console.log('sand_chat_message_room_id', user_id + nickname + profile + text + room_id + now_time + message_type);

    // 오픈채팅방에서 마지막 채팅을 대화를 보여주는 부분에서 
    // 마지막 전송된 chat대화가 file 형태인 경우 '사진을 보냈습니다.' 로 임의 저장해줌 
    // 마지막 전송 대회가 text 형태인 경우 마지막 대화 text자체를 저장해줌
    var chat_room_last_message = text; // 파일을 전송할 경우 채팅방의 마지막메시지 
    var message_fixed = text; // 일반 text일때

    if ( message_type == 'file' ) {
      chat_room_last_message = '사진을 보냈습니다.';

    }


    var room_no = room_id.substr( room_id.length - 1, 1 );
    var user_id_var = user_id;


    pool.getConnection( function( err, connection ) {
      if ( err ) throw err; // not connected!

      console.log( '채팅 저장', user_id + room_id + message_type );

      // open_chat 채팅방 정보테이블에 last 메시지와, last 메시지가 전송된 시간을 update
      var open_chat_last_message_query =

        `UPDATE open_chat 

            SET 
              last_message = '${chat_room_last_message}', last_message_time = ${now_time}
            
            WHERE 
              open_chat_no = ${room_no};`;


      // open_chat_conversation 테이블에 대화내용 저장
      var open_chat_conversation_query =

        `INSERT INTO open_chat_conversation 
              (open_chat_no, sent_time, sent_id, sent_message, message_type) 
            
            VALUES
              (${room_no},${now_time},'${user_id_var}','${message_fixed}','${message_type}');`


      connection.query( open_chat_last_message_query + open_chat_conversation_query, function( error, results, fields ) {
        connection.release();
        if ( error ) throw error;

      } );
    } );


    console.log('in 을 발송하는 socket id 넘버' + room_id);
    io.in( room_id ).emit( 'chat', user_id, nickname, profile, message_fixed, now_time, message_type );
  } );



  socket.on( 'leave', function( room_id, fn ) {
    console.log( 'user leave: ', room_id );
    socket.leave( room_id, function() {
      if ( fn )
        fn();
    } );
  } );


  socket.on( 'disconnecting', function() {
    console.log( 'user disconnecting: ', socket.id + socket.rooms );

  } );


} );



// 채팅룸 나가기 클릭한경우
app.get( '/chat_room/exit', function( req, res ) {

  var queryData = url.parse( req.url, true ).query;
  var user_id = queryData.userId;
  var room_no = queryData.room_no;

  console.log( room_no + user_id );


  pool.getConnection( function( err, connection ) {
    if ( err ) throw err; // not connected!

    var exit_room_query = `DELETE FROM open_chat_member WHERE open_chat_no = ${room_no} AND member_id = '${user_id}';`

    connection.query( exit_room_query, function( error, results, fields ) {
      connection.release();

      if ( error ) throw error;

    } );
  } );

  res.send( {
    response: 'ok'
  } );
} );

// 채팅창에 이미지 발송시 ajax를 통해 이미지파일 서버에 업로드
app.post( '/chat_room/upload', upload_setting.single( 'send_photo' ), function( req, res ) {

  console.log( req.files );
  // console.log(req.body.file)




  res.send( {
    response: 'ok'
  } );
} );




http.listen( 3000, function() {
  console.log( 'server on running' );
} );







function get_userinfo( user_id ) {

  pool.query( 'SELECT * FROM topic WHERE id =?', [ user_id ], function( err, results, fields ) {
    if ( err ) throw err; // not connected!

    console.log( results[ 0 ].id );

    return results;

  } )
  // pool.getConnection(function(err, connection) {
  //   if (err) throw err; // not connected!

  //   // Use the connection
  //   connection.query('SELECT * FROM topic WHERE id =?',[user_id], function (error, results, fields) {

  //     // console.log(results[0].id);
  //     // return JSON.stringify(results);
  //     // When done with the connection, release it.
  //     connection.release();

  //     // Handle error after the release.
  //     if (error) throw error;

  //     return results[0];

  //     // Don't use the connection here, it has been returned to the pool.
  //   });
  // });
}

app.get( '/db', function( req, res ) {
  pool.getConnection( function( err, connection ) {
    if ( err ) throw err; // not connected!

    // Use the connection
    connection.query( 'SELECT * FROM topic', function( error, results, fields ) {
      res.send( JSON.stringify( results ) );
      console.log( 'result:' + results );
      // When done with the connection, release it.
      connection.release();

      // Handle error after the release.
      if ( error ) throw error;

      // Don't use the connection here, it has been returned to the pool.
    } );
  } );
} );


// const mysql = require("mysql"),
//       util = require("util"),
//       Promise = require("bluebird");

// Promise.promisifyAll(mysql);
// Promise.promisifyAll(require("mysql/lib/Connection").prototype);
// Promise.promisifyAll(require("mysql/lib/Pool").prototype);

// const DB_INFO = {
//   host : '127.0.0.1',
//   user : 'root',
//   password : 'tkfkdgo',
//   database : 'userinfo',
//   multipleStatements : true,
//   connectionLinit : 5,
//   waitForConnections : false
// };

// module.exports = class {
//   constructor(dbinfo) {
//     dbinfo = dbinfo || DB_INFO;
//     this.pool = mysql.createPool(dbinfo);
//   }

//   connect() {
//     return this.pool.getConnectionAsync().disposer(conn => {
//       return conn.release();
//     })
//   }

//   end() {
//     this.pool.end( function(err) {
//       util.log(">>>>>>>>>>>>>>>>> End of Pool !!");
//       if(err){
//         util.log("ERR pool ending!!");
//       }
//     })
//   }
// }
