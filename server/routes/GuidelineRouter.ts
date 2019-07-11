import * as Express from 'express';
import GuidelineController from'../controllers/GuidelineController';

const router: Express.Router = Express.Router();

router.route('/courses/:course_id/lections/:lection_id/guidelines')
    .all()
    .get(GuidelineController.getGuidelines)
    .post(GuidelineController.createGuideline);

router.route('/courses/:course_id/lections/:lection_id/guidelines/:guideline_id')
    .get(GuidelineController.getGuidelineById)
    .put(GuidelineController.updateGuideline)
    .delete(GuidelineController.deleteGuideline);

export default router;