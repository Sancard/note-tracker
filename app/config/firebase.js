import * as firebase from 'firebase';
import config from './firebase-env';

firebase.initializeApp(config);

export const db = firebase.firestore();


export const getDataFromCollection = (uuid, collection) => {
  return db.collection('users').doc(uuid).collection(collection).get();
};


export const saveUserDataToDb = (data, uuid, collection) => {
  return db.collection('users').doc(uuid).collection(collection).doc(data.uuid).set({
    ...data
  })
};

export const deleteUserDataFromDb = (data, uuid, collection) => {
  console.log(data.uuid);
  return db.collection('users').doc(uuid).collection(collection).doc(data.uuid).delete();
};


export default firebase;
