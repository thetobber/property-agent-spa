Properties.list = function () {
    var $properties = $('#properties');
    var $pagination = $('#pagination');
    var currentPage = 1;
    var canEdit = false;

    Authentication
    .hasScopes({
        realtor: true,
        admin: true,
        superadmin: true
    })
    .then(function () {
        canEdit = true;
    });

    $(document).on('click', '[data-page]', function (e) {
        var attr = e.target.getAttribute('data-page');

        if (attr && currentPage != attr) {
            currentPage = parseInt(attr);
            getProperties(currentPage);
        }

        return false;
    });

    $.ajax({
        url: '//api.propertyagent.local/properties/p/1',
        method: 'GET',
        dataType: 'json'
    })
    .done(function (data) {
        var markup = '';

        for (var index in data.properties) {
            var property = data.properties[index];

            markup += getPropertyMarkup(
                property.id,
                property.type,
                property.municipality,
                property.images[0],
                property.road,
                property.number,
                property.floor,
                property.door,
                property.postal,
                property.price,
                property.expenses
            );

        }
        
        $properties.append(markup);

        for (var index = 1; index <= data.maxPages; index++) {
            $pagination.append(`
            <li class="page-item">
                <a class="page-link" data-page="${index}">Page ${index}</a>
            </li>
            `);
        }
    });

    function getProperties (page) {
        $.ajax({
            url: '//api.propertyagent.local/properties/p/' + page,
            method: 'GET',
            dataType: 'json'
        })
        .done(function (data) {
            $properties.html('');

            var markup = '';

            for (var index in data.properties) {
                var property = data.properties[index];

                markup += getPropertyMarkup(
                    property.id,
                    property.type,
                    property.municipality,
                    property.images[0],
                    property.road,
                    property.number,
                    property.floor,
                    property.door,
                    property.postal,
                    property.price,
                    property.expenses
                );

            }
            
            $properties.append(markup);
        });
    }

    function getPropertyMarkup(id, type, municipality, image, road, number, floor, door, postal, price, expenses) {
        return `
        <div class="col-xs-12 col-md-6 col-lg-4 mb-4">
            <div class="card">
                <div class="card-header">${type} - ${municipality}</div>

                <img src="${image}" class="card-img-top"></img>

                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${type}</li>
                    <li class="list-group-item">${road} ${number}, ${floor} ${door}, ${postal} ${municipality}</li>
                    <li class="list-group-item">${price > 0 ? price + ' kr.' : expenses + ' kr./mo.'}</li>
                </ul>

                <div class="card-block">
                    <a href="/properties/${id}" class="btn btn-primary" data-navigate>View</a>
                    ${canEdit ? `<a href="/properties/edit/${id}" class="btn btn-warning" data-navigate>Edit</a>` : ''}
                    ${canEdit ? `<a href="/properties/delete/${id}" class="btn btn-danger" data-navigate>Delete</a>` : ''}
                </div>
            </div>
        </div>
        `;
    }
}