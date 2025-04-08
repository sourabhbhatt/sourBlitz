import React, { FC, memo } from "react";

interface CodeEditorProps {
  name: string;
  description: string;
  code: string;
}
const CodeEditor: FC<CodeEditorProps> = memo(({ name, description, code }) => {
  return (
    <div className="border border-indigo-600 rounded-xl p-6 shadow-xl bg-zinc-900 hover:bg-zinc-800 transition-all duration-300 ease-in-out">
      <h2 className="text-2xl font-semibold text-indigo-400 mb-2">{name}</h2>
      <p className="text-gray-400 mb-4">{description}</p>

      <pre className="bg-gray-950 text-green-300 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap text-sm shadow-inner">
        <code>{code}</code>
      </pre>
    </div>
  );
});
export default CodeEditor;
