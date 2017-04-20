Properties.create = function (id) {
    var $form = $('#form');

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
            $form.find(':last').before(input);
            inputIndex++;
        });

        inputs.push(element);

        return element;
    }

    $form.find('#file-1').on('change', function () {
        var name = 'file-' + inputIndex;
        var input = createFileInput();

        $form.find(':last').before(input);
        inputIndex++;
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
                success: function (data) {
                    $form[0].reset();

                    for (var i = 0; i < inputs.length; i++) {
                        inputs[i].remove();
                    }

                    inputs = [];
                }
            });
        }

        return false;
    });
}