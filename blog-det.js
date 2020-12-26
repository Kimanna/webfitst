

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

            var str = '<div class="blogdetail" style="font-weight:normal; margin-top:10px; font-size:13px;">&nbsp;&nbsp;'+jsondata.aid+'<span style="color:gray">&nbsp;&nbsp;&nbsp;'+jsondata.created+'</span></div>';
            active[0].innerHTML = jsondata.title+str;
            active2[0].innerHTML = jsondata.content+'<p><br></p>';
           

            // cookie 이미 본 게시물 저장하는 코드
            var date = new Date();
            date.setDate(date.getDate()+7);
         
            // document.cookie = 'reviewlist' + '=' + makejson +'; SameSite=Strict; Secure';
            // console.log(document.cookie);

            
            // 쿠키 읽어오는 함수
              var txtName = "";

              
                // 여러개의 쿠키 읽어오기
                var cookies = document.cookie.split("; ");
                // console.log(cookies);
                
                // 쿠키 개수만큼 반복
                for (var i=0; i<cookies.length; i++) {
    
    
                    if (cookies[i].split("=")[0] == "reviewlist11")  {
                        txtName = cookies[i].split("=")[1];            
                    }
                }

                // 현재 열람했던 게시물이 없는경우 저장함
                if (txtName == "" || txtName == null) {

                  var listarr = [];
                  var obj = { 'type' : 'blog', 'no' : jsondata.blog_no, 'thumbnail': jsondata.thumbnail, 'title' : jsondata.title, 'created' : jsondata.created };
                  listarr.push(obj);
                  var makejsonstring = JSON.stringify(listarr);
                  console.log(makejsonstring);

                  document.cookie = 'reviewlist11' + '=' + makejsonstring +'; SameSite=Strict; Secure';


                } else {

                    // 값이 여러개인 경우 배열로 저장돼있음
                    var jsonps = JSON.parse(txtName);
                    console.log(jsonps);


                      // 이미 쿠키에 저장된 상태인지 확인하는 for문으로 연결되는 메소드 이미 저장됨 = true/ 저장안됨 = false
                      if (issetlist(jsonps, jsondata) == false) {
                        console.log(jsonps[0]);
                        console.log(jsonps[0].blog_no);

                        if (jsonps.length >= 5) {
                          jsonps.shift();
                        }

                        var obj = { 'type' : 'blog', 'no' : jsondata.blog_no, 'thumbnail': jsondata.thumbnail, 'title' : jsondata.title, 'created' : jsondata.created };
 
                        jsonps.push(obj);
                        console.log(jsonps);
                        
                        var stringjson = JSON.stringify(jsonps);

                        document.cookie = 'reviewlist11' + '=' + stringjson +'; SameSite=Strict; Secure';

                        }

                }

          } else {

          }
 
    })
}

function issetlist ( jsonps, jsondata ) {

  var issetdata = false;
  for (var i=0 ; i < jsonps.length ; i++ ) {

    // 블로그 개시물을 하나라도 본상태면 if안으로
    if ( jsonps[i].type == "blog" ) {

      // 이미 본 게시물인 경우 쿠키에 저장 안함
      if (jsonps[i].no == jsondata.blog_no) {
        console.log("이미 저장된 쿠키");
        issetdata = true;
        return;
      }
    }
    issetdata = false;
  }
  return issetdata;
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
