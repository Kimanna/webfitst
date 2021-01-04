
<?php

session_start();
// 로그인시 등록한 session userId 가 있는경우 로그인 버튼 감춤
// session userId 값이 없는경우 로그인 버튼을 보여줌

if (isset($_SESSION['userId'])) {
  
    $userId = $_SESSION['userId'];

    $conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
      if (!$conn) {
        die ('Failed'.mysqli_connect_error());
      } else {
      //  echo "success";
      }
      $result = mysqli_query($conn, "SELECT * FROM topic WHERE id='$userId'");
      $row = mysqli_fetch_assoc($result);

      echo json_encode(array('res'=>"ok", 'data'=>$row));

      $conn->close();

} else {

  echo json_encode(array('res'=>"session_er"));

}



?>
