import * as fs from "fs";
import * as path from "path";
import { generateValidationClasses } from "./class-generator";

const interfacesFile = "./input/interfaces.ts";
const outputDir = "./output";
const outputFile = `${outputDir}/validation-classes.ts`;

const args = process.argv.slice(2);
const customInputFile = args[0];
const customOutputFile = args[1];

const inputFilePath = customInputFile || interfacesFile;
const outputFilePath = customOutputFile || outputFile;

if (!fs.existsSync(path.dirname(outputFilePath))) {
  fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
}

const customValidationClasses = generateValidationClasses(inputFilePath);
fs.writeFileSync(outputFilePath, customValidationClasses);
console.log(`Generated validation classes in ${outputFilePath}`);
