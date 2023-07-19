import React, { useEffect, useState } from "react";
import Buttons from "./Buttons";
import CreatePost from "./CreatePost";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const apiEndpoint = "https://jsonplaceholder.typicode.com/posts";

const Fetchdata = () => {  
  const [postdata, setpostdata] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit=(title, body)=>{
    const tempId = uuidv4();
  const newPost = { title, body, id: tempId };
  axios
    .post(apiEndpoint, newPost)
    .then((response) => {
      const createdPost = response.data;
      const updatedData = [...postdata, { ...createdPost, id: tempId }];
      setpostdata(updatedData);
    })
    .catch((error) => {
      console.error(error);
    });
    } 

  const handleUpdate=(id, title, body)=>{
  
  const updatedPost = { id, title, body };
  const updatedData = postdata.map((post) =>
    post.id === id ? updatedPost : post
  );
  setpostdata(updatedData);
  setIsUpdating(false);
  setSelectedPost({});
  } 

  const onUpdatePostClickHandler = (post) => {
    console.log("post", post);
    setSelectedPost(post)
    setIsUpdating(true)
  };

  const onDeletePostClickHandler = (post) => {
    const postId = String(post.id);
    axios
      .delete(apiEndpoint + "/" + postId)
      .then(() => {
        const updatedData = postdata.filter((p) => String(p.id) !== postId);
        setpostdata(updatedData);
      })
      .catch((error) => {
        console.error(error);
      });
  
  };

  const getposts = () => {
    axios.get(apiEndpoint).then((response) => {
      setpostdata(response.data);
    });
  };
  useEffect(getposts, []); //useEffect=(function,[]->dependency)

 
  return (
    <div className="main-container">
      <CreatePost
        apiEndpoint={apiEndpoint}
        postdata={postdata}
        setpostdata={setpostdata}
        selectedPost={selectedPost}
        isUpdating={isUpdating}
        handleSubmit={handleSubmit}
        handleUpdate={handleUpdate}
      />
      <h1>All posts</h1>
      <div className="postlist">
        {postdata.map((post, index) => {
          const { id, title, body } = post;
          const key = `${id}-${index}`
          return (
            <div className="singlepost" key={key}>
              <h2>{title}</h2>
              <p>{body}</p>

              <Buttons
                buttonText={"Delete"}
                onClickHandler={() => {
                  onDeletePostClickHandler(post);
                }}
              />
              <Buttons
                buttonText={"Update"}
                onClickHandler={() => {
                  onUpdatePostClickHandler(post);
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Fetchdata;
