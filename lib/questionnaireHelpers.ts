import {
  Question,
  Answer,
  Response,
  PassStatus,
  QuestionnaireItem,
  Criteria,
} from "../interfaces/index";
import { getCriteriaPassStatus } from "./expressionEvaluation";

export const getTestPassStatus = (
  responses: Response[],
  answers: Answer[]
): PassStatus => {
  const isFailed = responses.some(r => answers.filter(a => a.isFailingAnswer && a.id === r.answerId));
  const passStatus = isFailed
      ? PassStatus.Failed : PassStatus.Passed
  return passStatus;
};

export const isChecked = (
  answer: Answer,
  responses: Response[],
  item: QuestionnaireItem
): boolean => {
  return responses.some(
    (r) => r.questionId === item.question.id && r.answerId === answer.id
  );
};

export const getVisibleItems = (
  items: QuestionnaireItem[],
  responses: Response[]
): QuestionnaireItem[] => {
  const visibleItems = items.filter((item) => {
    const hasPrecondition = item.question.showIfResponseHasAnswerId != null;
    const isPreconditionResponseGiven = responses.some((response) =>
      item.question.showIfResponseHasAnswerId
        ?.split(",")
        ?.includes("" + response.answerId)
    );
    const isVisible = !hasPrecondition || isPreconditionResponseGiven;
    return isVisible;
  });
  return visibleItems;
};

export const getExplanations = (
  responses: Response[],
  answers: Answer[],
  passStatus: PassStatus
): String[] => {
  console.log(responses.map(r => r.questionId + ":" + r.answerId));
  return responses
    .filter((response) => {
      const answer = answers.find((answer) => answer.id === response.answerId);
      const hasExplanation = answer.explanation != "";
      const isFailingAnswer = answer.isFailingAnswer;
      const passed = passStatus === PassStatus.Passed;
      const answerAndStatusMatch =
        (isFailingAnswer && !passed) || (!isFailingAnswer && passed);
      return hasExplanation;
    })
    .map(
      (response) =>
        answers.find((answer) => answer.id === response.answerId).explanation
    );
};

export function areAllVisibleQuestionsAnswered(
  questions: Question[],
  responses: Response[]
) {
  return questions.every((question) => {
    const isRequiredResponseGiven = responses.some((response) =>
      // is response.answerId in comma-separated list of answerIds in showIfResponseHasAnswerId
      question.showIfResponseHasAnswerId
        ?.split(",")
        ?.includes("" + response.answerId)
    );
    const isQuestionVisible =
      !question.showIfResponseHasAnswerId || isRequiredResponseGiven;
    const isQuestionResponseGiven = responses.some(
      (response) => response.questionId === question.id
    );
    return !isQuestionVisible || isQuestionResponseGiven;
  });
}
