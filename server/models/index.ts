import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import * as process from 'process';
import {UserModel} from './UserModel';
import {CourseModel} from './CourseModel';
import {LectionModel} from './LectionModel';
import {BookModel} from './BookModel';
import {CommentModel} from "./CommentModel";
import {GuidelineModel} from './GuidelineModel';
import {HomeworkModel} from './HomeworkModel';
import {isEmpty} from 'lodash';

const isTestEnv: boolean = process.env.NODE_ENV === 'test',
    dbConfig = (isTestEnv) ? require('../config/config.json').tests : require('../config/config.json').home,
    sequelize:Sequelize.Sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig),
    basename:string  = path.basename(module.filename),
    db = {};

// TODO: hook beforeFind in each model -> globalHook beforeFind
// TODO: при большом кол-ве глобальных опций имеет смысл переписать config.json на config.ts
sequelize.addHook('afterFind', function (options) {
    return new Promise((resolve, reject) => {
        (!isEmpty(options)) ? resolve() : reject(new Error('Error. Empty result.'))
    })
});
// sequelize.addHook('beforeFind', function (options) {
//     options.rejectOnEmpty = true;
// });

interface DbConnection {
    User: UserModel;
    Course: CourseModel;
    Lection: LectionModel;
    Book: BookModel;
    Comment: CommentModel;
    Guideline: GuidelineModel;
    Homework: HomeworkModel;
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        let model = sequelize['import'](path.join(__dirname, file));
        db[model['name']] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db['sequelize'] = sequelize;
db['Sequelize'] = Sequelize;

export default <DbConnection>db;