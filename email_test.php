<?php

error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");

require '/usr/share/php/libphp-phpmailer/PHPMailerAutoload.php';


$startfunction = true;
// var_dump($startfunction);

if ($startfunction) {
  
  // print_r('start');

  $name = 'anna';
  $email = 'kan12888@gmail.com';
  $subject = '주제';
  $body = '내용임';

  $mail = new PHPMailer();

  $mail->isSMTP();
  $mail->Host = "smtp.gmail.com";
  $mail->SMTPAuth = true; 
  $mail->Username = "kam1288@gmail.com";
  $mail->Password = 'kugban4044$';
  $mail->Port = 456;
  $mail->SMTPSecure = "ssl";
  
  $mail->isHTML(true);
  $mail->setFrom($email, $name);
  $mail->addAddress("kam1288@gmail.com");
  $mail->Subject = ("$subject");
  $mail->Body = $body;

      if($mail->send()) {
        $status = "success";
        $response = "Email is sent!";
      } else {
        $status = "success";
        $response = "fail".$mail->ErrorInfo;
      }
  // exit(json_encode(array("status"=>$status, "response"=>$response)));

  print_r($response);

}



?>