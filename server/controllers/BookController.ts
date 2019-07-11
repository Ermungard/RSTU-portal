import db from '../models';
import {isEmpty} from 'lodash';
import {BookAttributes, BookInstance} from '../models/BookModel';
import * as Express from 'express';
import {onlyGroup, USER_GROUP} from "../models/UserModel";

/**
 * Module exports.
 * @public
 * @class BookController Класс-обработчик CRUD-запросов /books
 */
export default class BookController {

    /**
     * Получение всего списка книг
     *
     * @method getBooks
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     * @memberof BookController
     */
    static getBooks(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

    db.Book.findAll()
        .then(books => {
			res.json({
				success: true,
				data: <BookInstance[]>books
			})
		})
        .catch(err => res.json({
			success: false,
			message: err.message
		}))
    }

    /**
     * Получение книги по id
     *
     * @method getBookById
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     * @memberof BookController
     */
    static getBookById(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Book.findById(req.params.book_id)
            .then(book => {
				res.json({
					success: true,
					data: <BookInstance>(book)
				})
			})
			.catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Создание книги
     *
     * @method createBook
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     * @memberof BookController
     */
	@onlyGroup(USER_GROUP.TEACHER)
    static createBook(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.Book.create(<BookAttributes>req.body)
            .then(book => {
                (process.env.NODE_ENV === 'test') ? res.json({ success: true, data: book }) : res.json({ success: true })
            })
            .catch(err => res.json({
				success: false,
				message: err.message
			}))
    }

    /**
     * Обновление книги
     *
     * @method updateBook
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     * @memberof BookController
     */
	@onlyGroup(USER_GROUP.TEACHER)
    static updateBook(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

		db.Book.update(req.body, {where: { id: req.params.book_id }, individualHooks: true })
			.then(() => res.json({ success: true }))
			.catch(err => res.json({
						success: false,
						message: err.message
					}))
    }

    /**
     * Удаление книги
     *
     * @method deleteBook
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     * @memberof BookController
     */
	@onlyGroup(USER_GROUP.TEACHER)
    static deleteBook(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

		db.Book.destroy({where: { id: req.params.book_id }, individualHooks: true })
			.then(() => res.json({ success: true }))
			.catch(err => res.json({
						success: false,
						message: err.message
					}));
    }
}