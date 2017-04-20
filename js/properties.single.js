Properties.single = function (id) {
    var $property = $('#property');

    $.ajax({
        url: '//api.propertyagent.local/properties/' + id,
        method: 'GET',
        dataType: 'json'
    })
    .done(function (data) {
        $property.append(`
        <div class="card-header">${data.type} - ${data.municipality}</div>
        <img src="${data.images[0]}" class="card-img-top"></img>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${data.type}</li>
            <li class="list-group-item">${data.road} ${data.number}, ${data.floor} ${data.door}, ${data.postal} ${data.municipality}</li>
            <li class="list-group-item">${data.price > 0 ? data.price + ' kr.' : data.expenses + ' kr./mo.'}</li>
        </ul>
        <div class="card-block">
            <a href="#/properties/${data.id}" class="btn btn-primary">View this property</a>
        </div>
        `);
    });
}