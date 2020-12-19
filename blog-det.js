

// 페이지가 로드되면 파라미터로 전달받은 게시물 넘버로 데이터가져옴
window.onload = function() {

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  console.log(queryString); // url파라미터중 게시물넘버(blog_no) 추출
  console.log(urlParams.get('blog_no')); // url파라미터중 게시물넘버(blog_no) 추출

  var active = document.querySelectorAll('.boardView .title');
  var active2 = document.querySelectorAll('.boardView .boardContents');
  
  
      $.get("blog-det.php",
      { blog_no : urlParams.get('blog_no') }, 
        function(data, status){

          console.log(data);
          var obj = jQuery.parseJSON(data);
          
          console.log(obj[4]);
          // console.log(active[0].nextElementSibling.innerHTML = "안녕하셈");
          // console.log(active2[2].innerHTML = "안녕");
//          active[i].nextElementSibling.innerHTML = obj[i+4];

          var str = '<div class="blogdetail" style="font-weight:normal; margin-top:10px; font-size:13px;">&nbsp;&nbsp;'+obj[2]+'<span style="color:gray">&nbsp;&nbsp;&nbsp;'+obj[1]+'</span></div>';
          console.log(str);
          active[0].innerHTML = obj[3]+str;
          active2[0].innerHTML = obj[4]+'<p><br></p>';

          // console.log(obj[5].parseJSON());

          
          var str1 = '<button type="button" class="btn lg" id="register" onclick="javascript:goUpdate('+urlParams.get('review_no')+');">리뷰 수정</button>';
          $(".updatebt").html(str1);

  
          var updatebt = '<button type="button" class="btn lg" onclick="location.href='+'blog-wri.html?'+queryString+';">수&nbsp;&nbsp;정</button>';
          // var deletebt = '<button type="button" class="btn lg" onclick="location.href='blog.html?npage=1&searchText=';">삭&nbsp;&nbsp;제</button>



          // for (var i = 0; i < active.length ; i++) {
            
          //   if ( i >= '3' ) {

          //     active2[i].innerHTML = obj[i+5];

          //   } else {

          //     active2[i].innerHTML = obj[i+4];
          //     console.log(obj[i+4]);

          //   }

          //   if ( !obj[i] ) {
          //     console.log(!obj[i]);
          //     obj[i] = "입력값 없음";
          //   } 
            
          // }

 
    })
}

// ["3","2020-12-18 01:59:11","hello1","save","<p><img alt=\"\" src=\"uploadimg\/1587797183.jpg\" style=\"float:right; height:238px; width:212px\" \/>\ub2e4\uc591\ud55c \uc5b4\ud559\uc5f0\uc218\uc758 \uc77c\uc0c1\uc744 \uacf5\uc720\ud574\uc8fc\uc138\uc694<\/p>\r\n"]

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
