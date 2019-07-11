/**
 * Created by vasilio on 28.10.16.
 */

import {UserAttributes} from "../models/UserModel";
import * as test from 'tape';
import * as request from 'supertest';
import app from '../server';

let Users = [];
export let userToken = '';

export default function testUser() {
	return new Promise((resolve, reject) => {
		for (let i: number = 0; i < 3; i++)
			test('POST /api/v1/users', t => {
				request(app)
					.post('/api/v1/users')
					.set('Content-Type', 'application/json')
					.send(<UserAttributes>{
						name: `PetOne${i}`,
						login: `newLogin${i}`,
						password: `passwd${i}`,
						email: `mail${i}@rgups.ru`,
						user_group: i
					})
					.expect(200)
					.expect('Content-Type', 'application/json; charset=utf-8')

					.end((err, res) => {
						let actualUser = res.body;
						Users.push(actualUser.data);
						t.ok(actualUser.success, 'Status is success');
						t.error(err, 'No error');
						t.end()
					})
			});

		test('POST /api/v1/users/auth', t => {
			request(app)
				.post('/api/v1/users/auth')
				.send({ login: 'newLogin0', password: 'passwd0' })
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)

				.end((err, res) => {
					userToken = res.body.token;
					t.error(err, 'No error');
					t.ok(res.body.success, 'Status is success');
					t.ok(userToken, 'Token is not empty');
					t.end()
				})
		});

		test('GET /api/v1/users', t => {
			request(app)
				.get('/api/v1/users')
				.set('token', userToken)
				.expect('Content-Type', 'application/json; charset=utf-8')
				.expect(200)

				.end((err, res) => {
					let actualUsers = res.body;
					t.error(err, 'No error');
					t.ok(actualUsers.success, 'Status is success');
					t.same(actualUsers.data, Users, 'Select all Users');
					t.end()
				})
		});

		test('GET /api/v1/users/1', t => {
			request(app)
				.get('/api/v1/users/1')
				.set('token', userToken)
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')

				.end((err, res) => {
					let actualUser = res.body;
					t.error(err, 'No error');
					t.ok(actualUser.success, 'Status is success');
					t.same(actualUser.data, Users[0], 'Select user where id=1');
					t.end()
				})
		});

		test('PUT /api/v1/users/1', t => {
			request(app)
				.put('/api/v1/users/1')
				.set('token', userToken)
				.send({ name: 'updatedPet1' })
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')

				.end((err, res) => {
					let actualBool = res.body.success;
					t.error(err, 'No error');
					t.same(actualBool, true, 'Update user where id=1');
					t.end()
				})
		});

		test('DELETE /api/v1/users/2', t => {
			request(app)
				.delete('/api/v1/users/2')
				.set('token', userToken)
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')

				.end((err, res) => {
					let actualBool = res.body.success;
					t.error(err, 'No error');
					t.same(actualBool, true, 'Delete user where id=2');
					t.end()
				})
		});

		test('User test end', t => {
			resolve('User test is done!');
			t.end()
		});
	});
}