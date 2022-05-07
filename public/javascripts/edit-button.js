let editState = false;
let prevElemsText = [];
let saveBtn

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('edit-button').addEventListener('click', editMode);
    saveBtn = document.getElementById('save-button');

    saveBtn.addEventListener('click', (e) => {
        editMode(e);
    })
});

window.addEventListener('beforeunload', e => {
    if (editState) {
        (e || window.event).returnValue = 'You may have unsaved changes that will be lost. Are you sure you want to leave?';
    };
});

function editMode(e, forceState) {
    if (forceState !== undefined) {
        console.log('forceState')
        if (editState === forceState) return;
        else {
            editState = !forceState;
        }
    }

    if (!editState) {
        const ideas = document.getElementsByClassName('idea-description');
        saveBtn.style.display = 'block';
        prevElemsText = [];

        for (let i = 0; i < ideas.length; i++) {
            prevElemsText[i] = ideas[i].innerText;
            ideas[i].innerHTML = '<textarea class="idea-item">' + ideas[i].innerText + '</textarea>'
        }
    } else {
        const ideas = document.getElementsByClassName('idea-description');
        saveBtn.style.display = 'none';
        

        for (let i = 0; i < ideas.length; i++) {
            if (prevElemsText[i] !== ideas[i].childNodes[0].value) updateIdeaText(ideas[i].parentElement.id,ideas[i].childNodes[0].value);

            ideas[i].innerHTML = ideas[i].childNodes[0].value;
        }
    };

    editState = !editState;
}

function updateIdeaText(id,text) {
    console.log(id, text);


    var xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://192.168.1.14:3000/update-idea/' + id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        idea: text
    }));
}