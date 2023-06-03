function calcRoute() {
    // Get origin and destination from local storage
    const origin = localStorage.getItem("origin");
    const destination = localStorage.getItem("destination");

    // Display origin and destination
    document.getElementById("origin")
    document.getElementById("destination")

    // Set up request
    let taxi = 0;
    const request = {
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING, // WALKING, BICYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL
    };

    // Send request to Directions API
    directionsService.route(request, function (result, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            // Display distance in miles and kilometers

            //Get distance and time
            const output = document.querySelector('#output');
            //    output.innerHTML = "<div class='alert-info'>From: " + request.origin + ".<br />To: " + request.destination + ".<br /> Driving distance <i class='fas fa-road'></i> : "
            //        + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            const distance = parseFloat(result.routes[0].legs[0].distance.text.split(" ")[0]);
            const Kilometer = distance / 0.62137;
            console.log(`distance = ${distance} or ${Kilometer.toFixed(2)} Kilometer`);

            // Calculate taxi fare based on distance
            if (distance <= 10) {
                taxi = Kilometer * 5.50;
            } else if (distance <= 20) {
                taxi = Kilometer * 6.50;
            } else if (distance <= 40) {
                taxi = Kilometer * 7.50;
            } else if (distance <= 60) {
                taxi = Kilometer * 8.00;
            } else if (distance <= 80) {
                taxi = Kilometer * 9.00;
            } else {
                taxi = Kilometer * 10.50;
            }

            // Display taxi fare
            output.innerHTML = "<i class='fa-solid fa-location-dot' style='color: #179bee;'></i> ต้นทาง  : "
            +request.origin + ".<br/> <i class='fa-solid fa-location-dot' style='color: #f80d0d;'></i> ปลายทาง : " + request.destination
            output2.innerHTML = "<i class='fa-solid fa-hourglass-start' style='color: #f5e105;'></i> ระยะเวลา  : " 
            + result.routes[0].legs[0].duration.text + "<br/></div><i class='fa-solid fa-road' style='color: #e78413;'></i>" 
            + `ระยะทาง = ${Kilometer.toFixed(2)} กิโลเมตร <br/><i class='fa-regular fa-money-check-dollar' 
                style='color: #16f343;'></i> ราคา : = ${taxi.toFixed(2)} บาท`;
            // Display route on map
            directionsDisplay.setDirections(result);
        } else {
            // Handle error
            const myLatLng = new google.maps.LatLng(-33.8674869, 151.2069902);
            map.setCenter(myLatLng);
            output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
        }
    });
}


