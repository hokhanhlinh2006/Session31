import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

function MarkdownEditor({ value, onChange }) {
  return (
    <MdEditor
      style={{ height: "400px" }}
      renderHTML={(text) => mdParser.render(text)}
      value={value}
      onChange={({ text }) => onChange(text)}
    />
  );
}

export default MarkdownEditor;
