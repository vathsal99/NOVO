import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Heart, Phone, AlertTriangle, Users, FileText, ArrowRight, X, Globe } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import CyberbullyingSlideshow from "@/components/CyberbullingSlideshow";
import CSASlideshow from "@/components/CSASlideshow";
import AdultCSASlideshow from "@/components/AdultCSASlideshow";
import QuizModal from "@/components/QuizModal";
import { cyberbullyingQuizQuestions } from "@/data/cyberbullyingQuiz";
import { csaQuizQuestions } from "@/data/csaQuiz";
import { adultQuizQuestions } from "@/data/adultquiz"; 
import FeedbackModal from "@/components/feedback/FeedbackModal"; 

// Set the page title when the component mounts
const usePageTitle = (title: string) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = title;
    
    // Reset the title when the component unmounts
    return () => {
      document.title = originalTitle;
    };
  }, [title]);
};

// Add styles for the highlight animation
const highlightStyles = `
  @keyframes highlight-pulse {
    0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
    70% { box-shadow: 0 0 0 10px rgba(99, 102, 241, 0); }
    100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
  }
  
  .highlight-section {
    position: relative;
    animation: highlight-pulse 2s ease-out;
    border-radius: 0.5rem;
  }
`;

// Add the styles to the document head
const styleElement = document.createElement('style');
styleElement.textContent = highlightStyles;
document.head.appendChild(styleElement);

