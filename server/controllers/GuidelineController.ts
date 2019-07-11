import db from '../models';
import {isEmpty} from 'lodash';
import * as Express from 'express';
import {GuidelineAttributes, GuidelineInstance} from '../models/GuidelineModel';

/**
 * Module exports.
 * @public
 * @class GuidelineController Класс-обработчик CRUD-запросов /courses/:course_id/lections/:lection_id/guidelines
 */
export default class GuidelineController {

    /**
     * Получение всего списка прогресса лекций
     *
     * @method getGuidelines
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static getGuidelines(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Guideline.findAll({
            where: {
            	lection_id: req.params.lection_id
            }
        })
            .then(guidelines => {
				res.json({
					success: true,
					data:<GuidelineInstance[]>guidelines
				})
			})
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Получение прогресса лекций определённой лекции по id
     *
     * @method getGuidelineById
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static getGuidelineById(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Guideline.findById(req.params.guideline_id, {
            where: {
                lection_id: req.params.lection_id
            }
        })
            .then(guideline => {
				res.json({
					success: true,
					data:<GuidelineInstance>guideline
				})
			})
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Создание прогресса лекций определённой лекции
     *
     * @method createGuideline
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static createGuideline(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Lection.findById(req.params.lection_id)
            .then(lection => {
				db.Guideline.create(<GuidelineAttributes>req.body)
					.then(guideline => {
						guideline.setLection(lection.id);
						(process.env.NODE_ENV === 'test') ?  res.json({ success: true, data: guideline }) : res.json({ success: true })
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
     * Обновление прогресса лекций
     *
     * @method updateGuideline
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static updateGuideline(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

		db.Guideline.update(req.body, {where: { id: req.params.guideline_id }, individualHooks: true })
			.then(() => res.json({ success: true }))
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Удаление прогресса лекций
     *
     * @method deleteGuideline
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static deleteGuideline(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

		db.Guideline.destroy({where: { id: req.params.guideline_id }, individualHooks: true })
			.then(() => res.json({ success: true }))
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }
}
