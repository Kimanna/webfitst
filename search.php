<?php

error_reporting(E_ALL);
ini_set('display_errors', '1');

$conn = mysqli_connect("127.0.0.1","root","tkfkdgo","userinfo");
 if (!$conn) {
  die ('Failed'.mysqli_connect_error());
} else {
//  echo "success";
}

// blog.html에서 내용 검색 시 통신하는 구간
if (isset($_GET["searchText"])) {
  $searchText = $_GET["searchText"];
  $sql = "SELECT * FROM blog WHERE title LIKE '%$searchText%' OR element LIKE '%$searchText%'";


// index.html 에서 open chat list 를 가져오거나, blog 글 list 가져올때 통신하는 구간  
} else if (isset($_GET["MainList"])) {
  $chat_sql = mysqli_query($conn, "SELECT o.*, (SELECT COUNT(*) FROM open_chat_member AS m WHERE m.open_chat_no = o.open_chat_no) AS member_count 
                                  FROM open_chat AS o WHERE o.deleted=0 ORDER BY 
                                    (SELECT COUNT(*) FROM open_chat_conversation AS c WHERE c.open_chat_no = o.open_chat_no 
                                      AND date_format(FROM_UNIXTIME(sent_time/1000),'%m%d') > date_format(DATE_SUB(NOW(), INTERVAL 5 DAY),'%m%d')) DESC, 
                                    (SELECT COUNT(*) FROM open_chat_member AS m WHERE m.open_chat_no = o.open_chat_no) DESC;");

  $blog_sql = mysqli_query($conn, "SELECT b.blog_no, b.title, b.country, (SELECT COUNT(*) FROM comment AS c WHERE b.blog_no = c.post_no) AS comment_count
                                  FROM blog AS b WHERE b.deleted=0
                                  ORDER BY (SELECT COUNT(*) FROM comment AS c WHERE b.blog_no = c.post_no) DESC;");


} else if (isset($_GET["myChatList"])) {


}

  


if ( isset( $sql ) ) {
  $result = mysqli_query($conn, $sql);

    if ( mysqli_num_rows($result) > 0 ) {
        
        $dataarry = [];

        while($row = mysqli_fetch_assoc($result)) {

          $row = array('blog_no'=>$row['blog_no'],'title'=>$row['title'], 'created'=>$row['created'], 'aid'=>$row['aid'], 'thumbnail'=>$row['thumbnail'], 'element'=>$row['element']);
          array_push ($dataarry, $row);
        
          }

          echo json_encode(array('res'=>"ok", 'data'=>$dataarry));
        
      } else {

        echo json_encode(array('res'=>"notok"));

      }
}

if ( isset( $chat_sql ) ) {

    $data_array = [];
    while ($row = mysqli_fetch_array($chat_sql))
    {
        array_push ($data_array, $row);
    }

    $data_array1 = [];
    while ($row1 = mysqli_fetch_array($blog_sql))
    {
        array_push ($data_array1, $row1);
    }

    echo json_encode(array('res'=>"ok", 'chat_data'=>$data_array, 'blog_data'=>$data_array1));

}

    
        


  $conn->close();


?>