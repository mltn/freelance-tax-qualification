import { useRef } from "react";
import { Answer, Response, QuestionnaireItem } from "../interfaces";
import { isChecked } from "../lib/questionnaireHelpers";

type Props = {
  items: QuestionnaireItem[];
  answer: Answer;
  responses: Response[];
  setResponse: (response: Response) => void;
};

export default function ResponseOption({
  item,
  answer,
  responses,
  setResponse,
}) {
  const domElement = useRef(null);
  const checked = isChecked(answer, responses, item);
  return (
    <p
      ref={domElement}
      className={`${
        checked ? "bg-blue-500 text-white font-semibold" : "bg-white"
      } mb-2 cursor-pointer p-2 px-3 rounded-md border border-gray-400`}
      onClick={(e) => {
        setResponse({
          questionId: item.question.id,
          answerId: answer.id,
        });
      }}
      onKeyDown={(e) => {
        // if element has focus, select on enter or space
        if (e.keyCode === 13 || e.keyCode === 32) {
          e.preventDefault();
          setResponse({
            questionId: item.question.id,
            answerId: answer.id,
          });
        }
        // Moves up and down radio options with arrow keys
        if (e.keyCode === 38) {
          e.preventDefault();
          const previousSibling = domElement.current.previousSibling;
          if (previousSibling) {
            previousSibling.focus();
          }
        }
        if (e.keyCode === 40) {
          e.preventDefault();
          const nextSibling = domElement.current.nextSibling;
          if (nextSibling) {
            nextSibling.focus();
          }
        }
      }}
      aria-checked={checked}
      role="radio"
      tabIndex={
        // if first option, tabIndex should be 0
        // if not first option, tabIndex should be -1
        item.answers.indexOf(answer) === 0 ? 0 : -1
      }
      key={answer.id}
    >
      {answer.answer}
    </p>
  );
}
