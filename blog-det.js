

// 페이지가 로드되면 파라미터로 전달받은 게시물 넘버로 데이터가져옴
window.onload = function() {

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  console.log(queryString); // url 파일경로 포함 추출
  console.log(urlParams.get('blog_no')); // url파라미터중 게시물넘버(blog_no) 추출

  var active = document.querySelectorAll('.boardView .title');
  var active2 = document.querySelectorAll('.boardView .boardContents');
  // var active3 = document.querySelectorAll('.boardBtns');
  
  
      $.get("blog-det.php",
      { blog_no : urlParams.get('blog_no') }, 
        function(data, status){

          console.log(data);
          

          // 게시물 응답시 게시물이 있으면 res == ok / 내가쓴 게시물인경우 mine == ok 데이터는 data 배열로 응답
          if (jQuery.parseJSON(data).res == 'ok') {

            // 내가쓴 게시물 인 경우 수정, 삭제버튼 추가 
            if (jQuery.parseJSON(data).mine == 'ok') {

              // var thisfilefullname = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length);

              var updatebtn = '<button type="button" class="btn lg" onclick="javascript:goUpdate('+urlParams.get('blog_no')+');">수 정</button>';
              var deletebtn = '<button type="button" class="btn lg" onclick="javascript:goDelete('+urlParams.get('blog_no')+');">삭 제</button>';
             
             
              $(".boardBtns").html(updatebtn+deletebtn); 
      
    

            // 내가쓴 게시물이 아닌경우 ----------------------추후 댓글 기능시 구현
            } else {

            }

            // db 에 저장된 상세게시물의 data 가져옴 
            var jsondata = jQuery.parseJSON(data).data;
            // var blogdata = jQuery.parseJSON(jsondata);
            console.log(jsondata);
            console.log(jsondata.blog_no);
            console.log(jsondata.title);

            var str = '<div class="blogdetail" style="font-weight:normal; margin-top:10px; font-size:13px;">&nbsp;&nbsp;'+jsondata.aid+'<span style="color:gray">&nbsp;&nbsp;&nbsp;'+jsondata.created+'</span></div>';
            console.log(str);
            active[0].innerHTML = jsondata.title+str;
            active2[0].innerHTML = jsondata.content+'<p><br></p>';


          } else {

          }
 
    })
}


// 블로그 수정기능
function goUpdate(updateno) {

  window.location.href = 'blog-wri.html?blog_no='+updateno;

}

// 블로그 삭제기능 deleted 넘버를 1로 바꾸어 주는 작업
function goDelete(deleteno) {

  var returnValue = confirm('게시글을 정말 삭제 하시겠습니까?');

  if (returnValue) {

  $.get("blog-wri.php", 
  { 'blog_no' : deleteno, 'mode' : 'delete' },
  function(data, status) {
    
    console.log(status);
    console.log(data);
    
    
    if (jQuery.parseJSON(data).res == 'ok') {

      window.alert('게시글이 삭제 되었습니다.')
      location.replace('http://localhost/blog.html');

    } else {


    }
  }) 

}

function getUrlParams() {
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
  return params;
}
var Param = getUrlParams();


console.log(getUrlParams() == null);  

  // console.log(deleteno);
  // window.location.href = 'review-wri.php?blog_no='+deleteno+'&mode=delete';

}
