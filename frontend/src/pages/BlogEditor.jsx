import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

const BlogEditor = ({ data, onSave }) => {
  const editorInstance = useRef(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: 'editorjs',
      data: data || {},
      tools: {
        header: Header,
        list: List,
      },
      onReady: () => {
        editorInstance.current = editor;
      }
    });

    return () => {
      editor.destroy();
      editorInstance.current = null;
    };
  }, []);

  const handleSave = async () => {
    const outputData = await editorInstance.current.save();
    onSave(outputData); // Pass the structured data up
  };

  return (
    <>
      <div id="editorjs" className="border p-4"></div>
      <button onClick={handleSave} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Save Blog
      </button>
    </>
  );
};

export default BlogEditor;