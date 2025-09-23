import { useParams } from "react-router";
import { useEffect, useState, useRef } from "react";
import EditorComponent from "./components/EditorComponent";
import style from "./editPost.module.css";
const EditPost = () => {
    const {postId} = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const editorJs = useRef(null);
    useEffect(() => {
        async function Post(){
            try{
                const response = await fetch(`${import.meta.env.VITE_BLOG_POST}/${postId}`, {
                    credentials: 'include'
                });

                const result = await response.json();

                if(!response.ok){
                    setError(result?.msg || "Failed to fetch post");
                    return;
                }
                
                setPost(result);
                
            }catch(error){
                setError(`A server error has occured: ${error}`);
            }finally{
                setLoading(false);
            }
        }
        Post();
    }, []);

    if(loading) return <div>Loading</div>;
    if(error) return <div>{error}</div>
    return (
        <>
            <div id="editor-wrapper">
                <EditorComponent post={post}/>
            </div>
        </>

    )

}

export default EditPost;