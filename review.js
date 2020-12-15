//세션값 확인하는 부분
// var signup = document.getElementsById('sessionisset');
// var loginuser = document.getElementsById('loginuser');

//   var userId = window.sessionStorage.getItem("userId");
//   if (window.sessionStorage.getItem("userId") == null) {
//     signup.setAttribute( 'href', 'login.html' );
//     signup.innerHTML = "sign in";
//     loginuser.style.display = "none"; 
//     }
//   if (window.sessionStorage.getItem("userId") != null) {
//     signup.setAttribute( 'href', 'logout.php' );
//     signup.innerHTML = "sign out";
//     loginuser.innerHTML = userId+" 님이 로그인 중입니다.";
//     loginuser.style.display = "inline-block";  
//   }

//   console.log(window.sessionStorage.getItem("userId"));
//   console.log(window.sessionStorage.length());  

function getUrlParams() {
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
  return params;
}
var Param = getUrlParams();
// console.log(getUrlParams().data == null);



// 상단 nav 탭을 클릭하고 들어온 경우 아래와같이 url 명으로 구분하여 db를 가져옴
var thisfilefullname = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length);
console.log(thisfilefullname);

if (thisfilefullname == 'review.html') {

  goView("rca");

} else if (thisfilefullname == 'blog.html'){

  goView("bca");
  
} else if (thisfilefullname == 'advertise.html') {

  goView("aca");

}

 

// 왼쪽 nav 탭을 클릭했을때 가져오는 나라별데이터 db 에서 데이터 가져옴
// 나라별 데이터 json으로 가져오면 html 태그안에 데이터 넘버와함께 지정
// review - galleryList / blog - blogList / advertise 는 고민중 ------ 수정예정

function goView(inputno) {


  // url 의 폴더이름이 상단탭의 메인페이지가 아니라면 해당 상단탭의 메인페이지로 이동하게됨 
  // 폴더이름이 review.html 이 아니면서 파일이름이 r로 시작할때
  var queryString = window.location.pathname;
  console.log(queryString == '/review.html');
  
  if (queryString != '/review.html' && queryString.charAt(1) == 'r') {

    window.location.href = 'review.html';

  } else if (queryString != '/blog.html' && queryString.charAt(1) == 'b'){
  
    window.location.href = 'blog.html';
    
  } else if (queryString != '/advertise.html' && queryString.charAt(1) == 'a') {
  
    window.location.href = 'advertise.html';
  
  }
  
      // url 경로에 따라 불러오는 db에서 불러오는 table 명 을 구분짓기 위한 if문
    if (getUrlParams().data != null) {

      var thisfilefoldername = thisfilefullname.substring(thisfilefullname.lastIndexOf('.'), 0);
      console.log(thisfilefoldername);
      console.log(thisfilefoldername.charAt == 'r');
      console.log(thisfilefullname != 'review.html');

      if (thisfilefoldername.charAt == 'r' && thisfilefullname != 'review.html') {

        

      } else if (thisfilefoldername == 'blog.html'){
      
        window.location.href = 'blog.html';
        
      } else if (thisfilefoldername == 'advertise.html') {
      
        window.location.href = 'advertise.html';
      
      } 
    }


    $.ajax({
      type:"GET",
      dataType:"json",
      url: "review.php",
      data: {'rc':inputno},
      success : function(json) {
        console.log(inputno);
        console.log(json);

        if (json.res == "notok") {

          if (inputno == "rca" ) {

            $(".galleryList .blogList").html('<div>현재 모든 게시물이 없습니다.<div>');

          } else if (inputno == "rc1") {

            $(".galleryList").html('<div>현재 미국/캐나다의 게시물이 없습니다.<div>');

          } else if (inputno == "rc2") {

            $(".galleryList").html('<div>현재 영국/아일랜드의 게시물이 없습니다.<div>');
            
          } else if (inputno == "rc3") {

            $(".galleryList").html('<div>현재 호주/뉴질랜드의 게시물이 없습니다.<div>');
            
          } else if (inputno == "rc4") {

            $(".galleryList").html('<div>현재 필리핀/몰타의 게시물이 없습니다.<div>');
            
          } else if (inputno == "bca") {

            $(".galleryList").html('<div>현재 모든 게시물이 없습니다.<div>');

          } else if (inputno == "bc1") {

            $(".galleryList").html('<div>현재 미국/캐나다의 게시물이 없습니다.<div>');

          } else if (inputno == "bc2") {

            $(".galleryList").html('<div>현재 영국/아일랜드의 게시물이 없습니다.<div>');
            
          } else if (inputno == "bc3") {

            $(".galleryList").html('<div>현재 호주/뉴질랜드의 게시물이 없습니다.<div>');
            
          } else if (inputno == "bc4") {

            $(".galleryList").html('<div>현재 필리핀/몰타의 게시물이 없습니다.<div>');
            
          } else if (inputno == "aca") {

            $(".galleryList").html('<div>현재 모든 게시물이 없습니다.<div>');

          }else if (inputno == "ac1") {

            $(".galleryList").html('<div>현재 미국/캐나다의 게시물이 없습니다.<div>');

          } else if (inputno == "ac2") {

            $(".galleryList").html('<div>현재 영국/아일랜드의 게시물이 없습니다.<div>');
            
          } else if (inputno == "ac3") {

            $(".galleryList").html('<div>현재 호주/뉴질랜드의 게시물이 없습니다.<div>');
            
          } else {

            $(".galleryList").html('<div>현재 필리핀/몰타의 게시물이 없습니다.<div>');

          }

        } else {

          $(".galleryList").html(htmlchange(json));
          console.log(htmlchange(json));

        }
 


      }, error : function(xhr, status, error) {
//        var err = JSON.parse(xhr.responseText);
          // var obj = jQuery.parseJSON('{"name":"John"}');

        console.log(err.Message);
        console.log("실패");
      }
    })
  
}

function htmlchange (reviewdata) {

  var str0 = '<ul>';
  var str1 = '</ul>';
  var str5 = '';

  reviewdata.forEach(function(item,index){
    
    var str2 = '<li class="galBox" style="height: 430px;"><a href="javascript:goDetail('+item.review_no+');"><div class="galThumb imgLiquidFill imgLiquid hg"><img src="'+item.thumbnail+'"></div></a>';
    var str3 = '<div class="galText"><dl> <dt>이름 : <a href="javascript:goView('+item.review_no+');">'+item.writername+'</a></dt>';
    var str4 = '<dd>지역 : '+item.town+'</dd><dd>학교 : '+item.school+'</dd></dl></div></li>';
    str5 = str5+str2+str3+str4; 
  })

  return str0+str5+str1;
}

function goDetail (inputno) {
  
  console.log(inputno);
  window.location.href = 'review-det.html?review_no='+inputno;

}



// // review.html 에서 등록하기 버튼을 클릭한 경우 작동하는 메서드
// // 로그인 상태면 글을 쓸 수 있지만 로그인상태가 아니면 글을 쓸수 없다는 메시지를 출력 ---------------수정해야함
// document.getElementById("register").onclick = function() {

//   location.replace('http://localhost/review-wri.html');
//   // alert('로그인이 필요합니다. 로그인 해주세요.');  

// };