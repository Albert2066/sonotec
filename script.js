var CLIENT_ID = 'YOUR_CLIENT_ID';  // 998542083565-p1mjfb678kuia278ciatbalo32cplfjj.apps.googleusercontent.com
var API_KEY = 'YOUR_API_KEY';      // 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
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive.readonly';
var FOLDER_ID = 'YOUR_FOLDER_ID';  // 1d-0k0YD77ymYKtUVr7NfNRwClAJof848

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function(error) {
        console.log(JSON.stringify(error, null, 2));
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function searchFiles() {
    var query = document.getElementById('search-input').value;
    gapi.client.drive.files.list({
        'q': `name contains '${query}' and '${FOLDER_ID}' in parents and mimeType='audio/mpeg'`,
        'fields': "nextPageToken, files(id, name, webContentLink)"
    }).then(function(response) {
        var files = response.result.files;
        var resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        if (files && files.length > 0) {
            files.forEach(function(file) {
                var fileDiv = document.createElement('div');
                fileDiv.innerHTML = `<p>${file.name} <button onclick="playAudio('${file.webContentLink}')">Jouer</button></p>`;
                resultsDiv.appendChild(fileDiv);
            });
        } else {
            resultsDiv.innerHTML = '<p>Aucun fichier trouvé</p>';
        }
    });
}

function playAudio(link) {
    var audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = link;
    audioPlayer.play();
}

// Charger l'API et initialiser le client
handleClientLoad();
