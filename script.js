var CLIENT_ID = 'YOUR_CLIENT_ID';  // 998542083565-p1mjfb678kuia278ciatbalo32cplfjj.apps.googleusercontent.com
var API_KEY = 'YOUR_API_KEY';      // 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
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
var SCOPES = 'https://www.googleapis.com/auth/drive.readonly';
var FOLDER_ID = 'YOUR_FOLDER_ID';  // 1d-0k0YD77ymYKtUVr7NfNRwClAJof848

var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');

function handleClientLoad() {
    console.log("Loading Google API client...");
    gapi.load('client:auth2', initClient);
}

function initClient() {
    console.log("Initializing Google API client...");
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        console.log("Google API client initialized.");
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    }, function(error) {
        console.error('Error initializing Google API client:', error);
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        console.log("User is signed in.");
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
        console.log("User is not signed in.");
    }
}

function handleAuthClick(event) {
    console.log("Authorization button clicked.");
    gapi.auth2.getAuthInstance().signIn().then(() => {
        console.log('User signed in');
    }).catch(error => {
        console.error('Error during sign in:', error);
    });
}

function handleSignoutClick(event) {
    console.log("Sign out button clicked.");
    gapi.auth2.getAuthInstance().signOut().then(() => {
        console.log('User signed out');
    }).catch(error => {
        console.error('Error during sign out:', error);
    });
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
    }).catch(error => {
        console.error('Error during file search:', error);
    });
}

function playAudio(link) {
    var audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = link;
    audioPlayer.play();
}

// Charger l'API et initialiser le client
handleClientLoad();
