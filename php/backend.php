<?php

require '../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

error_reporting(E_ALL);
ini_set('display_errors', 1);


$config = require "config.php";

//constantes
$mail = new PHPMailer(true);
$mailsender = isset($_POST["email"]) ? $_POST["email"] : '';
$plugin = isset($_POST["plugin"]) ? $_POST["plugin"] : '';
$urgency = isset($_POST["urgency"]) ? $_POST["urgency"] : '';
$probleme = isset($_POST["message"]) ? $_POST["message"] : '';

try {
    $mail->SMTPDebug = 0;
    // Paramètres serveur
    $mail->isSMTP();
    $mail->Host       = $config['smtp_host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp_username'];
    $mail->Password   = $config['smtp_password'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = $config['smtp_port'];

    // Destinataires
    $mail->setFrom('noreply@workplace.com', 'Workplace Mail');
    $mail->addAddress('tetsuyaworkplace@gmail.com', 'Tetsuya');

    // Contenu
    $mail->isHTML(true);
    $mail->Subject = 'Workplace Mail';
    $mail->Body    = "Bonjour <b>Tetsuya</b>, une nouvelle demande d'aide pour vous : <br><br><br>
                      Sender: {$mailsender}<br><br>
                      Plugin: {$plugin}<br><br>
                      Urgency Level: <strong>{$urgency}</strong><br><br>
                      Probleme: {$probleme}<br><br>";
    $mail->AltBody = "Bonjour Tetsuya, une nouvelle demande d'aide pour vous : \n\n
                      Sender: {$mailsender}\n
                      Plugin: {$plugin}\n
                      Urgency Level: {$urgency}\n
                      Probleme: {$probleme};";

    $mail->send();
    echo 'Message envoyé avec succès';
} catch (Exception $e) {
    echo "Le message n'a pas pu être envoyé. Erreur : {$mail->ErrorInfo}";
}

?>
<div class="wrap">
    <h1>Votre message a bien été envoyé.</h1>
    <h2>Je vous répondrais dès que possible !</h2>
    <a href="../index.html"><button class="redirection">Redirection</button></a>
</div>
<style>
    * {
        cursor:url('/assets/images/identity/curseur-perso.png'), auto;
    }
    :root {
        --primary-color: #4b6aa3;
        --secondary-color: #1b263b;
        --accent-color: #468faf;
        --text-color: #e6e6e6;
        --background-color: #0e0e0e;
        --border-color: #2e3a59;
        --hover-color: #102841;
        --button-bg: #1b263b;
        --button-hover-bg: #0d1b2a;
        --div-background-color: #6884b9;
    }
    .wrap {
        background-color: var(--background-color);
        color: var(--text-color);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 40px 20px;
    }

    .wrap h1 {
        font-size: 2.5rem;
        margin-bottom: 20px;
        color: var(--accent-color);
    }

    .wrap h2 {
        font-size: 1.5rem;
        margin-bottom: 40px;
    }

    .redirection {
        background-color: var(--button-bg);
        color: var(--text-color);
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 1rem;
        cursor: url('/assets/images/identity/curseur-perso.png'), auto;
        transition: background-color 0.3s ease;
    }

    .redirection:hover {
        background-color: var(--button-hover-bg);
        cursor: url('/assets/images/identity/curseur-perso-hover.png'), auto;
    }
</style>
