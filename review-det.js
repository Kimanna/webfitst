

window.onload = function() {

  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  // console.log(urlParams.get('review_no')); // url파라미터중 value 추출

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
            
            if ( i >= '3' ) {

              active2[i].innerHTML = obj[i+5];

            } else {

              active2[i].innerHTML = obj[i+4];
              console.log(obj[i+4]);

            }

            if ( !obj[i] ) {
              console.log(!obj[i]);
              obj[i] = "입력값 없음";
            } 
            
          }
          var str2 = '<img src="'+obj[7]+'" style="width: 362px; height: 100% !important;">';
          $("#imginput").html(str2);
          
          var str1 = '<button type="button" class="btn lg" id="register" onclick="javascript:goUpdate('+urlParams.get('review_no')+');">리뷰 수정</button>';
          $(".updatebt").html(str1);
 
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