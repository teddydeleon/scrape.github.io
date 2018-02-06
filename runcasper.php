<?php
ini_set('display_errors', 1);
set_time_limit(0);
$arg0 = $_POST["values"];
echo "what a test  -->" . $arg0 ;
// $exec = exec("C:\casperjs-casperjs-0b06a37\bin\casperjs scraper.js");
//  var_dump($exec);
//casperjs --proxy=185.222.38.45:3128 --proxy-type=http proxy2.js

  $casperjs = "casperjs";
  $script = "scraper.js";
  $proxy = "--proxy=185.198.247.172:3128";
  $proxy_type = "--proxy-type=http";
  $command = "$casperjs $proxy $proxy_type $script $arg0";
  $result = shell_exec($command);
  var_dump($result);
//after the dump we resize images
  include('resize.php');
  $r = new ResizeImages();
  $r->start();
//after resize we zip all of the images
include('zip_images.php');
$files= imageList($dir);
zipIt($files,$dir);
$files_full = imageList($dir_full);
zipItFull($files_full,$dir_full);
?>
