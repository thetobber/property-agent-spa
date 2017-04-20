Properties.update = function (id) {
    var $form = $('#form');
    var $imageGroup = $form.find('#image-group');

    var self = this;
    var inputs = [];
    var inputIndex = 1;

    $.ajax({
        url: '//api.propertyagent.local/properties/' + id,
        method: 'GET',
        dataType: 'json'
    })
    .done(function (data) {
        for (var key in data) {
            if (key == 'id' || key == 'images' || key == 'map' || typeof data[key] == null) {
                continue;
            }

            var element = document.querySelector('[name="' + key + '"]');
            element.value = data[key];
        }

        for (var index in data.images) {
            var input = createFileInput();
            input.val(data.images[index]);

            console.log(data.images[index]);

            $imageGroup.append(input);
        }

        $form.on('submit', function (e) {
            e.preventDefault();

            if (Validator.validateForm($form)) {
                var formData = new FormData(this);

                jQuery.ajax({
                    url: '//api.propertyagent.local/properties/' + data.id,
                    cache: false,
                    processData: false,
                    contentType: false,
                    data: formData,
                    method: 'POST',
                    dataType: 'text',
                    xhrFields: {
                        withCredentials: true
                    }
                })
                .done(function (data) {
                });
            }

            return false;
        });

        $('#delete-button').on('click', function () {
            jQuery.ajax({
                url: '//api.propertyagent.local/properties/d/' + data.id,
                cache: false,
                contentType: false,
                method: 'POST',
                dataType: 'text',
                xhrFields: {
                    withCredentials: true
                }
            })
            .done(function (data) {
                window.Router.navigate('/');
            });
        });
    });

    function createFileInput() {
        var name = 'file-' + inputIndex;
        var element = $('<div></div>', {
            'class': 'form-group d-flex'
        })
        .append(
            $('<button></button>', {
                'class': 'btn btn-danger btn-sm mr-2',
                type: 'button',
                text: 'Remove',
                click: function () {
                    element.remove();
                }
            })
        )
        .append(
            $('<input>', {
                'id': name,
                'type': 'file',
                'name': name,
                'class': 'form-control-file'
            })
        );

        inputs.push(element);

        inputIndex++;

        return element;
    }

    $('#add-image').on('click', function () {
        $imageGroup.append(createFileInput());
    });
}