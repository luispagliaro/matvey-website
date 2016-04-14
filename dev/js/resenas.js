var articles = document.querySelectorAll('.articles article');

function showReview(articleId) {
  for (var i = 0, length = articles.length; i < length; i++) {
    if (articles[i].getAttribute('id') === articleId) {
      articles[i].style.display = 'block';
    } else {
      articles[i].style.display = 'none';
    }
  }
}