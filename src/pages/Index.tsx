import React, { useState, useEffect, useCallback } from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import AssessmentHeader from '../components/Assessment/AssessmentHeader';
import QuestionCard from '../components/Assessment/QuestionCard';
import { AIScoreCard, AIQLevel } from '../components/Assessment/AIScoreCard';
import NotesSection from '../components/Assessment/NotesSection';

// TypeScript interface for a single question
interface Question {
  id: string;
  number: string;
  text: string;
  hint?: string;
  isRelevant: boolean;
  isNonRelevant: boolean;
}

// Initial dummy data for questions based on OCR and image
const initialQuestionsData: Question[] = [
  {
    id: 'q1',
    number: '01',
    text: 'Tell me about a time when you adopted a new technology or tool on your own. What motivated you, and what was the result?',
    hint: '(Looks for curiosity and initiative)',
    isRelevant: true,
    isNonRelevant: false,
  },
  {
    id: 'q2',
    number: '02',
    text: 'How do you stay up to date with new trends or tools in your field? Have you come across anything AI-related?',
    hint: '(Assesses awareness and interest)',
    isRelevant: false,
    isNonRelevant: true,
  },
  {
    id: 'q3',
    number: '03',
    text: 'Have you experimented with any AI tools, even casually? (e.g., ChatGPT, image generators, automation bots)',
    hint: '(Gauges willingness to experiment)',
    isRelevant: true,
    isNonRelevant: false,
  },
  {
    id: 'q4',
    number: '04',
    text: 'Can you think of a repetitive or time-consuming task in your role that could benefit from automation or AI?',
    hint: '(Tests ability to identify practical AI opportunities)',
    isRelevant: false,
    isNonRelevant: true,
  },
  {
    id: 'q5',
    number: '05',
    text: 'Tell me about a time you had to change your way of working because of a new process or tool. How did you respond?',
    hint: '(Evaluates adaptability)',
    isRelevant: true,
    isNonRelevant: false,
  },
  {
    id: 'q6',
    number: '06',
    text: 'Can you open an AI tool of your choice and show me how you would use it to solve something or get a result? Pls walk me through the process, step by step',
    // hint: No explicit hint in OCR text for Q6, so it's omitted
    isRelevant: false,
    isNonRelevant: true,
  },
];

const TalentAssessmentPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(initialQuestionsData);
  const [aiqLevel, setAiqLevel] = useState<AIQLevel | null>(null);
  const [screenerNotes, setScreenerNotes] = useState<string>('');

  const handleRelevanceChange = useCallback(
    (questionId: string, type: 'relevant' | 'non-relevant', isNowChecked: boolean) => {
      setQuestions(prevQuestions =>
        prevQuestions.map(q => {
          if (q.id === questionId) {
            if (type === 'relevant') {
              return { 
                ...q, 
                isRelevant: isNowChecked, 
                isNonRelevant: isNowChecked ? false : q.isNonRelevant 
              };
            } else { // type === 'non-relevant'
              return { 
                ...q, 
                isNonRelevant: isNowChecked, 
                isRelevant: isNowChecked ? false : q.isRelevant 
              };
            }
          }
          return q;
        })
      );
    },
    []
  );

  useEffect(() => {
    const relevantCount = questions.filter(q => q.isRelevant).length;
    if (relevantCount >= 5) {
      setAiqLevel('High' as const);
    } else if (relevantCount >= 3) {
      setAiqLevel('Medium' as const);
    } else {
      setAiqLevel('Low' as const);
    }
  }, [questions]);

  return (
    <MainAppLayout>
      <AssessmentHeader />
      <div className="flex flex-col gap-4">
        {questions.map(question => (
          <QuestionCard
            key={question.id}
            questionNumber={question.number}
            questionText={question.text}
            questionHint={question.hint}
            isRelevant={question.isRelevant}
            isNonRelevant={question.isNonRelevant}
            onRelevanceChange={(type, checked) =>
              handleRelevanceChange(question.id, type, checked)
            }
          />
        ))}
      </div>
      <AIScoreCard selectedLevel={aiqLevel} />
      <NotesSection
        notes={screenerNotes}
        onNotesChange={setScreenerNotes}
      />
    </MainAppLayout>
  );
};

export default TalentAssessmentPage;