const MasoomPage = () => {
  // Update the page title
  usePageTitle('Masoom – Novo Wellness');
  type ContentType = 'cyberbullying' | 'csa' | 'adult';
  
  const [activeTab, setActiveTab] = useState<'cyberbullying' | 'csa' | 'adult'>('cyberbullying');
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFeedback, setShowFeedback] = useState<{show: boolean, type: 'adult' | 'csa' | 'cyberbullying', language: 'en' | 'hi'}>({show: false, type: 'cyberbullying', language: 'en'});
  const adultSectionRef = useRef<HTMLDivElement>(null);

  // Handle scroll to section when component mounts or hash changes
  useEffect(() => {
    const hash = window.location.hash;
    
    const scrollToSection = (sectionId: string) => {
      // Set active tab based on section
      if (sectionId.includes('cyberbullying')) setActiveTab('cyberbullying');
      else if (sectionId.includes('csa')) setActiveTab('csa');
      else if (sectionId.includes('adult')) setActiveTab('adult');
      
      // Function to attempt scrolling
      const attemptScroll = (attempts: number) => {
        if (attempts <= 0) return;
        
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            // Scroll smoothly to the element with an offset
            const headerOffset = 100; // Adjust this value to prevent the section from being hidden behind a fixed header
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            // Add a visual indicator that we've scrolled to the section
            element.classList.add('highlight-section');
            setTimeout(() => {
              element.classList.remove('highlight-section');
            }, 2000);
          } else {
            // If element not found, try again after a delay
            attemptScroll(attempts - 1);
          }
        }, 300); // Try every 300ms
      };
      
      // Start with 5 attempts (1.5 seconds total)
      attemptScroll(5);
    };

    // Initial scroll on mount
    if (hash) {
      const sectionId = hash.substring(1); // Remove the '#' from the hash
      scrollToSection(sectionId);
    }

    // Add hash change listener
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash) {
        const sectionId = newHash.substring(1);
        scrollToSection(sectionId);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleOpenQuiz = (type: ContentType) => {
    setShowQuiz(true);
    setActiveTab(type);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  const getQuizQuestions = (type: ContentType) => {
    switch (type) {
      case 'cyberbullying':
        return cyberbullyingQuizQuestions;
      case 'csa':
        return csaQuizQuestions;
      case 'adult':
        return adultQuizQuestions;
      default:
        return [];
    }
  };

  const handleOpenSlideshow = (type: ContentType) => {
    setShowSlideshow(true);
    setActiveTab(type);
  };

  const handleCloseSlideshow = () => {
    setShowSlideshow(false);
  };

  const handleOpenFeedback = (type: 'adult' | 'csa' | 'cyberbullying') => {
    console.log('Opening feedback form for type:', type);
    // Create a completely new state object to ensure React detects the change
    setShowFeedback({
      show: true,
      type: type, // Explicitly set the type from the parameter
      language: 'en'
    });
    
    // Log the current state for debugging
    console.log('Updated showFeedback state to:', {
      show: true,
      type: type,
      language: 'en'
    });
  };

  const handleCloseFeedback = () => {
    setShowFeedback(prev => ({...prev, show: false}));
  };

  // Function to navigate to Hindi version
  const navigateToHindi = () => {
    window.location.href = '/masoom-hi';
  };
  
  // Function to navigate to English version (for consistency)
  const navigateToEnglish = () => {
    window.location.href = '/masoom';
  };

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  const CyberbullyingContent = () => (
    <div className="space-y-8">
      {/* Language Toggle */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center bg-white rounded-full p-1 shadow-md">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 bg-blue-600 text-white"
            disabled
          >
            English
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 text-gray-700 hover:bg-gray-100"
            onClick={navigateToHindi}
          >
            हिंदी
          </button>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cyberbullying</h1>
        <p className="text-xl text-blue-600 mb-6">Learn how to stay safe online</p>
        
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md text-left">
          <p className="text-gray-700 text-lg mb-6">
            Learn about online safety, cyberbullying, and how to protect yourself from digital threats. 
            Understand what to do if someone is mean to you online.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button 
              onClick={() => handleOpenSlideshow('cyberbullying')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg"
            >
              Learn More
            </Button>
            <Button 
              onClick={(e) => {
                console.log('Cyberbullying feedback button clicked', e.currentTarget);
                handleOpenFeedback('cyberbullying');
              }}
              variant="outline"
              className="border-blue-600 text-blue-600 px-6 py-3 text-lg"
              data-feedback-type="cyberbullying"
            >
              Feedback Form
            </Button>
          </div>
        </div>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">What is Cyberbullying?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 leading-relaxed mb-4">
            Cyberbullying is when someone uses phones, computers, or social media to hurt, 
            embarrass, or scare another person. Remember: <strong>Bullying is usually done by someone you know!</strong>
          </p>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Sending mean messages or comments
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Sharing embarrassing photos or videos without permission
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Spreading rumors or lies online
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              Excluding someone from online groups on purpose
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-xl text-orange-900">Online Threats You Should Know</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Cyber Grooming</h4>
              <p className="text-sm text-orange-700 mb-2">When strangers build fake trust to harm you</p>
              <ul className="text-xs text-orange-600 space-y-1">
                <li>• Constant chatting and attention</li>
                <li>• Asking for personal information</li>
                <li>• Wanting to keep conversations secret</li>
                <li>• Asking for photos or videos</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded border border-orange-200">
              <h4 className="font-semibold text-orange-800 mb-2">Phishing Tricks</h4>
              <p className="text-sm text-orange-700 mb-2">Fake messages to steal your information</p>
              <ul className="text-xs text-orange-600 space-y-1">
                <li>• <strong>Phishing:</strong> Fake emails/websites</li>
                <li>• <strong>Smishing:</strong> Fake text messages</li>
                <li>• <strong>Vishing:</strong> Fake phone calls</li>
                <li>• <strong>Catfishing:</strong> Fake online profiles</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Simple Safety Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-800 mb-3">✅ DO</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Only chat with real-life friends
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Tell a trusted adult if something feels wrong
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Keep passwords private
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Block and report mean people
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">✓</span>
                  Think before you post anything
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-red-800 mb-3">❌ DON'T</h4>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  Share personal information (full name, address, school)
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  Meet strangers from the internet
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  Open emails from unknown people
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  Respond to cyberbullies (just block them)
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2">✗</span>
                  Download unknown files or apps
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">Remember This!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4 bg-white rounded border border-purple-200">
            <p className="text-purple-800 font-medium mb-2">
              🌐 The Internet is like a public place - not everything you see is real!
            </p>
            <p className="text-purple-700">
              Just like you wouldn't talk to strangers in real life, don't trust strangers online.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-xl text-red-900 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Get Help Now
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Childline India", number: "1098", desc: "24/7 help for children in trouble" },
              { name: "Emergency Services", number: "112", desc: "Police, Fire, Medical Emergency" },
              { name: "Cyber Crime Helpline", number: "1930", desc: "Report online crimes and bullying" }
            ].map((contact, index) => (
              <div key={index} className="p-3 bg-white rounded border border-red-200">
                <div className="font-medium text-red-800">{contact.name}</div>
                <div className="text-sm text-red-600 mb-2">{contact.desc}</div>
                <Button
                  size="sm"
                  onClick={() => handleCall(contact.number)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Call {contact.number}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded border border-red-200">
            <p className="text-sm text-red-700">
              <strong>Report Online Crimes:</strong> Visit <a href="https://cybercrime.gov.in" target="_blank" rel="noopener noreferrer" className="underline">cybercrime.gov.in</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const CSAContent = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Child Sexual Abuse</h1>
        <p className="text-xl text-purple-600 mb-6">Important safety information for children</p>
        
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md text-left">
          <p className="text-gray-700 text-lg mb-6">
            Learn about body safety, how to recognize inappropriate behavior, and what to do if someone makes you uncomfortable. 
            Know your rights and how to get help.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button 
              onClick={() => handleOpenSlideshow('csa')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg"
            >
              Learn More
            </Button>
            <Button
              onClick={() => handleOpenFeedback('csa')}
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 text-lg"
            >
              Feedback Form
            </Button>
          </div>
        </div>
      </div>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">What is Child Sexual Abuse?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-800 leading-relaxed mb-4">
            CSA is when an adult or older person does sexual things with a child. This is wrong and against the law.
            <strong> Important: It usually happens with people you know, not strangers!</strong>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Key Facts</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Both girls AND boys can be victims</li>
                <li>• 85% happens with people you know</li>
                <li>• Most vulnerable ages: 3-8 and 11-15 years</li>
                <li>• Many children don't report it (53% keep it secret)</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Types of Abuse</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• <strong>Contact:</strong> Inappropriate touching</li>
                <li>• <strong>Non-contact:</strong> Showing inappropriate pictures</li>
                <li>• <strong>Online:</strong> Sending inappropriate messages</li>
                <li>• <strong>Grooming:</strong> Building fake trust to harm</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="text-xl text-orange-900">Warning Signs - Tell a Trusted Adult If You Notice These</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">How You Might Feel</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Sudden fears or anxiety</li>
                <li>• Not wanting to be touched</li>
                <li>• Feeling sad or angry often</li>
                <li>• Problems sleeping</li>
                <li>• Not wanting to go to school</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">Physical Signs</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Pain in private areas</li>
                <li>• Frequent stomach aches</li>
                <li>• Eating too much or too little</li>
                <li>• Problems walking or sitting</li>
                <li>• Getting sick often</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-orange-800 mb-2">Behavior Changes</h4>
              <ul className="text-sm text-orange-700 space-y-1">
                <li>• Becoming very quiet or aggressive</li>
                <li>• Not wanting to be around certain people</li>
                <li>• Having "secrets" they can't tell</li>
                <li>• Acting much older or younger</li>
                <li>• Hurting themselves</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-xl text-green-900">Body Safety Rules - What Every Child Should Know</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">Your Body Belongs to YOU!</h4>
              <ul className="text-green-700 space-y-2">
                <li>• You have the right to say "NO" to unwanted touch</li>
                <li>• Trust your feelings - if something feels wrong, it probably is</li>
                <li>• No one should touch your private parts</li>
                <li>• No one should ask you to touch their private parts</li>
                <li>• You should never keep "body secrets"</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3">If Someone Makes You Uncomfortable</h4>
              <ul className="text-green-700 space-y-2">
                <li>• Say "NO" loudly and clearly</li>
                <li>• Get away from that person</li>
                <li>• Tell a trusted adult immediately</li>
                <li>• Keep telling until someone believes you</li>
                <li>• Remember: It's NEVER your fault!</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">POCSO Act - Your Legal Protection</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-purple-800 mb-4">
            The POCSO Act 2012 protects ALL children under 18 years from sexual abuse.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">What it Covers</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Sexual assault (3-5 years punishment)</li>
                <li>• Severe sexual assault (7 years to life)</li>
                <li>• Sexual harassment (3 years)</li>
                <li>• Child pornography (5-7 years)</li>
              </ul>
            </div>
            <div className="p-3 bg-white rounded border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">Your Rights</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Police must help you</li>
                <li>• Your identity stays private</li>
                <li>• You can give statements at home</li>
                <li>• The court will believe you</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-yellow-200 bg-yellow-50">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <strong>Remember:</strong> If someone hurts you or makes you uncomfortable, it's NOT your fault! 
          Tell a trusted adult like your parents, teacher, or school counselor. Keep telling until someone helps you.
        </AlertDescription>
      </Alert>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-xl text-red-900 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Emergency Helplines - Save These Numbers!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Childline India", number: "1098", desc: "24/7 helpline for children" },
              { name: "Emergency Services", number: "112", desc: "Police, Fire, Medical Emergency" },
              { name: "Women Helpline", number: "181", desc: "Support for harassment and abuse" },
              { name: "Police Helpline", number: "100", desc: "Report crimes immediately" }
            ].map((contact, index) => (
              <div key={index} className="p-3 bg-white rounded border border-red-200">
                <div className="font-medium text-red-800">{contact.name}</div>
                <div className="text-sm text-red-600 mb-2">{contact.desc}</div>
                <Button
                  size="sm"
                  onClick={() => handleCall(contact.number)}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Call {contact.number}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded border border-red-200">
            <p className="text-sm text-red-700">
              <strong>POCSO Portal:</strong> Visit <a href="https://pocso.ncpcrweb.in" target="_blank" rel="noopener noreferrer" className="underline">pocso.ncpcrweb.in</a> to report abuse
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-xl text-blue-900">Our Promise to You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center p-6 bg-white rounded border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-4">WE PLEDGE TO KEEP CHILDREN SAFE BY:</h3>
            <div className="text-blue-700 space-y-2">
              <p>• Teaching you about personal safety</p>
              <p>• Listening to you when you need help</p>
              <p>• Making sure your school and neighborhood are safe</p>
              <p>• Supporting any child who needs help</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const AdultCSAContent = () => (
    <div ref={adultSectionRef} id="adult-csa-section" className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Adult CSA Awareness</h1>
        <p className="text-xl text-indigo-600 mb-6">Protecting Children: Educating Adults About Child Sexual Abuse</p>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md text-left">
          <p className="text-gray-700 text-lg">
            Gain the knowledge and tools to recognize, prevent, and respond to child sexual abuse. Learn how abuse happens, its warning signs, and how to create safe environments for children through informed, proactive adult action.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Button 
              onClick={() => handleOpenSlideshow('adult')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg"
            >
              Learn More
            </Button>
            <Button
              onClick={() => handleOpenFeedback('adult')}
              variant="outline"
              className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 text-lg"
            >
              Feedback Form
            </Button>
          </div>
        </div>
      </div>

      <Card className="border-indigo-200 bg-indigo-50">
        <CardHeader>
          <CardTitle className="text-xl text-indigo-900">Understanding Adult Survivors</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-indigo-800 leading-relaxed mb-4">
            Childhood sexual abuse can have lasting effects into adulthood. Many survivors experience 
            emotional, psychological, and physical impacts that continue throughout their lives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-2">Common Long-term Effects</h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Anxiety, depression, or PTSD</li>
                <li>• Difficulty with trust and relationships</li>
                <li>• Low self-esteem and self-blame</li>
                <li>• Physical health issues</li>
                <li>• Substance abuse or addiction</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded border border-indigo-200">
              <h4 className="font-semibold text-indigo-800 mb-2">Healing and Recovery</h4>
              <ul className="text-sm text-indigo-700 space-y-1">
                <li>• Therapy and counseling</li>
                <li>• Support groups for survivors</li>
                <li>• Self-care practices</li>
                <li>• Setting healthy boundaries</li>
                <li>• Learning to trust again</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-xl text-purple-900">How to Support a Survivor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Do:</h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• <strong>Listen</strong> without judgment</li>
                <li>• <strong>Believe</strong> them</li>
                <li>• <strong>Respect</strong> their pace of healing</li>
                <li>• <strong>Offer</strong> ongoing support</li>
                <li>• <strong>Encourage</strong> professional help</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-800 mb-2">Don't:</h4>
              <ul className="text-sm text-purple-700 space-y-2">
                <li>• Ask for details about the abuse</li>
                <li>• Blame or question their actions</li>
                <li>• Pressure them to "get over it"</li>
                <li>• Share their story without permission</li>
                <li>• Try to be their therapist</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-xl text-red-900 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Support Services for Adult Survivors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { 
                name: "iCALL Psychosocial Helpline", 
                number: "9152987821", 
                desc: "Mental health support for adults (Mon-Sat, 10AM-8PM)" 
              },
              { 
                name: "Snehi Mental Health Helpline", 
                number: "+91-11-40769002", 
                desc: "Emotional support for survivors" 
              },
              { 
                name: "RAHI Foundation", 
                number: "+91-11-41654002", 
                desc: "Support for women survivors of childhood sexual abuse" 
              },
              { 
                name: "VIMHANS Helpline", 
                number: "+91-11-26963892", 
                desc: "Professional mental health support" 
              }
            ].map((contact, index) => (
              <div key={index} className="p-3 bg-white rounded border border-red-200">
                <div className="font-medium text-red-800">{contact.name}</div>
                <div className="text-sm text-red-600 mb-2">{contact.desc}</div>
                <Button
                  size="sm"
                  onClick={() => handleCall(contact.number.replace(/\D/g, ''))}
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  Call {contact.number}
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white rounded border border-red-200">
            <p className="text-sm text-red-700">
              <strong>Online Support:</strong> Visit <a href="https://www.rainn.org/" target="_blank" rel="noopener noreferrer" className="underline">RAINN.org</a> or 
              <a href="https://www.1in6.org/" target="_blank" rel="noopener noreferrer" className="underline ml-2">1in6.org</a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const getSlideshowComponent = (type: 'cyberbullying' | 'csa' | 'adult'): React.ComponentType<{ onClose: () => void }> => {
    switch (type) {
      case 'cyberbullying':
        return CyberbullyingSlideshow;
      case 'csa':
        return CSASlideshow;
      case 'adult':
        return AdultCSASlideshow;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 relative">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Masoom Suraksha</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-white rounded-full p-1 shadow-md">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 bg-blue-600 text-white"
                  disabled
                >
                  English
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 text-gray-700 hover:bg-gray-100"
                  onClick={navigateToHindi}
                >
                  हिंदी
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-6xl mx-auto p-6 py-12">
        {/* Header with Logos */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'end', gap: '4rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/images/yi-logo.png" alt="Young Indians Logo" style={{ height: 60 }} />
            <span style={{ marginTop: 8, fontSize: 14, color: '#888', textAlign: 'center' }}></span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/images/masoom-logo.png" alt="Masoom Logo" style={{ height: 60 }} />
            <span style={{ marginTop: 8, fontSize: 14, color: '#888', textAlign: 'center' }}></span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src="/images/cii-logo.png" alt="CII Logo" style={{ height: 60 }} />
            <span style={{ marginTop: 8, fontSize: 14, color: '#888', textAlign: 'center' }}></span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">SAVE CHILDHOOD</h1>
        <h2 className="text-2xl font-semibold text-blue-600 mb-2 text-center">FIGHT AGAINST CHILD SEXUAL ABUSE & CYBERBULLYING</h2>

        <div className="space-y-8">
            {/* About Section */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  About Our Organizations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-white rounded border border-blue-200">
                    <h3 className="font-bold text-orange-600 mb-2">Young Indians (Yi)</h3>
                    <p className="text-sm text-gray-700">
                      Young Indians is the youth wing of CII. We are young leaders working to make India better 
                      by helping our communities and being responsible citizens.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded border border-blue-200">
                    <h3 className="font-bold text-blue-600 mb-2">MASOOM (Making Schools Safe)</h3>
                    <p className="text-sm text-gray-700">
                      MASOOM works to make schools safer for children. We teach about safety, prevent abuse, 
                      and help children who face problems like bullying or harassment.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded border border-blue-200">
                    <h3 className="font-bold text-purple-600 mb-2">CII</h3>
                    <p className="text-sm text-gray-700">
                      The Confederation of Indian Industry works with businesses and government to make India 
                      a better place for everyone to live and work.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mission Statement */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-green-900 flex items-center justify-center gap-2">
                  <span></span> Our Mission 
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="max-w-3xl">
                  <p className="text-green-800 leading-relaxed text-center text-lg">
                    Together, we work to keep children safe by teaching them about dangers, providing help when needed, 
                    and making sure every child can grow up in a safe environment where they can learn and be happy.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cyberbullying Card */}
              <Card id="cyberbullying-section" className="border-blue-200 bg-blue-50 relative">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-0">
                        <CardTitle className="text-2xl font-bold text-blue-900">Cyberbullying</CardTitle>
                      </div>
                      <p className="text-blue-700 text-lg">Learn how to stay safe online</p>
                    </div>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenFeedback('cyberbullying');
                      }}
                      variant="outline"
                      size="sm"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 text-sm px-3 h-8"
                      data-feedback-type="cyberbullying"
                    >
                      Feedback Form
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-800 mb-6">
                    Learn about online safety, cyberbullying, and how to protect yourself from digital threats. Understand what to do if someone is mean to you online.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenQuiz('cyberbullying');
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg flex-1 sm:flex-none"
                    >
                      Take Quiz
                    </Button>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSlideshow('cyberbullying');
                      }}
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-lg flex-1 sm:flex-none"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* CSA Card */}
              <Card id="csa-section" className="border-purple-200 bg-purple-50 relative">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-0">
                        <CardTitle className="text-2xl font-bold text-purple-900">Child Sexual Abuse</CardTitle>
                      </div>
                      <p className="text-purple-700 text-lg">Important safety information for children</p>
                    </div>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenFeedback('csa');
                      }}
                      variant="outline"
                      size="sm"
                      className="border-purple-600 text-purple-600 hover:bg-purple-50 text-sm px-3 h-8"
                      data-feedback-type="csa"
                    >
                      Feedback Form
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-purple-800 mb-6">
                    Learn about body safety, how to recognize inappropriate behavior, and what to do if someone makes you uncomfortable. Know your rights and how to get help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenQuiz('csa');
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg flex-1 sm:flex-none"
                    >
                      Take Quiz
                    </Button>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSlideshow('csa');
                      }}
                      variant="outline"
                      className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 text-lg flex-1 sm:flex-none"
                    >
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>

            </div>

            {/* Statistics Alert */}
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>Did you know?</strong> Many children don't report when bad things happen to them. We want to create safe places where children feel comfortable asking for help. Every adult should help protect children.
              </AlertDescription>
            </Alert>

            {/* Adult CSA Awareness Card */}
            <Card id="adult-csa-section" className="border-indigo-200 bg-indigo-50 mt-8 relative">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-indigo-900">Adult CSA Awareness</CardTitle>
                    <p className="text-indigo-700 text-lg">Protecting Children: Educating Adults About Child Sexual Abuse</p>
                  </div>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenFeedback('adult');
                    }}
                    variant="outline"
                    size="sm"
                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-sm px-3 h-8"
                    data-feedback-type="adult"
                  >
                    Feedback Form
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-indigo-800 mb-4">
                  Gain the knowledge and tools to recognize, prevent, and respond to child sexual abuse. Learn how abuse happens, its warning signs, and how to create safe environments for children through informed, proactive adult action.
                </p>
                <ul className="space-y-2 mb-6 text-indigo-800 list-disc pl-5">
                  <li>Learn to identify subtle signs of potential abuse</li>
                  <li>Understand grooming behaviors used by perpetrators</li>
                  <li>Discover how to have age-appropriate conversations with children</li>
                  <li>Learn strategies for creating safe spaces in homes and communities</li>
                  <li>Know the steps to take if you suspect abuse is occurring</li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenQuiz('adult');
                    }}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg flex-1 sm:flex-none"
                  >
                    Take Quiz
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenSlideshow('adult');
                    }}
                    variant="outline"
                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 text-lg flex-1 sm:flex-none"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

        {/* Cyberbullying Slideshow Popup */}
        {showSlideshow && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <button
              onClick={() => setShowSlideshow(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              aria-label="Close"
            >
              <X className="h-8 w-8" />
            </button>
            {(() => {
              const SlideshowComponent = getSlideshowComponent(activeTab);
              return <SlideshowComponent onClose={() => setShowSlideshow(false)} />;
            })()}
          </div>
        )}

        {/* Quiz Modals */}
        <QuizModal
          isOpen={showQuiz}
          onClose={() => setShowQuiz(false)}
          questions={
            activeTab === 'cyberbullying' 
              ? cyberbullyingQuizQuestions 
              : activeTab === 'csa' 
                ? csaQuizQuestions 
                : adultQuizQuestions
          }
          quizType={activeTab}
          language="en"
        />
        
      </div>
      
      {showFeedback.show && (
        <FeedbackModal 
          isOpen={showFeedback.show}
          onClose={handleCloseFeedback}
          feedbackType={showFeedback.type}
          language={showFeedback.language}
        />
      )}
    </div>
  );
};

export default MasoomPage;