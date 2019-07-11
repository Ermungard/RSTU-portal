/**
 * Created by vasilio on 27.10.16.
 */

import testUser from './TestUser';
import testBook from './TestBook';
import testCourse from './TestCourse';
import testLection from './TestLection';
import testComment from './TestComment';
import testGuideline from './TestGuideline';
import testHomework from './TestHomework';
import db from '../models';
import {server} from '../server'

db['sequelize'].sync({force: true})
	.then(() => {
		Promise.all([
			testUser(),
			testBook(),
			testCourse(),
			testLection(),
			testComment(),
			testGuideline(),
			// testHomework()
		]).then(() => {
			db['sequelize'].close();
			server.close();
		});
	});