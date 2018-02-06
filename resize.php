<?php
set_time_limit(0);
//Maximize script execution time
ini_set('max_execution_time', 0);
class ResizeImages
{


//Initial settings, Just specify Source and Destination Image folder.
public $ImagesDirectory    = 'C:\\xampp\\htdocs\\wwscrape\\images'; //Source Image Directory End with Slash
public $DestImagesDirectory    = 'C:\\xampp\\htdocs\\wwscrape\\images\\thumb\\'; //Destination Image Directory End with Slash
public $NewImageWidth      = 300; //New Width of Image
public $NewImageHeight     = 300; // New Height of Image
public $Quality        = 80; //Image Quality


public function start(){
//Open Source Image directory, loop through each Image and resize it.


      if($dir = opendir($this->ImagesDirectory)){

        echo $this->ImagesDirectory;
      

          while(($file = readdir($dir))!== false){

              $imagePath = $this->ImagesDirectory."\\".$file;
              echo "image path--->" . $imagePath  ."file--->"  . $file;
              echo "</br>";
              $destPath = $this->DestImagesDirectory.$file;
              $checkValidImage = @getimagesize($imagePath);

              if(file_exists($imagePath) && $checkValidImage) //Continue only if 2 given parameters are true
              {
                  //Image looks valid, resize.
                  if($this->resizeImage($imagePath,$destPath,$this->NewImageWidth,$this->NewImageHeight,$this->Quality))
                  {
                      //echo $file.' resize Success!<br />';
                      /*
                      Now Image is resized, may be save information in database?
                      */

                  }else{
                      //echo $file.' resize Failed!<br />';
                  }
              }
          }
          closedir($dir);
      }
}
//Function that resizes image.
    public function resizeImage($SrcImage,$DestImage, $MaxWidth,$MaxHeight,$Quality)
    {
        list($iWidth,$iHeight,$type)    = getimagesize($SrcImage);
        $ImageScale             = min($MaxWidth/$iWidth, $MaxHeight/$iHeight);
        $NewWidth               = ceil($ImageScale*$iWidth);
        $NewHeight              = ceil($ImageScale*$iHeight);
        $NewCanves              = imagecreatetruecolor($NewWidth, $NewHeight);

        switch(strtolower(image_type_to_mime_type($type)))
        {
            case 'image/jpeg':
                $NewImage = imagecreatefromjpeg($SrcImage);
                break;
            case 'image/png':
                $NewImage = imagecreatefrompng($SrcImage);
                break;
            case 'image/gif':
                $NewImage = imagecreatefromgif($SrcImage);
                break;
            default:
                return false;
        }

        // Resize Image
        if(imagecopyresampled($NewCanves, $NewImage,0, 0, 0, 0, $NewWidth, $NewHeight, $iWidth, $iHeight))
        {
            // copy file
            if(imagejpeg($NewCanves,$DestImage,$Quality))
            {
                imagedestroy($NewCanves);
                return true;
            }
        }
    }
}

$r = new ResizeImages();
$r->start();
?>
