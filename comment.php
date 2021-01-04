<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}


if (isset($_POST["mode"])) {
  
  $userId = $_POST['userId'];
  $page = $_POST["page"];

  $commenttext = $_POST["comment"];
  $post_no = $_POST["post_no"];
  $reply_cno = $_POST["reply_cno"];



  $sql = "INSERT INTO comment (created, reply_cno, aid, commenttext, post_no, deleted) VALUES (
    NOW(),
    '$reply_cno',
    '$userId', 
    '$commenttext',
    '$post_no',
    0
  )";

  if ($conn->query($sql) === true ){

      $result = mysqli_query($conn, "SELECT c.comment_no, c.created, c.reply_cno, c.commenttext, c.post_no, c.deleted, t.id, t.profileimg FROM comment c LEFT JOIN topic t ON c.aid=t.id WHERE post_no=$post_no AND deleted=0 ORDER BY comment_no DESC ");


  } else {

      echo"error :".$sql.$conn->error; 

  }

} else if (isset($_GET["mode"])) {

  $mode = $_GET["mode"];
  if ($mode == "update") {

  } else if ($mode == "delete") {

  } else if ($mode == "read") {

    $post_no = $_GET["post_no"];

    $result = mysqli_query($conn, "SELECT c.comment_no, c.created, c.reply_cno, c.commenttext, c.post_no, c.deleted, t.id, t.profileimg FROM comment c LEFT JOIN topic t ON c.aid=t.id WHERE post_no=$post_no AND deleted=0 ORDER BY comment_no DESC ");
  }
}



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