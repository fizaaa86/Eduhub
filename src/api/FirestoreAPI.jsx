import { firestore } from "../firebaseConfig";
import {addDoc, collection, onSnapshot } from 'firebase/firestore'
import { toast } from "react-toastify";
let dbRef = collection(firestore,"courses");
let userRef = collection(firestore,"users")
export const courseStatus = (object) =>{
    
    addDoc(dbRef, object)
    .then((res) => {
        toast.success('Course has been added successfully')
    })
    .catch((err) =>{
    toast.error("Couldnt add the course");
    });
};
export const getStatus = (setAllStatus) => {
    onSnapshot(dbRef, (response) => {
        setAllStatus(response.docs.map((docs) => {
            return { ...docs.data(), id: docs.id };
        }));
    })
};

export const postUserData = (object) => {
    addDoc(userRef,object)
    .then(() => {})
    .catch((err) => {
        console.log(err);
    });
};

export const getCurrentUser = () => {
    onSnapshot(userRef, (response) => {
       console.log(response.docs.map((docs) => {
            return { ...docs.data(), userID: docs.id };
        }));
    })
};