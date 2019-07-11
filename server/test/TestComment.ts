/**
 * Created by vasilio on 28.10.16.
 */

import {CommentAttributes} from '../models/CommentModel';
import * as test from 'tape';
import * as request from 'supertest';
import app from '../server';
import {userToken} from './TestUser';

let Comments = [];

export default function Comment() {
	return new Promise ((resolve, reject) => {
		for (let i = 0; i < 2; i++)
			test('POST /api/v1/courses/1/lections/1/comments', t => {
				request(app)
					.post('/api/v1/courses/1/lections/1/comments')
					.set('Content-Type', 'application/json')
					.set('token', userToken)
					.send(<CommentAttributes>{ message: `comment${i}` })
					.expect(200)
					.expect('Content-Type', 'application/json; charset=utf-8')

					.end((err, res) => {
						let actualComment = res.body;
						Comments.push(actualComment.data);
						t.ok(actualComment.success, 'Status is success');
						t.error(err, 'No error');
						t.end()
					})
			});

		test('GET /api/v1/courses/1/lections/1/comments', t => {
			setTimeout(
				() => {
					request(app)
						.get('/api/v1/courses/1/lections/1/comments')
						.set('token', userToken)
						.expect('Content-Type', 'application/json; charset=utf-8')
						.expect(200)

						.end((err, res) => {
							let actualComments = res.body;
							t.error(err, 'No error');
							t.ok(actualComments.success, 'Status is success');
							t.same(actualComments.data, Comments, 'Select all Comments');
							t.end()
						})
				}, 100)
		});

		test('GET /api/v1/courses/1/lections/1/comments/1', t => {
			request(app)
				.get('/api/v1/courses/1/lections/1/comments/1')
				.set('token', userToken)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)

				.end((err, res) => {
					let actualComment = res.body;
					t.error(err, 'No error');
					t.ok(actualComment.success, 'Status is success');
					t.same(actualComment.data, Comments[0], 'Select comment where id=1');
					t.end()
				})
		});

		test('PUT /api/v1/courses/1/lections/1/comments/1', t => {
			request(app)
				.put('/api/v1/courses/1/lections/1/comments/1')
				.set('token', userToken)
				.send({ message: 'updatedComment1' })
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)

				.end((err, res) => {
					let actualBool = res.body.success;
					t.error(err, 'No error');
					t.same(actualBool, true, 'Update comment where id=1');
					t.end()
				})
		});

		test('Delete /api/v1/courses/1/lections/1/comments/2', t => {
			request(app)
				.delete('/api/v1/courses/1/lections/1/comments/2')
				.set('token', userToken)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)

				.end((err, res) => {
					let actualBool = res.body.success;
					t.error(err, 'No error');
					t.same(actualBool, true, 'Delete comment where id=2');
					t.end()
				})
		});

		test('Comment test end', t => {
			resolve('Comment test complete');
			t.end()
		})
	})
}