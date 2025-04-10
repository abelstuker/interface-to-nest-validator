import ts from "typescript";

export function parseJSDocComments(
  node: ts.Node,
  sourceFile: ts.SourceFile
): string[] {
  const fullText = sourceFile.getFullText();
  const nodeStart = node.getFullStart();
  const nodeEnd = node.getEnd();
  const relevantText = fullText.substring(nodeStart, nodeEnd);

  const jsDocPattern = /\/\*\*[\s\S]*?\*\//g;
  const jsDocComment = relevantText.match(jsDocPattern);

  if (!jsDocComment) return [];

  return jsDocComment[0]
    .split("\n")
    .map((line) =>
      line
        .trim()
        .replace(/^\s*\*\s*/, "") // Remove leading asterisk and whitespace
        .trim()
    )
    .filter(
      (line) => line && !line.startsWith("/**") && !line.startsWith("*/")
    );
}
