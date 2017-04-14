function Validation() {}

Validation.prototype = {
    validateForm: function (form) {
        var self = this;
        var errors = [];

        form.find('[data-validate]').each(function () {
            if (!self.validateValue(this.getAttribute('data-validate'), this.value)) {
                this.parentElement.classList.add('has-danger');
                errors.push(false);
            } else {
                this.parentElement.classList.remove('has-danger');
                errors.push(true);
            }
        });

        for (var i in errors) {
            if (!errors[i]) {
                return false;
            }
        }

        return true;
    },

    validateValue: function (type, value) {
        switch (type) {
            case 'email':
                return /^.+@.+?\..+?$/.test(value);
                break;
            case 'postal':
                return /^[0-9]{4}$/.test(value);
                break;
            case 'integer':
                return /^[0-9]+?$/.test(value);
                break;
            case 'required':
                return value.length >= 1;
                break;
        }

        return false;
    }
};

Validator = new Validation();