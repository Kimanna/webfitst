<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

//회원가입시 입력받는 정보 유저aid / 나라정보 / 개인정보5 / 한국에서3 / 어학원에서14 => 총 24
$userId = "8";
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



$uploadBase = 'uploadimg';
$filen = $_FILES['thumbnail']['name'];

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
  throw new Exception("fileUploadUpload"); // ... OR THIS ERROR
}
$thumbnail = "$uploadBase/$filen";

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}

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

$conn->close();



?>