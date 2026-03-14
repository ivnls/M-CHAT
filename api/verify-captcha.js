import axios from 'axios';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { captchaToken } = request.body;

    if (!captchaToken) {
      return response.status(400).json({ message: 'CAPTCHA token is required.' });
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;
    
    const googleResponse = await axios.post(verificationUrl);
    const { success, score, action, challenge_ts } = googleResponse.data;

    if (success) {
      return response.status(200).json({ message: 'CAPTCHA verified successfully!' });
    } else {
      return response.status(400).json({ message: 'CAPTCHA verification failed.', details: googleResponse.data['error-codes'] });
    }

  } catch (error) {
    console.error('Error during CAPTCHA verification:', error);
    return response.status(500).json({ message: 'Internal server error.' });
  }
}