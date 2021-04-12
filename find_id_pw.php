
<?php 

// 아이디 찾기 쿼리
if (isset($_GET["find_id"])) {

  $name_ = $_GET["name"];
  $email = $_GET["email"];
  $sql = "SELECT * FROM topic WHERE email = '$email' AND name = '$name_'";

}

// 비번찾기 쿼리
if (isset($_GET["find_pw"])) {

  $id = $_GET["id"];
  $name_ = $_GET["name"];
  $email = $_GET["email"];
  $sql = "SELECT * FROM topic WHERE email = '$email' AND name = '$name_' AND id = '$id'";

}

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
}

$result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
$res = $conn->query($sql);

// 중복체크시 입력한 이메일과 동일한 아이디가 있는 경우
$Data = mysqli_fetch_array($result);

if($res->num_rows >= 1){

  echo json_encode(array('response'=>'ok', 'data'=>$Data));


}else{


  echo json_encode(array('response'=>'notok'));

}

mysqli_close($conn);

?>
