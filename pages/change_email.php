<?php
    require_once('../config.php');
?>
<!DOCTYPE html>
<html>
<head>
    <?php
        include('../assets/navbar.php');
    ?>
    <script src="../js/newjs/turns.js"></script>
    <link rel="stylesheet" href="../css/newcss/turns.css">
    <link rel="stylesheet" href="../css/newcss/change_email.css">
    <link rel="stylesheet" href="../css/newcss/register.css">
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
</head>
<body>
    <section class="turns_section_big">
            
        <?php
            //Import PHPMailer classes into the global namespace
            //These must be at the top of your script, not inside a function
            use PHPMailer\PHPMailer\PHPMailer;
            use PHPMailer\PHPMailer\SMTP;
            use PHPMailer\PHPMailer\Exception;

            //Load Composer's autoloader
            require '../vendor/autoload.php';


        if(isset($_GET["change-email"]) && isset($_GET["string"])){
            $user_id_string = $_GET["string"];
            $twentyFourHoursAgo = strtotime('-24 hours');

            $query = "SELECT * FROM usuarios WHERE id_string = '$user_id_string'";
            $result = mysqli_query($con, $query); 

            if (mysqli_num_rows($result) > 0) {
                $userRow = mysqli_fetch_assoc($result);

                // EMAIL Y HIDDEN EMAIL
                $emailUsuario = $userRow['email'];
                list($username, $domain) = explode('@', $emailUsuario);
                $obfuscatedUsername = substr($username, 0, 2) . str_repeat('*', max(strlen($username) - 2, 0));
                $obfuscatedDomain = substr($domain, 0, 2) . str_repeat('*', max(strlen($domain) - 2, 0));
                $hiddenEmailAddress = $obfuscatedUsername . '@' . $obfuscatedDomain;

                // CHECK IF THERE ARE ANY PENDING EMAIL VERIFICATIONS 
                $query = "SELECT * FROM email_codigos_verificacion WHERE id_string_user = '$user_id_string' AND confirmed = 0 AND expired = 0 AND UNIX_TIMESTAMP(date_added) > '$twentyFourHoursAgo'";
                $result = mysqli_query($con, $query); 

                if (mysqli_num_rows($result) > 0) {
                    $message = "<p style='margin-bottom:0px;text-align:center'>Ya te hemos enviado un código de verificación en las ultimas 24hs. Verificá tu bandeja de entrada. <span class='text-span-25'><strong data-tippy-content='Recordá ver la bandeja de Spam, o contactanos a " . $company_email . "' class='tippy' tabindex='0'> <img style='width: 20px; margin-top: -2px; margin-left: 1px;' src='../img/images_new/general_images/info.png'> </strong></span></p>";
                    $show_inputs = 1;
                }else{
                    // Verification Code
                    $verificationCode = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 12);

                    $subject_email = "Código de verificación para Clinica Santa Lucía";
                    $email_user = $emailUsuario;
                    $customer_email = $emailUsuario;
                    $customer_name = $emailUsuario;
                    $error_code = "yuCi8s90coO";
                    $html_email = "Tu código de verificación es: $verificationCode";
                    $email_type = "verification_code";
                    $message = "<p style='margin-bottom:0px;text-align:center'>Te hemos enviado un código de verificación a tu dirección email (" . $hiddenEmailAddress . ").</p>";

                    include $mailer;

                    $show_inputs = 1;
                    

                    // INSERT VERIFICATION CODE TO DATABASE
                    $insertQuery = "INSERT INTO email_codigos_verificacion (id_string, id_string_user) VALUES ('$verificationCode', '$user_id_string')";
                    $insertResult = mysqli_query($con, $insertQuery);
                }


            }
        }else if(isset($_POST['verification_code']) && isset($_POST['string']) && isset($_POST['new_email'])){
            
            $user_id_string = $_POST["string"];
            $verification_code = $_POST["verification_code"];
            $new_email = $_POST["new_email"];
            $message = $_POST["message"];

            $query = "SELECT * FROM email_codigos_verificacion WHERE id_string_user = '$user_id_string' AND id_string = '$verification_code' AND confirmed = 0 AND expired = 0";
            $result = mysqli_query($con, $query); 

            if (mysqli_num_rows($result) > 0) {
                // Update query
                $updateQueryVerificationCode = "UPDATE email_codigos_verificacion 
                SET confirmed = 1 WHERE id_string_user = '$user_id_string' AND id_string = '$verification_code' AND confirmed = 0";

                $updateQueryUser = "UPDATE usuarios 
                SET email = '$new_email' WHERE id_string = '$user_id_string'";

                // Execute the query
                if (mysqli_query($con, $updateQueryVerificationCode) && mysqli_query($con, $updateQueryUser)) {
                    $message = "<p style='color:green;margin-bottom:0px;text-align:center'>Tu dirección email ha sido actualizada. Te notificaremos de tus próximos turnos a " . $new_email . "</p>";
                    $show_inputs = 0;
                } else {
                    $message = "<p style='color:red;margin-bottom:0px;text-align:center'>No se ha podido actualizar tu dirección email. <span class='text-span-25'><strong data-tippy-content='Contactanos a " . $company_email . "' con el código de error #3MISPOCI class='tippy' tabindex='0'> <img style='width: 20px; margin-top: -2px; margin-left: 1px;' src='../img/images_new/general_images/info.png'> </strong></span></p>";
                    $show_inputs = 0;
                }
            }else{
                $error = "<p style='margin-bottom:0px;text-align:center;color:red'>Código de verificación incorrecto</p>";
                $show_inputs = 1;
            }
            ?>
            <?php
        }

        // Close the database connection
        mysqli_close($con);
        ?>
                    <div class="card">
                    <?=$message?>
                    <?php
                        if($show_inputs == 1){
                    ?>
                    <form action="<?=$change_email?>" id="frmRegister" method="post" class="needs-validation form-register">
                        <div class="row">
                            <div class="form-group col">
                                <div>
                                    <input style="width:100%" type="email" value="" id="" placeholder="Nueva dirección email" name="new_email" class="verificacion_input form-control">
                                </div>
                                <div>
                                    <input style="width:100%" type="text" value="" placeholder="Código de verificación" id="" name="verification_code" class="verificacion_input form-control">
                                    
                                </div>
                                <?php echo isset($error) ? $error : ''; ?>

                                <input type="hidden" value="<?=$user_id_string?>" id="" name="string" class="verificacion_input form-control form-control-lg text-4">
                                <input type="hidden" value="<?=$message?>" id="" name="message" class="verificacion_input form-control form-control-lg text-4">
                                <button style="width:100%" type="submit" class="verificacion_button btn btn-dark btn-modern text-uppercase rounded-0 font-weight-bold text-3 py-3" data-loading-text="Loading..."><i class="fa-solid fa-check"></i></button>

                            </div>
                        </div>
                    </form>
                    <?php
                        }
                    ?>
                
            </div>
    </section>



</body>
</html>

<!--Tippy JS Settings Start-->
<script src="../js/popperjs1161.js"></script>
<script src="../js/tippyjs435.js"></script>

<script>
    tippy('.tippy', {             // Use class or id
        animation: 'scale',         // See docs for more options (there are a few nice ones 😉)
        duration: 200,              // Duration for ToolTip Animation
        arrow: true,                // Add ToolTip Arrow
        delay: [0, 50],             // First # = delay in, second # = delay out
        arrowType: 'sharp',         // Sharp or 'round' or remove for none
        theme: 'light',             // Dark is the default
        maxWidth: 220,              // Max width in pixels for the tooltip
    })
</script>
<!--Tippy JS Settings End-->