Properties.single = function (id) {
    var $property = $('#property');
    var $carousel = $('#carousel');

    $.ajax({
        url: '//api.propertyagent.local/properties/' + id,
        method: 'GET',
        dataType: 'json'
    })
    .done(function (data) {
        document.title = `${data.road} ${data.number}, ${data.floor} ${data.door}, ${data.postal} ${data.municipality}`;

        if (data.images.length) {
            for (var index in data.images) {
                $carousel.append(`
                <div class="carousel-item${index == 0 ? ' active' : ''}">
                    <div class="d-block background-cover pad-50" style="background-image: url(${data.images[index]})"></div>
                </div>
                `);
            }

            $('.carousel').carousel({
                interval: 3000,
                ride: true,
                pause: false
            });
        } else {
            $carousel.parent().parent().remove();
        }

        $property.append(`
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <b>Property type</b>
                <span class="ml-auto">${data.type}</span>
            </li>
            <li class="list-group-item">
                <b>Address</b>
                <span class="ml-auto">${data.road} ${data.number}, ${data.floor} ${data.door}, ${data.postal} ${data.municipality}</span>
            </li>
            <li class="list-group-item">
                <b>Number of rooms</b>
                <span class="ml-auto">${data.rooms}</span>
            </li>
            <li class="list-group-item">
                <b>Area</b>
                <span class="ml-auto">${data.area} m<sup>2</sup></span>
            </li>
            <li class="list-group-item">
                <b>Building year</b>
                <span class="ml-auto">${data.year}</span>
            </li>
            <li class="list-group-item">
                <b>Monthly expenses</b>
                <span class="ml-auto">${data.expenses} kr./mo.</span>
            </li>
            <li class="list-group-item">
                <b>Deposit</b>
                <span class="ml-auto">${data.deposit} kr.</span>
            </li>
            <li class="list-group-item">
                <b>Price</b>
                <span class="ml-auto">${data.price} kr.</span>
            </li>
        </ul>
        `);
    });
}