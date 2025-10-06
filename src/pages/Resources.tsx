import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, Heart, Brain, Moon, Zap, Sun, Wind, ArrowUp } from 'lucide-react';
import { resourcesData, ResourceTopic } from '../data/resourcesData';

const Resources = () => {
  const { topicId } = useParams<{ topicId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTopic, setSelectedTopic] = useState<ResourceTopic | null>(null);

  // Update selected topic when URL changes
  useEffect(() => {
    if (topicId) {
      const topic = resourcesData.find(topic => topic.id === topicId) || null;
      setSelectedTopic(topic);
    } else {
      setSelectedTopic(null);
    }
  }, [topicId]);

  const handleTopicClick = (topic: ResourceTopic) => {
    navigate(`/resources/${topic.id}`, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackClick = () => {
    navigate('/resources', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-100 to-purple-100 rounded-b-3xl shadow-sm">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNkNmQ5ZWMiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMCAxLjEwNC0uODk2IDItMiAycy0yLS44OTYtMi0yIC44OTYtMiAyLTIgMiAuODk2IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Mental Health Resources
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Simple tools and tips to help you relax, focus, and build a healthier mind every day.
            </p>
            
            {/* Category Icons */}
            <div className="flex justify-center space-x-6 mb-8">
              <div className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-full shadow-md mb-2">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Mind</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-full shadow-md mb-2">
                  <Moon className="h-6 w-6 text-indigo-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Sleep</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-full shadow-md mb-2">
                  <Zap className="h-6 w-6 text-yellow-500" />
                </div>
                <span className="text-sm font-medium text-gray-700">Energy</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-white p-3 rounded-full shadow-md mb-2">
                  <Wind className="h-6 w-6 text-teal-500" />
                </div>
                <span className="text-sm font-medium text-gray-700">Calm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedTopic ? (
          <ResourceDetails topic={selectedTopic} onBack={handleBackClick} />
        ) : (
          <>
            {/* Updated Disclaimer Card */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12 shadow-sm">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-amber-800 mb-1">Important Note</h3>
                  <p className="text-amber-700">
                    This guide is meant for general information and helpful tips only — it's not medical advice. If you're feeling very stressed, anxious, or unwell, please reach out to a parent, teacher, or doctor right away. For serious concerns, contact the helplines provided or seek professional support. Your safety and well-being should always come first.
                  </p>
                </div>
              </div>
            </div>
            <ResourceGrid topics={resourcesData} onTopicClick={handleTopicClick} />
          </>
        )}
      </div>
    </div>
  );
};

interface ResourceGridProps {
  topics: ResourceTopic[];
  onTopicClick: (topic: ResourceTopic) => void;
}

const ResourceGrid = ({ topics, onTopicClick }: ResourceGridProps) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {topics.map((topic) => (
      <div
        key={topic.id}
        onClick={() => onTopicClick(topic)}
        className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden flex flex-col cursor-pointer group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        <div className="w-full h-48 overflow-hidden">
          <img
            src={encodeURI(topic.imageUrl)}
            alt={topic.title}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              console.error('Image failed to load:', topic.imageUrl);
              const imgElement = e.target as HTMLImageElement;
              imgElement.style.display = 'none';
              const parentDiv = imgElement.parentElement;
              if (parentDiv) {
                parentDiv.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                    <div class="text-center">
                      <div class="text-4xl mb-2">📚</div>
                      <div class="text-sm font-medium text-gray-600">${topic.title}</div>
                    </div>
                  </div>
                `;
              }
            }}
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <p className="text-sm text-gray-500 mb-2">Wellness Resource</p>
          <h3 className="text-xl font-semibold text-gray-900">
            {topic.title}
          </h3>
          <p className="text-sm text-gray-600 mt-2 mb-4 line-clamp-2">
            {topic.introduction}
          </p>
          <div className="mt-auto">
            <div className="flex items-center text-sm font-semibold text-gray-800 group-hover:text-blue-600">
              Learn more
              <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

interface ResourceDetailsProps {
  topic: ResourceTopic;
  onBack: () => void;
}

const ResourceDetails = ({ topic, onBack }: ResourceDetailsProps) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onBack();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={handleBackClick}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
      >
        <ChevronRight className="w-5 h-5 rotate-180 mr-1" />
        Back to Resources
      </button>
      
      {/* Hero Section */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-12">
        <div className="relative h-64 w-full overflow-hidden">
          <img 
            src={encodeURI(topic.imageUrl)} 
            alt={topic.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Hero image failed to load:', topic.imageUrl);
              const imgElement = e.target as HTMLImageElement;
              imgElement.style.display = 'none';
              const parentDiv = imgElement.parentElement;
              if (parentDiv) {
                parentDiv.innerHTML = `
                  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
                    <div class="text-center">
                      <div class="text-6xl mb-4">📚</div>
                      <div class="text-2xl font-bold text-gray-700">${topic.title}</div>
                      <div class="text-sm text-gray-500 mt-2">Wellness Resource Guide</div>
                    </div>
                  </div>
                `;
              }
            }}
          />
        </div>
        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{topic.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{topic.introduction}</p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-12">
        {topic.sections?.map((section, index) => {
          // Check if this is a "Why it matters" section (skip numbering)
          const isWhyItMatters = section.title.toLowerCase().includes('why it matters');
          
          // Calculate the section number by counting non-"Why it matters" sections before this one
          const sectionNumber = topic.sections
            ?.slice(0, index)
            .filter(s => !s.title.toLowerCase().includes('why it matters'))
            .length + (isWhyItMatters ? 0 : 1);
          
          return (
            <section key={section.id} id={section.id} className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {isWhyItMatters ? section.title : `${sectionNumber}. ${section.title}`}
                  </h2>
                <div className="prose prose-lg max-w-none">
                  {section.content.split('\n').map((paragraph, pIndex) => {
                    if (paragraph.trim() === '') return null;
                    
                    // Handle bold text
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      const text = paragraph.slice(2, -2);
                      return (
                        <h3 key={pIndex} className="text-xl font-semibold text-gray-800 mt-6 mb-3">
                          {text}
                        </h3>
                      );
                    }
                    
                    // Handle bullet points
                    if (paragraph.startsWith('•') || paragraph.startsWith('○')) {
                      return (
                        <div key={pIndex} className="flex items-start mb-2">
                          <span className="text-blue-500 mr-2 mt-1">•</span>
                          <span className="text-gray-700">{paragraph.slice(1).trim()}</span>
                        </div>
                      );
                    }
                    
                    // Handle thumbs up indicators
                    if (paragraph.includes('👉')) {
                      const [text, tip] = paragraph.split('👉');
                      return (
                        <div key={pIndex} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 my-4">
                          <div className="flex items-start">
                            <span className="text-blue-500 mr-2">💡</span>
                            <span className="text-blue-800 font-medium">{tip.trim()}</span>
                          </div>
                        </div>
                      );
                    }
                    
                    // Regular paragraph
                    return (
                      <p key={pIndex} className="text-gray-700 mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
              
              {/* Image Section */}
              {section.image && (
                <div className="lg:w-1/3">
                  <div className="sticky top-8">
                    <img 
                      src={encodeURI(section.image)} 
                      alt={section.title} 
                      className="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-lg border border-gray-200 bg-white cursor-pointer transition-transform hover:scale-105"
                      onClick={(e) => {
                        const img = e.target as HTMLImageElement;
                        const modal = document.createElement('div');
                        modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4';
                        modal.onclick = () => modal.remove();
                        
                        const modalImg = document.createElement('img');
                        modalImg.src = img.src;
                        modalImg.className = 'max-w-full max-h-full object-contain rounded-lg';
                        modalImg.onclick = (e) => e.stopPropagation();
                        
                        const closeBtn = document.createElement('button');
                        closeBtn.innerHTML = '×';
                        closeBtn.className = 'absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300';
                        closeBtn.onclick = () => modal.remove();
                        
                        modal.appendChild(modalImg);
                        modal.appendChild(closeBtn);
                        document.body.appendChild(modal);
                      }}
                      onError={(e) => {
                        console.error('Section image failed to load:', section.image);
                        const imgElement = e.target as HTMLImageElement;
                        imgElement.style.display = 'none';
                        const parentDiv = imgElement.parentElement;
                        if (parentDiv) {
                          parentDiv.innerHTML = `
                            <div class="w-full h-96 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg shadow-sm border border-gray-200">
                              <div class="text-center p-4">
                                <div class="text-4xl mb-2">🖼️</div>
                                <div class="text-sm font-medium text-gray-600">${section.title}</div>
                                <div class="text-xs text-gray-400 mt-1">Click to view full size</div>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </section>
          );
        })}
      </div>

      {/* Help Resources Footer */}
      <div className="mt-16 bg-amber-50 border border-amber-200 rounded-xl p-6 relative">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Heart className="h-5 w-5 text-amber-600" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-amber-800 mb-2">Need Additional Support?</h3>
                <div className="text-amber-700 space-y-2">
                  <p>If you're struggling with any of these areas, remember that help is available:</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="font-semibold text-amber-800">Childline India</div>
                      <div className="text-amber-600">📞 1098 (Free, 24/7)</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="font-semibold text-amber-800">NIMHANS Helpline</div>
                      <div className="text-amber-600">📞 080-46110007</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Simple Arrow Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="ml-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Back to top"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="w-8 h-8"
            >
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default Resources;