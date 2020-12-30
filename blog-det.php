<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$blog_no = $_GET["blog_no"];

session_start();

if (isset($_SESSION['userId'])) {
  
    $userId = $_SESSION['userId'];
}

// $blog_no = '20';
$sql = "SELECT * FROM blog LEFT JOIN topic ON blog.aid=topic.id WHERE blog_no = '$blog_no'";


$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}

// 조회수 증가시키는 query
$sql1 = "UPDATE blog SET view=view+1 WHERE blog_no = '$blog_no'";
$result1 = mysqli_query($conn, $sql1);

//데이터 조회 후 전달하는 query
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

// echo json_encode(array('res'=>$row));



if ( mysqli_num_rows($result) > 0 ) {
  
  
  // echo json_encode($row);
  if (isset($_SESSION['userId'])) {

    if ($row['aid']==$userId) {

      echo json_encode(array('res'=>'ok', 'mine'=>'ok', 'data'=>$row));
  
    } else {
  
      echo json_encode(array('res'=>'ok', 'mine'=>'notok', 'data'=>$row));
    }
  
  } else {

    echo json_encode(array('res'=>'ok', 'mine'=>'notok', 'data'=>$row));

  }

}

else{

  echo json_encode(array('res'=>'notok'));

}

$conn->close();


?>