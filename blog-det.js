

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  console.log(queryString); // url 파일경로 포함 추출
  console.log(urlParams.get('blog_no')); // url파라미터중 게시물넘버(blog_no) 추출

  function getUrlParams() {
    var params = {};
    window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str, key, value) { params[key] = value; });
    return params;
  }
  var Param = getUrlParams();

// 페이지가 로드되면 파라미터로 전달받은 게시물 넘버로 데이터가져옴
window.onload = function() {


  var active = document.querySelector('.boardView .title');
  var active2 = document.querySelectorAll('.boardView .boardContents');
  
  
      $.get("blog-det.php",
      { blog_no : urlParams.get('blog_no'), page : urlParams.get('page') }, 
        function(data, status){


          // 게시물 응답시 게시물이 있으면 res == ok / 내가쓴 게시물인경우 mine == ok 데이터는 data 배열로 응답
          if (jQuery.parseJSON(data).res == 'ok') {

            var golist = '<button type="button" class="btn lg" onclick="location.href="blog.html?blog_no='+urlParams.get('blog_no')+'&page='+urlParams.get('page')+';">목록으로</button>';

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

            $(".titlefont").text(jsondata.title);
            $(".profile_area img").attr("src",jsondata.profileimg);
            $(".writer_id").html(jsondata.id+'<a href="blog.html"></a>');
            $(".detail_area").html(jsondata.created+'<span class="view" style="color:#343a40; margin-left:15px;">조회수 '+jsondata.view+'</span>');
            // $(".button_comment").html("댓글 "+jsondata.comment+'<img src="images/underline-button.png" style="width: 15px; height: 15px;">');


            var str = '<div class="blogdetail" style="font-weight:normal; margin-top:10px; font-size:13px;">&nbsp;&nbsp;'+jsondata.aid+'<span style="color:gray">&nbsp;&nbsp;&nbsp;'+jsondata.created+'</span></div>';
            active2[0].innerHTML = jsondata.content+'<p><br></p>';

           

            // cookie 이미 본 게시물 저장하는 코드
            var date = new Date();
            date.setDate(date.getDate()+7);
         
            
            // 쿠키 읽어오는 함수
              var txtName = "";

              
                // 여러개의 쿠키 읽어오기
                var cookies = document.cookie.split("; ");
                
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

                  document.cookie = 'reviewlist11' + '=' + makejsonstring +'; SameSite=Strict; Secure';


                } else {

                    // 값이 여러개인 경우 배열로 저장돼있음
                    var jsonps = JSON.parse(txtName);


                      // 이미 쿠키에 저장된 상태인지 확인하는 for문으로 연결되는 메소드 이미 저장됨 = true/ 저장안됨 = false
                      if (issetlist(jsonps, jsondata) == false) {

                        if (jsonps.length >= 5) {
                          jsonps.shift();
                        }

                        var obj = { 'type' : 'blog', 'no' : jsondata.blog_no, 'thumbnail': jsondata.thumbnail, 'title' : jsondata.title, 'created' : jsondata.created };
 
                        jsonps.push(obj);
                        
                        var stringjson = JSON.stringify(jsonps);

                        document.cookie = 'reviewlist11' + '=' + stringjson +'; SameSite=Strict; Secure';

                        }

                }

          } else {

          }
    })

    // 유저가 로그인 중인지 session에 저장되어 있는 값으로 check 하여
    // session이 유효한 경우 댓글이 작성 가능한 상태 
    session_check();

    // 기존에 저장되어있는 댓글 데이터를 가져오는 부분

    console.log('pass before getComment');
    getComment();

}

function session_check() {

  $.getJSON("sessionck.php",
   function (session, status){
     console.log(session);

     if (session.res == "ok") {

      $('.inputimg').attr("src",session.data.profileimg);
      $('.login_user_id').attr("name",session.data.id);

     } else {

      $('.send_user_id').attr("name", "");

     }
   })

}

function getComment() {



  // 댓글 데이터를 db에서 가져오는곳
  $.getJSON("comment.php",
  { mode :'read', post_no : urlParams.get('blog_no'), page : urlParams.get('page') },
    function(comment_data, status){
      console.log(comment_data);


      if (comment_data.res == 'ok') {

        $('.cm_count').html('총 댓글 '+comment_data.data[0].total_count+'개');
        setComment(comment_data.data);

      } else {

        $('.cm_count').html('');

      }
  });

  getLike();
}


