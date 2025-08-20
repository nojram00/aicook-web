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
  Query,
  QueryConstraint,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";
import { useCallback, useState } from "react";

// Initialize firebase:

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
const analytics = getAnalytics(app)

export function useFirestore() {
  const collections = useCallback(function _collections<T>(
    collection_name: string
  ) {
    const collectionRef = collection(firestore, collection_name);

    function queries(...ops: Array<(q: Query<DocumentData>) => Query<DocumentData>>){
        return () => ops.reduce((acc, fn) => fn(acc), query(collectionRef))
    }

    async function constraints(...ops: Array<QueryConstraint>){
        const c = () => query(collectionRef, ...ops)

        const snapshot = await getDocs(c());

        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as T & { id: string }));

        return { data, snapshot }
    }

    return { queries, constraints, collectionRef }
  },
  []);

  const all = useCallback(async function all<T>(collection_name: string){

    const collectionRef = collection(firestore, collection_name);

    const snapshot = await getDocs(collectionRef);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as T & { id: string }));
  }, [])

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

  const find = useCallback(function find(collection_name : string, id: string){
    const docRef = doc(firestore, `${collection_name}/${id}`);

    return docRef
  }, [])

  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  const [docs, setDocs] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);

  const pagination = {
    lastDoc,
    setLastDoc,

    docs,
    setDocs,

    firstPage: useCallback(async function firstPage<T>(
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
      setDocs(_docs);

      if (_docs.length > 0) {
        setLastDoc(_docs[docs.length - 1]);
      }

      return _docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as T & {id: string}));
    },
    []),

    nextPage: useCallback(async function _lastPage<T>(
      collection_name: string,
      order_by = "name",
      offset = 5
    ) {
      if (!lastDoc) return;

      const q = query(
        collection(firestore, collection_name),
        orderBy(order_by),
        startAfter(lastDoc),
        limit(offset)
      );

      const snapshot = await getDocs(q);

      const _docs = snapshot.docs;

      setDocs(_docs);

      if (_docs.length > 0) {
        setLastDoc(_docs[docs.length - 1]);
      }

      return _docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as T & { id: string }));
    },
    []),
  };

  return {
    collections,
    all,
    create,
    update,
    find,
    pagination,
  };
}


export function useFireauth(){

    const auth = useCallback(function auth(){
        return fireauth
    }, [])

    const login = useCallback(function login(email: string, password: string){
        return signInWithEmailAndPassword(fireauth, email, password)
    }, [])

    const googleLogin = useCallback(function googleLogin(){
        const provider = new GoogleAuthProvider();

        return signInWithPopup(fireauth, provider);
    }, [])

    const waitForAuth = useCallback(function waitForAuth(){
        return new Promise<void>((res) => {
            const unsubscribe = onAuthStateChanged(fireauth, () => {
              unsubscribe(), res();
            });
          });
    }, [])

    const getSession = useCallback(async function getSession(){
        await waitForAuth();
        const user = fireauth.currentUser

        return user
    }, [])

    const logout = useCallback(function logout(){
        return signOut(fireauth)
    }, [])

    return {
        auth,
        login,
        googleLogin,
        waitForAuth,
        getSession,
        logout
    }
}

export function useAnalytics(){
    const logSignIn = useCallback(function logSignIn(params : { uid: string, login_type: string }){
        logEvent(analytics, 'login', params)
    }, [])

    return {
        logSignIn
    }
}