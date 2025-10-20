import { Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface TimerProps {
  timeRemaining: number;
  totalTime: number;
}

export const Timer = ({ timeRemaining, totalTime }: TimerProps) => {
  const percentage = (timeRemaining / totalTime) * 100;
  const isLowTime = timeRemaining <= 10;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Clock className={`h-4 w-4 ${isLowTime ? 'text-destructive animate-pulse' : 'text-muted-foreground'}`} />
          <span className={`font-medium ${isLowTime ? 'text-destructive' : 'text-foreground'}`}>
            {timeRemaining}s
          </span>
        </div>
        <span className="text-muted-foreground">
          Time Remaining
        </span>
      </div>
      <Progress 
        value={percentage} 
        className={`h-2 ${isLowTime ? 'bg-destructive/20' : ''}`}
      />
    </div>
  );
};
