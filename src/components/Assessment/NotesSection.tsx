import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NotesSectionProps {
  notes: string;
  onNotesChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const NotesSection: React.FC<NotesSectionProps> = ({
  notes,
  onNotesChange,
  placeholder = "Enter screener notes and comments here...",
  className,
}) => {
  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-2 pt-4 px-4 sm:px-6">
        <CardTitle className="text-base sm:text-lg">Screener Notes / Comments:</CardTitle>
      </CardHeader>
      <CardContent className="pt-2 pb-4 px-4 sm:px-6">
        <Textarea
          id="screener-notes"
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[100px] sm:min-h-[120px] text-sm bg-background border-border focus-visible:ring-1 focus-visible:ring-ring resize-y w-full"
          rows={4}
        />
      </CardContent>
    </Card>
  );
};

export default NotesSection;
