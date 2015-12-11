Router.route('/login', function () {
    this.render('Login');
    this.layout("");
});
Router.route('/', function () {
    this.render('Kaart');
});
Router.route('/spot', function () {
    this.render('Spot');
});
Router.route('/informatie', function () {
    this.render('Informatie');
});
Router.route('/kaart', function () {
    this.render('Kaart');
});
Router.route('/over', function () {
    this.render('Over');
});
Router.route('/uitloggen', function () {
    this.render('Uitloggen');
});

Router.configure({
    layoutTemplate: 'Layout'
});