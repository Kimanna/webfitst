
// ClassicEditor
//   .create ( document.querySelector ( '#editor'), {
//     extraPlugins: [MyCustomUploadAdapterPlugin],
//     simpleUpload: {
//         // The URL that the images are uploaded to.
//         uploadUrl: 'http://example.com',
    
//         // Enable the XMLHttpRequest.withCredentials property.
//         withCredentials: true,
    
//         // Headers sent along with the XMLHttpRequest to the upload server.
//         headers: {
//             'X-CSRF-TOKEN': 'CSRF-Token',
//             Authorization: 'Bearer <JSON Web Token>'
//         }
//     }

//   } )
//   .catch( error => {
//     console.error( error );
// })

// ClassicEditor.replace('description', {
//   'filebrowserUploadUrl':'/browser/browse.php'
// });



// var myEditor;

// ClassicEditor
// 	.create( document.querySelector( '#editor' ), {
// 		ckfinder: {
// 	        uploadUrl: '/uploadimg' // 내가 지정한 업로드 url (post로 요청감)
// 		},
// 		alignment: {
//             options: [ 'left', 'center', 'right' ]
//         }
// 	} )
// 	.then( editor => {
//         console.log( 'Editor was initialized', editor );
//         myEditor = editor;
//     } )
// 	.catch( error => {
// 	    console.error( error );
// 	} );
  
// class UploadAdapter {
//     constructor(loader) {
//         this.loader = loader;
//     }

//     upload() {
//         return this.loader.file.then( file => new Promise(((resolve, reject) => {
//             this._initRequest();
//             this._initListeners( resolve, reject, file );
//             this._sendRequest( file );
//         })))
//     }

//     // abort() {
//     //   // Reject the promise returned from the upload() method.
//     //   server.abortUpload();
//     // }

//     _initRequest() {
//         const xhr = this.xhr = new XMLHttpRequest();
//         xhr.open('POST', 'http://localhost/blog-wri.php', true);
//         xhr.responseType = 'json';
//     }

//     _initListeners(resolve, reject, file) {
//         const xhr = this.xhr;
//         const loader = this.loader;
//         const genericErrorText = '파일을 업로드 할 수 없습니다.'

//         xhr.addEventListener('error', () => {reject(genericErrorText)})
//         xhr.addEventListener('abort', () => reject())
//         xhr.addEventListener('load', () => {
//             const response = xhr.response
//             if(!response || response.error) {
//                 return reject( response && response.error ? response.error.message : genericErrorText );
//             }

//             resolve({
//                 default: response.url //업로드된 파일 주소
//             })
//         })
//     }

//     _sendRequest(file) {
//         const data = new FormData()
//         data.append('upload',file)
//         this.xhr.send(data)
//     }
// }

// function MyCustomUploadAdapterPlugin(editor) {
//   editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//       return new UploadAdapter(loader)
//   }
// }

// ClassicEditor
//     .create ( document.querySelector ( '#editor'), {
//       extraPlugins: [ MyCustomUploadAdapterPlugin ],
//     })
//     .then( editor => {
//       window.editor = editor;
//     } )
//     .catch( error => {
//       console.error ( error );
//     });



CKEDITOR.replace('content' ,{
  height : 300,
  filebrowserUploadUrl:"blog-wri_img.php"
})



// 나라, 지역 선택 스피너
var country = document.querySelector('#countryname');
// var choose = document.querySelector('#choosecountry');



//등록 수정 삭제 버튼을 삽입하기위해 선택하는 부분
var btnresist = document.querySelector('.boardBtns');



// blog-wri.html에서 모든 정보를 다 입력했는지 확인하는 부분
// form (hidden) 안에 데이터 mode 정보를 입력해줌 create/update 인지
// 수정인 경우 파라미터 정보 (글넘버) 를 append하여 넘겨줌 



// function blogSave() {

  
//   var formObj = $("form[role='form']");

//   console.log(formObj);
//   console.log(formObj.title.value);
//   console.log(formObj.title.value.trim());
//   console.log(formObj.country.value.trim());

//   if( formObj.title.value.trim() == "") {
//       alert("제목을 입력해주세요.");
//       return;
//   }
//   if ( formObj.country.value.trim() == "") {
//       alert("나라를 선택해 주세요.");
//       return;
//   } else {
//     return;
//   }
// }

  // if (btnresist.firstElementChild.innerText == "수정") {


  //   var mode ='<input type="hidden" name="mode" value="update"/>';
  //   var hidden ='<input type="hidden" name="blog_no" value="'+urlParams.get('blog_no')+'"/>';
  //   formObj.attr("action", "blog-wri.php");
  //   formObj.append(mode).append(hidden);
  //   formObj.submit();

  // } else {

  //   var mode ='<input type="hidden" name="mode" value="create"/>';
  //   formObj.attr("action", "blog-wri.php");
  //   formObj.append(mode);
  //   formObj.submit();

  // }



  
 


  
  
  