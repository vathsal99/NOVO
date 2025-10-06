import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface AdultCSASlideshowProps {
  onClose: () => void;
}

const AdultCSASlideshow: React.FC<AdultCSASlideshowProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  interface Slide {
    id: number;
    image: string;
    title: string;
    content?: string[];
    customContent?: React.ReactNode;
  }

  const slides: Slide[] = [
    {
      id: 1,
      image: '/images/Adult CSA images/Adult CSA 1.jpg',
      title: 'बाल यौन शोषण की परिभाषा',
      content: [
        'एक बच्चे को यौन गतिविधि में शामिल करना जो:',
        '• उनकी समझ से परे है',
        '• सूचित सहमति के बिना',
        '• जब वे विकासात्मक रूप से तैयार न हों',
        '• कानूनों या सामाजिक मानदंडों का उल्लंघन करता हो'
      ]
    },
    {
      id: 2,
      image: '/images/Adult CSA images/Adult CSA 2.jpg',
      title: 'CSA के संकेत',
      customContent: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-red-700">व्यवहारिक संकेत</h3>
            <ul className="space-y-1">
              {['अचानक डर', 'स्पर्श का डर', 'स्कूल संबंधी समस्याएं', 'मादक पदार्थों का दुरुपयोग', 'स्वयं को नुकसान पहुँचाना'].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-red-600 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-blue-700">शारीरिक संकेत</h3>
            <ul className="space-y-1">
              {['नींद में खलल', 'बिस्तर गीला करना', 'पेट/जननांगों में दर्द', 'मूत्र मार्ग संक्रमण (UTI)', 'मुंह के आसपास गंध या घाव'].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-green-700">भावनात्मक संकेत</h3>
            <ul className="space-y-1">
              {['गुस्सा', 'चिंता, अवसाद', 'कम आत्म-सम्मान', 'झटके, फोबिया, जुनून'].map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    },    
    {
      id: 3,
      image: '/images/Adult CSA images/Adult CSA 3.jpg',
      title: 'बाल यौन शोषण के प्रकार',
      customContent: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-3 text-purple-700">स्पर्श संबंधी शोषण</h3>
              <ul className="space-y-2">
                {[
                  'प्रवेश संबंधी (यौन संबंध)',
                  'स्पर्श करना/छेड़छाड़ करना',
                  'बच्चों से निजी अंग छुवाना',
                  'बच्चों को यौन क्रियाओं में जबरदस्ती शामिल करना'
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-3 text-amber-700">गैर-स्पर्शी शोषण</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>अश्लील सामग्री दिखाना</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>दृश्य शोषण: जननांग दिखाना, बच्चे को कपड़े बदलते देखना</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>मौखिक शोषण: यौन बात करना, अनुचित जानकारी देना</span>
                </li>
              </ul>
            </div>
          </div>
        )
      },    
    {
      id: 4,
      image: '/images/Adult CSA images/Slide 4.PNG',
      title: 'आँकड़े: स्कूल जाने वाले बच्चे',
      content: [
        'तुलीर द्वारा चेन्नई के 2,211 स्कूली बच्चों पर किया गया अध्ययन: CPHCSA (2006):',
        '👦 लड़के – 48%',
        '👧 लड़कियाँ – 39%',
        '⚠️ गंभीर शोषण के मामले – 15%',
        'ये आँकड़े जागरूकता और हस्तक्षेप की तत्काल आवश्यकता को उजागर करते हैं।'
      ]
    },
    {
      id: 5,
      image: '/images/Adult CSA images/Slide 5.PNG',
      title: 'सर्वेक्षण: स्कूली लड़कियाँ',
      content: [
        'नई दिल्ली में 350 स्कूली लड़कियों के साथ साक्षी (1997) का सर्वेक्षण:',
        '🏠 परिवार द्वारा (दोनों लिंग) – 63%',
        '👧 लड़कियाँ (गंभीर शोषण) – 25%',
        'ये निष्कर्ष विश्वसनीय वातावरण के भीतर होने वाले शोषण की ओर इशारा करते हैं।'
      ]
    },
    {
      id: 6,
      image: '/images/Adult CSA images/Slide 6.PNG',
      title: 'सही या गलत: लिंग और बाल यौन शोषण',
      content: [
        '❌ गलत: केवल लड़कियाँ ही बाल यौन शोषण की शिकार होती हैं',
        '✅ सच्चाई: लड़के और लड़कियाँ दोनों ही शिकार होते हैं',
        'सर्वेक्षण के आँकड़े:',
        '👧 लड़कियाँ: 53%',
        '👦 लड़के: 47%',
        'शोषण लिंग के आधार पर भेदभाव नहीं करता।'
      ]
    },
    {
      id: 7,
      image: '/images/Adult CSA images/Slide 7.PNG',
      title: 'सही या गलत: बाल यौन शोषण के अपराधी',
      content: [
        '❌ गलत: बाल यौन शोषण अजनबियों द्वारा अपरिचित स्थानों पर किया जाता है',
        '✅ सच्चाई: बाल यौन शोषण आमतौर पर होता है:',
        '• जाने-पहचाने वातावरण में (घर/स्कूल)',
        '• जाने-पहचाने लोगों द्वारा (परिवार/रिश्तेदार/दोस्त)',
        '85% मामलों में अपराधी परिचित होता है',
        '📊 63% मामलों में अपराधी परिवार का सदस्य होता है'
      ]
    },
    {
      id: 8,
      image: '/images/Adult CSA images/Adult CSA 3.jpg',
      title: 'चुप्पी तोड़ना: महिलाएँ और बाल यौन शोषण',
      content: [
        '❌ गलत: महिलाएँ बच्चों का यौन शोषण नहीं करतीं',
        '✅ सच्चाई:',
        '• अधिकांश अपराधी पुरुष होते हैं (95%)',
        '• कुछ मामलों में महिलाएँ भी होती हैं (5%)',
        '• दोनों लिंग बाल यौन शोषण के अपराधी हो सकते हैं'
      ]
    },
    {
      id: 9,
      image: '/images/Adult CSA images/Adult CSA 4.jpg',
      title: 'बाल यौन शोषण और अश्लील सामग्री',
      content: [
        'बच्चे इसके संपर्क में आ सकते हैं:',
        '• गलती से',
        '• साथियों या शोषकों के माध्यम से',
        '• जानबूझकर देखने से',
        '• इसमें वयस्क या बाल शोषण सामग्री शामिल हो सकती है'
      ]
    },
    {
      id: 10,
      image: '/images/Adult CSA images/Adult CSA 5.jpg',
      title: 'ग्रूमिंग (धीरे-धीरे विश्वास हासिल करना)',
      content: [
        'शोषक इस तरह से पहुँच बनाते हैं:',
        '• परिवार से दोस्ती करके',
        '• बच्चे का विश्वास जीतकर',
        '• अकेले में समय बिताने के अवसर तलाशकर',
        '• ऑनलाइन और व्यक्तिगत बातचीत के माध्यम से',
        '• अक्सर गोपनीयता बनाए रखने के लिए धमकियों का उपयोग करते हैं'
      ]
    },
    {
      id: 11,
      image: '/images/Adult CSA images/Adult CSA 6.jpg',
      title: 'कौन है संवेदनशील?',
      content: [
        '• बच्चों का भोलापन और विश्वास करने की प्रवृत्ति',
        '• यौन शिक्षा का अभाव',
        '• टूटे परिवार, कम आर्थिक स्थिति',
        '• विकलांगता',
        '• सामाजिक मानदंड: आज्ञाकारिता, परिवार की इज्जत',
        '• सामाजिक अलगाव'
      ]
    },
    {
      id: 7,
      image: '/images/Adult CSA images/Adult CSA 7.jpg',
      title: 'बाल यौन शोषण को संबोधित करना क्यों ज़रूरी है?',
      customContent: (
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-red-700">दीर्घकालिक मनोवैज्ञानिक प्रभाव:</h3>
            <ul className="space-y-1">
              <li>• PTSD (30–50%)</li>
              <li>• अवसाद / डिप्रेशन (30–40%)</li>
              <li>• व्यवहार विकार (Conduct Disorder) (27%)</li>
              <li>• ADHD (4.3%), OCD (5–8%)</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-2 text-blue-700">इनके परिणामस्वरूप हो सकते हैं:</h3>
            <ul className="space-y-1">
              <li>• आत्महत्या के विचार</li>
              <li>• शर्म, गुस्सा, और असहायता की भावना</li>
              <li>• वयस्क जीवन में अपमानजनक रिश्तों का खतरा</li>
            </ul>
          </div>
        </div>
      )
    },  
    {
      id: 8,
      image: '/images/Adult CSA images/Adult CSA 8.PNG',
      title: 'कानूनी सुरक्षा - पॉक्सो अधिनियम (2012)',
      customContent: (
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="mb-2"><strong>18 वर्ष से कम आयु के सभी पर लागू</strong></p>
            <p className="mb-2"><strong>शामिल हैं:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>यौन हमला</li>
              <li>यौन उत्पीड़न</li>
              <li>अश्लील सामग्री के लिए बच्चों का उपयोग</li>
            </ul>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="font-semibold mb-2">बच्चे के अनुकूल प्रक्रियाएँ:</p>
            <ul className="space-y-1">
              <li>• एफआईआर अस्वीकार नहीं की जा सकती</li>
              <li>• मीडिया को पहचान गोपनीय रखनी होगी</li>
              <li>• पुलिस को एफआईआर दर्ज करनी होगी, तटस्थ स्थानों का उपयोग करना होगा</li>
              <li>• झूठे मामले: सजा लागू होगी</li>
              <li>• गंभीर अपराध: जब अधिकार प्राप्त व्यक्ति द्वारा किया जाए</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 9,
      image: '/images/Adult CSA images/Adult CSA 9.PNG',
      title: 'पॉक्सो के तहत सजाएँ',
      customContent: (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b text-left">अपराध</th>
                <th className="py-2 px-4 border-b text-left">धाराएँ</th>
                <th className="py-2 px-4 border-b text-left">सजा</th>
              </tr>
            </thead>
            <tbody>
              {[
                { offence: 'भेदक यौन उत्पीड़न (Penetrative Sexual Assault)', sections: 'Sec. 3/4', punishment: '7 वर्ष – आजीवन कारावास' },
                { offence: 'गंभीर भेदक यौन उत्पीड़न (Aggravated Penetrative Sexual Assault)', sections: 'Sec. 5/6', punishment: '10 वर्ष – आजीवन कारावास' },
                { offence: 'यौन उत्पीड़न (Sexual Assault)', sections: 'Sec. 7/8', punishment: '3 – 5 वर्ष' },
                { offence: 'गंभीर यौन उत्पीड़न (Aggravated Sexual Assault)', sections: 'Sec. 9/10', punishment: '5 – 7 वर्ष' },
                { offence: 'यौन उत्पीड़न / छेड़छाड़ (Sexual Harassment)', sections: 'Sec. 11/12', punishment: '3 वर्ष' },
                { offence: 'बाल अश्लील सामग्री (Child Pornography)', sections: 'Sec. 13/14', punishment: '5 – 7 वर्ष' },
                { offence: 'अश्लील सामग्री का संग्रहण (Storage of Pornographic Material)', sections: 'Sec. 15', punishment: '3 वर्ष' }
              ].map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4 border-b">{row.offence}</td>
                  <td className="py-2 px-4 border-b">{row.sections}</td>
                  <td className="py-2 px-4 border-b">{row.punishment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },    
    {
      id: 10,
      image: '/images/Adult CSA images/Adult CSA 10.jpg',
      title: 'हम क्या कर सकते हैं?',
      content: [
        'बच्चों को सिखाएं:',
        '• कि शोषण कभी भी उनकी गलती नहीं है',
        '• कि वे ना कह सकते हैं',
        '• कि उनकी बात मानी जाएगी और उनकी रक्षा की जाएगी',
        '• शोषण की स्थिति में प्रशिक्षित पेशेवरों से संपर्क करें'
      ]
    },
    {
      id: 11,
      image: '/images/Adult CSA images/Adult CSA 11.png',
      title: 'शिक्षकों और स्कूलों की भूमिका',
      customContent: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-3 text-blue-700">शिक्षक क्या कर सकते हैं?</h3>
            <p className="font-semibold mb-2">ध्यान दें:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>दोस्तों के समूह</li>
              <li>स्कूल के बाद की गतिविधियाँ</li>
              <li>ऑनलाइन व्यवहार</li>
              <li>चेतावनी के संकेत और व्यवहार परिवर्तनों को पहचानें</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg mb-3 text-green-700">स्कूल क्या कर सकते हैं?</h3>
            <ul className="space-y-2">
              <li>• उम्र के अनुकूल बाल यौन शोषण शिक्षा कार्यक्रम बनाएं</li>
              <li>• सिखाएं: सहमति, सीमाएँ, सुरक्षा</li>
              <li>• प्रशिक्षण दें: छात्रों, कर्मचारियों, अभिभावकों को</li>
              <li>• स्थापित करें:
                <ul className="list-disc list-inside ml-6 mt-1">
                  <li>बाल यौन शोषण नीति</li>
                  <li>कार्य योजना</li>
                  <li>रिपोर्टिंग श्रृंखला</li>
                </ul>
              </li>
              <li>• अनिवार्य रिपोर्टिंग पर कानूनी जागरूकता</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 12,
      image: '/images/Adult CSA images/Adult CSA 13.jpg',
      title: 'क्या न करें',
      customContent: (
        <div className="space-y-4">
          {[
            '❌ बच्चे को दोष न दें',
            '❌ आक्रामक न हों',
            '❌ उन्हें दोहराने के लिए न कहें',
            '❌ नज़रअंदाज़ या छोटा न समझें',
            '❌ सार्वजनिक रूप से खुलासा न करें',
            '❌ बच्चे के सामने अपराधी का सामना न करें'
          ].map((item, i) => (
            <div key={i} className="flex items-center p-3 bg-red-50 rounded-lg">
              <span className="text-red-600 mr-3 text-xl">❌</span>
              <span className="text-gray-800">{item}</span>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 13,
      image: '/images/Adult CSA images/Adult CSA 13.jpg',
      title: 'प्रतिज्ञा',
      customContent: (
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg">
          <div className="absolute inset-0 z-0 opacity-20">
            <img 
              src="/images/Adult CSA images/Adult CSA 13.jpg" 
              alt="Child safety" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10 p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">मैं प्रतिज्ञा करता/करती हूं कि मैं बच्चों को सुरक्षित रखूंगा/रखूंगी:</h3>
            <div className="space-y-4 text-lg bg-white/10 backdrop-blur-sm p-6 rounded-lg">
              <p className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>बच्चों की व्यक्तिगत सुरक्षा के बारे में सीखकर</span>
              </p>
              <p className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>बच्चों से सुरक्षा के बारे में बातचीत करके</span>
              </p>
              <p className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>एक सुरक्षित वातावरण सुनिश्चित करके</span>
              </p>
              <p className="flex items-start">
                <span className="mr-3 mt-1">•</span>
                <span>किसी भी पीड़ित की मदद करके जिससे मेरा सामना हो</span>
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  const handleClose = () => {
    onClose();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const { title, content, customContent } = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="relative bg-white rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 pt-6 pb-2 flex-shrink-0">
          <h2 className="text-2xl font-bold text-center text-gray-800">{title}</h2>
        </div>
        
        {/* Main Content Container */}
        <div className="relative flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Navigation Arrow */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 pl-2 md:pl-4">
            <Button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`rounded-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-all ${
                currentSlide === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              aria-label="पिछला स्लाइड"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 md:px-16">
            {customContent ? (
              <div className="w-full">
                {customContent}
              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-6 h-full">
                {/* Image Column */}
                <div className="md:w-1/2 flex-shrink-0 flex items-center justify-center">
                  <div className="w-full h-full max-h-[40vh] md:max-h-[60vh] flex items-center justify-center bg-gray-50 rounded-lg p-4 shadow-inner">
                    <img
                      src={slides[currentSlide].image}
                      alt={title}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        console.error('Image failed to load:', slides[currentSlide].image);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Text Content Column */}
                <div className="md:w-1/2 overflow-y-auto pr-1">
                  <div className="space-y-4 text-gray-700">
                    {content?.map((text, index) => {
                      // Check if the text contains a URL
                      const urlMatch = typeof text === 'string' ? text.match(/https?:\/\/[^\s)]+/) : null;
                      // Only check for phone numbers if not in statistics slides (id: 4 or 5)
                      const isStatisticsSlide = [4, 5].includes(slides[currentSlide].id);
                      const phoneMatch = !isStatisticsSlide && typeof text === 'string' ? text.match(/(\d{3,})/) : null;
                      
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
                      } else if (phoneMatch) {
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
                      return <p key={index}>{text}</p>;
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
              className={`rounded-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg transition-all ${
                currentSlide === slides.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
              aria-label="अगला स्लाइड"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Footer with slide counter and controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 border-t gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>स्लाइड {currentSlide + 1} / {slides.length}</span>
            <div className="hidden sm:flex items-center gap-1">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-indigo-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`स्लाइड ${index + 1} पर जाएं`}
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
            बंद करें
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdultCSASlideshow;
