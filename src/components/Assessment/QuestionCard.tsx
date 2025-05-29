import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';

interface QuestionCardProps {
  questionNumber: string;
  questionText: string;
  questionHint?: string;
  isRelevant: boolean;
  isNonRelevant: boolean;
  onRelevanceChange: (type: 'relevant' | 'non-relevant', checked: boolean) => void;
  className?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  questionNumber,
  questionText,
  questionHint,
  isRelevant,
  isNonRelevant,
  onRelevanceChange,
  className,
}) => {

  const handleRelevantChange = React.useCallback((checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') {
      onRelevanceChange('relevant', checked);
    }
  }, [onRelevanceChange]);

  const handleNonRelevantChange = React.useCallback((checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') {
      onRelevanceChange('non-relevant', checked);
    }
  }, [onRelevanceChange]);

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-3 sm:p-4 grid grid-cols-[auto_1fr_auto_auto] items-start gap-x-3 sm:gap-x-4">
        <div className="flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-destructive text-destructive-foreground font-bold text-xs sm:text-sm mt-1 shrink-0">
          {questionNumber}
        </div>

        <div className="flex flex-col min-w-0">
          <p className="text-sm sm:text-base font-medium text-foreground break-words">{questionText}</p>
          {questionHint && (
            <p className="text-xs sm:text-sm text-muted-foreground italic mt-1 break-words">{questionHint}</p>
          )}
        </div>

        <div className="flex justify-center items-start pt-1 sm:pt-[0.375rem]">
          <Checkbox
            id={`relevant-${questionNumber}-${Math.random().toString(36).substring(7)}`}
            checked={isRelevant}
            onCheckedChange={handleRelevantChange}
            aria-label={`Question ${questionNumber} Relevant`}
            className="h-5 w-5 sm:h-6 sm:w-6 border-2 border-muted-foreground data-[state=checked]:bg-green-500 data-[state=checked]:border-green-600 data-[state=checked]:text-white shrink-0"
          />
        </div>

        <div className="flex justify-center items-start pt-1 sm:pt-[0.375rem]">
          <Checkbox
            id={`non-relevant-${questionNumber}-${Math.random().toString(36).substring(7)}`}
            checked={isNonRelevant}
            onCheckedChange={handleNonRelevantChange}
            aria-label={`Question ${questionNumber} Non-Relevant`}
            className="h-5 w-5 sm:h-6 sm:w-6 border-2 border-muted-foreground data-[state=checked]:bg-green-500 data-[state=checked]:border-green-600 data-[state=checked]:text-white shrink-0"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;