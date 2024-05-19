var ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // sl.B1i_7RgEqJI3jxkagahtyepCBJj81vmrdv6ucKF05zUVDdd2RVRM3PchzRxh2a5n0eYQHDJsNj3k9BtpHu_nD29eh7fsCmjWPxNhgRXjGduX9Agg8iLIHSwEwVe2TQLkJ-UWp6MZFIIs
var FOLDER_PATH = ''; //Elsonotec

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
