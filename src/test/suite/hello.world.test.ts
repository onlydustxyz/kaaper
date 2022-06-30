import * as assert from "assert";
import * as path from "path";
import HelloWorld from "../../lib/HelloWorld"

suite("hello world", () => {
    test("hello world", () => {
        const helloWorld = HelloWorld()
        assert.equal(helloWorld, "Hello World", 'failed to get hello world');
    })
})