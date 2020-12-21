




<div style="position:fixed; width:160px; right:40px; top: 100px; z-index: 1;"> 
      <div id="sidebar" style="padding: 0px 5px; border: 1px solid; background-color: white; border-color:darkgray; box-shadow: 5px 5px 10px grey; ">	
        <ul style="width:100%;padding:0;">
          <li style="font-weight: bold; text-align: center; font-size: 15px; margin-bottom: 10px">최근 방문한 후기
              <br>
            </li>
            <div style="text-align: center;">
              <div class="scrollbarauto">

                              
              





            </div>
          </div>
        </ul>
      </div>
     </div> 

     <script>

       // 쿠키 읽어오는 함수
          var txtName = "";

       // 쿠키 여부 확인
        if (document.cookie != "") {

                      
            // 여러개의 쿠키 읽어오기
            var cookies = document.cookie.split("; ");
            // console.log(cookies);

            // 쿠키 개수만큼 반복
            for (var i=0; i<cookies.length; i++) {

              
              if (cookies[i].split("=")[0] == "reviewlist5")  {
                txtName = cookies[i].split("=")[1];            
              }
            }

            console.log(txtName);

            
            // 게시물을 열람했던 기록의 쿠키가 없을때 띄워주는 메시지
            if (txtName == "") {

              console.log("if안쪽");
              
              $('.scrollbarauto').html('<div style="font-size: 12px; color:brown;">아직 게시물 방문 기록이 없습니다</div>');
              

            // 게시물 열람했던 기록이 있는경우 list 만들어서 보여줌
            } else {
              console.log("else 안쪽");


              var jsonps = JSON.parse(txtName);
              var taglist = '';

              console.log(jsonps);


              for ( var i = 0 ; i < jsonps.lenght ; i++ ) {

                console.log(jsonps[i]);
                
                
                // 리뷰가 기록됨
                if (jsonps.type == "review") {

                  taglist += '<li><a href="review-det.html?review_no='+jsonps[i].no+'" target="_blank"><img src="'+jsonps[i].thumbnail+'" width="110" height="60" alt="">'+
                '</a></li><li class="titlefont" style="font-size: 14px;">'+jsonpa[i].title+'<br></li><li class="datefont" style="font-size: 11px; color:dimgray; margin-bottom: 8px;">'+jsonps[i].created+'<br></li>';

                }

                // 블로그가 기록됨
                if (jsonps.type == "review") {

                  taglist += '<li><a href="blog-det.html?blog_no='+jsonps[i].no+'" target="_blank"><img src="'+jsonps[i].thumbnail+'" width="110" height="60" alt="">'+
                '</a></li><li class="titlefont" style="font-size: 14px;">'+jsonps[i].title+'<br></li><li class="datefont" style="font-size: 11px; color:dimgray; margin-bottom: 8px;">'+jsonps[i].created+'<br></li>';

                }

              }

              $('.scrollbarauto').html(taglist);


            }
        } else {
          $('.scrollbarauto').html('<div style="font-size: 12px; color:brown;">아직 게시물 방문 기록이 없습니다</div>');

        }

    </script>