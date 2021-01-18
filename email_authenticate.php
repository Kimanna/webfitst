
<?php 

//회원가입시 아이디 중복체크
$which_case_check = $_GET["which_case_check"];
$input_user_email = $_GET["input_user_email"];

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
}

$sql = "SELECT * FROM topic WHERE email = '$input_user_email'";
$result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
$res = $conn->query($sql);

// 중복체크시 입력한 이메일과 동일한 아이디가 있는 경우

if($res->num_rows >= 1){

  echo json_encode(array('response'=>'existing_email'));


}else{

  
  $to = $input_user_email;
  $subject = "PHP 메일 발송";
  $contents = "PHP mail()함수를 이용한 메일 발송 테스트";
  $headers = "From: kam1288@naver.com";

  mail($to, $subject, $contents, $headers);

  echo json_encode(array('response'=>'sand_email'));

}

mysqli_close($conn);

?>
