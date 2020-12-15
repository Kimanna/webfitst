<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

 $rc = $_GET["rc"];
 

 //왼쪽 tap nav 클릭했을 각 페이지마다 review, blog, advertise 테이블에서 데이터가져옴
 // pagination적용시   LIMIT 9 값으로 데이터 가져올 예정 --------------------------------
 if ( $rc == 'rca') {
   $sql = "SELECT * FROM review ORDER BY review_no DESC LIMIT 9";
} else if ( $rc == 'rc1') {
  $sql = "SELECT * FROM review WHERE country='USA' OR country='CAN' ORDER BY review_no DESC ";
} else if ( $rc == 'rc2') {
  $sql = "SELECT * FROM review WHERE country='GBR' OR country='IRL' ORDER BY review_no DESC LIMIT 9";
} else if ( $rc == 'rc3') {
  $sql = "SELECT * FROM review WHERE country='AUS' OR country='NZL' ORDER BY review_no DESC LIMIT 9";
} else if ( $rc == 'rc4') {
  $sql = "SELECT * FROM review WHERE country='PHL' OR country='MLT' ORDER BY review_no DESC LIMIT 9";
} else if ( $rc == 'bca') {
  $sql = "SELECT * FROM blog WHERE country='USA' OR country='CAN' ORDER BY blog_no DESC LIMIT 20";
} else if ( $rc == 'bc1') {
  $sql = "SELECT * FROM blog WHERE country='GBR' OR country='IRL' ORDER BY blog_no DESC LIMIT 20";
} else if ( $rc == 'bc2') {
  $sql = "SELECT * FROM blog WHERE country='AUS' OR country='NZL' ORDER BY blog_no DESC LIMIT 20";
} else if ( $rc == 'bc3') {
  $sql = "SELECT * FROM blog WHERE country='PHL' OR country='MLT' ORDER BY blog_no DESC LIMIT 20";
} else if ( $rc == 'bc4') {
  $sql = "SELECT * FROM blog WHERE country='PHL' OR country='MLT' ORDER BY blog_no DESC LIMIT 20";
} else if ( $rc == 'aca') {
  $sql = "SELECT * FROM advertise WHERE country='USA' OR country='CAN' ORDER BY advertise_no DESC LIMIT 20";
} else if ( $rc == 'ac1') {
  $sql = "SELECT * FROM advertise WHERE country='GBR' OR country='IRL' ORDER BY advertise_no DESC LIMIT 20";
} else if ( $rc == 'ac2') {
  $sql = "SELECT * FROM advertise WHERE country='AUS' OR country='NZL' ORDER BY advertise_no DESC LIMIT 20";
} else if ( $rc == 'ac3') {
  $sql = "SELECT * FROM advertise WHERE country='PHL' OR country='MLT' ORDER BY advertise_no DESC LIMIT 20";
} else if ( $rc == 'ac4') {
  $sql = "SELECT * FROM advertise WHERE country='PHL' OR country='MLT' ORDER BY advertise_no DESC LIMIT 20";
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