const { default: OpenAI } = require('openai');
require('dotenv').config();
const dotenv = require('dotenv');

dotenv.config({ path: 'segurit.env' });

// Definir la estructura de la respuesta de la API de OpenAI
const openaiAPIKey = process.env.OPEN_IA_KEY;
console.log(openaiAPIKey)
let openaiInstance;

// Verificar si la clave de API está definida y crear la instancia de OpenAI
if (openaiAPIKey) {
  const options = { apiKey: openaiAPIKey, dangerouslyAllowBrowser: true }; // Habilitar la opción para entornos de navegador
  openaiInstance = new OpenAI(options);
} else {
  console.error('La clave de API de OpenAI no está definida.');
}

// Define una función para enviar una consulta a OpenAI y obtener la respuesta
const sendQueryToOpenAI = async (query) => {
  try {
    if (openaiInstance) {
      const response = await openaiInstance.request({
        method: 'post',
        path: '/completions',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          model: 'gpt-3.5-turbo', // Cambiado a un modelo disponible en la versión gratuita
          prompt: query,
          max_tokens: 10,
          stop: ['\n'],
        },
      });
      
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const text = response.data.choices[0].text.trim();
        return text;
      } else {
        return null;
      }
    } else {
      console.error('La instancia de OpenAI no está definida.');
      return null;
    }
  } catch (error) {
    console.error('Error al enviar consulta a OpenAI:', error);
    return null;
  }
};

module.exports = { openaiInstance, sendQueryToOpenAI };
