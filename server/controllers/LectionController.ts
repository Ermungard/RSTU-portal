import db from '../models';
import {LectionAttributes, LectionInstance} from '../models/LectionModel';
import {isEmpty} from 'lodash';
import * as Express from 'express';
import {onlyGroup, USER_GROUP} from "../models/UserModel";

/**
 * Module exports.
 * @public
 * @class LectionController Класс-обработчик CRUD-запросов /courses/:course_id/lections
 */
export default class LectionController {

    /**
     * Получение всего списка лекций по определённому курсу
     *
     * @method getLections
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static getLections(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Lection.findAll({
            where: {
            	course_id: req.params.course_id
            }
        })
            .then(lections => {
				res.json({
					success: true,
					data: <LectionInstance[]>lections
				})
			})
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Получение лекции определённого курса по id
     *
     * @method getLectionById
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static getLectionById(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Lection.findById(req.params.lection_id, {
            where: {
                course_id: req.params.course_id
            }
        })
            .then(lection => {
				res.json({
					success: true,
					data: <LectionInstance>lection
				})
			})
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Создание лекции в определённом курсе
     *
     * @method createLection
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
	@onlyGroup(USER_GROUP.TEACHER)
    static createLection(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Course.findById(req.params.course_id)
            .then(course => {
				db.Lection.create(<LectionAttributes>req.body)
					.then(lection => {
						lection.setCourse(course.id);
						(process.env.NODE_ENV === 'test') ? res.json({ success: true, data: lection }) : res.json({ success: true })
					})
					.catch(err => res.json({
						success: false,
						message: err.message
					}))
            })
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Обновление лекции
     *
     * @method updateLection
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
	@onlyGroup(USER_GROUP.TEACHER)
    static updateLection(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

		db.Lection.update(req.body, {where: { id: req.params.lection_id }, individualHooks: true })
			.then(() => res.json({ success: true }))
			.catch(err => res.json({
						success: false,
						message: err.message
					}))
    }

    /**
     * Удаление лекции
     *
     * @method deleteLection
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
	@onlyGroup(USER_GROUP.TEACHER)
    static deleteLection(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

		db.Lection.destroy({where: { id: req.params.lection_id }, individualHooks: true })
			.then(() => res.json({ success: true }))
			.catch(err => res.json({
						success: false,
						message: err.message
					}))
    }
}