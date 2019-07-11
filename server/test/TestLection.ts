/**
 * Created by vasilio on 28.10.16.
 */

import {LectionAttributes} from '../models/LectionModel';
import * as test from 'tape';
import * as request from 'supertest';
import app from '../server';
import {userToken} from './TestUser';

let Lections = [];

export default function testLection() {
	return new Promise((resolve, reject) => {
		for (let i = 0; i < 2; i++)
			test('POST /api/v1/courses/1/lections', t => {
				request(app)
					.post('/api/v1/courses/1/lections')
					.set('Content-Type', 'application/json')
					.set('token', userToken)
					.send(<LectionAttributes>{
						title: `lectionTitle${i}`,
						description: `lectionDesc${i}`
					})
					.expect(200)
					.expect('Content-Type', 'application/json; charset=utf-8')

					.end((err, res) => {
						let actualLection = res.body;
						Lections.push(actualLection.data);
						t.ok(actualLection.success, 'Status is success');
						t.error(err, 'No error');
						t.end()
					})
			});

		test('GET /api/v1/courses/1/lections', t => {
			setTimeout(
				() => {
					request(app)
						.get('/api/v1/courses/1/lections')
						.set('token', userToken)
						.expect(200)
						.expect('Content-Type', 'application/json; charset=utf-8')

						.end((err, res) => {
							let actualLections = res.body;
							t.ok(actualLections.success, 'Status is success');
							t.same(actualLections.data, Lections, 'Select all Lections');
							t.error(err, 'No errors');
							t.end()
						})
				}, 100)
		});

		test('GET /api/v1/courses/1/lections/1', t => {
			request(app)
				.get('/api/v1/courses/1/lections/1')
				.set('token', userToken)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)

				.end((err, res) => {
					let actualLection = res.body;
					t.error(err, 'No error');
					t.ok(actualLection.success, 'Status is success');
					t.same(actualLection.data, Lections[0], 'Select lection where id=1');
					t.end()
				})
		});

		test('PUT /api/v1/courses/1/lections/1', t => {
			request(app)
				.put('/api/v1/courses/1/lections/1')
				.set('token', userToken)
				.send({ title: 'updatedTitle1'} )
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')

				.end((err, res) => {
					let actualBool = res.body.success;
					t.error(err, 'No error');
					t.same(actualBool, true, 'Update lection where id=1');
					t.end()
				})
		});

		test('DELETE /api/v1/courses/1/lections/2', t => {
			request(app)
				.delete('/api/v1/courses/1/lections/2')
				.set('token', userToken)
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')

				.end((err, res) => {
					let actualBool = res.body.success;
					t.error(err, 'No error');
					t.same(actualBool, true, 'Delete lection where id=2');
					t.end()
				})
		});

		test('Lection test end', t => {
			resolve('Lection test complete.');
			t.end()
		})
	})
}