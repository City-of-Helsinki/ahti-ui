import app from 'firebase/app'
import 'firebase/firestore'
import { firebaseConfig } from '../config'

let firebaseApp

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.db = app.firestore()
    }

    getData = async () => {
        const snapshot = await this.db.collection('/points').get()
        return snapshot.docs.map(doc => doc.data())
    }
}

const firebase = () => firebaseApp || (firebaseApp = new Firebase())

export default firebase