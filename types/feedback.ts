export enum FeedbackSortBy {
	mostRecent = 'Most Recent',
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

export interface FeedbackComment {
	text: string;
	user: {
		name: string;
		picture: string;
	};
}

export interface FeedbackUpvotes {
	[userId: string]: boolean;
}

export interface Feedback {
	id: string;
	title: string;
	creator: string;
	details: string;
	commentCount: number;
	dateAdded: string;
	status: FeedbackStatus;
	category: FeedbackCategory;
	upVotes: FeedbackUpvotes;
}
