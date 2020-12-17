<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>어학원 홍보</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <!-- Custom styles for this template -->
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display:700,900" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="headernav.css" rel="stylesheet">
    <link href="advertise.css" rel="stylesheet">

    <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

</head>

<body>
    <div class="container">
      <?php include("header.php"); ?> 

        <main role="main" class="container">
            <div class="row flex-nowrap justify-content-between">
                <aside class="lnbBox text" id="lnbBox03">
                    <h2 class="lnbTitle">
                        <img src="" alt="어학연수 나라별">
                    </h2>
                    <ul class="lnb">
                      <li>
                        <a href="javascript:goView('bca');">모든국가보기</a>
                      </li>
                      <li>
                          <a href="javascript:goView('bc1');">미국/캐나다</a>
                      </li>
                      <li>
                          <a href="javascript:goView('bc2');">영국/아일랜드</a>
                      </li>
                      <li>
                          <a href="javascript:goView('bc3');">호주/뉴질랜드</a>
                      </li>
                      <li>
                          <a href="javascript:goView('bc4');">필리핀/몰타</a>
                      </li>
                  </ul>
                </aside>
                <div class="subContents">
                    <div class="pageState">
                        <ul>
                            <li><i class="fa fa-home"></i>&nbsp;HOME&nbsp;&nbsp;/&nbsp;&nbsp;</li>
                            <li>커뮤니티&nbsp;&nbsp;/&nbsp;&nbsp;</li>
                            <li>블로그 활동단</li>
                        </ul>
                    </div>
                    <h1 class="pageTitle">블로그 활동단</h1>
                        <div class="text-right">
                          <button type="button" class="btn lg" id="register" style="margin-bottom: 20px;" onclick="goWrite();">블로그 등록</button>
                        </div>
                        <div class="blogList">
                            <div class="blogBox">
                              <div class="blogThumb">
                                    <div class="thumbImg imgLiquidFill imgLiquid"><a href="javascript:goView(5580);"><img src="upload_files/thumb20191226111856.png"></a></div>
                                </div>
                                <div class="blogText">
                                    <a href="javascript:goView(5580);">
                                        <p class="titleText">셰필드 생활 #영국유학</p>
                                        <p></p>
                                        <p class="prvText">셰필드 생활런던에서의 한달 어학연수 생활을 마치고 셰필드로 본격적인 교환학생 학기를 위해 이동했다. 나는 오리엔테이션을 신청해서 1주일 먼저 교환학생들만 대상으로 하는 코스를 들었다. 이 코스를 통해 다른 나라에서 온 많은 ..</p>
                                    </a>
                                </div>

                            </div>
                        </div>
                    <form name="searchForm" action="?" method="get" onsubmit="goSearch();">
                        <input type="hidden" name="npage" value="1">
                        <input type="hidden" name="idx" value="">
                        <div class="boardSearch">
                            <!-- <div style="margin: 0 10px 0 0; line-height: 30px; font-size: 12px; display: inline-block;">
						<label><input type="radio" class="radioBtn" name="t1">제목</label>&nbsp;&nbsp;<label><input type="radio" class="radioBtn" name="t1">작성자</label>&nbsp;&nbsp;<label><input type="checkbox" class="checkBox" name="t2">제목</label>&nbsp;&nbsp;<label><input type="checkbox" class="checkBox" name="t2">작성자</label>
					</div>
					<select class="sltBox searchIpt" name="t3">
						<option value="010">전체</option>
						<option value="011">제목</option>
						<option value="011">내용</option>
					</select> -->
                            <input type="text" name="searchText" class="iptText searchIpt" placeholder="제목, 내용" value=""><button type="submit" class="searchBtn">검색</button>
                        </div>
                    </form>
                    <ul class="pagination">
                        <li><a href="#"><i class="fa fa-angle-left"></i></a></li>
                        <li><a href="#" class="current">1</a></li>
                        <li><a href="javascript:goPage(2);">2</a></li>
                        <li><a href="javascript:goPage(3);">3</a></li>
                        <li><a href="javascript:goPage(4);">4</a></li>
                        <li><a href="javascript:goPage(5);">5</a></li>
                        <li><a href="javascript:goPage(6);">6</a></li>
                        <li><a href="javascript:goPage(7);">7</a></li>
                        <li><a href="javascript:goPage(8);">8</a></li>
                        <li><a href="javascript:goPage(9);">9</a></li>
                        <li><a href="javascript:goPage(10);">10</a></li>
                        <li><a href="javascript:goPage(2);"><i class="fa fa-angle-right"></i></a></li>
                    </ul>
                </div>
            </div>
        </main>
        <footer class="blog-footer">
            <p>Copyright ⓒ 2020 - 2021 어학연수모임. All rights reserved.</p>
            <p>이메일 : <a href="https://getbootstrap.com/">kan12888@gmail.com</a></p>
            <p>
                <a href="#">Back to top</a>
            </p>
        </footer>
    </div>

    <script src="review.js"></script>
    <!-- <script src="blog.js"></script> -->
    <script>
      
        function goWrite(inputno) {

          window.location.href = 'blog-wri.html';
          
        }
    </script>
  </body>
</html>



<!-- <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script>
  jQuery( document ).ready( function( $ ) {
    // code ...
  } );
</script> -->
