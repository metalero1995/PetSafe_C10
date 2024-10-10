<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Google Callback</title>
</head>
<body>
    <script>
        if (window.opener) {
            window.opener.postMessage('auth-success', window.opener.location.origin); // Redirigir la ventana principal
            window.close(); // Cerrar la ventana emergente
        }
    </script>
</body>
</html>