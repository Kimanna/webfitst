/*변수 선언*/


var id = document.querySelector('#id');

var pw1 = document.querySelector('#pswd1');
var pwMsg = document.querySelector('#alertTxt');
var pwImg1 = document.querySelector('#pswd1_img1');

var pw2 = document.querySelector('#pswd2');
var pwImg2 = document.querySelector('#pswd2_img1');
var pwMsgArea = document.querySelector('.int_pass');
var userName = document.querySelector('#name');

var yy = document.querySelector('#yy');
var mm = document.querySelector('#mm');
var dd = document.querySelector('#dd');

var gender = document.querySelector('#gender');
var email = document.querySelector('#email');

var error = document.querySelectorAll('.error_next_box');

var button = document.querySelector("#btnJoin");

var check1 = false; //성별체크
var check2 = false;
var check3 = false;
var check4 = false;
var check5 = false;
var check6 = false;
var check7 = false;
var check8 = false;

/*이벤트 핸들러 연결*/

id.addEventListener("keyup", checkId);
pw1.addEventListener("focusout", checkPw);
pw2.addEventListener("focusout", comparePw);
userName.addEventListener("focusout", checkName);
yy.addEventListener("focusout", isBirthCompleted);
mm.addEventListener("focusout", isBirthCompleted);
dd.addEventListener("focusout", isBirthCompleted);
gender.addEventListener("focusout", function() {
    if(gender.value === "성별") {
        error[5].style.display = "block";
        check1 = false;
    } else {
        error[5].style.display = "none";
        check1 = true;
    }
})
email.addEventListener("focusout", isEmailCorrect);
button.addEventListener("click", savemember);


//  //region unreal 가입
//  function checkId(event) {
//   if(idFlag) return true;

//   var id = $("#id").val();
//   var oMsg = $("#idMsg");
//   var oInput = $("#id");


//   if ( id == "") {
//       showErrorMsg(oMsg,"필수 정보입니다.");
//       setFocusToInputObject(oInput);
//       return false;
//   }

//   var isID = /^[a-z0-9][a-z0-9_\-]{4,19}$/;
//   if (!isID.test(id)) {
//       showErrorMsg(oMsg,"5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.");
//       setFocusToInputObject(oInput);
//       return false;
//   }

//   idFlag = false;
//   $.ajax({
//       type:"GET",
//       url: "/user2/joinAjax.nhn?m=checkId&id=" + id ,
//       success : function(data) {
//           var result = data.substr(4);

//           if (result == "Y") {
//               if (event == "first") {
//                   showSuccessMsg(oMsg, "멋진 아이디네요!");
//               } else {
//                   hideMsg(oMsg);
//               }
//               idFlag = true;
//           } else {
//               showErrorMsg(oMsg, "이미 사용중이거나 탈퇴한 아이디입니다.");
//               setFocusToInputObject(oInput);
//           }
//       }
//   });
//   return true;
// }


/*콜백 함수*/


function checkId() {
  
  var useridcheck = id.value;
 
  var idPattern = /[a-zA-Z0-9_-]{5,20}/;
  if(id.value == "") {
      error[0].innerHTML = "필수 정보입니다.";
      error[0].style.color = "red";
      error[0].style.display = "block";
      check2 = false;
      return false;
  } else if(!idPattern.test(id.value)) {
      error[0].innerHTML = "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
      error[0].style.display = "block";
      check2 = false;
      return false;
  } else {
    $.ajax({
      type:"GET",
      dataType:"json",
      url: "id_check.php",
      data: {'id':useridcheck},
      success : function(json) {
        // console.log(useridcheck);
        // console.log(json);
        // console.log(json.res);
        
        if(json.res == 'ok') {
          error[0].innerHTML = "사용 가능";
          error[0].style.color = "#08A600";
          error[0].style.display = "block";
          check2 = true;
          return true;
        } else {
          error[0].innerHTML = "이미 사용중이거나 탈퇴한 아이디입니다.";
          error[0].style.color = "red";
          error[0].style.display = "block";
          check2 = false;
          return false;
        }
      }, error : function() {
        console.log("실패");
      }
    })
  }
}

