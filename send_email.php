<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $to = 'cristianvinco@flexoservicios.com'; // Cambia esto por tu dirección de correo personal
    $subject = 'Nuevo mensaje de contacto';
    $body = "Nombre: $name\nCorreo: $email\nMensaje:\n$message";

    // Cabeceras para el correo
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Envía el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "Mensaje enviado!";
    } else {
        echo "Error al enviar el mensaje. Intenta de nuevo.";
    }
}
?>
