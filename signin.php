
<?php

//error_reporting(E_ALL);
//ini_set('display_errors', '1');

//로그인시 사용
$userId = $_POST["id"];
$userPw = $_POST["password"];

//include ("connect.php");
// $sql == "SELECT * FROM blogin where id='$userId' && pass='$$userPw'";

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}

$sql = "SELECT * FROM topic WHERE id = '$userId'";
$result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
$row = mysqli_fetch_array($result);
//print_r( $row );

$loginpw_hash = hash("sha256", $userPw);

// 로그인 하려는 id와 pw를 조회해서 db에 데이터가 있는경우
if ($row['id']==$userId && $row['pass']==$loginpw_hash) {
  
  session_start();
  
  $_SESSION['userId'] = $userId;
  echo("<script>location.replace('http://localhost/index.html');</script>"); 


// 유저데이터가 없거나 맞지 않은경우 errmsg 발송
} else {
  
  echo("<script>
          window.alert('아이디 혹은 비밀번호가 틀립니다')
          location.replace('http://localhost/login.html');
        </script>"); 
  
}

?>
