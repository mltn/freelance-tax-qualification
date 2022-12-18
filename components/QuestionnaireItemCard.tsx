import { QuestionnaireItem, Response } from "../interfaces";
import ResponseOption from "./ResponseOption";

type Props = {
  items: QuestionnaireItem[];
  responses: Response[];
  setResponse: (response: Response) => void;
};

export default function QuestionnaireItemCard({
  item,
  responses,
  setResponse,
}) {
  return (
    <div
      role="radiogroup"
      aria-labelledby={`${item.question.id}-label`}
      className="question max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-4"
    >
      <h2 className="mb-3">
        <strong>{item.question.question}</strong>
        <br />
        {item.question.explanation}
      </h2>
      <div>
        {item.answers.map((answer) => (
          <ResponseOption
            key={answer.id}
            item={item}
            answer={answer}
            responses={responses}
            setResponse={setResponse}
          />
        ))}
      </div>
    </div>
  );
}
