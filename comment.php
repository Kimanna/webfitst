<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}


// post 로 넘어오는 값은 모두 create

if (isset($_POST["mode"])) {
  
    if ($_POST["mode"] == "create") {


            $userId = $_POST['userId'];
            $page = $_POST["page"];

            $commenttext = $_POST["comment"];
            $post_no = $_POST["post_no"];
            $reply_cno = $_POST["comment_no"];



            $sql = "INSERT INTO comment (created, reply_cno, aid, commenttext, post_no, deleted) VALUES (
              NOW(),
              '$reply_cno',
              '$userId', 
              '$commenttext',
              '$post_no',
              0
            )";

            if ($conn->query($sql) === true ){

                $result = mysqli_query($conn, "SELECT c.*, t.nickname, t.profileimg FROM comment c LEFT JOIN topic t ON c.aid = t.id WHERE c.deleted=0 AND c.post_no=$post_no AND c.reply_cno=0 ORDER BY c.comment_no DESC");

            } else {

                echo"error :".$sql.$conn->error; 

            }


      // 대댓글을 저장하는 경우
      } else if ($_POST["mode"] == "createComments") {

        
            $userId = $_POST['userId'];
            $page = $_POST["page"];

            $commenttext = $_POST["comment"];
            $post_no = $_POST["post_no"];
            $reply_cno = $_POST["comment_no"];


            $sql = "INSERT INTO comment (created, reply_cno, aid, commenttext, post_no, deleted) VALUES (
              NOW(),
              '$reply_cno',
              '$userId', 
              '$commenttext',
              '$post_no',
              0
            )";

            if ($conn->query($sql) === true ){


                $result = mysqli_query($conn, "SELECT c.*, t.nickname, t.profileimg
                                              FROM comment c 
                                              LEFT JOIN topic t ON c.aid = t.id 
                                              WHERE c.deleted=0 AND c.post_no=$post_no AND (c.comment_no = $reply_cno OR c.reply_cno = $reply_cno) ORDER BY c.comment_no ASC");

            } else {

                echo"error :".$sql.$conn->error; 

            }

      // 대대댓글을 저장하는 부분
      } else if ($_POST["mode"] == "createCommentsComment") {

            
            $userId = $_POST['userId'];
            $page = $_POST["page"];

            $commenttext = $_POST["comment"];
            $post_no = $_POST["post_no"];
            $reply_cno = $_POST["comment_no"];


            $sql = "INSERT INTO comment (created, reply_cno, aid, commenttext, post_no, deleted) VALUES (
              NOW(),
              '$reply_cno',
              '$userId', 
              '$commenttext',
              '$post_no',
              0
            )";

            if ($conn->query($sql) === true ){


                $result = mysqli_query($conn, "SELECT c.*, t.nickname, t.profileimg
                                              FROM comment c 
                                              LEFT JOIN topic t ON c.aid = t.id 
                                              WHERE c.deleted=0 AND c.post_no=$post_no AND (c.comment_no = $reply_cno OR c.reply_cno = $reply_cno) ORDER BY c.comment_no ASC");

            } else {

                echo"error :".$sql.$conn->error; 

            }
    }


  // get으로 넘어오는 값은 read / update / delete
} else {

      $mode = $_GET["mode"];


       // 댓글을 db 에서 가져오는 쿼리문
      if ($mode == "read") {

          $post_no = $_GET["post_no"];
          $result = mysqli_query($conn, "SELECT c.*, t.nickname, t.profileimg, 
                                            (SELECT COUNT(*) FROM comment A WHERE A.reply_cno=c.comment_no AND deleted=0) AS reply2 
                                        FROM comment c LEFT JOIN topic t ON c.aid = t.id 
                                        WHERE c.deleted=0 AND c.post_no=$post_no AND c.reply_cno=0 ORDER BY c.comment_no DESC");

 
        // 대댓글만 db에서 가져오는 부분
      } else if ($mode == "read1") {
        $post_no = $_GET["post_no"];
        $comment_no = $_GET["comment_no"];

        
        $result = mysqli_query($conn, "SELECT c.*, t.nickname, t.profileimg,
                                        (SELECT COUNT(*) FROM comment A WHERE A.reply_cno=c.comment_no AND deleted=0) AS reply2 
                                      FROM comment c 
                                      LEFT JOIN topic t ON c.aid = t.id 
                                      WHERE c.deleted=0 AND c.post_no=$post_no AND (c.comment_no = $comment_no OR c.reply_cno = $comment_no) ORDER BY c.comment_no ASC");

$result1 = mysqli_query($conn, "SELECT comment_no, 
COUNT(CASE WHEN like_dislike_check='like' THEN 1 END) AS 'like_count',
COUNT(CASE WHEN like_dislike_check='dislike' THEN 1 END) AS 'dislike_count',
GROUP_CONCAT(like_dislike_check, '_',like_dislike_person) AS 'like_person'
FROM comment_like
GROUP BY comment_no ORDER BY comment_no DESC");


       //댓글의 좋아요, 싫어요 데이터를 가져옴
      } else if ($mode == "getLike") {


        $result = mysqli_query($conn, "SELECT comment_no, 
                                          COUNT(CASE WHEN like_dislike_check='like' THEN 1 END) AS 'like_count',
                                          COUNT(CASE WHEN like_dislike_check='dislike' THEN 1 END) AS 'dislike_count',
                                          GROUP_CONCAT(like_dislike_check, '_',like_dislike_person) AS 'like_person'
                                      FROM comment_like
                                      GROUP BY comment_no ORDER BY comment_no DESC");


        //대댓글의 좋아요, 싫어요 데이터를 가져옴
      } else if ($mode == "getLikeComments") {


        $result = mysqli_query($conn, "SELECT comment_no, 
                                          COUNT(CASE WHEN like_dislike_check='like' THEN 1 END) AS 'like_count',
                                          COUNT(CASE WHEN like_dislike_check='dislike' THEN 1 END) AS 'dislike_count',
                                          GROUP_CONCAT(like_dislike_check, '_',like_dislike_person) AS 'like_person'
                                      FROM comment_like
                                      GROUP BY comment_no ORDER BY comment_no DESC");


        //댓글 수정할때 
      } else if ($mode == "comment_update") {
        

            $commenttext = $_GET["comment"] . '  ( 수정됨 )';
            $comment_no = $_GET["comment_no"];


            $sql = "UPDATE comment SET commenttext = '$commenttext' WHERE comment_no = $comment_no;";

            if ($conn->query($sql) === true ){


              $result = mysqli_query($conn, "SELECT * FROM comment WHERE comment_no = $comment_no;");

            } else {

                echo"error :".$sql.$conn->error; 

            }
        
      } else if ($mode == "comment_delete") {

            // 삭제하려는 댓글 넘버에 해당하는 deleted 컬럼 값을 0 -> 1 로 수정해줌
            $comment_no = $_GET["comment_no"];
            $sql = "UPDATE comment SET deleted = 1 WHERE comment_no = $comment_no;";


            // 모든 댓글 데이터 가져옴
            if ($conn->query($sql) === true ){

              $post_no = $_GET["post_no"];

              $result = mysqli_query($conn, "SELECT c.*, t.nickname, t.profileimg, 
                                                (SELECT COUNT(*) FROM comment A WHERE A.reply_cno=c.comment_no AND deleted=0) AS reply2 
                                            FROM comment c LEFT JOIN topic t ON c.aid = t.id 
                                            WHERE c.deleted=0 AND c.post_no=$post_no AND c.reply_cno=0 ORDER BY c.comment_no DESC;");
                                            
            } else {

                echo"error :".$sql.$conn->error; 

            }

      } else if ($mode == "like_comment") {


            $comment_no = $_GET["comment_no"];
            $userId = $_GET['userId'];


            $sql = "INSERT INTO comment_like VALUES (NULL, $comment_no, NOW(), '$userId', 'like') ON DUPLICATE KEY UPDATE like_dislike_check = 'like';";


            if ($conn->query($sql) === true ){


              $result = mysqli_query($conn, "SELECT * FROM comment_like WHERE comment_no = $comment_no");

            } else {

                echo"error :".$sql.$conn->error; 

            }
      } else if ($mode == "dislike_comment") {

            $comment_no = $_GET["comment_no"];
            $userId = $_GET['userId'];


            $sql = "INSERT INTO comment_like VALUES (NULL, $comment_no, NOW(), '$userId', 'dislike') ON DUPLICATE KEY UPDATE like_dislike_check = 'dislike'";

            if ($conn->query($sql) === true ){


              $result = mysqli_query($conn, "SELECT * FROM comment_like WHERE comment_no = $comment_no");

            } else {

                echo"error :".$sql.$conn->error; 

            }
      } else if ($mode == "comments_comment_update") {
        

            $commenttext = $_GET["comment"] . '  ( 수정됨 )';
            $comment_no = $_GET["comment_no"];


            $sql = "UPDATE comment SET commenttext = '$commenttext' WHERE comment_no = $comment_no;";

            if ($conn->query($sql) === true ){


              $result = mysqli_query($conn, "SELECT * FROM comment WHERE comment_no = $comment_no;");

            } else {

                echo"error :".$sql.$conn->error; 

            }
        
      } else if ($mode == "comments_comment_delete") {


            // 대댓글 삭제
            $comment_no = $_GET["comment_no"];
            $parent_comment_no = $_GET["parent_comment_no"];
            $sql = "UPDATE comment SET deleted = 1 WHERE comment_no = $comment_no;";

            if ($conn->query($sql) === true ){

              $result = mysqli_query($conn, "SELECT (SELECT COUNT(*) FROM comment A WHERE A.reply_cno = c.comment_no AND A.deleted = 0) AS reply2 
                                             FROM comment c
                                             WHERE c.deleted=0 AND c.comment_no = $parent_comment_no;");

            } else {

                echo"error :".$sql.$conn->error; 

            }
      } else if ($mode == "like_comments_comment") {


            $comment_no = $_GET["comment_no"];
            $userId = $_GET['userId'];


            $sql = "INSERT INTO comment_like VALUES (NULL, $comment_no, NOW(), '$userId', 'like') ON DUPLICATE KEY UPDATE like_dislike_check = 'like';";


            if ($conn->query($sql) === true ){


              $result = mysqli_query($conn, "SELECT * FROM comment_like WHERE comment_no = $comment_no");

            } else {

                echo"error :".$sql.$conn->error; 

            }
      } else if ($mode == "dislike_comments_comment") {

            $comment_no = $_GET["comment_no"];
            $userId = $_GET['userId'];


            $sql = "INSERT INTO comment_like VALUES (NULL, $comment_no, NOW(), '$userId', 'dislike') ON DUPLICATE KEY UPDATE like_dislike_check = 'dislike'";

            if ($conn->query($sql) === true ){


              $result = mysqli_query($conn, "SELECT * FROM comment_like WHERE comment_no = $comment_no");

            } else {

                echo"error :".$sql.$conn->error; 

            }
      } 

}



$totalData = mysqli_num_rows($result);

if ( $totalData > 0 ) {

    $data_array = [];
    while ($row = mysqli_fetch_array($result))
    {
        
        array_push ($data_array, $row);
    }

    if ( isset( $result1 )) {

      if ( mysqli_num_rows($result1) > 0 ) {

        $data_array1 = [];
        while ($row1 = mysqli_fetch_array($result1))
        {
      
            array_push ($data_array1, $row1);
        }

        echo json_encode(array('res'=>"ok", 'totalData'=> $totalData, 'data'=>$data_array, 'data1'=>$data_array1));
      }

    } else {

      
      echo json_encode(array('res'=>"ok", 'totalData'=> $totalData, 'data'=>$data_array));
    }
  
    
}

else{

  echo json_encode(array('res'=>"notok"));

}

$conn->close();


?>