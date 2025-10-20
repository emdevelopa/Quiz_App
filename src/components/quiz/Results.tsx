import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trophy, RotateCcw, Award, TrendingUp } from 'lucide-react';
import { LeaderboardEntry } from '@/types/quiz';
import { toast } from '@/hooks/use-toast';

interface ResultsProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  onViewLeaderboard: () => void;
}

export const Results = ({ score, totalQuestions, onRestart, onViewLeaderboard }: ResultsProps) => {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getGrade = () => {
    if (percentage >= 90) return { grade: 'A+', message: 'Outstanding!', color: 'text-success' };
    if (percentage >= 80) return { grade: 'A', message: 'Excellent!', color: 'text-success' };
    if (percentage >= 70) return { grade: 'B', message: 'Great job!', color: 'text-secondary' };
    if (percentage >= 60) return { grade: 'C', message: 'Good effort!', color: 'text-secondary' };
    return { grade: 'D', message: 'Keep practicing!', color: 'text-muted-foreground' };
  };

  const { grade, message, color } = getGrade();

  const saveToLeaderboard = () => {
    if (!name.trim()) {
      toast({
        title: 'Name required',
        description: 'Please enter your name to save your score.',
        variant: 'destructive',
      });
      return;
    }

    const entry: LeaderboardEntry = {
      name: name.trim(),
      score,
      percentage,
      date: new Date().toISOString(),
      questionsAnswered: totalQuestions,
    };

    const leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
    leaderboard.push(entry);
    leaderboard.sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.percentage - a.percentage);
    localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard.slice(0, 10)));

    setSaved(true);
    toast({
      title: 'Score saved!',
      description: 'Your score has been added to the leaderboard.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 shadow-lg">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-primary rounded-full mb-4 animate-celebrate">
            <Trophy className="h-12 w-12 text-white" />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">Quiz Complete!</h1>
            <p className="text-xl text-muted-foreground">{message}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
            <div className="flex flex-col items-center gap-2 p-6 bg-muted rounded-lg">
              <Award className="h-8 w-8 text-primary" />
              <span className={`text-4xl font-bold ${color}`}>{grade}</span>
              <span className="text-sm text-muted-foreground">Grade</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 bg-muted rounded-lg">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="text-4xl font-bold text-foreground">{score}/{totalQuestions}</span>
              <span className="text-sm text-muted-foreground">Score</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 bg-muted rounded-lg">
              <TrendingUp className="h-8 w-8 text-primary" />
              <span className="text-4xl font-bold text-foreground">{percentage}%</span>
              <span className="text-sm text-muted-foreground">Accuracy</span>
            </div>
          </div>

          {!saved && (
            <div className="space-y-3 p-6 bg-muted rounded-lg">
              <p className="text-sm font-medium text-foreground">Save your score to the leaderboard!</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && saveToLeaderboard()}
                  className="flex-1"
                />
                <Button onClick={saveToLeaderboard} className="bg-gradient-primary hover:opacity-90">
                  Save
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button 
              onClick={onRestart}
              className="w-full bg-gradient-primary hover:opacity-90 font-semibold shadow-md"
              size="lg"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Try Again
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
        </div>
      </Card>
    </div>
  );
};
