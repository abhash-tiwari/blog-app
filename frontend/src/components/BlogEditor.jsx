import React, { useState, useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import { useNavigate } from "react-router-dom";

const EDITOR_JS_TOOLS = {
  header: Header,
  list: List,
};

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [isEditorEmpty, setIsEditorEmpty] = useState(true);
  const editorRef = useRef(null);
  const navigate = useNavigate();

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

    return () => {
      if (editorRef.current && typeof editorRef.current.destroy === "function") {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  const handleProceedToPayment = async () => {
    if (editorRef.current) {
      const outputData = await editorRef.current.save();
      const blogPost = {
        title: title,
        content: outputData,
      };

      localStorage.setItem("blogPost", JSON.stringify(blogPost));
      navigate("/payment");
    }
  };

  const isSaveDisabled = title.trim() === "" || isEditorEmpty;

  return (
    <div className="flex flex-col items-center max-w-4xl mx-auto p-8 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Create New Blog Post
      </h1>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter blog title"
        className="w-full p-4 mb-8 text-lg font-medium text-gray-700 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
      />
      <div
        id="editorjs"
        className="border border-gray-400 p-5 mb-8 min-h-[400px] rounded-lg bg-white shadow-inner focus-within:ring-2 focus-within:ring-blue-500 transition duration-300"
      ></div>
      <div className="flex justify-end w-full">
        <button
          onClick={handleProceedToPayment}
          disabled={isSaveDisabled}
          className={`py-3 px-8 rounded-lg transition duration-200 flex items-center justify-center text-lg font-semibold ${
            isSaveDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Publish Blog Post
        </button>
      </div>
    </div>
  );
};

export default BlogEditor;
