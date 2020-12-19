
<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

session_start();
$userId = $_SESSION['userId'];

  $conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
  if (!$conn) {
      die ('Failed'.mysqli_connect_error());
  }



 $mode = $_POST["mode"];


  if ($mode == "create") {

    $sc_country = $_POST["sc_country"];
    $sc_town = $_POST["sc_town"];
    $sc_advantg = $_POST["sc_advantg"];
    $sc_hpage = $_POST["sc_hpage"];
    $sc_email = $_POST["sc_email"];
    $sc_add = $_POST["sc_add"];
    $sc_tel = $_POST["sc_tel"];
    $sc_fax = $_POST["sc_fax"];
    $sc_name = $_POST["sc_name"];
    $sc_fyear = $_POST["sc_fyear"];
    $sc_stqty = $_POST["sc_stqty"];
    $sc_stqtypct = $_POST["sc_stpct"];
    $sc_exp = $_POST["sc_exp"];
    $sc_etc = $_POST["sc_etc"];


    $uploadBase = 'uploadimg';
    $filen = $_FILES['sc_thumbnail']['name'];


      //이미지 file upload code
      if( isset($_FILES['sc_thumbnail']) && !empty($_FILES['sc_thumbnail']) ){
        $uploadStatus = $_FILES['sc_thumbnail']['error'];
        if( $uploadStatus==0 ){

            if( !move_uploaded_file($_FILES['sc_thumbnail']['tmp_name'], "$uploadBase/$filen" )) {
                throw new Exception("fileUploadCopy");
            }

        } else{
            if( $uploadStatus==1 ){ throw new Exception("fileUploadIniSize"); }
            else if( $uploadStatus==2 ){ throw new Exception("fileUploadFormSize"); }
            else if( $uploadStatus==3 ){ throw new Exception("fileUploadPartial"); } // THIS ERROR ...
            else if( $uploadStatus==4 ){ throw new Exception("fileUploadNoFile"); }
            else if( $uploadStatus==6 ){ throw new Exception("fileUploadNoTmpDir"); }
            else if( $uploadStatus==7 ){ throw new Exception("fileUploadCantWrite"); }
            else if( $uploadStatus==8 ){ throw new Exception("fileUploadExtension"); }
            else{
                throw new Exception("fileUploadSystem");
            }
        }
      } else{
        throw new Exception("fileUploadUpload"); // ... OR THIS ERROR]
      }

    $sc_thumbnail = "$uploadBase/$filen";

    

    $sql = "INSERT INTO advertise (created, aid, country, town, sc_advantg, sc_hpage, sc_email, sc_add, sc_tel, sc_fax, sc_name, sc_fyear, sc_stqty, sc_stqtypct, sc_exp, sc_etc, sc_thumbnail) VALUES (
      NOW(),
      '$userId', 
      '$sc_country',
      '$sc_town',
      '$sc_advantg',
      '$sc_hpage',
      '$sc_email',
      '$sc_add',
      '$sc_tel',
      '$sc_fax',
      '$sc_name',
      '$sc_fyear',
      '$sc_stqty',
      '$sc_stqtypct',
      '$sc_exp',
      '$sc_etc',
      '$sc_thumbnail'
    )";




   } else if ($mode == "update") {

   } else if ($mode == "delete") {

   }

   if ($conn->query($sql) === true ){

    echo("<script>window.alert('게시글이 등록 되었습니다.')
          location.replace('http://localhost/advertise.html');
          </script>"); 

    } else {

    echo"error :".$sql.$conn->error; 

    }


    

?>