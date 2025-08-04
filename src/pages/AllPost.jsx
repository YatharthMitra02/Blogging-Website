import React from "react";
import { useEffect, useState } from "react";
import { Container, Postcard } from "../components";
import service from "../appwrite/Config";
const AllPost = () => {
  const [posts, setposts] = useState([]);
  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setposts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1">
              <Postcard post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;
