import React, { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";

const EDITOR_JS_TOOLS = {
  header: Header,
  list: List,
};

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const editorRef = useRef(null); // UseRef for the editor instance

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "editorjs",
        tools: EDITOR_JS_TOOLS,
        placeholder: "Let's write an awesome story!",
        onChange: () => {
          editorRef.current.save().then((outputData) => {
            setIsEditorEmpty(outputData.blocks.length === 0);
          });
        },
        onReady: () => {
          console.log("Editor.js is ready!");
        },
        autofocus: true,
      });
    }

    // Cleanup function to destroy the editor instance
    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === 'function') {
        editorRef.current.destroy(); 
        editorRef.current = null; // Resetting the reference
      }
    };
  }, []);

  const handleSave = async () => {
    if (editorRef.current) {
      try {
        const outputData = await editorRef.current.save();
        const blogPost = {
          title: title,
          content: outputData,
        };
        console.log(blogPost);
        alert("Blog post saved successfully!");
      } catch (error) {
        console.error("Saving failed: ", error);
      }
    }
  };

  const isSaveDisabled = title.trim() === "" || isEditorEmpty;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Create New Blog Post
      </h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title"
        className="w-full p-3 mb-6 text-xl font-semibold border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
      />
      <div
        id="editorjs"
        className="border border-gray-300 p-4 mb-6 min-h-[400px] rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition duration-300"
      ></div>
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaveDisabled}
          className={`py-2 px-6 rounded-lg transition duration-200 flex items-center ${
            isSaveDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Save Blog Post
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;