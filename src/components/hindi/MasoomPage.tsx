import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, Phone, AlertTriangle, Users, X, Shield } from 'lucide-react';
import { Button } from "@/components/ui/button";
import CyberbullyingSlideshow from "./CyberbullingSlideshow";
import CSASlideshow from "./CSASlideshow";
import AdultCSASlideshow from "./AdultCSASlideshow";
import QuizModal from "@/components/QuizModal";
import FeedbackModal from "@/components/feedback/FeedbackModal";
import { cyberbullyingQuizQuestions } from "@/data/hindi/cyberbullyingQuiz";
import { csaQuizQuestions } from "@/data/hindi/csaQuiz";
import { adultQuizQuestions } from "@/data/hindi/adultQuiz";

const MasoomPage = () => {
  type ContentType = 'cyberbullying' | 'csa' | 'adult';
  
  const [activeTab, setActiveTab] = useState<ContentType>('cyberbullying');
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFeedback, setShowFeedback] = useState<{show: boolean, type: 'adult' | 'csa' | 'cyberbullying', language: 'hi'}>({show: false, type: 'cyberbullying', language: 'hi'});

  const handleOpenQuiz = (type: ContentType) => {
    setShowQuiz(true);
    setActiveTab(type);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  const handleOpenSlideshow = (type: ContentType) => {
    setShowSlideshow(true);
    setActiveTab(type);
  };

  const handleCloseSlideshow = () => {
    setShowSlideshow(false);
  };

  const handleOpenFeedback = (type: 'adult' | 'csa' | 'cyberbullying') => {
    setShowFeedback({show: true, type, language: 'hi'});
  };

  const handleCloseFeedback = () => {
    setShowFeedback(prev => ({...prev, show: false}));
  };

  const handleCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  // Function to navigate to English version
  const navigateToEnglish = () => {
    window.location.href = '/masoom';
  };
  
  // Function to navigate to Hindi version (for consistency)
  const navigateToHindi = () => {
    window.location.href = '/masoom-hi';
  };

  const getSlideshowComponent = (type: ContentType) => {
    switch (type) {
      case 'cyberbullying':
        return CyberbullyingSlideshow;
      case 'csa':
        return CSASlideshow;
      case 'adult':
        return AdultCSASlideshow;
      default:
        return CyberbullyingSlideshow;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Language Toggle */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center bg-white rounded-full p-1 shadow-md">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 text-gray-700 hover:bg-gray-100"
              onClick={navigateToEnglish}
            >
              English
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 bg-blue-600 text-white"
              disabled
            >
              हिंदी
            </button>
          </div>
        </div>
        
        {/* Header with Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
          <div className="flex flex-col items-center">
            <img src="/images/yi-logo.png" alt="यंग इंडियंस लोगो" style={{ height: 60 }} />
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/masoom-logo.png" alt="मासूम लोगो" style={{ height: 60 }} />
          </div>
          <div className="flex flex-col items-center">
            <img src="/images/cii-logo.png" alt="सीआईआई लोगो" style={{ height: 60 }} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4 text-center">बचपन बचाओ</h1>
        <h2 className="text-2xl font-semibold text-blue-600 mb-8 text-center">बाल यौन शोषण और साइबर धमकी के खिलाफ लड़ाई</h2>

        <div className="space-y-8">
          {/* About Section */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900 flex items-center gap-2">
                <Users className="w-6 h-6" />
                हमारे संगठनों के बारे में
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-white rounded border border-blue-200">
                  <h3 className="font-bold text-orange-600 mb-2">यंग इंडियंस (वाईआई)</h3>
                  <p className="text-sm text-gray-700">
                    यंग इंडियंस सीआईआई का युवा विंग है। हम युवा नेता हैं जो समुदायों की मदद करके और जिम्मेदार नागरिक बनकर भारत को बेहतर बनाने के लिए काम करते हैं।
                  </p>
                </div>
                <div className="p-4 bg-white rounded border border-blue-200">
                  <h3 className="font-bold text-blue-600 mb-2">मासूम (मेकिंग स्कूल्स सेफ)</h3>
                  <p className="text-sm text-gray-700">
                    मासूम बच्चों के लिए स्कूलों को सुरक्षित बनाने का काम करता है। हम सुरक्षा के बारे में सिखाते हैं, दुरुपयोग को रोकते हैं, और उन बच्चों की मदद करते हैं जो धमकाने या उत्पीड़न जैसी समस्याओं का सामना करते हैं।
                  </p>
                </div>
                <div className="p-4 bg-white rounded border border-blue-200">
                  <h3 className="font-bold text-gray-700 mb-2">भारतीय उद्योग परिसंघ (सीआईआई)</h3>
                  <p className="text-sm text-gray-700">
                    भारतीय उद्योग परिसंघ व्यवसायों और सरकार के साथ मिलकर भारत को सभी के लिए रहने और काम करने के लिए एक बेहतर जगह बनाने का काम करता है।
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mission Statement */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-green-900">हमारा मिशन</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="max-w-3xl">
                <p className="text-green-800 leading-relaxed text-center text-lg">
                  साथ मिलकर, हम बच्चों को खतरों के बारे में सिखाकर, जरूरत पड़ने पर मदद प्रदान करके, और यह सुनिश्चित करके कि हर बच्चा एक सुरक्षित वातावरण में बड़ा हो सके जहां वे सीख सकें और खुश रह सकें, उन्हें सुरक्षित रखने का काम करते हैं।
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cyberbullying Card */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="relative">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl"></span>
                      <CardTitle className="text-2xl font-bold text-blue-900">साइबर धमकी</CardTitle>
                    </div>
                    <p className="text-blue-700 text-lg">ऑनलाइन सुरक्षित कैसे रहें, यह जानें</p>
                  </div>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFeedback({show: true, type: 'cyberbullying', language: 'hi'});
                    }}
                    variant="outline"
                    size="sm"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 text-sm px-3 h-8"
                  >
                    फीडबैक फॉर्म
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 mb-6">
                  ऑनलाइन सुरक्षा, साइबर धमकी, और डिजिटल खतरों से खुद को कैसे बचाएं, इसके बारे में जानें। समझें कि अगर कोई आपके साथ ऑनलाइन बुरा व्यवहार करे तो क्या करें।
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenQuiz('cyberbullying');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 text-lg flex-1 sm:flex-none"
                  >
                    क्विज़ लें
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenSlideshow('cyberbullying');
                    }}
                    variant="outline"
                    className="border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 text-lg flex-1 sm:flex-none"
                  >
                    और जानें
                  </Button>

                </div>
              </CardContent>
            </Card>

            {/* CSA Card */}
            <Card className="border-purple-200 bg-purple-50">
              <CardHeader className="relative">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl"></span>
                      <CardTitle className="text-2xl font-bold text-purple-900">बाल यौन शोषण</CardTitle>
                    </div>
                    <p className="text-purple-700 text-lg">बच्चों के लिए महत्वपूर्ण सुरक्षा जानकारी</p>
                  </div>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowFeedback({show: true, type: 'csa', language: 'hi'});
                    }}
                    variant="outline"
                    size="sm"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50 text-sm px-3 h-8"
                  >
                    फीडबैक फॉर्म
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-purple-800 mb-6">
                  शारीरिक सुरक्षा, अनुचित व्यवहार को कैसे पहचानें, और अगर कोई आपको असहज करे तो क्या करें, इसके बारे में जानें। अपने अधिकारों को जानें और मदद कैसे लें।
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenQuiz('csa');
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 text-lg flex-1 sm:flex-none"
                  >
                    क्विज़ लें
                  </Button>
                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenSlideshow('csa');
                    }}
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 text-lg flex-1 sm:flex-none"
                  >
                    और जानें
                  </Button>

                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Alert */}
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              <strong>क्या आप जानते हैं?</strong> कई बच्चे बुरी घटनाओं की रिपोर्ट नहीं करते हैं। हम सुरक्षित स्थान बनाना चाहते हैं जहां बच्चे मदद मांगने में सहज महसूस करें। हर वयस्क को बच्चों की सुरक्षा में मदद करनी चाहिए।
            </AlertDescription>
          </Alert>

          {/* Adult CSA Awareness Card */}
          <Card className="border-indigo-200 bg-indigo-50 mt-8">
            <CardHeader className="relative">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold text-indigo-900">वयस्क सीएसए जागरूकता</CardTitle>
                  <p className="text-indigo-700 text-lg">बच्चों की सुरक्षा: वयस्कों के लिए बाल यौन शोषण के बारे में शिक्षा</p>
                </div>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowFeedback({show: true, type: 'adult', language: 'hi'});
                  }}
                  variant="outline"
                  size="sm"
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-sm px-3 h-8"
                >
                  फीडबैक फॉर्म
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-indigo-50 rounded-lg">
                  <p className="text-indigo-800 mb-4">
                    बच्चों को सुरक्षित रखना हम सभी की जिम्मेदारी है। यहां कुछ तरीके दिए गए हैं जिनसे आप मदद कर सकते हैं:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h4 className="font-semibold text-indigo-800 mb-3">बच्चों के साथ बातचीत कैसे करें:</h4>
                      <ul className="space-y-2 text-indigo-700">
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-2">•</span>
                          उनके दिन के बारे में नियमित रूप से पूछें
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-2">•</span>
                          उनकी ऑनलाइन गतिविधियों में रुचि लें
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-2">•</span>
                          उन्हें अपनी भावनाओं के बारे में बात करने के लिए प्रोत्साहित करें
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-2">•</span>
                          उन्हें यह बताएं कि वे आपसे कुछ भी कह सकते हैं
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-indigo-800 mb-3">सुरक्षा युक्तियाँ:</h4>
                      <ul className="space-y-2 text-indigo-700">
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-2">•</span>
                          बच्चों को उनके निजी अंगों के बारे में शिक्षित करें
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-2">•</span>
                          उन्हें 'न कहना' सिखाएं
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-2">•</span>
                          उन्हें विश्वसनीय वयस्कों की पहचान करने में मदद करें
                        </li>
                        <li className="flex items-start">
                          <span className="text-indigo-600 mr-2">•</span>
                          उनके ऑनलाइन गतिविधियों पर नजर रखें
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenQuiz('adult');
                      }}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-lg flex-1 sm:flex-none"
                    >
                      क्विज़ लें
                    </Button>
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenSlideshow('adult');
                      }}
                      variant="outline"
                      className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-6 py-3 text-lg flex-1 sm:flex-none"
                    >
                      और जानें
                    </Button>

                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cyberbullying Slideshow Popup */}
      {showSlideshow && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <button
            onClick={() => setShowSlideshow(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            aria-label="बंद करें"
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
        language="hi"
      />

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
