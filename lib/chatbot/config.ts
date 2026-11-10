// Configurația asistentului virtual (chatbot AI).
// Datele de contact sunt aceleași ca în Contact.tsx / Footer.tsx — dacă se schimbă acolo, se schimbă și aici.

export const CHAT_CONTACT = {
  whatsappUrl: 'https://wa.me/40771569093',
  whatsappLabel: '0771 569 093',
  instagramUrl: 'https://www.instagram.com/roxana_ica_brasov',
  instagramLabel: '@roxana_ica_brasov',
};

export const CHAT_TEXTS = {
  title: 'Roxana Ica Aesthetic',
  subtitle: 'Asistentul tău virtual',
  greeting:
    'Bună! Bine ai venit la Roxana Ica Aesthetic! 💗 Sunt asistentul nostru virtual și te pot ajuta cu informații despre serviciile, tratamentele și cabinetul nostru. Cu ce te pot ajuta?',
  quickReplies: [
    'Ce servicii oferiți?',
    'Unde vă găsesc?',
    'Care este programul cabinetului?',
    'Vreau să aflu mai multe despre tratamente.',
  ],
  // Afișat când AI-ul nu e disponibil (credit epuizat, eroare de conexiune etc.)
  unavailable:
    'Momentan asistentul virtual nu este disponibil. Îi poți scrie direct Roxanei pe WhatsApp — îți răspunde cu drag.',
};

// Limite anti-abuz (verificate pe server; interfața le respectă și ea)
export const CHAT_LIMITS = {
  maxMessageChars: 500,
  maxUserMessagesPerConversation: 20,
  perMinute: 8, // mesaje / minut / vizitator
  perHour: 60, // mesaje / oră / vizitator
};

// Modelul AI — se poate schimba din variabila de mediu CHATBOT_MODEL, fără modificări în cod
export const CHAT_MODEL = process.env.CHATBOT_MODEL || 'claude-haiku-5-5';

// Marcaj pe care AI-ul îl adaugă la final când trebuie afișat butonul WhatsApp al Roxanei
export const CONTACT_MARKER = '[[CONTACT]]';
// Marcaj pentru cereri de poze / video before–after → buton Instagram (singurul caz în care se recomandă Instagram)
export const INSTAGRAM_MARKER = '[[INSTAGRAM]]';
// Marcaj pentru programări: „[[PROGRAMARE: Nume serviciu]]” → buton WhatsApp cu mesajul de programare deja scris
export const BOOKING_MARKER = '[[PROGRAMARE';

export function bookingMessage(service?: string): string {
  return service
    ? `Bună ziua! Aș dori să mă programez pentru ${service}.`
    : 'Bună ziua! Aș dori să mă programez. Vă rog să mă contactați.';
}
