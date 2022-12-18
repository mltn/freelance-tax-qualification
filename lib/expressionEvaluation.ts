import {
  ExpressionTree,
  ExpressionTreeNode,
  Token,
  OperatorNotation,
  Operator,
  ResponsePredicate,
} from "../interfaces/expressionTree";
import { Response, PassStatus, Criteria } from "../interfaces/index";

const operators: Operator[] = [
  {
    token: Token.AND,
    precedence: 1,
    associativity: "left",
    arity: 2,
    notation: OperatorNotation.Infix,
  },
  {
    token: Token.OR,
    precedence: 1,
    associativity: "left",
    arity: 2,
    notation: OperatorNotation.Infix,
  },
  {
    token: Token.NOT,
    precedence: 2,
    associativity: "right",
    arity: 1,
    notation: OperatorNotation.Prefix,
  },
  {
    token: Token.START_GROUP,
    precedence: 3,
    associativity: "left",
    arity: undefined,
    notation: OperatorNotation.Prefix,
  },
];

const tokenRegex = {
  [Token.AND]: /^AND/gi,
  [Token.OR]: /^OR/gi,
  [Token.NOT]: /^NOT/gi,
  [Token.QA_PAIR]: /^\[\s*\d+\s*,\s*\d+\s*\]/gi,
  [Token.START_GROUP]: /^\(/gi,
  [Token.END_GROUP]: /^\)/gi,
  [Token.WHITE_SPACE]: /^\s+/gi,
};
const readNextToken = (expression: string): ExpressionTreeNode => {
  const token = Object.keys(tokenRegex).find((token) =>
    tokenRegex[token].test(expression)
  );
  if (!token) {
    throw new Error(`Invalid token: ${expression}`);
  } else {
    const value = expression.match(tokenRegex[token])[0];
    const node: ExpressionTreeNode = {
      type: token as Token,
      value,
      children: [],
    };
    return node;
  }
};
export const convertExpressionToNodeList = (
  expression: string
): ExpressionTreeNode[] => {
  const nodeList: ExpressionTreeNode[] = [];
  let remainingExpression = expression;
  while (remainingExpression.length > 0) {
    const node = readNextToken(remainingExpression);
    remainingExpression = remainingExpression.replace(node.value, "");
    if (node.type !== Token.WHITE_SPACE) {
      nodeList.push(node);
    }
  }
  return nodeList;
};

const evalQaPair = (qaPair: string, responses: Response[]): boolean => {
  const [questionId, answerId] = qaPair
    .replace(/[\[\]]/g, "")
    .split(",")
    .map(Number);
  const matched = responses.some(
    (r) =>
      Number(r.questionId) === questionId && Number(r.answerId) === answerId
  );
  return matched;
};
export const translateExpressionNode = (
  node: ExpressionTreeNode,
  responses: Response[]
): string => {
  let translatedNode: string;
  switch (node.type) {
    case Token.QA_PAIR:
      translatedNode = evalQaPair(node.value, responses).toString();
      break;
    case Token.START_GROUP:
      translatedNode = "(";
      break;
    case Token.END_GROUP:
      translatedNode = ")";
      break;
    case Token.AND:
      translatedNode = "&&";
      break;
    case Token.OR:
      translatedNode = "||";
      break;
    case Token.NOT:
      translatedNode = "!";
      break;
    case Token.WHITE_SPACE:
      translatedNode = "";
      break;
    default:
      throw new Error(`Invalid token: ${node.type}`);
  }
  return translatedNode;
};
const translateExperssion = (
  expression: string,
  responses: Response[]
): string => {
  const nodeList = convertExpressionToNodeList(expression);
  const translatedNodeList = nodeList.map((node) =>
    translateExpressionNode(node, responses)
  );
  const translatedExpression = translatedNodeList.join("");
  return translatedExpression;
};

export const evaluateExpression = (
  expression: string,
  responses: Response[]
): boolean => {
  const translatedExpression = translateExperssion(expression, responses);
  try {
    return eval(translatedExpression);
  } catch (e) {
    throw new Error(
      `Invalid expression: ${expression}\ntranslated as: ${translatedExpression}`
    );
  }
};

export const getCriteriaPassStatus = (
  criteria: Criteria,
  responses: Response[]
): PassStatus => {
  const passed = evaluateExpression(criteria.passFormula, responses);
  const failed = evaluateExpression(criteria.failFormula, responses);
  if (passed && !failed) {
    return PassStatus.Passed;
  } else if (!passed && failed) {
    return PassStatus.Failed;
  } else {
    return PassStatus.Incomplete;
  }
};
