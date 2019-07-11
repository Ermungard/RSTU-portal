import * as Sequelize from 'sequelize';
import {CourseModel, CourseInstance} from './CourseModel';

export interface LectionAttributes {
    title: string;
    description: string;
    donate?: boolean;
}
export interface LectionInstance extends Sequelize.Instance<LectionAttributes>, LectionAttributes {
    setCourse(courseId: number);
    getCourse(): Promise<CourseInstance>;

    id: number;
}
export interface LectionModel extends Sequelize.Model<LectionInstance, LectionAttributes> {}

/**
 * Определение модели лекций
 *
 * @export
 * @param {Sequelize.Sequelize} sequelize Экземпляр класса Sequelize
 * @param {Sequelize.DataTypes} DataTypes Словарь, который содержит все доступные типы данных
 * @returns {LectionModel} Модель лекций
 */
export default function defineLection(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): LectionModel {

    let Course = <CourseModel>sequelize.import('CourseModel'),
        Lection = sequelize.define<LectionInstance, LectionAttributes>('Lection', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        },
        donate: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
        }, {
            hooks: {
                beforeFind: function (options) {
                    if ((!options.hasOwnProperty('attributes')) && (process.env.NODE_ENV !== 'test')) {
                        options['attributes'] = ['id', 'title', 'description', 'donate']
                    }
                    return options
                }
            }
        });

    Lection.belongsTo(Course, {foreignKey: 'course_id', targetKey: 'id'});

    return Lection;
}