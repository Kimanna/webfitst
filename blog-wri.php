
<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();
$userId = $_SESSION['userId'];

  $conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
  if (!$conn) {
      die ('Failed'.mysqli_connect_error());
  } 
 $mode = $_POST['mode']
 $mode = $_POST["mode"]
 $mode = $_POST['mode']
  // if ($mode == 'create') {

    $title = $_POST["title"];
    $content = $_POST["content"];
    // $title = "title";
    // $content = "content";


    $sql = "INSERT INTO blog (created, aid, title, content) VALUES (NOW(),
      '$userId', 
      '$title',
      '$content'
    )";


    if ($conn->query($sql) === true ){

      echo("<script>window.alert('게시글이 등록 되었습니다.')
            location.replace('http://localhost/blog.html');
            </script>"); 

      } else {

      echo"error :".$sql.$conn->error; 

      }

  // } else if ($_POST["mode"]) == 'update' {

  // } else if ($_POST["mode"]) == 'delete' {

  // }


?>