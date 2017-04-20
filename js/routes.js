(function ($) {
    window.$content = $('#content');
    var $content = window.$content;

    window.Router = new Navigo(null, false, '#!');

    window.Controls = {
        signInButton: $('#sign-in-button'),
        signOutButton: $('#sign-out-button'),
        registerButton: $('#register-button')
    };

    Authentication
    .verified()
    .then(function () {
        window.Controls.signInButton.addClass('hidden');
        window.Controls.signOutButton.removeClass('hidden');
        window.Controls.registerButton.addClass('hidden');
    });

    window.Controls.signOutButton.on('click', function () {
        Authentication.signOut();
    });

    $(document).on('click', '[data-navigate]', function (e) {
        e.preventDefault();
        var href = e.target.getAttribute('href');

        if (href) {
            window.Router.navigate(href);
        }

        return false;
    });

    window.Router
    .on(function () {
        document.title = 'Home';

        $content.load('/partials/dashboard/home.html');
    })
    //Sign in route
    .on('/signin', function () {
        document.title = 'Sign in';

        $content.load('/partials/dashboard/signin.html', function () {
            Dashboard.signin();
        });
    })
    //Register new user route
    .on('/register', function () {
        document.title = 'Register';

        $content.load('/partials/dashboard/register.html', function () {
            Dashboard.register();
        });
    })
    //Fetch all properties
    .on('/properties', function () {
        document.title = 'Properties';

        $content.load('/partials/properties/list.html', function () {
            Authentication
            .hasScopes({
                realtor: true,
                admin: true,
                superadmin: true
            })
            .done(function (data, reason, xhr) {
                Properties.list(true);
            })
            .fail(function (xhr) {
                if (xhr.status === 403) {
                    Properties.list(false);
                } else {
                    window.Router.navigate('/');
                }
            });
        });
    })
    //Create a property
    .on('/properties/create', function () {
        document.title = 'Create new property';

        $content.load('/partials/properties/create.html', function () {
            Properties.create();
        });
    })
    //Create a property
    .on(/properties\/update\/(\d+)?/, function (id) {
        document.title = 'Update property';

        $content.load('/partials/properties/update.html', function () {
            Properties.update(id);
        });
    })
    //Fetch a single property by id
    .on(/properties\/(\d+)?/, function (id) {
        document.title = 'Property';

        $content.load('/partials/properties/single.html', function () {
            Properties.single(id);
        });
    })
    .resolve();
})(jQuery);