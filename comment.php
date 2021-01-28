<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}


// post 로 넘어오는 값은 create

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

                // $result = mysqli_query($conn, "SELECT c.*, t.nickname, t.profileimg FROM comment c LEFT JOIN topic t ON c.aid = t.id WHERE c.deleted=0 AND c.post_no=$post_no AND c.reply_cno=0 ORDER BY c.comment_no DESC");

                $result = mysqli_query($conn, "SELECT c.*, t.nickname, t.profileimg
                                              FROM comment c 
                                              LEFT JOIN topic t ON c.aid = t.id 
                                              WHERE c.deleted=0 AND c.post_no=$post_no AND c.comment_no = $reply_cno OR c.reply_cno = $reply_cno ORDER BY c.comment_no ASC");

            } else {

                echo"error :".$sql.$conn->error; 

            }
      }


  // get으로 넘어오는 값은 update / delete / read
} else {

      $mode = $_GET["mode"];

      if ($mode == "update") {


      } else if ($mode == "delete") {


        // 댓글을 db 에서 가져오는 쿼리문
      } else if ($mode == "read") {

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
                                      WHERE c.deleted=0 AND c.post_no=$post_no AND c.comment_no = $comment_no OR c.reply_cno = $comment_no ORDER BY c.comment_no ASC");


        
      } else if ($mode == "getLike") {


        $result = mysqli_query($conn, "SELECT comment_no, 
                          COUNT(CASE WHEN like_dislike_check='like' THEN 1 END) AS 'like_count',
                          COUNT(CASE WHEN like_dislike_check='dislike' THEN 1 END) AS 'dislike_count',
                          GROUP_CONCAT(like_dislike_check, '_',like_dislike_person) AS 'like_person'
                      FROM comment_like
                      GROUP BY comment_no ORDER BY comment_no DESC");
      }

}



$totalData = mysqli_num_rows($result);

if ( $totalData > 0 ) {

    $data_array = [];
    while ($row = mysqli_fetch_array($result))
    {
        
        array_push ($data_array, $row);
    }
  
    echo json_encode(array('res'=>"ok", 'totalData'=> $totalData, 'data'=>$data_array));


}

else{

  echo json_encode(array('res'=>"notok"));

}

$conn->close();


?>