import db from '../models';
import {CourseAttributes, CourseInstance} from "../models/CourseModel";
import {isEmpty} from 'lodash';
import * as Express from 'express';
import {onlyGroup, USER_GROUP} from "../models/UserModel";

/**
 * Module exports.
 * @public
 * @class CourseController Класс-обработчик CRUD-запросов /courses
 */
export default class CourseController {

    /**
     * Получение всего списка курсов
     *
     * @method getCourses
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static getCourses(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Course.findAll()
            .then(courses => {
				res.json({
					success: true,
					data: <CourseInstance[]>courses
				})
			})
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Получение курса по id
     *
     * @method getCourseById
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static getCourseById(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Course.findById(req.params.course_id)
            .then(course => {
				res.json({
					success: true,
					data: <CourseInstance>course
				})
			})
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Создание курса
     *
     * @method createCourse
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    @onlyGroup(USER_GROUP.ADMIN)
    static createCourse(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

    	// TODO: headers form: content-type: application/x-www-form-urlencoded для отправки файла и значений title & description
    	if (!req.file)
    		res.json({ success: false, message: 'Error. Invalid file\'s extension. (only jpg, jpeg, png). '});
		else {
			req.body['image'] = req.file.filename;
			db.Course.create(<CourseAttributes>req.body)
				.then(course => (process.env.NODE_ENV === 'test') ? res.json({ success: true, data: course }) : res.json({ success: true }))
				.catch(err => res.json({
					success: false,
					message: err.message
				}))
		}
    }

    /**
     * Обновление курса
     *
     * @method updateCourse
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    @onlyGroup(USER_GROUP.TEACHER)
    static updateCourse(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

		db.Course.update(req.body, {where: { id: req.params.course_id }, individualHooks: true })
			.then(() => res.json({ success: true }))
			.catch(err => res.json({
						success: false,
						message: err.message
					}))
    }

    /**
     * Удаление курса
     *
     * @method deleteCourse
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    @onlyGroup(USER_GROUP.ADMIN)
    static deleteCourse(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

		db.Course.destroy({where: { id: req.params.course_id }, individualHooks: true })
			.then(() => res.json({ success: true }))
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }
}