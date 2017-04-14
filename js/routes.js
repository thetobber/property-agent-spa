(function ($) {
    var content = $('#content');

    var Router = new Navigo(null, false, '#!');
    var Handlers = new RouteHandlers(
        Router,
        $('#signin-btn'),
        $('#signout-btn'),
        $('#register-btn')
    );

    Handlers.updateNavbarActive();

    Router
    //Root route aka. home
    .on(
        function () {
            content.load('/partials/home.html', function () {
                Handlers.loadHome();
            });
        },
        {
            after: function () { Handlers.updateNavbarActive(); }
        }
    )
    //Sign in route
    .on(
        '/signin',
        function () {
            content.load('/partials/signin.html', function () {
                Handlers.loadSignIn();
            });
        },
        {
            after: function () { Handlers.updateNavbarActive(); }
        }
    )
    //Register new user route
    .on(
        '/register',
        function () {
            content.load('/partials/register.html', function () {
                Handlers.loadRegister();
            });
        },
        {
            after: function () { Handlers.updateNavbarActive(); }
        }
    )
    //Fetch all users
    .on(
        '/users',
        function () {
            if (Auth.isVerified()) {
                content.load('/partials/user.html', function () {
                    Handlers.loadUsers();
                });
            } else {
                Router.navigate('/signin');
            }
        },
        {
            after: function () { Handlers.updateNavbarActive(); }
        }
    )
    //Fetch a single user by email
    .on(
        '/users/:id',
        function (params) {
            if (Auth.isVerified()) {
                content.load('/partials/user.html', function () {
                    Handlers.loadSingleUser(params.id);
                });
            } else {
                Router.navigate('/signin');
            }
        },
        {
            after: function () { Handlers.updateNavbarActive(); }
        }
    )
    //Fetch all properties
    .on(
        '/properties',
        function () {
            content.load('/partials/properties.html', function () {
                Handlers.loadProperties(Router);
            });
        },
        {
            after: function () { Handlers.updateNavbarActive(); }
        }
    )
    //Fetch a single property by id
    .on(
        '/properties/:id',
        function (params) {
            content.load('/partials/property.html', function () {
                Handlers.loadSingleProperty(params.id);
            });
        },
        {
            after: function () { Handlers.updateNavbarActive(); }
        }
    )
    .resolve();
})(jQuery);