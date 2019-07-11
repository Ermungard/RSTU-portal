import * as Express from 'express';
import BookController from '../controllers/BookController';

const router: Express.Router = Express.Router();

router.route('/books')
    .all()
    .get(BookController.getBooks)
    .post(BookController.createBook);

router.route('/books/:book_id')
    .get(BookController.getBookById)
    .put(BookController.updateBook)
    .delete(BookController.deleteBook);

export default router;