export interface ResourceTopic {
  id: string;
  title: string;
  imageUrl: string;
  introduction: string;
  sections: {
    id: string;
    title: string;
    content: string;
    image?: string;
  }[];
}

export const resourcesData: ResourceTopic[] = [
  {
    id: 'stress-management',
    title: 'Stress Management',
    imageUrl: '/Resource Images/Stress management.png',
    introduction: 'Feeling overwhelmed? You\'re not alone. Learn how to manage stress and find your calm with our expert-backed resources and guided meditations.',
    sections: [
      {
        id: 'what-is-stress',
        title: 'What is Stress?',
        content: `Stress is how your body and mind react when things feel tough or overwhelming. It's normal to feel stressed sometimes, like when you have:
• Exams or too much homework 📚
• Pressure from friends to fit in
• Worries about what parents or teachers expect 👨‍👩‍👦`,
        image: '/1. Stress management images/Normal vs Harmful Stress.png'
      },
      {
        id: 'common-causes',
        title: 'Common Causes of Stress in Students',
        content: `Here are some things that might make you feel stressed:
• Exams & Studies 📚: Too much homework, tough subjects, or fear of failing tests
• Expectations from Parents/Teachers 👨‍👩‍👦: Feeling pressure to get good marks or make them proud
• Peer Pressure & Friendships: Worrying about fitting in, fights with friends, or being left out
• Screen Time & Social Media 📱: Seeing others' "perfect" lives online or spending too much time on phones
• Lack of Sleep 😴: Staying up late for studies or screens can make you tired and stressed`,
        image: '/1. Stress management images/Here are some things that might make you feel stressed.png'
      },
      {
        id: 'coping-techniques',
        title: 'Coping Techniques',
        content: `Try these simple ways to handle stress. Start with one or two that feel easy for you!

**1. Deep Breathing (2–3 Min Daily)**
• Sit straight, close your eyes if you want
• Breathe in slowly through your nose for 4 seconds
• Hold your breath for 2 seconds
• Breathe out slowly through your mouth for 6 seconds
• Repeat 5–10 times
👉 Calms your mind fast, especially before a test

**2. Break Study into Chunks**
• Study for 25 minutes, then take a 5-minute break
• During breaks, stretch, walk, or sip water
👉 Keeps you focused and prevents burnout

**3. Exercise/Movement**
• Walk, cycle, or play outdoor games for 15–20 minutes daily
• Try simple yoga stretches
👉 Moving your body reduces stress and boosts your mood

**4. Positive Self-Talk 💬**
• Change "I can't do this" to "I'll try my best, step by step"
• Talk to yourself like you'd cheer up a friend
👉 Builds confidence and lowers fear

**5. Time Management**
• Make a simple timetable to plan your day
• Planning helps you feel in control and reduces last-minute stress

**6. Journaling/Expressing Emotions**
• Write or draw how you feel
• Add one action, like "I'll revise one chapter tonight"
👉 Helps you clear your mind and feel lighter

**7. Talking to Someone You Trust**
• Share your worries with a parent, teacher, or friend you trust
👉 Talking makes stress feel smaller, and they might help you find solutions`,
        image: '/1. Stress management images/Try these simple ways to handle stress.png'
      },
      {
        id: 'quick-stress-busters',
        title: 'Quick "Stress Busters" for Teens',
        content: `These are fast ways to feel better when stress hits:
• Listen to Calming Music 🎵: Play soft songs or nature sounds for 5–10 minutes
• Drink Water 💧: Sip water slowly to relax your body
• 5-4-3-2-1 Grounding Game: Look around and notice:
  ○ 5 things you see (e.g., a book, a tree)
  ○ 4 things you can touch (e.g., your desk, your shirt)
  ○ 3 things you hear (e.g., birds, a fan)
  ○ 2 things you smell (e.g., food, flowers)
  ○ 1 thing you taste (e.g., a mint or water)
👉 This brings your mind back to the present
• Short Nap (20 Min Max): Rest your brain with a quick nap (set an alarm!)`,
        image: '/1. Stress management images/These are fast ways to feel better when stress hits.png'
      },
      {
        id: 'daily-routine',
        title: 'Daily Routine for a Healthy Mind',
        content: `A good routine helps keep stress low:
• Sleep 7–9 Hours: Go to bed at the same time every night
• Eat Balanced Meals: Add fruits, veggies, and home-cooked food. Avoid too much junk food or energy drinks
• Reduce Screen Time Before Bed: Stop using phones or tablets 30 minutes before sleeping
• Practice Gratitude: Write 3 things you're thankful for daily, like "I had fun with friends" or "I finished my homework"
👉 These habits make your mind stronger and happier`,
        image: '/1. Stress management images/A good routine helps keep stress low.png'
      },
      {
        id: 'activities',
        title: 'Top 3 Activities for Stress Busters',
        content: `These fun games and activities are great for quick stress relief. They're easy to do alone or with friends!

**1. Calm Bubble Breathing**
Imagine (or use real bubbles if you have them) blowing big, slow bubbles. Breathe in deeply, then exhale slowly as if making the bubble grow without popping it. Do this for 2–3 minutes.
👉 Helps with deep breathing in a playful way, calming your mind like magic

**2. Freeze Dance**
Play upbeat music and dance freely around the room. When the music stops (or someone says "freeze"), hold a silly pose until it starts again. Play for 5–10 minutes.
👉 Releases energy, makes you laugh, and shakes off stress through movement

**3. Mindful Coloring**
Grab a coloring book, mandala printout, or just draw doodles. Focus on choosing colors and filling in shapes without rushing. Spend 10–15 minutes on it.
👉 Shifts your mind away from worries, promotes creativity, and relaxes you`,
        image: '/1. Stress management images/These fun games and activities are great for quick stress relief.png'
      },
      {
        id: 'badges',
        title: 'Badges for Stress Management',
        content: `Earn these fun badges by practicing techniques! Track them in a journal or on a chart.
• Breathing Master Badge 💨: Complete deep breathing or bubble breathing 5 days in a row
• Active Mover Badge 🏃: Do exercise or a movement activity daily for a week
• Calm Talker Badge: Talk out your stress with someone twice a week
• Routine Hero Badge 🏆: Follow a balanced daily routine for 7 days straight
👉 Badges make practicing fun—celebrate with a small reward like extra playtime!`,
        image: '/1. Stress management images/Earn these fun badges by practicing techniques.png'
      },
      {
        id: 'when-to-ask-help',
        title: 'When to Ask for Help',
        content: `It's okay to ask for help if stress feels too big. Reach out if:
• Stress stops you from sleeping, studying, or feeling okay
• You feel sad, anxious, or hopeless most of the time
• You ever think about hurting yourself—talk to a trusted adult right away

**Extra Support (India-Specific)**
If you need someone to talk to try these:
• Childline India: Call 1098 (free, 24/7) for help with stress or problems
• NIMHANS Helpline: Call 080-46110007 for mental health support
• School Counselor/Teacher: Talk to your school's counselor or a favorite teacher
👉 You're not alone—there's always someone to listen`,
        image: '/1. Stress management images/If you need someone to talk to try these.png'
      },
      {
        id: 'connections',
        title: 'How Managing Stress Connects with Other Areas',
        content: `Managing stress doesn't just help with school—it improves your whole life!
• Academics: Less stress means better focus, memory, and grades in subjects like math or science
• Sports & Hobbies: You'll have more energy for games, art, or music without feeling overwhelmed
• Friendships & Family: Staying calm helps you handle arguments better and enjoy time with others
• Health: Good stress management leads to better sleep, stronger immunity, and overall happiness
👉 It's like a superpower that boosts everything you do!`,
        image: '/1. Stress management images/How Managing Stress Connects with Other Areas.png'
      },
      {
        id: 'final-tip',
        title: 'Final Tip',
        content: `Start with one or two techniques like deep breathing or talking to a friend. Practice them daily, and you'll feel stronger to handle stress. You've got this! 💪

**Disclaimer**
This guide is for general information and fun tips only. It's not medical advice. If you're feeling very stressed, anxious, or unwell, talk to a parent, teacher, or doctor right away. For serious issues, use the helplines listed or seek professional help. Always prioritize your safety and well-being.`,
        image: '/1. Stress management images/Start with one or two techniques like deep breathing or talking to a friend.png'
      }
    ],
  },
  {
    id: 'sleep-relaxation',
    title: 'Sleep & Relaxation',
    imageUrl: '/Resource Images/Sleep & Relaxation.png',
    introduction: 'Discover the secrets to better sleep and relaxation. Learn how proper rest can transform your energy levels, mood, and academic performance with practical bedtime routines and relaxation techniques.',
    sections: [
      {
        id: 'why-it-matters',
        title: 'Why It Matters',
        content: `Sleep is like a superpower for your brain and body! It helps you:
• Grow Smarter: Sleep strengthens your brain, making it easier to learn and remember things like math formulas or history facts
• Stay Happy: Good sleep keeps your mood balanced, so you feel less cranky or stressed
• Focus Better: A well-rested brain helps you concentrate in class and during exams
• Stay Healthy: Sleep boosts your energy and keeps your body strong

Teens (13–19 years) need 8–10 hours of sleep every night to feel their best. Without enough sleep, you might feel tired, forget things, or get upset easily.`,
        image: '/2. Sleep & Relaxation/Why It Matters.png'
      },
      {
        id: 'sleep-problems',
        title: 'Why Sleep Problems Happen',
        content: `Sometimes, it's hard to fall asleep or stay asleep. Here are common reasons:
• Irregular Schedules: Going to bed or waking up at different times confuses your body
• Too Much Screen Time: Phones, tablets, or TV before bed make your brain stay awake
• Stress: Worrying about exams, friends, or family can keep you up at night
• Uncomfortable Environment: A noisy, bright, or warm room makes sleep harder
• Caffeine or Heavy Food: Drinking tea, coffee, or energy drinks, or eating heavy meals late can disturb sleep`,
        image: '/2. Sleep & Relaxation/Why Sleep Problems Happen.png'
      },
      {
        id: 'sleep-hygiene',
        title: 'Sleep Hygiene Tips',
        content: `Follow these simple habits to sleep better:
• Go to Bed and Wake Up at the Same Time: Pick a bedtime (e.g., 10 PM) and wake-up time (e.g., 6 AM) and stick to it, even on weekends
• Avoid Screens Before Bed: Stop using phones, tablets, or TV at least 30–60 minutes before sleeping. The blue light tricks your brain into staying awake
• Make Your Room Sleep-Friendly: Keep it dark (use curtains), quiet (avoid loud noises), and cool (open a window if possible)
• Skip Heavy Meals and Caffeine: Avoid big meals, tea, coffee, or energy drinks after 6 PM. Try light snacks like fruit if you're hungry
• Create a Calm Space: Use a comfy pillow and blanket, and keep your bed clean`,
        image: '/2. Sleep & Relaxation/Sleep Hygiene Tips.png'
      },
      {
        id: 'relaxation-techniques',
        title: 'Relaxation Techniques for Sleep',
        content: `Try these to relax your body and mind before bed:

**1. Calm Pre-Sleep Routine**
• Spend 10–15 minutes doing relaxing things, like:
  ▪ Reading a light book (not a scary one!)
  ▪ Listening to soft music or nature sounds (like rain or waves)
  ▪ Doing gentle stretches (like reaching for your toes)
👉 Helps your brain switch from "active" to "rest" mode

**2. Body Scan Relaxation**
• Lie down in bed, close your eyes, and focus on relaxing each part of your body:
  ▪ Start with your toes—wiggle them, then let them relax
  ▪ Move to your feet, legs, tummy, arms, shoulders, and head
  ▪ Imagine each part feeling heavy and calm
• Takes 5–7 minutes
👉 Releases tension and prepares you for sleep

**3. Slow Breathing**
• Sit or lie down comfortably
• Breathe in slowly through your nose for 4 seconds
• Hold your breath for 2 seconds
• Breathe out slowly through your mouth for 6 seconds
• Repeat 5–10 times
👉 Slows your heart rate and calms your mind`,
        image: '/2. Sleep & Relaxation/Relaxation Techniques for Sleep.png'
      },
      {
        id: 'final-tip',
        title: 'Final Tip',
        content: `Start with one or two tips, like setting a bedtime or trying slow breathing. Practice them daily, and you'll sleep better and feel stronger. You've got this! 💪

**Extra Support (India-Specific)**
If sleep problems continue or you feel overwhelmed, reach out:
• Childline India: Call 1098 (free, 24/7) for help with stress or sleep issues
• NIMHANS Helpline: Call 080-46110007 for mental health support
• School Counselor/Teacher: Talk to your school's counselor or a trusted teacher
👉 You're not alone—help is always available`,
        image: '/2. Sleep & Relaxation/Final Tip.png'
      },
      {
        id: 'connections',
        title: 'Connections',
        content: `Sleep connects to other areas of your life:
• Stress Management: Less stress helps you sleep better, and good sleep reduces stress. Try deep breathing or journaling from the Stress Management Guide to relax before bed
• Digital Wellness: Cutting screen time before bed (as mentioned in Digital Wellness tips) improves sleep quality
• School Success: Good sleep boosts your focus, memory, and grades, helping you shine in class`,
        image: '/2. Sleep & Relaxation/Connections.png'
      }
    ],
  },
  {
    id: 'healthy-mind-habits',
    title: 'Healthy Mind Habits',
    imageUrl: '/Resource Images/Healthy Mind Habits.png',
    introduction: 'Develop mental resilience and positivity through simple daily practices. Learn how small changes in your routine can lead to significant improvements in your overall well-being and outlook on life.',
    sections: [
      {
        id: 'why-it-matters',
        title: 'Why It Matters',
        content: `The way you think affects how you feel and act every day. Healthy mind habits, like talking kindly to yourself or noticing good things, help you feel stronger, happier, and ready to face challenges.

For example:
• During exam stress, positive thoughts can help you stay calm instead of panicking
• With friendship issues, reframing thoughts can remind you that one fight doesn't mean you're alone

Building these habits makes school, friends, and family life easier. It's like training your brain to be your best friend!`,
        image: '/3. Healthy mind habbits/Why It Matters.png'
      },
      {
        id: 'key-practices',
        title: 'Key Healthy Mind Practices',
        content: `Here are simple practices to try. Each one has easy steps, examples, and an activity. Start with one and practice daily!

**1. Positive Self-Talk 💬**
Positive self-talk means speaking to yourself kindly, like you would to a best friend. It builds confidence and reduces worry.

Examples:
• Instead of "I can't do this math problem," say "I'll try step by step and learn from it"
• Instead of "I'm bad at sports," say "I'm getting better with practice"

Activity: Every morning, write 3 kind sentences about yourself, like "I'm good at helping friends" or "I'm brave for trying new things"

**2. Gratitude Practice 🙏**
Gratitude means noticing and being thankful for good things in life, big or small. It helps you focus on positives and feel happier.

Examples:
• "I'm thankful for my family's yummy dinner"
• "I'm grateful for a fun chat with my friend today"

Activity: Before sleep, write 2 things you're thankful for in a journal. Do it daily to see how it lifts your mood

**3. Thought Reframing 🔄**
Thought reframing means changing negative thoughts into kinder, more helpful ones. It helps you see problems as chances to grow.`,
        image: '/3. Healthy mind habbits/Key Healthy Mind Practices.png'
      },
      {
        id: 'gratitude-practice',
        title: 'Gratitude Practice',
        content: `Gratitude means noticing and being thankful for good things in life, big or small. It helps you focus on positives and feel happier.

Examples:
• "I'm thankful for my family's yummy dinner"
• "I'm grateful for a fun chat with my friend today"

Activity: Before sleep, write 2 things you're thankful for in a journal. Do it daily to see how it lifts your mood.

Tool: Gratitude Tracker Worksheet (a 7-day sheet to fill in what you're thankful for each day)`,
        image: '/3. Healthy mind habbits/Gratitude Practice.png'
      },
      {
        id: 'thought-reframing',
        title: 'Thought Reframing',
        content: `Thought reframing means changing negative thoughts into kinder, more helpful ones. It helps you see problems as chances to grow.

**Example Table:**
Negative Thought ❌ → Kinder Reframe ✅
"I failed the test, I'm dumb" → "I didn't do well, but I can prepare better next time"
"Nobody likes me" → "Some people may not, but I have true friends who care"
"I always mess up" → "Everyone makes mistakes; I'll learn from this one"

Activity: Think of a negative thought from your day and write a kinder reframe. Practice with 2–3 examples weekly.

Tool: Interactive Thought Reframe Sheet (a worksheet with blank spaces to fill in your own negative thoughts and reframes)`,
        image: '/3. Healthy mind habbits/Thought Reframing.png'
      },
      {
        id: 'challenges',
        title: 'Challenges / Gamification',
        content: `Make building habits fun with these challenges:
• 7-Day Gratitude Challenge: Write 2 good things you're thankful for each day. Complete it to earn a Gratitude Star Badge ⭐! Track on your worksheet and celebrate with a small reward, like extra playtime

• Positive Self-Talk Week: Use your self-talk cards daily—stick them on your wall or desk. Tick off each time you use one. Finish the week to earn a Positive Thinker Badge!

👉 Challenges help you practice consistently and feel proud of your progress`,
        image: '/3. Healthy mind habbits/Challenges  Gamification.png'
      },
      {
        id: 'connections',
        title: 'Related Areas (Cross-links)',
        content: `Healthy mind habits connect to other parts of your life:
• Stress Management: Use positive self-talk or breathing from the Stress Management Guide to calm worries
• Peer Support: Share gratitude or reframed thoughts with friends to build stronger bonds
• Sleep & Relaxation: A positive mind helps you sleep better—try gratitude before bed to relax
👉 These habits work together to make you feel balanced and strong`,
        image: '/3. Healthy mind habbits/Related Areas (Cross-links).png'
      }
    ],
  },
  {
    id: 'focus-study-skill',
    title: 'Focus & Study Skill',
    imageUrl: '/Resource Images/Focus & Study Skill.png',
    introduction: 'Master the art of concentration and effective learning. Discover proven study techniques and focus strategies to help you retain information better and ace your exams with less stress.',
    sections: [
      {
        id: 'why-it-matters',
        title: 'Why It Matters',
        content: `Good study habits make learning feel less overwhelming and more manageable. When you focus well:
• You reduce exam stress by preparing steadily instead of cramming
• You learn faster because your brain stays sharp and remembers more
• You feel confident knowing you're in control of your studies
• You save time for fun activities like playing or hanging out with friends

For example, using short study sessions can help you tackle tough subjects like math without feeling tired, and a clear workspace can make homework feel easier.`,
        image: '/4. Focus & Study/Why It Matters.png'
      },
      {
        id: 'key-information',
        title: 'Study Techniques',
        content: `Here are simple techniques to improve your focus and study skills. Try one or two at a time and see what works best!

**Study Techniques**
• Pomodoro Method: Study for 25 minutes, then take a 5-minute break. Repeat 4 times, then take a longer break (15–20 minutes)
  Example: Study science for 25 minutes, then stretch or drink water for 5 minutes
  👉 Prevents burnout and keeps your brain fresh

• Chunking: Break big topics into small, easy parts
  Example: Instead of studying a whole history chapter, split it into 3 parts (dates, events, key people)
  👉 Makes big tasks feel doable

• Prioritization: Do hard or important subjects first when your mind is fresh. Save easier tasks for later
  Example: Tackle math in the morning, then move to English in the evening
  👉 Helps you finish tough work faster`,
        image: '/4. Focus & Study/Key Information - Study Techniques.png'
      },
      {
        id: 'distraction-reduction',
        title: 'Distraction Reduction',
        content: `**Distraction Reduction**
• Clean Workspace: Keep only what you need on your study table (books, notebook, water bottle). Remove toys, snacks, or extra items
  👉 A tidy space helps your mind stay clear

• Study Phone Box: Put your phone in a box or another room while studying. Check it only during breaks
  👉 Stops you from scrolling and losing focus

• Inform Family: Tell your parents or siblings your study hours (e.g., 5–6 PM) so they don't interrupt
  Example: Say, "I'm studying till 6 PM, please call me after"
  👉 Fewer interruptions mean better concentration`,
        image: '/4. Focus & Study/Distraction Reduction.png'
      },
      {
        id: 'interactive-tools',
        title: 'Interactive Tools',
        content: `**Interactive Tools**
• Focus Timers/Apps: Use free tools like Pomofocus.io, Forest app, or a simple stopwatch on your phone (set it and put it away!)
  👉 Tracks your 25-minute study sessions and reminds you to take breaks

• Readiness Checklist: Before starting, ask:
  ✔ Is my table clean and free of clutter?
  ✔ Do I have my books, pens, and water ready?
  ✔ Is my phone off or in another room?
  ✔ Is my study space quiet?
  👉 Checking these sets you up for success`,
        image: '/4. Focus & Study/Interactive Tools.png'
      },
      {
        id: 'challenges',
        title: 'Challenges',
        content: `**Challenges 🎯**
• 7-Day Focus Challenge: Log 2–3 Pomodoro sessions (25-minute study blocks) per day for 5 days
  Example: Study math for 2 Pomodoros and science for 1 Pomodoro daily
  Reward: Earn a Focus Pro Badge 🏅! Celebrate with a treat like watching a favorite show or eating a snack
  👉 Makes studying fun and keeps you motivated`,
        image: '/4. Focus & Study/Challenges.png'
      }
    ],
  },
  {
    id: 'peer-support-sharing',
    title: 'Peer Support & Sharing',
    imageUrl: '/Resource Images/Peer Support & Sharing.png',
    introduction: 'Learn how meaningful connections can enhance your mental well-being. Discover ways to build supportive relationships and create safe spaces for open conversations about mental health.',
    sections: [
      {
        id: 'why-it-matters',
        title: 'Why It Matters',
        content: `Strong friendships and peer support make you feel understood, less alone, and more confident. When you connect with friends:
• You reduce stress by sharing worries, like exam pressure or family issues
• You feel supported knowing someone listens and cares
• You build resilience to handle tough times, like arguments or school challenges
• You create joy by celebrating good moments together, like a festival or a good grade

For example, talking to a friend about a tough day can make it feel lighter, and listening to them can strengthen your bond.`,
        image: '/5. peer  support &sharing/Why It Matters.png'
      },
      {
        id: 'key-information',
        title: 'Effective Communication',
        content: `Here are simple ways to support your peers and build strong connections. Start with one or two tips and practice them regularly!

**Active Listening Techniques**
• Look at the person (eye contact shows you care)
• Nod or say "I understand" to show you're listening
• Don't interrupt—let them finish talking
• Ask kind questions, like "How did that make you feel?"
👉 Helps your friend feel heard and valued

**Using "I" Statements**
• Share feelings with "I" instead of blaming with "you"
• Example: Instead of "You ignored me," say "I felt left out when we didn't talk"
• This keeps conversations calm and respectful
👉 Reduces fights and helps you express yourself clearly

**Conflict Resolution Strategies**
• Stay calm and take deep breaths if upset
• Talk one-on-one in a quiet place, not in front of others
• Use "I" statements to explain your side
• Listen to their side and find a fair solution together
👉 Turns conflicts into teamwork and keeps friendships strong`,
        image: '/5. peer  support &sharing/Key Information.png'
      },
      {
        id: 'peer-support-formation',
        title: 'Peer Support Formation',
        content: `**Safe Ways to Join/Start Peer Groups**
• Talk to a teacher or counselor about starting a school mental health club or support group
• Invite friends who are kind and respectful to join
• Set rules, like "Listen without judging" and "Keep things private"
• Example: Start a "Study Buddy Club" where you share study tips and encourage each other
👉 Creates a safe space to talk and support each other

**Roles & Responsibilities**
• Listener: Focus on hearing others without giving quick advice
• Encourager: Say positive things, like "You're doing great!"
• Organizer: Plan meetings or check-ins (e.g., weekly chats)
• Boundary Keeper: Remind everyone to respect privacy and feelings
👉 Everyone has a role to make the group strong and safe

**Building Trust and Maintaining Boundaries**
• Never share someone's private story without permission
• Be kind, even if you disagree with someone
• If a friend shares something serious (like feeling very sad), guide them to a trusted adult, like a teacher or counselor
👉 Trust makes your group a safe place for everyone`,
        image: '/5. peer  support &sharing/Peer Support Formation.png'
      },
      {
        id: 'challenges',
        title: 'Challenges',
        content: `**Weekly Check-In Buddy Challenge**: Text or call a friend once a day for 5 days to ask, "How's your day going?" or "Anything fun happen?"
• Log your check-ins in a journal or app
• Reward: Earn a Supportive Buddy Badge! Celebrate with a small treat, like sharing a snack with your friend
👉 Builds stronger friendships and makes you both feel good

**Reflection Journal Challenge**: Write 1–2 sentences daily about how you gave or received support
• Example: "Today, I listened to my friend's worry about math and cheered them up"
• Complete for 7 days to earn a Kind Listener Badge 🎧!
👉 Helps you notice how support makes a difference`,
        image: '/5. peer  support &sharing/Challenges.png'
      }
    ],
  },
  {
    id: 'digital-wellness',
    title: 'Digital Wellness',
    imageUrl: '/Resource Images/Digital Wellness.png',
    introduction: 'Navigate the digital world mindfully and maintain healthy tech habits. Learn strategies to reduce screen time, improve online safety, and create a balanced relationship with technology.',
    sections: [
      {
        id: 'why-it-matters',
        title: 'Why It Matters',
        content: `Using phones, tablets, or computers in a balanced way helps you:
• Sleep Better: Less screen time before bed improves your rest
• Stay Focused: Fewer distractions help you study and enjoy hobbies
• Feel Happier: Avoiding negative online content lifts your mood
• Stay Safe: Knowing how to handle cyberbullying or protect your privacy keeps you secure

For example, cutting phone use before bed can help you sleep faster, and avoiding endless scrolling can give you time for fun activities like playing cricket or chatting with friends.`,
        image: '/6. digital wellness/Why It Matters.png'
      },
      {
        id: 'key-information',
        title: 'Screen Time Guidelines & Cyber Safety',
        content: `Here are simple tips to use technology wisely and stay safe online. Try one or two at a time to build healthy habits!

**Screen Time Guidelines**
• Set Healthy Limits: Aim for 1–2 hours of recreational screen time daily (not including schoolwork)
• Tech-Free Zones: Keep screens away during meals, family time, or 30–60 minutes before bed
• Turn Off Notifications: Silence non-important app alerts (like social media or games)

**Cyber Safety**
• Recognize Cyberbullying: Look out for mean messages, rumors, or hurtful comments online
• Use Privacy Settings: Set social media accounts to private and don't share personal details
• Positive Online Behavior: Post kind comments, avoid arguments, and think before sharing
👉 Builds a positive online community`,
        image: '/6. digital wellness/Key Information.png'
      },
      {
        id: 'coping-techniques',
        title: 'Coping Techniques',
        content: `**Mindful Pauses**: Take a 2–5 minute break from screens to stretch, breathe deeply, or look out a window
👉 Refreshes your mind and eyes

**Tech-Free Breaks**: Replace 15 minutes of scrolling with music, drawing, or a short walk
👉 Boosts creativity and reduces stress

**Digital Journaling**: Write how you feel after using screens (e.g., tired, happy, stressed). Reflect weekly to notice patterns
👉 Helps you understand how screens affect your mood

**Positive Replacements**: Swap doomscrolling (endless negative news) for podcasts, audiobooks, or uplifting videos
👉 Keeps your mood positive and inspired

**Connection Reset**: If online negativity (like arguments or bad news) affects you, talk to a friend or family member instead
👉 Reconnects you with real-world support`,
        image: '/6. digital wellness/Coping Techniques.png'
      },
      {
        id: 'interactive-tools',
        title: 'Interactive Tools',
        content: `**Screen Time Trackers**: Use apps like Google Digital Wellbeing, Forest, or a notebook to log daily screen time
👉 Helps you stay aware and in control

**Notification Management Challenges**: Check your phone settings and turn off 3–5 unnecessary app alerts
👉 Reduces distractions and interruptions

**Digital Wellness Quiz**: Answer questions like:
• Do I use screens less than 2 hours for fun daily?
• Do I avoid phones before bed?
• Do I feel stressed after social media?
👉 Helps you reflect on your habits`,
        image: '/6. digital wellness/Interactive Tools.png'
      },
      {
        id: 'challenges',
        title: 'Challenges',
        content: `**Digital Sunset Challenge**: No screens for 30 minutes before bedtime for 7 days
• Reward: Earn a Calm Evenings Badge 🌙!
👉 Improves sleep and calms your mind

**1-Hour Tech Swap Challenge**: Replace 1 hour of social media or gaming with a hobby, sport, or family activity daily for 5 days
• Reward: Earn a Balanced Day Badge 🌟!
👉 Adds fun and balance to your day

**Notification Cleanse Challenge**: Turn off 3 unnecessary app notifications for a week
• Reward: Earn a Focus Master Badge 🎯!
👉 Keeps your phone from pulling your attention`,
        image: '/6. digital wellness/Challenges.png'
      },
      {
        id: 'connections',
        title: 'Cross-Connections',
        content: `Digital wellness connects to other areas for a happier, healthier you:
• Sleep & Relaxation: Tech-free evenings help you sleep better and feel rested
• Focus & Study Skills: Fewer notifications improve study focus and productivity
• Peer Support: Encourage friends to join digital detox challenges for accountability
• Stress Management: Less screen overload lowers anxiety and boosts mood
• Healthy Mind Habits: Use positive replacements like uplifting videos to practice positive self-talk`,
        image: '/6. digital wellness/Cross-Connections.png'
      }
    ],
  },
  {
    id: 'growth-mindset-motivation',
    title: 'Growth Mindset & Motivation',
    imageUrl: '/Resource Images/Growth Mindset & Motivation.png',
    introduction: 'Develop resilience and a love for learning through the power of a growth mindset. Discover how to turn challenges into opportunities and maintain motivation in your academic and personal life.',
    sections: [
      {
        id: 'why-it-matters',
        title: 'Why It Matters',
        content: `A growth mindset means believing you can improve your skills with effort and practice, instead of thinking you're "just not good" at something. It helps you:
• Face Challenges: See tough tasks (like math problems or exams) as chances to grow, not failures
• Build Resilience: Bounce back from setbacks, like a bad grade, with a plan to do better
• Stay Motivated: Feel excited to learn for curiosity's sake, not just for marks or rewards
• Gain Confidence: Know that effort leads to progress, making you stronger over time

For example, if you struggle with science, a growth mindset helps you say, "I'll keep practicing," instead of "I'm bad at this." This mindset makes school, hobbies, and life more exciting!`,
        image: '/7. growth mindset &motivation/Why It Matters.png'
      },
      {
        id: 'key-information',
        title: 'Fixed vs. Growth Mindset & Reframing Failure',
        content: `Here are simple ways to build a growth mindset and stay motivated. Start with one or two tips and practice them regularly!

**Fixed vs. Growth Mindset**
• Fixed Mindset: Believing your skills or intelligence can't change
  Example: "I'm bad at math and always will be"
• Growth Mindset: Believing you can improve with effort and learning
  Example: "Math is hard, but I can get better with practice"
• How to Shift: Add "yet" to challenges. Instead of "I can't do this," say "I can't do this yet"
👉 Helps you see possibilities instead of limits

**Reframing Failure**
• Mistakes are learning opportunities, not proof you're "not good enough"
• Example: If you fail a quiz, think, "What can I learn from this?" instead of "I'm a failure"
• Steps:
  ○ Look at what went wrong (e.g., "I didn't revise chapter 3")
  ○ Make a small plan (e.g., "I'll study that chapter tomorrow")
  ○ Try again with effort
👉 Turns setbacks into steps forward`,
        image: '/7. growth mindset &motivation/Key Information.png'
      },
      {
        id: 'self-reflection',
        title: 'Self-Reflection & Motivation Drivers',
        content: `**Self-Reflection**
Reflect on your strengths and areas to grow to understand yourself better.
Steps:
• Write one thing you're good at (e.g., "I'm great at writing stories")
• Write one thing you want to improve (e.g., "I want to get better at math")
• Plan one small step (e.g., "I'll practice 5 math problems daily")
👉 Helps you set goals and track progress

**Motivation Drivers**
• Intrinsic Motivation: Doing something because you enjoy it or want to learn
• Extrinsic Motivation: Doing something for rewards, like grades or praise
• Balance Both: Focus on curiosity (intrinsic) but use small rewards (extrinsic) to stay excited
👉 Keeps you motivated for the right reasons`,
        image: '/7. growth mindset &motivation/Self-Reflection.png'
      },
      {
        id: 'interactive-tools',
        title: 'Interactive Tools',
        content: `**Mindset Journals**: Use daily prompts to reflect on growth
Examples:
• "One challenge I faced today and what I learned"
• "One thing I'm proud of and why"
👉 Builds a habit of positive reflection

**Reframing Game**: Turn negative statements into growth mindset ones
Example: Change "I'm terrible at drawing" to "I'm learning to draw better every day"
Play with friends or alone to practice
👉 Makes reframing fun and easy

**Motivation Tracker**: Set weekly mini-goals (e.g., "Read 1 chapter") and log progress
Example: Check off each day you meet your goal
👉 Keeps you excited about small wins`,
        image: '/7. growth mindset &motivation/Interactive Tools.png'
      },
      {
        id: 'challenges',
        title: 'Challenges',
        content: `**"Yet" Challenge**: For 7 days, replace "I can't" with "I can't yet" whenever you face a tough task
• Example: Instead of "I can't solve this equation," say "I can't solve it yet, but I'll try a few more times"
• Reward: Earn a Persistence Star Badge 🌟!
👉 Trains your brain to stay positive

**Motivation Checkpoints Challenge**: Reflect weekly on one goal, one effort, and one thing you're grateful for
• Example: "Goal: Finish science homework. Effort: Studied 25 minutes daily. Gratitude: My friend helped me understand"
• Complete for 4 weeks to earn a Growth Champion Badge 🏆!
👉 Keeps you motivated and thankful`,
        image: '/7. growth mindset &motivation/Challenges.png'
      },
      {
        id: 'cross-links',
        title: 'Cross-Links',
        content: `A growth mindset connects to all these areas for a stronger, happier you:
• Focus & Study Skills: A growth mindset helps you persist with tough subjects using Pomodoro or chunking
• Resilience & Stress Management: Reframing failures reduces stress and builds coping skills
• Peer Support: Share growth mindset stories with friends to motivate each other
• Healthy Mind Habits: Use positive self-talk and gratitude to reinforce a growth mindset
• Sleep & Relaxation: A rested brain supports motivation and learning`,
        image: '/7. growth mindset &motivation/Cross-Links.png'
      }
    ],
  },
  {
    id: 'values-citizenship-education',
    title: 'Values and Citizenship Education',
    imageUrl: '/Resource Images/Values and Citizenship Education.png',
    introduction: 'Learn the importance of values and citizenship in shaping a better society. Discover how to develop a strong moral compass, respect diversity, and contribute positively to your community.',
    sections: [
      {
        id: 'why-it-matters',
        title: 'Why It Matters',
        content: `Values and citizenship education shape you into a kind, responsible, and active member of your community. It helps you:
• Build Character: Practice respect, empathy, and honesty in daily life
• Promote Unity: Celebrate India's diverse cultures, religions, and traditions
• Reduce Conflict: Use values to solve problems calmly and fairly
• Contribute Positively: Make a difference through small acts like helping peers or keeping your school clean
• Be a Digital Citizen: Stay safe and respectful online, avoiding harm like cyberbullying

For example, showing respect to a classmate from a different background or picking up litter during a Swachh Bharat drive makes you a better citizen and strengthens your community.`,
        image: '/8. values and citizenship education/Why It Matters.png'
      },
      {
        id: 'core-values',
        title: 'Core Values',
        content: `Here are simple ways to practice core values and become a great citizen. Start with one or two tips and try them daily!

**Core Values**
• Respect: Treat yourself, peers, teachers, parents, and community with kindness, regardless of differences
• Responsibility: Own your actions, like completing homework, keeping your space clean, or behaving well online
• Empathy: Try to understand how others feel, especially when they're upset or struggling
• Honesty: Be truthful in your words and actions, like not cheating in tests or lying to friends
• Service (Seva): Help your community through small acts, like volunteering or raising awareness

**Additional Values:**
• Ahimsa (Non-violence): Avoid harming others with words or actions
• Satya (Truthfulness): Always aim to be honest, even when it's hard
• Swachhata (Cleanliness): Keep your surroundings clean, like not littering
• Nishkam Karma (Selfless Action): Do good without expecting rewards
• Shanti (Peace): Stay calm and spread positivity
• Tolerance: Accept others' beliefs and differences
• Gender Equality: Treat everyone equally, regardless of gender`,
        image: '/8. values and citizenship education/Core Values.png'
      },
      {
        id: 'good-citizenship',
        title: 'Good Citizenship in India',
        content: `**Constitutional Values**: Follow principles like justice, equality, liberty, and fraternity from the Indian Constitution
Example: Treat all classmates fairly, no matter their caste, religion, or background
👉 Builds a united community

**Civic Duties:**
• Respect the national flag, anthem, and symbols
• Care for the environment (e.g., save water, plant trees)
• Celebrate India's diversity by learning about different cultures and festivals
👉 Shows pride in being Indian

**Community Participation**: Join school clubs, National Service Scheme (NSS), National Cadet Corps (NCC), or Swachh Bharat activities
👉 Makes a real difference in your community

**Digital Citizenship**: Be safe and respectful online
• Use privacy settings to protect yourself
• Avoid sharing or liking harmful posts
• Report cyberbullying to a trusted adult or platform
👉 Keeps the internet a positive place`,
        image: '/8. values and citizenship education/Good Citizenship in India.png'
      },
      {
        id: 'key-information',
        title: 'Coping Techniques & Interactive Tools',
        content: `**Value-Based Decision Making**: Before acting, ask, "Is this respectful, honest, and responsible?"
👉 Helps you make ethical choices

**Conflict Resolution**: Use empathy and active listening to solve disagreements
👉 Keeps friendships strong

**Role-Modeling**: Show values in small daily acts
👉 Inspires others to do the same

**Interactive Tools**
**Values Quiz**: Answer questions to reflect on your actions
Examples:
• "Did I respect someone's opinion today?"
• "Did I help someone without expecting anything back?"
👉 Helps you see how you practice values

**Decision Scenarios**: Practice solving moral dilemmas
👉 Builds confidence in ethical decisions`,
        image: '/8. values and citizenship education/Key Information.png'
      }
    ],
  },
  {
    id: 'physical-wellness-nutrition',
    title: 'Physical Wellness & Nutrition',
    imageUrl: '/Resource Images/Physical wellness & Nutrition.png',
    introduction: 'Learn how to fuel your body with a balanced diet and maintain a healthy lifestyle. Discover the importance of nutrition, exercise, and wellness practices for optimal physical and mental well-being.',
    sections: [
      {
        id: 'why-it-matters',
        title: 'Why It Matters',
        content: `A healthy body supports a healthy mind! Physical wellness and good nutrition help you:
• Boost Mood: Exercise and healthy foods make you feel happier and less stressed
• Increase Energy: A balanced diet and movement give you stamina for school and play
• Improve Focus: Good health sharpens your brain for studies and exams
• Grow Strong: Proper nutrition and rest support your body's growth during teenage years

For example, eating a balanced breakfast like poha with veggies can fuel your morning classes, and a quick walk or yoga session can help you feel calm before a test.`,
        image: '/9. physical wellness nutrition/Why It Matters.png'
      },
      {
        id: 'balanced-diet',
        title: 'Balanced Diet Basics',
        content: `Here are simple ways to stay physically healthy and eat well. Start with one or two tips and practice them daily!

**Indian Plate Method**: Fill your plate with:
• ½ Fruits & Vegetables: Include colorful options like spinach, carrots, tomatoes, bananas, or mangoes
• ¼ Whole Grains: Choose roti, brown rice, millets (bajra, ragi), or whole-wheat bread
• ¼ Protein: Eat dal, pulses, eggs, paneer, or lean meat like chicken
👉 Gives your body all the nutrients it needs

**Hydration**: Drink 6–8 glasses of water daily (about 1.5–2 liters)
👉 Keeps you energized and focused

**Limit Unhealthy Foods**: Cut down on packaged foods (chips, instant noodles), sugary drinks (cola, packaged juice), and fried items (pakoras, samosas)
👉 Reduces tiredness and health risks`,
        image: '/9. physical wellness nutrition/Balanced Diet Basics.png'
      },
      {
        id: 'healthy-snacking',
        title: 'Healthy Snacking for Students',
        content: `**Healthy Snacking for Students**
Choose nutritious snacks like:
• Nuts (almonds, peanuts), fruits (apples, guava), sprouts, boiled corn, or roasted chana
👉 Keeps you full and energized without sugar crashes

Avoid excessive chips, candies, or fast food like burgers
• If you crave something sweet, try a banana or dates instead of candy
👉 Supports steady energy and better health`,
        image: '/9. physical wellness nutrition/Healthy Snacking for Students.png'
      },
      {
        id: 'exercise-movement',
        title: 'Exercise & Movement',
        content: `**Exercise & Movement**
Aim for 30–45 minutes of activity daily (60 minutes is even better!)
• Options: Yoga, skipping rope, cycling, brisk walking, dancing, or sports like cricket or badminton
👉 Boosts mood, energy, and brainpower

**Desk Stretches**: During study breaks, try simple stretches:
• Stretch arms overhead for 30 seconds
• Roll shoulders 5 times backward and forward
• Touch your toes for 10 seconds
👉 Relieves tension and keeps you flexible`,
        image: '/9. physical wellness nutrition/Exercise & Movement.png'
      },
      {
        id: 'sleep-hygiene',
        title: 'Sleep Hygiene',
        content: `**Sleep Hygiene**
• Get 8–9 hours of quality sleep nightly for school-age teens
👉 Helps your brain and body recharge

• Avoid screens (phone, TV) 1 hour before bed to sleep better
👉 Calms your mind for deeper sleep

• Keep consistent sleep and wake times, even on weekends
👉 Makes waking up easier and improves energy`,
        image: '/9. physical wellness nutrition/Sleep Hygiene.png'
      },
      {
        id: 'coping-techniques',
        title: 'Coping Techniques',
        content: `**Stress Release with Movement**: When stressed, do 5–10 minutes of stretching, dancing, or walking
👉 Releases stress and lifts your mood

**Energy Boost Foods**: Choose bananas, dry fruits, or buttermilk instead of energy drinks or sugary snacks
👉 Fuels your body naturally

**Breathing with Posture**: Sit upright, take 3 deep belly breaths (inhale 4 seconds, exhale 6 seconds)
👉 Improves concentration and calmness

**Mindful Eating**: Eat slowly without phone or TV distractions, noticing flavors and hunger cues
👉 Helps you eat the right amount and enjoy food more`,
        image: '/9. physical wellness nutrition/Coping Techniques.png'
      },
      {
        id: 'key-information',
        title: 'Interactive Tools & Challenges',
        content: `**Interactive Tools**
• Daily Wellness Tracker: Tick off meals, water intake, exercise, and sleep daily
• Meal Planning Chart: Plan weekly meals with Indian foods (e.g., dal, roti, veggies)
• Mini Fitness Challenge: Follow a 7-day yoga or stretch routine (e.g., 10 min daily)

**Challenges**
• 7-Day Move & Eat Healthy Challenge: For 7 days, do 30 minutes of activity and eat one balanced meal daily
  Reward: Earn a Strong & Smart Badge 💪!
• Hydration Hero Challenge: Drink 6–8 glasses of water daily for 5 days
  Reward: Earn a Hydration Star Badge 💧!`,
        image: '/9. physical wellness nutrition/Key Information.png'
      }
    ],
  },
  {
    id: 'when-to-ask-for-help',
    title: 'When to Ask for Help',
    imageUrl: '/Resource Images/When to Ask for Help.png',
    introduction: 'Asking for help is a sign of strength, not weakness. Learn when to seek support, who to ask, and how to start the conversation confidently.',
    sections: [
      {
        id: 'why-it-matters',
        title: 'Why It Matters',
        content: `Asking for help is a sign of strength, not weakness. It helps you:
• Feel Less Alone: Sharing worries with someone trusted lifts a weight off your shoulders
• Solve Problems Early: Getting help prevents small issues (like stress or confusion) from becoming big ones
• Build Resilience: Learning to ask for support makes you stronger for future challenges
• Stay Connected: Talking to others keeps you close to friends, family, and mentors

For example, asking a teacher for help with a tough subject like math can improve your understanding, and talking to a friend about feeling stressed can make you feel supported.`,
        image: '/10. ask for help/Why It Matters.png'
      },
      {
        id: 'key-information',
        title: 'Knowing When to Ask & Who to Ask',
        content: `Here are simple ways to recognize when you need help, who to ask, and how to start the conversation. Try one tip at a time to build confidence!

**Knowing When to Ask**
Look for signs that you might need support:
• Feeling Overwhelmed: Stress or worries feel too big to handle alone
• Grades Dropping: Struggling with schoolwork or not understanding lessons
• Mood Changes: Feeling sad, anxious, or hopeless for days or weeks
• Sleep or Eating Problems: Trouble sleeping, eating too little, or eating too much
• Withdrawing: Avoiding friends, family, or activities you usually enjoy
👉 It's okay to ask for help even if you're not sure it's a "big problem." Small steps count!

**Who to Ask**
You have many people who can support you:
• Trusted Adults: Parents, teachers, school counselors, or a favorite aunt/uncle
• Peers: Friends or classmates who are kind and good listeners
• Professionals: School counselors, doctors, or helplines for bigger concerns
• India-Specific Resources:
  ○ Childline India: Call 1098 (free, 24/7) for any worry or problem
  ○ NIMHANS Helpline: Call 080-46110007 for mental health support`,
        image: '/10. ask for help/Key Information.png'
      },
      {
        id: 'interactive-tools',
        title: 'How to Ask & Interactive Tools',
        content: `**How to Ask**
• Be Clear: Say what you're struggling with in simple words
• Use Simple Phrases: Try these openers:
  ○ "Can you help me with…?"
  ○ "I'm feeling stuck. Can we talk?"
  ○ "I need some advice about…"
• Prepare Questions: If talking to a counselor or teacher, write down what you want to ask
👉 It's okay if you feel nervous—starting the conversation is the brave part!

**Interactive Tools**
• Role-Play Scripts: Practice asking for help in a safe classroom setting
• Confidence Builder: A step-by-step guide to ask for help:
  1. Start with a friend: "I'm stressed about school. Can we chat?"
  2. Try a teacher: "I need help understanding this chapter"
  3. Reach out to a counselor: "I've been feeling sad a lot. Can we talk?"
• Helpline Directory: A list of school-approved or regional resources`,
        image: '/10. ask for help/Interactive Tools.png'
      },
      {
        id: 'challenges',
        title: 'Challenges & Cross-Connections',
        content: `**Challenges**
• Weekly Check-In Challenge: Ask for help once during the week and write what happened
  Reward: Earn a Brave Step Badge 🌟!
• Normalize Help Wall: Write an anonymous note about what you asked help for and how it helped
  Complete to earn a Support Seeker Badge!
👉 Shows everyone that asking for help is normal and helpful

**Cross-Connections**
Asking for help connects to all these areas for a stronger, happier you:
• Peer Support: Asking friends for help builds stronger bonds
• Stress Management: Seeking help early reduces stress and anxiety
• Healthy Mind Habits: Asking for support aligns with positive self-talk and gratitude
• Growth Mindset: Viewing help as a strength supports persistence
• Focus & Study Skills: Asking for academic help improves focus and learning
• Digital Wellness: Seeking help for online issues promotes safe digital habits`,
        image: '/10. ask for help/Challenges.png'
      },
      {
        id: 'cross-connections',
        title: 'Cross-Connections',
        content: `Asking for help connects to all these areas for a stronger, happier you:
• Peer Support: Asking friends for help (from this guide) builds stronger bonds (from the Peer Support Guide)
• Stress Management: Seeking help early (from this guide) reduces stress and anxiety (from the Stress Management Guide)
• Healthy Mind Habits: Asking for support (from this guide) aligns with positive self-talk and gratitude (from the Healthy Mind Guide)
• Growth Mindset: Viewing help as a strength (from this guide) supports persistence (from the Growth Mindset Guide)
• Focus & Study Skills: Asking for academic help (from this guide) improves focus and learning (from the Focus Guide)
• Digital Wellness: Seeking help for online issues (from this guide) promotes safe digital habits (from the Digital Wellness Guide)`,
        image: '/10. ask for help/Cross-Connections.png'
      }
    ],
  },
];
