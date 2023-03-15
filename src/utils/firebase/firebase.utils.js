import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  collection,
  writeBatch,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBWz0EvzAGlH9kr5SRpLUaQCfJlvBrcbbU",
  authDomain: "crwn-clothing-85a87.firebaseapp.com",
  projectId: "crwn-clothing-85a87",
  storageBucket: "crwn-clothing-85a87.appspot.com",
  messagingSenderId: "778852195838",
  appId: "1:778852195838:web:374707d7aeb99274dcf4af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

export const db = getFirestore();

export const getDocumentsFromCollection = async (collectionKey) => {
  const collectionRef = collection(db, collectionKey);

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  docIdObjField = "title"
) => {
  const collectionRef = collection(db, collectionKey);

  if (
    !(await checkDocExistsInCollection(
      collectionRef,
      objectsToAdd[0][docIdObjField]
    ))
  ) {
    const batch = writeBatch(db);

    objectsToAdd.forEach((obj) => {
      const docRef = doc(collectionRef, obj[docIdObjField].toLowerCase());
      batch.set(docRef, obj);
    });

    await batch.commit();
    console.log("done");
  } else {
    console.log(`Collection ${collectionKey} already exists`);
  }
};

const checkDocExistsInCollection = async (collectionRef, docId) => {
  const docRef = doc(collectionRef, docId.toLowerCase());

  const docSnapshot = await getDoc(docRef);

  return docSnapshot.exists;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  userAdditionalInformation
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  let userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...userAdditionalInformation,
      });
    } catch (error) {
      console.log("Error creating user db entry", error);
    }
    userSnapshot = await getDoc(userDocRef);
  }

  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
}
