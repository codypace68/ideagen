function changeRating(e) {
    let curRating = e.target.dataset.rating;
            
    if (parseInt(curRating) === 5) {
        curRating = 1;
    } else {
        curRating++;
    }

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (JSON.parse(xhr.response).msg === 'success') {
                const curClass = 'rating-' + e.target.dataset.rating;

            
                e.target.dataset.rating = curRating;
                e.target.classList.remove(curClass);
                e.target.classList.add('rating-'+curRating);
            }
            
            addEvents();
        }
    }
    xhr.open("POST", 'http://192.168.1.14:3000/update-idea-rating/' + e.target.parentElement.id + '/' + curRating, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}