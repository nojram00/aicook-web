/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useCallback, useState } from "react";

export default function useFirebase() {
  const config = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
  };

  const app = initializeApp(config);

  const firestore = getFirestore(app);
  const fireauth = getAuth(app);

  function useFirestore() {
    const collections = useCallback(function _collections(
      collection_name: string
    ) {
      const collectionRef = collection(firestore, collection_name);
      return collectionRef;
    },
    []);

    const create = useCallback(function _create(
      collection_name: string,
      data: any
    ) {
      const collectionRef = collection(firestore, collection_name);

      return addDoc(collectionRef, data);
    },
    []);

    const update = useCallback(function update(
      collection_name: string,
      id: string,
      data: any
    ) {
      const docRef = doc(firestore, `${collection_name}/${id}`);

      return updateDoc(docRef, data);
    },
    []);

    const [lastDoc, setLastDoc] =
      useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    
    const [docs, setDocs] = 
        useState<QueryDocumentSnapshot<DocumentData>[]>([]);

    const pagination = {
      lastDoc,
      setLastDoc,

      docs,
      setDocs,

      firstPage: useCallback(async function firstPage(
        collection_name: string,
        order_by = "name",
        offset = 5
      ) {
        const q = query(
          collection(firestore, collection_name),
          orderBy(order_by),
          limit(offset)
        );

        const snapshot = await getDocs(q);

        const _docs = snapshot.docs;
        setDocs(_docs)

        if (_docs.length > 0) {
          setLastDoc(_docs[docs.length - 1]);
        }

        return _docs;
      },
      []),

      nextPage: useCallback(async function _lastPage(
        collection_name: string,
        order_by = "name",
        offset = 5
      ){
        if(!lastDoc) return;

        const q = query(
            collection(firestore, collection_name),
            orderBy(order_by),
            startAfter(lastDoc),
            limit(offset)
        )

        const snapshot = await getDocs(q);

        const _docs = snapshot.docs;

        setDocs(_docs);

        if (_docs.length > 0) {
            setLastDoc(_docs[docs.length - 1]);
        }

        return _docs

      }, [])
    };

    return {
      collections,
      create,
      update,
      pagination
    };
  }

  function useFireauth() {
    function login(email: string, password: string) {
      return signInWithEmailAndPassword(fireauth, email, password);
    }

    function googleLogin() {
      const provider = new GoogleAuthProvider();
      return signInWithPopup(fireauth, provider);
    }

    function waitForAuth() {
      return new Promise<void>((res) => {
        const unsubscribe = onAuthStateChanged(fireauth, () => {
          unsubscribe(), res();
        });
      });
    }

    async function getSession() {
      await waitForAuth();
      const user = fireauth.currentUser;

      return user;
    }

    

    return {
      login,
      googleLogin,
      getSession,
      waitForAuth
    };
  }

  return {
    app,
    firestore,
    useFirestore,
    fireauth,
    useFireauth,
  };
}
