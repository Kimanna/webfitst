
const express = require('express');
var router = express.Router();
var qs = require('querystring');
 

var mysql      = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host     : '127.0.0.1',
  user     : 'root',
  password : 'tkfkdgo',
  port: 3306,
  database : 'userinfo',
  // insecureAuth : true
});
 
/* POST */
router.post('/', function(req, res, next) {
  console.log("## post request : "+req.body.chat_room_title); 
  
  
  var action = req.body.action; // 방 생성인지, 수정인지 구분

  var user_id = req.body.userId;
  var room_title = req.body.chat_room_title;
  var room_member = req.body.chat_room_member;
  var room_intro = req.body.chat_room_intro;
  var file = req.files.chat_room_img;
  var room_img = req.files.chat_room_img.name;
  console.log(room_img);

  file.mv('../images/' + room_img, function (err){
    if (err) {
      console.log(err);
    } else {
      console.log("file upload success")
    }
  });

    var room_img_save_path = 'images/' + room_img;
    var now_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    var now_time_long = new Date().valueOf();
  
    // 기존 방 수정시
    if (action == 'update') {

      var open_chat_no = req.body.open_chat_no;

        pool.getConnection(function(err, connection) {
          if (err) throw err; // not connected!
        
          connection.query('UPDATE open_chat SET chat_title = ?, chat_member = ?, chat_thumbnail = ?, room_introduce = ? WHERE open_chat_no = ?',[room_title, room_member, room_img_save_path, room_intro, open_chat_no], function (error, results, fields) {
                      
            connection.release();
            if (error) throw error;
        
            res.redirect('/chat_home?id=' + user_id);

          });
        });

      // 새로운 방 생성시
    } else if (action == 'create') {

        pool.getConnection(function(err, connection) {
          if (err) throw err; // not connected!
        
          connection.query('INSERT INTO open_chat (created, chat_title, chat_member, chat_thumbnail, room_master_id, room_introduce) VALUES(?,?,?,?,?,?)',[now_time, room_title, room_member, room_img_save_path, user_id, room_intro], function (error, results, fields) {
            
            connection.release();
            if (error) throw error;
            
            var open_chat_no = results.insertId;
            connection.query('INSERT INTO open_chat_member (open_chat_no, member_id, join_date, last_visit_time) VALUES(?,?,?,?)',[open_chat_no, user_id, now_time, now_time_long], function (error, results, fields) {
            });
        
            res.redirect('/chat_room?id=' + user_id +'&room_type=open_chat&member_type=new&room_no='+open_chat_no);

          });
        });
    } // action == 'create' 라인
});

// 이미 참여중인 open chat room 인지 db에서 조회
router.get('/get', function(req, res, next) {
  
  var open_chat_room_number = req.query.room_number;
  // var search_user = req.query.userId;

  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
  
    connection.query('SELECT member_id FROM open_chat_member  WHERE open_chat_no = ?',[open_chat_room_number], function (error, results, fields) {
      connection.release();
      if (error) throw error;

        res.send({result : 'ok', room_type : 'open_chat', room_member : results});

    });
  });
});



// 방 수정을 클릭할 때 해당 방의 정보를 클라이언트에게 보내줌 
router.get('/update', function(req, res, next) {
  console.log("## get request : "+req.query.userId); 

  var open_chat_room_number = req.query.room_number;
  var search_user = req.query.userId;


  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
  
    connection.query('SELECT * FROM open_chat WHERE open_chat_no = ? ',[open_chat_room_number], function (error, results, fields) {
      connection.release();
      if (error) throw error;

        res.send({ result : 'ok' , chat_room : results});

    });
  });
});

// 방 수정을 클릭할 때 해당 방의 정보를 클라이언트에게 보내줌 
router.get('/getRoom', function(req, res, next) {
  console.log("## get request : "+req.query.userId); 

  var open_chat_room_number = req.query.room_number;

  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
  
    connection.query('SELECT date_format(o.created,\'%Y.%m.%d\') AS created, o.chat_title, o.chat_member, o.chat_thumbnail, o.room_introduce, t.nickname, t.profileimg, (SELECT COUNT(*) FROM open_chat_member WHERE open_chat_no = ?) AS member_count FROM open_chat AS o LEFT JOIN topic AS t ON t.id = o.room_master_id WHERE open_chat_no = ? ',[open_chat_room_number, open_chat_room_number], function (error, results, fields) {
      connection.release();
      if (error) throw error;

        res.send({ result : 'ok' , chat_room : results});

    });
  });
});

// open_chat 방에 입장하는 경로
router.get('/join', function(req, res, next) {

  var open_chat_no = req.query.room_number;
  var user_id = req.query.userId;

  console.log('join 멤버 저장시 query데이터 먼저 확인 ' + open_chat_no, user_id)

  var now_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
  var now_time_long = new Date().valueOf();

  
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
  
    connection.query('INSERT INTO open_chat_member (open_chat_no, member_id, join_date, last_visit_time) VALUES(?,?,?,?)',[open_chat_no, user_id, new Date(), now_time_long], function (error, results, fields) {                       
      connection.release();
      if (error) throw error;

      res.send({ result : 'ok' })

    });
  });
});

router.get('/delete', function(req, res, next) {
  console.log("## delete request : "+req.query.room_number); 

  var open_chat_room_number = req.query.room_number;


  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
  
    connection.query('UPDATE open_chat SET deleted = 1 WHERE open_chat_no = ?',[open_chat_room_number], function (error, results, fields) {

      connection.release();
      if (error) throw error;

      if (results) {
        res.send({ result : results })
      }
    });
  });
});

module.exports = router;