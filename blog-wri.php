
<?php

// error_reporting(E_ALL);
// ini_set('display_errors', '1');


$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
if (!$conn) {
      die ('Failed'.mysqli_connect_error());
}
if (isset($_GET["page"])) {
  $page = $_GET["page"];
}

if (isset($_GET["mode"])) {
  $blog_no = $_GET["blog_no"];


  $sql = "UPDATE blog SET deleted = 1 WHERE blog_no = '$blog_no'";



if ($conn->query($sql) === true ){

  echo json_encode(array('res'=>'ok'));

  } else {


  echo json_encode(array('res'=>'notok'));

  }
  
  // isset $_GET["mode"] = delete 까지 if문 
} else if (isset($_POST["mode"])) {

  session_start();
  $userId = $_SESSION['userId'];

  if ($_POST["mode"] == 'create') {


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
    
        
    
        $sql = "INSERT INTO blog (created, aid, title, content, thumbnail, country, element, deleted) VALUES (
          NOW(),
          '$userId', 
          '$title',
          '$content',
          '$thumbnail',
          '$country',
          '$element',
          0
        )";
    
    
        if ($conn->query($sql) === true ){
    
          echo("<script>window.alert('게시글이 등록 되었습니다.')
                location.replace('http://localhost/blog.html');
                </script>"); 
    
          } else {
    
          echo"error :".$sql.$conn->error; 
    
          }


  // blog 게시물 $_POST["mode"] 가 create일때 마지막  
  } else if ($_POST["mode"] == 'update') {

    $blog_no = $_POST["blog_no"];

    
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



        $sql = "UPDATE blog SET 
        created = NOW(), title = '$title', content = '$content', thumbnail = '$thumbnail', country = '$country', element = '$element'
        WHERE blog_no = '$blog_no'";

    
    
        if ($conn->query($sql) === true ){
    
          echo("<script>window.alert('게시글이 수정 되었습니다.')
                location.replace('http://localhost/blog.html');
                </script>"); 
    
          } else {
    
          echo"error :".$sql.$conn->error; 
    
          }




    
  }
}






$conn->close();


?>