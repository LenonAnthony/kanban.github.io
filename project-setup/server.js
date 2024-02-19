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
  const board_code = req.body.board_code;

  board_code = `"${board_code}"`;

  console.log('board_code from request:', board_code);
  // Query the database to find a matching board_code
  connection.query(`SELECT * FROM KanbanBoards WHERE board_code = ?`, [board_code], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'Internal server error.' });
    } else if (results.length >   0) {
      // Found a match, proceed with authentication
      res.status(200).json({ message: 'Board found.' });
    } else {
      // No match found, return an error
      res.status(404).json({ message: 'Board not found.' });
    }
  });
});

app.post('/api/register', (req, res) => {
  const { board_code } = req.body;

  // Check if the board_code is blank or already exists
  if (!board_code || board_code.trim() === '') {
    console.log('Invalid board_code:', board_code); // Log to check the received board_code
    return res.status(400).json({ message: 'Código do Quadro não pode ser vazio.' });
  }

  // Check for duplicates in the database
  connection.query(`SELECT * FROM KanbanBoards WHERE board_code = ?`, [board_code], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    } else if (results.length >  0) {
      // The board_code already exists
      console.log('board_code already exists:', board_code); // Log to check if the board_code already exists
      return res.status(409).json({ message: 'Código do Quadro já está em uso.' });
    } else {
      // Insert the new board_code into the database
      connection.query(`INSERT INTO KanbanBoards (board_code) VALUES (?)`, [board_code], (error, results) => {
        if (error) {
          console.error('Database error:', error);
          return res.status(500).json({ message: 'Internal server error.' });
        } else {
          console.log('board_code registered successfully:', board_code); // Log to check if the board_code was registered successfully
          return res.status(200).json({ message: 'Quadro registrado com sucesso.' });
        }
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});