import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendEmailVerification,
  GoogleAuthProvider,
  signOut
 } from 'firebase/auth'
import { auth } from "../firebaseConfig";


export const LoginAPI = (email,password) => {
    try {
    let response = signInWithEmailAndPassword(auth,email,password);
    return response;
    } catch (err) {
        return err;
    }
};

export const RegisterAPI = async (email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    // Send email verification
    await sendEmailVerification(response.user);

    return response;
  } catch (err) {
    return err;
  }
};

export const GoogleSignInAPI = () => {
  try {
    let googleProvider = new GoogleAuthProvider();
    let res = signInWithPopup(auth, googleProvider);
 
  
    return res;
  } catch (err) {
    return err;
  }
};
  export const onLogout = () =>
  {
    try {
      signOut(auth);
    }
    catch (err) {
      return err;
    }
  };