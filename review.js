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




// review 페이지에서 나라를 클릭했을때 데이터베이스에서 데이터 가져옴
function goView(inputno) {

  if ( inputno == "rca" || inputno == "rc1" || inputno == "rc2" || inputno == "rc3" || inputno == "rc4") {


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

            $(".galleryList").html('<div>현재 모든 데이터가 없습니다.<div>');

          } else if (inputno == "rc1") {

            $(".galleryList").html('<div>현재 미국/캐나다의 데이터가 없습니다.<div>');

          } else if (inputno == "rc2") {

            $(".galleryList").html('<div>현재 영국/아일랜드의 데이터가 없습니다.<div>');
            
          } else if (inputno == "rc3") {

            $(".galleryList").html('<div>현재 호주/뉴질랜드의 데이터가 없습니다.<div>');
            
          } else {

            $(".galleryList").html('<div>현재 필리핀/몰타의 데이터가 없습니다.<div>');

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
  } else {

    console.log(inputno);
    window.location.href = 'review-det.html?review_no='+inputno;

  }
}

// review 페이지 load 되면 첫 페이지에 모든 나라의 데이터
goView("rca");

function htmlchange (reviewdata) {

  var str0 = '<ul>';
  var str1 = '</ul>';
  var str5 = '';

  reviewdata.forEach(function(item,index){
    
    var str2 = '<li class="galBox" style="height: 430px;"><a href="javascript:goView('+item.review_no+');"><div class="galThumb imgLiquidFill imgLiquid hg"><img src="'+item.thumbnail+'"></div></a>';
    var str3 = '<div class="galText"><dl> <dt>이름 : <a href="javascript:goView('+item.review_no+');">'+item.writername+'</a></dt>';
    var str4 = '<dd>지역 : '+item.town+'</dd><dd>학교 : '+item.school+'</dd></dl></div></li>';
    str5 = str5+str2+str3+str4; 
  })

  // for (var i = 0 ; i < reviewdata.lenght ; i++) {
  // console.log(reviewdata[i]);
  // var str2 = '<li class="galBox" style="height: 430px;"><a href="javascript:goView('+reviewdata[i].review_no+');"><div class="galThumb imgLiquidFill imgLiquid hg"><img src="'+reviewdata[i].thumbnail+'"></div></a>';
  // var str3 = '<div class="galText"><dl> <dt>이름 : <a href="javascript:goView('+reviewdata[i].review_no+');">'+reviewdata[i].writername+'</a></dt>';
  // var str4 = '<dd>지역 : '+reviewdata[i].town+'</dd><dd>학교 : '+reviewdata[i].school+'</dd></dl></div></li>';
  // str5 = str5+str2+str3+str4;  
  // console.log(str5);
  // }

  return str0+str5+str1;

}


// review.html 에서 등록하기 버튼을 클릭한 경우 작동하는 메서드
// 로그인 상태면 글을 쓸 수 있지만 로그인상태가 아니면 글을 쓸수 없다는 메시지를 출력 ---------------수정해야함
document.getElementById("register").onclick = function() {

  location.replace('http://localhost/review-wri.html');
  // alert('로그인이 필요합니다. 로그인 해주세요.');  

};