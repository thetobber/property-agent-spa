/*
Signs a user, out or register a new user. Notice this method of authentication is not safe at all and
is here primarily for illustrative pruposes.
*/

//Attempts to sign in user and return a promise
Authentication.signIn = function (formData) {
    return jQuery.ajax({
        url: '//api.propertyagent.local/auth/signin/',
        data: formData,
        method: 'POST',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded',
        xhrFields: {
            withCredentials: true
        }
    })
    .then(function (data) {
        window.Controls.signInButton.addClass('hidden');
        window.Controls.signOutButton.removeClass('hidden');
        window.Controls.registerButton.addClass('hidden');
    });
};

//Attempts to sign out user, always clear stored data and returns a promise
Authentication.signOut = function () {
    return jQuery.ajax({
        url: '//api.propertyagent.local/auth/signout/',
        method: 'GET',
        dataType: 'text'
    })
    .always(function (data) {
        window.Controls.signInButton.removeClass('hidden');
        window.Controls.signOutButton.addClass('hidden');
        window.Controls.registerButton.removeClass('hidden');
        //window.location.href = '/';
    });
};

//Attempts to register a new user and returns a promise
Authentication.register = function (formData) {
    return jQuery.ajax({
        url: '//api.propertyagent.local/users/',
        data: formData,
        method: 'POST',
        dataType: 'text',
        contentType: 'application/x-www-form-urlencoded'
    });
};

Authentication.hasScopes = function (scopes) {
    return jQuery.ajax({
        url: '//api.propertyagent.local/auth/scopes/',
        data: jQuery.param(scopes),
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        xhrFields: {
            withCredentials: true
        }
    });
};

Authentication.verified = function () {
    return jQuery.ajax({
        url: '//api.propertyagent.local/auth/verified/',
        method: 'GET',
        dataType: 'text',
        xhrFields: {
            withCredentials: true
        }
    });
};