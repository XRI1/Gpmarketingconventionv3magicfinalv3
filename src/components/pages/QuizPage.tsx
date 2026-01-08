import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ParallaxBackground } from '../ParallaxBackground';
import { GlassCard } from '../GlassCard';
import { PageHeader } from '../PageHeader';
import { Play, CheckCircle, XCircle, Clock, Award, BookOpen, ChevronRight } from 'lucide-react';
import { usePageNavigation } from '../../hooks/usePageNavigation';
import { useAppContext } from '../../contexts/AppContext';

export function QuizPage() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [videoWatched, setVideoWatched] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const { goBack, goHome } = usePageNavigation();
  const { setUserPoints } = useAppContext();

  const topics = [
    { id: 'values', title: 'GP Values & Culture', description: 'Learn about our core mission and values', icon: BookOpen },
    { id: 'sales', title: 'Marketing Excellence', description: 'Mastering the art of strategy', icon: Award },
    { id: 'product', title: 'Product Knowledge', description: 'Deep dive into new 2025 offerings', icon: CheckCircle },
  ];

  const questions = [
    {
      question: 'What is Grameenphone\'s core mission?',
      options: [
        'To maximize profits',
        'To empower societies through connectivity',
        'To sell the most phones',
        'To compete with other operators'
      ],
      correct: 1
    },
    {
      question: 'Which year was Grameenphone established?',
      options: ['1995', '1996', '1997', '1998'],
      correct: 2
    },
    {
      question: 'What does GP stand for in Grameenphone values?',
      options: [
        'Good Performance',
        'Global Presence',
        'Great People',
        'Growth Potential'
      ],
      correct: 2
    },
    {
      question: 'What is Grameenphone\'s current slogan?',
      options: [
        'Stay Close',
        'Go Beyond',
        'Cholo Bohudoor',
        'Future is Here'
      ],
      correct: 2
    },
    {
      question: 'Who is the majority shareholder of Grameenphone?',
      options: [
        'Grameen Telecom',
        'Telenor Group',
        'Marubeni',
        'Government of Bangladesh'
      ],
      correct: 1
    },
  ];

  const handleWatchVideo = () => {
    setTimeout(() => {
      setVideoWatched(true);
    }, 2000);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    // Timer simulation
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    const isCorrect = index === questions[currentQuestion].correct;
    setAnswers([...answers, isCorrect]);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setTimeLeft(30);
      } else {
        setShowResult(true);
        const correctCount = [...answers, isCorrect].filter(a => a).length;
        const points = correctCount * 10;
        setUserPoints(points);
      }
    }, 1500);
  };

  const correctAnswers = answers.filter(a => a).length;

  return (
    <div className="min-h-screen p-4 relative overflow-hidden pb-20">
      <ParallaxBackground />
      
      <div className="max-w-3xl mx-auto z-10 relative">
        <PageHeader 
          title="GP Quiz Challenge"
          onBack={goHome}
          onHome={goHome}
        />

        <AnimatePresence mode="wait">
          {!quizStarted && !showResult ? (
            <motion.div
              key="rules"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
               {/* Rules Screen Style (GP Theme) */}
               <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-[#0078D4] to-[#0092E4] p-6 text-center shadow-lg relative z-10">
                    <h2 className="text-2xl font-bold text-white">Quiz Rules</h2>
                    <div className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-b from-[#0078D4] to-transparent opacity-50" />
                  </div>
                  
                  {/* Body */}
                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-blue-200 text-xl font-bold mb-4">Instructions:</h3>
                      <ul className="space-y-3 text-blue-100">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#0092E4] shrink-0" />
                          5 Questions Total
                        </li>
                        <li className="flex items-start gap-2">
                          <Clock className="w-5 h-5 text-[#0092E4] shrink-0" />
                          30 Seconds per question
                        </li>
                        <li className="flex items-start gap-2">
                          <Award className="w-5 h-5 text-[#0092E4] shrink-0" />
                          Correct answer: +10 Points
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#0092E4] shrink-0" />
                          No penalty for wrong answers
                        </li>
                        <li className="flex items-start gap-2">
                          <Award className="w-5 h-5 text-[#0092E4] shrink-0" />
                          Win exciting prizes!
                        </li>
                      </ul>
                    </div>

                    <motion.button
                      onClick={handleStartQuiz}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white font-bold text-lg hover:brightness-110 transition-all shadow-[0_0_20px_rgba(0,146,228,0.3)] mt-4"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Start Quiz
                    </motion.button>
                  </div>
                </div>
            </motion.div>
          ) : showResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0078D4] to-[#0092E4] flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(0,146,228,0.3)]"
                >
                  <Award className="w-12 h-12 text-white" />
                </motion.div>
                <h2 className="text-white text-2xl font-bold mb-4">Quiz Complete!</h2>
                <div className="text-6xl mb-4 font-bold">
                  <span className="text-white">{correctAnswers}</span>
                  <span className="text-blue-200">/{questions.length}</span>
                </div>
                <p className="text-blue-200 mb-2">Correct Answers</p>
                <div className="mt-4 mb-8 bg-[#0092E4]/10 border border-[#0092E4]/30 rounded-xl py-4 px-10 inline-block shadow-[0_0_15px_rgba(0,146,228,0.2)]">
                  <p className="text-blue-200 text-sm uppercase tracking-wider mb-1">Total Points</p>
                  <p className="text-[#0092E4] text-4xl font-bold">{correctAnswers * 10}</p>
                </div>
                <motion.button
                  onClick={goHome}
                  className="px-10 py-3 rounded-xl bg-gradient-to-r from-[#0078D4] to-[#0092E4] text-white font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Main Menu
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Question Screen */}
              <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                 {/* Top Bar */}
                 <div className="flex justify-between items-center text-blue-200 mb-4">
                   <span>Question {currentQuestion + 1} / {questions.length}</span>
                   <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                 </div>
                 {/* Progress Bar */}
                 <div className="w-full h-2 bg-white/10 rounded-full mb-8">
                   <motion.div 
                     className="h-full bg-gradient-to-r from-[#0078D4] to-[#0092E4] rounded-full shadow-[0_0_10px_rgba(0,146,228,0.5)]" 
                     initial={{ width: 0 }}
                     animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                     transition={{ duration: 0.5 }}
                   />
                 </div>

                 {/* Timer */}
                 <div className="border border-[#0092E4]/30 bg-[#0092E4]/10 rounded-xl p-4 flex items-center justify-center gap-2 mb-8">
                   <Clock className="w-5 h-5 text-[#0092E4]" />
                   <span className="text-[#0092E4] font-bold text-xl">{timeLeft}s</span>
                 </div>

                 {/* Question */}
                 <div className="mb-8">
                   <h3 className="text-white text-xl md:text-2xl font-bold">
                     {questions[currentQuestion].question}
                   </h3>
                 </div>

                 {/* Options */}
                 <div className="space-y-4">
                   {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 rounded-xl text-left transition-all ${
                          selectedAnswer === null
                            ? 'bg-white/5 border border-white/10 hover:bg-[#0092E4]/20 hover:border-[#0092E4] text-white'
                            : selectedAnswer === index
                            ? index === questions[currentQuestion].correct
                              ? 'bg-green-500/20 border-2 border-green-500 text-white'
                              : 'bg-red-500/20 border-2 border-red-500 text-white'
                            : index === questions[currentQuestion].correct
                            ? 'bg-green-500/20 border-2 border-green-500 text-white'
                            : 'bg-white/5 border border-white/10 text-gray-400'
                        }`}
                        whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                        whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {selectedAnswer !== null && (
                            <>
                              {index === questions[currentQuestion].correct && (
                                <CheckCircle className="w-6 h-6 text-green-400" />
                              )}
                              {selectedAnswer === index && index !== questions[currentQuestion].correct && (
                                <XCircle className="w-6 h-6 text-red-400" />
                              )}
                            </>
                          )}
                        </div>
                      </motion.button>
                   ))}
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}