// Masoom content mapping for chatbot responses
export const masoomContent = {
  // Internet Safety
  "internet safety": {
    answer: `Internet Safety Tips:

• Never share personal information online (full name, address, phone, school)
• Be careful what you share on social media - once online, always online!
• Use strong, unique passwords and never share them
• Be cautious with strangers online - not everyone is who they say they are
• Think before you click on links or download files
• Adjust privacy settings on your accounts
• Tell a trusted adult if something makes you uncomfortable

Remember: Your digital footprint lasts forever! (from Masoom content)`,
    keywords: ["internet safety", "online safety", "safe browsing", "digital footprint", "social media safety"]
  },
  
  // Cyberbullying
  "cyberbullying": {
    answer: `Cyberbullying is when someone uses technology to hurt, embarrass, or scare another person. Examples include:

• Sending mean messages or comments
• Sharing embarrassing photos/videos without permission
• Spreading rumors or lies online
• Excluding someone from online groups on purpose
• Creating fake profiles to trick or humiliate someone

Remember:
• Save evidence of cyberbullying
• Don't respond to the bully
• Block and report the person
• Tell a trusted adult
• Be kind online! (from Masoom content)`,
    keywords: ["cyberbullying", "online bullying", "being bullied online", "cyber safety", "internet bullying"]
  },
  // Body Safety Rules
  "body safety rules": {
    answer: `Body Safety Rules for Children:

1. Your body belongs to YOU!
2. You have the right to say "NO" to any touch that makes you uncomfortable
3. No one should touch your private parts (parts covered by a swimsuit)
4. No one should ask you to touch their private parts
5. You should never keep "body secrets" - especially if someone asks you to
6. If someone breaks these rules, tell a trusted adult immediately!

Remember: If someone makes you uncomfortable:
1. Say NO firmly
2. Get away from the situation
3. Tell a trusted adult right away
4. Keep telling until someone helps you

It's never too late to tell someone! (from Masoom content)`,
    keywords: ["body safety", "personal safety", "protect myself", "private parts", "body rules"]
  },
  
  // Safe vs Unsafe Touch
  "safe vs unsafe touch": {
    answer: `Understanding Safe and Unsafe Touch:

SAFE TOUCH:
• Makes you feel happy and cared for
• Examples: Appropriate hugs from family, high-fives, handshakes
• Doctor visits with parents present
• Makes you feel safe and loved

UNSAFE TOUCH:
• Makes you feel uncomfortable or scared
• Any touch on private parts (unless for health with parents)
• If someone asks you to keep a touch a secret
• Any touch that makes you feel confused or unsafe

Remember: Your body belongs to YOU! (from Masoom content)`,
    keywords: ["safe touch", "unsafe touch", "good touch bad touch", "types of touch", "appropriate touch"]
  },
  
  // Bad Touch
  "bad touch": {
    answer: "A bad touch is any touch that makes you feel uncomfortable, scared, or confused. This includes: touching private parts, touches that hurt, or any touch that makes you feel uneasy. Remember: No one should touch your private parts except for health reasons when a parent or trusted adult is present. (from Masoom content)",
    keywords: ["what is bad touch", "define bad touch", "bad touch meaning", "inappropriate touch"]
  },
  
  // Trusted Adults
  "trusted adults": {
    answer: `Who are Trusted Adults?

Trusted adults are people you can go to if you feel unsafe or uncomfortable. They include:

• Parents or guardians
• Teachers or school counselors
• Doctors or nurses (with parents present)
• Police officers
• Family members you feel safe with

A trusted adult will:
• Believe you
• Keep you safe
• Help you report problems
• Never ask you to keep secrets from your parents

Remember: You can always talk to a trusted adult if something is bothering you! (from Masoom content)`,
    keywords: ["trusted adults", "who can I talk to", "report abuse", "get help", "who to tell"]
  },
  
  // What to do if uncomfortable
  "uncomfortable situation": {
    answer: "If someone makes you feel uncomfortable or unsafe:\n\n1. Say \"NO\" loudly and clearly\n2. Get away from that person\n3. Tell a trusted adult immediately (parent, teacher, counselor)\n4. Keep telling until someone helps you\n5. Remember: It's NEVER your fault!\n\nYou can also call Childline India at 1098 for help 24/7. (from Masoom content)",
    keywords: ["feel uncomfortable", "what to do", "uncomfortable situation", "need help", "who to tell"]
  },
  
  // POCSO Act
  "pocso act": {
    answer: "The POCSO Act (Protection of Children from Sexual Offences) is a law that protects all children under 18 from sexual abuse. It covers:\n\n• Sexual assault (3-5 years punishment)\n• Severe sexual assault (7 years to life)\n• Sexual harassment (3 years)\n• Child pornography (5-7 years)\n\nYour rights under POCSO:\n• Police must help you\n• Your identity stays private\n• You can give statements at home\n• The court will believe you (from Masoom content)",
    keywords: ["pocso", "legal protection", "child rights", "law for children"]
  },
  
  // Digital Footprint
  "digital footprint": {
    answer: `Your Digital Footprint:

Everything you do online leaves a digital footprint, including:
• Websites you visit
• Things you post or share
• Photos you upload
• Comments you make
• Apps you use

Think before you post! Once something is online:
• It can be copied and shared
• It's hard to completely delete
• It could be seen by anyone, including future employers or schools
• It could be used in ways you didn't intend

Be a responsible digital citizen! (from Masoom content)`,
    keywords: ["digital footprint", "online presence", "internet privacy", "online reputation"]
  },
  
  // Online Scams
  "online scams": {
    answer: `Watch out for these common online scams:

• Phishing: Fake emails pretending to be from legitimate companies
• Smishing: Fake text messages trying to steal information
• Vishing: Voice calls from scammers pretending to be someone else
• Catfishing: Fake online profiles used to trick people

Red flags:
• Urgent requests for personal information
• Too-good-to-be-true offers
• Requests for money or gift cards
• Poor spelling and grammar in messages
• Suspicious email addresses or links

When in doubt, don't click! (from Masoom content)`,
    keywords: ["online scams", "phishing", "internet fraud", "online safety", "avoiding scams"]
  },
  
  // Emergency Help
  "emergency help": {
    answer: "If you need help right now, contact these emergency numbers in India:\n\n• Childline India: 1098 (24/7 help for children)\n• Emergency Services: 112 (Police, Fire, Medical)\n• Cyber Crime Helpline: 1930\n\nYou can also report online crimes at cybercrime.gov.in\n\nRemember: It's okay to ask for help! (from Masoom content)",
    keywords: ["emergency", "help me", "who to call", "urgent help", "report abuse"]
  },
  
  // Grooming Warning Signs
  "grooming signs": {
    answer: "Warning signs of grooming (when someone builds fake trust to harm you):\n\n• Constant chatting and giving you lots of attention\n• Asking you to keep secrets from family/friends\n• Giving you gifts or money for no reason\n• Asking personal questions about your body or relationships\n• Sending or asking for inappropriate photos\n• Making you feel special or that they 'understand' you better than others\n\nIf you notice these signs, tell a trusted adult immediately! (from Masoom content)",
    keywords: ["grooming", "warning signs", "stranger danger", "online safety"]
  }
};

