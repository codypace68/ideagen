
  function words() {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
              if (JSON.parse(xhr.response).msg === 'success') {
                  console.log(JSON.parse(xhr.response))
                  let wordSel = document.getElementById('rando-word');
                  let opt = document.createElement('option');
                  let optText = document.createTextNode(JSON.parse(xhr.response).word);

                  opt.appendChild(optText);
                  opt.setAttribute('value', JSON.parse(xhr.response).wordId);
                  wordSel.appendChild(opt);

                  let randoWord = document.getElementById('rando-word')
                  randoWord.value = JSON.parse(xhr.response).wordId;

                  console.log(randoWord.style);

                  if (randoWord.style.display === 'none' || randoWord.style.display === '') randoWord.style.display = 'block';

                  return resolve(JSON.parse(xhr.response).word);
              } else if (JSON.parse(xhr.response).msg === 'no words in category') {
                return reject('no word in category');
              }
          }
      }
      xhr.open("GET", 'http://http://ideagen-git-ual-test.apps.ld6-test-cluster-001.mgmt.powercloudx.com/random-word/' + selectedCatId, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send();
    })
  }
