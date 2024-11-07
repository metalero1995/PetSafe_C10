<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Contacto</title>
    <link href="https://fonts.googleapis.com/css2?family=Fredoka&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        body {
            font-family: 'Fredoka', sans-serif;
            background-color: #f2f2f2; 
        }
        .form-background {
            background-color: #beac94; 
        }
        .image-background {
            background-color: #BFAC95; 
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .text-custom {
            color: #5f4c35;
        }
        .border-custom {
            border-color: #BFAC95;
        }
        button {
            background-color: #BFAC95;
        }
        button:hover {
            background-color: #8c6b42;
        }
    </style>
    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
</head>
<body class="flex items-center justify-center min-h-screen">
    <div class="container mx-auto flex bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="w-full md:w-1/2 flex items-center justify-center image-background p-6">
            <img src="{{ asset('images/contactImage.png') }}" alt="Contact Image" class="w-3/4 h-auto"> 
        </div>
        <div class="w-full md:w-1/2 p-10 form-background">
            <h1 class="text-4xl font-bold text-custom mb-5 center">Contactanos si tienes dudas o errores del sistema</h1>
            <form id="contactForm" action="{{ route('contact.store') }}" method="POST" class="space-y-5">
                @csrf
                <div class="form-group">
                    <label for="name" class="block text-sm font-medium text-custom">Nombre</label>
                    <input type="text" class="mt-1 block w-full p-2 border border-custom rounded-md" id="name" name="name" value="{{ old('name') }}" required minlength="3">
                </div>
                <div class="form-group">
                    <label for="email" class="block text-sm font-medium text-custom">Correo Electrónico</label>
                    <input type="email" class="mt-1 block w-full p-2 border border-custom rounded-md" id="email" name="email" value="{{ old('email') }}" required>
                </div>
                <div class="form-group">
                    <label for="subject" class="block text-sm font-medium text-custom">Asunto</label>
                    <input type="text" class="mt-1 block w-full p-2 border border-custom rounded-md" id="subject" name="subject" value="{{ old('subject') }}" required minlength="5">
                </div>
                <div class="form-group">
                    <label for="message" class="block text-sm font-medium text-custom">Mensaje</label>
                    <textarea class="mt-1 block w-full p-2 border border-custom rounded-md" id="message" name="message" rows="5" required minlength="10">{{ old('message') }}</textarea>
                </div>
                <button type="submit" class="w-full text-white p-2 rounded-md">Enviar</button>
            </form>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            @if (session('success'))
                alert("{{ session('success') }}");
            @endif

            @if ($errors->any())
                let errorMessages = '';
                @foreach ($errors->all() as $error)
                    errorMessages += '{{ $error }}\n';
                @endforeach
                alert(errorMessages);
            @endif


            $('#contactForm').on('submit', function(e) {
                let isValid = true;
                const name = $('#name').val().trim();
                const email = $('#email').val().trim();
                const subject = $('#subject').val().trim();
                const message = $('#message').val().trim();

                if (name.length < 3) {
                    alert('El nombre debe tener al menos 3 caracteres.');
                    isValid = false;
                }
                if (!validateEmail(email)) {
                    alert('Por favor, introduce un correo electrónico válido.');
                    isValid = false;
                }
                if (subject.length < 5) {
                    alert('El asunto debe tener al menos 5 caracteres.');
                    isValid = false;
                }
                if (message.length < 10) {
                    alert('El mensaje debe tener al menos 10 caracteres.');
                    isValid = false;
                }

                if (!isValid) {
                    e.preventDefault();
                }
            });

            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
        });
    </script>
</body>
</html>

