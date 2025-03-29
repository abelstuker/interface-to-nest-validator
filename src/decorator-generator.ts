import * as ts from "typescript";
import { parseJSDocComments } from "./jdoc-parser";
import { VALIDATION_ANNOTATION_REGEXES } from "./validation-regex";

export function generateValidationDecorators(
  property: ts.PropertySignature,
  sourceFile: ts.SourceFile,
  isOptional: boolean
): string {
  const comments = parseJSDocComments(property, sourceFile);
  const decorators: string[] = [];

  if (property.type) {
    if (property.type.kind === ts.SyntaxKind.StringKeyword) {
      decorators.push("@IsString()");
    } else if (property.type.kind === ts.SyntaxKind.NumberKeyword) {
      decorators.push("@IsNumber()");
    } else if (property.type.kind === ts.SyntaxKind.BooleanKeyword) {
      decorators.push("@IsBoolean()");
    } else if (ts.isArrayTypeNode(property.type)) {
      decorators.push("@IsArray()");
    }
  }

  if (isOptional) {
    decorators.push("@IsOptional()");
  } else {
    const hasNotRequiredAnnotation = comments.some((comment) =>
      comment.match(/@notRequired/i)
    );
    decorators.push(
      hasNotRequiredAnnotation ? "@IsOptional()" : "@IsNotEmpty()"
    );
  }

  comments.forEach((comment) => {
    if (VALIDATION_ANNOTATION_REGEXES.email.test(comment))
      decorators.push("@IsEmail()");
    const minLengthMatch = comment.match(
      VALIDATION_ANNOTATION_REGEXES.minLength
    );
    if (minLengthMatch) decorators.push(`@MinLength(${minLengthMatch[1]})`);
    const maxLengthMatch = comment.match(
      VALIDATION_ANNOTATION_REGEXES.maxLength
    );
    if (maxLengthMatch) decorators.push(`@MaxLength(${maxLengthMatch[1]})`);
    const minMatch = comment.match(VALIDATION_ANNOTATION_REGEXES.min);
    if (minMatch) decorators.push(`@Min(${minMatch[1]})`);
    const maxMatch = comment.match(VALIDATION_ANNOTATION_REGEXES.max);
    if (maxMatch) decorators.push(`@Max(${maxMatch[1]})`);
  });

  decorators.push("@Expose()");
  return decorators.map((decorator) => `  ${decorator}`).join("\n");
}
