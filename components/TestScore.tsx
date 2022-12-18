import React from "react";
import { useState } from "react";
import { Answer, Question, Response, Criteria } from "../interfaces";
import {
  getExplanations,
  getTestPassStatus,
} from "../lib/questionnaireHelpers";
import ResultsModal from "./ResultsModal";
import ResultsButton from "./ResultsButton";

type Props = {
  testCriteria: Criteria[];
  responses: Response[];
  answers: Answer[];
  isResultsBtnDisabled: boolean;
};

export const TestResult = ({
  testCriteria,
  responses,
  answers,
  isResultsBtnDisabled,
}:Props) => {
  const [isResultVisible, setIsResultVisible] = useState(false);
  const passStatus = getTestPassStatus(testCriteria, responses, answers);
  const explanations = getExplanations(responses, answers, passStatus);
console.log(responses.map(r => r.questionId + ":" + r.answerId), answers);

  if (!isResultVisible) {
    return (
      <ResultsButton
        isResultsBtnDisabled={isResultsBtnDisabled}
        showResultsModal={() => setIsResultVisible(true)}
      />
    );
  } else {
    return (
      <ResultsModal
        explanations={explanations}
        passStatus={passStatus}
        hideModal={() => setIsResultVisible(false)}
      />
    );
  }
};
