import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import SimpleImage from "@editorjs/simple-image";
import EditorjsList from "@editorjs/list";
import CodeTool from "@editorjs/code";
import styles from "./editorComponent.module.css";
import Quote from "@editorjs/quote";
import { Link, useNavigate } from "react-router";

import { useEffect, useRef, useState } from "react";

const EditorComponent = ({ post }) => {
  const ejInstance = useRef();
  const [data, setData] = useState(post.content);
  const [isPublish, setIsPublish] = useState(post.publish);
  const [title, setTitle] = useState(post.title);
  const [editTitle, setEditTitle] = useState(false);

  const navigate = useNavigate();
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

  const cancelTitleChange = () => {
    setTitle(post.title);
    setEditTitle(false);
  };

  const confirmTitleChange = () => {
    saveData();
    setEditTitle(false);
  };

  const deletePost = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this?");

      if (confirmed) {
        const userPassword = window.prompt(
          "Please enter your password to confirm deletion.",
        );

        if (userPassword == null) {
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BLOG_POST}/${post.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password: userPassword }),
            credentials: "include",
          },
        );

        if (!response.ok) {
          window.alert(response.msg);
          return;
        }

        navigate("/");
      } else {
        //do nothing
        return;
      }
    } catch (error) {
      console.log(error);
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
          <button onClick={deletePost}>Delete</button>
        </div>
        <div className={styles["title-wrapper"]}>
          <label htmlFor="title">Title</label>
          <div className={styles["input-wrapper"]}>
            <input
              type="text"
              value={title}
              name="title"
              id="title"
              disabled={!editTitle}
              onChange={(e) => setTitle(e.target.value)}
            />
            {editTitle ? (
              <div className={styles["input-btn-actions-wrapper"]}>
                <img
                  src="/cancel.svg"
                  alt="title cancel button"
                  onClick={cancelTitleChange}
                />
                <img
                  src="/confirm.svg"
                  alt="title confirm button"
                  onClick={confirmTitleChange}
                />
              </div>
            ) : (
              <img
                src="/edit.svg"
                alt="title edit button"
                onClick={() => setEditTitle(true)}
              />
            )}
          </div>
        </div>
        <div className={styles["comment-wrapper"]}>
          <Link to={`/comments/${post.id}`}>
            <button>Manage Comments</button>
          </Link>
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
