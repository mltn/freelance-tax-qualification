import React from "react";
import { useState } from "react";
import { Questionnaire } from "../components/Questionnaire";
import { TestResult } from "../components/TestScore";
import {
  PassStatus,
  Question,
  Answer,
  Response,
  QuestionnaireItem,
  Criteria,
} from "../interfaces";
import { getSheetRows } from "./api/googleSheets/googleSheetsApi";
import { questionnaireFromSheetRows } from "../lib/questionnaireMapper";
import { criteriaFromSheetRows } from "../lib/criteriaMapper";
import { areAllVisibleQuestionsAnswered } from "../lib/questionnaireHelpers";

type Props = {
  questionnaire: QuestionnaireItem[];
  testCriteria: Criteria[];
};

const IndexPage = ({ questionnaire, testCriteria }: Props) => {
  const [responses, setResponses] = useState<Response[]>([]);
  const questions: Question[] = questionnaire.map((item) => item.question);
  return (
    <main className="flex flex-col min-h-screen mx-auto max-w-screen-sm">
      <h1 className="m-4 text-xl font-semibold text-center">
        Samooporezivanje (freelancer)
      </h1>
      <Questionnaire
        items={questionnaire}
        setResponse={(response: Response) => {
          setResponses((responses) => {
            const existingResponse = responses.find(
              (r) => r.questionId === response.questionId
            );
            if (existingResponse) {
              let updatedResponses = responses.map((r) =>
                r.questionId === response.questionId ? response : r
              );
              let questionIdsToHide = [];
              updatedResponses.forEach((r) => {
                const item = questionnaire.find(
                  (q) => q.question.id === r.questionId
                );
                const hasPrecondition =
                  item.question.showIfResponseHasAnswerId != null;
                const isPreconditionResponseGiven = updatedResponses
                  .filter(
                    (response) =>
                      questionIdsToHide.indexOf(response.questionId) === -1
                  )
                  .some((response) =>
                    item.question.showIfResponseHasAnswerId
                      ?.split(",")
                      ?.includes("" + response.answerId)
                  );
                const isVisible =
                  !hasPrecondition || isPreconditionResponseGiven;
                if (!isVisible) {
                  questionIdsToHide.push(r.questionId);
                }
              });
              return updatedResponses.filter(
                (response) =>
                  questionIdsToHide.indexOf(response.questionId) === -1
              );
            } else {
              return [...responses, response];
            }
          });
        }}
        responses={responses}
      />

      <TestResult
        testCriteria={testCriteria}
        responses={responses}
        answers={questionnaire.flatMap((item) => item.answers)}
        isResultsBtnDisabled={
          !areAllVisibleQuestionsAnswered(questions, responses)
        }
      />
    </main>
  );
};

export default IndexPage;

export async function getStaticProps() {
  const qaRows = await getSheetRows(
    process.env.SPREADSHEET_ID,
    "Pitanja za 5. kriterijum"
  );
  const questionnaire = questionnaireFromSheetRows(qaRows);

  const criteriaRows = await getSheetRows(
    process.env.SPREADSHEET_ID,
    "Test Criteria"
  );
  const testCriteria = criteriaFromSheetRows(criteriaRows).slice(4, 5);

  return {
    props: {
      questionnaire,
      testCriteria,
    },
    revalidate: 20, // In seconds
  };
}
