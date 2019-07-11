import * as Sequelize from 'sequelize';
import * as bcrypt from 'bcrypt';
import * as Express from 'express';

export const USER_GROUP = {
    ADMIN: 0,
    TEACHER: 1,
    STUDENT: 2
};
// decorator
export function onlyGroup(userGroup: number) {

    return function(target: Function, key: string, descriptor: PropertyDescriptor) {

        let originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            let req: Express.Request = args[0],
                res: Express.Response = args[1];

            if ((process.env.NODE_ENV === 'test') || (req['current_user'].user_group <= userGroup))
                return originalMethod.apply(this, args);
            else {
                res.json({ success: false, message: 'Insufficient privileges.'});
            }
        };

        return descriptor;
    }
}
export interface UserAttributes {
    name: string;
    login: string;
    password: string;
    email: string;
    user_group: number;
    resetPasswordToken: string;
}
export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
    verifyPassword(password: string): Promise<boolean>,
}
export interface UserModel extends Sequelize.Model<UserInstance, UserAttributes> {}

// TODO: email online confirmation
/**
 * Определение модели пользователей
 *
 * @export
 * @param {Sequelize.Sequelize} sequelize Экземпляр класса Sequelize
 * @param {Sequelize.DataTypes} DataTypes Словарь, который содержит все доступные типы данных
 * @returns {Model<UserInstance, UserAttributes>} User Модель пользователей
 */
export default function defineUser(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel {
    let User = sequelize.define<UserInstance, UserAttributes>('User', {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { notEmpty: true }
        },
        login: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { notEmpty: true }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { isEmail: true }
        },
        user_group: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { notEmpty: true, min: 0, max: 2 }
        },
        // TODO: forgot pass, reset pass
        resetPasswordToken: {
            type: DataTypes.STRING,
            defaultValue: null,
            validate: { notEmpty: true }
        }
    }, {
        instanceMethods: {
            verifyPassword: function (password: string): Promise<boolean> {
                return new Promise((resolve, reject) => {
                    bcrypt.compare(password, this.password, (err, same) => {
                        if (err) { reject(err) }
                        else resolve(same)
                    })
                })
            }
        },

        hooks: {
            beforeCreate: (user: UserInstance) => {
                return new Promise((resolve, reject) => {
                    bcrypt.hash(user.password, 10, (err, hash) => {
                        if (err) reject(err);
                        else {
                            user.password = hash;
                            resolve(hash)
                        }
                    })
                })
            },

            beforeUpdate: (user: UserInstance) => {
                if (user.password) {
                    return new Promise((resolve, reject) => {
                        bcrypt.hash(user.password, 10, (err, hash) => {
                            if (err) reject(err);
                            else {
                                user.password = hash;
                                resolve(hash)
                            }
                        })
                    })
                }
            },

            beforeFind: function (user: UserInstance) {
                if ((!user.hasOwnProperty('attributes')) && (process.env.NODE_ENV !== 'test')) {
                    user['attributes'] = ['id', 'login', 'name', 'email', 'user_group']
                }
                return user
            }
        }
    });

    return User;
}
