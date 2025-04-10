import fs from "fs";
import * as ts from "typescript";
import { generateValidationDecorators } from "./decorator-generator";
import { getTypeString } from "./type-utils";

export function generate(filePath: string): string {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(filePath, fileContent, ts.ScriptTarget.Latest, true);

  const imports = new Set([
    "IsEmail",
    "IsNotEmpty",
    "IsString",
    "IsOptional",
    "IsBoolean",
    "IsNumber",
    "Min",
    "Max",
    "MinLength",
    "MaxLength",
    "IsDate",
    "IsUrl",
    "IsUUID",
    "IsEnum",
    "IsArray",
    "ArrayMinSize",
    "ArrayMaxSize",
    "Equals",
    "Matches",
    "IsInt",
  ]);

  let output = `// @ts-nocheck \n`;
  output += `import { ${Array.from(imports).join(", ")} } from 'class-validator';\n`;
  output += `import { Expose } from 'class-transformer';\n\n`;

  ts.forEachChild(sourceFile, (node) => {
    if (ts.isInterfaceDeclaration(node) && node.name) {
      const className = node.name.text.replace(/^I/, "");
      output += `export class ${className} {\n`;

      node.members.forEach((member) => {
        if (ts.isPropertySignature(member) && member.name) {
          const isOptional = !!member.questionToken;
          const validationDecorators = generateValidationDecorators(member, sourceFile, isOptional);
          const propertyName = member.name.getText(sourceFile);
          output += `${validationDecorators}\n`;
          output += `  ${propertyName}${isOptional ? "?" : ""}: ${getTypeString(member.type)};\n\n`;
        }
      });

      // output += `  constructor(partial?: Partial<${className}>) {\n`;
      // output += `    Object.assign(this, partial || {});\n  }\n`;
      output += `}\n\n`;
    }
  });

  return output;
}
