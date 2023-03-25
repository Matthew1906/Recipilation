import axiosClient from "./base";
import { 
    GoogleAuthProvider, 
    FacebookAuthProvider,
    getAuth, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut 
} from "firebase/auth";

const auth = getAuth();

export function login({ email, password }){
    return signInWithEmailAndPassword(auth, email, password);
}

export function loginWithGoogle(){
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export function loginWithFacebook(){
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
};

export function loginWithMicrosoft(){

};

export function register({ username, email, password }){
    return axiosClient.post('/api/users', {username, email, password, type:"email"});
}

export function registerOAuth({ username, email }){
    return axiosClient.post('/api/users', { username, email, type:"oauth" });
}

export function logout(){
    return signOut(auth);
}