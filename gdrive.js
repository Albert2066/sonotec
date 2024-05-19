function saveMetadata(metadata) {
    // Logique pour sauvegarder les métadonnées dans Google Drive
    const fileId = 'FILE_ID'; // ID du fichier à mettre à jour
    const file = DriveApp.getFileById(fileId);
    file.setDescription(metadata);
}
