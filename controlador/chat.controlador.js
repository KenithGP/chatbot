document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('message-form');
    const userInput = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita que se recargue la página al enviar el formulario

        const message = userInput.value.trim(); // Obtener el mensaje del usuario
        if (message === '') return; // Si el mensaje está vacío, no hacer nada

        // Agregar el mensaje del usuario al chat
        appendMessage('user', message);

        // Obtener respuesta del modelo de lenguaje
        const botResponse = await getBotResponse(message);

        // Mostrar la respuesta del modelo en el chat
        appendMessage('bot', botResponse);

        // Limpiar el campo de entrada después de enviar el mensaje
        userInput.value = '';
    });

    async function getBotResponse(userMessage) {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ question: userMessage })
            });
            const data = await response.json();
            return data.answer;
        } catch (error) {
            console.error('Error al obtener respuesta del bot:', error);
            return 'Lo siento, ha ocurrido un error.';
        }
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
        messageElement.textContent = message;
        chatWindow.appendChild(messageElement);
        // Desplazar hacia abajo para mostrar el mensaje más reciente
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});
