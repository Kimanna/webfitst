
<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');


  $conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
  if (!$conn) {
      die ('Failed'.mysqli_connect_error());
  }

  // echo $_POST["mode"];

  if ($_POST["mode"] == 'create') {

    $title = $_POST["title"];
    $content = $_POST["content"];
    $userId = "8";

    $sql = " INSERT INTO blog (created, aid, title, content) 
    VALUES (
      NOW(),
      '$userId', 
      '$title',
      '$content'
    )";


    // echo ($conn->query($sql) === true);


    if ($conn->query($sql) === true ){

      echo("<script>window.alert('게시글이 등록 되었습니다.')
              location.replace('http://localhost/blog.html');</script>"); 

      } else {

      echo"error :".$sql.$conn->error; 

      }

  } else if ($_POST["mode"]) == 'update' {

  } else if ($_POST["mode"]) == 'delete' {

  }


?>