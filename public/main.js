let heart = document.getElementsByClassName('fa-heart');
let del = document.getElementsByClassName('del');

// const ul = document.querySelector('ul');

Array.from(heart).forEach(function (element) {
  element.addEventListener('click', function () {
    const title = this.parentNode.parentNode.parentNode.childNodes[1].innerText
    const src = this.parentNode.parentNode.parentNode.childNodes[3].src.slice(0,40)
    const likes = parseFloat(this.parentNode.parentNode.childNodes[1].innerText)
    fetch('addOneLike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'title': title,
        'src': src,
        'likes': likes
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

Array.from(del).forEach(function (element) {
  element.addEventListener('click', function () {
    const title = this.parentNode.childNodes[1].innerText
    const src = this.parentNode.childNodes[3].innerText
    fetch('deleteRapper', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'title': title,
        'src': src
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});