const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true}));
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

var db;
MongoClient.connect('mongodb+srv://a12314:rlatpdms0911@cluster0.yxtdl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(err, client){
  app.listen(1000, function(){
    if(err) return console.log(err)

    db = client.db('music-box');

    app.post('/add', function(qus, res){

      res.sendFile(__dirname + '/personal-porject/index.html');

      
      db.collection('music').insertOne({제목: qus.body.title, 이름 : qus.body.by, 유튜브 : qus.body.ytn, 링크 : qus.body.ytl, iframe : qus.body.iframe, 가사 : qus.body.lyrics}, function(에러, 결과){
        console.log('저장완료');
      });
    });


    console.log('listening on 1000');
  })
});



app.get('/', function(qus, res){
  res.sendFile(__dirname + '/personal-porject/index.html');
});

app.get('/write', function(qus, res){

  res.sendFile(__dirname + '/personal-porject/write.html')
});

app.get('/music', function(qus, res){
  db.collection('music').find().toArray(function(err, result){
    res.render('music.ejs', {posts : result});
  });
});

app.get('/css/main.css', function(qus, res){
  res.sendFile(__dirname + '/personal-porject/css/main.css')
})

