import * as assert from "assert";
import * as path from "path";
import CairoParser from "../../lib/parser";


suite("scope: constructor test", () => {
    test("get attribute name", () => {
        const pathFile = path.resolve(__dirname, "../../../test_assets/ERC20.cairo");
        let constructorParser = new CairoParser(pathFile, "constructor");
        const attributeScope = constructorParser.parseAttribute();
        const attributeName = constructorParser.getAttributeName(attributeScope);
        assert.equal("constructor", attributeName, 'failed to get attribute name');
    })
    test("get function name", () => {
        const pathFile = path.resolve(__dirname, "../../../test_assets/ERC20.cairo");
        let constructorParser = new CairoParser(pathFile, "constructor");
        const attributeScope = constructorParser.parseAttribute();
        const functionName = constructorParser.getFunctionName(attributeScope);
        assert.equal("constructor", functionName,'failed to get function name');
    })

    test("get implicit args", () => {
        const pathFile = path.resolve(__dirname, "../../../test_assets/ERC20.cairo");
        let constructorParser = new CairoParser(pathFile, "constructor");
        const attributeScope = constructorParser.parseAttribute();
        const implicitArgs = constructorParser.getImplicitArgs(attributeScope);
        const targetArgs = new Map();
        targetArgs.set("syscall_ptr", "felt*");
        targetArgs.set("pedersen_ptr", "HashBuiltin*");
        targetArgs.set("range_check_ptr", "");

        // TODO: refactor this, somehow the two Maps are not equal but if we unpack it they are equal
        const targetArgsIter = targetArgs.values();
        const implicitArgsIter = implicitArgs.values();
        assert.equal(targetArgs.size, implicitArgs.size, 'failed to get implicit args');
        for (let i = 0; i < targetArgs.size; i++) {
            assert.equal(targetArgsIter.next().value, implicitArgsIter.next().value, 'failed to get explicit args');
        }
    })

    test("get explicit args", () => {
        const pathFile = path.resolve(__dirname, "../../../test_assets/ERC20.cairo");
        let constructorParser = new CairoParser(pathFile, "constructor");
        const attributeScope = constructorParser.parseAttribute();
        const explicitArgs = constructorParser.getExplicitArgs(attributeScope);
        const targetArgs = new Map();
        targetArgs.set("name", "felt");
        targetArgs.set("symbol", "felt");
        targetArgs.set("decimals", "Uint256");
        targetArgs.set("initial_supply", "Uint256");
        targetArgs.set("recipient", "felt");
        // TODO: refactor this, somehow the two Maps are not equal but if we unpack it they are equal
        const targetArgsIter = targetArgs.values();
        const explicitArgsIter = explicitArgs.values();
        assert.equal(targetArgs.size, explicitArgs.size, 'failed to get implicit args');
        for (let i = 0; i < targetArgs.size; i++) {
            assert.equal(targetArgsIter.next().value, explicitArgsIter.next().value, 'failed to get explicit args');
        }
    })

    test("get comments", () => {
        const pathFile = path.resolve(__dirname, "../../../test_assets/ERC20.cairo");
        let constructorParser = new CairoParser(pathFile, "constructor");
        const attributeScope = constructorParser.parseAttribute();
        // console.log(attributeScope)
        const comments = constructorParser.getDescFromComments(attributeScope);
        // console.log(comments)
        // console.log(comments)

    })
    
})