var ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'; // sl.B1i_7RgEqJI3jxkagahtyepCBJj81vmrdv6ucKF05zUVDdd2RVRM3PchzRxh2a5n0eYQHDJsNj3k9BtpHu_nD29eh7fsCmjWPxNhgRXjGduX9Agg8iLIHSwEwVe2TQLkJ-UWp6MZFIIs
var FOLDER_PATH = ''; //Elsonotec

var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });

function searchFiles() {
    var query = document.getElementById('search-input').value.toLowerCase();
    dbx.filesListFolder({ path: FOLDER_PATH })
        .then(function(response) {
            var files = response.entries.filter(file => 
                file.name.toLowerCase().includes(query) && file[".tag"] === 'file');
            displayResults(files);
        })
        .catch(function(error) {
            console.error('Error searching files:', error);
        });
}

function displayResults(files) {
    var resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (files.length > 0) {
        files.forEach(function(file) {
            var fileDiv = document.createElement('div');
            fileDiv.innerHTML = `<p>${file.name} <button onclick="playAudio('${file.path_lower}')">Jouer</button></p>`;
            resultsDiv.appendChild(fileDiv);
        });
    } else {
        resultsDiv.innerHTML = '<p>Aucun fichier trouvé</p>';
    }
}

function playAudio(path) {
    dbx.filesGetTemporaryLink({ path: path })
        .then(function(response) {
            var audioPlayer = document.getElementById('audio-player');
            audioPlayer.src = response.link;
            audioPlayer.play();
        })
        .catch(function(error) {
            console.error('Error getting temporary link:', error);
        });
}
