// read from google sheets
import { google } from "googleapis";

const getGoogleApisJwt = (): any => {
  const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/spreadsheets"]
  );
  return jwtClient;
};

export const getSheetRows = async (
  spreadsheetId: string,
  sheetName: string
): Promise<any> => {
  const jwtClient = getGoogleApisJwt();
  const sheets = google.sheets({ version: "v4", auth: jwtClient });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A:Z`,
  });
  return response.data.values;
};
