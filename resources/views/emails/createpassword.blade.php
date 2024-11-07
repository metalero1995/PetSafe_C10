<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Contacto</title>
</head>
<body>
    <h1>Hola, {{ $name }}!</h1>
    <p>Hemos creado tu cuenta, presiona en el siguiente enlace para establecer tu contraseña.</p>
    <!-- Usar $userMessage para evitar conflicto -->
    <a href="http://localhost:8000/createpassword/{{$token}}" target="_blank">Presiona aquí</a>
    <br>
    <p>Saludos,</p>
    <p>De parte del equipo [PetSafe]</p>
</body>
</html>
