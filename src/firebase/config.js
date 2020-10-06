import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import {useState} from "react";

const config = {
    apiKey: "AIzaSyDOrpjLx8d0SVJPz6q1vaEPw3jiIGPZ6zQ",
    authDomain: "charitylandingpage.firebaseapp.com",
    databaseURL: "https://charitylandingpage.firebaseio.com",
    projectId: "charitylandingpage",
    storageBucket: "charitylandingpage.appspot.com",
    messagingSenderId: "841911466015",
    appId: "1:841911466015:web:802ad7992d656dc2273d2a",
    measurementId: "G-7FQDRGSGVQ"
};

class Firebase {
    constructor() {
        firebase.initializeApp(config);
        this.auth = firebase.auth();
        this.firestore = firebase.firestore();
    }


    checkUserLoggedIn() {
        if (firebase.auth().currentUser !== null) {
            return true;
        } else {
            return false;
        }
    }


    userUID() {
        const user = firebase.auth().currentUser;
        if (user !== null) {
            return (user.uid);
        } else {
            alert("Żaden użytkownik nie jest zalogowany");
        }
    }


    async login(email, password) {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(error => {
            console.log(error);
            return error;
        });
        return user;
    }


    async signIn(email, password) {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
            console.log(error);
            return error;
        });
        return user;
    }

    async logOut() {
        await firebase.auth().signOut().catch(error => {
            console.log(error);
        })
    }


    async getUserState() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        })
    }

    addNewCharity(userId, chosenCharity) {
        firebase.firestore().collection("chosenCharities").doc().set(chosenCharity);
    }

    async createCharity(chosenCharity) {
        const userId = this.userUID();
        chosenCharity.userId = userId;
        this.addNewCharity(userId, chosenCharity);
    }
}

export default new Firebase();