// Function to find matching Masoom content for a question
export const findMasoomContent = (question: string): string | null => {
  const lowerQuestion = question.toLowerCase().trim();
  const words = lowerQuestion.split(/\s+/); // Split into words
  
  // Check for direct matches first (whole topic matches)
  for (const [topic, data] of Object.entries(masoomContent)) {
    // Only match whole words to avoid false positives
    const topicWords = topic.toLowerCase().split(/\s+/);
    const isTopicMatch = topicWords.every(word => 
      lowerQuestion.includes(` ${word} `) || // Word with spaces around
      lowerQuestion.startsWith(`${word} `) || // Word at start
      lowerQuestion.endsWith(` ${word}`) ||  // Word at end
      lowerQuestion === word                  // Exact match
    );
    
    if (isTopicMatch) {
      return data.answer;
    }
    
    // Check keywords - require at least one exact keyword match
    const hasKeywordMatch = data.keywords.some(keyword => {
      const keywordLower = keyword.toLowerCase();
      // Match whole words only to prevent partial matches
      return new RegExp(`\\b${keywordLower}\\b`).test(lowerQuestion);
    });
    
    if (hasKeywordMatch) {
      // Additional check: ensure the question is relevant to the topic
      const relevantWords = [...topic.split(/\s+/), ...data.keywords];
      const relevantWordCount = relevantWords.filter(word => 
        new RegExp(`\\b${word}\\b`, 'i').test(lowerQuestion)
      ).length;
      
      // Require at least one relevant word to prevent false positives
      if (relevantWordCount > 0) {
        return data.answer;
      }
    }
  }
  
  return null; // No relevant Masoom content found
};
