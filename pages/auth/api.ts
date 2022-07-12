import { httpsCallable } from 'firebase/functions';
import { functions } from '../../lib/firebase';

export default async function verifyUsername(username: string) {
	const callable = httpsCallable(functions, 'verifyUsername');
	const res = await callable({
		username,
	});

	return res.data as boolean;
}