// 기존 저장되어있던 댓글데이터를 가져오는 부분
function setComment(db_data) {

  var user_id = $('.login_user_id').attr('name'); // 현재 로그인 중인 user 의 id -> 대댓글 입력하는 html에 들어가는 부분 
  var user_profileimg_path = $('.inputimg').attr('src'); // 현재 로그인 중인 user 의 profile img path  -> 대댓글 입력하는 html에 들어가는 부분

  var comment_html = '';
  for (var temp = 0 ; temp < db_data.length ; temp++) {

    comment_html +=
      `<div class="cm_box">
        <div class="cm_authimg"><img style="border-radius: 9999px;" src="${db_data[temp].profileimg}"></div>
        <div class="cm_content_area">
            <div id="commentId_${db_data[temp].comment_no}" class="cm_id">${db_data[temp].aid}<span style="color:darkgray; margin-left: 10px;">${return_elapsed_time (db_data[temp].created)}</span></div>

            <div class="cm_reply_update cm_reply hidden" style="width:100%">
                <input class="send_comment_text" type="text" name="comment" maxlength="100" value="${db_data[temp].commenttext}">
                <input class="comment_no" type="hidden" name="${db_data[temp].comment_no}">
                <input class="send_user_id" type="hidden" name="${user_id}">
                <div class="cm_btn">
                  <span class="btn cancel_update_comment" style="color: white; margin: 0px;">취소</span>
                  <span class="btn send_update_comment" style="color: white; margin: 0px;" onclick="javascript:update_comment(${db_data[temp].comment_no},'update');">수정</span>
                  <div class="toast_reply hidden">댓글을 작성해 주세요</div>
                </div>
            </div>

            <div class="cm_replace_area">
                <div class="cm_content">${db_data[temp].commenttext}</div>
                <div id="${db_data[temp].comment_no}" class="cm_replybt">
                  <svg class="like_color" fill="#686868" onclick="javascript:update_comment(${db_data[temp].comment_no},'like_comment');" version="1.1" xmlns="http://www.w3.org/2000/svg" 
                      xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
                      width="18px" height="18px" viewBox="0 0 561 561" style="enable-background:new 0 0 561 561;" xml:space="preserve">
                      <path  d="M0,535.5h102v-306H0V535.5z M561,255c0-28.05-22.95-51-51-51H349.35l25.5-117.3c0-2.55,0-5.1,0-7.65
                        c0-10.2-5.1-20.4-10.199-28.05L336.6,25.5L168.3,193.8c-10.2,7.65-15.3,20.4-15.3,35.7v255c0,28.05,22.95,51,51,51h229.5
                        c20.4,0,38.25-12.75,45.9-30.6l76.5-181.051c2.55-5.1,2.55-12.75,2.55-17.85v-51H561C561,257.55,561,255,561,255z"/>
                  </svg>
                  <span class="like" style="margin-left:10px;">0</span>
                  <svg class="dislike_color" fill="#686868" onclick="javascript:update_comment(${db_data[temp].comment_no},'dislike_comment');" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
                      width="18px" height="18px" viewBox="0 0 561 561" style="enable-background:new 0 0 561 561;" xml:space="preserve">
                      <path d="M357,25.5H127.5c-20.4,0-38.25,12.75-45.9,30.6L5.1,237.15C2.55,242.25,0,247.35,0,255v48.45l0,0V306
                      c0,28.05,22.95,51,51,51h160.65l-25.5,117.3c0,2.55,0,5.101,0,7.65c0,10.2,5.1,20.399,10.2,28.05l28.05,25.5l168.3-168.3
                      c10.2-10.2,15.3-22.95,15.3-35.7v-255C408,48.45,385.05,25.5,357,25.5z M459,25.5v306h102v-306H459z"/>
                  </svg>
                  <span class="dislike" style="margin-left:10px;">0</span>
                  <span style="background-color:teal; color:white; " class="reply_bt show_comment_area">답글</span>
                  <span style="color : dimgray; border-left:1px solid lightgrey;" class="comment_update_bt hidden">수정</span>
                  <span style="color : dimgray; border-left:1px solid lightgrey;" class="comment_delete_bt hidden" onclick="javascript:update_comment(${db_data[temp].comment_no},'delete');">삭제</span>
                  <div class="cm_box cm_replybox hidden">
                    <div class="cm_reply_img"><img style="border-radius: 9999px;" src="${user_profileimg_path}"></div>
                    <div class="cm_reply">
                        <input class="send_comment_text" type="text" name="comment" maxlength="100" placeholder="공개 댓글 추가...">
                        <input class="comment_no" type="hidden" name="${db_data[temp].comment_no}">
                        <input class="send_user_id" type="hidden" name="${user_id}">
                        <div class="cm_btn">
                          <span class="btn cancel_comment" style="color: white; margin: 0px;">취소</span>
                          <span class="btn send_comments_comment" style="color: white; margin: 0px;">답글</span>
                          <div class="toast_reply hidden">댓글을 작성해 주세요</div>
                        </div>
                    </div>
                  </div>
                </div>

                <div id="comments_comment${db_data[temp].comment_no}" class="cm_reply_area">`

            if (db_data[temp].reply2 > 0) {

              comment_html +=`<div class="cm_replyviewbt">
                                <div id="show_${db_data[temp].comment_no}" class="cm_view">
                                    <img src="images/drop-down-arrow.png"><span>댓글 ${db_data[temp].reply2} 개 보기</span>
                                </div>
                                <div class="cm_hide hidden"><img src="images/drop-up-arrow.png">
                                    <span>댓글 ${db_data[temp].reply2} 개 숨기기</span>
                                </div>
                              </div>`

            } else {

              comment_html +=`<div class="cm_replyviewbt">
                                <div id="show_${db_data[temp].comment_no}" class="cm_view hidden">
                                    <img src="images/drop-down-arrow.png"><span>댓글 ${db_data[temp].reply2} 개 보기</span>
                                </div>
                                <div class="cm_hide hidden"><img src="images/drop-up-arrow.png">
                                    <span>댓글 ${db_data[temp].reply2} 개 숨기기</span>
                                </div>
                              </div>`


            }

      comment_html +=`</div>
                    </div>
                  </div>
                </div>`

  }

  $('.cm_contents').html(comment_html);


  // 만약 유저가 로그인 상태라면 현재 로그인중인 user_id와 댓글작성자 user_id가 동일한경우 댓글의 수정과, 삭제 버튼의 hidden class를 지움  
  
  var cm_id = '';
  if(user_id != '' || user_id != undefined) {

      for (var temp1 = 0 ; temp1 < db_data.length ; temp1++) {

        if (db_data[temp1].aid == user_id) {
          cm_id = $('#'+db_data[temp1].comment_no);

          cm_id.find('.comment_update_bt').removeClass('hidden');
          cm_id.find('.comment_delete_bt').removeClass('hidden');
        }

      }
  }


  // 대댓글 입력칸 show / hidden 생성 버튼 메서드
  inputCommentArea (user_id);
  
  

  // 대댓글을 펼치는 버튼을 클릭했을때 대댓글을 ajax통신을 통해 db에서 데이터를 가져오는 로직이 있는 메서드
  showCommentsComment(user_id);

  
  // 대댓글 전송 이 가능한 클릭 리스너가 담겨있는 메서드
  // 전송 버튼을 클릭할 시 ajax를 통해 db에 데이터 전송
  sendCommentsComment(); 
}

