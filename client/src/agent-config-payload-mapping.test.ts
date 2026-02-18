import { readFileSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import {
  payloadAgentConfigIgnoredFields,
  payloadAgentConfigMappedFields,
} from "@shared/agent-config-payload";

function extractAgentConfigKeys(sourceText: string): string[] {
  const sourceFile = ts.createSourceFile(
    "payload-types.ts",
    sourceText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );

  const keys: string[] = [];

  const visit = (node: ts.Node) => {
    if (ts.isInterfaceDeclaration(node) && node.name.text === "AgentConfig") {
      for (const member of node.members) {
        if (ts.isPropertySignature(member) && member.name) {
          if (ts.isIdentifier(member.name)) {
            keys.push(member.name.text);
          } else if (ts.isStringLiteral(member.name)) {
            keys.push(member.name.text);
          }
        }
      }
    }
    ts.forEachChild(node, visit);
  };

  visit(sourceFile);
  return keys;
}

describe("payload AgentConfig mapping coverage", () => {
  it("keeps adapter fields synchronized with payload-types AgentConfig interface", () => {
    const payloadTypesPath = path.resolve(
      process.cwd(),
      "payload-cms",
      "payload-types.ts",
    );
    const payloadTypesSource = readFileSync(payloadTypesPath, "utf8");

    const interfaceKeys = extractAgentConfigKeys(payloadTypesSource);
    const ignored = new Set(payloadAgentConfigIgnoredFields);
    const mapped = new Set(payloadAgentConfigMappedFields);

    const expectedMapped = interfaceKeys.filter((key) => !ignored.has(key as never));
    const missingInAdapter = expectedMapped.filter((key) => !mapped.has(key as never));
    const staleInAdapter = payloadAgentConfigMappedFields.filter(
      (key) => !expectedMapped.includes(key),
    );

    expect(
      missingInAdapter,
      `Campos novos no payload sem mapeamento no adapter: ${missingInAdapter.join(", ")}`,
    ).toEqual([]);
    expect(
      staleInAdapter,
      `Campos mapeados que nao existem mais no payload: ${staleInAdapter.join(", ")}`,
    ).toEqual([]);
  });
});
