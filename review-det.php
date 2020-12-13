<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

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
$row = mysqli_fetch_row($result);

// echo json_encode($row);
// echo json_encode(array('res'=>$row));

if ( mysqli_num_rows($result) > 0 ) {
/*
  while ($row = mysqli_fetch_assoc($result)) {

    $review = array($row['review_no'] => $row);
  }
  echo $review;
*/

  
  echo json_encode($row);


}

else{

  echo json_encode(array('res'=>"notok"));

}

$conn->close();

?>