import * as Express from 'express';
import * as path from 'path';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
// import * as session from 'express-session';
import * as cors from 'cors';
import * as nodemailer from 'nodemailer';
import router from './routes';

let app: Express.Application = Express(),
    port: number = process.env['PORT'] || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

app.options('*', cors()); // TODO: enable pre-flight across-the-board
app.use(Express.static(path.join(__dirname, 'public')));
app.use('/api/v1', router);
// app.use(session({ secret: 'sessionsecretkey', cookie: { maxAge: 86400 }}));

app.set('apisecret', require('./config/config.json').secret);

// res.render ищет представления по установленному пути
// app.set('views', path.join(__dirname, '../client/views'));
// используемый шаблонизатор
// app.set('view engine', 'jade');

export let server = app.listen(port, () => {
   let port = server.address().port;

   console.log(`This express app is listening on port:${port}`);
});
export let transporter = nodemailer.createTransport(require('./config/config.json').smtpConfig);
export default app;