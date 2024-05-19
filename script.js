var ACCESS_TOKEN = 'sl.B1j_zt6_d2tLQvZq8d2AiNbIzkCRrGXi9lLtwD3nmj_BlfGmdHzFBzseig5aaCrsMW_XMzzjyq9is_XrdmQE_AwAxS-3_En8F75V6LWhhOhWMxaNXuWRRXg7At-A-2-Vs1kQvslR108P'; // 
var FOLDER_PATH = '/ELsonotec';

var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });

function listFiles() {
    dbx.filesListFolder({ path: FOLDER_PATH })
        .then(function(response) {
            console.log('Files:', response.entries);
            displayResults(response.entries);
        })
        .catch(function(error) {
            console.error('Error listing files:', error);
        });
}

function displayResults(files) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (files.length > 0) {
        files.forEach(function(file) {
            var fileDiv = document.createElement('div');
            fileDiv.textContent = file.name;
            resultsDiv.appendChild(fileDiv);
        });
    } else {
        resultsDiv.innerHTML = '<p>Aucun fichier trouvé</p>';
    }
}

// Lister les fichiers au chargement de la page
listFiles();
