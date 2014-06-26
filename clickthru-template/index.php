<?php 
  require 'include/buildJSON.php';
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Creative ClickThru</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div id="app">
    <div id="current"></div>
    <div id="next" class="hide"></div>
  </div>
</body>
  <script src="http://code.jquery.com/jquery.min.js"></script>
  <script src="js/vendor/underscore.js"></script>
  <script src="js/vendor/backbone-min.js"></script>
  <script src="js/app.js"></script>
</html>