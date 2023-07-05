import { firestore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  orderBy,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";

let postsRef = collection(firestore, "Courses");
let videoRef = collection(firestore,"Videos");
let userRef = collection(firestore, "users");
let likeRef = collection(firestore, "likes");
let commentsRef = collection(firestore, "Reviews");
let connectionRef = collection(firestore, "connections");

export const courseStatus = (object) => {
  addDoc(postsRef, object)
    .then(() => {
      toast.success("Course has been added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const videotatus = (object) => {
  addDoc(videoRef, object)
    .then(() => {
      toast.success("video has been added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};


export const getStatus = (setAllStatus) => {
  const q = query(postsRef, orderBy("timeStamp"));
  onSnapshot(q, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getVideos = (setOwned) => {
  const q = query(postsRef, orderBy("timeStamp"));
  onSnapshot(q, (response) => {
    setOwned(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getPrice = (setPrices,id) => {
  const singlePriceQuery = query(postsRef, where("postID", "==", id));
  onSnapshot(singlePriceQuery, (response) => {
    console.log(
      response
    );
  });
};


export const getAllUsers = (setAllUsers) => {
  onSnapshot(userRef, (response) => {
    setAllUsers(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};
export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {
  try {
    let likeQuery = query(likeRef, where("postId", "==", postId));

    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      let likesCount = likes?.length;

      const isLiked = likes.some((like) => like.userId === userId);

      setLikesCount(likesCount);
      setLiked(isLiked);
    });
  } catch (err) {
    console.log(err);
  }
};

export const getSingleStatus = (setPosts, id) => {
  const singlePostQuery = query(postsRef, where("postID", "==", id));
  onSnapshot(singlePostQuery, (response) => {
    setPosts(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};

export const getMentorPosts = (setAllStatuses, userEmail) => {
  const singlePostQuery = query(postsRef, where("userEmail", "==", userEmail));
  onSnapshot(singlePostQuery, (response) => {
    setAllStatuses(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })
    );
  });
};


export const getSingleUser = (setCurrentUser, email) => {
  const singleUserQuery = query(userRef, where("email", "==", email));
  onSnapshot(singleUserQuery, (response) => {
    setCurrentUser(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id };
      })[0]
    );
  });
};

export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getCurrentUser = (setCurrentUser) => {
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), id: docs.id };
        })
        .filter((item) => {
          return item.email === localStorage.getItem("userEmail");
        })[0]
    );
  });
};

export const editProfile = (userID, payload) => {
  let userToEdit = doc(userRef, userID);

  updateDoc(userToEdit, payload)
    .then(() => {
      toast.success("Profile has been updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const likePost = (userId, postId, isLiked) => {
  try {
    let docToLike = doc(likeRef, `${postId}`);
    if (isLiked) {
      deleteDoc(docToLike);
    } else {
      setDoc(docToLike, { userId, postId });
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPosts = async (setPosts) => {
  const data = await getDocs( postsRef );
 setPosts(data.docs.map((doc) => ({...doc.data(),  id: doc.id })));
}

export const Amount = (price) => {
  return <p>{price}</p>;
};
export const createFirestoreCollection = async (data) => {
  try {
    const collectionRef = collection(firestore, 'item'); // Replace 'your-collection-name' with your desired collection name
    const querySnapshot = await getDocs(collectionRef);

    if (querySnapshot.size === 0) {
      // Only create the document if the collection is empty
      await addDoc(collectionRef, data); // Add the document with the provided data to the collection
      console.log('Collection created successfully!');
    } else {
      // Delete the existing document
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });

      // Create a new document
      await addDoc(collectionRef, data);
      console.log('Existing document deleted. New collection created successfully!');
    }
  } catch (error) {
    console.error('Error creating collection:', error);
  }
};

export const postComment = (postId,comment,timeStamp,name,imageLink) => {
  try{
      addDoc(commentsRef,{
        postId,
        comment,
        timeStamp,
        name,
        imageLink,
      })
  }
  catch(err){
    console.log(err)
  }
}
export const getComments = (postId,setComment) => {
  try {
    let singlePostQuery = query(commentsRef, where("postId", "==", postId));

    onSnapshot(singlePostQuery, (response) => {
      const comments = response.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setComment(comments);
    });
  } catch (err) {
    console.log(err);
  }
};