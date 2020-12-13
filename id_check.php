
<?php 

//회원가입시 아이디 중복체크
$userId = $_GET["id"];

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
}

$sql = "SELECT * FROM topic WHERE id = '$userId'";
$result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
$row = mysqli_fetch_array($result);
$res = $conn->query($sql);

// 중복체크시 입력한 아이디와 동일한 아이디가 있는경우

if($res->num_rows >= 1){

  echo json_encode(array('res'=>'notok'));


}else{

  echo json_encode(array('res'=>'ok'));

}

mysqli_close($conn);

?>
