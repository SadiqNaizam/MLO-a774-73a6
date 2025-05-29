import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export type AIQLevel = 'High' | 'Medium' | 'Low';

const aiqLevelsData: { id: AIQLevel; label: string }[] = [
  { id: 'High' as const, label: 'High' },
  { id: 'Medium' as const, label: 'Medium' },
  { id: 'Low' as const, label: 'Low' },
];

interface AIScoreCardProps {
  selectedLevel: AIQLevel | null;
  className?: string;
}

const AIScoreCard: React.FC<AIScoreCardProps> = ({
  selectedLevel,
  className,
}) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2 pt-4 px-4 sm:px-6">
        <CardTitle className="text-base sm:text-lg flex items-center">AIQ Level:</CardTitle>
      </CardHeader>
      <CardContent className="pt-2 pb-4 px-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2">
          {aiqLevelsData.map((level) => (
            <div key={level.id} className="flex items-center space-x-2">
              <Checkbox
                id={`aiq-${level.id.toLowerCase()}`}
                checked={selectedLevel === level.id}
                disabled
                aria-label={level.label}
                className="h-5 w-5 border-muted-foreground data-[state=checked]:bg-green-500 data-[state=checked]:border-green-600 data-[state=checked]:text-white"
              />
              <Label htmlFor={`aiq-${level.id.toLowerCase()}`} className="text-sm font-medium text-foreground">
                {level.label}
              </Label>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          (Auto calculated using above inputs)
        </p>
      </CardContent>
    </Card>
  );
};

export default AIScoreCard;