function getLike () {

    // 좋아요를 데이터를 가져오는 곳 => 댓글의 모든 좋아요 데이터
    $.getJSON("comment.php",
    { mode :'getLike' },
      function(like_data, status){
        console.log(like_data);
  
        let like_data_count = like_data.data
  
        if (like_data.res == 'ok') {
  
          var user_id = $('.login_user_id').attr('name'); // 현재 로그인 중인 user 의 id -> 대댓글 입력하는 html에 들어가는 부분 
  
          for (var temp = 0 ; temp < like_data_count.length ; temp++ ) {
  
                var comment_no = like_data_count[temp].comment_no;
  
                // like 와 dislike 의 count를 입력해주는 곳 
                $('#'+comment_no).children('.like').text(like_data_count[temp].like_count);
                $('#'+comment_no).children('.dislike').text(like_data_count[temp].dislike_count);
  
    
                // like 혹은 dislike 를 클릭한 user id 들 중에 현재 접속중인 user의 id 가 있는경우 img컬러를 변경해줌 
                // "like_nickname,dislike_nickname" -> 이런식으로 받은 값을 0:"like_nickname", 1:"dislike_nickname" 이런식으로 변환
                var person_temp = like_data_count[temp].like_person.split(',');
  
                var user_like_clicked = false; // like or dislike 를 클릭한 user_id 를 임시 저장해놓음
                var user_dislike_clicked = false; // like or dislike 를 클릭한 user_id 를 임시 저장해놓음
  
                for (var temp1 = 0 ; temp1 < person_temp.length ; temp1++) {
  
  
                  // 첫번째 문자가 "l" 인 경우 (like 인 경우)
                  // like 를 클릭한 id 와 현재 접속중이 user의 id가 같은 경우 true 를 반환   
                  if (person_temp[temp1].substr(0,1) == 'l') {
                    if (person_temp[temp1].substr(5) == user_id)
                        user_like_clicked = true;               
                  } 
                  
                  // dislike 이면
                  if (person_temp[temp1].substr(0,1) == 'd') {
                    if (person_temp[temp1].substr(8) == user_id)
                        user_dislike_clicked = true;  
                  }
                }
  
  
                if (user_like_clicked) 
                    $('#'+comment_no).children('.like_color').css({ fill: "#167ac6" });
  
  
                if (user_dislike_clicked) 
                    $('#'+comment_no).children('.dislike_color').css({ fill: "#167ac6" });
  
          }  
        } 
    });

}


// 댓글을 펼치는 클릭리스너와, 댓글의 수정삭제 로직
 function inputCommentArea (user_id) {

 
  // 답글 클릭시 답글 작성 공간 생성 
  $('.show_comment_area').on('click', function(){
    $(this).siblings('.cm_replybox').removeClass('hidden');


      $('.cancel_comment').on('click', function(){
        $(this).find('.send_comment_text').val('');
        $(this).parent('div').parent('div').parent('.cm_replybox').addClass('hidden');

      });
  });

  // 수정 클릭시 
  $('.comment_update_bt').on('click', function(){
    $(this).parents('.cm_content_area').find('.cm_reply_update').removeClass('hidden'); 
    var comment_text = $(this).parents('.cm_content_area').find('.cm_reply_update input.send_comment_text').val(); 
    $(this).parents('.cm_content_area').find('.cm_reply_update input.send_comment_text').val(comment_text); 
    $(this).parents('.cm_replace_area').addClass('hidden');


      $('.cancel_update_comment').on('click', function(){
        $(this).parents('.cm_content_area').find('.cm_reply_update').addClass('hidden');
        $(this).parents('.cm_reply_update').siblings('.cm_replace_area').removeClass('hidden');
    
      });
  });
 
}


