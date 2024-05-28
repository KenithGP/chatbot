document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const grado = params.get('Grado');
    const tema = params.get('Tema');

    const form = document.getElementById('message-form');
    const userInput = document.getElementById('user-input');
    const chatWindow = document.getElementById('chat-window');

    if (grado && tema) {
        const initialMessage = `Hola, necesito información sobre el tema ${tema} para el grado ${grado}.`;

        //appendMessage('user', initialMessage);
        getBotResponse(initialMessage).then(botResponse => {
            appendMessage('bot', botResponse);
        }).catch(error => {
            console.error('Error al obtener respuesta del bot:', error);
        });
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault(); 

        const message = userInput.value.trim();
        if (message === '') return; 

        appendMessage('user', message);

        const botResponse = await getBotResponse(message);

        appendMessage('bot', botResponse);

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
            console.log(data)
            return data.response;
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
