
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import Constants from 'expo-constants'


const firebaseConfig = {
    apiKey: Constants.expoConfig.extra.apiKey,
    authDomain: Constants.expoConfig.extra.authDomain,
    projectId: Constants.expoConfig.extra.projectId,
    storageBucket: Constants.expoConfig.extra.storageBucket,
    messagingSenderld: Constants.expoConfig.extra.messagingSenderId,
    appId: Constants.expoConfig.extra.appId,
    databaseURL: Constants.expoConfig.extra.databaseURL
}

const app = initializeApp(firebaseConfig)
const DB = getFirestore(app)




export default DB