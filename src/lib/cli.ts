import * as fs from "fs";
import * as path from "path";
import CairoParser from "./CairoParser";


export default class CLI {
  public contractRootDir: string;
  constructor(contractRootDir: string) {
    this.contractRootDir = contractRootDir;
  }

 generateContractsDocs(outDir: string, dumpCommentOnly: boolean = false): void{
    const contractPaths = fs.readdirSync(this.contractRootDir);
    for (const contractFile of contractPaths) {
      const filePath = path.join(this.contractRootDir, contractFile);
      const parsingResults = CairoParser.getFileParsingResult(filePath);
      if (parsingResults) {
        CairoParser.dumpParsingResult(parsingResults, `${outDir}/${contractFile}`, dumpCommentOnly); 
      }
    }
    }


 checkContractsCommentCompliance(
    ): CommentComplicance {
    const contractPaths = fs.readdirSync(this.contractRootDir);
    for (const contractFile of contractPaths) {
        const filePath = path.join(this.contractRootDir, contractFile);
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
