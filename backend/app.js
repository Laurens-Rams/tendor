

// This is the beginning of my old Backend when I did not use Firestore

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension);
  },
});
const upload = multer({ storage });

let users = [{"name":"Lukas Mayer","email":"lukas.mayer@example.com","birthday":"1992-07-25","location":"Österreich","climbingDifficulty":"6b-7b","interests":"Klettern, Mountainbiken, Skifahren, Fotografie","isConfirmed":true},
{"name":"Anna Schneider","email":"anna.schneider@example.com","birthday":"1997-04-12","location":"Deutschland","climbingDifficulty":"5c-6b","interests":"Bouldern, Yoga, Lesen, Malen","isConfirmed":true},
{"name":"Nico Müller","email":"nico.mueller@example.com","birthday":"1990-12-01","location":"Deutschland","climbingDifficulty":"7a-8a","interests":"Bergsteigen, Wandern, Snowboarden, Fotografie","isConfirmed":true},
{"name":"Maja Weber","email":"maja.weber@example.com","birthday":"1994-09-18","location":"Österreich","climbingDifficulty":"4b-5b","interests":"Skaten, Radfahren, Tauchen, Reisen","isConfirmed":true},
{"name":"Lea Fischer","email":"lea.fischer@example.com","birthday":"1996-02-03","location":"Deutschland","climbingDifficulty":"5a-6a","interests":"Surfen, Yoga, Schwimmen, Musik","isConfirmed":true},
{"name":"Janik Becker","email":"janik.becker@example.com","birthday":"1993-11-09","location":"Deutschland","climbingDifficulty":"6c-7c","interests":"Klettern, Mountainbiken, Skifahren, Fotografie","isConfirmed":true},
{"name":"Laura Wagner","email":"laura.wagner@example.com","birthday":"1998-05-28","location":"Österreich","climbingDifficulty":"5c-6c","interests":"Bouldern, Yoga, Lesen, Malen","isConfirmed":true},
{"name":"Felix Schmitt","email":"felix.schmitt@example.com","birthday":"1991-08-14","location":"Deutschland","climbingDifficulty":"7b-8b","interests":"Bergsteigen, Wandern, Snowboarden, Fotografie","isConfirmed":true},
{"name":"Paula Müller","email":"paula.mueller@example.com","birthday":"1995-03-21","location":"Österreich","climbingDifficulty":"4c-5c","interests":"Skaten, Radfahren, Tauchen, Reisen","isConfirmed":true},
{"name":"Leonie Fischer","email":"leonie.fischer@example.com","birthday":"1997-10-06","location":"Deutschland","climbingDifficulty":"5b-6b","interests":"Surfen, Yoga, Schwimmen, Musik","isConfirmed":true},
{"name":"Tim Weber","email":"tim.weber@example.com","birthday":"1994-01-15","location":"Deutschland","climbingDifficulty":"6a-7a","interests":"Klettern, Mountainbiken, Skifahren, Fotografie","isConfirmed":true}];

// Get all users
app.get('/users', (req, res) => {
  res.json(users);
});


// Add a new user
app.post('/users', upload.single('profileImage'), (req, res) => {
  const { name, email, birthday, location, climbingDifficulty, interests, isConfirmed } = req.body;
  const id = generateUniqueId();
  const profileImage = req.file ? req.file.filename : null;
  
  const newUser = { id, name, email, birthday, location, climbingDifficulty, interests, isConfirmed, profileImage };
  users.push(newUser);
  
  res.sendStatus(201);
});

function generateUniqueId() {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 1000);
  return `${timestamp}-${random}`;
}
// Remove a user
app.delete('/users/:email', (req, res) => {
  console.log('Delete request received for email:', req.params.email);
  const email = req.params.email;
  users = users.filter((user) => user.email !== email);
  console.log('Updated users:', users);
  res.sendStatus(200);
});

// Update user details
app.put('/users/:id', (req, res) => {
  const id = Number(req.params.id);
  users = users.map((user) => {
    if (user.id === id) {
      console.log("Update backend");
      return { ...user, ...req.body };
    }
    return user;
  });
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});