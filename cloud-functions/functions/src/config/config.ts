import * as admin from 'firebase-admin';
import { serviceAccount } from './serviceAccount';

export const app = admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const firestore = admin.firestore();

export default admin;
