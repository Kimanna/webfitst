<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();

if (isset($_SESSION['userId'])) {
  
  $userId = $_SESSION['userId'];
}

$review_no = $_GET["review_no"];


$sql = "SELECT * FROM review WHERE review_no = '$review_no'";


$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}

//$sql = "SELECT * FROM review limit 9";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

// echo json_encode($row);
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