// 대댓글을 가져오는 메서드
function showCommentsComment(login_user_id) {

  $('.cm_view').on('click', function(){


    var comment_no_text = $(this).attr('id');
    var comment_no_array = comment_no_text.split('_'); // commentno_1 이런식으로 값이 들어오기때문에 array[0] text / array[1] 숫자만 담김
    var comment_no = comment_no_array[1]; // comment_no인 숫자만 변수에 담음

    

      $.ajax({
        type:"get",
        dataType:"json",
        url:"comment.php",
        data:{'mode':'read1', 'post_no':Param.blog_no, 'comment_no':comment_no},
        success : function (json_data) {
          console.log(json_data);
          var comments_comment = json_data.data;
          var comments_comment_like = json_data.data1;
          

          var user_id = $('.login_user_id').attr('name'); // 현재 로그인 중인 user 의 id -> 대대댓글 입력하는 html에 들어가는 부분 
          var user_profileimg_path = $('.inputimg').attr('src'); // 현재 로그인 중인 user 의 profile img path  -> 대대댓글 입력하는 html에 들어가는 부분


          var comments_comment_html = '<div class="cm_replyviewbox_area">';
          var comment_no_input_location = '';

          for (var temp = 0 ; temp < comments_comment.length ; temp++ ) {          


            if (comments_comment[temp].reply_cno != 0) {

                comments_comment_html +=
                  `<div class="cm_replyviewbox">
                        <div class="cm_box cm_replyeach">
                            <div class="cm_authimg"><img style="border-radius: 9999px;" src="${comments_comment[temp].profileimg}"></div>
                            <div class="cm_content_area2" style="width:100%">
                                <div id="commentId_${comments_comment[temp].comment_no}" class="cm_id">${comments_comment[temp].aid}<span style="color:darkgray; margin-left: 10px;">${return_elapsed_time (comments_comment[temp].created)}</span></div>


                                <div class="cm_reply_update2 cm_reply hidden" style="width:100%">
                                  <input class="send_comment_text" type="text" name="comment" maxlength="100" value="${comments_comment[temp].commenttext}">
                                  <input class="comment_no" type="hidden" name="${comments_comment[temp].comment_no}">
                                  <input class="send_user_id" type="hidden" name="${user_id}">
                                  <div class="cm_btn">
                                    <span class="btn cancel_update_comment2" style="color: white; margin: 0px;">취소</span>
                                    <span class="btn send_update_comment" style="color: white; margin: 0px;" onclick="javascript:update_comment(${comments_comment[temp].comment_no},'update_comments_comment');">수정</span>
                                    <div class="toast_reply hidden">댓글을 작성해 주세요</div>
                                  </div>
                                </div>


                                <div class="cm_replace_area2">
                                  <div class="cm_content">${comments_comment[temp].commenttext}</div>
                                  <div id="${comments_comment[temp].comment_no}" class="${comments_comment[temp].comment_no} cm_replybt">
                                    <svg class="comments_like_color" fill="#686868" onclick="javascript:update_comment(${comments_comment[temp].comment_no},'like_comments_comment');" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                                          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
                                          width="18px" height="18px" viewBox="0 0 561 561" style="enable-background:new 0 0 561 561;" xml:space="preserve">
                                        <path  d="M0,535.5h102v-306H0V535.5z M561,255c0-28.05-22.95-51-51-51H349.35l25.5-117.3c0-2.55,0-5.1,0-7.65
                                          c0-10.2-5.1-20.4-10.199-28.05L336.6,25.5L168.3,193.8c-10.2,7.65-15.3,20.4-15.3,35.7v255c0,28.05,22.95,51,51,51h229.5
                                          c20.4,0,38.25-12.75,45.9-30.6l76.5-181.051c2.55-5.1,2.55-12.75,2.55-17.85v-51H561C561,257.55,561,255,561,255z"/>
                                    </svg>
                                    <span class="comments_like" style="margin-left:10px;">0</span>
                                    <svg class="comments_dislike_color" fill="#686868" onclick="javascript:update_comment(${comments_comment[temp].comment_no},'dislike_comments_comment');" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" 
                                          width="18px" height="18px" viewBox="0 0 561 561" style="enable-background:new 0 0 561 561;" xml:space="preserve">
                                        <path d="M357,25.5H127.5c-20.4,0-38.25,12.75-45.9,30.6L5.1,237.15C2.55,242.25,0,247.35,0,255v48.45l0,0V306
                                        c0,28.05,22.95,51,51,51h160.65l-25.5,117.3c0,2.55,0,5.101,0,7.65c0,10.2,5.1,20.399,10.2,28.05l28.05,25.5l168.3-168.3
                                        c10.2-10.2,15.3-22.95,15.3-35.7v-255C408,48.45,385.05,25.5,357,25.5z M459,25.5v306h102v-306H459z"/>
                                    </svg>
                                    <span class="comments_dislike" style="margin-left:10px;">0</span>
                                    <span style="background-color:teal; color:white; " class="reply_bt show_comment_comment_area">답글</span>
                                    <span style="color : dimgray; border-left:1px solid lightgrey;" class="comments_comment_update_bt hidden">수정</span>
                                    <span style="color : dimgray; border-left:1px solid lightgrey;" class="comments_comment_delete_bt hidden" onclick="javascript:update_comment(${comments_comment[temp].comment_no},'delete_comments_comment');">삭제</span>

                                    <div class="cm_box cm_replybox hidden">
                                      <div class="cm_reply_img"><img style="border-radius: 9999px;" src="${user_profileimg_path}"></div>
                                      <div class="cm_reply">
                                          <span class="comments_comment2_id" style="background-color:lemonchiffon; padding:1px 6px; margin: 2px 0px">@  ${comments_comment[temp].aid}</span>
                                          <input class="send_comment_text" type="text" name="comment" maxlength="100" placeholder="공개 댓글 추가...">
                                          <input class="comment_no" type="hidden" name="${comments_comment[temp].reply_cno}">
                                          <input class="send_user_id" type="hidden" name="${user_id}">
                                          <div class="cm_btn">
                                            <span class="btn cancel_comment" style="color: white; margin: 0px;">취소</span>
                                            <span class="btn send_comments_comment2" style="color: white; margin: 0px;">답글</span>
                                            <div class="toast_reply hidden">댓글을 작성해 주세요</div>
                                          </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>`

            }
            if (comments_comment[temp].reply_cno == 0 ) {
                comment_no_input_location = comments_comment[temp].comment_no;

            }
          }
          comments_comment_html += '</div>'

          $('#show_'+ comment_no_input_location).parent('.cm_replyviewbt').after('');
          $('#show_'+ comment_no_input_location).parent('.cm_replyviewbt').after(comments_comment_html);


          // 만약 유저가 로그인 상태라면 현재 로그인중인 user_id와 댓글작성자 user_id가 동일한경우 댓글의 수정과, 삭제 버튼의 hidden class를 지움            
          var cm_id = '';
          if(user_id != '' || user_id != undefined) {
            
            for (var temp1 = 0 ; temp1 < comments_comment.length ; temp1++) {


              if (comments_comment[temp1].aid == user_id) {
                  cm_id = $('#'+comments_comment[temp1].comment_no);
                  
                  cm_id.find('.comments_comment_update_bt').removeClass('hidden');
                  cm_id.find('.comments_comment_delete_bt').removeClass('hidden');
                }
                
              }
            }


            // 대댓글의 좋아요를 표시 하는 부분 ----------------------------------------------------------------------------------------
            var user_id = $('.login_user_id').attr('name'); // 현재 로그인 중인 user 의 id -> 대댓글 입력하는 html에 들어가는 부분 
  
            for (var temp = 0 ; temp < comments_comment_like.length ; temp++ ) {
    
                  var comment_no = comments_comment_like[temp].comment_no;
  

                  // like 와 dislike 의 count를 입력해주는 곳 
                  $('#'+comment_no).children('.comments_like').text(comments_comment_like[temp].like_count);
                  $('#'+comment_no).children('.comments_dislike').text(comments_comment_like[temp].dislike_count);
                  console.log('comment no : '+ comment_no + '  like_count : '+ comments_comment_like[temp].like_count)

        
                  // like 혹은 dislike 를 클릭한 user id 들 중에 현재 접속중인 user의 id 가 있는경우 img컬러를 변경해줌 
                  // "like_nickname,dislike_nickname" -> 이런식으로 받은 값을 0:"like_nickname", 1:"dislike_nickname" 이런식으로 변환
                  var person_temp = comments_comment_like[temp].like_person.split(',');
    
                  var user_like_clicked = false; // like or dislike 를 클릭한 user_id 를 임시 저장해놓음
                  var user_dislike_clicked = false; // like or dislike 를 클릭한 user_id 를 임시 저장해놓음
    
                  for (var temp1 = 0 ; temp1 < person_temp.length ; temp1++) {
    
    
                    // 첫번째 문자가 "l" 인 경우 (like 인 경우)
                    // like 를 클릭한 id 와 현재 접속중이 user의 id가 같은 경우 true 를 반환   
                    if (person_temp[temp1].substr(0,1) == 'l') {
                      if (person_temp[temp1].substr(5) == user_id)
                          user_like_clicked = true;
    
                    
                    } 
                    
                    // dislike 이면
                    if (person_temp[temp1].substr(0,1) == 'd') {
                      if (person_temp[temp1].substr(8) == user_id)
                          user_dislike_clicked = true;
    
    
                    }
                  }
    
    
                  if (user_like_clicked) 
                      $('#'+comment_no).children('.comments_like_color').css({ fill: "#167ac6" });
    
    
                  if (user_dislike_clicked) 
                      $('#'+comment_no).children('.comments_dislike_color').css({ fill: "#167ac6" });
    
            }
  



            // 대댓글 입력칸 생성 버튼 메서드
            inputCommentsCommentArea ();


            // 대댓글의 좋아요 데이터를 가져오는 메서드
            // commentsCommentLike (login_user_id);


            // 대대댓글을 저장하는 logic이 담긴 메서드
            sendCommentsCommentComment();


        }, error : function(xhr, status, error) {
          console.log("실패"+error);
        }
      })

      $(this).addClass('hidden');
      $(this).siblings('div').removeClass('hidden');


  });

  $('.cm_hide').on('click', function(){

    $(this).addClass('hidden');
    $(this).siblings('div').removeClass('hidden');
    $(this).parent('div').siblings('.cm_replyviewbox_area').addClass('hidden');
    
  });

}

