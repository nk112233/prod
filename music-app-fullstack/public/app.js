// Load All Songs initially
function loadSongs() {
    fetch('/api/songs')
      .then(response => response.json())
      .then(data => {
        document.getElementById('total-songs').textContent = `Total Songs: ${data.count}`;
  
        const tableBody = document.getElementById('song-table-body');
        tableBody.innerHTML = '';
  
        data.songs.forEach(song => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${song.songname}</td>
            <td>${song.film}</td>
            <td>${song.music_director}</td>
            <td>${song.singer}</td>
            <td>${song.actor || '-'}</td>
            <td>${song.actress || '-'}</td>
            <td>
              <button class="btn btn-sm btn-danger" onclick="deleteSong('${song.songname}')">Delete</button>
              <button class="btn btn-sm btn-warning" onclick="updateSongPrompt('${song.songname}')">Update</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error:', error));
  }
  
  // Add New Song
  document.getElementById('add-song-form').addEventListener('submit', (e) => {
    e.preventDefault();
  
    const songData = {
      songname: document.getElementById('songname').value,
      film: document.getElementById('film').value,
      music_director: document.getElementById('music_director').value,
      singer: document.getElementById('singer').value,
      actor: document.getElementById('actor').value,
      actress: document.getElementById('actress').value
    };
  
    fetch('/api/songs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(songData)
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        document.getElementById('add-song-form').reset();
        loadSongs();
      });
  });
  
  // Delete Song
  function deleteSong(songname) {
    if (confirm(`Are you sure you want to delete '${songname}'?`)) {
      fetch(`/api/songs/${encodeURIComponent(songname)}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        loadSongs();
      });
    }
  }
  
  // Update Song (Actor/Actress)
  function updateSongPrompt(songname) {
    const actor = prompt('Enter Actor Name:');
    const actress = prompt('Enter Actress Name:');
    if (actor && actress) {
      fetch(`/api/songs/${encodeURIComponent(songname)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ actor, actress })
      })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        loadSongs();
      });
    }
  }
  
  // Filter Songs
  document.getElementById('filter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const md = document.getElementById('filter-md').value;
    const singer = document.getElementById('filter-singer').value;
  
    let url = '/api/songs';
  
    if (md && singer) {
      url = `/api/songs/music-director/${encodeURIComponent(md)}/singer/${encodeURIComponent(singer)}`;
    } else if (md) {
      url = `/api/songs/music-director/${encodeURIComponent(md)}`;
    }
  
    fetch(url)
      .then(response => response.json())
      .then(songs => {
        document.getElementById('total-songs').textContent = `Filtered Songs: ${songs.length}`;
  
        const tableBody = document.getElementById('song-table-body');
        tableBody.innerHTML = '';
  
        songs.forEach(song => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${song.songname}</td>
            <td>${song.film}</td>
            <td>${song.music_director}</td>
            <td>${song.singer}</td>
            <td>${song.actor || '-'}</td>
            <td>${song.actress || '-'}</td>
            <td>
              <button class="btn btn-sm btn-danger" onclick="deleteSong('${song.songname}')">Delete</button>
              <button class="btn btn-sm btn-warning" onclick="updateSongPrompt('${song.songname}')">Update</button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error:', error));
  });
  
  // Load Songs initially
  loadSongs();
  