function checkPw() {
    var pwPattern = /[a-zA-Z0-9~!@#$%^&*()_+|<>?:{}]{8,16}/;
    if(pw1.value === "") {
        error[1].innerHTML = "필수 정보입니다.";
        error[1].style.display = "block";
        return false;
    } else if(!pwPattern.test(pw1.value)) {
        error[1].innerHTML = "8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.";
        pwMsg.innerHTML = "사용불가";
        error[0].style.color = "red";
        pwMsgArea.style.paddingRight = "93px";
        error[1].style.display = "block";
        pwMsg.style.display = "block";
        pwImg1.src = "/images/m_icon_not_use.png";
        return false;
    } else {
        error[1].style.display = "none";
        pwMsg.innerHTML = "안전";
        pwMsg.style.display = "block";
        pwMsg.style.color = "#03c75a";
        pwImg1.src = "/images/m_icon_safe.png";
        return true;
    }
}

function comparePw() {
    if(pw2.value === pw1.value && pw2.value != "") {
        pwImg2.src = "/images/m_icon_check_enable.png";
        error[2].style.display = "none";
        return true;
    } else if(pw2.value !== pw1.value) {
        pwImg2.src = "/images/m_icon_check_disable.png";
        error[2].innerHTML = "비밀번호가 일치하지 않습니다.";
        error[2].style.display = "block";
        return false;
    } 

    if(pw2.value === "") {
        error[2].innerHTML = "필수 정보입니다.";
        error[2].style.display = "block";
        return false;
    }
}

function checkName() {
    var namePattern = /[a-zA-Z가-힣]/;
    if(userName.value === "") {
        error[3].innerHTML = "필수 정보입니다.";
        error[3].style.display = "block";
        return false;
    } else if(!namePattern.test(userName.value) || userName.value.indexOf(" ") > -1) {
        error[3].innerHTML = "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)";
        error[3].style.display = "block";
        return false;
    } else {
        error[3].style.display = "none";
        return true;
    }
}


function isBirthCompleted() {
    var yearPattern = /[0-9]{4}/;

    if(!yearPattern.test(yy.value)) {
        error[4].innerHTML = "태어난 년도 4자리를 정확하게 입력하세요.";
        error[4].style.display = "block";
        return false;
    } else {
        isMonthSelected();
    }


    function isMonthSelected() {
        if(mm.value === "월") {
            error[4].innerHTML = "태어난 월을 선택하세요.";
            check6 = false;
            return false;
        } else {
            isDateCompleted();
        }
    }

    function isDateCompleted() {
        if(dd.value === "") {
            error[4].innerHTML = "태어난 일(날짜) 2자리를 정확하게 입력하세요.";
            return false;
        } else {
            isBirthRight();
        }
    }
    return true;
}



function isBirthRight() {
    var datePattern = /\d{1,2}/;
    if(!datePattern.test(dd.value) || Number(dd.value)<1 || Number(dd.value)>31) {
        error[4].innerHTML = "생년월일을 다시 확인해주세요.";
    } else {
        checkAge();
    }
}

function checkAge() {
    if(Number(yy.value) < 1920) {
        error[4].innerHTML = "정말이세요?";
        error[4].style.display = "block";
        return false;
    } else if(Number(yy.value) > 2020) {
        error[4].innerHTML = "미래에서 오셨군요.";
        error[4].style.display = "block";
        return false;
    } else if(Number(yy.value) > 2005) {
        error[4].innerHTML = "만 14세 미만의 어린이는 보호자 동의가 필요합니다.";
        error[4].style.display = "block";
        return false;
    } else {
        error[4].style.display = "none";
        return true;
    }
}


function isEmailCorrect() {
    var emailPattern = /[a-z0-9]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/;

    if(email.value === ""){ 
        error[6].style.display = "none"; 
    } else if(!emailPattern.test(email.value)) {
        error[6].style.display = "block";
    } else {
        error[6].style.display = "none"; 
    }

}


function savemember() {
  if (checkId() == false) {
    return;
  }
  if (checkPw() == false) {
    return;
  }
  if (comparePw() == false) {
    return;
  }
  if (checkName() == false) {
    return;
  }
  if (isBirthCompleted() == false) {
    return;
  }
  if (checkAge() == false) {
    return;
  }

  document.getElementById('frm').submit();

}


/*
2월 : 윤년에는 29일까지, 평년에는 28일까지.
1,3,5,7, 8,10,12 -> 31일
2,4,6, 9,11 -> 30일
    var days31 = [1, 3, 5, 7, 8, 10, 12];
    var days30 = [4, 6, 9, 11];
    if(mm.value )
*/