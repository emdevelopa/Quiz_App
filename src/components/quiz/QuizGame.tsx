import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Question } from './Question';
import { Timer } from './Timer';
import { ArrowRight, Trophy } from 'lucide-react';

interface QuizGameProps {
  currentQuestion: any;
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  timeRemaining: number;
  showFeedback: boolean;
  selectedAnswer: number | null;
  onSelectAnswer: (index: number) => void;
  onNextQuestion: () => void;
}

export const QuizGame = ({
  currentQuestion,
  currentQuestionIndex,
  totalQuestions,
  score,
  timeRemaining,
  showFeedback,
  selectedAnswer,
  onSelectAnswer,
  onNextQuestion,
}: QuizGameProps) => {
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full p-8 shadow-lg">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="text-lg font-semibold text-foreground">
                  Score: {score}/{totalQuestions}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </span>
            </div>
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">
                {Math.round(progress)}% Complete
              </p>
            </div>
          </div>

          {/* Timer */}
          <Timer timeRemaining={timeRemaining} totalTime={30} />

          {/* Question */}
          <Question
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showFeedback={showFeedback}
            onSelectAnswer={onSelectAnswer}
          />

          {/* Next Button */}
          {showFeedback && (
            <Button
              onClick={onNextQuestion}
              className="w-full bg-gradient-primary hover:opacity-90 font-semibold shadow-md"
              size="lg"
            >
              {currentQuestionIndex < totalQuestions - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              ) : (
                'View Results'
              )}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};
