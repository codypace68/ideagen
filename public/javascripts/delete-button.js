window.addEventListener('DOMContentLoaded', (event) => {
    addEvents();
});

function addEvents() {
    const dltButtons = document.getElementsByClassName('idea-delete');

    for (let i = 0; i < dltButtons.length; i++) {
        dltButtons[i].removeEventListener('click', decomIdea, true);
        dltButtons[i].addEventListener('click', decomIdea, true);
    }

    const ratingCols = document.getElementsByClassName('idea-rating');

    for (let i = 0; i < ratingCols.length; i++) {
        ratingCols[i].removeEventListener('click', changeRating, true);
        ratingCols[i].addEventListener('click', changeRating, true);
    }
}

function decomIdea(e) {
    console.log(e.target);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.response === 'success') {
            const parent = document.getElementById(e.target.parentElement.parentElement.id);

            console.log(parent);
            document.getElementById('idea-body').removeChild(parent);
        }
      }
    }
    xhr.open("POST", 'http://ideagen-git-ual-test.apps.ld6-test-cluster-001.mgmt.powercloudx.com/decom-idea/' + e.target.parentElement.parentElement.id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}
