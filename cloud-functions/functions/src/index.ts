const functions = require('firebase-functions');

exports.addComment = functions.https.onCall((data: any) => {
	return {
		yourData: {
			...data,
		},
	};
});
