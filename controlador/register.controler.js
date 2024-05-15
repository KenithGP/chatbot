document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('register-from');
  
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();
  
        const nombres = document.getElementById('nombres').value;
        const apellidos = document.getElementById('apellidos').value;
        const nacimiento = document.getElementById('dob').value;
        const grado = document.getElementById('grade').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const genero = document.getElementById('gender-label').value;
  
        const formData = {
            nombres: nombres,
            apellidos: apellidos,
            nacimiento: nacimiento,
            email: email,
            password: password,
            grado: grado,
            genero,
        };
  
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                alert('¡Registro exitoso! Por favor inicie sesión.');
                window.location.href = '/login'; 
            } else {
                alert('¡Error en el registro! Por favor verifique los datos y vuelva a intentarlo.');
            }
        })
        .catch(error => {
            console.error('Error al enviar la solicitud:', error);
        });
    });
  });
  