function initMap() {
  var mapDiv = document.getElementById('map'),
    map = new google.maps.Map(mapDiv, {
      center: {
        lat: -32.944709,
        lng: -60.655533
      },
      zoom: 12
    });

  var contentString = '<h4>Sindicato de Canillitas</h4><address>Buenos Aires 1346, Rosario, Santa Fe</address>',
    location = {
      lat: -32.954242,
      lng: -60.634434
    },
    infoWindow = new google.maps.InfoWindow({
      content: contentString
    }),
    marker = new google.maps.Marker({
      position: location,
      map: map,
      title: 'Sindicato de Canillitas'
    });

  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });

  var reviews = document.querySelectorAll('.mainReviews article'),
    count = 1,
    length = reviews.length;

  setInterval(function() {
    reviews[count].style.display = 'block';
    count === 0 ? reviews[length - 1].style.display = 'none' : reviews[count - 1].style.display = 'none';

    count++;

    if (count >= length) {
      count = 0;
    }
  }, 6000);
}