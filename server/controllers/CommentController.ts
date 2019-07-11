import db from '../models';
import {CommentAttributes, CommentInstance} from '../models/CommentModel';
import {isEmpty} from 'lodash';
import * as Express from 'express';

/**
 * Обработчик CRUD-запросов /api/v1/courses/{COURSE_ID}/lections/{LECTION_ID}/comments
 * 
 * @export
 * @class CommentController
 */
export default class CommentController {

    /**
     * Получение всего списка комментариев по определённой лекции
     *
     * @method getComments
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static getComments(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Comment.findAll({
            where: {
            	lection_id: req.params.lection_id
            }
        })
            .then(comments => {
				res.json({
					success: true,
					data: <CommentInstance[]>comments
				})
			})
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Получение комментариев определённой лекции по id
     *
     * @method getCommentById
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static getCommentById(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Comment.findById(req.params.comment_id, {
            where: {
                lection_id: req.params.lection_id
            }
        })
            .then(comment => {
				res.json({
					success: true,
					data: <CommentInstance>comment
				})
			})
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Создание комментария в определённой лекции
     *
     * @method createComment
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static createComment(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Lection.findById(req.params.lection_id)
            .then(lection => {
				db.Comment.create(<CommentAttributes>req.body)
					.then(comment => {
						comment.setLection(lection.id);
						comment.setUser(req['current_user'].login);
						(process.env.NODE_ENV === 'test') ? res.json({ success: true, data: comment }) : res.json({ success: true })
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
     * Обновление комментария
     *
     * @method updateComment
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static updateComment(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

		db.Comment.update(req.body, {where: { id: req.params.comment_id }, individualHooks: true })
			.then(() => res.json({ success: true }))
			.catch(err => res.json({
						success: false,
						message: err.message
					}))
    }

    /**
     * Удаление комментария
     *
     * @method deleteComment
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static deleteComment(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

		db.Comment.destroy({where: { id: req.params.comment_id }, individualHooks: true })
			.then(() => res.json({ success: true }))
			.catch(err => res.json({
						success: false,
						message: err.message
					}))
    }
}