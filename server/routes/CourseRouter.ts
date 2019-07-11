import * as Express from 'express';
import CourseController from '../controllers/CourseController';
import * as multer from 'multer';

let storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, `${__dirname}/../public/courses/`)
	},
	filename: function (req, file, cb) {
		let fileSplited = file.originalname.split('.', -1);
		cb(null, `${fileSplited[0]}-${Date.now()}.${fileSplited[1]}`)
	}
});

function fileFilter(req, file, cb) {
	let extension: string = file.originalname.split('.', -1)[1],
		whiteArrayExtensions: Array<string> = [
			'jpg',
			'jpeg',
			'png'
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

const router: Express.Router = Express.Router();

/**
 * @api {get} /courses список курсов
 * @apiName GetCourses
 * @apiGroup Courses
 *
 * @apiSuccess {Object[]} - Массив, содержащий данные всех курсов
 *
 * @apiSuccessExample {json} - Ответ:
 *     [{
 *         "title": "C# Starter",
 *         "description": "...",
 *         "image": "/static/C#_Starter/logo.png"
 *     }, {
 *         "title": "C# Essential",
 *         "description": "...",
 *         "image": "/static/C#_Essential/logo.png"
 *     }]
 */
router.route('/courses')
    .all()
    .get(CourseController.getCourses)
    .post(upload.single('courseImage'), CourseController.createCourse);

/**
 * @api {get} /courses/:course_id курс
 * @apiName GetCourse
 * @apiGroup Courses
 *
 * @apiParam {Number} course_id Уникальный идентификатор курса
 * 
 * @apiSuccess {String} title Название курса
 * @apiSuccess {String} description Описание курса
 * @apiSuccess {String} image Ссылка на логотип курса
 *
 * @apiSuccessExample {json} - Ответ:
 *     {
 *         "title": "C# Starter",
 *         "description": "...",
 *         "image": "/static/C#_Starter/logo.png"
 *     }
 * 
 * @apiError CourseNotFound Курс с таким идентификатором не найден
 * @apiErrorExample {json} - Ошибка:
 *     {
 *         "status": "CourseNotFound",
 *         "message": "Курс с таким идентификатором не найден" 
 *     }
 */
router.route('/courses/:course_id')
    .get(CourseController.getCourseById)
    .put(CourseController.updateCourse)
    .delete(CourseController.deleteCourse);

export default router;