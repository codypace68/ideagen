function loadWord(e) {
    let randoWord = document.getElementById('rando-word')

    for (let i = 0; i < randoWord.options.length; i++) {
        if (randoWord.options[i].innerText === e.target.innerText) return;
    }

    let wordSel = document.getElementById('rando-word');
    let opt = document.createElement('option');
    let optText = document.createTextNode(e.target.innerText);

    opt.appendChild(optText);
    opt.setAttribute('value', e.target.parentElement.dataset.id);
    wordSel.appendChild(opt);

    randoWord.value =  e.target.parentElement.dataset.id;

    if (randoWord.style.display === 'none' || randoWord.style.display === '') randoWord.style.display = 'block';    
}