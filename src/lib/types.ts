interface FunctionSignature {
  name: string;
  type: string;
}

interface FunctionComment {
  name: string;
  type: string;
  desc: string;
}

interface parsingResult {
  attributeName: string;
  functionName: string;
  functionSignature: {
    implicitArgs: FunctionSignature[] | null;
    explicitArgs: FunctionSignature[] | null;
  };
  functionComment: {
    desc: FunctionComment[] | null;
    implicitArgs: FunctionComment[] | null;
    explicitArgs: FunctionComment[] | null;
    returns: FunctionComment[] | null;
    raises: FunctionComment[] | null;
  };
}
