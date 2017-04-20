function RouteHandlers(router, signInBtn, signOutBtn, registerBtn) {
    this._navbar;
    this._notify = new Notifier();
    this._router = router;

    var self = this;

    this.buttons = {
        signIn: signInBtn,
        signOut: signOutBtn,
        register: registerBtn
    };

    //Toggle atuhentication buttons
    this.toggleButtons = function () {
        signInBtn.toggleClass('hidden');
        signOutBtn.toggleClass('hidden');
        registerBtn.toggleClass('hidden');
    };

    //Updates the navigation menu links with the css class active
    this.updateNavbarActive = function () {
        if (typeof this._navbar === 'undefined') {
            this._navbar = jQuery('#navbar [data-navigo]');
        }

        this._navbar
            .removeClass('active')
            .each(function () {
                if (this.getAttribute('href') === window.location.pathname) {
                    this.classList.add('active');
                }
            });

    };

    //Signs out, hide sign out button and shows sign in and register buttons
    signOutBtn.on('click', function () {
        Auth
            .signOut()
            .always(function () {
                self.toggleButtons();
                self._router.navigate('/signin');
            });
    });
}

RouteHandlers.prototype = {
    //Actions to take after the home view is loaded
    loadHome: function () {},

    //Attach submit listener to the sign in form after the view has loaded
    loadSignIn: function () {
        var form = jQuery('#form-signin');
        var self = this;

        form.on('submit', function (e) {
            e.preventDefault();

            if (Validator.validateForm(form)) {
                Auth
                    .signIn(form.serialize())
                    .then(function () {
                        form[0].reset();
                        self._notify.send('Sucessfully signed in!');
                        self.toggleButtons();
                        self._router.navigate('/');
                    });
            }

            return false;
        });
    },

    //Attach submit listener to t he registration from after the view has loaded
    loadRegister: function () {
        var form = jQuery('#form-register');
        var self = this;

        form.on('submit', function (e) {
            e.preventDefault();

            if (Validator.validateForm(form)) {
                Auth
                    .register(form.serialize())
                    .then(function () {
                        form[0].reset();
                        self._notify.send('Sucessfully created user!');
                        self._router.navigate('/');
                    });
            }

            return false;
        });
    },

    loadUsers: function () {
        jQuery.ajax({
            url: 'http://api.propertyagent.local/users/',
            method: 'GET',
            dataType: 'json',
            statusCode: {
                200: function (data) {
                }
            }
        });
    },

    loadSingleUser: function (id) {

    },

    loadCreateProperty: function () {
        var form = jQuery('#form-create');
        var self = this;
        var inputs = [];
        var inputIndex = 2;

        function createFileInput() {
            var name = 'file-' + inputIndex;
            var element = $('<div></div>', {
                'class': 'form-group'
            })
            .append($('<label></label>', {
                'for': name,
                'text': 'Image ' + inputIndex
            }))
            .append($('<input>', {
                'id': name,
                'type': 'file',
                'name': name,
                'class': 'form-control-file'
            }))
            .on('change', function () {
                var input = createFileInput();
                form.find(':last').before(input);
                inputIndex++;
            });

            inputs.push(element);

            return element;
        }

        form.find('#file-1').on('change', function () {
            var name = 'file-' + inputIndex;
            var input = createFileInput();

            form.find(':last').before(input);
            inputIndex++;
        });

        form.on('submit', function (e) {
            e.preventDefault();

            if (Validator.validateForm(form)) {
                var formData = new FormData(this);

                jQuery.ajax({
                    url: '//api.propertyagent.local/properties/',
                    cache: false,
                    processData: false,
                    contentType: false,
                    data: formData,
                    method: 'POST',
                    dataType: 'text',
                    success: function (data) {
                        form[0].reset();

                        for (var i = 0; i < inputs.length; i++) {
                            inputs[i].remove();
                        }

                        inputs = [];
                    }
                });
            }

            return false;
        });
    },

    loadProperties: function (Router) {
        var self = this;
        var properties = $('#properties');
        var verified = false;

        if(Auth.hasRole('admin') || Auth.hasRole('superadmin')) {
            $('#create').load('/partials/create-property.html', function () {
                self.loadCreateProperty();
            });

            verified = true;
        }

        jQuery.ajax({
            url: '//api.propertyagent.local/properties/p/1',
            method: 'GET',
            dataType: 'json'
        })
        .done(function (data) {
            if (Object.keys(data).length > 0) {
                var row = $('<div></div>', {
                    'class': 'row'
                });
                console.log(data);

                for (var index in data.properties) {
                    var property = data.properties[index];

                    var col = $('<div></div>', {
                        'class': 'col-xs-12 col-lg-6 mb-4'
                    });

                    var card = $('<div></div>', {
                        'class': 'card'
                    })
                    .append(
                        $('<img>', {
                            'src': property.images[0],
                            'class': 'card-img-top'
                        })
                    );

                    var cardBlock = $('<div></div>', {
                        'class': 'card-block'
                    });

                    cardBlock.html(
                        '<p>' + property.road + ' ' + property.number + ' ' + property.door + ', ' + property.postal + ' ' + property.municipality + '</p>' +
                        '<iframe src="' + property.map + '" width="100%" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>'
                    );

                    if (verified) {
                        cardBlock
                        .append(
                            $('<a></a>', {
                                'href': '/properties/edit/' + id,
                                'data-navigo': '',
                                'text': 'Edit',
                                'class': 'btn btn-info mr-2'
                            })
                        )
                        .append(
                            $('<button></button>', {
                                'text': 'Delete',
                                'class': 'btn btn-danger',
                                'type': 'button'
                            })
                            .on('click', function () {
                                var confirmDelete = confirm('Do you want to delete this property?');

                                if (confirmDelete) {
                                    jQuery.ajax({
                                        url: '/app/properties/delete/' + id,
                                        method: 'POST',
                                        dataType: 'text'
                                    }).then(function () {
                                        Router.navigate('/properties');
                                    });
                                }
                            })
                        );
                    }

                    card.append(cardBlock);
                    col.append(card);
                    row.append(col);
                }

                properties.append(row);
            }
        });
    },

    loadSingleProperty: function (id) {
    }
};