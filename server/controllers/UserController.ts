import db from '../models';
import {UserAttributes, UserInstance, USER_GROUP, onlyGroup} from "../models/UserModel";
import {isEmpty} from 'lodash';
import * as Express from 'express';
import * as process from 'process';
import app, {transporter} from '../server';
import * as jwt from 'jsonwebtoken';

/**
 * Module exports.
 * @public
 * @class UserController Класс-посредник CRUD-запросов /users
 */
// TODO: разобрать привилегии для каждого запроса (user_group)
export default class UserController {

    static authUser(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.User.findOne({ where: { login: req.body.login }, attributes: ['login', 'name', 'email', 'user_group', 'password']})
            .then(user => {
                user.verifyPassword(req.body.password)
                    .then(same => {
                        if (same) {
                            let token: string = jwt.sign(user.toJSON(), app.get('apisecret'), { expiresIn: '24h' });
                            res.json({
                                success: true,
                                token: token
                            });
                        } else res.json({
                            success: false,
                            message: 'Authentication failed. Wrong password.'
                        })
                    })
                    .catch(err => res.json({
                        success: false,
                        message: err.message
                    }));
            })
            .catch(err => res.json({
                success: false,
                message: err.message
            }))
    }

    // TODO: сделать норм страницу для майла с норм ссылкой
    static forgotPassword(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.User.findOne({ where: { email: req.body.email }})
            .then(user => {
                let resetToken: string = require('crypto').randomBytes(64).toString('hex'),
                    mailOptions = {
                        from: '"РГУПС портал" <rgups.portal.bot@gmail.com>',
                        to: req.body.email,
                        subject: `Reset your password, ${user.login}`,
                        html: `<div>For reset password just click <a href=http://127.0.0.1:3000/api/v1/users/reset/${resetToken}>here</a></div>`,
                    };

                transporter.sendMail(mailOptions)
                    .then(() => {
                        db.User.update(<UserInstance>{ resetPasswordToken: resetToken }, {where: { email: req.body.email }, individualHooks: true })
                            .then(() => res.json({ success: true }))
                            .catch(err => res.json({
                                success: false,
                                message: err.message
                            }));
                    })
                    .catch(err => res.json({
                        success: false,
                        message: err
                    }));
            })
            .catch(err => res.json({
                success: false,
                message: err.message
            }));
    }

    static confirmResetPasswordToken(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.User.findOne({ where: { resetPasswordToken: req.params.reset_token }})
            .then(() => res.json({ success: true, confirmResetPasswordToken: req.params.reset_token }))
            .catch(err => res.json({
                success: false,
                message: err.message
            }));
    }

    static resetPassword(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        if (req.body.password !== req.body.confirm)
            res.json({ success: false, message: 'Error. Passwords do not match.' });

		db.User.update(<UserInstance>{ password: req.body.password, resetPasswordToken: null }, {where: { resetPasswordToken: req.params.reset_token }, individualHooks: true})
            .then(() => res.json({ success: true }))
            .catch(err => res.json({
                success: false,
                message: err.message
            }));
    }

    /**
     * Получение всего списка пользователей
     *
     * @method getUsers
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static getUsers(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.User.findAll()
            .then(users => {
                res.json({
                    success: true,
                    data: <UserInstance[]>users
                })
            })
            .catch(err => res.json({
                success: false,
                message: err.message
            }))
    }

    /**
     * Получение пользователя по id
     *
     * @method getUserById
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static getUserById(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.User.findById(req.params.user_id)
            .then(user => {
                res.json({
                    success: true,
                    data: <UserInstance>user
                })
            })
            .catch(err => res.json({
                success: false,
                message: err.message
            }))
    }

    /**
     * Создание пользователя
     *
     * @method createUser
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    @onlyGroup(USER_GROUP.ADMIN)
    static createUser(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

            db.User.create(<UserAttributes>req.body)
                .then(user => {
                    (process.env.NODE_ENV === 'test') ? res.json({ success: true, data: user }) : res.json({ success: true })
                })
                .catch(err => res.json({
                    success: false,
                    message: err.message
                }))
    }

    /**
     * Обновление пользователя
     *
     * @method updateUser
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    static updateUser(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.User.update(req.body, {where: { id: req.params.user_id }, individualHooks: true})
            .then(() => res.json({ success: true }))
            .catch(err => res.json({
                        success: false,
                        message: err.message
                    }));
    }

    /**
     * Удаление пользователя
     *
     * @method deleteUser
     *
     * @param {Express.Request} req Объект http-запроса
     * @param {Express.Response} res Объект http-ответа
     * @param {Express.NextFunction} next Функция промежуточной обработки
     * @static
     */
    @onlyGroup(USER_GROUP.ADMIN)
    static deleteUser(req: Express.Request, res: Express.Response, next: Express.NextFunction) {

        db.User.destroy({where: { id: req.params.user_id }, individualHooks: true })
            .then(() => res.json({ success: true }))
            .catch(err => res.json({
                    success: false,
                    message: err.message
                }))
    }
}