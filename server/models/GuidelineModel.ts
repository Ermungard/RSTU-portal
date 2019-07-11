import * as Sequelize from 'sequelize';
import {LectionInstance, LectionModel} from "./LectionModel";

export interface GuidelineAttributes {
    title: string;
}
export interface GuidelineInstance extends Sequelize.Instance<GuidelineAttributes>, GuidelineAttributes {
    getLection(): Promise<LectionInstance>;
    setLection(lectionId: number);
}
export interface GuidelineModel extends Sequelize.Model<GuidelineInstance, GuidelineAttributes> {}

/**
 * Определение модели прогресса лекций
 *
 * @export
 * @param {Sequelize.Sequelize} sequelize Экземпляр класса Sequelize
 * @param {Sequelize.DataTypes} DataTypes Словарь, который содержит все доступные типы данных
 * @returns {GuidelineModel} Модель прогресса лекций
 */
export default function defineGuideline(sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): GuidelineModel {

    let Lection = <LectionModel>sequelize.import('LectionModel'),
        Guideline = sequelize.define<GuidelineInstance, GuidelineAttributes>('Guideline', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notEmpty: true }
        }
        }, {
            hooks: {
                beforeFind: function (options) {
                    if ((!options.hasOwnProperty('attributes')) && (process.env.NODE_ENV !== 'test')) {
                        options['attributes'] = ['id', 'title']
                    }
                    return options
                }
            }
        });

    Guideline.belongsTo(Lection, { foreignKey: 'lection_id', targetKey: 'id'});

    return Guideline;
}