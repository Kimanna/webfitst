
<?php 

// error_reporting(E_ALL);
// ini_set('display_errors', '1');


session_start();
$userId = $_SESSION['userId'];


$mode = $_POST["mode"];
// print_r($mode);

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
}



if(isset($mode)) {

  // 게시물글 생성
  if ($mode == 'create') {

      $uploadBase = 'uploadimg';
      $filen = $_FILES['thumbnail']['name'];

      $country = $_POST["country"];
      $school = $_POST["school"];
      $town = $_POST["town"];
      $writername = $_POST["writer"];

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

        
      //이미지 file upload code
      if( isset($_FILES['thumbnail']) && !empty($_FILES['thumbnail']) ){
        $uploadStatus = $_FILES['thumbnail']['error'];
        if( $uploadStatus==0 ){

            if( !move_uploaded_file($_FILES['thumbnail']['tmp_name'], "$uploadBase/$filen" )) {
                throw new Exception("fileUploadCopy");
            }
            

        } else{
            if( $uploadStatus==1 ){ throw new Exception("fileUploadIniSize"); }
            else if( $uploadStatus==2 ){ throw new Exception("fileUploadFormSize"); }
            else if( $uploadStatus==3 ){ throw new Exception("fileUploadPartial"); } // THIS ERROR ...
            else if( $uploadStatus==4 ){ throw new Exception("fileUploadNoFile"); }
            else if( $uploadStatus==6 ){ throw new Exception("fileUploadNoTmpDir"); }
            else if( $uploadStatus==7 ){ throw new Exception("fileUploadCantWrite"); }
            else if( $uploadStatus==8 ){ throw new Exception("fileUploadExtension"); }
            else{
                throw new Exception("fileUploadSystem");
            }
        }
      } else{
        throw new Exception("fileUploadUpload"); // ... OR THIS ERROR]
      }
      $thumbnail = "$uploadBase/$filen";

      
      $sql = "
      INSERT INTO review (created, aid, country, school, town, writername, thumbnail, st_homepage, 
      st_content14, st_content1, st_content2, 
      st_content15, st_content4, st_content5, st_content16, st_content12, st_content6, st_content22, st_content13, st_content7, st_content9, st_content3, st_content18 ,st_content19, st_content20)
      VALUES (
        NOW(),
        '$userId', 
        '$country',
        '$school',
        '$town',
        '$writername',
        '$thumbnail',
        '$st_homepage',
        '$st_content14',
        '$st_content1',
        '$st_content2',
        '$st_content15',
        '$st_content4',
        '$st_content5',
        '$st_content16',
        '$st_content12',
        '$st_content6',
        '$st_content22',
        '$st_content13',
        '$st_content7',
        '$st_content9',
        '$st_content3',
        '$st_content18',
        '$st_content19',
        '$st_content20'
      )";


      if ($conn->query($sql) === true ){


      echo("<script>
              window.alert('게시글이 등록 되었습니다.')
              location.replace('http://localhost/review.html');
            </script>"); 

      } else {

      echo"error :".$sql.$conn->error; 

      }

  }


  if ($mode == 'update') {

    $uploadBase = 'uploadimg';
    $filen = $_FILES['thumbnail']['name'];

    $review_no = $_POST["review_no"];
    $country = $_POST["country"];
    $school = $_POST["school"];
    $town = $_POST["town"];
    $writername = $_POST["writer"];
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

    //이미지 file upload code
    if( isset($_FILES['thumbnail']) && !empty($_FILES['thumbnail']) ){
      $uploadStatus = $_FILES['thumbnail']['error'];
      if( $uploadStatus==0 ){
          // Copy source file to temp file
    //     move_uploaded_file($_FILES['thumbnail']['tmp_name'], "$uploadBase/$filen" );
          if( !move_uploaded_file($_FILES['thumbnail']['tmp_name'], "$uploadBase/$filen" )) {
              throw new Exception("fileUploadCopy");
          }

      } else{
          if( $uploadStatus==1 ){ throw new Exception("fileUploadIniSize"); }
          else if( $uploadStatus==2 ){ throw new Exception("fileUploadFormSize"); }
          else if( $uploadStatus==3 ){ throw new Exception("fileUploadPartial"); } // THIS ERROR ...
          else if( $uploadStatus==4 ){ throw new Exception("fileUploadNoFile"); }
          else if( $uploadStatus==6 ){ throw new Exception("fileUploadNoTmpDir"); }
          else if( $uploadStatus==7 ){ throw new Exception("fileUploadCantWrite"); }
          else if( $uploadStatus==8 ){ throw new Exception("fileUploadExtension"); }
          else{
              throw new Exception("fileUploadSystem");
          }
      }
    } else{
      throw new Exception("fileUploadUpload"); // ... OR THIS ERROR]
    }
    $thumbnail = "$uploadBase/$filen";


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
              setTimeout(function() { alert('게시글이 정상적으로 수정 되었습니다.'); }, 3000);
              location.replace('http://localhost/review-det.html?review_no=".$review_no."');
              </script>");
    } else {
      echo "fail";
    }

  } else {
    $review_no = $_POST["review_no"];

    $sql = "UPDATE review SET deleted = 1 WHERE review_no = '$review_no'";


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