// 대댓글의 좋아요, 싫어요 데이터를 가져오는 로직
// function commentsCommentLike (login_user_id) {

  
//     // 좋아요를 데이터를 가져오는 곳 => 댓글의 모든 좋아요 데이터
//     $.getJSON("comment.php",
//     { mode :'getLikeComments' },
//       function(like_data, status){
//         console.log(like_data);
  
//         let like_data_count = like_data.data
  
//         if (like_data.res == 'ok') {
  
//           var user_id = $('.login_user_id').attr('name'); // 현재 로그인 중인 user 의 id -> 대댓글 입력하는 html에 들어가는 부분 
  
//           for (var temp = 0 ; temp < like_data_count.length ; temp++ ) {
  
//                 var comment_no = like_data_count[temp].comment_no;

//                 // console.log($('.'+comment_no));
//                 // console.log($('.'+comment_no).children('.commens_like'));

//                 // like 와 dislike 의 count를 입력해주는 곳 
//                 $('.'+comment_no).children('.commens_like').text(like_data_count[temp].like_count);
//                 $('.'+comment_no).children('.commens_dislike').text(like_data_count[temp].dislike_count);
  
  
  
//                 // like 혹은 dislike 를 클릭한 user id 들 중에 현재 접속중인 user의 id 가 있는경우 img컬러를 변경해줌 
//                 // "like_nickname,dislike_nickname" -> 이런식으로 받은 값을 0:"like_nickname", 1:"dislike_nickname" 이런식으로 변환
//                 var person_temp = like_data_count[temp].like_person.split(',');
  
//                 var user_like_clicked = false; // like or dislike 를 클릭한 user_id 를 임시 저장해놓음
//                 var user_dislike_clicked = false; // like or dislike 를 클릭한 user_id 를 임시 저장해놓음
  
//                 for (var temp1 = 0 ; temp1 < person_temp.length ; temp1++) {
  
  
//                   // 첫번째 문자가 "l" 인 경우 (like 인 경우)
//                   // like 를 클릭한 id 와 현재 접속중이 user의 id가 같은 경우 true 를 반환   
//                   if (person_temp[temp1].substr(0,1) == 'l') {
//                     if (person_temp[temp1].substr(5) == user_id)
//                         user_like_clicked = true;
  
                  
//                   } 
                  
//                   // dislike 이면
//                   if (person_temp[temp1].substr(0,1) == 'd') {
//                     if (person_temp[temp1].substr(8) == user_id)
//                         user_dislike_clicked = true;
  
  
//                   }
//                 }
  
  
//                 if (user_like_clicked) 
//                     $('#'+comment_no).children('.comments_like_color').css({ fill: "#167ac6" });
  
  
//                 if (user_dislike_clicked) 
//                     $('#'+comment_no).children('.comments_dislike_color').css({ fill: "#167ac6" });
  
//           }
  
//         } 
//     });
// }


 // 대댓글 입력칸 생성 버튼
 function inputCommentsCommentArea () {

   $('.show_comment_comment_area').on('click', function(){
     $(this).siblings('.cm_replybox').removeClass('hidden');


       $('.cancel_comment').on('click', function(){
        $(this).parent('div').parent('div').parent('.cm_replybox').addClass('hidden');

       });
   });


    // 수정 클릭시 
    $('.comments_comment_update_bt').on('click', function(){
      $(this).parents('.cm_content_area2').find('.cm_reply_update2').removeClass('hidden'); 
      var comment_text = $(this).parents('.cm_content_area2').find('.cm_reply_update2 input.send_comment_text').val(); 
      $(this).parents('.cm_content_area2').find('.cm_reply_update2 input.send_comment_text').val(comment_text); 
      $(this).parents('.cm_replace_area2').addClass('hidden');


        $('.cancel_update_comment2').on('click', function(){
          $(this).parents('.cm_content_area2').find('.cm_reply_update2').addClass('hidden');
          $(this).parents('.cm_reply_update2').siblings('.cm_replace_area2').removeClass('hidden');
      
        });
    });
 }

