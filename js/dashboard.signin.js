Dashboard.signin = function () {
    var form = jQuery('#form');
    var self = this;

    form.on('submit', function (e) {
        e.preventDefault();

        if (Validator.validateForm(form)) {
            Authentication
            .signIn(form.serialize())
            .then(function () {
                window.Router.navigate('/');
            });
        }

        return false;
    });
};