import React from "react";
import { Criteria, PassStatus } from "../interfaces";
import { getCriteriaPassStatus } from "../lib/expressionEvaluation";

type Props = {
  step: Criteria;
  responses: Response[];
  active: boolean;
};

//set border color based on PassStatus
const getBorderClass = (passStatus: PassStatus) => {
  let borderClass = "";
  switch (passStatus) {
    case PassStatus.Passed:
      borderClass = "border-green-500";
      break;
    case PassStatus.Failed:
      borderClass = "border-red-500";
      break;
    default:
      borderClass = "border-gray-300";
      break;
  }
  return borderClass;
};

export const SingleStep = ({ step, responses, active }) => {
  const passStatus = getCriteriaPassStatus(step, responses);
  const borderClass = getBorderClass(passStatus);
  return (
    <div className="inline-block px-3">
      <div
        className={`step ${
          active ? "step--active" : ""
        } border-l-8 ${borderClass} p-3 w-64 h-48 max-w-xs overflow-hidden rounded-xs shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out`}
      >
        <div className="step__title">{step.title}</div>
        <div className="step__description">{step.description}</div>
      </div>
    </div>
  );
};
