// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

export type User = {
  id: number;
  name: string;
};

// add question type
export type Question = {
  id: number;
  question: string;
  explanation: string;
  showIfResponseHasAnswerId: string;
};

export type Answer = {
  id: number;
  answer: string;
  isFailingAnswer: boolean;
  explanation: string;
  questionId: number;
};

export type Response = {
  questionId: number;
  answerId: number;
};

export type QuestionnaireItem = {
  question: Question;
  answers: Answer[];
};

export type Criteria = {
  index: number;
  title: string;
  description: string;
  passFormula: string;
  failFormula: string;
  questions: QuestionnaireItem[];
};

export enum PassStatus {
  Passed = "passed",
  Failed = "failed",
  Incomplete = "incomplete",
}
