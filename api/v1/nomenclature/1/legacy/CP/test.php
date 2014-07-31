<?php

$pathArray = explode("/", dirname(__FILE__));
echo $pathArray[count($pathArray)-1];

?>