export interface FunctionScope {
  text: string;
  start: number;
  end: number;
}

export interface FunctionSignature {
  name: string;
  type: string;
}

export interface FunctionComment {
  name: string;
  type: string;
  desc: string;
}

export interface CommentScope {
  text: RegExpMatchArray;
  start: number;
  end: number;
}

export interface ParsingResult {
  attributeName: string;
  functionName: string;
  functionSignature: {
    implicitArgs: FunctionSignature[] | null;
    explicitArgs: FunctionSignature[] | null;
    returns: FunctionSignature[] | null;
  };
  functionComment: {
    desc: FunctionComment[] | null;
    implicitArgs: FunctionComment[] | null;
    explicitArgs: FunctionComment[] | null;
    returns: FunctionComment[] | null;
    raises: FunctionComment[] | null;
  };
}

export interface ParsingResultNew {
  attributeName: string;
  functionName: string;
  functionSignature: {
    implicitArgs: FunctionSignature[] | null;
    explicitArgs: FunctionSignature[] | null;
    returns: FunctionSignature[] | null;
  };
  functionComment: {
    desc: FunctionComment[] | null;
    implicitArgs: FunctionComment[] | null;
    explicitArgs: FunctionComment[] | null;
    returns: FunctionComment[] | null;
    raises: FunctionComment[] | null;
    start: number;
    end: number;
  };
}

export interface FunctionCommentValidity {
  isValid: boolean;
  errorSource: string | string[] | null;
}

export interface CommentComplicance {
  filePath: string | null;
  attributeName: string | null;
  functionName: string | null;
  errorSource: string | string[] | null;
}

export interface Namespace {
  namespace: string | null;
  startLineNumber: number | null;
  endLineNumber: number | null;
  text: string | null;
}
