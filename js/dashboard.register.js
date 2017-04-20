Dashboard.register = function () {
    var $form = jQuery('#form');
    var self = this;

    $form.on('submit', function (e) {
        e.preventDefault();

        if (Validator.validateForm($form)) {
            jQuery
            .ajax({
                url: '//api.propertyagent.local/users/',
                data: $form.serialize(),
                method: 'POST',
                dataType: 'text',
                contentType: 'application/x-www-form-urlencoded'
            })
            .done(function () {
                window.Router.navigate('/signin');
                Notifier.send('Registered!', 'You successfully registerd your account.');
            })
            .fail(function (xhr) {
                console.log(xhr);
            });
        }

        return false;
    });

    return 

};