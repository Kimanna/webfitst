<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

 $rc = $_GET["rc"];
 
 if ( $rc == 'rca') {
   $sql = "SELECT * FROM review LIMIT 9";
} else if ( $rc == 'rc1') {
  $sql = "SELECT * FROM review WHERE country='USA' OR country='CAN' LIMIT 9";
} else if ( $rc == 'rc2') {
  $sql = "SELECT * FROM review WHERE country='GBR' OR country='IRL' LIMIT 9";
} else if ( $rc == 'rc3') {
  $sql = "SELECT * FROM review WHERE country='AUS' OR country='NZL' LIMIT 9";
} else if ( $rc == 'rc4') {
  $sql = "SELECT * FROM review WHERE country='PHL' OR country='MLT' LIMIT 9";
} 

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}
//$sql = "SELECT * FROM review limit 9";
$result = mysqli_query($conn, $sql);
//$row = mysqli_fetch_assoc($result);

// echo json_encode($row);
// echo json_encode(array('res'=>$row));

if ( mysqli_num_rows($result) > 0 ) {

   $data = array();
  while ($row = mysqli_fetch_assoc($result))
  {
      $data[] = $row;
  }

//    $result = ['review' => $data, 'totalNumberOfRecords' => $numResults, 'responseCode' => 100];
    echo json_encode($data);

}

else{

  echo json_encode(array('res'=>"notok"));

}

$conn->close();

?>