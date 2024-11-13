let thumbsUp = document.getElementsByClassName('fa-thumbs-up');
let thumbsDown = document.getElementsByClassName('fa-thumbs-down');
let del = document.getElementsByClassName('del');
let pin = document.getElementsByClassName('pin');

// const ul = document.querySelector('ul');

Array.from(thumbsUp).forEach(function (element) {
  element.addEventListener('click', function () {
    const stageName = this.parentNode.parentNode.childNodes[1].innerText
    const birthName = this.parentNode.parentNode.childNodes[3].innerText
    const likes = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    console.log(stageName, birthName, likes)
    fetch('addOneLike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'stageName': stageName,
        'birthName': birthName,
        'likes': likes
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

Array.from(thumbsDown).forEach(function (element) {
  element.addEventListener('click', function () {
    const stageName = this.parentNode.parentNode.childNodes[1].innerText
    const birthName = this.parentNode.parentNode.childNodes[3].innerText
    const likes = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    // console.log(stageName, birthName, likes)
    fetch('deleteOneLike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'stageName': stageName,
        'birthName': birthName,
        'likes': likes
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});

Array.from(pin).forEach(function (element) {
  element.addEventListener('click', function () {
    const stageName = this.parentNode.childNodes[1].innerText
    const birthName = this.parentNode.childNodes[3].innerText
    const likes = parseFloat(this.parentNode.childNodes[5].innerText)
    this.classList.toggle('pinned') //classList does not save on page reload?
    const pinned = String(this.classList.contains('pinned'))
    console.log(stageName, birthName, likes, pinned)
    fetch('pinRapper', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'stageName': stageName,
        'birthName': birthName,
        'likes': likes,
        'pinned': pinned
      })
    }).then(function (response) {
      // window.location.reload()
    })
  });
});

Array.from(del).forEach(function (element) {
  element.addEventListener('click', function () {
    const stageName = this.parentNode.childNodes[1].innerText
    const birthName = this.parentNode.childNodes[3].innerText
    fetch('deleteRapper', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'stageName': stageName,
        'birthName': birthName
      })
    }).then(function (response) {
      window.location.reload()
    })
  });
});