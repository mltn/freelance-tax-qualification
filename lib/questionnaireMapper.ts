import { Question, Answer, QuestionnaireItem } from "../interfaces";

const questionsFromSheetRows = (rows: any[]): Question[] =>
  rows
    .filter((row) => {
      return row[0] && !isNaN(Number(row[0]));
    })
    .reduce((acc, row) => {
      const question = {
        id: row[0],
        question: row[2],
        explanation: row[3] || "",
        showIfResponseHasAnswerId: row[1] || null,
      };
      // if question is not already in acc, add question to acc
      if (!acc.find((q) => q.id === question.id)) {
        acc.push(question);
      }
      return acc;
    }, []);
const answersFromSheetRows = (rows: any[]): Answer[] =>
  rows
    .filter((row) => {
      return row[0] && !isNaN(Number(row[0]));
    })
    .reduce((acc, row) => {
      const answer = {
        id: row[5],
        answer: row[6],
        isFailingAnswer: row[4] == "1",
        explanation: row[7] || "",
        questionId: row[0],
      };
      acc.push(answer);
      return acc;
    }, []);

export const questionnaireFromSheetRows = (
  rows: any[]
): QuestionnaireItem[] => {
  const questions: Question[] = questionsFromSheetRows(rows);
  const answers: Answer[] = answersFromSheetRows(rows);

  const questionnaire: QuestionnaireItem[] = questions.map((question) => {
    const answersForQuestion = answers.filter((answer) => {
      return answer.questionId === question.id;
    });
    return {
      question,
      answers: answersForQuestion,
    };
  });
  return questionnaire;
};
