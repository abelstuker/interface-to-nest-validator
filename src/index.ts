import fs from "fs";
import path from "path";
import { generate } from "./class-generator";

export const generateValidationClasses = (inputFilePath: string, outputFilePath: string) => {
  if (!fs.existsSync(path.dirname(outputFilePath))) {
    fs.mkdirSync(path.dirname(outputFilePath), { recursive: true });
  }

  const customValidationClasses = generate(inputFilePath);
  fs.writeFileSync(outputFilePath, customValidationClasses);
  console.log(`Generated validation classes in ${outputFilePath}`);
};
