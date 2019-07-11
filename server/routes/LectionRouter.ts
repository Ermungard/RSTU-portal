import * as Express from 'express';
import LectionController from '../controllers/LectionController';

const router: Express.Router = Express.Router();

router.route('/courses/:course_id/lections')
    .all()
    .get(LectionController.getLections)
    .post(LectionController.createLection);

router.route('/courses/:course_id/lections/:lection_id')
    .get(LectionController.getLectionById)
    .put(LectionController.updateLection)
    .delete(LectionController.deleteLection);

export default router;