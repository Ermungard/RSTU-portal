import * as Sequelize from 'sequelize';

export interface CourseAttributes {
    title: string;
    description: string;
    image: string;
}
export interface CourseInstance extends Sequelize.Instance<CourseAttributes>, CourseAttributes {
    id: number;
}
export interface CourseModel extends Sequelize.Model<CourseInstance, CourseAttributes> {}

// TODO: image проверка входящего файла
/**
 * Определение моделей курсов
 *
 * export
 * @param {Sequelize.Sequelize} sequelize Экземпляр класса Sequelize
 * @param {Sequelize.DataTypes} DataTypes Словарь, который содержит все доступные типы данных
 * @returns {CourseModel} Модель курсов
 */
export default function defineCourse(sequelize: Sequelize.Sequelize, DataTypes): CourseModel {
    let Course = sequelize.define<CourseInstance, CourseAttributes>('Course', {
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
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        }
    }, {
        hooks: {
            beforeFind: function (options) {
                if ((!options.hasOwnProperty('attributes')) && (process.env.NODE_ENV !== 'test')) {
                    options['attributes'] = ['id', 'title', 'description', 'image']
                }
                return options
            }
        }
    });

    return Course;
}