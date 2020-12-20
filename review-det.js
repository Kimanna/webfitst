

// 페이지가 로드되면 파라미터로 전달받은 게시물 넘버로 데이터가져옴
window.onload = function() {

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  // console.log(urlParams.get('review_no')); // url파라미터중 게시물넘버(review_no) 추출

  var active = document.querySelectorAll('.active');
  var active2 = document.querySelectorAll('table tbody td');
  
      $.get("review-det.php",
      { review_no : urlParams.get('review_no') }, 
        function(data, status){

          console.log(data);

          var jsondata = jQuery.parseJSON(data).data;
          console.log(jsondata);
          
          // console.log(jsondata[5]);
          // console.log(active[0].nextElementSibling.innerHTML = "안녕하셈");
          // console.log(active2[2].innerHTML = "안녕");
//          active[i].nextElementSibling.innerHTML = jsondata[i+4];

          if ( jQuery.parseJSON(data).res == 'ok') {

            //내 게시물 인 경우 수정버튼 보여줌
            if ( jQuery.parseJSON(data).mine == 'ok') {

              var str1 = '<button type="button" class="btn lg" id="register" onclick="javascript:goUpdate('+urlParams.get('review_no')+');">리뷰 수정</button>';
              $(".updatebt").html(str1);


              //내가쓴 게시물이 아닌경우 수정버튼 없앰
            } else {


            }
          }

          console.log(jsondata.country);

          active2[0].innerHTML = jsondata.school;
          active2[1].innerHTML = jsondata.country+'_'+jsondata.town;
          active2[2].innerHTML = jsondata.writername;
          active2[3].innerHTML = jsondata.st_homepage;
          active2[4].innerHTML = jsondata.st_content14;
          active2[5].innerHTML = jsondata.st_content1;
          active2[6].innerHTML = jsondata.st_content2;
          active2[7].innerHTML = jsondata.st_content15;
          active2[8].innerHTML = jsondata.st_content4;
          active2[9].innerHTML = jsondata.st_content5;
          active2[10].innerHTML = jsondata.st_content16;
          active2[11].innerHTML = jsondata.st_content12;
          active2[12].innerHTML = jsondata.st_content6;
          active2[13].innerHTML = jsondata.st_content22;
          active2[14].innerHTML = jsondata.st_content13;
          active2[15].innerHTML = jsondata.st_content7;
          active2[16].innerHTML = jsondata.st_content9;
          active2[17].innerHTML = jsondata.st_content3;
          active2[18].innerHTML = jsondata.st_content18;
          active2[19].innerHTML = jsondata.st_content19;
          active2[20].innerHTML = jsondata.st_content20;

  
          // for (var i = 0; i < active.length ; i++) {
            
          //   if ( i >= '3' ) {

          //     active2[i].innerHTML = jsondata;

          //   } else {

          //     active2[i].innerHTML = jsondata[i+4];
          //     console.log(jsondata[i+4]);

          //   }

          //   if ( !jsondata[i] ) {
          //     console.log(!jsondata[i]);
          //     jsondata[i] = "입력값 없음";
          //   } 
            
          // }
          var str2 = '<img src="'+jsondata.thumbnail+'" style="width: 362px; height: 100% !important;">';
          $("#imginput").html(str2);
          

 
    })
}

function getUrlParams() {
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
  return params;
}
var Param = getUrlParams();


console.log(getUrlParams() == null);  
console.log(getUrlParams() != null);  

function goUpdate(updateno) {

  console.log(updateno);
  window.location.href = 'review-wri.html?review_no='+updateno;

}