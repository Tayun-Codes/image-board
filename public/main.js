let thumbsUp = document.getElementsByClassName('fa-thumbs-up');
let thumbsDown = document.getElementsByClassName('fa-thumbs-down');
let del = document.getElementsByClassName('del');
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
    console.log(stageName, birthName, likes)
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

// // const ul = document.querySelector('ul');
// function sortByLikes() {
//   let messages = [...ul.childNodes]
//   let onlyMessages = []
//   // console.log(messages);
//   for (let i = 0; i < messages.length; i++) {
//     if (i % 2 === 1) {
//       onlyMessages.push(messages[i])
//     }
//   }
    
//   // console.log('onlyMessages', onlyMessages);
//   console.log('childNodes', onlyMessages[0].childNodes);
//   console.log(onlyMessages.sort((a,b) => a.childNodes[5] - b.childNodes[5]))
//   console.log(onlyMessages)
// //onlyMessages.childNode[5] == counter value
// }

function sortByLikes() {
  db.collection('rappers').sort((a,b) => a.likes - b.likes)
}