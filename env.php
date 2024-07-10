<?php

// This file is specific for each environment

$production = 0; // 0 -> localhost | 1 -> production | 2 -> testing
$send_production_mail = 0;

if($production === 1){

    $dbhost = "localhost";
    $dbuser = "earndrop";
    $dbname = "alphapacked";
    $dbpass = "cv6.fCs53dD";

}elseif($production === 0){

    $dbhost = "localhost";
    $dbuser = "root";
    $dbname = "clinica_santalucia";
    $dbpass = "Password";

    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);

}


?>