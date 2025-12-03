// WhatsApp Configuration
// Replace the phone number with your actual WhatsApp business number
// Format: country code + number without any + or spaces
// Example: "1234567890" for US or "919876543210" for India

export const WHATSAPP_CONFIG = {
  phoneNumber: '1234567890', // Change this to your WhatsApp number
  defaultMessage: 'Hello! I would like to know more about your hotel and resort management services.',
};

// Helper function to generate WhatsApp URL
export const getWhatsAppUrl = (message = WHATSAPP_CONFIG.defaultMessage) => {
  return `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent(message)}`;
};


