import { Color } from './colors';

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

export const statusColors: { [status: string]: Color } = {
	[FeedbackStatus.planned]: 'orange',
	[FeedbackStatus.inProgress]: 'purple',
	[FeedbackStatus.live]: 'blue',
};

export interface FeedbackComment {
	id: string;
	text: string;
	user: {
		uid: string;
		fullName: string;
		photoUrl: string;
		username: string;
	};
	replies: FeedbackCommentReply[];
}

export interface FeedbackCommentReply extends Omit<FeedbackComment, 'id' | 'replies'> {}

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
