import React from "react";
import { QuestionnaireItem, Response } from "../interfaces";
import QuestionnaireItemCard from "./QuestionnaireItemCard";
import { getVisibleItems } from "../lib/questionnaireHelpers";

type Props = {
  items: QuestionnaireItem[];
  responses: Response[];
  setResponse: (response: Response) => void;
};

export const Questionnaire = ({ items, setResponse, responses }: Props) => {
  const visibleQuestionnaireItems = getVisibleItems(items, responses);

  return (
    <div className="questionnaire p-4 mx-auto">
      <h2 className="text-lg font-semibold m-4">
        Odgovorite na sledeća pitanja:
      </h2>
      <div className="questionCards">
        {visibleQuestionnaireItems.map((item, itemsIndex) => (
          <QuestionnaireItemCard
            key={itemsIndex}
            item={item}
            responses={responses}
            setResponse={setResponse}
          />
        ))}
      </div>
    </div>
  );
};
