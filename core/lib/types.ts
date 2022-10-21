export interface FunctionScope {
  text: string;
  start: number;
  startLine: number;
  end: number;
}

export interface FunctionSignature {
  name: string;
  type: string;
}

export interface CharIndex {
  start: number;
  end: number;
}

export interface FunctionComment {
  name: string;
  type: string;
  desc: string;
  charIndex: CharIndex;
}

export interface FunctionCommentScope {
  text: RegExpMatchArray;
  start: number;
  end: number;
}

export interface ParsingResult {
  attributeName: string;
  functionName: {
    name: string;
    charIndex: CharIndex;
  };
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
    charIndex: CharIndex | null;
  };
}

export interface NatSpec {
  title?: string;
  notice?: string;
  dev?: string;
  params?: {
    name: string;
    description: string;
  }[];
  returns?: {
    name?: string;
    description: string;
  }[];
  custom?: {
    [tag: string]: string;
  };
}

export interface FunctionCommentValidity {
  isValid: boolean;
  errorSource: string | string[] | null;
}

export interface CommentComplicance {
  filePath: string | null;
  attributeName: string | null;
  functionName: {
    name: string | null;
    charIndex: CharIndex | null;
  };
  errorSource: string | string[] | null;
}

export interface NamespaceScope {
  namespace: string | null;
  start: number | null;
  end: number | null;
  text: string | null;
}
