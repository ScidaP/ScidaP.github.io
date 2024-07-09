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
    <link rel="stylesheet" href="../css/newcss/register.css">
    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:400,400i,700,900&display=swap" rel="stylesheet">
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://www.google.com/recaptcha/api.js?render=6LfjuGMpAAAAAGdhDqVAXX5UgiN4hossLY65CuL-&sameSite=None" async defer></script>
</head>
	<body data-plugin-page-transition>
		<div class="body">
			<div role="main" class="main">
				<div class="container">
					<div class="row py-4">
						<div class="col-lg-6">

							<h2 class="font-weight-bold text-8 mt-2 mb-0">Contactanos</h2>
							<p class="mb-4">Sentite libre de preguntar lo que necesites. No te guardes preguntas!</p>

							<form class="contact-form" action="<?=$contact?>" method="POST">
								<?php
									if(isset($message)){
										echo $message;
									}
								?>

								<div class="row">
									<div class="form-group col-lg-6">
										<label class="form-label mb-1 text-2">Nombre completo</label>
										<input type="text" value="" data-msg-required="Por favor ingresa tu nombre." maxlength="100" class="form-control text-3 h-auto py-2" name="name" required>
									</div>
									<div class="form-group col-lg-6">
										<label class="form-label mb-1 text-2">Dirección email</label>
										<input type="email" value="" data-msg-required="Por favor ingresa tu dirección email." data-msg-email="Please enter a valid email address." maxlength="100" class="form-control text-3 h-auto py-2" name="email" required>
									</div>
								</div>
								<div class="row">
									<div class="form-group col">
										<label class="form-label mb-1 text-2">Asunto</label>
										<input type="text" value="" data-msg-required="Por favor ingresa el asunto." maxlength="100" class="form-control text-3 h-auto py-2" name="subject" required>
									</div>
								</div>
								<div class="row">
									<div class="form-group col">
										<label class="form-label mb-1 text-2">Mensaje</label>
										<textarea maxlength="5000" data-msg-required="Por favor ingresa el mensaje." rows="8" class="form-control text-3 h-auto py-2" name="message" required></textarea>
									</div>
								</div>
								<div class="row">
									<div class="form-group col">
										<input type="submit" value="Enviar mensaje" class="btn btn-primary btn-modern" data-loading-text="Loading...">
									</div>
								</div>
							</form>

						</div>
						<div class="col-lg-6">

							<div class="appear-animation" data-appear-animation="fadeIn" data-appear-animation-delay="800">
								<h4 class="mt-2 mb-1">Nuestra <strong>Oficina</strong></h4>
								<ul class="list list-icons list-icons-style-2 mt-2">
									<li><i class="fas fa-map-marker-alt top-6"></i> <strong class="text-dark">Dirección:</strong> Mendoza 831</li>
									<li><i class="fas fa-phone top-6"></i> <strong class="text-dark">Telefono:</strong> +54 (381) 656-7890</li>
									<li><i class="fas fa-envelope top-6"></i> <strong class="text-dark">Email:</strong> <a href="mailto:<?=$company_email?>"><?=$company_email?></a></li>
								</ul>
							</div>

							<div class="appear-animation" data-appear-animation="fadeIn" data-appear-animation-delay="950">
								<h4 class="pt-5">Horarios de <strong>Atención</strong></h4>
								<ul class="list list-icons list-dark mt-2">
									<li><i class="far fa-clock top-6"></i> Lunes - Viernes - 9am to 5pm</li>
									<li><i class="far fa-clock top-6"></i> Sábado - 9am to 2pm</li>
									<li><i class="far fa-clock top-6"></i> Domingo - Cerrado</li>
								</ul>
							</div>

							<h4 class="pt-5">Contactanos <strong>Ahora</strong></h4>
							<p class="lead mb-0 text-4">Nuestro Staff profesional está las 24hs disponible para cualquier inquietud que necesites. No dudes en contactarnos.</p>

						</div>

					</div>

				</div>

			</div>
			<!-- Google Maps - Go to the bottom of the page to change settings and map location. -->
			<gmp-map style="width: 100%;height: 400px;" center="-26.82432746887207,-65.20880126953125" zoom="14" map-id="DEMO_MAP_ID">
      				<gmp-advanced-marker position="-26.82432746887207,-65.20880126953125" title="My location"></gmp-advanced-marker>
    			</gmp-map>

			<footer id="footer" class="footer-texts-more-lighten">
				<div class="container">
					<div class="row py-4 my-5">
						<div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
							<h5 class="text-4 text-color-light mb-3">CONTACT INFO</h5>
							<ul class="list list-unstyled">
								<li class="pb-1 mb-2">
									<span class="d-block font-weight-normal line-height-1 text-color-light">ADDRESS</span> 
									1234 Street Name, City, State, USA
								</li>
								<li class="pb-1 mb-2">
									<span class="d-block font-weight-normal line-height-1 text-color-light">PHONE</span>
									<a href="tel:+1234567890">Toll Free (123) 456-7890</a>
								</li>
								<li class="pb-1 mb-2">
									<span class="d-block font-weight-normal line-height-1 text-color-light">EMAIL</span>
									<a href="mailto:mail@example.com">mail@example.com</a>
								</li>
								<li class="pb-1 mb-2">
									<span class="d-block font-weight-normal line-height-1 text-color-light">WORKING DAYS/HOURS </span>
									Mon - Sun / 9:00AM - 8:00PM
								</li>
							</ul>
							<ul class="social-icons social-icons-clean-with-border social-icons-medium">
								<li class="social-icons-instagram">
									<a href="http://www.instagram.com/" class="no-footer-css" target="_blank" title="Instagram"><i class="fab fa-instagram"></i></a>
								</li>
								<li class="social-icons-twitter mx-2">
									<a href="http://www.twitter.com/" class="no-footer-css" target="_blank" title="Twitter"><i class="fab fa-twitter"></i></a>
								</li>
								<li class="social-icons-facebook">
									<a href="http://www.facebook.com/" class="no-footer-css" target="_blank" title="Facebook"><i class="fab fa-facebook-f"></i></a>
								</li>
							</ul>
						</div>
						<div class="col-md-6 col-lg-2 mb-5 mb-lg-0">
							<h5 class="text-4 text-color-light mb-3">USEFUL LINKS</h5>
							<ul class="list list-unstyled mb-0">
								<li class="mb-0"><a href="contact-us-1.html">Help Center</a></li>
								<li class="mb-0"><a href="about-us.html">About Us</a></li>
								<li class="mb-0"><a href="contact-us.html">Contact Us</a></li>
								<li class="mb-0"><a href="page-careers.html">Careers</a></li>
								<li class="mb-0"><a href="blog-grid-4-columns.html">Blog</a></li>
								<li class="mb-0"><a href="#">Our Location</a></li>
								<li class="mb-0"><a href="#">Privacy Policy</a></li>
								<li class="mb-0"><a href="sitemap.html">Sitemap</a></li>
							</ul>
						</div>
						<div class="col-md-6 col-lg-4 mb-5 mb-md-0">
							<h5 class="text-4 text-color-light mb-3">RECENT NEWS</h5>
							<article class="mb-3">
								<a href="blog-post.html" class="text-color-light text-3-5">Why should I buy a Web Template?</a>
								<p class="line-height-2 mb-0"><a href="#">Nov 25, 2020</a> in <a href="#">Design,</a> <a href="#">Coding</a></p>
							</article>
							<article class="mb-3">
								<a href="blog-post.html" class="text-color-light text-3-5">Creating Amazing Website with Porto</a>
								<p class="line-height-2 mb-0"><a href="#">Nov 25, 2020</a> in <a href="#">Design,</a> <a href="#">Coding</a></p>
							</article>
							<article>
								<a href="blog-post.html" class="text-color-light text-3-5">Best Practices for Top UI Design</a>
								<p class="line-height-2 mb-0"><a href="#">Nov 25, 2020</a> in <a href="#">Design,</a> <a href="#">Coding</a></p>
							</article>
						</div>
						<div class="col-md-6 col-lg-3">
							<h5 class="text-4 text-color-light mb-3">SUBSCRIBE NEWSLETTER</h5>
							<p class="mb-2">Get all the latest information on events, sales and offers. Sign up for newsletter:</p>
							<div class="alert alert-success d-none" id="newsletterSuccess">
								<strong>Success!</strong> You've been added to our email list.
							</div>
							<div class="alert alert-danger d-none" id="newsletterError"></div>
							<form id="newsletterForm" class="form-style-5 opacity-10" action="php/newsletter-subscribe.php" method="POST">
								<div class="row">
									<div class="form-group col">
										<input class="form-control" placeholder="Email Address" name="newsletterEmail" id="newsletterEmail" type="text" />
									</div>
								</div>
								<div class="row">
									<div class="form-group col">
										<button class="btn btn-primary btn-rounded btn-px-4 btn-py-2 font-weight-bold" type="submit">SUBSCRIBE</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
				<div class="container">
					<div class="footer-copyright footer-copyright-style-2 pt-4 pb-5">
						<div class="row">
							<div class="col-12 text-center">
								<p class="mb-0">Porto Template © 2023. All Rights Reserved</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
		</div>

		<!-- Theme Base, Components and Settings -->
		<script src="../js/theme.js"></script>


		<!-- Theme Initialization Files -->
		<script src="../js/theme.init.js"></script>

		<script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCnPCPi1cKThb5ekvXqkQOv7l6ovUpyb7w&callback=console.debug&libraries=maps,marker&v=beta">
    	</script>

		<script>

			/*
			Map Settings

				Find the Latitude and Longitude of your address:
					- https://www.latlong.net/
					- http://www.findlatitudeandlongitude.com/find-address-from-latitude-and-longitude/

			*/
			function initializeGoogleMaps() {
				// Map Markers
				var mapMarkers = [{
					address: "New York, NY 10017",
					html: "<strong>New York Office</strong><br>New York, NY 10017",
					icon: {
						image: "img/pin.png",
						iconsize: [26, 46],
						iconanchor: [12, 46]
					},
					popup: true
				}];

				// Map Initial Location
				var initLatitude = 40.75198;
				var initLongitude = -73.96978;

				// Map Extended Settings
				var mapSettings = {
					controls: {
						draggable: (($.browser.mobile) ? false : true),
						panControl: true,
						zoomControl: true,
						mapTypeControl: true,
						scaleControl: true,
						streetViewControl: true,
						overviewMapControl: true
					},
					scrollwheel: false,
					markers: mapMarkers,
					latitude: initLatitude,
					longitude: initLongitude,
					zoom: 11
				};

				var map = $('#googlemaps').gMap(mapSettings);
			}

			// Initialize Google Maps when element enter on browser view
			theme.fn.intObs( '.google-map', 'initializeGoogleMaps()', {} );

			// Map text-center At
			var mapCenterAt = function(options, e) {
				e.preventDefault();
				$('#googlemaps').gMap("centerAt", options);
			}

		</script>

	</body>
</html>
