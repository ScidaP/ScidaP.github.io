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

<?php

	// Get doctors
	$query = "SELECT * FROM doctores";
	$result = mysqli_query($con, $query);

	$forNumber = mysqli_num_rows($result);

	$insertCards = "";
	for ($i=0; $i < $forNumber; $i++) { 
		$instagramOrFacebookInsert = "";

		$doctorsRow = mysqli_fetch_assoc($result);

        $idStringDoctor = $doctorsRow['id_string'];
		$especialidad = $doctorsRow['especialidad'];
		$nombreCompleto = $doctorsRow['nombre'] . " " . $doctorsRow['apellido'];
		$imageName = strtolower($doctorsRow['nombre'] . $doctorsRow['apellido'] . ".jpg");

		// Redes
		$instagram = $doctorsRow['instagram'];
		$facebook = $doctorsRow['facebook'];

		if($instagram || $facebook){
			if($instagram && $facebook){
				$instagramOrFacebookInsert = "
					<span class='thumb-info-social-icons mb-4'>
						<a href='http://www.instagram.com/" . $instagram . "'><i class='fab fa-instagram'></i><span>Instagram</span></a>
						<a href='http://www.facebook.com/" . $facebook . "'><i class='fab fa-facebook-f'></i><span>Facebook</span></a>
					</span>";
			}else if($instagram){
				$instagramOrFacebookInsert = "
					<span class='thumb-info-social-icons mb-4'>
						<a href='http://www.instagram.com/" . $instagram . "'><i class='fab fa-instagram'></i><span>Instagram</span></a>
					</span>";
			}else if($facebook){
				$instagramOrFacebookInsert = "
					<span class='thumb-info-social-icons mb-4'>
						<a href='http://www.facebook.com/" . $facebook . "'><i class='fab fa-facebook-f'></i><span>Facebook</span></a>
					</span>";
			}
			
		}

		$insertCards = $insertCards . "
		<div class='col-12 col-sm-6 col-lg-3 isotope-item " . $especialidad . "'>
			<span class='thumb-info thumb-info-hide-wrapper-bg mb-4'>
				<span class='thumb-info-wrapper'>
					<a href='" . $profile . "/" . $idStringDoctor . "'>
						<img src='../img/images_new/doctors/" . $imageName . "' class='img-fluid' alt=''>
						<span class='thumb-info-title'>
							<span class='thumb-info-inner'>" . $nombreCompleto . "</span>
							<span class='thumb-info-type'>" . $especialidad . "</span>
						</span>
					</a>
				</span>
				<span class='thumb-info-caption'>
					<span class='thumb-info-caption-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac ligula mi, non suscipitaccumsan.</span>
					" . $instagramOrFacebookInsert . "
					</span>
				</span>
			</div>";			
	}
?>
	<body data-plugin-page-transition>
		<div class="body">
			<div role="main" class="main">
				<section class="page-header page-header-modern page-header-background page-header-background-md overlay overlay-color-dark overlay-show overlay-op-5" style="background-image: url(../img/images_new/banners/banner-doctor.jpg);">
					<div class="container">
						<div class="row">
							<div class="col-md-8 order-2 order-md-1 align-self-center p-static">
								<h1>Nuestro <strong>Staff</strong></h1>
								<span class="sub-title">Nos enorgullece presentarte nuestro equipo.</span>
							</div>
							<div class="col-md-4 order-1 order-md-2 align-self-center">
								<ul class="breadcrumb breadcrumb-light d-block text-md-end">
									<li><a href="<?=$index?>">Inicio</a></li>
									<li class="active">Staff</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				<div class="container py-4">

					<ul class="nav nav-pills sort-source sort-source-style-3 justify-content-center" data-sort-id="team" data-option-key="filter">
						<li class="nav-item active" data-option-value="*"><a class="nav-link text-2-5 text-uppercase active" href="#">Mostrar todos</a></li>
						<li class="nav-item" data-option-value=".leadership"><a class="nav-link text-2-5 text-uppercase" href="#">Leadership</a></li>
						<li class="nav-item" data-option-value=".marketing"><a class="nav-link text-2-5 text-uppercase" href="#">Marketing</a></li>
						<li class="nav-item" data-option-value=".development"><a class="nav-link text-2-5 text-uppercase" href="#">Development</a></li>
						<li class="nav-item" data-option-value=".design"><a class="nav-link text-2-5 text-uppercase" href="#">Design</a></li>
					</ul>

					<div class="sort-destination-loader sort-destination-loader-showing mt-4 pt-2">
						<div class="row team-list sort-destination" data-sort-id="team">
							
							<?php
								echo "$insertCards";
							?>	


						</div>

					</div>

				</div>

			</div>

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
