const express = require('express');
const app = express();
const path = require('path');
const port = 3000, host = '192.168.1.48';
const cors = require('cors');

app.use(express.static(path.join(__dirname)));

let whitelist = ['http://localhost:4000', 'http://abc.com'];

app.use(cors());

/*app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    if(!origin) return callback(null, true);
    if(whitelist.indexOf(origin) === -1){
      var message = 'The CORS policy for this origin doesn't ' +
                'allow access from the particular origin.';
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));*/

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './')
    })
});

app.listen(port, host, () => {
    console.log(`Frontend listening on port ${port}`);
});