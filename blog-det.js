

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  console.log(queryString); // url 파일경로 포함 추출
  console.log(urlParams.get('blog_no')); // url파라미터중 게시물넘버(blog_no) 추출


// 페이지가 로드되면 파라미터로 전달받은 게시물 넘버로 데이터가져옴
window.onload = function() {

  // console.log($('input'));


  var active = document.querySelector('.boardView .title');
  var active2 = document.querySelectorAll('.boardView .boardContents');
  // var active3 = document.querySelectorAll('.boardBtns');
  
  
      $.get("blog-det.php",
      { blog_no : urlParams.get('blog_no'), page : urlParams.get('page') }, 
        function(data, status){

          console.log(data);
          

          // 게시물 응답시 게시물이 있으면 res == ok / 내가쓴 게시물인경우 mine == ok 데이터는 data 배열로 응답
          if (jQuery.parseJSON(data).res == 'ok') {

            var golist = '<button type="button" class="btn lg" onclick="location.href="blog.html?blog_no='+urlParams.get('blog_no')+'&page='+urlParams.get('page')+'&searchText=";">목록으로</button>';

            // 내가쓴 게시물 인 경우 수정, 삭제버튼 추가 
            if (jQuery.parseJSON(data).mine == 'ok') {

              // var thisfilefullname = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.length);

              var updatebtn = '<button type="button" class="btn lg" onclick="javascript:goUpdate('+urlParams.get('blog_no')+'&page='+urlParams.get('page')+');">수 정</button>';
              var deletebtn = '<button type="button" class="btn lg" onclick="javascript:goDelete('+urlParams.get('blog_no')+'&page='+urlParams.get('page')+');">삭 제</button>';

             
              $(".boardBtns").html(updatebtn+deletebtn+golist); 
    



            // 내가쓴 게시물이 아닌경우 ----------------------추후 댓글 기능시 구현
            } else {

              $(".boardBtns").html(golist); 

            }

            // db 에 저장된 상세게시물의 data 가져옴 
            var jsondata = jQuery.parseJSON(data).data;
            console.log(jsondata);

            $(".titlefont").text(jsondata.title);
            $(".profile_area img").attr("src",jsondata.profileimg);
            $(".writer_id").html(jsondata.id+'<a href="blog.html"><span>1:1 채팅</span></a>');
            $(".detail_area").html(jsondata.created+'<span class="view" style="color:#343a40; margin-left:15px;">조회수 '+jsondata.view+'</span>');
            // $(".button_comment").html("댓글 "+jsondata.comment+'<img src="images/underline-button.png" style="width: 15px; height: 15px;">');


            var str = '<div class="blogdetail" style="font-weight:normal; margin-top:10px; font-size:13px;">&nbsp;&nbsp;'+jsondata.aid+'<span style="color:gray">&nbsp;&nbsp;&nbsp;'+jsondata.created+'</span></div>';
            // active.innerHTML = jsondata.title+str;
            active2[0].innerHTML = jsondata.content+'<p><br></p>';

           

            // cookie 이미 본 게시물 저장하는 코드
            var date = new Date();
            date.setDate(date.getDate()+7);
         
            
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

    session_check();

    reply_comment();

}

function session_check() {

  $.getJSON("sessionck.php",
   function (session, status){
     console.log(session);

     if (session.res == "ok") {

      $('.inputimg').attr("src",session.data.profileimg);
      $('.sandcomment').before('<input class=\"sanduserid\" type="hidden" name=\"'+session.data.id+'\">');

     } else {

      $('.sandcomment').before('<input class=\"sanduserid\" type="hidden" name=\"\">');

     }
   })

}

function reply_comment() {


  $.getJSON("comment.php",
  { mode :'read', post_no : urlParams.get('blog_no'), page : urlParams.get('page') },
    function(data1, status){

      console.log(data1);

      if (data1.res == 'ok') {

        $('.cm_contents').removeClass('hidden');
        $('.cm_count').html('총 댓글 '+data1.totalData+'개');
        commentdata(data1.data);

      } else {

        $('.cm_count').html('현재 댓글이 없습니다.');
        $('.cm_contents').addClass('hidden');
        commentdata(data1.res);


      }
  });

}

function htmlComment( comment, currentDate ) {

  return `

<div class="cm_box">
  <div class="cm_authimg"><img src="${comment.profileimg}"></div>
  <div class="cm_content_area">
      <div class="cm_id">${comment.id}<span style="color:darkgray">${currentDate} 일 전</span></div>
      <div class="cm_content">${comment.commenttext}</div>
      <div class="cm_replybt"><img src="images/thumb-up-button.png"><span>1</span><img src="images/thumb-down-button.png"><span>1</span><span class="reply_bt" role="button">답글</span></div>
      <div class="cm_reply_dialog hidden">
          <div class="cm_box cm_replybox">
              <div class="cm_reply_img"><img src="images/thumb101.jpeg"></div>
              <div class="cm_reply">
                  <input class="inputuserid" type="hidden" name=">
                  <input class="reply_cno" type="hidden" name="${comment.comment_no}">
                  <input type="text" name="reply" maxlength="100" placeholder="공개 답글 추가..." class="cm_replay_content sandcomment">
                  <div class="cm_btn hidden">
                    <a class="btn replycancel_re" style="color: white;">취소</a>
                    <a class="btn replysand" style="color: white;" name="${comment.comment_no}">답글</a>
                    <div class="toast_reply hidden">댓글을 작성해 주세요</div>
                  </div>
              </div>
          </div>
      </div>
      <div id="cm_reply_id_${comment.comment_no}" class="cm_reply_area" value="${comment.comment_no}">
        <div class="cm_replyviewbt" value="0">
          <div class="cm_view hidden"><img src="images/drop-down-arrow.png"><span>답글 <span id="v">0</span> 개 보기</span></div>
          <div class="cm_hide hidden"><img src="images/drop-up-arrow.png"><span>댓글 <span id="h">0</span> 개 숨기기</span></div>
        </div>
        <div class="cm_replyviewbox hidden">
        </div>
              </div>
          </div>
      </div>
  </div>
</div>`
}

function commentdata(cmdata) {

  var cm_srting = '';
  for (var c = 0 ; c < cmdata.length ; c++ ) {
   
    if (cmdata[c].reply_cno == 0) {

      var interval = new Date().getTime()-new Date(cmdata[c].created).getTime()
      var currentDate = Math.floor(interval /(1000*60*60*24));
      
        cm_srting += htmlComment( cmdata[c], currentDate )
        
    } 
  }

  $('.cm_contents').html(cm_srting);

  var cm_reply = '';

  for (var d = 0 ; d < cmdata.length ; d++ ) {
   
    if ( cmdata[d].reply_cno != 0 ) {
      

      var commentno = $('#cm_reply_id_' + cmdata[d].reply_cno).attr('value');

      if (cmdata[d].reply_cno == commentno) {
        $( '#cm_reply_id_' + cmdata[d].reply_cno ).find('.cm_view').removeClass('hidden');

      console.log($( '#cm_reply_id_' + cmdata[d].reply_cno ).find('.cm_view'));
        
        $( '#cm_reply_id_' + cmdata[d].reply_cno ).find('#v').text(Number($( '#cm_reply_id_' + cmdata[d].reply_cno ).find('#v').text())+1);
        $( '#cm_reply_id_' + cmdata[d].reply_cno ).find('#h').text(Number($( '#cm_reply_id_' + cmdata[d].reply_cno ).find('#h').text())+1);

        var interval = new Date().getTime()-new Date(cmdata[d].created).getTime()
        var currentDate = Math.floor(interval /(1000*60*60*24));
  

        cm_reply =  
            '<div class=\"cm_box cm_replyeach\">'+
                '<div class=\"cm_authimg\"><img src=\"'+cmdata[d].profileimg+'\"></div>'+
                '<div class=\"cm_content_area\">'+
                    '<div>'+cmdata[d].id+'<span style=\"color:darkgray\">  '+currentDate+' 일 전</span></div>'+
                    '<div class=\"cm_content\">'+cmdata[d].commenttext+'</div>'+
                    '<div class=\"cm_replybt\"><img src=\"images/thumb-up-button.png\"><span>1</span><img src=\"images/thumb-down-button.png\"><span>1</span><span class=\"reply_bt\">답글</span></div>'+
                    '<div class=\"cm_reply_dialog hidden\">'+
                        '<div class=\"cm_box cm_replybox\">'+
                            '<div class=\"cm_reply_img\"><img src=\"images/thumb103.jpeg\"></div>'+
                            '<div class=\"cm_reply\">'+
                                '<input class=\"inputuserid\" type=\"hidden\" name=\"\">'+
                                '<input class=\"reply_cno\" type=\"hidden\" name=\"'+cmdata[d].comment_no+'\">'+
                                '<input type=\"text\" name=\"reply\" maxlength=\"100\" placeholder=\"공개 답글 추가...\" class=\"cm_replay_content sandcomment\">'+
                                '<div class=\"cm_btn hidden\">'+
                                  '<a class=\"btn replycancel_re\" style=\"color: white;\">취소</a>'+
                                  '<a class=\"btn replysand\" style=\"color: white;\" name=\"'+cmdata[d].comment_no+'\">답글</a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>'

            $( '#cm_reply_id_' + cmdata[d].reply_cno ).find('.cm_replyviewbox').append( cm_reply )

          }
    }
  }

  $('input').focusin(function(){
    $(this).next('div').removeClass('hidden');
  })
  
  $('.cm_view').on('click', function(){
    $(this).parent('div').next('.cm_replyviewbox').removeClass('hidden');
    $(this).addClass('hidden');
    $(this).next('.cm_hide').removeClass('hidden');
  })
  
  $('.cm_hide').on('click', function(){
    $(this).parent('div').next('.cm_replyviewbox').addClass('hidden');
    $(this).addClass('hidden');
    $(this).prev('.cm_view').removeClass('hidden');
  })
  
  $('.reply_bt').on('click', function() {
    $(this).parent('.cm_replybt').next('.cm_reply_dialog').removeClass('hidden');
  })
  
  $('.replycancel').on('click', function() {
    $(this).parent('.cm_btn').addClass('hidden');
  })

  $('.replycancel_re').on('click', function() {
    $(this).closest('.cm_reply_dialog').addClass('hidden');
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
