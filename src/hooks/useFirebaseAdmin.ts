/* eslint-disable @typescript-eslint/no-explicit-any */
import { initializeApp, getApps, cert, ServiceAccount, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import 'server-only';

function env(key : string){
    return process.env[key]
}

const account = {
    type: env('TYPE'),
    project_id: env('PROJECT_ID'),
    private_key_id: env('PRIVATE_KEY_ID'),
    private_key: env('PRIVATE_KEY'),
    client_email: env('CLIENT_EMAIL'),
    client_id: env('CLIENT_ID'),
    auth_uri: env('AUTH_URI'),
    token_uri: env('TOKEN_URI'),
    auth_provider_x509_cert_url: env('AUTH_PROVIDER_X509_CERT_URL'),
    client_x509_cert_url: env('CLIENT_X509_CERT_URL'),
    universe_domain: env('UNIVERSE_DOMAIN')
}

export class Firebase {

    private app!: App;
    constructor(){
        this.app = getApps().length === 0 ? initializeApp({
            credential: cert(account as ServiceAccount)
        }) : getApps()[0];
    }

    static get instance(){
        return new Firebase();
    }

    firestore(){
        return new Firestore(this.app);
    }

    fireauth(){
        return new Fireauth(this.app);
    }
}

class Firestore {
    private instance : ReturnType<typeof getFirestore>;

    constructor(firebaseApp : App) {
        this.instance = getFirestore(firebaseApp)
    }

    async create(collection_name: string, data: any){
        return await this.instance.collection(collection_name).add(data);
    }

    async update(collection_name: string, id: string, data: any){
        return await this.instance.collection(collection_name).doc(id).update(data);
    }

    async get(collection_name: string, id: string){
        return await this.instance.collection(collection_name).doc(id).get();
    }
}

class Fireauth {
    private instance : ReturnType<typeof getAuth>;

    constructor(firebaseApp : App) {
        this.instance = getAuth(firebaseApp)
    }

    async verifyToken(token: string){
        return await this.instance.verifyIdToken(token);
    }

    async getUser(uid: string){
        return await this.instance.getUser(uid);
    }
}