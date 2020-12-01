
var inputEmail = document.getElementById("inputEmail");
var inputPassword = document.getElementById("inputPassword");

var remember_me = document.querySelector('#remember_me');
var error = document.getElementById("error_next_box");


inputEmail.addEventListener("focusout", checkId);
inputPassword.addEventListener("focusout", checkPw);

function checkId () {
  if(inputEmail.value == "") {
    error.innerHTML = "ID 를 입력해 주세요";
    error.style.display = "block";
  } else {
    error.style.display = "none";
  }

}

function checkPw() {
  if(inputPassword.value == "") {
    error.innerHTML = "PW 를 입력해 주세요";
    error.style.display = "block";
    error.style.color = "red";
    error.style.marginBottom = "10px";
  } else {
    error.style.display = "none";
  }

}

remember_me