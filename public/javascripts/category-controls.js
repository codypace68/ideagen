let selectedCatId = 1;

window.addEventListener('DOMContentLoaded', (event) => {
    addChangeListener();
});


function addChangeListener() {
    const categorySelect = document.getElementById('category-label');

    categorySelect.addEventListener('change', (e) => {
        const categoryId = e.target.options[e.target.selectedIndex].id;
        selectedCatId = categoryId;
        document.getElementById('category-label').dataset.id = selectedCatId;
        document.getElementById('rando-word').innerText = '';

        changeIdeasToCat();
    });
}

function changeIdeasToCat() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (JSON.parse(xhr.response).msg === 'success') {
                const tableBody = document.getElementById('idea-body');
                tableBody.innerHTML = '';// clear table body

                JSON.parse(xhr.response).ideas.forEach(idea => {
                    const elem = document.createElement('tr');
                    elem.id = idea.id;
                    elem.classList = 'idea';
        
                    elem.innerHTML = `
                    <td class="idea-item idea-rating rating-${idea.rating}" id="idea-rating" data-rating=${idea.rating}></td>
                    <td class="idea-item word">${idea.Word.word}</td>
                    <td class="idea-item idea-description">${idea.idea}</td>
                    <td class="idea-item"><button class="idea-delete"></button></td>
                    `;
        
        
                    tableBody.prepend(elem);
        
                    addEvents();        
                });
            }
            
            addEvents();
        }
    }
    xhr.open("GET", 'http://192.168.1.14:3000/ideas-by-category/' + selectedCatId, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}


// tr.idea( id= val.dataValues.id )    
// td.idea-item.word #{val.dataValues.word}
// td.idea-item.idea-description #{val.dataValues.idea}
// td.idea-item
//   button.idea-delete