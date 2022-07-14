export interface FunctionSignature {
  name: string;
  type: string;
}

export interface FunctionComment {
  name: string;
  type: string;
  desc: string;
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

export interface FunctionCommentValidity {
  isValid: boolean;
  errorSource: string | null;
}

export interface CommentComplicance {
  isCompliant: boolean;
  filePath: string | null;
  errorSource: string | null;
}
