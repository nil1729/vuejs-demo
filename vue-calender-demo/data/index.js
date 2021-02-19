const fs = require('fs');
const jsonBuffer = fs.readFileSync('myCourse.json');
const JSONData = jsonBuffer.toString('utf-8');
const myCourses = JSON.parse(JSONData);

const firebase = require('firebase/app');
require('firebase/firestore');
const firebaseConfig = require('./firebase.config');

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const insertData = async () => {
	for (let i = 0; i < myCourses.length; i++) {
		let dbSnap = await db.collection('courses').add(myCourses[i]);
		console.log(dbSnap.id);
	}
};

insertData();
