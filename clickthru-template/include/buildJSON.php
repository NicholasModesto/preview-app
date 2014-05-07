<?php
class Slides{

  public $stack = array();

  // debug function
  public function printStack(){
    print_r($this->stack);
  }

  public function printJSON(){
    return json_encode($this->stack);
  }

  public function writeJSON(){
    $file = 'data/data.txt';
    file_put_contents($file, $this->printJSON());
  }

  public function cleanPath($path){
  // This checks the path to make sure it is not windows pathing
    if( substr_count($path, '\\') != 0 ){
      $path = strtr($path, '\\', '/');
    }
    return $path;
  }

  public function __construct(){
    $this->getImages();
    $this->writeJSON();
  }

  private function getImages(){
    $directory = 'images';
    $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory));
    $it->rewind();
    while($it->valid()) {
      if (!$it->isDot()) {
        if ($it->getBasename() !== ".DS_Store") {
          $id = $it->getBasename("." . $it->getExtension()); 
          
          $src = $this->cleanPath($it->key());
          
          if (substr($id, 0, 1) == "0"){
            $id = substr_replace($id,'',0,1);
          }

          $tmp = array(
              "id" => intval($id),
              "src" => $src
              );
          array_push($this->stack,$tmp);
        }
      }
      
      $it->next();
    }
  }

}

$collection = new Slides;
?>