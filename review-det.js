
window.onload = function() {

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get('review_no')); // url파라미터중 value 추출

  var active = document.querySelectorAll('.active');
  var active2 = document.querySelectorAll('table tbody td');
  
      $.get("review-det.php",
      { review_no : urlParams.get('review_no') }, 
        function(data, status){

          // console.log(data);
          var obj = jQuery.parseJSON(data);
          
          // console.log(obj[5]);
          // console.log(active[0].nextElementSibling.innerHTML = "안녕하셈");
          // console.log(active2[2].innerHTML = "안녕");
//          active[i].nextElementSibling.innerHTML = obj[i+4];
  
          for (var i = 0; i < active.length ; i++) {

            if ( !obj[i+4] ) {
              obj[i+4] = "입력값 없음";
            }

              active2[i].innerHTML = obj[i+4];
              console.log(obj[i+4]);

          }
          var str1 = '<button type="button" class="btn lg" id="register" onclick="javascript:goUpdate('+urlParams.get('review_no')+');">리뷰 수정</button>';
          $(".updatebt").html(str1);
         
    })

}


function goUpdate(updateno) {

  console.log(updateno);
  window.location.href = 'review-wri.html?review_no='+updateno;

}