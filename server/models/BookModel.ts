import * as Sequelize from 'sequelize';

export interface BookAttributes {
    filename: string;
}
export interface BookInstance extends Sequelize.Instance<BookAttributes>, BookAttributes {}
export interface BookModel extends Sequelize.Model<BookInstance, BookAttributes> {}

/**
 * Определение моделей книг
 * 
 * @export
 * @param {Sequelize.Sequelize} sequelize Экземпляр класса Sequelize
 * @param {Sequelize.DataTypes} DataTypes Словарь, который содержит все доступные типы данных
 * @returns {BookModel} Модель книг
 */
export default function defineBook(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): BookModel {

    let Book = sequelize.define<BookInstance, BookAttributes>('Book', {
        filename: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { notEmpty: true  }
        }
    }, {
        hooks: {
            beforeFind: function (options) {
                if ((!options.hasOwnProperty('attributes')) && (process.env.NODE_ENV !== 'test')) {
                    options['attributes'] = ['id', 'filename']
                }
                return options
            }
        }
    });

    return Book;
}