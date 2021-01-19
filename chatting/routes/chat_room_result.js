
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
  

  // user id를 query string 을 통해 가져오는 부분
  var queryData = url.parse(req.url, true).query;
  var user_id = queryData.id; 


  var room_title = req.body.chat_room_title;
  var room_member = req.body.chat_room_member;
  var file = req.files.chat_room_img;
  var room_img = req.files.chat_room_img.name;

  file.mv('./uploads/' + room_img, function (err){
    if (err) {
      console.log(err);
    } else {
      console.log("file upload success")
    }
  });

    var room_img_save_path = './uploads/' + room_img;
    var now_time = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
      pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
      
        
        // Use the connection
        connection.query('INSERT INTO open_chat (created, chat_title, chat_member, chat_thumbnail, room_master_id) VALUES(?,?,?,?,?)',[now_time, room_title, room_member, room_img_save_path, user_id], function (error, results, fields) {
          
          // When done with the connection, release it.
          connection.release();
          
          // Handle error after the release.
          if (error) throw error;
          
          var open_chat_no = results.insertId;
          connection.query('INSERT INTO open_chat_member (open_chat_no, member_id, join_date) VALUES(?,?,?)',[open_chat_no, user_id, now_time], function (error, results, fields) {
          });
      
          // res.send({ title: 'Express', open_chat_no: open_chat_no, user_id: user_id });

        });
      });
});

// 이미 참여중인 open chat room 인지 db에서 조회
router.get('/get', function(req, res, next) {
  console.log("## post request : "+req.query.room_number); 
  console.log("## post request : "+req.query.userId); 

  var open_chat_room_number = req.query.room_number;
  var search_user = req.query.userId;


  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
  
    // Use the connection
    connection.query('SELECT member_id FROM open_chat_member  WHERE open_chat_no = ? AND member_id = ?',[open_chat_room_number, search_user], function (error, results, fields) {

      // When done with the connection, release it.
      connection.release();
  
      // Handle error after the release.
      if (error) throw error;

      if (results == "" || results == null) {

        console.log("현재 open_chat 방에 가입중이 아님");
        res.send({if_join : 'not_join'});
      } else {

        var query = '?id='+search_user+'&chat_room_no='+open_chat_room_number;
        res.redirect('/chat_room'+query);

      }
    });
  });
});

module.exports = router;