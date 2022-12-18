import React from "react";
import { Criteria } from "../interfaces";
import { SingleStep } from "./SingleStep";

type Props = {
  steps: Criteria[];
  responses: Response[];
  currentStep: number;
};
// stepper component
export const Stepper = ({ steps, responses, currentStep }) => {
  return (
    <div className="stepper flex overflow-x-scroll hide-scroll-bar mt-4">
      <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
        {steps.map((step, index) => {
          return (
            <SingleStep
              key={step.index}
              step={step}
              responses={responses}
              active={index === currentStep}
            />
          );
        })}
      </div>
    </div>
  );
};
