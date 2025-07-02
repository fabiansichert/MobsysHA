<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Dashboard - Notizen</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>Dashboard</h1>
  <div id="connection-status" class="online">Online</div>
  <div id="user-info"></div>
  <button id="logout-btn">Logout</button>

  <div id="notes-board"></div>
  <div id="add-note-btn">+</div>

  <div id="note-modal">
    <form id="note-form">
      <input type="text" id="note-title" placeholder="Titel" required />
      <textarea id="note-content" rows="5" placeholder="Inhalt"></textarea>
      <button type="submit" id="save-note-btn">Speichern</button>
      <button type="button" id="cancel-note-btn">Abbrechen</button>
    </form>
  </div>

  <script type="module" src="./dashboard.js"></script>
</body>
</html>



