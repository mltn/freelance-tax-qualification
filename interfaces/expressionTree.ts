import { PassStatus, Question, Answer } from ".";

export enum Token {
    AND = 'AND',
    OR = 'OR',
    NOT = 'NOT',
    QA_PAIR = 'PAIR',
    START_GROUP = '(',
    END_GROUP = ')',
    WHITE_SPACE = ' ',
}

export enum OperatorNotation {
    Prefix = 'prefix',
    Infix = 'infix',
    Postfix = 'postfix',
}

export type Operator = {
    token: Token,
    precedence: number,
    associativity: 'left' | 'right',
    arity: number,
    notation: OperatorNotation,
}

export type ResponsePredicate = {
    token: Token;
    response: Response;
    evaluation: boolean;
}

export type ExpressionTreeNode = {
    type: Token
    value: string
    children: ExpressionTreeNode[]
}

export type ExpressionTree = {
    root: ExpressionTreeNode
}
