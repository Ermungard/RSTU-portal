import * as Express from 'express';
import HomeworkController from'../controllers/HomeworkController';
import * as multer from 'multer';

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, `${__dirname}/../public/homeworks/`)
	},
	filename: function (req, file, cb) {
		let fileSplited = file.originalname.split('.', -1);
		cb(null, `${fileSplited[0]}-${Date.now()}.${fileSplited[1]}`)
	}
});

function fileFilter(req, file, cb) {
	let extension: string = file.originalname.split('.', -1)[1],
		whiteArrayExtensions: Array<string> = [
			'xls',
			'xlsx',
			'doc',
			'docx',
			'pdf',
			'zip',
			'odt'
		],
		passNext = whiteArrayExtensions.find(function (el, index, obj) {
			return extension === el;
		});

	cb(null, passNext);
}

let upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: { fileSize: 10 * 1024 * 1024, files: 1 }
});

let router: Express.Router = Express.Router();

router.route('/courses/:course_id/lections/:lection_id/homeworks')
    .all()
    .get(HomeworkController.getHomeworks)
    .post(upload.single('studentDocument'), HomeworkController.createHomework);

router.route('/courses/:course_id/lections/:lection_id/homeworks/:homework_id')
    .get(HomeworkController.getHomeworkById)
    .put(HomeworkController.updateHomework)
    .delete(HomeworkController.deleteHomework);

export default router;