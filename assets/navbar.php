<?php
    include('header.php');   
?>
<header id="header" class="header-effect-shrink" data-plugin-options="{'stickyEnabled': true, 'stickyEffect': 'shrink', 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyChangeLogo': true, 'stickyStartAt': 30, 'stickyHeaderContainerHeight': 70}">
	<div class="header-body border-top-0">
		<div class="header-container container">
			<div class="header-row">
				<div class="header-column">
					<div class="header-row">
						<div class="header-logo">
							<a href="index.html">
								<img alt="Porto" width="100" height="48" data-sticky-width="82" data-sticky-height="40" src="img/logo-default-slim.png">
							</a>
						</div>
					</div>
				</div>
				<div class="header-column justify-content-end">
					<div class="header-row">
						<div class="header-nav header-nav-line header-nav-top-line header-nav-top-line-animated">
							<div class="header-nav-main header-nav-main-square header-nav-main-effect-2 header-nav-main-sub-effect-1">
								<nav class="collapse">
									<ul class="nav nav-pills" id="mainNav">
										<li class="dropdown">
											<a class="dropdown-item dropdown-toggle" href="<?=$index?>">
												Inicio
											</a>
										</li>
										<li class="dropdown dropdown-mega">
											<a class="dropdown-item dropdown-toggle" href="<?=$doctors?>">
												Doctores
											</a>
										</li>
										<li class="dropdown">
											<a class="dropdown-item dropdown-toggle active" href="<?=$turns?>">
												Sacar turno
											</a>
										</li>
										<li class="dropdown">
											<a class="dropdown-item dropdown-toggle" href="<?=$obras_sociales?>">
												Obras sociales
											</a>
										</li>
										<li class="dropdown">
											<a class="dropdown-item dropdown-toggle" href="<?=$contact?>">
												Contactanos
											</a>
										</li>
									</ul>
								</nav>
							</div>
							<button class="btn header-btn-collapse-nav" data-bs-toggle="collapse" data-bs-target=".header-nav-main nav">
								<i class="fas fa-bars"></i>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</header>

			