// 대댓글 db 발송 메서드
function sendCommentsComment() {

    // 대댓글달기 클릭 버튼
    $('.send_comments_comment').on('click', function(){
      var comment_no = $(this).parent('div').siblings('input.comment_no').attr('name');
      var send_comment_text = $(this).parent('div').siblings('input.send_comment_text').val();
      var send_user_id = $('.send_user_id').attr('name');

      let toast_message =  $(this).siblings('.toast_reply');

      console.log('comment_no : '+comment_no);
      console.log('send_comment_text : '+send_comment_text);



        if (send_comment_text == "") {

          toast_message.text("댓글을 작성해 주세요.");
          toast_message.removeClass('hidden');

          setTimeout(function () {
            toast_message.addClass('hidden');
          }, 4000);

          return;
        }

        if (send_user_id == "") {

          toast_message.text("댓글을 추가하시려면 로그인 해주세요.");
          toast_message.removeClass('hidden');

          setTimeout(function () {
            toast_message.addClass('hidden');
          }, 4000);

          return;
        }


            $.ajax({
              type:"post",
              dataType:"json",
              url:"comment.php",
              data:{'mode':'createComments', 'post_no':Param.blog_no, 'page':Param.page, 'comment':send_comment_text, 'comment_no':comment_no, 'userId': send_user_id},
              success : function (db_data) {
                console.log(db_data.data);


                  comments_comment_count(db_data.data);


              }, error : function(xhr, status, error) {
                console.log("실패"+error);
              }
            })


        // input text tag의 value 초기화와 input area 숨김
        $(this).parent('div').siblings('input.send_comment_text').val('');
        $(this).closest('.cm_replybox').addClass('hidden');

      });

}

function comments_comment_count (comments_comment_data) {


  // 댓글은 reply_cno 넘버를 0으로 저장하고 있기때문에 reply_cno = 0 에 해당하는 index의 comment_no 가 대댓글의 댓글넘버 
  var comment_no =  comments_comment_data[0].comment_no; // 대댓글의 댓글넘버를 알기위한 변수

  let comments_comment_view_text = '댓글 '+ (comments_comment_data.length - 1) +' 개 보기';
  let comments_comment_hide_text = '댓글 '+ (comments_comment_data.length - 1) +' 개 숨기기';


  // 대댓글의 갯수를 변경 해주며  
  $('#comments_comment' + comment_no).find('.cm_view span').text(comments_comment_view_text);
  $('#comments_comment' + comment_no).find('.cm_view').removeClass('hidden');
  $('#comments_comment' + comment_no).find('.cm_hide span').text(comments_comment_hide_text);
  $('#comments_comment' + comment_no).find('.cm_hide').addClass('hidden');
  $('#comments_comment' + comment_no).find('.cm_replyviewbox_area').addClass('hidden');

}




