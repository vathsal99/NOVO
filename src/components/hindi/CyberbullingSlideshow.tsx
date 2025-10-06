import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface CyberbullyingSlideshowProps {
  onClose: () => void;
  language: 'en' | 'hi';
}

const CyberbullyingSlideshow: React.FC<CyberbullyingSlideshowProps> = ({ onClose, language }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: '/images/masoom-images/digital 1.PNG',
      title: 'इंटरनेट क्या है?',
      content: [
        'इंटरनेट न तो "अच्छाई के लिए एक नवाचार" है, न ही "बुराई का साधन" और न ही सिर्फ एक "उपकरण"।',
        'यह आसान लग सकता है और लगातार आसान होता जा रहा है, लेकिन वास्तव में यह एक जटिल इकाई है।',
        'यह वही है जिसके लिए आप इसका उपयोग करते हैं।'
      ]
    },
    {
      id: 2,
      image: '/images/masoom-images/digital 2.PNG',
      title: 'आप इंटरनेट का उपयोग किस लिए करते हैं?',
      content: [
        '• चैटिंग',
        '• सोशल मीडिया ऐप्स',
        '• यूट्यूब',
        '• ईमेल भेजना',
        '• स्कूल के असाइनमेंट और प्रोजेक्ट्स के लिए ब्राउज़िंग',
        '• गेमिंग',
        'और क्या??'
      ]
    },
    {
      id: 3,
      image: '/images/masoom-images/digital 3.PNG',
      title: 'डिजिटल फुटप्रिंट',
      content: [
        'ऑनलाइन आप जो कुछ भी करते हैं वह एक डिजिटल फुटप्रिंट छोड़ता है।',
        'इसमें शामिल है:',
        '• आप जिन वेबसाइटों पर जाते हैं',
        '• जो चीज़ें आप पोस्ट या शेयर करते हैं',
        '• आप जो तस्वीरें अपलोड करते हैं',
        '• आप जो टिप्पणियां करते हैं',
        'ऑनलाइन क्या शेयर करते हैं, इस बारे में सावधान रहें!'
      ]
    },
    {
      id: 4,
      image: '/images/masoom-images/d4 (2).png',
      title: 'साइबर ग्रूमिंग',
      content: [
        'वयस्क लोग शोषण के लिए विश्वास हासिल करने के लिए ऑनलाइन बच्चे बनकर आ सकते हैं। चेतावनी के संकेतों के प्रति सतर्क रहें।',
        'चेतावनी के संकेत:',
        '• गोपनीय बातचीत',
        '• अनुचित या यौन संदेश',
        '• व्यक्तिगत जानकारी या तस्वीरों की मांग',
        '• बातचीत को गुप्त रखने के लिए कहना',
        'यदि आप असहज महसूस करते हैं तो किसी भरोसेमंद वयस्क को जरूर बताएं!'
      ]
    },
    {
      id: 5,
      image: '/images/masoom-images/digital 4.PNG',
      title: 'ऑनलाइन गोपनीयता',
      content: [
        'अपनी व्यक्तिगत जानकारी की सुरक्षा करें:',
        '• मजबूत, अद्वितीय पासवर्ड का उपयोग करें',
        '• सोशल मीडिया पर क्या शेयर करते हैं, इस बारे में सावधान रहें',
        '• सुरक्षित शेयरिंग: शौक, पसंदीदा बैंड, भोजन आदि',
        '• असुरक्षित शेयरिंग: पूरा नाम, पता, फोन नंबर, पासवर्ड',
        '• अपने खातों की गोपनीयता सेटिंग्स को समायोजित करें',
        '• पोस्ट करने से पहले सोचें, कभी भी लाइव लोकेशन या यात्रा की योजनाएं शेयर न करें',
        'याद रखें: एक बार ऑनलाइन, हमेशा के लिए ऑनलाइन!'
      ]
    },
    {
      id: 6,
      image: '/images/masoom-images/digital 5.PNG',
      title: 'साइबरबुलिंग',
      content: [
        'साइबरबुलिंग वह धमकी है जो ऑनलाइन होती है।',
        'इसमें शामिल हो सकता है:',
        '• दुखद संदेश भेजना',
        '• ऑनलाइन अफवाहें फैलाना',
        '• शर्मनाक तस्वीरें पोस्ट करना',
        '• जानबूझकर किसी को बाहर रखना',
        'याद रखें: ऑनलाइन दयालु बनें!'
      ]
    },
    {
      id: 7,
      image: '/images/masoom-images/digital 6.PNG',
      title: 'ऑनलाइन सुरक्षित कैसे रहें',
      content: [
        'सुरक्षित रहने के टिप्स:',
        '• कभी भी पासवर्ड शेयर न करें',
        '• ऑनलाइन अजनबियों से सावधान रहें',
        '• लिंक पर क्लिक करने से पहले सोचें',
        '• यदि कुछ आपको असहज करता है तो किसी भरोसेमंद वयस्क को बताएं',
        '• एक अच्छे डिजिटल नागरिक बनें!'
      ]
    },
    {
      id: 8,
      image: '/images/masoom-images/digital 7.PNG',
      title: 'सोशल मीडिया सुरक्षा',
      content: [
        'सोशल मीडिया का सुरक्षित उपयोग कैसे करें:',
        '• प्रोफाइल को प्राइवेट रखें',
        '• केवल जाने-पहचाने लोगों से ही फ्रेंड रिक्वेस्ट स्वीकार करें',
        '• लोकेशन शेयरिंग के साथ सावधान रहें',
        '• किसी भी संदिग्ध व्यवहार की रिपोर्ट करें',
        '• कैमरा फोन तस्वीरें और वीडियो शेयर करना आसान बना देते हैं',
        '• आपकी सहमति के बिना ऑनलाइन तस्वीरों को कॉपी, एडिट और शेयर किया जा सकता है',
        '',
        '📱 लोकप्रिय सोशल मीडिया ऐप्स:',
        '• इंस्टाग्राम, स्नैपचैट, टिकटॉक, डिस्कॉर्ड, व्हाट्सएप, यूट्यूब',
        '',
        'याद रखें: ऑनलाइन हर कोई वह नहीं होता जो वह कहता है!'
      ]
    },
    {
      id: 9,
      image: '/images/masoom-images/digital 8.PNG',
      title: 'फिशिंग, स्मिशिंग, विशिंग, कैटफिशिंग',
      content: [
        'नकली संदेशों या पहचानों के माध्यम से आपकी व्यक्तिगत जानकारी चुराने के लिए इस्तेमाल की जाने वाली चालें।',
        '',
        '• फिशिंग: नकली ईमेल',
        '• स्मिशिंग: नकली टेक्स्ट संदेश',
        '• विशिंग: वैध होने का नाटक करते हुए वॉयस कॉल',
        '• कैटफिशिंग: नकली ऑनलाइन प्रोफाइल',
        '',
        'व्यक्तिगत जानकारी के किसी भी संदिग्ध अनुरोध से सावधान रहें!'
      ]
    },
    {
      id: 10,
      image: '/images/masoom-images/digital 9.png',
      title: 'ईमेल सुरक्षा: क्या करें और क्या न करें',   
      content: [
        '✅ क्या करें',
        '• केवल जाने-पहचाने और भरोसेमंद लोगों से ही ईमेल खोलें',
        '• यदि आपको असुरक्षित या साइबरबुलिंग वाले ईमेल मिलें तो किसी बड़े को बताएं',
        '',
        '❌ क्या न करें',
        '• अजनबियों के संदेश न खोलें',
        '• अज्ञात ईमेल से लिंक पर क्लिक न करें या डाउनलोड न करें',
        '• अज्ञात प्रेषकों को जवाब न दें (स्पैम हो सकता है)',
        '• निजी जानकारी मांगने वाले ईमेल का जवाब न दें',
        '• अपने या अपने परिवार के बारे में व्यक्तिगत विवरण साझा न करें',
        '• ऐसे लोगों को तस्वीरें न भेजें जिन्हें आप नहीं जानते'
      ]
    },
    {
      id: 11,
      image: '/images/masoom-images/digital 10.PNG',
      title: 'ऑनलाइन स्कैम और मैलवेयर',
      content: [
        '🛡️ मैलवेयर सुरक्षा',
        '• मैलवेयर हानिकारक सॉफ्टवेयर है जो डिवाइस को नुकसान पहुंचा सकता है या जानकारी चुरा सकता है',
        '• प्रकार: वायरस, स्पाइवेयर, रैंसमवेयर',
        '• कभी भी अज्ञात लिंक या डाउनलोड पर क्लिक न करें',
        '• एंटीवायरस सॉफ्टवेयर इंस्टॉल करें और अपडेट रखें',
        '• सभी सॉफ्टवेयर को अपडेट रखें',
        '',
        'यदि संदेह हो, तो किसी भरोसेमंद वयस्क से पूछें!'
      ]
    },
    {
      id: 12,
      image: '/images/masoom-images/digital 11.PNG',
      title: 'स्क्रीन टाइम संतुलन',
      content: [
        'स्वस्थ डिजिटल आदतें:',
        '• स्क्रीन से नियमित ब्रेक लें',
        '• डिवाइस उपयोग के लिए समय सीमा निर्धारित करें',
        '• ऑफलाइन गतिविधियों के लिए समय निकालें',
        '• डिवाइस-मुक्त भोजन और परिवार के साथ समय बिताएं',
        'संतुलन डिजिटल कल्याण की कुंजी है!'
      ]
    },
    {
      id: 13,
      image: '/images/masoom-images/digital 12.PNG',
      title: 'ऑनलाइन आलोचनात्मक सोच',
      content: [
        'ऑनलाइन हर चीज़ सच नहीं होती!',
        '• कई स्रोतों से जांच करें',
        '• सबूत की तलाश करें',
        '• फर्जी खबरों से सावधान रहें',
        '• ऑनलाइन जो देखते हैं उस पर सवाल उठाएं',
        'एक स्मार्ट सूचना उपभोक्ता बनें!'
      ]
    },
    {
      id: 14,
      image: '/images/masoom-images/digital 13.PNG',
      title: 'सकारात्मक डिजिटल फुटप्रिंट',
      content: [
        'एक सकारात्मक ऑनलाइन उपस्थिति बनाएं:',
        '• सकारात्मक सामग्री साझा करें',
        '• टिप्पणियों में दयालु बनें',
        '• अपनी प्रतिभा दिखाएं',
        '• सकारात्मक समुदायों से जुड़ें',
        'अपने डिजिटल फुटप्रिंट को कुछ ऐसा बनाएं जिस पर आपको गर्व हो!'
      ]
    },
    {
      id: 15,
      image: '/images/masoom-images/csa 12.PNG',
      title: 'क्या आपने CSAM, POCSO के बारे में सुना है?',
      content: [
        '🚨 CSAM (बाल यौन शोषण सामग्री)',
        '• 18 वर्ष से कम उम्र के बच्चों की यौन सामग्री वाली तस्वीरें या वीडियो',
        '• CSAM बनाना, साझा करना या रखना अवैध है',
        '• कानून द्वारा कड़ी सजा योग्य',
        '',
        '🛡️ पॉक्सो अधिनियम',
        '• यौन अपराधों से बच्चों का संरक्षण',
        '• 18 वर्ष से कम उम्र के सभी भारतीय बच्चों की सुरक्षा करता है',
        '• यौन शोषण के खिलाफ कानूनी सुरक्षा प्रदान करता है',
        '• रिपोर्टिंग और मुकदमे के लिए बच्चे के अनुकूल प्रक्रिया सुनिश्चित करता है',
        '',
        'यदि आप ऐसी कोई सामग्री या स्थिति देखते हैं, तो तुरंत किसी भरोसेमंद वयस्क या अधिकारियों को रिपोर्ट करें।'
      ]
    },
    {
      id: 16,
      image: '/images/masoom-images/csa 5.PNG',
      title: 'बच्चों के खिलाफ साइबर अपराध',
      content: [
        '⚠️ बच्चों के खिलाफ साइबर अपराध आईटी एक्ट 2000 के तहत एक अपराध है',
        '',
        '🤝 मदद लें, आप अकेले नहीं हैं',
        '• माता-पिता से बात करें',
        '• शिक्षकों को रिपोर्ट करें',
        '• अपने करीबी दोस्तों के साथ साझा करें',
        '• गुमनाम हेल्पलाइन का उपयोग करें',
        '',
        'याद रखें: बोलना मदद पाने और खुद को और दूसरों को सुरक्षित रखने की पहली सीढ़ी है।'
      ]
    },
    {
      id: 17,
      image: '/images/masoom-images/csa 19.PNG',
      title: 'साइबर अपराध की रिपोर्ट करने के लिए वेबसाइटें',
      content: [
        '🌐 ऑनलाइन मदद पाएं',
        '• साइबर क्राइम पोर्टल: https://cybercrime.gov.in/',
        '• पॉक्सो वेबसाइट: https://pocso.ncpcrweb.in/',
        '',
        '📞 आपातकालीन हेल्पलाइन',
        '• चाइल्डलाइन: 1098 (24/7)'
      ]
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-2 flex-shrink-0">
          <h2 className="text-2xl font-bold text-center text-gray-800">{currentSlideData.title}</h2>
        </div>
        
        {/* Main Content Container */}
        <div className="relative flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Navigation Arrow */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pl-2 md:pl-4">
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`rounded-full p-3 bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all ${currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 md:px-16">
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
                    if (!text) return null;
                    // Check if the text contains a URL
                    const urlMatch = text.match(/https?:\/\/[^\s)]+/);
                    // Check if the text contains a phone number pattern
                    const phoneMatch = text.match(/(\d{3,})/);
                    
                    if (urlMatch) {
                      const url = urlMatch[0];
                      const displayText = text.replace(url, '').trim() || url;
                      return (
                        <p key={index} className="break-words">
                          {text.split(url)[0]}
                          <a 
                            href={url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline break-all"
                          >
                            {displayText}
                          </a>
                        </p>
                      );
                    } else if (phoneMatch && (text.includes('1098') || text.includes('112'))) {
                      const phoneNumber = phoneMatch[0];
                      return (
                        <p key={index}>
                          {text.split(phoneNumber)[0]}
                          <a 
                            href={`tel:${phoneNumber}`}
                            className="text-blue-600 hover:underline whitespace-nowrap"
                          >
                            {phoneNumber}
                          </a>
                        </p>
                      );
                    }
                    return (
                      <p key={index} className={text.trim() === '' ? 'h-4' : ''}>
                        {text}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 pr-2 md:pr-4">
            <Button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`rounded-full p-3 bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all ${currentSlide === slides.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
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
                    index === currentSlide ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          <Button 
            onClick={onClose} 
            variant="outline" 
            size="sm"
            className="bg-white hover:bg-gray-50 border-gray-300"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CyberbullyingSlideshow;
