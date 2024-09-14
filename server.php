<?php
$config = include('config.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);

$data = file_get_contents('php://input');
$decotedData = json_decode($data, true);



try {
   
    if(is_array($decotedData)) {

        $email = $decotedData['email'];
        $fullname = $decotedData['name'];
        $company = $decotedData['company'];
        $thelepone = $decotedData['thelepone'];
        $message = $decotedData['message'];

        // Настройка SMTP-сервера
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $config['smtp_user']; 
        $mail->Password = $config['smtp_password'];  
        $mail->SMTPSecure = 'ssl'; //ssl
        $mail->Port = 465; //465

        // Отправитель
        $mail->setFrom($email);
        $mail->addAddress('Кому отправляем');// Кому отправляем

        // Кому отправляем

        // Тело письма
        $mail->isHTML(true);
        $mail->Subject = 'New message from:' . $company;
        $mail->Body    = '<h2>Message Content</h2>
            <p><strong>Name, Sruname: </strong>'.$fullname.'</p>
            <p><strong>Email: </strong>'.$email.'</p>
            <p><strong>Phone: </strong>'.$thelepone.'</p>
            <p><strong>Subject: </strong>'.$message.'</p>
            
        ';

        $mail->send();
        echo "Message was sent successfully";
    }else {
        echo "Error: decoted error";
    }

    
} catch (Exception $e) {
    echo "Error please try again: {$mail->ErrorInfo}";
}

?>

