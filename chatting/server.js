

const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var url = require('url');


// const server = app.listen(3000, () =>{
//   console.log("start server : localhost:3000");
// });


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);


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



app.get('/chat_home', function (req, res) {
  res.render('chat_home.html');
});

// setting html 만들어야함.
app.get('/chat_setting', function (req, res) {
  res.render('index.html');
});

app.get('/chat_room', function (req, res) {
  
  res.render('chat_room.html');

  // user id를 query string 을 통해 가져오는 부분
  var queryData = url.parse(req.url, true).query;
  var user_id = queryData.id;
  console.log(user_id);
  

  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
   
    connection.query('SELECT * FROM topic WHERE id =?',[user_id], function (error, results, fields) {
      connection.release();
   
      if (error) throw error;
      // chat_socket(results);
      
      var count=1;
      io.on('connection', function (socket) {
        console.log('user connected: ', socket.id);
        var name = "user" + count++;
        io.to(socket.id).emit('change name', results[0].nickname, results[0].profileimg);
      
        socket.on('disconnect', function() {
          console.log('user disconnected: ', socket.id);
        });
      
        socket.on('send message', function(nickname, profile, text) {

          console.log(nickname+ profile+ text)

          io.emit('receive message', nickname, profile, text);
        });
      });
    });
  }); 

});



function chat_socket(user_profile) {

  console.log(user_profile[0].id)

  var count=1;
  io.on('connection', function (socket) {
    console.log('user connected: ', socket.id);
    var name = "user" + count++;
    io.to(socket.id).emit('change name', user_profile[0].nickname, user_profile[0].profileimg);
  
    socket.on('disconnect', function() {
      console.log('user disconnected: ', socket.id);
    });
  
    socket.on('send message', function(name, text) {
      var msg = name +' : ' + text;
      console.log(msg);
      io.emit('receive message', msg);
    });
  });
}



http.listen(3000, function() {
  console.log('server on running');
});







function get_userinfo (user_id) {

  pool.query('SELECT * FROM topic WHERE id =?',[user_id], function (err, results, fields) {
    if (err) throw err; // not connected!

      console.log(results[0].id);

      return results;

  })
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

app.get('/db', function (req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
   
    // Use the connection
    connection.query('SELECT * FROM topic', function (error, results, fields) {
      res.send(JSON.stringify(results));
      console.log('result:'+results);
      // When done with the connection, release it.
      connection.release();
   
      // Handle error after the release.
      if (error) throw error;
   
      // Don't use the connection here, it has been returned to the pool.
    });
  });
});


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

