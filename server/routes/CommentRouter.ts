import * as Express from 'express';
import CommentController from '../controllers/CommentController';

const router: Express.Router = Express.Router();

router.route('/courses/:course_id/lections/:lection_id/comments')
    .all()
    .get(CommentController.getComments)
    .post(CommentController.createComment);

router.route('/courses/:course_id/lections/:lection_id/comments/:comment_id')
    .get(CommentController.getCommentById)
    .put(CommentController.updateComment)
    .delete(CommentController.deleteComment);

export default router;