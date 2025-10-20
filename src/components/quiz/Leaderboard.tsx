import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Medal, ArrowLeft, Calendar } from 'lucide-react';
import { LeaderboardEntry } from '@/types/quiz';

interface LeaderboardProps {
  onBack: () => void;
}

export const Leaderboard = ({ onBack }: LeaderboardProps) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
    setEntries(leaderboard);
  }, []);

  const getMedalColor = (index: number) => {
    if (index === 0) return 'text-yellow-500';
    if (index === 1) return 'text-gray-400';
    if (index === 2) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full p-8 shadow-lg">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Leaderboard
            </h1>
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No scores yet!</p>
              <p className="text-sm text-muted-foreground mt-2">
                Be the first to complete the quiz and save your score.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, index) => (
                <Card 
                  key={index}
                  className={`p-4 ${
                    index < 3 ? 'bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20' : ''
                  } hover:shadow-md transition-all`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-12 text-center">
                      {index < 3 ? (
                        <Medal className={`h-8 w-8 ${getMedalColor(index)}`} />
                      ) : (
                        <span className="text-2xl font-bold text-muted-foreground">
                          {index + 1}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{entry.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {formatDate(entry.date)}
                      </div>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="text-2xl font-bold text-foreground">
                        {entry.percentage}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {entry.score}/{entry.questionsAnswered}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {entries.length > 0 && (
            <div className="pt-4 border-t text-center">
              <p className="text-sm text-muted-foreground">
                Top 10 scores are displayed
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
