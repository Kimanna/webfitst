
<?php



// *********처음 시도한 방법
// $uploadBase = 'uploadimg/';
// $filen = $_FILES['upload']['name'];


// if( isset($_POST['upload']) && !empty($_POST['upload']) ){
//   $uploadStatus = $_POST['upload']['error'];
//   if( $uploadStatus==0 ){

//       if( !move_uploaded_file($_POST['upload']['filename'], "$uploadBase/$filen" )) {
//           throw new Exception("fileUploadCopy");
//       }

//   } else{
//       if( $uploadStatus==1 ){ throw new Exception("fileUploadIniSize"); }
//       else if( $uploadStatus==2 ){ throw new Exception("fileUploadFormSize"); }
//       else if( $uploadStatus==3 ){ throw new Exception("fileUploadPartial"); } // THIS ERROR ...
//       else if( $uploadStatus==4 ){ throw new Exception("fileUploadNoFile"); }
//       else if( $uploadStatus==6 ){ throw new Exception("fileUploadNoTmpDir"); }
//       else if( $uploadStatus==7 ){ throw new Exception("fileUploadCantWrite"); }
//       else if( $uploadStatus==8 ){ throw new Exception("fileUploadExtension"); }
//       else{
//           throw new Exception("fileUploadSystem");
//       }
//   }
// } else{
//   throw new Exception("fileUploadUpload"); // ... OR THIS ERROR]
// }


// *********두번째 시도한 방법
// if(isset($_FILES["upload"])){

//   // $ext = ".".end((explode(".", $_FILES["upload"]["name"]))); 
//   // $filename="test";
//   // $file_public_addr = $uploadBase.$filename.$ext;

//   // $success = move_uploaded_file($_FILES["upload"]["filename"], "$uploadBase/$filen");

//   $ext = ".".end((explode(".", $_FILES["upload"]["name"]))); 
//   $filename="test";
//   $file_public_addr = $uploadBase.$filename.$ext;

//   $success = move_uploaded_file($_FILES["upload"]["tmp_name"], $uploadBase.$file_public_addr);
//   $localfileaddr = 'http://localhost/uploadimg/'.$filen;
//     if( $success){
//       $json["upload"] = $localfileaddr;
//       // $json["url"]=$localfileaddr;
//        echo json_encode($json);
//     }
  
//     if(!$success){
//         $json["upload"]=false;
//         $json["error"]=array("message"=>"Error Uploaded");
//          echo json_encode($json);
//     }
// }

// *********세번째 시도한 방법
// if(isset($_FILES["upload"])){

//   $ext = ".".end((explode(".", $_FILES["upload"]["name"]))); 
//   $filename="test";
//   $file_public_addr = $uploadBase.$filename.$ext;

//   $success = move_uploaded_file($_FILES["upload"]["tmp_name"], $uploadBase.$file_public_addr);
//     if( $success){
//       $json["uploaded"]=true;
//       $json["url"]=$localfileaddr;
//       json_encode($json);
//     }

//     if(!$success){
//         $json["uploaded"]=false;
//         $json["error"]=array("message"=>"Error Uploaded");
//         json_encode($json);
//     }
// }

error_reporting(E_ALL);
ini_set('display_errors', '1');


if(isset($_FILES["upload"]["name"])){

  $file = $_FILES["upload"]["tmp_name"];
  $file_name = $_FILES["upload"]["name"];
  $file_name_array = explode(".", $file_name);
  $extension = end($file_name_array);
  $new_image_name = rand().'.'.$extension;
  chmod('upload', 0777);
  $allowed_extension = array("jpg", "gif", "png");
  if (in_array($extension, $allowed_extension)) {
    move_uploaded_file($file, 'uploadimg/'.$new_image_name);
    $function_number = $_GET["CKEditorFuncNum"];
    $url = 'uploadimg/'.$new_image_name;
    $message = '';
    echo "<script type='text/javascript'>
          window.parent.CKEDITOR.tools.callFunction($function_number, '$url', '$message');</script>";
  }
}

?>