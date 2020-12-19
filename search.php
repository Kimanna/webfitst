<?php

// echo json_encode($_GET["mode"]); 


$searchText = $_GET["searchText"];
// echo json_encode($searchText);

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}
  $sql = "SELECT * FROM blog WHERE title OR element LIKE '%$searchText%'";
  // 
  
  $result = mysqli_query($conn, $sql);
  // $row = mysqli_fetch_assoc($result);


  // $rowarray = array(
  //   'title'=>$row['title'],
  //   'thumbnail'=>$row['thumbnail'],
  //   'element'=>$row['element'],
  //   'created'=>$row['created'],
  //   'blog_no'=>$row['blog_no'],
  // );

  $data = array(); 

  while ($row = $sql->ferch_array()){

    extract($row);
     $rowarray = array($data,
     array(
    'title'=>$row['title'],
    'thumbnail'=>$row['thumbnail'],
    'element'=>$row['element'],
    'created'=>$row['created'],
    'blog_no'=>$row['blog_no'],
   ));
  }


  if ( mysqli_num_rows($result) > 0 ) {
    
    echo json_encode($rowarray);

  }

  else{

    echo json_encode(array('res'=>"notok"));

  }


?>