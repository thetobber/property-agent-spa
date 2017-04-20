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
        $content.load('/partials/dashboard/home.html');
    })
    //Sign in route
    .on('/signin', function () {
        $content.load('/partials/dashboard/signin.html', function () {
            Dashboard.signin();
        });
    })
    //Register new user route
    .on('/register', function () {
        $content.load('/partials/dashboard/register.html');
    })
    //Fetch all users
    .on('/users', function () {
        $content.load('/partials/users/list.html');
    })
    //Fetch a single user by email
    .on('/users/:id', function (params) {
        $content.load('/partials/users/single.html');
    })
    //Fetch all properties
    .on('/properties', function () {
        $content.load('/partials/properties/list.html', function () {
            Properties.list();
        });
    })
    //Create a property
    .on('/properties/create', function () {
        $content.load('/partials/properties/create.html', function () {
            Properties.create();
        });
    })
    //Fetch a single property by id
    .on(/properties\/(\d+)?/, function (id) {
        $content.load('/partials/properties/single.html', function () {
            Properties.single(id);
        });
    })
    .resolve();
})(jQuery);