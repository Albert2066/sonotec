// script.js

function searchFiles() {
    const query = document.getElementById('search-input').value;
    // Appel à l'API Google Drive pour rechercher des fichiers
    gapi.client.drive.files.list({
        'q': `name contains '${query}' and mimeType='audio/mpeg'`,
        'fields': "nextPageToken, files(id, name, webContentLink)"
    }).then(function(response) {
        const files = response.result.files;
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        if (files && files.length > 0) {
            files.forEach(file => {
                const fileDiv = document.createElement('div');
                fileDiv.innerHTML = `<p>${file.name} <button onclick="playAudio('${file.webContentLink}')">Jouer</button></p>`;
                resultsDiv.appendChild(fileDiv);
            });
        } else {
            resultsDiv.innerHTML = '<p>Aucun fichier trouvé</p>';
        }
    });
}

function playAudio(link) {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = link;
    audioPlayer.play();
}

function saveMetadata() {
    const metadata = document.getElementById('metadata-input').value;
    // Logique pour sauvegarder les métadonnées via Google Apps Script
    google.script.run.saveMetadata(metadata);
}

// Initialisation de l'API Google Drive
function initClient() {
    gapi.client.init({
        'apiKey': 'YOUR_API_KEY',
        'discoveryDocs': ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"],
        'clientId': 'YOUR_CLIENT_ID',
        'scope': 'https://www.googleapis.com/auth/drive.readonly'
    }).then(function () {
        // Autorisation et autres initialisations
    });
}

gapi.load('client:auth2', initClient);
