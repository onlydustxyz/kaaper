import * as path from "path";
import * as fs from "fs";
import * as assert from "assert";
import CairoParser from "../../../lib/CairoParser";

suite("parseCommentLines: Namespace Using Match All", () => {
  test("Namespace: 0 ", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/emptyComment/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 0;
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopes(text);
    const functionScope = functionScopes![scopeNumber];

    const functionComment = CairoParser.parseCommentLines(functionScope, true);

    assert(functionComment === null);
  });

  //   test("Namespace: 1 ", () => {
  //     const pathFile = path.resolve(
  //       __dirname,
  //       "../../../../testContracts/ERC20Namespace/library.cairo"
  //     );
  //     const text = fs.readFileSync(pathFile, "utf8");
  //     const scopeNumber = 1;
  //     // parse whole scope
  //     const functionScopes = CairoParser.parseNamespaceScopes(text);
  //     const functionScope = functionScopes![scopeNumber];

  //     const functionComment = CairoParser.parseCommentLines(functionScope, true);
  //     const start = functionComment!.start;
  //     const end = functionComment!.end;

  //     var functionCommentText = "";
  //     for (let i = start; i < end; i++) {
  //       functionCommentText += text.at(i);
  //     }
  //     assert.equal([...functionComment!.text].join(""), functionCommentText);
  //   });

  //   test("Namespace: 2 ", () => {
  //     const pathFile = path.resolve(
  //       __dirname,
  //       "../../../../testContracts/ERC20Namespace/library.cairo"
  //     );
  //     const text = fs.readFileSync(pathFile, "utf8");
  //     const scopeNumber = 2;
  //     // parse whole scope
  //     const functionScopes = CairoParser.parseNamespaceScopes(text);
  //     const functionScope = functionScopes![scopeNumber];

  //     const functionComment = CairoParser.parseCommentLines(functionScope, true);
  //     const start = functionComment!.start;
  //     const end = functionComment!.end;
  //     console.log(`Namespace ${scopeNumber}: ${start} ${end}`);

  //     var functionCommentText = "";
  //     for (let i = start; i < end; i++) {
  //       functionCommentText += text.at(i);
  //     }
  //     console.log("Namespace 2");
  //     console.log(functionCommentText);
  //     assert.equal([...functionComment!.text].join(""), functionCommentText);
  //   });

  //   test("Namespace: 3 ", () => {
  //     const pathFile = path.resolve(
  //       __dirname,
  //       "../../../../testContracts/ERC20Namespace/library.cairo"
  //     );
  //     const text = fs.readFileSync(pathFile, "utf8");
  //     const scopeNumber = 3;
  //     // parse whole scope
  //     const functionScopes = CairoParser.parseNamespaceScopes(text);
  //     const functionScope = functionScopes![scopeNumber];

  //     const functionComment = CairoParser.parseCommentLines(functionScope, true);
  //     const start = functionComment!.start;
  //     const end = functionComment!.end;
  //     console.log(`Namespace ${scopeNumber}: ${start} ${end}`);

  //     var functionCommentText = "";
  //     for (let i = start; i < end; i++) {
  //       functionCommentText += text.at(i);
  //     }
  //     assert.equal([...functionComment!.text].join(""), functionCommentText);
  //   });

  //   test("Namespace: 4 ", () => {
  //     const pathFile = path.resolve(
  //       __dirname,
  //       "../../../../testContracts/ERC20Namespace/library.cairo"
  //     );
  //     const text = fs.readFileSync(pathFile, "utf8");
  //     const scopeNumber = 4;
  //     // parse whole scope
  //     const functionScopes = CairoParser.parseNamespaceScopes(text);
  //     const functionScope = functionScopes![scopeNumber];

  //     const functionComment = CairoParser.parseCommentLines(functionScope, true);
  //     const start = functionComment!.start;
  //     const end = functionComment!.end;

  //     var functionCommentText = "";
  //     for (let i = start; i < end; i++) {
  //       functionCommentText += text.at(i);
  //     }
  //     assert.equal([...functionComment!.text].join(""), functionCommentText);
  //   });
  // });

  // suite("parseCommentLines: constructor Using Match All", () => {
  //   test("constructor: 0 ", () => {
  //     const pathFile = path.resolve(
  //       __dirname,
  //       "../../../../testContracts/ERC20Namespace/ERC20.cairo"
  //     );
  //     const text = fs.readFileSync(pathFile, "utf8");
  //     const scopeNumber = 0;
  //     // parse whole scope
  //     const functionScopes = CairoParser.parseFunctionScope(text, "constructor");
  //     const functionScope = functionScopes![scopeNumber];

  //     const functionComment = CairoParser.parseCommentLines(functionScope, false);

  //     const start = functionComment!.start;
  //     const end = functionComment!.end;

  //     var functionCommentText = "";
  //     for (let i = start; i < end; i++) {
  //       functionCommentText += text.at(i);
  //     }
  //     assert.equal([...functionComment!.text].join(""), functionCommentText);
  //   });
  // });

  // suite("parseCommentLines: View Using Match All", () => {
  //   test("view: 0 ", () => {
  //     const pathFile = path.resolve(
  //       __dirname,
  //       "../../../../testContracts/ERC20Namespace/ERC20.cairo"
  //     );
  //     const text = fs.readFileSync(pathFile, "utf8");
  //     const scopeNumber = 0;
  //     // parse whole scope
  //     const functionScopes = CairoParser.parseFunctionScope(text, "view");
  //     const functionScope = functionScopes![scopeNumber];

  //     const functionComment = CairoParser.parseCommentLines(functionScope, false);

  //     const start = functionComment!.start;
  //     const end = functionComment!.end;

  //     var functionCommentText = "";
  //     for (let i = start; i < end; i++) {
  //       functionCommentText += text.at(i);
  //     }
  //     assert.equal([...functionComment!.text].join(""), functionCommentText);
  //   });
});
