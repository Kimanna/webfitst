<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}

$rc = $_GET["rc"];

// rc : 1~5 review page / 6~10 blog page / 11~15 advertise page
if ($rc < 6 ) {

  if (isset($_GET["page"])) {

    $page = $_GET["page"];
    
    if ( $page == "" || $page == 1 ) {
      $page1 = 0;

    } else {

      $page1 = ( $page*9 ) - 9;
    
    }
  }

} else if ($rc > 5 || $rc < 11) {

  if (isset($_GET["page"])) {

    $page = $_GET["page"];
    
    if ( $page == "" || $page == 1 ) {
      $page1 = 0;

    } else {

      $page1 = ( $page*5 ) - 5;
    
    }
  } 

} else {

  $page1 = 0;

}




// $res = mysqli_query($conn, "SELECT * FROM review WHERE (deleted=0 ORDER BY review_no DESC LIMIT $page1,5");


// while ( $row = mysqli_fetch_array ($res) ) {

//   echo $row["review_no"];
//   echo "<br>";

// }



//  왼쪽 tap nav 클릭했을 각 페이지마다 review, blog, advertise 테이블에서 데이터가져옴


 if ( $rc == 1) {
   $sql = "SELECT * FROM review WHERE deleted=0 ORDER BY review_no DESC";
   $res = mysqli_query($conn, "SELECT r.*, COUNT(c.comment_no) AS commentcount FROM review r LEFT JOIN comment_review c ON r.review_no = c.post_no AND c.deleted=0 WHERE r.deleted=0 GROUP BY r.review_no ORDER BY review_no DESC LIMIT $page1,9");

} else if ( $rc == 2) {
  $sql = "SELECT * FROM review WHERE (country='USA' OR country='CAN') AND deleted=0 ORDER BY review_no DESC";
  $res = mysqli_query($conn, "SELECT r.*, COUNT(c.comment_no) AS commentcount FROM review r LEFT JOIN comment_review c ON r.review_no = c.post_no AND c.deleted=0 WHERE (r.country='USA' OR r.country='CAN') AND r.deleted=0 GROUP BY r.blog_no ORDER BY r.reivew_no DESC LIMIT $page1,9");

} else if ( $rc == 3 ) {
  $sql = "SELECT * FROM review WHERE (country='GBR' OR country='IRL') AND deleted=0 ORDER BY review_no DESC";
  $res = mysqli_query($conn, "SELECT r.*, COUNT(c.comment_no) AS commentcount FROM review r LEFT JOIN comment_review c ON r.review_no = c.post_no AND c.deleted=0 WHERE (r.country='GBR' OR r.country='IRL') AND r.deleted=0 GROUP BY r.blog_no ORDER BY r.reivew_no DESC LIMIT $page1,9");

} else if ( $rc == 4 ) {
  $sql = "SELECT * FROM review WHERE (country='AUS' OR country='NZL') AND deleted=0 ORDER BY review_no DESC";
  $res = mysqli_query($conn, "SELECT r.*, COUNT(c.comment_no) AS commentcount FROM review r LEFT JOIN comment_review c ON r.review_no = c.post_no AND c.deleted=0 WHERE (r.country='AUS' OR r.country='NZL') AND r.deleted=0 GROUP BY r.blog_no ORDER BY r.reivew_no DESC LIMIT $page1,9");

} else if ( $rc == 5 ) {
  $sql = "SELECT * FROM review WHERE (country='PHL' OR country='MLT') AND deleted=0 ORDER BY review_no DESC";
  $res = mysqli_query($conn, "SELECT r.*, COUNT(c.comment_no) AS commentcount FROM review r LEFT JOIN comment_review c ON r.review_no = c.post_no AND c.deleted=0 WHERE (r.country='PHL' OR r.country='MLT') AND r.deleted=0 GROUP BY r.blog_no ORDER BY r.reivew_no DESC LIMIT $page1,9");

} else if ( $rc == 6 ) {
  $sql = "SELECT * FROM blog WHERE deleted=0 ORDER BY blog_no DESC";
  $res = mysqli_query($conn, "SELECT b.*, COUNT(c.comment_no) AS commentcount FROM blog b LEFT JOIN comment c ON b.blog_no = c.post_no AND c.deleted=0 WHERE b.deleted=0 GROUP BY b.blog_no ORDER BY blog_no DESC LIMIT $page1,5");

} else if ( $rc == 7 ) {
  $sql = "SELECT * FROM blog WHERE (country='USA' OR country='CAN') AND deleted=0 ORDER BY blog_no DESC";
  $res = mysqli_query($conn, "SELECT b.*, COUNT(c.comment_no) AS commentcount FROM blog b LEFT JOIN comment c ON b.blog_no = c.post_no AND c.deleted=0 WHERE (b.country='USA' OR b.country='CAN') AND b.deleted=0 GROUP BY b.blog_no ORDER BY b.blog_no DESC LIMIT $page1,5");

} else if ( $rc == 8 ) {
  $sql = "SELECT * FROM blog WHERE (country='GBR' OR country='IRL') AND deleted=0 ORDER BY blog_no DESC";
  $res = mysqli_query($conn, "SELECT b.*, COUNT(c.comment_no) AS commentcount FROM blog b LEFT JOIN comment c ON b.blog_no = c.post_no AND c.deleted=0 WHERE (b.country='GBR' OR b.country='IRL') AND b.deleted=0 GROUP BY b.blog_no ORDER BY b.blog_no DESC LIMIT $page1,5");

} else if ( $rc == 9 ) {
  $sql = "SELECT * FROM blog WHERE (country='AUS' OR country='NZL') AND deleted=0 ORDER BY blog_no DESC";
  $res = mysqli_query($conn, "SELECT b.*, COUNT(c.comment_no) AS commentcount FROM blog b LEFT JOIN comment c ON b.blog_no = c.post_no AND c.deleted=0 WHERE (b.country='AUS' OR b.country='NZL') AND b.deleted=0 GROUP BY b.blog_no ORDER BY b.blog_no DESC LIMIT $page1,5");

} else if ( $rc == 10 ) {
  $sql = "SELECT * FROM blog WHERE (country='PHL' OR country='MLT') AND deleted=0 ORDER BY blog_no DESC";
  $res = mysqli_query($conn, "SELECT b.*, COUNT(c.comment_no) AS commentcount FROM blog b LEFT JOIN comment c ON b.blog_no = c.post_no AND c.deleted=0 WHERE (b.country='PHL' OR b.country='MLT') AND b.deleted=0 GROUP BY b.blog_no ORDER BY b.blog_no DESC LIMIT $page1,5");

} else if ( $rc == 11 ) {
  $sql = "SELECT * FROM advertise WHERE deleted=0 ORDER BY advertise_no DESC";
  $res = mysqli_query($conn, "SELECT * FROM advertise WHERE deleted=0 ORDER BY advertise_no DESC LIMIT $page1,5");

} else if ( $rc == 12 ) {
  $sql = "SELECT * FROM advertise WHERE (country='USA' OR country='CAN') AND deleted=0 ORDER BY advertise_no DESC";
  $res = mysqli_query($conn, "SELECT * FROM advertise WHERE (country='USA' OR country='CAN') AND deleted=0 ORDER BY advertise_no DESC LIMIT $page1,5");

} else if ( $rc == 13 ) {
  $sql = "SELECT * FROM advertise WHERE (country='GBR' OR country='IRL') AND deleted=0 ORDER BY advertise_no DESC";
  $res = mysqli_query($conn, "SELECT * FROM advertise WHERE (country='GBR' OR country='IRL') AND deleted=0 ORDER BY advertise_no DESC LIMIT $page1,5");

} else if ( $rc == 14 ) {
  $sql = "SELECT * FROM advertise WHERE (country='AUS' OR country='NZL') AND deleted=0 ORDER BY advertise_no DESC";
  $res = mysqli_query($conn, "SELECT * FROM advertise WHERE (country='AUS' OR country='NZL') AND deleted=0 ORDER BY advertise_no DESC LIMIT $page1,5");

} else if ( $rc == 15 ) {
  $sql = "SELECT * FROM advertise WHERE (country='PHL' OR country='MLT') AND deleted=0 ORDER BY advertise_no DESC";
  $res = mysqli_query($conn, "SELECT * FROM advertise WHERE (country='PHL' OR country='MLT') AND deleted=0 ORDER BY advertise_no DESC LIMIT $page1,5");

} 

// SELECT b.blog_no, COUNT(c.post_no) AS cnt FROM blog b LEFT JOIN comment c ON (b.blog_no=c.post_no) GROUP BY b.blog_no;

$result = mysqli_query($conn, $sql);

$totalData = mysqli_num_rows($result);

if ( $totalData > 0 ) {

   $dataarry = [];
  while ($row = mysqli_fetch_array($res))
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