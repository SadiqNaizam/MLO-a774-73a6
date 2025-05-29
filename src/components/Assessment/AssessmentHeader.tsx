import React from 'react';
import { cn } from '@/lib/utils';

interface AssessmentHeaderProps {
  title?: string;
  subheading?: string;
  className?: string;
}

const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
  title = "AI QUOTIENT (AIQ) ASSESSMENT",
  subheading = "SCREENING AI-FRIENDLY TALENT",
  className,
}) => {
  return (
    <div className={cn("text-center py-4 md:py-6 bg-background", className)}>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h1>
      {subheading && (
        <p className="mt-1 sm:mt-2 text-md sm:text-lg md:text-xl text-muted-foreground">
          {subheading}
        </p>
      )}
    </div>
  );
};

export default AssessmentHeader;