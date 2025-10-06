import OpenAI from 'openai';

const openRouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    "HTTP-Referer": "https://novo-wellness.ai", 
    "X-Title": "Novo Wellness Chatbot", 
  },
});
 
// Fallback responses when the AI service is unavailable
const FALLBACK_RESPONSES = {
  anxiety: `At Maintainence\nWe apologize for the inconvenience `,
  depression: `At Maintainence\nWe apologize for the inconvenience `,
  stress: `At Maintainence\nWe apologize for the inconvenience `,
  default: `At Maintainence\nWe apologize for the inconvenience `
};
 
// Get API key from environment variables
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
 
// Check if the message indicates the conversation should end
// Check if the message indicates the conversation should end
// Check if the message indicates the conversation should end
const shouldEndConversation = (message: string): boolean => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Only match these exact phrases (case insensitive)
  const endPhrases = [
    'ok', 
    'okay', 
    'thanks', 
    'thank you'
  ];
  
  return endPhrases.includes(lowerMessage);
};
 
// Check if the prompt is asking about MASOOM, CII, or Yi
const isAskingAboutOrganizations = (text: string): boolean => {
  const lowerText = text.toLowerCase();
  return lowerText.includes('masoom') ||
         lowerText.includes('cii') ||
         lowerText.includes('confederation of indian industry') ||
         lowerText.includes('young indians') ||
         lowerText.includes('yi');
};
 
export const generateResponse = async (prompt: string, chatHistory: Array<{role: string, content: string}>, userRole: 'teacher' | 'student' = 'student') => {
  if (!API_KEY) {
    console.warn(' using fallback response');
    return getFallbackResponse(prompt);
  }
 
  // Check if the user wants to end the conversation
  if (shouldEndConversation(prompt)) {
    return userRole === 'teacher' 
      ? "You're welcome! Feel free to reach out if you need any assistance with your students or the platform. Have a great day!"
      : "You're welcome, I'm always here if you need to talk. Take care and remember, you're doing great! 💙";
  }
 
  try {
    // Check if the message requests Hindi response
    const isHindiRequest = prompt.toLowerCase().includes('respond in hindi');
   
    const baseSystemMessage = userRole === 'teacher' 
      ? `You are Buddy, an educational assistant designed to help teachers support their students' mental health and well-being.
         ${isHindiRequest ?
           'You are currently speaking in Hindi. Provide professional, evidence-based guidance to help teachers understand and support their students.' :
           'Provide professional, evidence-based guidance to help teachers understand and support their students.'}
         
         Your role is to:
         1. Help teachers recognize signs of student distress
         2. Suggest appropriate classroom interventions
         3. Provide resources for student support
         4. Offer guidance on creating a supportive learning environment
         5. Help with lesson planning around social-emotional learning
         
         Be professional, informative, and supportive in your responses.`
      : `You are Buddy, a friendly and supportive chatbot designed for children.
         ${isHindiRequest ?
           'You are currently speaking in Hindi. Always respond in clear, simple Hindi that is easy to understand. Use respectful and formal language appropriate for all ages. Do not use informal or culturally specific terms like "beta" or "baccha".' :
           'You communicate in clear, simple English that is easy to understand. Use respectful and formal language appropriate for all ages. Do not use informal or culturally specific terms like "sweety", "honey", or "dear".'}`;
    
    const systemMessage = `${baseSystemMessage}

    Only mention MASOOM, CII, or Young Indians (Yi) if specifically asked about them. Your primary role is to provide helpful and supportive responses ${userRole === 'teacher' ? 'to teachers' : 'to children'} in a professional and respectful manner. Maintain appropriate boundaries and focus on being a positive and constructive presence.

    Important rules:
    1. Always be positive, encouraging, and patient
    2. Use language appropriate for ${userRole === 'teacher' ? 'an educational professional' : 'children'}
    3. Be a good listener and show you care
    4. ${userRole === 'teacher' ? 'Provide research-based information and practical strategies' : 'If a child seems upset, be extra kind and supportive'}
    5. If the user says something that sounds like they want to end the conversation (like 'ok', 'thanks', 'bye'), respond with a short, warm closing message and don't ask follow-up questions
    6. Keep responses concise and relevant to the user's message. Do NOT add extra lists or reminders at the end unless relevant.
    7. When appropriate, suggest relevant resources and ${userRole === 'teacher' ? 'teaching strategies' : 'cognitive games'} that could help ${userRole === 'teacher' ? 'support students' : 'the child'} based on their current needs or concerns.

    Available Resources (use these paths for linking):
    - Stress Management: /resources/stress-management
    - Sleep & Relaxation: /resources/sleep-relaxation
    - Healthy Mind Habits: /resources/healthy-mind-habits
    - Focus & Study: /resources/focus-study
    - Peer Support: /resources/peer-support
    - Digital Wellness: /resources/digital-wellness
    - Growth Mindset: /resources/growth-mindset
    - Emotional Intelligence: /resources/emotional-intelligence
    - Mindfulness: /resources/mindfulness
    - Asking for Help: /resources/asking-help

    Available Cognitive Games (use these paths for linking):
    - Bubble Breathing: /games/bubble-breathing
    - Focus Marathon: /games/focus-marathon
    - Emotion Recognition: /games/emotion-recognition
    - Memory Games: /games/memory
    - Reaction Time: /games/reaction-time
    - Pattern Recognition: /games/pattern-memory
    - Logic Puzzles: /games/logic-puzzles
    - Word Memory: /games/word-memory

    When suggesting resources or games:
    1. Only suggest 1-2 most relevant resources/games based on the conversation
    2. Explain briefly how the resource/game can help with their specific concern
    3. Use the exact paths provided above for linking
    4. Don't list all available resources, only the most relevant ones

    Safety guidance policy (very important):
    - Only include child safety or online safety reminders when the child asks for safety guidance OR when the message mentions safety-related topics (e.g., touching/body boundaries, unsafe situations, bullying, online safety, abuse, self-harm, emergencies).
    - If the topic is general well-being (e.g., exams, stress, friendships, study tips), do NOT append safety reminders or helpline numbers by default.
    - Share helpline numbers or emergency contacts only when the child asks for them or describes an urgent/risky situation.

    If safety guidance is relevant, you may include essential points such as:
    - Your body belongs to you; you can say NO to unwanted touch.
    - Never keep secrets about your body; tell a trusted adult if someone makes you uncomfortable.
    - Be safe online: don't share personal information; if someone is mean online, don't respond, save evidence, tell an adult.
    - Cyber Crime Helpline: 1930; Childline: 1098; Police: 100; Ambulance: 108; Women's Helpline: 181.

    Remember to always be kind and helpful!`;
 
    // Check if the last message was a closing message to avoid continuing the conversation
    const lastMessage = chatHistory[chatHistory.length - 1]?.content?.toLowerCase() || '';
    if (shouldEndConversation(lastMessage)) {
      return "Take care, Remember, I'm always here if you need to talk. 💙";
    }

    const messages = [
      { role: "system", content: systemMessage },
      ...chatHistory.map(msg => ({ role: msg.role, content: msg.content })),
      { role: "user", content: prompt }
    ];

    const response = await openRouter.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: messages.map(msg => ({
        role: msg.role as "system" | "user" | "assistant",
        content: msg.content
      })),
    });
    let responseText = response.choices[0].message?.content as string;
   
    // Ensure the response is appropriate if it's a closing message
    if (shouldEndConversation(prompt)) {
      responseText = "You're welcome, I'm always here if you need to talk. Take care and remember, you're doing great! 💙";
    }
   
    
   
    return responseText;
  } catch (error) {
    console.error('Error getting chat response:', error);
    return getFallbackResponse(prompt);
  }
};
 
