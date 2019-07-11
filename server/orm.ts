import db from  './models';

// console.log(db.User.toString());
db.User.sync({force: true}).then(() => {
    db.User.create({
        name: 'Vasiliy',
        login: 'Vasilio',
        password: 'admen',
        email: 'new_legacy@mail.ru',
        user_group: 0,
        resetPasswordToken: null
    }).then(user => {
        // console.log(user.toString());
        // user['$modelOptions']['rejectOnEmpty'] = true;
        // console.log(user['$modelOptions']['rejectOnEmpty']);
        db.Course.sync({force: true}).then(() => {
            db.Course.create({
                title: 'firstCourse',
                description: 'my Description',
                image: 'image.png'
            }).then(course => {
                console.log(course.get({plain:true}));
                db.Lection.sync({force: true}).then(() => {
                    db.Lection.create({
                        title: 'C# F#',
                        description: '123',
                        donate: false
                    }).then(lection => {
                        lection.setCourse(course.id);
                        // lection.getCourse().then(lcourse => console.log(lcourse.get({plain:true})));
                        console.log(lection.get({plain:true}));
                        db.Comment.sync({force: true}).then(() => {
                            db.Comment.create({
                                message: 'messagaaa',
                            }).then(comment => {
                                comment.setUser(user.login);
                                // comment.getUser().then(user => console.log(user));
                                comment.setLection(lection.id);
                                console.log(comment.get({plain:true}));
                                db.Guideline.sync({force: true}).then(() => {
                                    db.Guideline.create({
                                        title: 'titeluha',
                                    }).then(guideline => {
                                        guideline.setLection(lection.id);
                                        console.log(guideline.get({plain:true}));
                                        db.Homework.sync({force: true}).then(() => {
                                            db.Homework.create({
                                                file: 'filename',
                                                comment: 'commentWithFile',
                                                git_link: 'hilinka.com'
                                            }).then(homework => {
                                                homework.setUser(user.login);
                                                // homework.getUser().then(user => console.log(user));
                                                homework.setLection(lection.id);
                                                console.log(homework.get({plain:true}))
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
});

db.Book.sync({force: true}).then(() => {
    db.Book.create({
        filename: 'bookName'
    }).then(book => {
        console.log(book.get({plain:true}))
    })
});