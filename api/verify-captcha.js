// api/verify-captcha.js

// É uma boa prática usar uma dependência como 'axios' para requisições HTTP,
// então instale-a no seu projeto: npm install axios
import axios from 'axios';

// A função exportada é o que a Vercel irá executar
export default async function handler(request, response) {
  // 1. Apenas aceite requisições do tipo POST
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { captchaToken } = request.body;

    // 2. Verifique se o token foi enviado
    if (!captchaToken) {
      return response.status(400).json({ message: 'CAPTCHA token is required.' });
    }

    // 3. Pegue a Chave Secreta das variáveis de ambiente da Vercel
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    // 4. Envie a requisição de verificação para a API do Google
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
    
    const googleResponse = await axios.post(verificationUrl);
    const { success, score, action, challenge_ts } = googleResponse.data;

    // 5. Analise a resposta do Google
    if (success) {
      // CAPTCHA validado com sucesso!
      // Se estivéssemos usando reCAPTCHA v3, poderíamos verificar a 'action' e o 'score' aqui.
      // Para a v2, 'success: true' é suficiente.
      return response.status(200).json({ message: 'CAPTCHA verified successfully!' });
    } else {
      // Falha na verificação
      return response.status(400).json({ message: 'CAPTCHA verification failed.', details: googleResponse.data['error-codes'] });
    }

  } catch (error) {
    console.error('Error during CAPTCHA verification:', error);
    return response.status(500).json({ message: 'Internal server error.' });
  }
}