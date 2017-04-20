/*
Signs a user, out or register a new user. Notice this method of authentication is not safe at all and
is here primarily for illustrative pruposes.
*/

//Attempts to sign in user and return a promise
Authentication.signIn = function (formData) {
    var self = this;

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
        self.username = data.username;
        self.scopes = data.scopes;

        window.Controls.signInButton.addClass('hidden');
        window.Controls.signOutButton.removeClass('hidden');
        window.Controls.registerButton.addClass('hidden');
    });
};

//Attempts to sign out user, always clear stored data and returns a promise
Authentication.signOut = function (formData) {
    var self = this;

    return jQuery.ajax({
        url: '//api.propertyagent.local/auth/signout/',
        method: 'POST',
        dataType: 'text'
    })
    .always(function (data) {
        self.username = undefined;
        self.scopes = undefined;

        window.Controls.signInButton.removeClass('hidden');
        window.Controls.signOutButton.addClass('hidden');
        window.Controls.registerButton.removeClass('hidden');
    });
};

//Attempts to register a new user and returns a promise
Authentication.register = function (formData) {
    var self = this;

    return jQuery.ajax({
        url: '//api.propertyagent.local/users/',
        data: formData,
        method: 'POST',
        dataType: 'text',
        contentType: 'application/x-www-form-urlencoded'
    });
};

Authentication.hasScopes = function (scopes) {
    var query = jQuery.param(scopes);

    return jQuery.ajax({
        url: '//api.propertyagent.local/auth/scopes/',
        data: query,
        method: 'POST',
        dataType: 'json',
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