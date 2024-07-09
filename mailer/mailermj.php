<?php

$bcc = "no";

// AQUI IRIA BCC = YES -> Por ejemplo turnos nuevos (solo si queremos)
/* if($email_type === "verification_code"){
    $bcc = 'no';
}  */







if ($production === 0 && $send_production_mail === 'no') {
    exit;
}
// Inputs: $subject_email, $customer_email, $customer_name, $html_email, $error_code

require '../vendor/autoload.php';
//require __DIR__  . '/vendor/autoload.php';

ini_set('max_execution_time', 0);

use \Mailjet\Resources;

if ( (!filter_var($customer_email, FILTER_VALIDATE_EMAIL)) OR (strpos($customer_email, '.con') != false) OR (strpos($customer_email, 'gmil.com') != false) OR (strpos($customer_email, 'gmeil.com') != false) OR (strpos($customer_email, 'gmial.com') != false) OR (strpos($customer_email, 'gaiml.com') != false) OR (strpos($customer_email, 'htmail.com') != false) OR (strpos($customer_email, 'gimail.com') != false) OR (strpos($customer_email, 'gotmail.com') != false) OR (strpos($customer_email, 'gmail.com.ar') != false) OR (strpos($customer_email, 'hotmil.com') != false) OR (strpos($customer_email, '.com.com') != false) OR (strpos($customer_email, 'hotamil.com') != false) OR (strpos($customer_email, 'gmail.es') != false) OR (strpos($customer_email, 'hitmail.com') != false) OR (strpos($customer_email, 'gimal.com') != false) OR (strpos($customer_email, 'gmai.com') != false) OR (strpos($customer_email, 'gmal.com') != false) OR (strpos($customer_email, 'hormail.com') != false) OR (strpos($customer_email, 'gamil.com') != false) ) {

    // $customer_email has an error

    echo "============= Invalid email did not pass the filter $customer_email<br><br>";

}else{
    // $customer_email passed the filter

    $apiKey = "55f0ab9f5ffc8d2e0287d23ae0e88d4c";
    $apiSecret = "d42e056b0b66771d0b0f35b65070ef37";
    $mj = new \Mailjet\Client($apiKey,$apiSecret,true,['version' => 'v3.1']); // Clinica Santa Lucia main

    if ($bcc === 'yes'){

        // BCC declared

        $body = [
            'Messages' => [
                [
                    'From' => [
                        'Email' => "$from_email",
                        'Name' => "$from_name"
                    ],
                    'To' => [
                        [
                            'Email' => "$customer_email",
                            'Name' => "$customer_name"
                        ]
                    ],

                    'Bcc' => [
                        [
                            'Email' => "$bcc_email",
                            'Name' => "Clinica Santa Lucía"
                        ]
                    ],

                    'Subject' => "$subject_email",

                    'HTMLPart' => "$html_email",

                    /* 'Attachments' => [
                        [
                            'ContentType' => "application/pdf",
                            'Filename' => "file.pdf",
                            'Base64Content' => "$base64"
                        ]
                    ] */

                ]
            ]
        ];

    }else{
        // No BCC email sent


        $body = [
            'Messages' => [
                [
                    'From' => [
                        'Email' => "$from_email",
                        'Name' => "$from_name"
                    ],
                    'To' => [
                        [
                            'Email' => "$customer_email",
                            'Name' => "$customer_name"
                        ]
                    ],

                    'Subject' => "$subject_email",
                    // 'TextPart' => "Confirmación de pedido informe de dominio.",

                    'HTMLPart' => "$html_email",

                    /* 'Attachments' => [
                        [
                            'ContentType' => "application/pdf",
                            'Filename' => "file.pdf",
                            'Base64Content' => "$base64"
                        ]
                    ] */

                ]
            ]
        ];

    } // end if BCC



    $response = $mj->post(Resources::$Email, ['body' => $body]);

    $body = $response->getBody();

    $status_mailjet = $body['Messages'][0]['Status'];


        if ($status_mailjet === 'success') {
            // All good

            $mailer_status = 'success';

        } else {
            // Send email with error to Clinica

            $error = json_encode($body);

            $body = [
                'Messages' => [
                    [
                        'From' => [
                            'Email' => "$from_email",
                            'Name' => "Earndrop Error"
                        ],
                        'To' => [
                            [
                                'Email' => "$from_email",
                                'Name' => "$from_name"
                            ]
                        ],
                        'Subject' => "Error Mailjet $error_code",
                        'HTMLPart' => "Nombre del cliente: $customer_name<br> Email: $customer_email<br> Asunto: $subject_email<br> Código de error: $error_code"
                    ]
                ]
            ];

            $response = $mj->post(Resources::$Email, ['body' => $body]);

            $mailer_status = 'error';

        }



} // end check email filter