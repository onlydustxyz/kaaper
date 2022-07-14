import * as fs from "fs";
import * as path from "path";
import CairoParser from "./CairoParser";
var glob = require("glob");

import { CommentComplicance } from "./types";

export default class CLI {
  public contractRootDir: string;
  constructor(contractRootDir: string) {
    this.contractRootDir = contractRootDir;
  }

  generateContractsDocs(
    outDir: string,
    dumpCommentOnly: boolean = false
  ): void {
    glob(`${this.contractRootDir}/**/*.cairo`, (_: any, files: string) => {
      for (const file of files) {
        const parsingResult = CairoParser.getFileParsingResult(file);
        if (parsingResult) {
          const relativePath = path.relative(this.contractRootDir, file);
          const outPath = path.join(outDir, relativePath);
          const outDirPath = path.dirname(outPath);
          if (!fs.existsSync(outDirPath)) {
            fs.mkdirSync(outDirPath, { recursive: true });
          }
          CairoParser.dumpParsingResult(
            parsingResult,
            outPath,
            dumpCommentOnly
          );
        }
      }
    });
  }

  getNonCompliantCommentFunction(): CommentComplicance[] | null {
    var invalidContractsCommentsCompliance: CommentComplicance[] = [];
    var files = glob.sync(`${this.contractRootDir}/**/*.cairo`);

    for (var file of files) {
      const parsingResult = CairoParser.getFileParsingResult(file);
      if (parsingResult) {
        for (const scopeParsingResult of parsingResult) {
          const result = CairoParser.isValidFunctionComment(scopeParsingResult);
          if (result.isValid === false) {
            const commentComplicance = {
              filePath: file,
              attributeName: scopeParsingResult.attributeName,
              functionName: scopeParsingResult.functionName,
              errorSource: result.errorSource,
            };
            invalidContractsCommentsCompliance.push(commentComplicance);
          }
        }
      }
    }
    if (invalidContractsCommentsCompliance.length > 0) {
      return invalidContractsCommentsCompliance;
    }
    return null;
  }
}
