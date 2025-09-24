import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import EditorjsList from "@editorjs/list";
import CodeTool from "@editorjs/code";
import styles from "./editorComponent.module.css";
import Quote from "@editorjs/quote";
import { Link } from "react-router";

import { useEffect, useRef, useState } from "react";

const EditorComponent = ({ post }) => {
  const ejInstance = useRef();
  const [data, setData] = useState(post.content);
  const [isPublish, setIsPublish] = useState(post.publish);
  const [title, setTitle] = useState(post.title);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        list: {
          class: EditorjsList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        image: SimpleImage,
        code: CodeTool,
        quote: Quote,
      },
      autofocus: true,
      onReady: () => {
        ejInstance.current = post.editor;
      },
      data: post.content ? post.content : {},
      onChange: async () => {
        let content = await editor.saver.save();

        setData(content);
      },
    });
  };

  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  useEffect(() => {
    saveData();
  }, [isPublish]);

  const saveData = async () => {
    try {
      const formData = { title, content: data, publish: isPublish };
      const response = await fetch(
        `${import.meta.env.VITE_BLOG_POST}/${post.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        console.error("An error has occured", result.msg);
        return;
      }

      console.log("Data has been saved!");
    } catch (error) {
      console.error("An error has occurred:", error);
    }
  };

  return (
    <>
      <div className={styles["editor-actions"]}>
        <div className={styles["btns-wrapper"]}>
          <Link to={"/"}>
            <button>Back</button>
          </Link>
          <button onClick={saveData}>Save</button>
        </div>
        {isPublish ? (
          <div className={styles["publish-wrapper"]}>
            <p>This post is live</p>
            <button
              className={styles["publish-btn-offline"]}
              onClick={() => setIsPublish(false)}
            >
              Unpublish
            </button>
          </div>
        ) : (
          <div className={styles["publish-wrapper"]}>
            <p>This post is offline</p>
            <button
              className={styles["publish-btn-online"]}
              onClick={() => setIsPublish(true)}
            >
              publish
            </button>
          </div>
        )}
      </div>
      <div className={styles["post-info"]}>
        <div></div>
      </div>
      <div id="editorjs" className={styles["editor-container"]}></div>
    </>
  );
};

export default EditorComponent;
