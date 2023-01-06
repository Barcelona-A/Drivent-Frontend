import firebase from './firebaseconfig';
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

const auth = getAuth();
const socialMediaAuth = async(provider) => {
  return signInWithPopup(auth, provider)
    .then((res) => {
      return res.user;
    })
    .catch((error) => {
      return error;
    });
};

export default socialMediaAuth;
