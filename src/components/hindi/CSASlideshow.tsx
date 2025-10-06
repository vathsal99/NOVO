import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CSASlideshowProps {
  onClose: () => void;
}

interface Slide {
  id: number;
  image: string;
  title: string;
  content: string[];
  customContent?: React.ReactNode;
}

const CSASlideshow: React.FC<CSASlideshowProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides: Slide[] = [
    {
      id: 1,
      image: '/images/masoom-images/csa 15.PNG',
      title: 'व्यक्तिगत शारीरिक सुरक्षा',
      content: [
        '• आपका शरीर सिर्फ आपका है',
        '• निजी अंग स्विमसूट से ढके रहते हैं',
        '• स्वास्थ्य या सफाई के अलावा किसी को भी आपके निजी अंगों को नहीं छूना चाहिए',
        '• अवांछित स्पर्श के लिए ना कहना ठीक है',
        '• अगर कोई आपको असहज करे तो किसी भरोसेमंद वयस्क को जरूर बताएं'
      ]
    },
    {
      id: 2,
      image: '', // Empty since we're using custom layout
      title: 'सुरक्षित और असुरक्षित स्पर्श',
      content: [
        'सुरक्षित स्पर्श',
        '• आपको खुश और देखभाल महसूस कराते हैं',
        '• उदाहरण: परिवार के गले लगाना, हाई-फाइव, हाथ मिलाना',
        '• माता-पिता की मौजूदगी में डॉक्टर के पास जाना',
        '• आपको सुरक्षित और प्यार महसूस कराते हैं',
        '\nअसुरक्षित स्पर्श',
        '• आपको असहज या डरा हुआ महसूस कराते हैं',
        '• निजी अंगों पर कोई भी स्पर्श (स्वास्थ्य कारणों से माता-पिता की मौजूदगी में छोड़कर)',
        '• अगर कोई आपसे स्पर्श को गुप्त रखने को कहे',
        '• कोई भी स्पर्श जो आपको भ्रमित या असुरक्षित महसूस कराए'
      ],
      customContent: (
        <div className="w-full px-4 py-2">
          <div className="flex flex-col md:flex-row gap-8 w-full h-full">
            {/* Left side - Safe Touch */}
            <div className="flex-1 flex flex-col items-center p-4 bg-green-50 rounded-lg">
              <div className="w-full h-48 md:h-64 mb-3 overflow-hidden rounded-lg border-2 border-green-200">
                <img 
                  src="/images/masoom-images/csa 17.PNG" 
                  alt="Safe touch examples"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center text-lg font-bold text-green-700 mb-3">सुरक्षित स्पर्श</div>
              <ul className="w-full space-y-2 text-gray-700 px-2">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>आपको खुश और सुरक्षित महसूस कराता है</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>उचित गले लगाना और हाई-फाइव</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2 mt-1">•</span>
                  <span>माता-पिता की मौजूदगी में डॉक्टर के पास जाना</span>
                </li>
              </ul>
            </div>
            
            {/* Right side - Unsafe Touch */}
            <div className="flex-1 flex flex-col items-center p-4 bg-red-50 rounded-lg">
              <div className="w-full h-48 md:h-64 mb-3 overflow-hidden rounded-lg border-2 border-red-200">
                <img 
                  src="/images/masoom-images/csa 18.PNG" 
                  alt="Unsafe touch examples"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center text-lg font-bold text-red-700 mb-3">असुरक्षित स्पर्श</div>
              <ul className="w-full space-y-2 text-gray-700 px-2">
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span>आपको असहज या डरा हुआ महसूस कराता है</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span>बिना किसी अच्छे कारण के निजी अंगों को छूना</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-600 mr-2 mt-1">•</span>
                  <span>माता-पिता से रहस्य रखने के लिए कहा जाना</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      image: '/images/masoom-images/csa 1.png',
      title: 'आपका शरीर सिर्फ आपका है',
      content: [
        '• आपको किसी भी अवांछित स्पर्श के लिए ना कहने का अधिकार है',
        '• भले ही वह कोई जानकार या प्रियजन ही क्यों न हो',
        '• भले ही वे आपको उपहार या मिठाई दें',
        '• भले ही वे आपसे इसे रहस्य रखने को कहें',
        '• आपका शरीर खास है और सिर्फ आपका है!'
      ]
    },
    
    {
      id: 4,
      image: '/images/masoom-images/csa 5.PNG',
      title: 'इंटरनेट सुरक्षा',
      content: [
        '• कभी भी ऑनलाइन व्यक्तिगत जानकारी साझा न करें',
        '• अजनबियों को अपनी तस्वीरें न भेजें',
        '• अगर कोई ऑनलाइन रहस्य रखने को कहे तो किसी बड़े को बताएं',
        '• अगर ऑनलाइन कुछ भी असहज लगे तो किसी भरोसेमंद वयस्क को बताएं'
      ]
    },
    {
      id: 5,
      image: '/images/masoom-images/csa 6.PNG',
      title: 'यह आपकी गलती नहीं है',
      content: [
        '• अगर कोई आपको असहज तरीके से छूता है, तो यह कभी भी आपकी गलती नहीं है',
        '• सच बोलने पर आपको कोई परेशानी नहीं होगी',
        '• भले ही आपने हाँ कह दिया हो और फिर मन बदल लिया हो, फिर भी यह आपकी गलती नहीं है',
        '• अगर कुछ भी होता है तो हमेशा किसी भरोसेमंद वयस्क को बताएं'
      ]
    },
    {
      id: 6,
      image: '/images/masoom-images/csa 7.PNG',
      title: 'यह आपकी गलती नहीं है',
      content: [
        '• अगर कोई आपको असहज तरीके से छूता है, तो यह कभी भी आपकी गलती नहीं है',
        '• सच बोलने पर आपको कोई परेशानी नहीं होगी',
        '• भले ही आपने हाँ कह दिया हो और फिर मन बदल लिया हो, फिर भी यह आपकी गलती नहीं है',
        '• अगर कुछ भी होता है तो हमेशा किसी भरोसेमंद वयस्क को बताएं'
      ]
    },
    {
      id: 7,
      image: '/images/masoom-images/csa 8.PNG',
      title: 'अच्छे और बुरे रहस्य',
      content: [
        'अच्छे रहस्य:',
        '• मजेदार सरप्राइज होते हैं (जन्मदिन के उपहार की तरह)',
        '• आपको खुश और उत्साहित महसूस कराते हैं',
        '• अस्थायी होते हैं और जल्द ही सबको बता दिए जाते हैं',
        '\nबुरे रहस्य:',
        '• आपको चिंतित या डरा हुआ महसूस कराते हैं',
        '• स्पर्श या अन्य असहज स्थितियों से जुड़े होते हैं',
        '• कोई आपसे किसी और को न बताने को कहता है',
        '• अगर यह बुरा रहस्य है, तो तुरंत किसी भरोसेमंद वयस्क को बताएं!'
      ]
    },
    {
      id: 8,
      image: '/images/masoom-images/csa 22.PNG',    
      title: 'क्या करें',
      content: [
        'अगर कोई आपको असहज करे तो:',
        '1. दृढ़ता से ना कहें',
        '2. उस स्थिति से दूर चले जाएं',
        '3. तुरंत किसी भरोसेमंद वयस्क को बताएं',
        '4. तब तक बताते रहें जब तक कोई मदद न करे',
        'याद रखें: किसी को बताने के लिए कभी देर नहीं होती!'
      ]
    },
    {
      id: 9,
      image: '/images/masoom-images/csa 3.png',
      title: 'आप खास हैं',
      content: [
        '• आपका शरीर खास है और सिर्फ आपका है',
        '• आपको सुरक्षित महसूस करने का अधिकार है',
        '• ऐसे लोग हैं जो आपसे प्यार करते हैं और आपकी रक्षा करना चाहते हैं',
        '• अगर कभी डर या भ्रम महसूस हो, तो किसी भरोसेमंद वयस्क से बात करें',
        '• आप महत्वपूर्ण हैं और सुरक्षित रहने के हकदार हैं!'
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleClose = () => {
    onClose();
  };
  
  const currentSlideData = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-2 flex-shrink-0">
          <h2 className="text-2xl font-bold text-center text-red-700">{currentSlideData.title}</h2>
        </div>
        
        {/* Main Content Container */}
        <div className="relative flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Navigation Arrow */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pl-2 md:pl-4">
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`rounded-full p-3 bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all ${
                currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 md:px-16">
            {currentSlideData.customContent ? (
              <div className="w-full">
                {currentSlideData.customContent}
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-6 h-full">
                {/* Image Column */}
                <div className="md:w-1/2 flex-shrink-0 flex items-center justify-center">
                  <div className="w-full h-full max-h-[40vh] md:max-h-[60vh] flex items-center justify-center bg-gray-50 rounded-lg p-4 shadow-inner">
                    <img
                      src={currentSlideData.image}
                      alt={currentSlideData.title}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        console.error('Image failed to load:', currentSlideData.image);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Text Content Column */}
                <div className="md:w-1/2 overflow-y-auto pr-1">
                  <div className="space-y-4 text-gray-700">
                    {currentSlideData.content.map((text, index) => {
                      const isBold = text.endsWith(':');
                      return (
                        <p 
                          key={index} 
                          className={`break-words ${isBold ? 'font-bold text-red-800' : 'pl-4'}`}
                        >
                          {text}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Navigation Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pr-2 md:pr-4">
            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`rounded-full p-3 bg-red-600 hover:bg-red-700 text-white shadow-lg transition-all ${
                currentSlide === slides.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Footer with slide counter and controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 border-t gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Slide {currentSlide + 1} of {slides.length}</span>
            <div className="hidden sm:flex items-center gap-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-red-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handleClose} 
            variant="outline" 
            size="sm"
            className="bg-white hover:bg-gray-50 border-gray-300 text-gray-700"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CSASlideshow;