<?php

error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");


// $to = "kam1288@naver.com";
$to = "kan12888@gmail.com";
$subject = "PHP 메일 발송";
$contents = "PHP mail()함수를 이용한 메일 발송 테스트";

$headers = 'From: kan12888@gmail.com' . "\r\n" .
'Reply-To: kan12888@gmail.com' . "\r\n" .
'X-Mailer: PHP/' . phpversion();


// $headers = 'From: webmaster@example.com' . "\r\n";
// .'Reply-To: webmaster@example.com' . "\r\n" .
// 'X-Mailer: PHP/' . phpversion()



$result = mail($to, $subject, $contents, $headers);



if ($result) {
  echo ("success");
} else {
  echo ("fail");
}



?>