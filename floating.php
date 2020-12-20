<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<div class="col-md-11 col-md-push-3 col-sm-12">
        <div id="sidebar" style="position: absolute;">	
          <ul>
            <li align="center">
                최근본상품
              <?php
                if(isset($_COOKIE['today_view'])){
                  $cookieArray=explode(",", $_COOKIE['today_view']);
                  $cookieCount=sizeof($cookieArray);
              ?>
                <?php=$cookieCount;?>
              <?php 
                }
              ?>
              <br>
            </li>
            <div style="text-align: center;">
              <div class="scrollbarauto">
              <?php
                if(isset($_COOKIE['today_view'])){
                  for($i=0; $i < $cookieCount; $i++){
                    foreach($recentview[$i] as $key){
              ?>
                <li>
                  <a href="<?php echo base_url(); ?>CI/Product/view/no/<?php=$key->no?>" target="_blank">
                    <img src="<?php echo base_url(); ?>CI/userimg/<?php=$key->cookiepic?>" width="60" height="60" alt="">
                  </a>
                </li>
                <br>
              <?php			}
                  }
                }
              ?>
                
              </div>
            </div>
          </ul>
        </div>
      </div>
</body>
</html>