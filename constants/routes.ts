export enum routes {
	home = '/',
	roadmap = '/roadmap',
	feedback = '/feedback',
	auth = '/auth',
	createFeedback = '/create-feedback',
	editFeedback = '/edit-feedback',
}

export const unProtectedRoutes = [routes.auth, routes.feedback, routes.roadmap];
