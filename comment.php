<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}

// session_start();

// if (isset($_SESSION['userId'])) {
  
//     $userId = $_SESSION['userId'];
// }


if (isset($_POST["mode"])) {
  
  $page = $_POST["page"];

  $userId = "hello1";

  $commenttext = $_POST["comment"];
  $post_no = $_POST["post_no"];
  $replykey = $_POST["replykey"];
  $reply_cno = $_POST["reply_cno"];



  $sql = "INSERT INTO comment (created, replykey, reply_cno, aid, commenttext, post_no, deleted) VALUES (
    NOW(),
    '$replykey',
    '$reply_cno',
    '$userId', 
    '$commenttext',
    '$post_no',
    0
  )";

  if ($conn->query($sql) === true ){

      $result = mysqli_query($conn, "SELECT * FROM comment LEFT JOIN topic ON comment.aid=topic.id WHERE post_no=$post_no AND deleted=0 ORDER BY comment_no DESC");


  } else {

      echo"error :".$sql.$conn->error; 

  }

} else if (isset($_GET["mode"])) {

  $mode = $_GET["mode"];
  if ($mode == "update") {

  } else if ($mode == "delete") {

  } else if ($mode == "read") {

    $post_no = $_POST["post_no"];

    $result = mysqli_query($conn, "SELECT * FROM comment LEFT JOIN topic ON comment.aid=topic.id WHERE post_no=$post_no AND deleted=0 ORDER BY comment_no DESC");

  }
}


// $result = mysqli_query($conn, $sql);

$totalData = mysqli_num_rows($result);

if ( $totalData > 0 ) {

   $dataarry = [];
  while ($row = mysqli_fetch_array($result))
  {
      
      array_push ($dataarry, $row);
  }

  echo json_encode(array('res'=>"ok", 'totalData'=> $totalData, 'data'=>$dataarry));

}

else{

  echo json_encode(array('res'=>"notok"));

}

$conn->close();


?>