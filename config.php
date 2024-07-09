<?php
include "env.php";

ob_start();

// =========================== VARIABLES FOR LINKS ===========================
if ($production === 0) {
    // Localhost environment

    $rootdomain = "http://localhost/clinica_santalucia2";
    /* $rootdomain = "http://localhost:8888/earndrop"; */
    $index = "index.php";
    $turns = "turns.php";
    $profile = "profile.php";
    $contact = "contact_us.php";
    $change_email = "change_email.php";
    $dashboard = "dashboard.php";
    $doctors = "doctores.php";
    $obras_sociales = "obras_sociales.php";
    $login = "login.php";

} elseif ($production === 1) {
    // Production 

    $rootdomain = "https://clinica-santalucia.tuc";

    $index = "";
    $dashboard = "dashboard";   
}
// =========================== VARIABLES FOR LINKS END ===========================



// =========================== MYSQL CONNECTION ===========================
$con = mysqli_connect("$dbhost","$dbuser","$dbpass");
mysqli_select_db($con, $dbname);
if (!$con)
{
    die('Could not connect to database !<br>' . mysql_error());
}

mysqli_set_charset($con, 'utf8');
// =========================== MYSQL CONNECTION END ===========================




// =========================== CHECK USER SESSION ===========================
$user_logged = 'no';
$user_admin_priviliges = "no";

if (isset($_COOKIE["loginsession_clinicasantalucia"])) {
    $session = unserialize(stripslashes(base64_decode($_COOKIE["loginsession_clinicasantalucia"])));

    $doctor_id_string = mysqli_real_escape_string($con,$session['doctor_id_string']);
    $id_string_session = mysqli_real_escape_string($con,$session['session_id']);

    $query = mysqli_query($con,"SELECT id, admin FROM doctores WHERE id_string = '$doctor_id_string'");
    $result = mysqli_fetch_array($query);
    $id_doctor = (int)$result['id'];
    $user_admin_priviliges = $result['admin'];

    $sql = mysqli_query($con,"SELECT * FROM doctores_sessions WHERE doctor_id = '$id_doctor' AND id_string = '$id_string_session' and status = 'active';");

    if (mysqli_num_rows($sql) === 1) {
        $user_logged = 'yes';
    }else{ 
        $user_logged = 'no';
    }
}else{ 
    $user_logged = 'no';
}

// MAILER VARIABLES
$from_email = "clinicafac@gmail.com";
$from_name = "Clínica Santa Lucía";
$company_email = "clinicafac@gmail.com";
$mailer = '../mailer/mailermj.php';

function idStringGenerator() {
    $idStringGenerated = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 12);
    return $idStringGenerated;
}

?>