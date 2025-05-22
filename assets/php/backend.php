<?php

if(!defined('ABSPATH')) {
    exit;
}

//constantes
$email = $_POST["email"];
$plugin = $_POST["plugin"];
$urgency_lvl = $_POST["urgency"];
$pb = $_POST["message"];

mail (
    'tetsuyaworkplace@gmail.com',
    'Help Center : Home Site',
    "Bonjour Tetsuya, une nouvelle demande d\'aide pour vous.
    \n Mail de l'émetteur : ${email}
    \n Plugin concerné : ${plugin}
    \n Niveau d'urgence : ${urgency_lvl}
    \n Problème : ${pb}"
);
