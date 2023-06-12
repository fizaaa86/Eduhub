import React from 'react';
import './index.scss';
import { likePost } from '../../../api/FirestoreAPI';
import { AiFillLike } from 'react-icons/ai';

export default function LikeButton({ userID, postId }) {
  const handleLike = () => {
    likePost(userID, postId);
  };

  return (
    <div className="like-container" onClick={handleLike}>
      <p className='like-icon'><AiFillLike size={25} /></p>
      <p>Like</p>
    </div>
  );
}
