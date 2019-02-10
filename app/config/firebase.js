import * as firebase from 'firebase';
import config from './firebase-env';

firebase.initializeApp(config);

export default firebase;
