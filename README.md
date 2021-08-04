

# Webfitst

		○ 프로젝트명 : Ya Neodoo
		
    
		○ 프로젝트 소개 :  어학연수 커뮤니티 사이트
		
    
		○ 프로젝트 개발 목적 : 
			어학연수 후기들은 많지만 대부분이 어학원의 광고를 위한 홍보물로 작성되어 보다 사실적인 후기들이 없다고 생각하여
			좀 더 사실적인 후기들을 공유하기 위해 기획
		
    
		○ 주요 기능
		-게시판 : CKEditor 라이브러리를 이용한 게시글 등록, 수정, 삭제
		-게시물 검색, 페이징 
		-게시물 댓글, 좋아요 
		-개인 프로필 수정, 내가작성한 게시글 목록 확인, 참여중인 채팅방 목록 확인 
		-쿠키 : 최근 본 게시물을 5개까지 보여줍니다.
 		-채팅 : 오픈채팅방을 만들거나 오픈채팅방안의 인원과 1:1 채팅도 가능
		
		
		○ 사용언어
		Front-End : HTML, CSS ( + Tailwind ), Javascript ( + Jquery ) 
		Back-End : NodeJS ( 채팅부분 ), PHP
		
    
		○ 개발 환경
		Server : Apache ( + virtualbox ), NodeJS
		Client : VSCode, Brackets
		Database : MySQL
		
    
		○ 통신 프로토콜
		HTTP, WebSocket, SSH, SFTP, SMTP


		○ 기능 시연 영상
		
		1.회원가입, 아이디찾기, 비밀번호 찾기 (변경), 로그인
		-아이디 중복확인 후 회원가입을 진행할 수 있습니다. ( ajax )
		-세션을 이용해 로그인 상태 유지


    
		2.마이페이지
		-프로필 수정이 가능합니다.
		-내가 등록한 글 목록 list 를 보여줍니다. ( 클릭시 해당게시물로 이동 )
   		-내가 입장했었던 오픈채팅방 list 를 보여줍니다. ( 클릭시 채팅방 이동 )
		
<img width="80%" src="https://user-images.githubusercontent.com/69760221/128201373-483f3e3a-bef3-4f93-b553-f2a0fe7781e5.mp4"/>

    
		3.어학연수 게시판, 블로그 후기 게시판
		-리뷰등록, 수정, 삭제 ( 정해진 양식이 있는 인터뷰 형식으로 게시물 등록 )
		-블로그 등록, 수정, 삭제 ( CKEditor 라이브러리를 이용한 게시물 등록 )
 		-게시물 나라별로 보기 카테고리 구분.
 		-페이징 처리.
 		-게시글 검색.
 		-댓글과 대댓글 작성, 수정, 삭제와 댓글에 좋아요를 표시할 수 있습니다.
    
    
 		4.메인페이지
		-최근 게시물 list 슬라이드로 보여줍니다. ( 클릭 시 해당 게시물로 이동 )
   		-댓글이 가장 많은 순으로 게시물 list 보여줍니다. ( 클릭 시 해당 게시물로 이동 )
		-최근 5일 동안 채팅대화가 가장 많은 순으로 오픈 채팅방 리스트를 보여줍니다. ( 클릭 시 해당 채팅방 입장 또는 이동 )
		-쿠키를 이용해 열람했던 게시물로 최신순으로 5개 까지만 보여줍니다.
    
<img width="80%" src="https://user-images.githubusercontent.com/69760221/128204155-95541805-e65e-41e8-a8a3-d3d623d6d318.mp4"/>


  		5.채팅
		-오픈채팅방 생성, 수정
		-오픈채팅방 삭제는 방안에 남은 마지막 한명이 방을 나갈 시 삭제됩니다.
		-오픈채팅방 정보를 확인 할 수 있고, 입장하여  채팅을 할 수 있습니다.
		-오픈채팅방에 입장, 퇴장 시 입퇴장 문구를 띄워줍니다.
		-같은 룸 안에 있는 유저들에게 메시지 전송과 이미지 전송.
		-같은 룸 안에 있는 다른 유저에게 1:1 채팅 신청.
		-안 읽은 채팅 메시지 갯수 표시.
    

	
		
