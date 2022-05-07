window.addEventListener('DOMContentLoaded', (event) => {
    eventListenerAdd();
});


function eventListenerAdd() {
    var input = document.getElementById("input-idea");
    input.addEventListener("focus", (e) => {
        editMode(null, false);
    });
    
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
        
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                xhr.response = JSON.parse(xhr.response);
                if (JSON.parse(xhr.response).msg === 'success') {
                    const elem = document.createElement('tr');
                    elem.id = JSON.parse(xhr.response).id;
                    elem.classList = 'idea';
                    let randoWord = document.getElementById('rando-word');
        
                    elem.innerHTML = `
                    <td class="idea-item idea-rating rating-3" id="idea-rating" data-rating=3></td>
                    <td class="idea-item word">${randoWord.options[randoWord.selectedIndex].innerText}</td>
                    <td class="idea-item idea-description">${input.value}</td>
                    <td class="idea-item"><button class="idea-delete"></button></td>
                    `;
        
        
                    document.getElementById('idea-body').prepend(elem);
        
                    addEvents();
        
                    input.value = '';
                }
                }
            }
            xhr.open("POST", 'http://192.168.1.14:3000/new-idea', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                word: document.getElementById('rando-word').options[document.getElementById('rando-word').selectedIndex].value,
                idea: input.value,
                category: document.getElementById('category-label').dataset.id
            }));
        }
    });   
}
