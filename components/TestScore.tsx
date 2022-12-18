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
  responses: Response[];
  answers: Answer[];
  isResultsBtnDisabled: boolean;
};

export const TestResult = ({
  responses,
  answers,
  isResultsBtnDisabled,
}:Props) => {
  const [isResultVisible, setIsResultVisible] = useState(false);
  const passStatus = getTestPassStatus(responses, answers);
  const explanations = getExplanations(responses, answers, passStatus);

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
