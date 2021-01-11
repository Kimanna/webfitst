<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();

if (isset($_SESSION["userId"])) {
  
  $userId = $_SESSION['userId'];
  $start_number = $_GET["start_number"];
  
  

  $conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
   if (!$conn) {
    die ('Failed'.mysqli_connect_error());
  } else {
  //  echo "success";
  }


// review, blog 중 어떤 목록의 더보기를 원하는 지 구분하는 부분
if (isset($_GET["which_list"])) {
 
  if ($_GET["which_list"]=='review_more') {

    $reviewquery = mysqli_query($conn, "SELECT * FROM review WHERE aid='$userId' AND deleted=0 ORDER BY review_no DESC LIMIT $start_number,3");

    if ( mysqli_num_rows($reviewquery) > 0 ) {

      $reviewarray = [];
     while ($row = mysqli_fetch_array($reviewquery))
     {
   
         array_push ($reviewarray, $row);
     }

     echo json_encode(array('res'=>"ok", 'reviewdata'=> $reviewarray));

   } else {

      echo json_encode(array('res'=>"notok"));

   }


  } else if ($_GET["which_list"]=='blog_more') {

    $blogquery = mysqli_query($conn, "SELECT * FROM blog WHERE aid='$userId' AND deleted=0 ORDER BY blog_no DESC LIMIT $start_number,3");

    if ( mysqli_num_rows($blogquery) > 0 ) {

      $blogarray = [];
     while ($row = mysqli_fetch_array($blogquery))
     {
         array_push ($blogarray, $row);
     }

     echo json_encode(array('res'=>"ok", 'blogdata'=>$blogarray));
     
    } else {

      echo json_encode(array('res'=>"notok"));

   }
    
    

  }

// 더보기 버튼을 통해 데이터를 받아가는것이 아닌경우
} else {


  $userquery = mysqli_query($conn, "SELECT * FROM topic WHERE id='$userId'");
  
  $reviewquery = mysqli_query($conn, "SELECT * FROM review WHERE aid='$userId' AND deleted=0 ORDER BY review_no DESC LIMIT $start_number,3");
  $blogquery = mysqli_query($conn, "SELECT * FROM blog WHERE aid='$userId' AND deleted=0 ORDER BY blog_no DESC LIMIT $start_number,3");


  $userprofiledata = mysqli_fetch_array($userquery);

  if ( mysqli_num_rows($reviewquery) > 0 ) {

    $reviewarray = [];

    while ($row = mysqli_fetch_array($reviewquery))
    {

        array_push ($reviewarray, $row);
    }

  }

  if ( mysqli_num_rows($blogquery) > 0 ) {

    $blogarray = [];

    while ($row = mysqli_fetch_array($blogquery))
    {

        array_push ($blogarray, $row);
    }

  }

  echo json_encode(array('res'=>"ok", 'userprofiledata'=>$userprofiledata, 'reviewdata'=> $reviewarray, 'blogdata'=>$blogarray));


}


$conn->close();

} else {

  echo json_encode(array('res'=>"notok"));

}
?>