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

const IndexPage = ({ questionnaire, testCriteria }) => {
  const [responses, setResponses] = useState<Response[]>([]);
  const questions: Question[] = questionnaire.map((item) => item.question);
  return (
    <main className="flex flex-col min-h-screen mx-auto max-w-screen-sm">
      <h1 className="m-4 text-xl font-semibold text-center">
        Test Samostalnosti - Kriterijum 5.
      </h1>
      <p className="mx-4 ">
        U nastavku se nalazi primer automatizovanog i redefinisanog kriterijuma
        5. testa samostalnosti napravljen za potrebe radne grupe koja ima za
        cilj uređenje statusa lica koja posluju preko interneta. Automatizacija
        je napravljena u cilju predstavljanja ideje Digitalne zajednice
        iznesenoj na radnoj grupi, i ograđujemo se od svakog tumačenja koje je
        stavljeno van konteksta naše ideje. Kratka napomena je da rezultati
        upitnika zavise od iskrenosti odgovora, koji treba da definišu odnos sa
        klijentom kakav je u suštini.
        <br />
        <br />
        <strong>
          Kriterijum 5. testa samostalnosti ispituje način obezbeđivanja
          osnovnog alata, opreme i drugih osnovnih materijalnih ili
          nematerijalnih sredstava potrebnih za redovan rad. Dodatno, ispituje
          da li poslujete samostalno ili postoji stalna kontrola i nadzor od
          strane nalogodavca.
        </strong>{" "}
      </p>
      <Questionnaire
        items={questionnaire}
        setResponse={(response: Response) => {
          setResponses((responses) => {
            const existingResponse = responses.find(
              (r) => r.questionId === response.questionId
            );
            if (existingResponse) {
              return responses.map((r) =>
                r.questionId === response.questionId ? response : r
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
