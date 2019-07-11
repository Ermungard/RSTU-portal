/**
 * Created by vasilio on 28.10.16.
 */

import {CourseAttributes} from '../models/CourseModel';
import * as test from 'tape';
import * as request from 'supertest';
import app from '../server';
import {userToken} from './TestUser';
import * as path from 'path';
import * as Request from 'request';
import * as os from 'os';
import * as fs from 'fs';
import * as crypto from 'crypto';

let Courses = [];

export default function testCourse() {
	return new Promise((resolve, reject) => {
		for (let i = 0; i < 2; i++)
			test('POST /api/v1/courses', t => {
				var tmpImagePath = path.resolve(os.tmpdir(), `random${crypto.randomBytes(64).toString('hex')}.jpg`);
				Request.get('https://unsplash.it/200').pipe(fs.createWriteStream(tmpImagePath));

				request(app)
					.post('/api/v1/courses')
					.field('title', `Course${i}`)
					.field('description', `manymanywords${i}`)
					.attach('courseImage', tmpImagePath)
					.set('token', userToken)
					// .send(<CourseAttributes>{
					// 	title: `Course${i}`,
					// 	description: `manymanywords${i}`,
					// 	image: `cat.jpg`
					// })
					.expect(200)
					.expect('Content-Type', 'application/json; charset=utf-8')

					.end((err, res) => {
						let actualCourse = res.body;
						Courses.push(actualCourse.data);
						t.ok(actualCourse.success, 'Status is success');
						t.error(err, 'No error');
						fs.unlink(tmpImagePath);
						t.end();
					})
			});

		test('GET api/v1/courses', t => {
			request(app)
				.get('/api/v1/courses')
				.set('token', userToken)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)

				.end((err, res) => {
					let actualCourses = res.body;
					t.error(err, 'No error');
					t.ok(actualCourses.success, 'Status is success');
					t.same(actualCourses.data, Courses, 'Select all Courses');
					t.end()
				})
		});

		test('GET /api/v1/courses/1', t => {
			request(app)
				.get('/api/v1/courses/1')
				.set('token', userToken)
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')

				.end((err, res) => {
					let actualCourse = res.body;
					t.error(err, 'No error');
					t.ok(actualCourse.success, 'Status is success');
					t.same(actualCourse.data, Courses[0], 'Select Course where id=1');
					t.end()
				})
		});

		test('PUT /api/v1/courses/1', t => {
			request(app)
				.put('/api/v1/courses/1')
				.set('token', userToken)
				.send({ title: 'updatedCourse1' })
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')

				.end((err, res) => {
					let actualBool = res.body.success;
					t.error(err, 'No error');
					t.same(actualBool, true, 'Update course where id=1');
					t.end()
				})
		});

		test('DELETE /api/v1/courses/2', t => {
			request(app)
				.delete('/api/v1/courses/2')
				.set('token', userToken)
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')

				.end((err, res) => {
					let actualBool = res.body.success;
					t.error(err, 'No error');
					t.same(actualBool, true, 'Delete course where id=2');
					t.end()
				})
		});

		test('Course test end', t => {
			resolve('Course test complete');
			t.end()
		})
	})
}