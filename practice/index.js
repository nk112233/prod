const { log } = require("console");
const express = require("express")
const mongoose = require("mongoose")


const app = express();

const SongSchema = new mongoose.Schema({
    songname: String,
    film: String,
    music_director: String,
    singer: String,
    actor: String,
    actress: String
});

const songDetails = mongoose.model('songDetails' , SongSchema);

app.use(express.static('public'));

mongoose.connect("mongodb://127.0.0.1:27017/music")
.then(() => {
    console.log("MongoDB connected!");
    
})
.catch((err) => {
    console.log("Error Connecting MongoDB " , err);
    
});




app.get("/api/addSongs" , async(req , res) => {

    const count = await songDetails.countDocuments();

    if(count === 0){
        await songDetails.insertMany([
            { songname: 'Tum Hi Ho', film: 'Aashiqui 2', music_director: 'Mithoon', singer: 'Arijit Singh' },
            { songname: 'Chaiyya Chaiyya', film: 'Dil Se', music_director: 'A. R. Rahman', singer: 'Sukhwinder Singh' },
            { songname: 'Kal Ho Naa Ho', film: 'Kal Ho Naa Ho', music_director: 'Shankar-Ehsaan-Loy', singer: 'Sonu Nigam' },
            { songname: 'Senorita', film: 'ZNMD', music_director: 'Shankar-Ehsaan-Loy', singer: 'Farhan Akhtar' },
            { songname: 'Tujh Mein Rab Dikhta Hai', film: 'Rab Ne Bana Di Jodi', music_director: 'Salim-Sulaiman', singer: 'Roop Kumar Rathod' }
        ]);
        console.log("Songs Inserted");
        res.status(200).send("Songs Inserted!");
        
    }
});

app.get('/songs', async (req, res) => {
    const songs = await songDetails.find();
    const count = await songDetails.countDocuments();
  
    let html = `
      <html>
        <head>
          <title>All Songs</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <h1>Total Songs: ${count}</h1>
          <table>
            <thead>
              <tr>
                <th>Song</th>
                <th>Film</th>
                <th>Director</th>
                <th>Singer</th>
                <th>Actor</th>
                <th>Actress</th>
              </tr>
            </thead>
            <tbody>`;
  
    songs.forEach(song => {
      html += `
        <tr>
          <td>${song.songname}</td>
          <td>${song.film}</td>
          <td>${song.music_director}</td>
          <td>${song.singer}</td>
          <td>${song.actor || '-'}</td>
          <td>${song.actress || '-'}</td>
        </tr>`;
    });
  
    html += `
            </tbody>
          </table>
        </body>
      </html>`;
  
    res.send(html);
  });
  
app.get("/api/song" , async(req , res) =>{
    const director = req.query.director;
    const match = await songDetails.find({music_director : director});
    console.log(match);
    
    res.send(match);
});

app.get("/api/songbydm" , async(req , res) =>{
    const director = req.query.director;
    const qsinger  = req.query.singer;
    const match = await songDetails.find({music_director : director , singer : qsinger});
    console.log(match);
    
    res.send(match);
});

app.delete("/api/deleteSong" , async(req  ,res) => {
    const name = req.query.name;

    await songDetails.deleteOne({songname: name});

    res.send("Deleted!");
});


app.get("api/add" , async(req , res) => {
    const addSong = new songDetails(req.body);
    await addSong.save();
});


app.listen(3000 , () => {
    console.log("Server running at port http://localhost:3000");
    
});






