
<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();
$userId = $_SESSION['userId'];

  $conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
  if (!$conn) {
      die ('Failed'.mysqli_connect_error());
  }



 $mode = $_POST["mode"];


  if ($mode == "create") {

    $title = $_POST["title"];
    $content = $_POST["content"];

    // 이미지 태그만 제거
    $element = preg_replace('@<[/]*img.*?>@is','',$content);

    $country = $_POST["country"];
    

    $uploadBase = 'uploadimg';
    $filen = $_FILES['thumbnail']['name'];


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

    

    $sql = "INSERT INTO blog (created, aid, title, content, thumbnail, country, element) VALUES (
      NOW(),
      '$userId', 
      '$title',
      '$content',
      '$thumbnail',
      '$country',
      '$element'
    )";




   } else if ($mode == "update") {

   } else if ($mode == "delete") {

   }

   if ($conn->query($sql) === true ){

    echo("<script>window.alert('게시글이 등록 되었습니다.')
          location.replace('http://localhost/blog.html');
          </script>"); 

    } else {

    echo"error :".$sql.$conn->error; 

    }


    

?>