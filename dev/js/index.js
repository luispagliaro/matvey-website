(function () {
  function initMap() {
    var mapDiv = document.getElementById('map') || '';

    if (mapDiv !== '') {
      var map = new google.maps.Map(mapDiv, {
        center: {
          // lat: -32.944709,
          // lng: -60.655533
          lat: -34.619530,
          lng: -58.441316
        },
        zoom: 12
      });

      var contentString = '<h4>La Colorada Music Bar</h4><address>Honorio Pueyrredon 41, Caballito, Buenos Aires</address>',
        location = {
          lat: -34.619530,
          lng: -58.441316
        },
        infoWindow = new google.maps.InfoWindow({
          content: contentString
        }),
        marker = new google.maps.Marker({
          position: location,
          map: map,
          title: 'La Colorada Music Bar'
        });

      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
    }
  }

  function initReviews() {
    var reviews = document.querySelectorAll('.mainReviews article'),
      count = 1,
      length = reviews.length;

    setInterval(function () {
      reviews[count].style.display = 'block';
      count === 0 ? reviews[length - 1].style.display = 'none' : reviews[count - 1].style.display = 'none';

      count++;

      if (count >= length) {
        count = 0;
      }
    }, 6000);
  }

  initMap();
  initReviews();
})();