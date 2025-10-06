import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Loader2, Send, X } from "lucide-react";
 
interface FeedbackQuestion {
  id: number;
  question: string;
}
 
interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  feedbackType: 'adult' | 'csa' | 'cyberbullying';
  language: 'en' | 'hi';
}
 
const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose, feedbackType, language }) => {
  React.useEffect(() => {
    console.log('FeedbackModal mounted/updated with:', { isOpen, feedbackType, language });
  }, [isOpen, feedbackType, language]);
 
  console.log('FeedbackModal rendering with:', { isOpen, feedbackType, language });
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>({});
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    schoolName: '',
    category: feedbackType,
  });
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [validationMessages, setValidationMessages] = useState<string[]>([]);
 
  const adultQuestionsEn: FeedbackQuestion[] = [
    { id: 1, question: "Are you aware of POCSO laws now?" },
    { id: 2, question: "Did the session help you understand about child abuse?" },
    { id: 3, question: "Were you aware of POCSO laws before the session?" },
    { id: 4, question: "Will you be open to attending more sessions on this topic?" },
    { id: 5, question: "Has your child ever faced a situation of abuse?" },
    { id: 6, question: "Are you more confident now to handle the child, in case of abuse?" }
  ];
 
  const adultQuestionsHi: FeedbackQuestion[] = [
    { id: 1, question: "क्या आप अब पॉक्सो कानूनों के बारे में जानते हैं?" },
    { id: 2, question: "क्या सत्र ने आपको बाल शोषण के बारे में समझने में मदद की?" },
    { id: 3, question: "क्या आप सत्र से पहले पॉक्सो कानूनों के बारे में जानते थे?" },
    { id: 4, question: "क्या आप इस विषय पर और सत्रों में भाग लेने के लिए तैयार होंगे?" },
    { id: 5, question: "क्या आपके बच्चे ने कभी शोषण की स्थिति का सामना किया है?" },
    { id: 6, question: "क्या अब आप शोषण के मामले में बच्चे को संभालने के लिए अधिक आत्मविश्वास महसूस करते हैं?" }
  ];
 
  const csaQuestionsEn: FeedbackQuestion[] = [
    { id: 1, question: "Were you aware of personal parts before this session?" },
    { id: 2, question: "Were you aware of safe/unsafe touch before this session?" },
    { id: 3, question: "Do you know what to do in case of abuse?" },
    { id: 4, question: "Are you aware of the correct authority to approach in case of abuse?" },
    { id: 5, question: "Can you safeguard yourself against abuse after this session?" }
  ];
 
  const csaQuestionsHi: FeedbackQuestion[] = [
    { id: 1, question: "क्या आप इस सत्र से पहले निजी अंगों के बारे में जानते थे?" },
    { id: 2, question: "क्या आप इस सत्र से पहले सुरक्षित/असुरक्षित स्पर्श के बारे में जानते थे?" },
    { id: 3, question: "क्या आप जानते हैं कि शोषण के मामले में क्या करना चाहिए?" },
    { id: 4, question: "क्या आप जानते हैं कि शोषण के मामले में किस सही अधिकारी से संपर्क करना चाहिए?" },
    { id: 5, question: "क्या आप इस सत्र के बाद शोषण से अपनी सुरक्षा कर सकते हैं?" }
  ];
  const cyberbullyingQuestionsEn: FeedbackQuestion[] = [
    { id: 1, question: "Were you aware of cyberbullying before this session?" },
    { id: 2, question: "Are you aware of the consequences of cyberbullying?" },
    { id: 3, question: "Do you know how to identify cyberbullying behavior?" },
    { id: 4, question: "Would you report cyberbullying incidents to authorities?" },
    { id: 5, question: "Do you know where to seek help if you or someone you know is experiencing cyberbullying?" }
  ];
 
  const cyberbullyingQuestionsHi: FeedbackQuestion[] = [
      { "id": 1, "question": "क्या आप इस सत्र से पहले साइबरबुलिंग के बारे में जानते थे?" },
      { "id": 2, "question": "क्या आप साइबरबुलिंग के परिणामों के बारे में जानते हैं?" },
      { "id": 3, "question": "क्या आप साइबरबुलिंग के व्यवहार को पहचानना जानते हैं?" },
      { "id": 4, "question": "क्या आप साइबरबुलिंग की घटनाओं की रिपोर्ट अधिकारियों को करेंगे?" },
      { "id": 5, "question": "क्या आप जानते हैं कि यदि आप या आपका कोई परिचित साइबरबुलिंग का शिकार हो रहा हो तो सहायता कहाँ से प्राप्त करें?" }
  ];
 
  const questions = React.useMemo(() => {
    console.log('Getting questions for:', { feedbackType, language });
    let result;
   
    if (feedbackType === 'adult') {
      result = language === 'hi' ? adultQuestionsHi : adultQuestionsEn;
    } else if (feedbackType === 'cyberbullying') {
      result = language === 'hi' ? cyberbullyingQuestionsHi : cyberbullyingQuestionsEn;
    } else {
      result = language === 'hi' ? csaQuestionsHi : csaQuestionsEn;
    }
   
    console.log('Selected questions for', feedbackType, 'in', language, ':', result);
    return result;
  }, [feedbackType, language]);
 
  console.log('Rendering FeedbackModal with questions:', questions);
 
  const handleAnswerSelect = (questionId: number, answer: boolean) => {
    setAnswers({ ...answers, [questionId]: answer });
  };
 
  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.schoolName.trim() !== '' &&
      formData.category &&
      questions.every(q => answers[q.id] !== undefined)
    );
  };
 
  const handleSubmit = async () => {
    const missingFields = [];
    if (!formData.fullName.trim()) missingFields.push(language === 'hi' ? 'पूरा नाम' : 'Full Name');
    if (!formData.schoolName.trim()) missingFields.push(language === 'hi' ? 'स्कूल का नाम' : 'School Name');
   
    if (missingFields.length > 0) {
      setValidationMessages(missingFields);
      setShowValidationDialog(true);
      return;
    }
 
    const unansweredQuestions = questions.filter(q => answers[q.id] === undefined);
    if (unansweredQuestions.length > 0) {
      setValidationMessages([language === 'hi' ? 'कृपया सभी प्रश्नों के उत्तर दें' : 'Please answer all questions']);
      setShowValidationDialog(true);
      return;
    }
 
    setIsSubmitting(true);
    // Simulate API call delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowResults(true);
  };
 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setShowValidationDialog(false);
  };
 
  const resetFeedback = () => {
    setAnswers({});
    setShowResults(false);
    setFormData({
      fullName: '',
      schoolName: '',
      category: feedbackType,
    });
    setShowValidationDialog(false);
  };
 
  const getText = () => {
    if (language === 'hi') {
      return {
        feedbackForm: "फीडबैक फॉर्म",
        yes: "हाँ",
        no: "नहीं",
        submit: "सबमिट करें",
        thankYou: "धन्यवाद!",
        feedbackSubmitted: "आपका फीडबैक सफलतापूर्वक सबमिट हो गया है।",
        yourResponses: "आपके उत्तर:",
        submitAnother: "दूसरा फीडबैक सबमिट करें",
        close: "बंद करें",
        pleaseAnswerAll: "कृपया सभी प्रश्नों के उत्तर दें"
      };
    } else {
      return {
        feedbackForm: "Feedback Form",
        yes: "Yes",
        no: "No",
        submit: "Submit",
        thankYou: "Thank You!",
        feedbackSubmitted: "Your feedback has been submitted successfully.",
 
        close: "Close",
        pleaseAnswerAll: "Please answer all questions"
      };
    }
  };
 
  const text = getText();
  const allAnswered = questions.every(q => answers[q.id] !== undefined);
 
  if (!isOpen) return null;
 
  // Get the appropriate description based on feedback type and language
  const getDescription = () => {
    if (language === 'hi') {
      return `सत्र पर प्रतिक्रिया फॉर्म: ${feedbackType === 'cyberbullying' ? 'साइबरबुलिंग' : feedbackType === 'csa' ? 'बाल यौन शोषण' : 'वयस्क'}`;
    }
    return `Feedback form for ${feedbackType} session`;
  };
 
  const dialogDescription = getDescription();
 
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[70vw] max-w-4xl flex flex-col p-0 bg-white rounded-lg shadow-xl overflow-hidden border-0 max-h-[95vh]"
        aria-describedby="feedback-dialog-description"
      >
        <DialogDescription id="feedback-dialog-description" className="sr-only">
          {dialogDescription}
        </DialogDescription>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50  p-1 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>
 
        <DialogHeader className="px-6 pt-6 pb-4 sm:px-6 sm:pt-6 sm:pb-4 border-b border-gray-200 shrink-0">
          <DialogTitle className="text-2xl sm:text-3xl font-bold text-center text-primary">
            {text.feedbackForm}
          </DialogTitle>
        </DialogHeader>
       
        <div className="w-full p-4 sm:p-6">
        {showResults ? (
          <div className="flex flex-col items-center justify-center p-4 sm:p-6 space-y-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center rounded-full animate-scale-in shadow-lg">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-green-800 text-center px-4">{text.thankYou}</h3>
            <p className="text-base sm:text-lg text-gray-600 text-center max-w-md px-4">{text.feedbackSubmitted}</p>
            <Button
              onClick={onClose}
              className="px-8 py-2.5 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:opacity-90 hover:scale-105 transition-all shadow-lg mt-2"
            >
              {text.close}
            </Button>
          </div>
        ) : (
          <div className="space-y-4 sm:space-y-6">
            {/* User Information Form */}
            <Card className="border-primary/20 bg-white shadow-sm">
              <CardContent className="p-3">
                <h3 className="text-sm font-semibold mb-2 text-gray-800">
                  {language === 'hi' ? 'आपकी जानकारी' : 'Your Information'}
                </h3>
                <div className="flex flex-col sm:flex-row gap-2 items-end mt-2">
                  <div className="flex-1 min-w-0">
                    <label htmlFor="fullName" className="block text-xs font-medium text-gray-700 mb-0.5">
                      {language === 'hi' ? 'पूरा नाम *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder={language === 'hi' ? 'पूरा नाम' : 'Full name'}
                    />
                  </div>
                 
                  <div className="flex-1 min-w-0">
                    <label htmlFor="schoolName" className="block text-xs font-medium text-gray-700 mb-0.5">
                      {language === 'hi' ? 'स्कूल *' : 'School *'}
                    </label>
                    <input
                      type="text"
                      id="schoolName"
                      name="schoolName"
                      value={formData.schoolName}
                      onChange={handleInputChange}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder={language === 'hi' ? 'स्कूल का नाम' : 'School name'}
                    />
                  </div>
                 
                  <div className="flex-1 min-w-0">
                    <label className="block text-xs font-medium text-gray-700 mb-0.5">
                      {language === 'hi' ? 'श्रेणी' : 'Category'}
                    </label>
                    <div className="w-full px-2 py-1.5 border border-gray-200 bg-gray-50 rounded-md text-sm text-gray-700 truncate">
                      {formData.category === 'cyberbullying' ?
                        (language === 'hi' ? 'साइबरबुलिंग' : 'Cyberbullying') :
                        formData.category === 'csa' ?
                        (language === 'hi' ? 'बाल यौन शोषण' : 'Child Sexual Abuse') :
                        (language === 'hi' ? 'वयस्क सीएसए जागरूकता' : 'Adult CSA Awareness')
                      }
                    </div>
                  </div>
                </div>
               
 
              </CardContent>
            </Card>
            <Card className="border-primary/20 bg-gradient-subtle shadow-sm animate-fade-in mt-3">
              <CardContent className="p-3">
                <div className="space-y-2">
                  {questions.map((question, index) => (
                    <div key={question.id} className="space-y-4 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-800 flex-1 leading-tight">
                          {index + 1}. {question.question}
                        </h3>
                        <div className="flex gap-1.5 sm:gap-2 mt-1 sm:mt-0">
                          <button
                            onClick={() => handleAnswerSelect(question.id, true)}
                            className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm min-w-[60px] sm:min-w-[70px] border-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                              answers[question.id] === true
                                ? 'bg-green-500 border-green-500 text-white shadow-green-200 animate-scale-in'
                                : 'bg-transparent border-green-500 text-green-600 hover:bg-green-50'
                            }`}
                          >
                            {text.yes}
                          </button>
                          <button
                            onClick={() => handleAnswerSelect(question.id, false)}
                            className={`px-3 sm:px-4 py-1.5 text-xs sm:text-sm min-w-[60px] sm:min-w-[70px] border-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                              answers[question.id] === false
                                ? 'bg-red-500 border-red-500 text-white shadow-red-200 animate-scale-in'
                                : 'bg-transparent border-red-500 text-red-600 hover:bg-red-50'
                            }`}
                          >
                            {text.no}
                          </button>
                        </div>
                      </div>
                      {index < questions.length - 1 && (
                        <hr className="border-gray-200 my-2 sm:my-3" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
 
            <div className="flex flex-col items-center space-y-2 pt-3 px-2">
              <Button
                onClick={handleSubmit}
                disabled={!isFormValid() || isSubmitting}
                size="lg"
                className={`w-full px-4 py-2 text-sm bg-gradient-primary hover:opacity-90 disabled:opacity-50 rounded-lg shadow-md transition-all duration-200`}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    <span className="text-xs sm:text-sm">
                      {language === 'hi' ? 'सबमिट हो रहा है...' : 'Submitting...'}
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">{text.submit}</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
      </DialogContent>
     
      {/* Validation Error Dialog */}
      <Dialog open={showValidationDialog} onOpenChange={setShowValidationDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">
              {language === 'hi' ? 'कृपया जाँच करें' : 'Validation Required'}
            </DialogTitle>
            <DialogDescription className="pt-2">
              {language === 'hi'
                ? 'कृपया निम्नलिखित फ़ील्ड भरें:'
                : 'Please fill in the following fields:'
              }
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 py-2">
            {validationMessages.map((message, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span className="text-red-500">•</span>
                <span>{message}</span>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={() => setShowValidationDialog(false)}
              className="mt-2 w-full sm:w-auto"
            >
              {language === 'hi' ? 'ठीक है' : 'Okay'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};
 
export default FeedbackModal;