import { Criteria } from "../interfaces";

export const criteriaFromSheetRows = (rows: any[]): Criteria[] => {
  const testCriteria: Criteria[] = rows
    .filter((row) => {
      return row[0] && !isNaN(Number(row[0]));
    })
    .map((row) => ({
      index: row[0],
      title: row[1],
      description: row[2],
      passFormula: row[3],
      failFormula: row[4],
      questions: [],
    }));
  return testCriteria;
};
