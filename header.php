
<header class="blog-header py-3">
  <div class="row flex-nowrap justify-content-between align-items-center">
    <div class="col-4 pt-1">
        <a class="text-muted" href="#">Introduce</a>
    </div>
    <div class="col-4 text-center">
        <a class="blog-header-logo text-dark" href="index.html">어학연수 모임</a>
    </div>
    <div class="col-4 d-flex justify-content-center align-items-center">
        <span id="loginuser"></span>



        <?php

        // 로그인시 등록한 session userId 가 있는경우 로그인 버튼 감춤
        // session userId 값이 없는경우 로그인 버튼을 보여줌
        if(isset($_SESSION['userId'])) {
           ?>
          <a><?php echo $_SESSION['userId']; ?>님 안녕하세요&nbsp&nbsp&nbsp&nbsp</a>
          <a class="btn btn-sm btn-outline-secondary" href="mypage.html">마이페이지</a>

          <?php
        } else {
          ?>
          <a class="btn btn-sm btn-outline-secondary" href="login.html">로그인</a>
        <?php
        }
        ?>
        

</div>
  </div>
</header>

<div class="nav-scroller py-1 mb-2">
<nav class="nav d-flex justify-content-between">
<a class="p-2 text-muted" href="advertise.html">어학원홍보</a>
<a class="p-2 text-muted" href="review.html">연수후기</a>
<a class="p-2 text-muted" href="blog.html">연수blog</a>
  <a class="p-2 text-muted" href="#">온라인Q&A</a>
</nav>
</div>