import db from '../models';
import {HomeworkAttributes, HomeworkInstance} from '../models/HomeworkModel';
import {isEmpty} from 'lodash';
import * as Express from 'express';
import {onlyGroup, USER_GROUP} from "../models/UserModel";

/**
 * Module exports.
 * @public
 * @class HomeworkController Класс-обработчик CRUD-запросов /courses/:course_id/lections/:lection_id/homeworks
 */
export default class HomeworkController {

    /**
     * Получение всего списка домашних заданий по определённой лекции
     *
     * @method getHomeworks
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static getHomeworks(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Homework.findAll({
            where: {
            	lection_id: req.params.lection_id
            }
        })
            .then(homeworks => res.json({
				success: true,
				data: <HomeworkInstance[]>homeworks
			}))
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Получение домашнего задания определённой лекции по id
     *
     * @method getHomeworkById
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static getHomeworkById(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Homework.findById(req.params.homework_id, {
            where: {
                lection_id: req.params.lection_id
            }
        })
            .then(homework => res.json({
				success: true,
				data: <HomeworkAttributes>homework
			}))
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Создание домашнего задания в определённой лекции
     *
     * @method createHomework
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
	@onlyGroup(USER_GROUP.STUDENT)
    static createHomework(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

		if (!req.file)
			res.json({ success: false, message: 'Error. Invalid file\'s extension. (only xls, xlsx , doc, docx, pdf, zip).' });
		else {
			req.body['file'] = req.file.filename;
			db.Lection.findById(req.params.lection_id)
				.then(lection => {
					// TODO: сетеры без обработки reject'а (везде)
					db.Homework.create(<HomeworkAttributes>req.body)
						.then(homework => {
							homework.setLection(lection.id);
							homework.setUser(req['current_user'].login);
							(process.env.NODE_ENV === 'test') ? res.json({ success: true, data: homework }) : res.json({ success: true })
						})
						.catch(err => res.json({
							success: false,
							message: err.message
						}))
				})
				.catch(err => res.json({
					success: false,
					message: err.message
				}));
		}
    }

    /**
     * Обновление домашнего задания
     *
     * @method updateHomework
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    @onlyGroup(USER_GROUP.TEACHER)
    static updateHomework(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

		db.Homework.update(req.body, {where: { id: req.params.homework_id }, individualHooks: true })
			.then(() => res.json({ success: true, updatedFields: 'this' }))
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Удаление домашнего задания
     *
     * @method deleteHomework
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    @onlyGroup(USER_GROUP.ADMIN)
    static deleteHomework(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

		db.Homework.destroy({where: { id: req.params.homework_id }, individualHooks: true })
			.then(() => res.json({ success: true }))
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }
}