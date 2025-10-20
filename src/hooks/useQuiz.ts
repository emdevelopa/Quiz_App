import { useState, useEffect, useCallback } from 'react';
import { Question, QuizState } from '@/types/quiz';

const QUESTION_TIME = 30; // 30 seconds per question

export const useQuiz = (questions: Question[]) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
    isComplete: false,
    timeRemaining: QUESTION_TIME,
    showFeedback: false,
    selectedAnswer: null,
  });

  // Timer logic
  useEffect(() => {
    if (quizState.isComplete || quizState.showFeedback) return;

    const timer = setInterval(() => {
      setQuizState((prev) => {
        if (prev.timeRemaining <= 1) {
          // Time's up - auto submit with no answer
          return {
            ...prev,
            timeRemaining: 0,
            showFeedback: true,
            selectedAnswer: -1, // -1 indicates no answer
          };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState.isComplete, quizState.showFeedback]);

  const selectAnswer = useCallback((answerIndex: number) => {
    if (quizState.showFeedback) return;

    const currentQuestion = questions[quizState.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;

    setQuizState((prev) => ({
      ...prev,
      selectedAnswer: answerIndex,
      showFeedback: true,
      score: isCorrect ? prev.score + 1 : prev.score,
      answers: [...prev.answers, answerIndex],
    }));
  }, [quizState.currentQuestionIndex, quizState.showFeedback, questions]);

  const nextQuestion = useCallback(() => {
    setQuizState((prev) => {
      const nextIndex = prev.currentQuestionIndex + 1;
      
      if (nextIndex >= questions.length) {
        return { ...prev, isComplete: true };
      }

      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        timeRemaining: QUESTION_TIME,
        showFeedback: false,
        selectedAnswer: null,
      };
    });
  }, [questions.length]);

  const resetQuiz = useCallback(() => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answers: [],
      isComplete: false,
      timeRemaining: QUESTION_TIME,
      showFeedback: false,
      selectedAnswer: null,
    });
  }, []);

  return {
    quizState,
    selectAnswer,
    nextQuestion,
    resetQuiz,
    currentQuestion: questions[quizState.currentQuestionIndex],
    totalQuestions: questions.length,
  };
};
