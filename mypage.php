<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();

if (isset($_SESSION["userId"])) {
  
  $userId = $_SESSION['userId'];
  
  

  $conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
   if (!$conn) {
    die ('Failed'.mysqli_connect_error());
  } else {
  //  echo "success";
  }


    // review, blog 중 어떤 목록의 더보기를 원하는 지 구분하는 부분
    if (isset($_GET["which_list"])) {
      $start_number = $_GET["start_number"];

    
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

   
      // 프로필 image와 nickname을 수정하는 경우
      // image는 따로 선택하지 않는경우 기존이미지파일에서 update하지 않음.
    } else if (isset($_POST["update_profile"])) {

        $update_nickname = $_POST["send_nickname"];

          
          //이미지 file upload code
          if( isset($_FILES['send_photo']) && !empty($_FILES['send_photo']) ){
            $file_name = $_FILES["send_photo"]['name'];
            $uploadBase = 'images';

            $uploadStatus = $_FILES['send_photo']['error'];
            if( $uploadStatus==0 ){

                if( !move_uploaded_file($_FILES['send_photo']['tmp_name'], "$uploadBase/$file_name" )) {
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


              $profile_img = "$uploadBase/$file_name";
              $update_profile_query = mysqli_query($conn, "UPDATE topic SET nickname = '$update_nickname', profileimg = '$profile_img' WHERE id = '$userId';");


          // 만약 첨부한 이미지가 없는경우 nickname만 update
          } else{
              $update_profile_query = mysqli_query($conn, "UPDATE topic SET nickname = '$update_nickname' WHERE id = '$userId';");

            // throw new Exception("fileUploadUpload"); // ... OR THIS ERROR]
          }

          $userquery = mysqli_query($conn, "SELECT * FROM topic WHERE id='$userId'");
          $userprofiledata = mysqli_fetch_array($userquery);

          echo json_encode(array('res'=>"ok", 'data'=>$userprofiledata));


    } else if (isset($_POST["update_info"])) {

        $change_birth = $_POST["change_birth"];
        $change_gender = $_POST["change_gender"];
        $change_email = $_POST["change_email"];

        $update_info_query = mysqli_query($conn, "UPDATE topic SET birth = '$change_birth', gender = $change_gender, email = '$change_email' WHERE id = '$userId';");

        echo json_encode(array('res'=>"ok"));


    } else if (isset($_GET["start_number"])) {
      $start_number = $_GET["start_number"];


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