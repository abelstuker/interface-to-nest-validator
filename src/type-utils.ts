import * as ts from "typescript";

export function getTypeString(typeNode?: ts.TypeNode): string {
  if (!typeNode) return "any";

  if (ts.isArrayTypeNode(typeNode)) {
    return `${getTypeString(typeNode.elementType)}[]`;
  }

  if (typeNode.kind === ts.SyntaxKind.StringKeyword) return "string";
  if (typeNode.kind === ts.SyntaxKind.NumberKeyword) return "number";
  if (typeNode.kind === ts.SyntaxKind.BooleanKeyword) return "boolean";

  if (ts.isTypeReferenceNode(typeNode) && typeNode.typeName) {
    return typeNode.typeName.getText();
  }

  return "any";
}
