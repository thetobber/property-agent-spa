Properties.create = function (id) {
    var $form = $('#form');
    var $imageGroup = $form.find('#image-group');

    var self = this;
    var inputs = [];
    var inputIndex = 1;

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

        $imageGroup.append(element);
    }

    $('#add-image').on('click', function () {
        createFileInput();
    });

    $form.on('submit', function (e) {
        e.preventDefault();

        if (Validator.validateForm($form)) {
            var formData = new FormData(this);

            jQuery.ajax({
                url: '//api.propertyagent.local/properties/',
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
                $form[0].reset();

                for (var i = 0; i < inputs.length; i++) {
                    inputs[i].remove();
                }

                inputs = [];
                inputIndex = 1;
            });
        }

        return false;
    });
}