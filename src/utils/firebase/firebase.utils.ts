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
  User,
  NextOrObserver,
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
  QueryDocumentSnapshot,
  CollectionReference,
  DocumentData
} from "firebase/firestore";
import { Category } from "../../store/categories/categories.types";
import { UserDbEntry, UserInfo } from "../../store/user/user.types";

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

export type ObjectToAdd = {
  title: string;
}

export const getDocumentsFromCollection = async (collectionKey: string): Promise<Category[]> => {
  const collectionRef = collection(db, collectionKey);

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(docSnapshot => docSnapshot.data() as Category);
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
  collectionKey: string,
  objectsToAdd: T[]
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);

  if (
    !(await checkDocExistsInCollection(
      collectionRef,
      objectsToAdd[0].title
    ))
  ) {
    const batch = writeBatch(db);

    objectsToAdd.forEach((obj) => {
      const docRef = doc(collectionRef, obj.title.toLowerCase());
      batch.set(docRef, obj);
    });

    await batch.commit();
  } else {
    console.log(`Collection ${collectionKey} already exists`);
  }
};

const checkDocExistsInCollection = async (collectionRef:CollectionReference<DocumentData>, docId:string) => {
  const docRef = doc(collectionRef, docId.toLowerCase());

  const docSnapshot = await getDoc(docRef);

  return docSnapshot.exists;
};

export type AdditionalInfo = {
  displayName?: string;
}

export async function createUserDocumentFromAuth<T extends User, P extends AdditionalInfo> (
  userAuth: T,
  userAdditionalInformation: P
): Promise<void | QueryDocumentSnapshot<UserDbEntry>>;

export async function createUserDocumentFromAuth<T extends User, P extends AdditionalInfo> (
  userAuth: User,
  userAdditionalInformation: void
): Promise<void | QueryDocumentSnapshot<UserDbEntry>>;

export async function createUserDocumentFromAuth<T extends User, P extends AdditionalInfo> (
  userAuth: T,
  userAdditionalInformation: P
): Promise<void | QueryDocumentSnapshot<UserDbEntry>> {
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

  return userSnapshot as QueryDocumentSnapshot<UserDbEntry>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  console.log('signOutUser was called'); 
  signOut(auth); 
}

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser = (): Promise<User | null> => {
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
