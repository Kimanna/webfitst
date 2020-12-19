
<?php
session_start();
// 로그인시 등록한 session userId 가 있는경우 로그인 버튼 감춤
// session userId 값이 없는경우 로그인 버튼을 보여줌
if(isset($_SESSION['userId'])) {

  echo ("<script> 
        location.replace('http://localhost/review-wri.html');
        </script>)");


} else {

  echo ("<script> 
        window.alert('게시글을 작성하려면 로그인이 필요합니다')
        location.replace('http://localhost/login.html');
        </script>)");

}
?>
