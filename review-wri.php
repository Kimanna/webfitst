<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

//회원가입시 입력받는 정보 유저id / 나라정보 / 개인정보5 / 한국에서3 / 어학원에서14
$userId = $_POST["contry"];
$country = $_POST["contry"];
$school = $_POST["school"];
$town = $_POST["town"];
$writer = $_POST["writer"];
$thumbnail = $_POST["thumbnail"];
$st_homepage = $_POST["st_homepage"];

$st_content14 = $_POST["st_content14"];
$st_content1 = $_POST["st_content1"];
$st_content2 = $_POST["st_content2"];

$st_content15 = $_POST["st_content15"];
$st_content4 = $_POST["st_content4"];
$st_content5 = $_POST["st_content5"];
$st_content16 = $_POST["st_content16"];
$st_content12 = $_POST["st_content12"];
$st_content6 = $_POST["st_content6"];
$st_content22 = $_POST["st_content22"];
$st_content13 = $_POST["st_content13"];
$st_content7 = $_POST["st_content7"];
$st_content9 = $_POST["st_content9"];
$st_content3 = $_POST["st_content3"];
$st_content18 = $_POST["st_content18"];
$st_content19 = $_POST["st_content19"];
$st_content20 = $_POST["st_content20"];

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}



?>