const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/music', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Schema and Model
const songSchema = new mongoose.Schema({
  songname: String,
  film: String,
  music_director: String,
  singer: String,
  actor: String,
  actress: String
});

const Song = mongoose.model('Song', songSchema);

// Insert 5 songs (Only once)
async function seedSongs() {
  const count = await Song.countDocuments();
  if (count === 0) {
    await Song.insertMany([
      { songname: 'Tum Hi Ho', film: 'Aashiqui 2', music_director: 'Mithoon', singer: 'Arijit Singh' },
      { songname: 'Chaiyya Chaiyya', film: 'Dil Se', music_director: 'A. R. Rahman', singer: 'Sukhwinder Singh' },
      { songname: 'Kal Ho Naa Ho', film: 'Kal Ho Naa Ho', music_director: 'Shankar-Ehsaan-Loy', singer: 'Sonu Nigam' },
      { songname: 'Senorita', film: 'ZNMD', music_director: 'Shankar-Ehsaan-Loy', singer: 'Farhan Akhtar' },
      { songname: 'Tujh Mein Rab Dikhta Hai', film: 'Rab Ne Bana Di Jodi', music_director: 'Salim-Sulaiman', singer: 'Roop Kumar Rathod' }
    ]);
    console.log('Sample songs inserted.');
  }
}
seedSongs();

// Routes

// (d) Total Count + List all Songs
app.get('/api/songs', async (req, res) => {
  const songs = await Song.find();
  const count = await Song.countDocuments();
  res.json({ count, songs });
});

// (e) List songs by specific Music Director
app.get('/api/songs/music-director/:name', async (req, res) => {
  const musicDirector = req.params.name;
  const songs = await Song.find({ music_director: musicDirector });
  res.json(songs);
});

// (f) List songs by Music Director and Singer
app.get('/api/songs/music-director/:md/singer/:singer', async (req, res) => {
  const { md, singer } = req.params;
  const songs = await Song.find({ music_director: md, singer });
  res.json(songs);
});

// (g) Delete a song (by name)
app.delete('/api/songs/:songname', async (req, res) => {
  const { songname } = req.params;
  await Song.deleteOne({ songname });
  res.json({ message: `Song '${songname}' deleted.` });
});

// (h) Add new song
app.post('/api/songs', async (req, res) => {
  const newSong = new Song(req.body);
  await newSong.save();
  res.json({ message: 'New song added!', song: newSong });
});

// (i) List Songs sung by specified singer from specified film
app.get('/api/songs/film/:film/singer/:singer', async (req, res) => {
  const { film, singer } = req.params;
  const songs = await Song.find({ film, singer });
  res.json(songs);
});

// (j) Update a song with actor and actress (by song name)
app.put('/api/songs/:songname', async (req, res) => {
  const { songname } = req.params;
  const { actor, actress } = req.body;
  await Song.updateOne({ songname }, { actor, actress });
  res.json({ message: `Song '${songname}' updated with actor/actress.` });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
