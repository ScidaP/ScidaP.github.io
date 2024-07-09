<?php
    require_once('../config.php');
	if($user_logged == "yes"){
		/* Header( "Location: $dashboard" ); */
		var_dump("USER LOGGED");
	}
?>
<!DOCTYPE html>
<html>
<head>
    <?php
        include('../assets/navbar.php');
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
            document.getElementById("frmSignIn").submit();
        }
    </script>
	<!-- RECAPTCHA END -->

</head>

<?php
	//..... POST START .....//
	$error = "";
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {
		if (isset($_POST['dni'])) {
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
			$dniToLogIn = $_POST['dni'];
			$password = $_POST['password'];

                $query = mysqli_query($con,"SELECT count(*) as contah FROM doctores where dni = '$dniToLogIn'");
				$result = mysqli_fetch_array($query);
				$conta = (int)$result['contah'];

                if ($conta === 0){
                    // if conta = 1, hay user creado con ese mail
                    $error = "<span style='color:red;'>Credenciales incorrectas. Vuelve a intentarlo.</span>";
                }else{
                    // if conta = 1, SI hay user creado con ese mail. proceed to validate password

                    $query = mysqli_query($con,"SELECT * FROM doctores where dni = '$dniToLogIn'");
                    $result = mysqli_fetch_array($query);
                    $pwhash = $result['contraseña'];
                    $doctor_id = $result['id'];
                    $id_string_doctor = $result['id_string'];
                    $status_user = $result['status'];
                    $date = date("Y-m-d G:i:s");

                    if($production === 1){
                        $ip = $_SERVER["HTTP_CF_CONNECTING_IP"];
                    }


                        if(password_verify($password, $pwhash) && $status_user === 'active'){ // password correct and account active - insert cookie and session

                            $id_string_session = idStringGenerator();
                            $status_session = 'active';

                            // remove all active previous sessions
                            mysqli_query($con,"UPDATE doctores_sessions set status = 'inactive' where doctor_id = $doctor_id");

                            // insert active session
                            $session_sql= "INSERT INTO doctores_sessions (`id_string`, `fecha`, `doctor_id`, `ip`, `status`)
                            VALUES ('".$id_string_session."','".$date."','".$doctor_id."','".$ip."','".$status_session."')";
                            mysqli_query($con,$session_sql);


                            // insert cookie or session
							if(isset($_POST['rememberMe'])){
								if (setcookie("loginsession_clinicasantalucia", base64_encode(serialize(array("session_id" => $id_string_session, "doctor_id_string" => $id_string_doctor))), (time() + 7776000), "/") == true) {
									/* Header( "Location: $dashboard" ); */
									var_dump("COOKIE INSERTADA");
								}
							}else{
								if (setcookie("loginsession_clinicasantalucia", base64_encode(serialize(array("session_id" => $id_string_session, "doctor_id_string" => $id_string_doctor))), 0, "/")) {
									/* Header("Location: $dashboard"); */
									var_dump("COOKIE INSERTADA");
								}
							}


                    }else { // password incorrect
                        $error = "<span style='color:red;'>Credenciales incorrectas. Vuelve a intentarlo.</span>";
                    }
                }
			}
		}
	}
?>
	<body data-plugin-page-transition>

		<div class="body">
			<div role="main" class="main">

				<div class="container py-4">

					<div class="row justify-content-center">
						<div class="col-md-6 col-lg-5 mb-5 mb-lg-0">
							<h2 class="font-weight-bold text-5 mb-0">Iniciar sesión</h2>
							<form action="<?=$login?>" id="frmSignIn" method="post" class="needs-validation">
								<div class="row">
									<div class="form-group col">
										<label class="form-label text-color-dark text-3">DNI <span class="text-color-danger">*</span></label>
										<input type="text" value="" class="form-control form-control-lg text-4" name="dni" required>
									</div>
								</div>
								<div class="row">
									<div class="form-group col">
										<label class="form-label text-color-dark text-3">Contraseña <span class="text-color-danger">*</span></label>
										<input type="password" value="" class="form-control form-control-lg text-4"  name="password" required>
									</div>
								</div>
								<?=$error?>
								<div class="row justify-content-between">
									<div class="form-group col-md-auto">
										<div class="custom-control custom-checkbox">
											<input type="checkbox" class="custom-control-input" name="rememberMe" id="rememberme">
											<label class="form-label custom-control-label cur-pointer text-2" for="rememberme">Recordarme</label>
										</div>
									</div>
									<div class="form-group col-md-auto">
										<a class="text-decoration-none text-color-dark text-color-hover-primary font-weight-semibold text-2" href="#">Olvidaste la contraseña?</a>
									</div>
								</div>
								<div class="row">
									<div class="form-group col">
										<!-- THIS BUTTON CONTAINS THE RECAPTCHA INSERT -->
										<button class="btn btn-dark btn-modern w-100 text-uppercase rounded-0 font-weight-bold text-3 py-3 g-recaptcha" data-sitekey="6Lfy9WspAAAAAMi-xqTeHaK5XHeIczH5U-l504Ao" data-callback="onSubmit">Iniciar</button>
									</div>
								</div>
							</form>
						</div>
						
					</div>

				</div>

			</div>

			<?php
				include('../assets/footer.php');
			?>
		</div>

		<!-- Vendor -->
		<script src="../vendor/plugins/js/plugins.min.js"></script>

		<!-- Theme Base, Components and Settings -->
		<script src="../js/theme.js"></script>

		<!-- Theme Custom -->
		<script src="../js/custom.js"></script>

		<!-- Theme Initialization Files -->
		<script src="../js/theme.init.js"></script>

	</body>
</html>
