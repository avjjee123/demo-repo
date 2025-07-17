console.log(mapToken); 
	mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style:"mapbox://styles/mapbox/streets-v12", //style URL
        center:list.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

    const marker=new mapboxgl.Marker({color:"red",rotation:-5})
    .setLngLat(list.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({offset:25})
        .setHTML(
            `<b><p>${list.location},${list.country}</b> it's your exact location</p>`
        )
    )
    .addTo(map);

