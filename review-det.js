

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
          

          if ( jQuery.parseJSON(data).res == 'ok') {

            //내 게시물 인 경우 수정버튼 보여줌
            if ( jQuery.parseJSON(data).mine == 'ok') {

              var str1 = '<button type="button" class="btn lg" id="register" onclick="javascript:goUpdate('+urlParams.get('review_no')+');">리뷰 수정</button>';
              $(".updatebt").html(str1);


              //내가쓴 게시물이 아닌경우 수정버튼 없앰
            } else {


            }
          }

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
  
          var str2 = '<img src="'+jsondata.thumbnail+'" style="width: 362px; height: 100% !important;">';
          $("#imginput").html(str2);

          


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
              var obj = { 'type' : 'review', 'no' : jsondata.review_no, 'thumbnail': jsondata.thumbnail, 'title' : jsondata.school, 'created' : jsondata.created };
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
                    console.log(jsonps[0].review_no);

                    if (jsonps.length >= 5) {
                      jsonps.shift();
                    }

                    var obj = { 'type' : 'review', 'no' : jsondata.review_no, 'thumbnail': jsondata.thumbnail, 'title' : jsondata.school, 'created' : jsondata.created };

                    jsonps.push(obj);
                    console.log(jsonps);
                    
                    var stringjson = JSON.stringify(jsonps);

                    document.cookie = 'reviewlist11' + '=' + stringjson +'; SameSite=Strict; Secure';

                    }

            }

 
    })
}

function issetlist ( jsonps, jsondata ) {

  var issetdata = false;
  for (var i=0 ; i < jsonps.length ; i++ ) {

    // 블로그 개시물을 하나라도 본상태면 if안으로
    if ( jsonps[i].type == "review" ) {

      // 이미 본 게시물인 경우 쿠키에 저장 안함
      if (jsonps[i].no == jsondata.review_no) {
        console.log("이미 저장된 쿠키");
        issetdata = true;
        return;
      }
    }
    issetdata = false;
  }
  return issetdata;
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