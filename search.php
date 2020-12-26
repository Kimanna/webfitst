<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$searchText = $_GET["searchText"];
// $searchText = "go";

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}
  $sql = "SELECT * FROM blog WHERE title LIKE '%$searchText%' OR element LIKE '%$searchText%'";

  
  $result = mysqli_query($conn, $sql);
  // $row = mysqli_fetch_assoc($result);

  

if ( mysqli_num_rows($result) > 0 ) {
    

    $dataarry = [];

    while($row = mysqli_fetch_assoc($result)) {
      
      
    
       $row = array('blog_no'=>$row['blog_no'],'title'=>$row['title'], 'created'=>$row['created'], 'aid'=>$row['aid'], 'thumbnail'=>$row['thumbnail'], 'element'=>$row['element']);
      
       array_push ($dataarry, $row);
     
      }

      echo json_encode(array('res'=>"ok", 'data'=>$dataarry));
    
    // echo json_encode(array('res'=>"ok", 'data'=>$row));
    // echo json_encode(array('res'=>"ok", 'data'=>$row));

    
  } else {

    echo json_encode(array('res'=>"notok"));

  }

  // var_dump($row);

    
        


  $conn->close();


?>