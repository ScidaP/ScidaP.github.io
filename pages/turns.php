<?php
    require_once('../config.php');
?>
<!DOCTYPE html>
<html>
<head>
    <?php
        include('../assets/navbar.php');
        setcookie('myCookie', 'myValue', [
            'expires' => time() + 3600, // Adjust the expiration time as needed
            'path' => '/',
            'domain' => 'localhost', // Specify your domain
            'secure' => true,
            'httponly' => true,
            'samesite' => 'None',
        ]);
    ?>
    <script src="../js/newjs/turns.js"></script>
    <link rel="stylesheet" href="../css/newcss/turns.css">
    <link rel="stylesheet" href="../css/newcss/register.css">
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    
    <!-- RECAPTCHA -->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
    <script>
        function onSubmit(token) {
            document.getElementById("demo-form").submit();
        }
    </script>
	<!-- RECAPTCHA END -->


</head>
<body>
    <section class="turns_section_big">
            
        <?php
        


        //..... POST START .....//
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Check if the DNI is provided in the POST request
            if (isset($_POST['dni'])) {
                var_dump($_POST);
                function post_captcha($user_response) {
                    $fields_string = '';
                    $fields = array(
                        'secret' => '6Lfy9WspAAAAAOwNq9Xs95o8RKGOh59ZGhT3uLCZ',
                        'response' => $user_response
                    );
                    foreach($fields as $key=>$value)
                        $fields_string .= $key . '=' . $value . '&';
                    $fields_string = rtrim($fields_string, '&');
        
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
                    curl_setopt($ch, CURLOPT_POST, count($fields));
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields_string);
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, True);
        
                    $result = curl_exec($ch);
                    curl_close($ch);
        
                    return json_decode($result, true);
                }
        
                // Call the function post_captcha
                $res = post_captcha($_POST['g-recaptcha-response']);
        
                if (!$res['success']) {
                    // Recaptcha was NOT successful
                    $error = "<span style='color:red;'>Validación incorrecta.</span> Refresca la página <a class='text-span-12' href='$login'>aquí</a>.";
        
                }else{
                        // SUCCESSFUL RECAPTCHA
                    $dniValue = $_POST['dni'];

                    // Check if the DNI exists in the "usuarios" table
                    $query = "SELECT * FROM usuarios WHERE dni = '$dniValue'";
                    $result = mysqli_query($con, $query);

                    if (mysqli_num_rows($result) > 0) {
                        // User found, check if we have data
                        $userRow = mysqli_fetch_assoc($result);
                        $idStringUsuario = $userRow['id_string'];

                        // Check if numero_telefonico is empty
                        if (empty($userRow['email'])) {
                            // At least one of the attributes is empty
                            $addInfoMessage = "<button class='shift btn btn-primary mb-2' id='button-show-form' data-bs-toggle='modal' data-bs-target='#formModal' onclick='showForm()'>Recibir recordatorios</button>";
                        }else{
                            $emailAddress = $userRow['email'];
                            list($username, $domain) = explode('@', $emailAddress);
                            $obfuscatedUsername = substr($username, 0, 2) . str_repeat('*', max(strlen($username) - 2, 0));
                            $obfuscatedDomain = substr($domain, 0, 2) . str_repeat('*', max(strlen($domain) - 2, 0));
                            $hiddenEmailAddress = $obfuscatedUsername . '@' . $obfuscatedDomain;

                            $addInfoMessage = "<p style='text-align:center'>Te enviaremos un recordatorio del turno a tu dirección email (" . $hiddenEmailAddress . ").<br> <a class='cambiar_numero_onclick' href='" . $rootdomain . "/pages/" . $change_email . "?change-email=yes&string=" . $idStringUsuario . "'>Cambiar dirección email</a></p>";
                        }
                    } else {
                        // User not found, insert to database
                    
                        $idStringUsuario = substr(str_shuffle("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"), 0, 12);
                        // Insert into the "turnos" table
                        $insertQuery = "INSERT INTO usuarios (id_string, dni) VALUES ('$idStringUsuario', '$dniValue')";
                        $insertResult = mysqli_query($con, $insertQuery);
                    
                        // Since a new user is inserted, set $addInfo to 1 if needed
                        // (e.g., if additional information is required for new users)
                        $addInfoMessage = "<button class='shift btn btn-primary mb-2' id='button-show-form' data-bs-toggle='modal' data-bs-target='#formModal' onclick='showForm()'>Recibir recordatorios</button>";
                    }             

                    // PROCEED WITH RESERVATION LOGIC    
                    // Get the doctor's id_string from the POST data
                    $idStringDoctor = isset($_POST['id_string_doctor']) ? $_POST['id_string_doctor'] : '';

                    // Get the values from the POST data
                    $shiftDay = isset($_POST['shiftDay']) ? $_POST['shiftDay'] : '';
                    $shiftNumber = isset($_POST['shiftNumber']) ? $_POST['shiftNumber'] : '';
                
                    // Verify no other users reserved that turn before 
                    $query = "SELECT * FROM doctores WHERE id_string = '$idStringDoctor'";
                    $result = mysqli_query($con, $query);

                    // Check if the query was successful
                    $result = mysqli_fetch_assoc($result);

                    if ($result != NULL) {
                        // Access the data using array keys
                        $doctorNameNoSpaces = $result['nombre'] . $result['apellido']; 

                        $query = "SELECT * FROM  `turnos_$doctorNameNoSpaces` WHERE dia = '$shiftDay' AND turno = '$shiftNumber'";
                        $result = mysqli_query($con, $query);

                        // Check if the query was successful

                        if (mysqli_fetch_assoc($result) != NULL) {
                            echo "Error: Este turno ya fue reservado";
                        } else {
                            // Generate a random 12-character alphanumeric string for id_string
                            $idString = idStringGenerator();
                        
                            // Insert into the "turnos" table
                            $insertQuery = "INSERT INTO `turnos_$doctorNameNoSpaces` (id_string, id_string_usuario, id_string_doctor, dia, turno) VALUES ('$idString', '$idStringUsuario', '$idStringDoctor', '$shiftDay', '$shiftNumber')";
                            $insertResult = mysqli_query($con, $insertQuery);
                        
                            if ($insertResult) {
                                ?>
                                    <div class="card">
                                        <div id="card-checkmark" class="card-little">
                                        <i class="checkmark">✓</i>
                                    </div>
                                    <h1 id="success_h1" class="success_h1">Turno reservado</h1> 
                                    <?php
                                        echo "$addInfoMessage";
                                    ?>
                                        <form action="<?=$turns?>" id="frmRegister" method="post" style="display: none;" class="needs-validation form-register">
                                            <div class="row">
                                                <div class="form-group col">
                                                <input type="hidden" value="<?=$idStringUsuario?>" name="idString" class="form-control form-control-lg text-4" required="">
                                                    <!-- <label class="form-label text-color-dark text-3">Teléfono</label>
                                                    <input type="text" value="" id="phone" name="phone" class="form-control form-control-lg text-4" > -->
                                                    <label for="email" class="form-label text-color-dark text-3">Dirección email</label>
                                                    <input type="email" value="" id="phone" name="email" class="form-control form-control-lg text-4" >
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="form-group col">
                                                    <button type="submit" class="btn btn-dark btn-modern w-100 text-uppercase rounded-0 font-weight-bold text-3 py-3" data-loading-text="Loading...">Notificarme</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                <?php
                            } else {
                                echo "Error: La reserva falló";
                            }
                        }

                    } else {
                        // Handle query failure
                        echo "Error: Doctor no encontrado";
                    }
                }
            } else if(isset($_POST['idString'])) {
                $idString = $_POST['idString'];
        
                // Check if the id_string exists in the "usuarios" table
                $query = "SELECT * FROM usuarios WHERE id_string = '$idString'";
                $result = mysqli_query($con, $query);

                if (mysqli_num_rows($result) > 0) {
                    $email = $_POST['email'];
                    $phone = $_POST['phone'];

                    // Update query
                    $updateQuery = "UPDATE usuarios SET email = '$email', telefono = '$phone' WHERE id_string = '$idString'";

                    // Execute the query
                    if (mysqli_query($con, $updateQuery)) {
                        ?>
                        <div class="card">
                            <div id="card-checkmark" class="card-little">
                                <i class="checkmark">✓</i>
                            </div>
                            <h1 id="success_h1" class="success_h1">Verificar ema</h1> 
                        </div>
                        <?php
                    } else {
                        echo "Error actualizando el email y teléfono";
                    }
                }
            }
            //..... POST END .....//
        } else {
        
        // Function to get the day of the week in Spanish from the database
        function getSpanishDayOfWeek($dayID, $con) {
            $query = "SELECT dia FROM dias WHERE id = $dayID";
            $result = mysqli_query($con, $query);
            $row = mysqli_fetch_assoc($result);
            return $row['dia'];
        }

        // Get the value of the "doctor" query string parameter
        $doctorIDString = isset($_GET['doctor']) ? $_GET['doctor'] : '';


        //-------------------------------------------------> GET the DOCTOR INFO
        // GET doctor data
        $doctorQuery = "SELECT * FROM doctores WHERE id_string = '$doctorIDString'";
        $doctorResult = mysqli_query($con, $doctorQuery);
        $doctorRow = mysqli_fetch_assoc($doctorResult);

        if (!$doctorRow) {
            // Handle the case when the doctor is not found
            echo "Doctor not found.";
            exit;
        }

        // STATE DOCTOR'S VARIABLES
        $doctorID = $doctorRow['id'];
        $doctorIMG = $doctorRow['nombre'] . $doctorRow['apellido'];
        $doctorName = $doctorRow['nombre'] . " " . $doctorRow['apellido']; 
        $doctorNameNoSpaces = $doctorRow['nombre'] . $doctorRow['apellido']; 
        
        // Get doctor's obras sociales
        $obraQuery = "SELECT * FROM doctores_obras_sociales WHERE doctor_id_string = '$doctorIDString' AND active = 1";
        $obraResult = mysqli_query($con, $obraQuery);
        $obraResultTwo = mysqli_query($con, $obraQuery);

        // If he receives obras sociales, then do this:
        if (mysqli_fetch_assoc($obraResultTwo) != NULL) {
            // Fetch all rows
            $obraNames = array();
            $obra_social_text = "Obras sociales: ";
            while ($row = mysqli_fetch_assoc($obraResult)) {
                $obra_social_id_string = $row['obra_social_id_string'];
                $obra_social_query = "SELECT nombre FROM obras_sociales WHERE id_string = '$obra_social_id_string' and activo = 1";
                $obra_social_result = mysqli_query($con, $obra_social_query);
        
                // Fetch the obra social name
                $obra_social_name = mysqli_fetch_assoc($obra_social_result)['nombre'];
        
                // Add the name to the array
                $obraNames[] = $obra_social_name;
            }
        
            // Combine the names into a comma-separated string
            $obra_social_text = $obra_social_text . implode(', ', $obraNames);
        } else {
            // Handle query failure
            $obra_social_text = "No recibe obra social";
        }
        

        //-------------------------------------------------> END DOCTOR INFO
        //-------------------------------------------------> START TIME INFO
        date_default_timezone_set('America/Argentina/Buenos_Aires');

        // GET TODAY's DATE IN SPANISH
        $dayOfWeekID = date('N'); // N returns 1 for Monday, 2 for Tuesday, etc.
        $dayOfWeek = getSpanishDayOfWeek($dayOfWeekID, $con);

        $currentTimestamp = time();
        //-------------------------------------------------> END TIME INFO
        ?>

        <div class="thumb-info thumb-info-side-image thumb-info-no-zoom">
            <div class="thumb-info-side-image-wrapper">
                <img src="../img/images_new/doctors/<?=$doctorIMG?>.jpg" class="img-fluid" alt="" style="width: 200px;">
            </div>
            <div class="thumb-info-caption">
                <div class="thumb-info-caption-text text-3">
                    <h5 class="text-uppercase mb-2"><?=$doctorName?></h5>
                    <p class="py-0 pe-5 line-height-8"><?=$obra_social_text?></p>
                </div>
            </div>
        </div>

        <?php
        function displayShifts($startTime, $endTime, $duration, $currentTimestamp, $shiftID, $currentDate, $dayOfWeek, $doctorNameNoSpaces, $doctorIDString, $con, $availableTurns, $i, $startSecondTime, $endSecondTime) {
            while ($startTime < $endTime) {
                $specificTurnQuery = "SELECT * FROM `turnos_$doctorNameNoSpaces` WHERE id_string_doctor = '$doctorIDString' AND dia = '$currentDate' AND turno = '$shiftID'";
                $specificTurnResult = mysqli_query($con, $specificTurnQuery);
        
                if (mysqli_num_rows($specificTurnResult) == 0) {
                    if(($startTime > $currentTimestamp && $i == 0) || $i > 0){
                        
                        $turnTime = date('H:i', $startTime);
                        if($availableTurns == 0){
                            echo "<div class='container_horarios'><h2 class='title_turns_day'>$dayOfWeek  $currentDate</h2>";
                        }
                        echo "<button class='shift btn btn-primary mb-2' id='shift_$shiftID' data-bs-toggle='modal' data-bs-target='#formModal' onclick='openModal($shiftID, \"$turnTime\", \"$currentDate\")'>" . date('H:i', $startTime) . "</button>";
        
                        $availableTurns = 1;
                    }
                }
                $startTime = strtotime("+$duration minutes", $startTime);
        
                // Increment shift ID
                $shiftID++;
            }
            while ($startSecondTime < $endSecondTime) {
                $specificTurnQuery = "SELECT * FROM `turnos_$doctorNameNoSpaces` WHERE id_string_doctor = '$doctorIDString' AND dia = '$currentDate' AND turno = '$shiftID'";
                $specificTurnResult = mysqli_query($con, $specificTurnQuery);
        
                if (mysqli_num_rows($specificTurnResult) == 0) {
                    if(($startSecondTime > $currentTimestamp && $i == 0) || $i > 0){
                        $turnTime = date('H:i', $startSecondTime);
                        if($availableTurns == 0){
                            echo "<div class='container_horarios'><h2 class='title_turns_day'>$dayOfWeek  $currentDate</h2>";
                        }
                        echo "<button class='shift btn btn-primary mb-2' id='shift_$shiftID' data-bs-toggle='modal' data-bs-target='#formModal' onclick='openModal($shiftID, \"$turnTime\", \"$currentDate\")'>" . date('H:i', $startSecondTime) . "</button>";
        
                        $availableTurns = 1;
                    }
                }
                $startSecondTime = strtotime("+$duration minutes", $startSecondTime);
        
                // Increment shift ID
                $shiftID++;
            }

            if($availableTurns == 1){
                echo "</div>";
            }
        }

        // Display shifts for the next 30 days
        for ($i = 0; $i < 30; $i++) {
            $currentDate = date('d-m-Y', strtotime("+$i days"));
            $dayOfWeekID = date('N', strtotime("+$i days"));
            $dayOfWeek = getSpanishDayOfWeek($dayOfWeekID, $con);

            $disabledDayQuery = "SELECT * FROM dias_desactivados WHERE dia_numero = '$currentDate'";
            $disabledDayResult = mysqli_query($con, $disabledDayQuery);

            if(mysqli_num_rows($disabledDayResult) === 0){  

                // Check if the doctor has availability on the specific date
                $specificDateQuery = "SELECT * FROM horarios_numero_$doctorIMG WHERE dia_numero = '$currentDate' AND active = 1";
                $specificDateResult = mysqli_query($con, $specificDateQuery);

                if(mysqli_num_rows($specificDateResult) === 0){
                    $specificDateQuery = "SELECT * FROM horarios_$doctorIMG WHERE dia_semana = '$dayOfWeek' AND active = 1";
                    $specificDateResult = mysqli_query($con, $specificDateQuery);
                }
                

                if (mysqli_num_rows($specificDateResult) > 0) {
                    $shiftID = 0; // Initialize shift ID
                    $availableTurns = 0;

                    while ($row = mysqli_fetch_assoc($specificDateResult)) {
                        $startTime = strtotime($row['inicio_horario']);
                        $endTime = strtotime($row['final_horario']);
                        $startSecondTime = strtotime($row['inicio_segundo_horario']);
                        $endSecondTime = strtotime($row['final_segundo_horario']);
                        $duration = isset($row['duracion']) ? $row['duracion'] : 0; 
                        
                        // First set of shifts
                        displayShifts($startTime, $endTime, $duration, $currentTimestamp, $shiftID, $currentDate, $dayOfWeek, $doctorNameNoSpaces, $doctorIDString, $con, $availableTurns, $i, $startSecondTime, $endSecondTime);
                        
                        if($availableTurns == 1){
                            echo "</div>";
                        }
                    }
                }
            }

            // Reset result set pointers
            mysqli_data_seek($specificDateResult, 0);
        }

        // Close the database connection
        mysqli_close($con);
        ?>
    </section>

<div class="col-sm-9">
    <div class="modal fade" id="formModal" tabindex="-1" role="dialog" aria-labelledby="formModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="formModalLabel"></h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="demo-form" method="post" action="turns.php" novalidate="novalidate">
                        <div class="form-group row align-items-center">
                            <label class="col-sm-3 text-start text-sm-end mb-0">Horario</label>
                            <div class="col-sm-9">
                                <input type="text" name="" id="shiftTime" class="form-control" readonly/>
                                <input type="hidden" name="shiftNumber" id="shiftNumber" readonly/>
                                <input type="hidden" name="id_string_doctor" id="id_string_doctor_input" value="<?=$doctorIDString?>" readonly/>
                                <input type="hidden" name="shiftDay" id="shiftDay" readonly/>
                            </div>
                        </div>
                        <div class="form-group row align-items-center last_input">
                            <label class="col-sm-3 text-start text-sm-end mb-0">DNI</label>
                            <div class="col-sm-9">
                                <input type="text" name="dni" id="" class="form-control" required/>
                            </div>
                        </div>
                        <!-- <div id="invisibleRecaptcha" class="g-recaptcha" data-sitekey="6LfjuGMpAAAAAGdhDqVAXX5UgiN4hossLY65CuL-" data-callback="onInvisibleRecaptchaSubmit" data-size="invisible" name="g-recaptcha-response"></div> -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancelar</button>
                            <button class="btn btn-primary btn-primary-send g-recaptcha" data-sitekey="6Lfy9WspAAAAAMi-xqTeHaK5XHeIczH5U-l504Ao" data-callback="onSubmit">Reservar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>


<script>
    function validateRecaptcha() {
        // Trigger reCAPTCHA challenge programmatically
        grecaptcha.execute();
        return false; // Prevent form submission
    }

    function onInvisibleRecaptchaSubmit() {
        // reCAPTCHA challenge completed, submit the form
        console.log('Form submitted after reCAPTCHA challenge.');
        document.getElementById('submitBtn').click();
    }

</script>
<?php
    }
    include('../assets/footer.php');
?>
</body>
</html>