// 댓글 수정과, 삭제 && 좋아요와 싫어요를 클릭시 db에 데이터를 저장하는 logic
function update_comment(comment_no, action) {

  var user_id = $('.login_user_id').attr('name'); // 현재 로그인 중인 user 의 id -> 대댓글 입력하는 html에 들어가는 부분 
  var revised_comment = $('#commentId_'+comment_no).nextAll('.cm_reply_update').children('.send_comment_text').val(); // 댓글 수정시 수정할 text 


  // 대댓글 수정시 수정할 text 
  var revised_comments_comment = $('#commentId_'+comment_no).siblings('.cm_reply_update2').children('.send_comment_text').val();


  console.log(comment_no+'  '+action+'  '+revised_comment+ '  '+revised_comments_comment);

  if (action == 'update') {


        $.ajax({
          type:"get",
          dataType:"json",
          url:"comment.php",
          data:{'mode':'comment_update', 'comment_no':comment_no, 'comment': revised_comment},
          success : function (update_data) {
            console.log(update_data.data);

            var update_comment_data = update_data.data[0];


            $('#commentId_'+update_comment_data.comment_no).siblings('.cm_replace_area').find('.cm_content').text(update_comment_data.commenttext);

            $('#commentId_'+update_comment_data.comment_no).next('.cm_reply_update').addClass('hidden');
            $('#commentId_'+update_comment_data.comment_no).siblings('.cm_replace_area').removeClass('hidden');
            $('#commentId_'+update_comment_data.comment_no).find('.cm_replyviewbox_area').addClass('hidden');
          }
    
    
        });



  } else if (action == 'delete') {

    var returnValue = confirm('댓글을 정말 삭제 하시겠습니까?');
    if ( returnValue ) {

        $.ajax({
          type:"get",
          dataType:"json",
          url:"comment.php",
          data:{'mode':'comment_delete', 'comment_no':comment_no, 'post_no' : urlParams.get('blog_no')},
          success : function (comment_data) {
            console.log(comment_data);

            // 댓글이 없는경우
            if (comment_data.res == 'notok') {

                $('.cm_count').html('');

            } else {
                $('.cm_count').html('총 댓글 '+comment_data.totalData+'개');
                setComment(comment_data.data);
                getLike ();
            }

          }
        });

    }
        
  } else if (action == 'like_comment') {

      if (user_id == "" || user_id == undefined) {

        return;
        
      }

        $.ajax({
          type:"get",
          dataType:"json",
          url:"comment.php",
          data:{'mode':'like_comment', 'comment_no':comment_no, 'userId' : user_id},
          success : function (json_data) {
            console.log(json_data.data);


            var comment_like_data = json_data.data;

            var comment_no = '';
            var like_count = 0;
            var dislike_count = 0;
            var user_like = false;
            var user_dislike = false;

            for( var temp = 0 ; temp < comment_like_data.length ; temp++ ) {

              comment_no = comment_like_data[temp].comment_no;


              // like 와 dislike 의 count를 입력해주는 곳
              if (comment_like_data[temp].like_dislike_check == 'like') {
                like_count = like_count + 1
              } 
              if (comment_like_data[temp].like_dislike_check == 'dislike') {
                dislike_count = dislike_count + 1
              } 
              
              if (comment_like_data[temp].like_dislike_person == user_id && comment_like_data[temp].like_dislike_check == 'like') {
                  user_like == true;
                  $('#'+comment_no).children('.like_color').css({ fill: "#167ac6" });
                  $('#'+comment_no).children('.dislike_color').css({ fill: "#686868" });


              }
              if (comment_like_data[temp].like_dislike_person == user_id && comment_like_data[temp].like_dislike_check == 'dislike') {
                  user_dislike == true;
                  $('#'+comment_no).children('.like_color').css({ fill: "#686868" });
                  $('#'+comment_no).children('.dislike_color').css({ fill: "#167ac6" });

              }

              
            }

            $('#'+comment_no).children('.like').text(like_count);
            $('#'+comment_no).children('.dislike').text(dislike_count);


          }, error:function(request,status,error){
                alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
          },
                complete : function(data) {
          }
    
    
        });


  } else if (action == 'dislike_comment') {

    if (user_id == "" || user_id == undefined) {

      return;
      
    }

        $.ajax({
          type:"get",
          dataType:"json",
          url:"comment.php",
          data:{'mode':'dislike_comment', 'comment_no':comment_no, 'userId' : user_id},
          success : function (json_data) {
            console.log(json_data);


            var comment_like_data = json_data.data;

            var comment_no = '';
            var like_count = 0;
            var dislike_count = 0;
            var user_like = false;
            var user_dislike = false;

            for( var temp = 0 ; temp < comment_like_data.length ; temp++ ) {

              comment_no = comment_like_data[temp].comment_no;


              // like 와 dislike 의 count를 입력해주는 곳
              if (comment_like_data[temp].like_dislike_check == 'like') {
                like_count = like_count + 1
              } 
              if (comment_like_data[temp].like_dislike_check == 'dislike') {
                dislike_count = dislike_count + 1
              } 
              
              if (comment_like_data[temp].like_dislike_person == user_id && comment_like_data[temp].like_dislike_check == 'like') {
                  user_like == true;
                  $('#'+comment_no).children('.like_color').css({ fill: "#167ac6" });
                  $('#'+comment_no).children('.dislike_color').css({ fill: "#686868" });


              }
              if (comment_like_data[temp].like_dislike_person == user_id && comment_like_data[temp].like_dislike_check == 'dislike') {
                  user_dislike == true;
                  $('#'+comment_no).children('.like_color').css({ fill: "#686868" });
                  $('#'+comment_no).children('.dislike_color').css({ fill: "#167ac6" });

              }

              
            }

            $('#'+comment_no).children('.like').text(like_count);
            $('#'+comment_no).children('.dislike').text(dislike_count);


          }
        });
  
  } else if (action == 'update_comments_comment') {

        $.ajax({
          type:"get",
          dataType:"json",
          url:"comment.php",
          data:{'mode':'comments_comment_update', 'comment_no':comment_no, 'comment': revised_comments_comment},
          success : function (update_data) {
            console.log(update_data.data);

            var update_comment_data = update_data.data[0];


            $('#commentId_'+update_comment_data.comment_no).siblings('.cm_replace_area2').find('.cm_content').text(update_comment_data.commenttext);


            $('#commentId_'+update_comment_data.comment_no).next('.cm_reply_update2').addClass('hidden');
            $('#commentId_'+update_comment_data.comment_no).siblings('.cm_replace_area2').removeClass('hidden');
          }


        });

  } else if (action == 'delete_comments_comment') {

    var returnValue = confirm('댓글을 정말 삭제 하시겠습니까?');
    if ( returnValue ) {

      // 대댓글의 댓글을 넘버만 가져옴
      var parent_comment_no = $('#'+comment_no).closest('.cm_reply_area').attr('id').replace('comments_comment','');

      console.log('parent_comment_no : '+parent_comment_no);

        $.ajax({
          type:"get",
          dataType:"json",
          url:"comment.php",
          data:{'mode':'comments_comment_delete', 'comment_no':comment_no, 'parent_comment_no' : parent_comment_no},
          success : function (json_data) {
            console.log(json_data.data[0].reply2);

            // 대댓글 영역 숨기기
            $('#commentId_'+ comment_no).parent('.cm_replyviewbox_area').addClass('hidden');

            $('#'+comment_no).closest('.cm_reply_area').find('#show_'+parent_comment_no+' span').text('댓글 '+json_data.data[0].reply2+' 개 보기');
            $('#'+comment_no).closest('.cm_reply_area').find('.cm_hide span').text('댓글 '+json_data.data[0].reply2+' 개 숨기기');


            // 대댓글이 없는경우 댓글보기 클릭버튼 숨김
            if (json_data.data[0].reply2 == 0) {
              $('#'+comment_no).closest('.cm_reply_area').addClass('hidden');
            } 

          }
        });
    }

  } else if (action == 'like_comments_comment') {

    if (user_id == "" || user_id == undefined) {

      return;
      
    }

      $.ajax({
        type:"get",
        dataType:"json",
        url:"comment.php",
        data:{'mode':'like_comments_comment', 'comment_no':comment_no, 'userId' : user_id},
        success : function (json_data) {
          console.log(json_data.data);


          var comment_like_data = json_data.data;

          var comment_no = '';
          var like_count = 0;
          var dislike_count = 0;
          var user_like = false;
          var user_dislike = false;

          for( var temp = 0 ; temp < comment_like_data.length ; temp++ ) {

            comment_no = comment_like_data[temp].comment_no;


            // like 와 dislike 의 count를 입력해주는 곳
            if (comment_like_data[temp].like_dislike_check == 'like') {
              like_count = like_count + 1
            } 
            if (comment_like_data[temp].like_dislike_check == 'dislike') {
              dislike_count = dislike_count + 1
            } 
            
            if (comment_like_data[temp].like_dislike_person == user_id && comment_like_data[temp].like_dislike_check == 'like') {
                user_like == true;
                $('#'+comment_no).children('.comments_like_color').css({ fill: "#167ac6" });
                $('#'+comment_no).children('.comments_dislike_color').css({ fill: "#686868" });


            }
            if (comment_like_data[temp].like_dislike_person == user_id && comment_like_data[temp].like_dislike_check == 'dislike') {
                user_dislike == true;
                $('#'+comment_no).children('.comments_like_color').css({ fill: "#686868" });
                $('#'+comment_no).children('.comments_dislike_color').css({ fill: "#167ac6" });

            }

            
          }

          $('#'+comment_no).children('.comments_like').text(like_count);
          $('#'+comment_no).children('.comments_dislike').text(dislike_count);


        }, error:function(request,status,error){
              alert("code = "+ request.status + " message = " + request.responseText + " error = " + error); // 실패 시 처리
        },
              complete : function(data) {
        }
  
  
      });


  } else if (action == 'dislike_comments_comment') {

    if (user_id == "" || user_id == undefined) {

      return;
      
    }

        $.ajax({
          type:"get",
          dataType:"json",
          url:"comment.php",
          data:{'mode':'dislike_comments_comment', 'comment_no':comment_no, 'userId' : user_id},
          success : function (json_data) {
            console.log(json_data.data);


            var comment_like_data = json_data.data;

            var comment_no = '';
            var like_count = 0;
            var dislike_count = 0;
            var user_like = false;
            var user_dislike = false;

            for( var temp = 0 ; temp < comment_like_data.length ; temp++ ) {

              comment_no = comment_like_data[temp].comment_no;


              // like 와 dislike 의 count를 입력해주는 곳
              if (comment_like_data[temp].like_dislike_check == 'like') {
                like_count = like_count + 1
              } 
              if (comment_like_data[temp].like_dislike_check == 'dislike') {
                dislike_count = dislike_count + 1
              } 
              
              if (comment_like_data[temp].like_dislike_person == user_id && comment_like_data[temp].like_dislike_check == 'like') {
                  user_like == true;
                  $('#'+comment_no).children('.comments_like_color').css({ fill: "#167ac6" });
                  $('#'+comment_no).children('.comments_dislike_color').css({ fill: "#686868" });


              }
              if (comment_like_data[temp].like_dislike_person == user_id && comment_like_data[temp].like_dislike_check == 'dislike') {
                  user_dislike == true;
                  $('#'+comment_no).children('.comments_like_color').css({ fill: "#686868" });
                  $('#'+comment_no).children('.comments_dislike_color').css({ fill: "#167ac6" });

              }

              
            }

            $('#'+comment_no).children('.comments_like').text(like_count);
            $('#'+comment_no).children('.comments_dislike').text(dislike_count);


          }
        });

  }

}



