




// html 로드시 수정 데이터가 있는경우 ( =파라미터가 있는경우 ) 데이터 가져오기 동작
// window.onload = function() {

//   const queryString = window.location.search;
//   const urlParams = new URLSearchParams(queryString);
//   console.log(urlParams.get('advertise_no')); // url파라미터중 value 추출

//   if ( queryString != null || queryString != "" || urlParams.get('advertise_no') != null || urlParams.get('review_no') != "" || urlParams.get('review_no') != undefined ) {

//     var f = document.storyForm;

    
//         $.get("advertise-det.php",
//         { review_no : urlParams.get('advertise_no') }, 
//           function(data, status){

//             console.log(data);
//             console.log(jQuery.parseJSON(data));
            
            
//             if (jQuery.parseJSON(data).res == 'notok') {

//             } else {

//               //파라미터가 있는경우, 삭제하기 버튼추가해주고, 하단 버튼의 Text는 수정과, 뒤로가기로 변경해줌
//                 var deletbtn = '<button type="button" class="btn lg" id="register" onclick="javascript:deletereview('+urlParams.get('review_no')+');">글&nbsp;삭&nbsp;제</button>';
//                 $('#deletbtn').html(deletbtn);

                
//                 btnresist.firstElementChild.innerText = "수정";
//                 btnresist.lastElementChild.innerText = "뒤로가기";
                

//                 var obj = jQuery.parseJSON(data);
//                 // console.log(obj[5]);

//                 f.school.value = obj[4];
//                 $('#countryname').val(obj[3]).prop("selected",true);
//                 istown ();
                
//                 $('#townselect').val(obj[5]).prop("selected",true);


//                 f.writer.value = obj[6];
//  //               f.thumbnail.value = obj[7];
//                 f.st_homepage.value = obj[8];
               
//                 f.st_content14.value = obj[9];
//                 f.st_content1.value = obj[10];
//                 f.st_content2.value = obj[11];
//                 f.st_content15.value = obj[12];
//                 f.st_content4.value = obj[13];
//                 f.st_content5.value = obj[14];
//                 f.st_content16.value = obj[15];
//                 f.st_content12.value = obj[16];
//                 f.st_content6.value = obj[17];
//                 f.st_content22.value = obj[18];
//                 f.st_content13.value = obj[19];
//                 f.st_content7.value = obj[20];
//                 f.st_content9.value = obj[21];
//                 f.st_content3.value = obj[22];
//                 f.st_content18.value = obj[23];
//                 f.st_content19.value = obj[24];
//                 f.st_content20.value = obj[25];
            
//           }
       
//       })
//   }

// }

var country = document.querySelector('#countryname');
console.log(country);


// country.innerHTML = "나라를 선택해 주세요.";
// country.style.display = "inline-block";

country.addEventListener("click", istown);

function istown () {

  if(country.value === "나라선택") {
    return;
  } else if(country.value === "USA") {

    $("#choosecountry").html(townlist("USA"));
    
  } else if(country.value === "CAN") {

    $("#choosecountry").html(townlist("CAN"));
    
  } else if(country.value === "GBR") {

    $("#choosecountry").html(townlist("GBR"));
    
  } else if(country.value === "IRL") {

    $("#choosecountry").html(townlist("IRL"));
    
  } else if(country.value === "AUS") {

    $("#choosecountry").html(townlist("AUS"));
    
  } else if(country.value === "NZL") {

    $("#choosecountry").html(townlist("NZL"));
    
  } else if(country.value === "PHL") {

    $("#choosecountry").html(townlist("PHL"));
    
  } else if(country.value === "MLT") {

    $("#choosecountry").html(townlist("MLT"));
    
  } 
}

function townlist (co) {
  
  var str1 = '<label for="country" style="margin-top: 15px; display: block;">국가선택</label><select name="sc_town" id="townselect"><option value>지역선택</option>';

  if (co === "USA") {
    
    var str2 = '<option value="NewYork">NewYork</option><option value="LosAngeles">LosAngeles</option><option value="Cicago">Cicago</option><option value="Houston">Houston</option><option value="Piladelphia">Piladelphia</option></select>';
    return str1+str2;
  } else if (co === "CAN") {
    
    var str2 = '<option value="Toronto">Toronto</option><option value="Montreal">Montreal</option><option value="Vancouver">Vancouver</option><option value="Ottawa">Ottawa</option><option value="Calgary">Calgary</option></select>';
    return str1+str2;
  } else if (co === "GBR") {
    
    var str2 = '<option value="London">London</option><option value="Birmingham">Birmingham</option><option value="Leeds">Leeds</option><option value="Glasgow">Glasgow</option><option value="Sheffield">Sheffield</option></select>';
    return str1+str2;
  } else if (co === "IRL") {
    
    var str2 = '<option value="Dublin">Dublin</option><option value="Cork">Cork</option><option value="Galway">Galway</option><option value="Bray">Bray</option><option value="Wexford">Wexford</option></select>';
    return str1+str2;
  } else if (co === "AUS") {
    
    var str2 = '<option value="Melbourne">Melbourne</option><option value="Sydney">Sydney</option><option value="Canberra">Canberra</option><option value="Brisbane">Brisbane</option><option value="Darwin">Darwin</option></select>';
    return str1+str2;
  } else if (co === "NZL") {
    
    var str2 = '<option value="Auckland">Auckland</option><option value="Christchurch">Christchurch</option><option value="Wellington">Wellington</option><option value="Palmerston">Palmerston</option><option value="Hamilton">Hamilton</option></select>';
    return str1+str2;
  } else if (co === "PHL") {
    
    var str2 = '<option value="Ceub">Ceub</option><option value="Baguio">Baguio</option><option value="Manila">Manila</option><option value="Clark">Clark</option><option value="Iloilo">Iloilo</option></select>';
    return str1+str2;
  } else if (co === "MLT") {
    
    var str2 = '<option value="Valletta">Valletta</option><option value="Sliema">Sliema</option></select>';
    return str1+str2;
  } 
}