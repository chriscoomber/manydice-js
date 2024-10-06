import "ace-builds";
import "ace-builds/webpack-resolver";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { useState } from "react";
import * as manydice from "many-dice";

console.log(manydice.FOO);

function JSEditor({
  initialCode = `return manydice.FOO`,
}: {
  initialCode?: string;
}) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string>();

  return (
    <>
      <AceEditor
        height="100px"
        value={code}
        onChange={setCode}
        mode="javascript"
        theme="monokai"
        fontSize="16px"
        highlightActiveLine={true}
        setOptions={{
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      <button
        onClick={() => {
          let outputText: string;
          try {
            outputText = String(
              // eslint-disable-next-line @typescript-eslint/no-implied-eval, @typescript-eslint/no-unsafe-call
              Function(
                "manydice",
                `
"use strict";
${code}
`,
              )(manydice),
            );
          } catch (e: unknown) {
            outputText = String(e);
          }
          setOutput(outputText);
        }}
      >
        Run
      </button>
      {output && <p>{output}</p>}
    </>
  );
}
export default JSEditor;
