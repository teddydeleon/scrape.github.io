<?php
include('zip_images.php');
$files = imageList($dir);
var_dump($files);
//break;
zipIt($files);
?>
