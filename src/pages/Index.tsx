import { useState, useEffect } from 'react';
import { QuizHome } from '@/components/quiz/QuizHome';
import { QuizGame } from '@/components/quiz/QuizGame';
import { Results } from '@/components/quiz/Results';
import { Leaderboard } from '@/components/quiz/Leaderboard';
import { useQuiz } from '@/hooks/useQuiz';
import { Question } from '@/types/quiz';
import questionsData from '@/data/questions.json';
import { toast } from '@/hooks/use-toast';

type Screen = 'home' | 'quiz' | 'results' | 'leaderboard';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load questions with error handling
  useEffect(() => {
    try {
      if (!questionsData || !Array.isArray(questionsData) || questionsData.length === 0) {
        throw new Error('No questions available');
      }

      // Validate question structure
      const validQuestions = questionsData.filter((q) => {
        return (
          q.id &&
          q.question &&
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          typeof q.correctAnswer === 'number' &&
          q.correctAnswer >= 0 &&
          q.correctAnswer < 4
        );
      });

      if (validQuestions.length === 0) {
        throw new Error('No valid questions found');
      }

      setQuestions(validQuestions as Question[]);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions');
      setLoading(false);
      toast({
        title: 'Error loading questions',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    }
  }, []);

  const {
    quizState,
    selectAnswer,
    nextQuestion,
    resetQuiz,
    currentQuestion,
    totalQuestions,
  } = useQuiz(questions);

  const handleStartQuiz = () => {
    if (questions.length === 0) {
      toast({
        title: 'No questions available',
        description: 'Cannot start quiz without questions.',
        variant: 'destructive',
      });
      return;
    }
    resetQuiz();
    setCurrentScreen('quiz');
  };

  const handleNextQuestion = () => {
    if (quizState.currentQuestionIndex >= totalQuestions - 1) {
      setCurrentScreen('results');
    } else {
      nextQuestion();
    }
  };

  const handleRestart = () => {
    resetQuiz();
    setCurrentScreen('home');
  };

  const handleViewLeaderboard = () => {
    setCurrentScreen('leaderboard');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-2xl font-bold text-destructive">Error</h1>
          <p className="text-muted-foreground">{error || 'No questions available'}</p>
          <p className="text-sm text-muted-foreground">
            Please check the questions.json file and ensure it contains valid quiz questions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentScreen === 'home' && (
        <QuizHome
          onStart={handleStartQuiz}
          onViewLeaderboard={handleViewLeaderboard}
          totalQuestions={totalQuestions}
        />
      )}

      {currentScreen === 'quiz' && currentQuestion && (
        <QuizGame
          currentQuestion={currentQuestion}
          currentQuestionIndex={quizState.currentQuestionIndex}
          totalQuestions={totalQuestions}
          score={quizState.score}
          timeRemaining={quizState.timeRemaining}
          showFeedback={quizState.showFeedback}
          selectedAnswer={quizState.selectedAnswer}
          onSelectAnswer={selectAnswer}
          onNextQuestion={handleNextQuestion}
        />
      )}

      {currentScreen === 'results' && (
        <Results
          score={quizState.score}
          totalQuestions={totalQuestions}
          onRestart={handleRestart}
          onViewLeaderboard={handleViewLeaderboard}
        />
      )}

      {currentScreen === 'leaderboard' && (
        <Leaderboard onBack={handleBackToHome} />
      )}
    </>
  );
};

export default Index;
