import { callable } from '../../lib/firebase';

export default async function verifyUsername(username: string) {
	const { data: valid } = await callable({
		name: 'verifyUsername',
		data: { username },
	});
	return valid as boolean;
}
