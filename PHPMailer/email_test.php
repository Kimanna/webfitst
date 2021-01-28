<?php

use PHPMailer;
error_reporting(-1);
ini_set('display_errors', 'On');
set_error_handler("var_dump");




// $startfunction = true;

// if ($startfunction) {
  
//   print_r('start');

//   $name = 'anna';
//   $email = 'kan12888@gmail.com';
//   $subject = '주제';
//   $body = '내용임';

//   require_once "PHPMailer/PHPMailer.php";
//   require_once "PHPMailer/SMTP.php";
//   require_once "PHPMailer/Exception.php";

//   $mail = new PHPMailer();

//   $mail->isSMTP();
//   $mail->Host = "smtp.gmail.com";
//   $mail->SMTPAuth = true;
//   $mail->Username = "kam1288@gmail.com";
//   $mail->Password = 'kugban4044$';
//   $mail->Port = 456;
//   $mail->SMTPSecure = "ssl";
  
//   $mail->isHTML(true);
//   $mail->setFrom($email, $name);
//   $mail->addAddress("kam1288@gmail.com");
//   $mail->Subject = ("$email ($subject)");
//   $mail->Body = $body;

//   if($mail->send()) {
//     $status = "success";
//     $response = "Email is sent!";
//   } else {
//     $status = "success";
//     $response = "fail".$mail->ErrorInfo;
//   }
//   // exit(json_encode(array("status"=>$status, "response"=>$response)));

//   print_r($response);

// }
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'kan12888@gmail.com';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = 'kan12888@gmail.com';                     // SMTP username
    $mail->Password   = 'kugban4044$';                               // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('from@example.com', 'Mailer');
    $mail->addAddress('kan12888@gmail.com', 'Joe User');     // Add a recipient
    // $mail->addAddress('ellen@example.com');               // Name is optional
    // $mail->addReplyTo('info@example.com', 'Information');
    $mail->addCC('cc@example.com');
    $mail->addBCC('bcc@example.com');

    // // Attachments
    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name

    // Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Here is the subject';
    $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}


?>