// 대대댓글 db 발송 메서드
function sendCommentsCommentComment() {

  // 대댓글달기 클릭 버튼
  $('.send_comments_comment2').on('click', function(){
    var comment_no = $(this).parent('div').siblings('input.comment_no').attr('name');
    var send_comment_text = $(this).parent('div').siblings('input.send_comment_text').val();
    var comment_user_id = $(this).parent('div').siblings('.comments_comment2_id').text();

    var fixed_send_comment_text = comment_user_id+' -> '+send_comment_text; // 대댓글의 user id와 대대댓글의 text 를 함께 저장 

    var send_user_id = $('.send_user_id').attr('name');


    let toast_message =  $(this).siblings('.toast_reply');

    console.log('comment_no : '+comment_no + 'send_comment_text : '+send_comment_text);

      if (send_comment_text == "") {

        toast_message.text("댓글을 작성해 주세요.");
        toast_message.removeClass('hidden');

        setTimeout(function () {
          toast_message.addClass('hidden');
        }, 4000);

        return;
      }

      if (send_user_id == "") {

        toast_message.text("댓글을 추가하시려면 로그인 해주세요.");
        toast_message.removeClass('hidden');

        setTimeout(function () {
          toast_message.addClass('hidden');
        }, 4000);

        return;
      }


          $.ajax({
            type:"post",
            dataType:"json",
            url:"comment.php",
            data:{'mode':'createCommentsComment', 'post_no':Param.blog_no, 'page':Param.page, 'comment':fixed_send_comment_text, 'comment_no':comment_no, 'userId': send_user_id},
            success : function (db_data) {
              console.log(db_data.data);


                comments_comment_count(db_data.data);


            }, error : function(xhr, status, error) {
              console.log("실패"+error);
            }
          })


      // input text tag의 value 초기화와 input area 숨김
      $(this).parent('div').siblings('input.send_comment_text').val('');
      $(this).closest('.cm_replybox').addClass('hidden');

    });

}




// 댓글 등록한 날자 ~분전, ~시간전, ~일전 형식으로 변환 
function return_elapsed_time (db_data_created) {

  var time_gap = new Date().getTime() - new Date(db_data_created).getTime();
  var time_gap_minute = Math.floor(time_gap/(1000 * 60));


        var comment_elapsed_time = '';

        if (time_gap_minute > 59 ) {
          var time_gap_hour = Math.floor(time_gap_minute/60);

          if (time_gap_hour > 23) {
            var time_gap_day = Math.ceil(time_gap_hour/24);

            comment_elapsed_time = time_gap_day + ' 일전';

          } else {

            comment_elapsed_time = time_gap_hour + ' 시간전';
          
          }

        } else {

          comment_elapsed_time = time_gap_minute + ' 분전';

        }

  return comment_elapsed_time;
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

          } 
        });
    } 

}



  // window.location.href = 'review-wri.php?blog_no='+deleteno+'&mode=delete';


