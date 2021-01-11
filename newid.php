
<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

//회원가입시 입력받는 정보 
$userId = $_POST["id"];
$userPw = $_POST["password"];
$username = $_POST["username"];
$userbirth = $_POST["bir_yy"].$_POST["bir_mm"].$_POST["bir_dd"];
$useremail = $_POST["email"];
$usergender = $_POST["gender"];

$password_hash = hash("sha256", $userPw);


$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}

$sql = "
  INSERT INTO topic (id, pass, name, gender, birth, email, created)
  VALUES (
    '$userId', 
    '$password_hash',
    '$username',
    '$usergender',
    '$userbirth',
    '$useremail',
    NOW()    
  )";


if ($conn->query($sql) === true ){
  

  echo("<script>
          window.alert('회원가입이 완료되었습니다. 로그인 해주세요')
          location.replace('login.html');
         </script>"); 

} else {
  
  echo"error :".$sql.$conn->error; 
  
}

$conn->close();

?>
