const express = require('express');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    const api = require('./routes/api');
    const Pusher = require('pusher');
    const pusher = new Pusher({
        appId      : '1209532',
        key        : '46ac48d87dd4b7807417',
        secret     : 'e305cbf03441691895be',
        cluster    : 'us2',
        encrypted  : true,
      });
      const channel = 'tasks';
      const app = express();
    
      app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
      });
      
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use('/api', api);
  
      mongoose.connect('mongodb+srv://testMongo:testMongo@cluster0.h81et.mongodb.net/tasksDB?retryWrites=true&w=majority');

      const db = mongoose.connection;
    
    db.on('error', console.error.bind(console, 'Connection Error:'));
    
    db.once('open', () => {
        app.listen(9000, () => {
          console.log('Node server running on port 9000');
        });
        
        const taskCollection = db.collection('tasks');
        const changeStream = taskCollection.watch();
          
        changeStream.on('change', (change) => {
        
        });
      });
  
