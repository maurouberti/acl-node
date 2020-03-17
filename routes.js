module.exports = (app) => {
    app.use('/users', require('./main'));
    app.use('/admin', require('./admin'));
}
