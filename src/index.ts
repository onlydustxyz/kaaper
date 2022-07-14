#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const path = require("path");
const program = require("commander");

// import CairoParser from './lib/CairoParser";
import CLI from "./lib/cli";

clear();
console.log(chalk.red(figlet.textSync("kaaper", { horizontalLayout: "full" })));

program
  .name("kaaper")
  .description("CLI to help cairo developers")
  .version("0.0.1");

program
  .command("generate")
  .description("Generate contract docs")
  .argument("<string>", "string to split")
  .option("-r, --root <string>", "root directory of contracts")
  .action((str: any, options: any) => {
    const cli = new CLI(options.root);
    cli.generateContractsDocs(options.root, false);
    console.log("root:", options.root);
    // const limit = options.first ? 1 : undefined;
    // console.log(str.split(options.separator, limit));
  });

program.parse(process.argv);

//   console.log('you ordered a pizza with:');
//   if (program.peppers) console.log('  - peppers');
//   if (program.pineapple) console.log('  - pineapple');
//   if (program.bbq) console.log('  - bbq');
//   const cheese: string = true === program.cheese ? 'marble' : program.cheese || 'no';
//   console.log('  - %s cheese', cheese);

//   if (!process.argv.slice(2).length) {
//     program.outputHelp();
//   }
