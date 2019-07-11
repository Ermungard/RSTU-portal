import * as Sequelize from 'sequelize';
import {UserInstance, UserModel} from "./UserModel";
import {LectionInstance, LectionModel} from "./LectionModel";

export interface CommentAttributes {
    message: string;
}
export interface CommentInstance extends Sequelize.Instance<CommentAttributes>, CommentAttributes {
    getUser(): Promise<UserInstance>;
    setUser(userName: string);
    getLection(): Promise<LectionInstance>;
    setLection(lectionId: number);
}
export interface CommentModel extends Sequelize.Model<CommentInstance, CommentAttributes> {}

/**
 * Определение модели комментариев
 *
 * @export
 * @param {Sequelize.Sequelize} sequelize Экземпляр класса Sequelize
 * @param {Sequelize.DataTypes} DataTypes Словарь, который содержит все доступные типы данных
 * @returns {CommentModel} Модель комментариев
 */
export default function defineComment(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): CommentModel {

    let User = <UserModel>sequelize.import('UserModel'),
        Lection = <LectionModel>sequelize.import('LectionModel'),
        Comment = sequelize.define<CommentInstance, CommentAttributes>('Comment', {
        message: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        }
        }, {
            hooks: {
                beforeFind: function (options) {
                    if ((!options.hasOwnProperty('attributes')) && (process.env.NODE_ENV !== 'test')) {
                        options['attributes'] = ['id', 'message']
                    }
                    return options
                }
            }
        });

    Comment.belongsTo(User, {foreignKey: 'user_login', targetKey: 'login'});
    Comment.belongsTo(Lection, {foreignKey: 'lection_id', targetKey: 'id'});

    return Comment;
}