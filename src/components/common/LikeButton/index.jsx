import React, { useState,useMemo } from 'react';
import './index.scss';
import { likePost,getLikesByUser } from '../../../api/FirestoreAPI';
import { AiFillHeart } from 'react-icons/ai';

export default function LikeButton({ userId, postId }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount,setLikesCount] = useState(0)
  const handleLike = () => {
    likePost(userId, postId,isLiked);
    setIsLiked(true);
  };

  const likeIconStyle = {
    color: isLiked ? ' red' : 'inherit',
  };
  console.log(likesCount);
useMemo(()=> {
  getLikesByUser(userId,postId,setIsLiked,setLikesCount);
},[])

  return (
    <div className="like-container" onClick={handleLike}>
      <p className="like-icon">
        <AiFillHeart size={25} style={likeIconStyle} />
      </p>
    <p className='likecount'>{likesCount}</p>
    </div>
  );
}
