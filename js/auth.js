/*
Signs a user, out or register a new user. Notice this method of authentication is not safe at all and
is here primarily for illustrative pruposes.
*/
function Authentication() {
    this._user;
    this._role;
    this._verified = false;
}

Authentication.prototype = {
    //Attempts to sign in user and return a promise
    signIn: function (formData) {
        var self = this;

        return jQuery.ajax({
            url: '/app/signin',
            data: formData,
            method: 'POST',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded'
        })
        .then(function (data) {
            self._user = data.user;
            self._role = data.role;
            self._verified = true;
            console.log(data.role);
        });
    },

    //Attempts to sign out user, always clear stored data and returns a promise
    signOut: function (formData) {
        var self = this;

        return jQuery.ajax({
            url: '/app/signout',
            method: 'POST',
            dataType: 'text'
        })
        .always(function (data) {
            self._user = undefined;
            self._role = undefined;
            self._verified = false;
        });
    },

    //Attempts to register a new user and returns a promise
    register: function (formData) {
        var self = this;

        return jQuery.ajax({
            url: '/app/users',
            data: formData,
            method: 'POST',
            dataType: 'text',
            contentType: 'application/x-www-form-urlencoded'
        });
    },

    isVerified: function () {
        return this._verified;
    },

    hasRole: function (role) {
        return (typeof this._role !== 'undefined' && this._role === role && this.isVerified());
    }
};

var Auth = new Authentication();