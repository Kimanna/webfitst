<?php
 session_start();
 if(isset($_SESSION['userId'])) {
   $jb_login = TRUE;
 }
 ?>