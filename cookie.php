<?php

$cookiePno = $no; // 여기서 $no는 게시물 넘버이다.
$i=0;

if(isset($_COOKIE['today_view'])){ // today_view라는 쿠키가 존재하면
	$todayview=$_COOKIE['today_view']; // $todayview 변수에 today_view 쿠키를 저장한다.
	$tod2=explode(",", $_COOKIE['today_view']); // today_view 쿠키를 ','로 나누어 구분한다.
	$tod=array_reverse($tod2); // 최근 목록 5개를 뽑기 위해 배열을 최신 것부터로 반대로 정렬해준다.

	// 중복을 막기위한 save 변수 지정
	while($i<sizeof($tod)){ // $tod배열의 사이즈만큼 반복한다.
		if($cookiePno==$tod[$i]){
			$save='no';
		}
		$i++;
	}
}
// 여기까지의 소스를 모든 컨트롤러의 메소드의 붙여넣기

// 저장된 쿠키값이 없을 경우 새로 쿠키를 저장하는 소스
if(!isset($_COOKIE['today_view'])){
	setcookie('today_view', $cookiePno, time() + 21600, "/");
}

// 저장된 쿠키값이 존재하고, 중복된 값이 아닌 경우 기존의 today_view 쿠키에 현재 쿠키를 추가하는 소스
if(isset($_COOKIE['today_view'])){
	if($save != 'no'){
		setcookie('today_view' , $todayview. "," . $cookiePno , time() + 21600, "/");
	}
}

// view쪽에 cookie값을 뿌리기 위한 소스, 2차원 배열을 사용해 쿠키의 사이즈를 가져와 뿌리도록 설정하였다.
if(isset($_COOKIE['today_view'])){
	$cookiecount;
		for($cookiecount = 0; $cookiecount < sizeof($tod); $cookiecount++) {
			$data["recentview"][$cookiecount] = $this->Product_m->getrecentview($tod[$cookiecount]);
		}
}

?>