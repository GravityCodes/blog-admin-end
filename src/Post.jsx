import {useState} from 'react';

const Post = ({post, postError}) => {
    const [loading, setLoading] = useState(true);

    if(post || postError){
        setLoading(false);
    }

    if (loading) return <div>Loading...</div>
    if(postError) return <div>An error has occured</div>
    console.log(post);
    return (
        <div>
            Data is here.
        </div>
    )
}

export default Post;