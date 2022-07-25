import * as path from "path";
import * as fs from "fs";
import * as assert from "assert";
import CairoParser from "../../../lib/CairoParser";
import { Console } from "console";

suite("parseNamespaceScopes with using Match All", () => {
  test("ERC20", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 0;
    // parse whole scope
    const namespaceScopes = CairoParser.getNamespaceScopesMatchAll(text);

    const namespaceScopeText = namespaceScopes![scopeNumber].text;
    const namespaceName = namespaceScopes![scopeNumber].namespace;
    assert.equal("namespace ERC20", namespaceName);
    const matches = CairoParser.parseFunctionScopeWithMatchAll(
      namespaceScopeText!,
      "function"
    );
    assert.equal(3, matches!.length);
  });

  test("internal", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 1;
    // parse whole scope
    const namespaceScopes = CairoParser.getNamespaceScopesMatchAll(text);

    const namespaceScopeText = namespaceScopes![scopeNumber].text;
    const namespaceName = namespaceScopes![scopeNumber].namespace;
    assert.equal("namespace internal", namespaceName);

    const matches = CairoParser.parseFunctionScopeWithMatchAll(
      namespaceScopeText!,
      "function"
    );
    assert.equal(2, matches!.length);
  });
  test("whole namespace", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 0;
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopesWithMatchAll(text);

    assert.equal(5, functionScopes!.length);
  });

  test("whole namespace: 0", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 0;
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopesWithMatchAll(text);
    console.log(functionScopes![scopeNumber]);
    assert.equal(
      "@namespace ERC20",
      functionScopes![scopeNumber].text.split("\n")[0]
    );
    // take only 1st lines until last (0th not included)
    const functionScopeText = functionScopes![scopeNumber].text
      .split("\n")
      .slice(1, functionScopes![scopeNumber].text.split("\n").length)
      .join("\n");

    const start = functionScopes![scopeNumber].start;
    const end = functionScopes![scopeNumber].end;

    var output = "";
    for (var i = start; i < end; i++) {
      output += text[i];
    }
    assert.equal(functionScopeText, output);
  });

  test("whole namespace: 1", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 1;
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopesWithMatchAll(text);
    assert.equal(
      "@namespace ERC20",
      functionScopes![scopeNumber].text.split("\n")[0]
    );
    // take only 1st lines until last (0th not included)
    const functionScopeText = functionScopes![scopeNumber].text
      .split("\n")
      .slice(1, functionScopes![scopeNumber].text.split("\n").length)
      .join("\n");

    const start = functionScopes![scopeNumber].start;
    const end = functionScopes![scopeNumber].end;

    var output = "";
    for (var i = start; i < end; i++) {
      output += text[i];
    }
    assert.equal(functionScopeText, output);
  });

  test("whole namespace: 2", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 2;
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopesWithMatchAll(text);
    assert.equal(
      "@namespace ERC20",
      functionScopes![scopeNumber].text.split("\n")[0]
    );
    // take only 1st lines until last (0th not included)
    const functionScopeText = functionScopes![scopeNumber].text
      .split("\n")
      .slice(1, functionScopes![scopeNumber].text.split("\n").length)
      .join("\n");

    const start = functionScopes![scopeNumber].start;
    const end = functionScopes![scopeNumber].end;

    var output = "";
    for (var i = start; i < end; i++) {
      output += text[i];
    }
    assert.equal(functionScopeText, output);
  });

  test("whole namespace: 3", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 3;
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopesWithMatchAll(text);
    assert.equal(
      "@namespace internal",
      functionScopes![scopeNumber].text.split("\n")[0]
    );
    // take only 1st lines until last (0th not included)
    const functionScopeText = functionScopes![scopeNumber].text
      .split("\n")
      .slice(1, functionScopes![scopeNumber].text.split("\n").length)
      .join("\n");

    const start = functionScopes![scopeNumber].start;
    const end = functionScopes![scopeNumber].end;

    var output = "";
    for (var i = start; i < end; i++) {
      output += text[i];
    }
    assert.equal(functionScopeText, output);
  });

  test("whole namespace: 4", () => {
    const pathFile = path.resolve(
      __dirname,
      "../../../../testContracts/ERC20Namespace/library.cairo"
    );
    const text = fs.readFileSync(pathFile, "utf8");
    const scopeNumber = 4;
    // parse whole scope
    const functionScopes = CairoParser.parseNamespaceScopesWithMatchAll(text);
    assert.equal(
      "@namespace internal",
      functionScopes![scopeNumber].text.split("\n")[0]
    );
    // take only 1st lines until last (0th not included)
    const functionScopeText = functionScopes![scopeNumber].text
      .split("\n")
      .slice(1, functionScopes![scopeNumber].text.split("\n").length)
      .join("\n");

    const start = functionScopes![scopeNumber].start;
    const end = functionScopes![scopeNumber].end;

    var output = "";
    for (var i = start; i < end; i++) {
      output += text[i];
    }
    assert.equal(functionScopeText, output);
  });
});
