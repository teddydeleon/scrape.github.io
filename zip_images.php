<?php
set_time_limit(0);
ini_set('display_errors', 1);
$dir = 'C:\\xampp\\htdocs\\wwscrape\\images\\thumb\\';
$dir_full = 'C:\\xampp\\htdocs\\wwscrape\\images\\';


function imageList($dir){
  if (is_dir($dir)) {
      if ($dh = opendir($dir)) {
          $images = array();

          while (($file = readdir($dh)) !== false) {
              if (!is_dir($dir.$file)) {
                  $images[] = $file;
              }
          }
          closedir($dh);
          return $images;
      }
  }
}



function zipIt($files,$dir){
  $zip = new ZipArchive;
  $res = $zip->open('thumb.zip', ZipArchive::CREATE);
    if ($res === TRUE) {
      for($i = 0; $i < count($files); $i++){
        //$zip->addFromString( $files[$i], $destination);
        $zip->addFile($dir.'\\'.$files[$i], $files[$i]);
    }
      $zip->close();
      //echo 'ok';
    } else {
      //  echo 'failed';
    }
}

function zipItFull($files_full,$dir_full){
  $zip = new ZipArchive;
  $res = $zip->open('full.zip', ZipArchive::CREATE);
    if ($res === TRUE) {
      for($i = 0; $i < count($files_full); $i++){
        //$zip->addFromString( $files[$i], $destination);
        $zip->addFile($dir_full.'\\'.$files_full[$i], $files_full[$i]);
    }
      $zip->close();
      //echo 'ok';
    } else {
      //  echo 'failed';
    }
}



?>
