
<?php 

error_reporting(E_ALL);
ini_set('display_errors', '1');

//게시글 수정 DB

$mode = $_POST["mode"];
// print_r($mode);

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
}

if(isset($mode)) {
  if ($mode == 'update') {

    print_r($mode);

    $review_no = $_POST["review_no"];
    $userId = "8";
    $country = $_POST["country"];
    $school = $_POST["school"];
    $town = $_POST["town"];
    $writername = $_POST["writer"];
    $thumbnail = $_POST["thumbnail"];
    $st_homepage = $_POST["st_homepage"];

    $st_content14 = $_POST["st_content14"];
    $st_content1 = $_POST["st_content1"];
    $st_content2 = $_POST["st_content2"];

    $st_content15 = $_POST["st_content15"];
    $st_content4 = $_POST["st_content4"];
    $st_content5 = $_POST["st_content5"];
    $st_content16 = $_POST["st_content16"];
    $st_content12 = $_POST["st_content12"];
    $st_content6 = $_POST["st_content6"];
    $st_content22 = $_POST["st_content22"];
    $st_content13 = $_POST["st_content13"];
    $st_content7 = $_POST["st_content7"];
    $st_content9 = $_POST["st_content9"];
    $st_content3 = $_POST["st_content3"];
    $st_content18 = $_POST["st_content18"];
    $st_content19 = $_POST["st_content19"];
    $st_content20 = $_POST["st_content20"];

    $sql = "UPDATE review 
    SET created = NOW(),
    aid = '$userId', 
    country = '$country',
    school = '$school',
    town = '$town',
    writername = '$writername',
    thumbnail = '$thumbnail',
    st_homepage = '$st_homepage',
    st_content14 = '$st_content14',
    st_content1 = '$st_content1',
    st_content2 = '$st_content2',
    st_content15 = '$st_content15',
    st_content4 = '$st_content4',
    st_content5 = '$st_content5',
    st_content16 = '$st_content16',
    st_content12 = '$st_content12',
    st_content6 = '$st_content6',
    st_content22 = '$st_content22',
    st_content13 = '$st_content13',
    st_content7 = '$st_content7',
    st_content9 = '$st_content9',
    st_content3 = '$st_content3',
    st_content18 = '$st_content18',
    st_content19 = '$st_content19',
    st_content20 = '$st_content20' WHERE review_no = '$review_no' ";

    if(mysqli_query($conn, $sql)) {
      echo ("<script> 
              setTimeout(function() { alert('게시글이 정상적으로 삭제 되었습니다.'); }, 3000);
              location.replace('http://localhost/review-det.html?review_no=".$review_no."');
              </script>");
    } else {
      echo "fail";
    }

  } else {
    $review_no = $_POST["review_no"];

    $sql = "DELETE FROM review WHERE review_no = '$review_no' ";

    if(mysqli_query($conn, $sql)) {
      echo ("<script> 
              setTimeout(function() { alert('게시글이 정상적으로 삭제 되었습니다.'); }, 3000);
              location.replace('http://localhost/review.html'); 
              </script>");
    } else {
      echo "fail";
    }
  }
}

// $sql = "UPDATE review 
//   SET created = NOW(),
//     aid = '$userId', 
//     country = '$country',
//     school = '$school',
//     town = '$town',
//     writername = '$writername',
//     thumbnail = '$thumbnail',
//     st_homepage = '$st_homepage',
//     st_content14 = '$st_content14',
//     st_content1 = '$st_content1',
//     st_content2 = '$st_content2',
//     st_content15 = '$st_content15',
//     st_content4 = '$st_content4',
//     st_content5 = '$st_content5',
//     st_content16 = '$st_content16',
//     st_content12 = '$st_content12',
//     st_content6 = '$st_content6',
//     st_content22 = '$st_content22',
//     st_content13 = '$st_content13',
//     st_content7 = '$st_content7',
//     st_content9 = '$st_content9',
//     st_content3 = '$st_content3',
//     st_content18 = '$st_content18',
//     st_content19 = '$st_content19',
//     st_content20 = '$st_content20' WHERE review_no = '$review_no' ";

// // update, delete aql 성공한 방법
// // $sql = "UPDATE topic SET name = '앙나' WHERE auth_id = 7 ";
// // $sql = "DELETE FROM topic WHERE auth_id = 4 ";

// if(mysqli_query($conn, $sql)) {
//   echo "success";
// } else {
//   echo "fail";
// }


mysqli_close($conn);

?>
