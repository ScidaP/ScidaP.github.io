<?php
    require_once('../config.php');

    $twentyFourHoursAgo = strtotime('-24 hours');

    // Update query
    $updateQuery = "UPDATE email_codigos_verificacion SET expired = 1 WHERE UNIX_TIMESTAMP(date_added) < '$twentyFourHoursAgo' AND confirmed = 0 AND expired = 0";

    // Execute the query
    if (mysqli_query($con, $updateQuery)) {
        echo "Actualización completada";
    } else {
        echo "Error actualizando el email y teléfono";
    }