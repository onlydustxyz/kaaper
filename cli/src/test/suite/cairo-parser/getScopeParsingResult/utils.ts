import {
  ParsingResult,
  FunctionCommentScope,
} from "../../../../../../core/lib/types";

/*
    will yield the constituent parts of the function comment
    for instance
    [
      { desc: "Emit event when a transfer is made" },
      { explicitArgs: "from_(felt): The address of the sender" },
      { explicitArgs: "to(felt): The address of the receiver" },
      { explicitArgs: "value(Uint256): The amount of tokens transferred" },
    ]
    */
export function yieldFunctionCommentPartsFromCharIndex(
  text: string,
  functionCommentScope: FunctionCommentScope,
  parsingResult: ParsingResult
) {
  const { charIndex, ...parsingOutputWithoutCharIndex } =
    parsingResult.functionComment;

  var commentParsingResult = [];

  for (let [key, values] of Object.entries(parsingOutputWithoutCharIndex)) {
    if (values) {
      for (const value of values) {
        const charIndex = value.charIndex;
        var char = "";
        for (
          let i = functionCommentScope!.start + charIndex.start;
          i < functionCommentScope!.start + charIndex.end;
          i++
        ) {
          char += text.at(i);
        }
        const commentParsing = {
          [key]: char,
        };
        commentParsingResult.push(commentParsing);
      }
    }
  }
  return commentParsingResult;
}

/*
    will yield the constituent parts of the function comment
    for instance
    # Desc: 
    #   Emit event when a transfer is made
    # Explicit args:
    #   from_(felt): The address of the sender
    #   to(felt): The address of the receiver
    #   value(Uint256): The amount of tokens transferred
    */

export function yieldWholeFunctionCommentStringFromCharIndex(
  text: string,
  parsingResult: ParsingResult
) {
  var functionCommentParsingResult = "";
  for (
    var i = parsingResult.functionComment.charIndex!.start;
    i < parsingResult.functionComment.charIndex!.end;
    i++
  ) {
    functionCommentParsingResult += text.at(i);
  }
  return functionCommentParsingResult;
}
