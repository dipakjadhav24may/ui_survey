import app from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCZ-8gjzbPBe8vMYjRM-ynbTTCDcQnvTvg",
  authDomain: "survey-user-app.firebaseapp.com",
  databaseURL: "https://survey-user-app.firebaseio.com",
  projectId: "survey-user-app",
  storageBucket: "survey-user-app.appspot.com",
  messagingSenderId: "365800920646",
  appId: "1:365800920646:web:a921f8268dac7a450a5c47",
  measurementId: "G-RCB0KDJ0E2"
};

let firebase = app.initializeApp(firebaseConfig);
let database = firebase.database();

export const createSurvey = async surveyData => {
  const key = await database
    .ref("surveys")
    .push(surveyData)
    .getKey();
  return key;
};
