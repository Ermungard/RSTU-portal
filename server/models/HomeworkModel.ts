import * as Sequelize from 'sequelize';
import {UserInstance, UserModel} from "./UserModel";
import {LectionInstance, LectionModel} from "./LectionModel";

export interface HomeworkAttributes {
    file: string;
    comment: string;
    git_link: string;
}
export interface HomeworkInstance extends Sequelize.Instance<HomeworkAttributes>, HomeworkAttributes {
    getUser(): Promise<UserInstance>;
    setUser(userName: string);
    getLection(): Promise<LectionInstance>;
    setLection(lectionId: number);
}
export interface HomeworkModel extends Sequelize.Model<HomeworkInstance, HomeworkAttributes> {}

// TODO: file validate
/**
 * Определение модели домашних заданий
 *
 * @export
 * @param {Sequelize.Sequelize} sequelize Экземпляр класса Sequelize
 * @param {Sequelize.DataTypes} DataTypes Словарь, который содержит все доступные типы данных
 * @returns {HomeworkModel} Homework Модель домашних заданий
 */
export default function defineHomework(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): HomeworkModel {

    let User = <UserModel>sequelize.import('UserModel'),
        Lection = <LectionModel>sequelize.import('LectionModel'),
        Homework = sequelize.define<HomeworkInstance, HomeworkAttributes>('Homework', {
        file: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        comment: {
            type: DataTypes.STRING,
            validate: { notEmpty: true }
        },
        git_link: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                isUrl: true
            }
        }
        }, {
            hooks: {
                beforeFind: function (options) {
                    if ((!options.hasOwnProperty('attributes')) && (process.env.NODE_ENV !== 'test')) {
                        options['attributes'] = ['id', 'file', 'comment', 'git_link']
                    }
                    return options
                }
            }
        });

    Homework.belongsTo(User, {foreignKey: 'user_login', targetKey: 'login'});
    Homework.belongsTo(Lection, {foreignKey: 'lection_id', targetKey: 'id'});

    return Homework;
}