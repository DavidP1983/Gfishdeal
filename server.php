<?php
$config = include('config.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    // Настройка SMTP-сервера
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = getenv('SMTP_USER'); 
    $mail->Password = getenv('SMTP_PASSWORD');  
    // $mail->Username = $config['smtp_user']; 
    // $mail->Password = $config['smtp_password'];  
    $mail->SMTPSecure = 'ssl'; //ssl
    $mail->Port = 465; //465

    // Отправитель
    $mail->setFrom($_POST['email']);
    $mail->addAddress('david.piruzashvili@gmail.com'); // Кому отправляем

    // Тело письма
    $mail->isHTML(true);
    $mail->Subject = $_POST['name'];
    $mail->Body    = $_POST['message'];

    $mail->send();
    echo "Message was sent successfully";
    
} catch (Exception $e) {
    echo "Error please try again: {$mail->ErrorInfo}";
}

?>