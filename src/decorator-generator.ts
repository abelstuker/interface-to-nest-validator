import * as ts from "typescript";
import { parseJSDocComments } from "./jdoc-parser";
import { VALIDATION_SCHEMA } from "./validation-schema";

export function generateValidationDecorators(property: ts.PropertySignature, sourceFile: ts.SourceFile, isOptional: boolean): string {
  const comments = parseJSDocComments(property, sourceFile);
  const decorators: Set<string> = new Set();

  if (property.type) {
    if (property.type.kind === ts.SyntaxKind.StringKeyword) {
      decorators.add("@IsString()");
    } else if (property.type.kind === ts.SyntaxKind.NumberKeyword) {
      decorators.add("@IsNumber()");
    } else if (property.type.kind === ts.SyntaxKind.BooleanKeyword) {
      decorators.add("@IsBoolean()");
    } else if (ts.isArrayTypeNode(property.type)) {
      decorators.add("@IsArray()");
    }
  }

  if (isOptional) {
    decorators.add("@IsOptional()");
  } else {
    const hasNotRequiredAnnotation = comments.some((comment) => comment.match(/@notRequired/i));
    decorators.add(hasNotRequiredAnnotation ? "@IsOptional()" : "@IsNotEmpty()");
  }

  const validationEntries = Object.entries(VALIDATION_SCHEMA);
  comments.forEach((comment) => {
    if (!comment.startsWith("@validate ")) return;
    const commentWords = [];
    let buffer = "";
    let parenthesesCount = 0;

    for (const char of comment) {
      if (char === "(") parenthesesCount++;
      if (char === ")") parenthesesCount--;

      if (char === " " && parenthesesCount === 0) {
        if (buffer.trim()) {
          commentWords.push(buffer.trim());
          buffer = "";
        }
      } else {
        buffer += char;
      }
    }

    if (buffer.trim()) {
      commentWords.push(buffer.trim());
    }
    for (const word of commentWords) {
      validationEntries.forEach(([key, { regex, decorator }]) => {
        const match = word.match(regex);
        if (match) {
          const args = match.slice(1).map((arg) => arg.trim());
          if (args.length > 0) {
            decorators.add(`@${decorator}(${args.join(", ")})`);
          } else {
            decorators.add(`@${decorator}()`);
          }
        }
      });
    }
  });

  // decorators.add("@Expose()");
  return Array.from(decorators)
    .map((decorator) => `  ${decorator}`)
    .join("\n");
}