// Helper function to get appropriate fallback response based on prompt content
const getFallbackResponse = (prompt: string): string => {
  const lowerPrompt = prompt.toLowerCase();
 
  if (lowerPrompt.includes('anxiety') || lowerPrompt.includes('anxious')) {
    return FALLBACK_RESPONSES.anxiety;
  } else if (lowerPrompt.includes('depress') || lowerPrompt.includes('sad')) {
    return FALLBACK_RESPONSES.depression;
  } else if (lowerPrompt.includes('stress') || lowerPrompt.includes('overwhelm')) {
    return FALLBACK_RESPONSES.stress;
  }
 
  return FALLBACK_RESPONSES.default;
};
 
export interface SessionSummary {
  focusArea: string;
  keyPoints: string[];
  actionPlan: string[];
}
 
export const generateSessionSummary = async (transcript: string): Promise<SessionSummary> => {
  try {
    if (!API_KEY) {
      throw new Error('Chat service not initialized');
    }
 
    const prompt = `Analyze the following therapy session transcript and provide a structured summary. Focus on:
    1. Main focus area (1-2 sentences)
    2. 3-5 key points discussed
    3. 2-3 action items for the client\n\nTranscript: ${transcript}\n\nFormat the response as a JSON object with these exact keys: focusArea, keyPoints, actionPlan`;
 
    const messages = [
      { role: "system", content: "You are a helpful assistant that analyzes therapy sessions and provides structured summaries." },
      { role: "user", content: prompt }
    ];
 
    const response = await openRouter.chat.completions.create({
      model: "mistralai/mistral-7b-instruct:free",
      messages: messages.map(msg => ({
        role: msg.role as "system" | "user" | "assistant",
        content: msg.content
      })),
    });
    const text = response.choices[0].message?.content as string;
   
    // Extract JSON from markdown code block if present
    let jsonString = text;
    const jsonMatch = text.match(/```(?:json)?\n([\s\S]*?)\n```/);
    if (jsonMatch) {
      jsonString = jsonMatch[1];
    }
   
    const summary = JSON.parse(jsonString);
   
    return {
      focusArea: summary.focusArea || 'General discussion',
      keyPoints: Array.isArray(summary.keyPoints) ? summary.keyPoints : [],
      actionPlan: Array.isArray(summary.actionPlan) ? summary.actionPlan : []
    };
  } catch (error) {
    console.error('Error generating session summary:', error);
    return {
      focusArea: 'Session overview',
      keyPoints: ['Summary generation unavailable at this time'],
      actionPlan: ['Review session notes', 'Schedule follow-up if needed']
    };
  }
};
 
export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  // Note: Audio transcription would require a dedicated audio processing service
  // This is a placeholder implementation
  try {
    if (!API_KEY) {
      throw new Error('Chat service not initialized');
    }
 
    const prompt = "This is a placeholder for audio transcription. The actual implementation would require a dedicated audio processing service.";
    const messages = [
      { role: "system", content: "You are a helpful assistant that processes audio transcripts." },
      { role: "user", content: prompt }
    ];
 
    const response = await openRouter.chat.completions.create({
      model: "mistralai/mistral-7b-instruct:free",
      messages: messages.map(msg => ({
        role: msg.role as "system" | "user" | "assistant",
        content: msg.content
      })),
    });
    return response.choices[0].message?.content as string;
  } catch (error) {
    console.error('Error processing audio:', error);
    throw new Error('Audio processing is currently unavailable. Please try again later.');
  }
};