<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Contacto</title>
</head>
<body>
    <h1>Gracias por contactarnos, {{ $name }}!</h1>
    <p>Hemos recibido tu mensaje y te atenderemos lo antes posible.</p>
    <p><strong>Estos son los detalles de tu mensaje:</strong></p>
    <p><strong>Nombre:</strong> {{ $name }}</p>
    <p><strong>Correo Electrónico:</strong> {{ $email }}</p>
    <p><strong>Asunto:</strong> {{ $subject }}</p>
    <p><strong>Mensaje:</strong></p>
    <p>{{ $userMessage }}</p> <!-- Usar $userMessage para evitar conflicto -->
    <br>
    <p>Saludos,</p>
    <p>De parte del equipo [PetSafe]</p>
</body>
</html>
