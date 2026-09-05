export async function submitContactMessage(
  name: string,
  email: string,
  message: string,
  honeypot: string = ''
): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message, honeypot }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || 'Unable to send message. Please try again later.',
      };
    }

    return {
      success: true,
      message: data.message || 'Message sent successfully.',
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      success: false,
      error: 'Unable to send message. Please try again later.',
    };
  }
}
