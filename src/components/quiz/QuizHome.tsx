import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Clock, Trophy, Zap } from 'lucide-react';

interface QuizHomeProps {
  onStart: () => void;
  onViewLeaderboard: () => void;
  totalQuestions: number;
}

export const QuizHome = ({ onStart, onViewLeaderboard, totalQuestions }: QuizHomeProps) => {
  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 shadow-lg">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-primary rounded-full mb-4 animate-pulse-glow">
            <Brain className="h-10 w-10 text-white" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Quiz Master
            </h1>
            <p className="text-muted-foreground text-lg">
              Test your knowledge and challenge yourself!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
            <div className="flex flex-col items-center gap-2 p-4 bg-muted rounded-lg">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-foreground">{totalQuestions}</span>
              <span className="text-sm text-muted-foreground">Questions</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-muted rounded-lg">
              <Clock className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-foreground">30s</span>
              <span className="text-sm text-muted-foreground">Per Question</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 bg-muted rounded-lg">
              <Trophy className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-foreground">Score</span>
              <span className="text-sm text-muted-foreground">Track Progress</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={onStart}
              className="w-full bg-gradient-primary hover:opacity-90 text-lg py-6 font-semibold shadow-md"
              size="lg"
            >
              Start Quiz
            </Button>
            <Button 
              onClick={onViewLeaderboard}
              variant="outline"
              className="w-full"
              size="lg"
            >
              View Leaderboard
            </Button>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Answer questions correctly to earn points. Each question has a 30-second timer!
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
