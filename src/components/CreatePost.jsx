//for creating new posts
import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";

const CreatePost = ({selectedPost,isUpdating,handleSubmit,handleUpdate, }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => { 
    if (Object.keys(selectedPost).length > 0) {
      const { title, body } = selectedPost;
      setTitle(title);
      setBody(body);
    }
  }, [selectedPost]);

  const handleOnClick = (e)=>{
    e.preventDefault()
    if(isUpdating){
      handleUpdate(selectedPost.id, title, body)
    }else handleSubmit(title, body)
  }

  return (
    <>
     <h2>Create a New Post</h2>
      <div className="createpostcontainer">
        <form >
          <div>
             <label>Enter title: </label>
             <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}/>
          </div>
           <div>
             <label> Enter body: </label>
             <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}/>
           </div>

           <Buttons
           onClickHandler={(e)=>{handleOnClick(e)}}
           buttonText={isUpdating ? 'Update' : 'Save'} />

        </form>
      </div>
    </>
  );
};

export default CreatePost;
