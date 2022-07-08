import * as functions from 'firebase-functions';

exports.addComment = functions.https.onCall((data, context) => {
	if (!context.auth) throw new Error('Un-authenticated');
	return data;
});
