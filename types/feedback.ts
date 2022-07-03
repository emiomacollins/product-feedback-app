export enum FeedbackSort {
	mostUpvotes = 'Most Upvotes',
	leastUpvotes = 'Least Upvotes',
	mostComments = 'Most Comments',
	leastComments = 'Least Comments',
}

export enum FeedbackCategory {
	ui = 'UI',
	ux = 'UX',
	enhancement = 'Enhancement',
	bug = 'Bug',
	feature = 'Feature',
}

export enum FeedbackStatus {
	suggestion = 'Suggestion',
	planned = 'Planned',
	inProgress = 'In-Progress',
	live = 'Live',
}

export interface Feedback {
	id: string;
	category: FeedbackCategory;
	details: string;
	status: FeedbackStatus;
	title: string;
	comments: string[];
	upVotes: { [userId: string]: boolean };
	creator: string;
}
