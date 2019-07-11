/**
 * Created by vasilio on 30.10.16.
 */

import {GuidelineAttributes} from '../models/GuidelineModel';
import * as test from 'tape';
import * as request from 'supertest';
import app from '../server';
import {userToken} from './TestUser';

let Guidelines = [];

export default function Guideline() {
	return new Promise ((resolve, reject) => {
		for (let i = 0; i < 2; i++)
			test('POST /api/v1/courses/1/lections/1/guidelines', t => {
				request(app)
					.post('/api/v1/courses/1/lections/1/guidelines')
					.set('Content-Type', 'application/json')
					.set('token', userToken)
					.send(<GuidelineAttributes>{ title: `guidelineTitle${i}` })
					.expect(200)
					.expect('Content-Type', 'application/json; charset=utf-8')

					.end((err, res) => {
						let actualGuideline = res.body;
						Guidelines.push(actualGuideline.data);
						t.ok(actualGuideline.success, 'Status is success');
						t.error(err, 'No error');
						t.end()
					})
			});

		test('GET /api/v1/courses/1/lections/1/guidelines', t => {
			setTimeout(
				() => {
					request(app)
						.get('/api/v1/courses/1/lections/1/guidelines')
						.set('token', userToken)
						.expect('Content-Type', 'application/json; charset=utf-8')
						.expect(200)

						.end((err, res) => {
							let actualGuidelines = res.body;
							t.error(err, 'No error');
							t.ok(actualGuidelines.success, 'Status is success');
							t.same(actualGuidelines.data, Guidelines, 'Select all Guidelines');
							t.end()
						})
				}, 100)
		});

		test('GET /api/v1/courses/1/lections/1/guidelines/1', t => {
			request(app)
				.get('/api/v1/courses/1/lections/1/guidelines/1')
				.set('token', userToken)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)

				.end((err, res) => {
					let actualGuideline = res.body;
					t.error(err, 'No error');
					t.ok(actualGuideline.success, 'Status is success');
					t.same(actualGuideline.data, Guidelines[0], 'Select guideline where id=1');
					t.end()
				})
		});

		test('PUT /api/v1/courses/1/lections/1/guidelines/1', t => {
			request(app)
				.put('/api/v1/courses/1/lections/1/guidelines/1')
				.set('token', userToken)
				.send({ title: 'updatedGuideline1' })
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)

				.end((err, res) => {
					let actualBool = res.body.success;
					t.error(err, 'No error');
					t.same(actualBool, true, 'Update guideline where id=1');
					t.end()
				})
		});

		test('Delete /api/v1/courses/1/lections/1/guidelines/2', t => {
			request(app)
				.delete('/api/v1/courses/1/lections/1/guidelines/2')
				.set('token', userToken)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)

				.end((err, res) => {
					let actualBool = res.body.success;
					t.error(err, 'No error');
					t.same(actualBool, true, 'Delete guideline where id=2');
					t.end()
				})
		});

		test('Guidelines test end', t => {
			resolve('Guidelines test complete');
			t.end()
		})
	})
}