#!/usr/bin/env node

import { generateValidationClasses } from "..";

const interfacesFile = "./input/interfaces.ts";
const outputDir = "./output";
const outputFile = `${outputDir}/validation-classes.ts`;

const args = process.argv.slice(2);
let customInputFile: string | undefined;
let customOutputFile: string | undefined;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--input" || args[i] === "-i") {
    customInputFile = args[i + 1];
  } else if (args[i] === "--output" || args[i] === "-o") {
    customOutputFile = args[i + 1];
  }
}

const inputFilePath = customInputFile || interfacesFile;
const outputFilePath = customOutputFile || outputFile;

generateValidationClasses(inputFilePath, outputFilePath);
