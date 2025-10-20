export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: number[];
  isComplete: boolean;
  timeRemaining: number;
  showFeedback: boolean;
  selectedAnswer: number | null;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  percentage: number;
  date: string;
  questionsAnswered: number;
}
