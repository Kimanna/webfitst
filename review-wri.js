
//세션값 확인하는 부분
// var signup = document.getElementsById('sessionisset');
// var loginuser = document.getElementsById('loginuser');

//   var userId = window.sessionStorage.getItem("userId");
//   if (window.sessionStorage.getItem("userId") == null) {
//     signup.setAttribute( 'href', 'login.html' );
//     signup.innerHTML = "sign in";
//     loginuser.style.display = "none"; 
//     }
//   if (window.sessionStorage.getItem("userId") != null) {
//     signup.setAttribute( 'href', 'logout.php' );
//     signup.innerHTML = "sign out";
//     loginuser.innerHTML = userId+" 님이 로그인 중입니다.";
//     loginuser.style.display = "inline-block";  
//   }

//   console.log(window.sessionStorage.getItem("userId"));
//   console.log(window.sessionStorage.length());  

// review.html 에서 등록하기 버튼을 클릭한 경우 작동하는 메서드
// 로그인 상태면 글을 쓸 수 있지만 로그인상태가 아니면 글을 쓸수 없다는 메시지를 출력 ---------------수정해야함
document.getElementById("register").onclick = function() {

  location.replace('http://localhost/review-wri.html');
  // alert('로그인이 필요합니다. 로그인 해주세요.');  

};

function goView(inputno) {

  if (inputno == 5580) {
    location.replace('http://localhost/blog-det.html');
  }
  if (inputno == 467) {
    location.replace('http://localhost/review-det.html');
  }
}


// review-WritableStream.html에서 모든 정보를 다 입력했는지 확인하는 부분

function storySave() {

  var f = document.storyForm;
  if( f.school.value.trim() == "") {
      alert("학교명을 입력해주세요.");
      return;
  }
  if ( f.town.value.trim() == "") {
      alert("지역을 입력해주세요.");
      return;
  }
  if ( f.writer.value.trim() == "") {
      alert("이름을 입력해주세요.");
      return;
  }
  if ( f.thumbnail.value.trim() == "") {
      alert("썸네일 이미지를 등록해주세요.");
      return;
  }
  if ( f.thumbnail.value.trim() != "") {
      var ext = getFileExt( f.thumbnail.value ).toLowerCase();
      
      if ( ext != "jpg" && ext != "gif" && ext != "png" ) {
          alert("jpg, gif, png 파일만 등록하실 수 있습니다.");
          return;
      }
  }
  
  f.submit();
}

function getFileExt (p_filename){
  if ( p_filename){
      if( p_filename.length > 0 ){
          var lidx = p_filename.lastIndexof(".");
          var p_filename_len = p_filename.length;
          
          if( lidx > -1 ){
              return p_filename.substring(lidx+1);
          }
      }
  }
  return "";
}