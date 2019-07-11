/**
 * Created by vasilio on 28.10.16.
 */

import {BookAttributes} from '../models/BookModel';
import * as test from 'tape';
import * as request from 'supertest';
import app from '../server';
import {userToken} from './TestUser';

let Books = [];

export default function testBook() {
	return new Promise((resolve, reject) => {
		for (let i=0; i < 2; i++)
			test('POST /api/v1/books', t => {
				request(app)
					.post('/api/v1/books')
					.set('Content-Type', 'application/json')
					.set('token', userToken)
					.send(<BookAttributes>{ filename: `definedBook${i}` })
					.expect(200)
					.expect('Content-Type', 'application/json; charset=utf-8')

					.end((err, res) => {
						let actualBook = res.body;
						Books.push(actualBook.data);
						t.ok(actualBook.success, 'Status is success');
						t.error(err, 'No error');
						t.end()
					})
			});

		test('GET /api/v1/books', t => {
			request(app)
				.get('/api/v1/books')
				.set('token', userToken)
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')

				.end((err, res) => {
					let actualBooks = res.body;
					t.error(err, 'No error');
					t.ok(actualBooks.success, 'Status is success');
					t.same(actualBooks.data, Books, 'Select all Books');
					t.end()
				})
		});

		test('GET /api/v1/books/1', t => {
			request(app)
				.get('/api/v1/books/1')
				.set('token', userToken)
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')

				.end((err, res) => {
					let actualBook = res.body;
					t.error(err, 'No error');
					t.ok(actualBook.success, 'Status is success');
					t.same(actualBook.data, Books[0], 'Select book where id=1');
					t.end()
				})
		});

		test('PUT /api/v1/books/1', t => {
			request(app)
				.put('/api/v1/books/1')
				.set('token', userToken)
				.send({ filename: 'updateBook1' })
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')

				.end((err, res) => {
					let actualBool = res.body.success;
					t.error(err, 'No error');
					t.same(actualBool, true, 'Update book where id=1');
					t.end()
				})
		});

		test('DELETE /api/v1/books/2', t => {
			request(app)
				.delete('/api/v1/books/2')
				.set('token', userToken)
				.expect(200)
				.expect('Content-Type', 'application/json; charset=utf-8')

				.end((err, res) => {
					let actualBool = res.body.success;
					t.error(err, 'No error');
					t.same(actualBool, true, 'Delete book where id=2');
					t.end()
				})
		});

		test('Book test end', t => {
			resolve('Book test complete.');
			t.end()
		})
	})
}