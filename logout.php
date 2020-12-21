<?php 

      session_start();

      session_destroy();
      echo("<script>
      location.replace('http://localhost/index.html');
      </script>"); 

?>