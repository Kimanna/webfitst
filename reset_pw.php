
<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

//회원가입시 입력받는 정보 
$userId = $_POST["id"];
$userPw = $_POST["password"];

$password_hash = hash("sha256", $userPw);


$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}

$sql = "UPDATE topic SET pass = '$password_hash' WHERE id = '$userId'";


if ($conn->query($sql) === true ){
  

  echo("<script>
          window.alert('비밀번호가 변경 되었습니다.')
          location.replace('login.html');
         </script>"); 

} else {
  
  echo"error :".$sql.$conn->error; 
  
}

$conn->close();

?>
