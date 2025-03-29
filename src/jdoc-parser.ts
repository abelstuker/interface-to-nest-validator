import * as ts from "typescript";

export function parseJSDocComments(
  node: ts.Node,
  sourceFile: ts.SourceFile
): string[] {
  const fullText = sourceFile.getFullText();
  const nodeStart = node.getFullStart();
  const priorText = fullText.substring(0, nodeStart);
  const lastLineBreak = priorText.lastIndexOf("\n");
  const relevantText = priorText.substring(
    lastLineBreak !== -1 ? lastLineBreak : 0
  );

  const jsDocPattern = /\/\*\*[\s\S]*?\*\//g;
  const jsDocComment = relevantText.match(jsDocPattern);

  if (!jsDocComment) return [];

  return jsDocComment[0]
    .split("\n")
    .map((line) =>
      line
        .trim()
        .replace(/^\s*\*\s*/, "")
        .trim()
    )
    .filter(
      (line) => line && !line.startsWith("/**") && !line.startsWith("*/")
    );
}
