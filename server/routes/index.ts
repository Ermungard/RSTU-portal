import * as Express from 'express';
import app from '../server';
import * as jwt from 'jsonwebtoken';
import BookRouter from './BookRouter';
import CommentRouter from './CommentRouter';
import CourseRouter from './CourseRouter';
import GuidelineRouter from './GuidelineRouter';
import HomeworkRouter from './HomeworkRouter';
import LectionRouter from './LectionRouter';
import UserRouter from './UserRouter';

let router:Express.Router = Express.Router();

router.use(function(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
	let urlWithoutAuth: Array<string> = [
		'/users/auth',
		'/users/forgot',
		'/users/reset'
	];
	let passNext = urlWithoutAuth.find(function (el, index, obj) {
		return req.url.substring(0, el.length) === el;
	});
	if ((process.env.NODE_ENV === 'test' && req.url === '/users' && req.method === 'POST') || passNext)
		next();
	else {
		let token: string = req.header('token');
		if (token) {
			jwt.verify(token, app.get('apisecret'), (err, decoded) => {
				if (err) {
					res.json({
						success: false,
						message: 'Request failed. Invalid token'
					});
				} else {
					req['current_user'] = decoded;
					next();
				}
			});
		} else {
			res.json({ success: false, message: 'Request failed. Need authorization.' });
		}
	}
});
router.use(UserRouter);
router.use(CourseRouter);
router.use(LectionRouter);
router.use(BookRouter);
router.use(CommentRouter);
router.use(HomeworkRouter);
router.use(GuidelineRouter);
router.use((req: Express.Request, res: Express.Response) => res.status(404).json({ success: false, message: 'ALARM! Not found page (404)' }));
export default router;