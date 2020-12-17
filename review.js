 

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

  $(".lnb li a:eq(0)").css('font-weight','bold');
  goView("rca");

} else if (thisfilefullname == 'blog.html'){

  $(".lnb li a:eq(0)").css('font-weight','bold');
  goView("bca");

  
} else if (thisfilefullname == 'advertise.html') {

  $(".lnb li a:eq(0)").css('font-weight','bold');
  goView("aca");

}

 

// 왼쪽 nav 탭을 클릭했을때 가져오는 나라별데이터 db 에서 데이터 가져옴
// 나라별 데이터 json으로 가져오면 html 태그안에 데이터 넘버와함께 지정
// review - galleryList / blog - blogList / advertise 는 고민중 ------ 수정예정

function goView(inputno) {


  // url 의 폴더이름이 상단 nav 의 메인페이지가 아니라면 해당 상단탭의 메인페이지로 이동하게됨 
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

            $(".lnb li a:eq(0)").css('font-weight','bold');
            $(".galleryList .blogList").html('<div>현재 모든 게시물이 없습니다.<div>');

          } else if (inputno == "rc1") {

            $(".lnb li a:eq(1)").css('font-weight','bold');
            $(".galleryList").html('<div>현재 미국/캐나다의 게시물이 없습니다.<div>');

          } else if (inputno == "rc2") {

            $(".lnb li a:eq(2)").css('font-weight','bold');
            $(".galleryList").html('<div>현재 영국/아일랜드의 게시물이 없습니다.<div>');
            
          } else if (inputno == "rc3") {

            $(".lnb li a:eq(3)").css('font-weight','bold');
            $(".galleryList").html('<div>현재 호주/뉴질랜드의 게시물이 없습니다.<div>');
            
          } else if (inputno == "rc4") {

            $(".lnb li a:eq(4)").css('font-weight','bold');
            $(".galleryList").html('<div>현재 필리핀/몰타의 게시물이 없습니다.<div>');
            
          } else if (inputno == "bca") {

            $(".lnb li a:eq(0)").css('font-weight','bold');
            $(".blogList").html('<div>현재 모든 게시물이 없습니다.<div>');

          } else if (inputno == "bc1") {

            $(".lnb li a:eq(1)").css('font-weight','bold');
            $(".blogList").html('<div>현재 미국/캐나다의 게시물이 없습니다.<div>');

          } else if (inputno == "bc2") {

            $(".lnb li a:eq(2)").css('font-weight','bold');
            $(".blogList").html('<div>현재 영국/아일랜드의 게시물이 없습니다.<div>');
            
          } else if (inputno == "bc3") {

            $(".lnb li a:eq(3)").css('font-weight','bold');
            $(".blogList").html('<div>현재 호주/뉴질랜드의 게시물이 없습니다.<div>');
            
          } else if (inputno == "bc4") {

            $(".lnb li a:eq(4)").css('font-weight','bold');
            $(".blogList").html('<div>현재 필리핀/몰타의 게시물이 없습니다.<div>');
            
          } else if (inputno == "aca") {

            $(".lnb li a:eq(0)").css('font-weight','bold');
            $(".galleryList").html('<div>현재 모든 게시물이 없습니다.<div>');

          }else if (inputno == "ac1") {

            $(".lnb li a:eq(1)").css('font-weight','bold');
            $(".galleryList").html('<div>현재 미국/캐나다의 게시물이 없습니다.<div>');

          } else if (inputno == "ac2") {

            $(".lnb li a:eq(2)").css('font-weight','bold');
            $(".galleryList").html('<div>현재 영국/아일랜드의 게시물이 없습니다.<div>');
            
          } else if (inputno == "ac3") {

            $(".lnb li a:eq(3)").css('font-weight','bold');
            $(".galleryList").html('<div>현재 호주/뉴질랜드의 게시물이 없습니다.<div>');
            
          } else {

            $(".lnb li a:eq(4)").css('font-weight','bold');
            $(".galleryList").html('<div>현재 필리핀/몰타의 게시물이 없습니다.<div>');

          }

        } else {

          if (json[0].review_no != null) {

            $(".galleryList").html(reviewchange(json));
            console.log(reviewchange(json));
  

          } else if (json[0].blog_no != null) {

            $(".blogList").html(blogchange(json));
            console.log(blogchange(json));

          } else if (json[0].advertise_no != null) {
              
            $(".galleryList").html(advertisechange(json));
            console.log(advertisechange(json));

          }

        }
 


      }, error : function(xhr, status, error) {
//        var err = JSON.parse(xhr.responseText);
          // var obj = jQuery.parseJSON('{"name":"John"}');

        // console.log(err.Message);
        // console.log("실패");
      }
    })
  
}

function reviewchange (reviewdata) {

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

function blogchange (blogdata) {

  var str = '';

  blogdata.forEach(function(item,index){
    
    var str2 = '<div class="blogBox"><div class="blogThumb"><div class="blogDate"><a href="javascript:goDetail('+item.blog_no+');"><img src="upload_files/thumb20191226111856.png"></a></div></div>';
    var str3 = '<div class="blogText"><a href="javascript:goDetail('+item.blog_no+');"><p class="titleText">'+item.title+'</p><p></p>';
    var str4 = '<p class="prvText">'+item.content+'</p><div class="titledate" style="text-align:right;">'+item.created+'</div></a></div></div>';
    str = str+str2+str3+str4; 
  })

//   <div class="blogBox">
//   <div class="blogThumb">
//         <div class="thumbImg imgLiquidFill imgLiquid"><a href="javascript:goDetail(5580);"><img src="upload_files/thumb20191226111856.png"></a></div>
//     </div>
//     <div class="blogText">
//         <a href="javascript:goView(5580);">
//             <p class="titleText">셰필드 생활 #영국유학</p>
//             <p></p>
//             <p class="prvText">셰필드 생활런던에서의 한달 어학연수 생활을 마치고 셰필드로 본격적인 교환학생 학기를 위해 이동했다. 나는 오리엔테이션을 신청해서 1주일 먼저 교환학생들만 대상으로 하는 코스를 들었다. 이 코스를 통해 다른 나라에서 온 많은 ..</p>
//             <div class="titledate" style="text-align:right;">2020.12.18</div>
//           </a>
//     </div>
// </div>
  return str;

}

function advertisechange (addata) {

}

