import { Question as QuestionType } from '@/types/quiz';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

interface QuestionProps {
  question: QuestionType;
  selectedAnswer: number | null;
  showFeedback: boolean;
  onSelectAnswer: (index: number) => void;
}

export const Question = ({ 
  question, 
  selectedAnswer, 
  showFeedback, 
  onSelectAnswer 
}: QuestionProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {question.category}
          </span>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            question.difficulty === 'easy' 
              ? 'bg-success/10 text-success' 
              : question.difficulty === 'medium'
              ? 'bg-secondary/10 text-secondary'
              : 'bg-destructive/10 text-destructive'
          }`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          {question.question}
        </h2>
      </div>

      <div className="grid gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          const showCorrect = showFeedback && isCorrect;
          const showIncorrect = showFeedback && isSelected && !isCorrect;

          return (
            <Card
              key={index}
              className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                showCorrect
                  ? 'bg-success/10 border-success shadow-md'
                  : showIncorrect
                  ? 'bg-destructive/10 border-destructive shadow-md'
                  : isSelected && !showFeedback
                  ? 'bg-primary/10 border-primary'
                  : 'hover:border-primary/50'
              } ${showFeedback ? 'cursor-not-allowed' : ''}`}
              onClick={() => !showFeedback && onSelectAnswer(index)}
            >
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium">{option}</span>
                {showCorrect && (
                  <Check className="h-5 w-5 text-success animate-celebrate" />
                )}
                {showIncorrect && (
                  <X className="h-5 w-5 text-destructive animate-celebrate" />
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {showFeedback && (
        <div className={`p-4 rounded-lg ${
          selectedAnswer === question.correctAnswer
            ? 'bg-success/10 border border-success/20'
            : 'bg-destructive/10 border border-destructive/20'
        } animate-fade-in`}>
          <p className={`font-medium ${
            selectedAnswer === question.correctAnswer
              ? 'text-success'
              : 'text-destructive'
          }`}>
            {selectedAnswer === question.correctAnswer
              ? '🎉 Correct! Well done!'
              : selectedAnswer === -1
              ? "⏰ Time's up! Don't worry, keep going!"
              : '❌ Not quite right. Keep trying!'}
          </p>
        </div>
      )}
    </div>
  );
};
