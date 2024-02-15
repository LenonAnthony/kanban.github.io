// server.ts
import express from 'express';
import bodyParser from 'body-parser';
import connection from './db.js';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/api/login', (req, res) => {
  const  board_code  = req.body.board_code;

  // Query the database to find a matching board_code
  connection.query(`SELECT * FROM KanbanBoards WHERE board_code = ${board_code}`, [board_code], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Internal server error.' });
    } else if (results.length >  0) {
      // Found a match, proceed with authentication
      res.status(200).json({ message: 'Board found.' });
    } else {
      // No match found, return an error
      res.status(404).json({ message: 'Board not found.' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});