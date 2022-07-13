import * as fs from "fs";
import * as path from "path";

import CairoParser from "./CairoParser";

const lodash = require("lodash");
const yaml = require("js-yaml");

export default class CLI {
  constructor() {}

  static dumpParsingResult(
    parsingResult: ParsingResult[] | null,
    outPath: string,
    dumpCommentOnly: boolean = false
  ): void {
    if (dumpCommentOnly === true) {
      const commentOnlyParsingResult = parsingResult?.map((obj) => ({
        attributeName: obj.attributeName,
        functionName: obj.functionName,
        functionComment: obj.functionComment,
      }));
      fs.writeFileSync(`${outPath}.yaml`, yaml.dump(commentOnlyParsingResult));
    } else {
      fs.writeFileSync(`${outPath}.yaml`, yaml.dump(parsingResult));
    }
  }

  static checkContractsCommentCompliance(
    contractRootDir: string,
  ): CommentComplicance {
    const contractPaths = fs.readdirSync(contractRootDir);
    for (const contractFile of contractPaths) {
      const filePath = path.join(contractRootDir, contractFile);
      const parsingResults = CairoParser.getFileParsingResult(filePath);
      if (parsingResults) {
        for (const parsingResult of parsingResults) {
          const isValid = CairoParser.isValidFunctionComment(parsingResult);
          if (isValid.isValid === false) {
            return {isCompliant: false, filePath: filePath, errorSource: isValid.errorSource};
          }
        }
      }
    }
    return {isCompliant: true, filePath: null, errorSource: null};
    }
}
