 

function getUrlParams() {
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
  return params;
}
var Param = getUrlParams();
// console.log(getUrlParams());
// console.log(Param.rc);



// 상단 nav 탭을 클릭하고 들어온 경우 아래와같이 url 명으로 구분하여 db를 가져옴
var thisfilefullname = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length);
console.log(thisfilefullname);

// url 파라미터가 없는경우 즉 상단 nav탭을 클릭하고 들어온 경우 파일명으로 구분하여 db를 가져옴
// goView 의 국가보기 기본값은 '모든 국가보기' 로 설정
if (Param.rc == null) {

console.log(Param.rc == null);

  if (thisfilefullname == 'review.html') {
    
    goView(1,1);
  
  } else if (thisfilefullname == 'blog.html'){
  
    goView(6,1);
  
    
  } else if (thisfilefullname == 'advertise.html') {
  
    goView(10,1);
  
  }

  // url 파라미터가 있는경우 ex) review-wri.html or review-det.html 의 경로에서 왼쪽 nav탭을 클릭하여 접근한경우 파라미터값이 발생
} else {
  console.log(Param.rc != null);

    goView(Param.rc,1);  

}

          
var emptymsg1 = $(".galleryList").html('<div>현재 모든 게시물이 없습니다.<div>');   
var emptymsg2 = $(".galleryList").html('<div>현재 미국/캐나다의 게시물이 없습니다.<div>');   
var emptymsg3 = $(".galleryList").html('<div>현재 영국/아일랜드의 게시물이 없습니다.<div>');   
var emptymsg4 = $(".galleryList").html('<div>현재 호주/뉴질랜드의 게시물이 없습니다.<div>');   
var emptymsg5 = $(".galleryList").html('<div>현재 필리핀/몰타의 게시물이 없습니다.<div>');   
var emptymsg6 = $(".blogList").html('<div>현재 모든 게시물이 없습니다.<div>');   
var emptymsg7 = $(".blogList").html('<div>현재 미국/캐나다의 게시물이 없습니다.<div>');   
var emptymsg8 = $(".blogList").html('<div>현재 영국/아일랜드의 게시물이 없습니다.<div>');   
var emptymsg9 = $(".blogList").html('<div>현재 호주/뉴질랜드의 게시물이 없습니다.<div>');   
var emptymsg10 = $(".blogList").html('<div>현재 필리핀/몰타의 게시물이 없습니다.<div>');   
var emptymsg11 = $(".advertiseList").html('<div>현재 모든 게시물이 없습니다.<div>');   
var emptymsg12 = $(".advertiseList").html('<div>현재 미국/캐나다의 게시물이 없습니다.<div>');   
var emptymsg13 = $(".advertiseList").html('<div>현재 영국/아일랜드의 게시물이 없습니다.<div>');   
var emptymsg14 = $(".advertiseList").html('<div>현재 호주/뉴질랜드의 게시물이 없습니다.<div>');   
var emptymsg15 = $(".advertiseList").html('<div>현재 필리핀/몰타의 게시물이 없습니다.<div>');   


// 왼쪽 nav 탭을 클릭했을때 가져오는 나라별데이터 db 에서 데이터 가져옴
// 나라별 데이터 json으로 가져오면 html 태그안에 데이터 넘버와함께 지정
// review - galleryList / blog - blogList / advertise 는 고민중 ------ 수정예정

function goView(inputno, pageno) {


  console.log("inputno :" +inputno);
  console.log("pageno :" +pageno); 

  
  for (var i = 1 ; i <= 5 ; i++) {
  
    if ( inputno == i || inputno-5 == i) {
      
      $(".lnb li a:eq("+(i-1)+")").css('font-weight','bold');

    } else {

      $(".lnb li a:eq("+(i-1)+")").css('font-weight','normal');

    }
  
  }

    

    $.ajax({
      type:"GET",
      dataType:"json",
      url: "review.php",
      data: {'rc':inputno, 'page':pageno},
      success : function(json) {
        console.log(json);

        if (json.res == "notok") {

          for (var i = 1 ; i <= 15 ; i++) {

            if ( inputno <=5 && inputno == i ) {
                
              emptymsg+i;

            } else if ( 5 < inputno && inputno <= 10 && inputno == i ) {

              emptymsg+i;


            } else if (  10 < inputno && inputno == i ) {

              emptymsg+i;

            }
          }

        } else {

          var jsondata = json.data;


          if (json.data[0].review_no != null) {

            $(".galleryList").html(reviewchange(jsondata));
            console.log(reviewchange(jsondata));

            goPage(inputno, json.totalData, pageno);
  

          } else if (json.data[0].blog_no != null) {

            $(".blogList").html(blogchange(jsondata, pageno));
            console.log(blogchange(jsondata));

            goPage(inputno, json.totalData, pageno);

          } else if (json.data[0].advertise_no != null) {
              
            $(".galleryList").html(advertisechange(jsondata));
            console.log(advertisechange(jsondata));

            goPage(inputno, json.totalData, pageno);

          }

        }

      }, error : function(xhr, status, error) {
//        var err = JSON.parse(xhr.responseText);
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

function blogchange (blogdata, gopageno) {

  
  var str = '';

      blogdata.forEach(function(item,index){

        
        var str2 = '<div class="blogBox"><div class="blogThumb"><div class="thumbImg imgLiquidFill imgLiquid"><a href="javascript:goDetail('+item.blog_no+','+gopageno+');"><img src="'+item.thumbnail+'"></a></div></div>';
        var str3 = '<div class="blogText"><a href="javascript:goDetail('+item.blog_no+','+gopageno+');"><p class="titleText">'+item.title+'</p><p></p>';
        var str4 = '<p class="prvText">'+item.element+'</p><div class="writerview"><div class="profile_date_area">작성자 : '+item.aid+'   <span style="color:gray;">'+item.created+'</span></div>';
        var str5 = '<div class="detail_area"><div>조회수 : '+item.view+'<span>   댓글 : '+item.comment+'</span></div></div></div></a></div></div>';
        str = str+str2+str3+str4+str5; 
      })

  return str;

}

function advertisechange (addata) {

}

  // review-det.html/ review-wri.html 에서 왼쪽 nav탭을 클릭했을경우 이동하는 경로
  // url 의 폴더이름이 review.html or blog.html or advertise.html 이 아닌경우
  // review.html 로 이동하게 됨. 
  // 폴더이름이 review.html 이 아니면서 파일이름이 r로 시작할때
  // var queryString = window.location.pathname; // 파일 명만 가져옴 review.html/review-det.html/review-wri.html 을 구분하기 위해
  // console.log(queryString == '/review.html');
  
  // if (queryString != '/review.html' && queryString.charAt(1) == 'r') {

  //   console.log("location 지났는지"+inputno);


  //   window.location.href = 'review.html?rc='+inputno+'&page=1';

  // } else if (queryString != '/blog.html' && queryString.charAt(1) == 'b'){
  
  //   window.location.href = 'blog.html?rc='+inputno+'&page=1';
    
  // } else if (queryString != '/advertise.html' && queryString.charAt(1) == 'a') {
  
  //   window.location.href = 'advertise.html?rc='+inputno+'&page=1';
  
  // }