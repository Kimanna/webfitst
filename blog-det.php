<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');


$blog_no = $_GET["blog_no"];

$sql = "SELECT * FROM blog WHERE blog_no = '$blog_no'";


$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}

$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_row($result);



// echo json_encode(array('res'=>$row));

if ( mysqli_num_rows($result) > 0 ) {

  
  echo json_encode($row);


}

else{

  echo json_encode(array('res'=>"notok"));

}

$conn->close();

?>