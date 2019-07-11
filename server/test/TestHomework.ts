/**
 * Created by vasilio on 30.10.16.
 */

import {HomeworkAttributes} from '../models/HomeworkModel';
import * as test from 'tape';
import * as request from 'supertest';
import app from '../server';
import {userToken} from './TestUser';
import * as path from 'path';

let Homeworks = [];

export default function Homework() {
	return new Promise ((resolve, reject) => {
		for (let i = 0; i < 2; i++)
			test('POST /api/v1/courses/1/lections/1/homeworks', t => {
				request(app)
					.post('/api/v1/courses/1/lections/1/homeworks')
					.attach('studentDocument', path.resolve(__dirname, '../public/homeworks/testDoc.odt'))
					.field('comment', `homeComment${i}`)
					.field('git_link', `homeLink${i}.com`)
					.set('token', userToken)
					// .send(<HomeworkAttributes>{
					// 	file: `homeFile${i}`,
					// 	comment: `homeComment${i}`,
					// 	git_link: `homeLink${i}.com`
					// })
					.expect(200)
					.expect('Content-Type', 'application/json; charset=utf-8')

					.end((err, res) => {
						let actualHomework = res.body;
						Homeworks.push(actualHomework.data);
						t.ok(actualHomework.success, 'Status is success');
						t.error(err, 'No error');
						t.end()
					})
			});

		test('GET /api/v1/courses/1/lections/1/homeworks', t => {
			setTimeout(
				() => {
					request(app)
						.get('/api/v1/courses/1/lections/1/homeworks')
						.set('token', userToken)
						.expect('Content-Type', 'application/json; charset=utf-8')
						.expect(200)

						.end((err, res) => {
							let actualHomeworks = res.body;
							t.error(err, 'No error');
							t.ok(actualHomeworks.success, 'Status is success');
							t.same(actualHomeworks.data, Homeworks, 'Select all Homeworks');
							t.end()
						})
				}, 100)
		});

		test('GET /api/v1/courses/1/lections/1/homeworks/1', t => {
			request(app)
				.get('/api/v1/courses/1/lections/1/homeworks/1')
				.set('token', userToken)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)

				.end((err, res) => {
					let actualHomeworks = res.body;
					t.error(err, 'No error');
					t.ok(actualHomeworks.success, 'Status is success');
					t.same(actualHomeworks.data, Homeworks[0], 'Select homework where id=1');
					t.end()
				})
		});

		test('PUT /api/v1/courses/1/lections/1/homeworks/1', t => {
			request(app)
				.put('/api/v1/courses/1/lections/1/homeworks/1')
				.set('token', userToken)
				.send({ comment: 'updatedCommentHome1' })
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)

				.end((err, res) => {
					let actualBool = res.body.success;
					t.error(err, 'No error');
					t.same(actualBool, true, 'Update homework where id=1');
					t.end()
				})
		});

		test('Delete /api/v1/courses/1/lections/1/homeworks/2', t => {
			request(app)
				.delete('/api/v1/courses/1/lections/1/homeworks/2')
				.set('token', userToken)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)

				.end((err, res) => {
					let actualBool = res.body.success;
					t.error(err, 'No error');
					t.same(actualBool, true, 'Delete homework where id=2');
					t.end()
				})
		});

		test('Homeworks test end', t => {
			resolve('Homeworks test complete');
			t.end()
		})
	})
}