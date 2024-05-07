const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

const db = new sqlite3.Database('./database'); // Créer une base de données SQLite en mémoire

db.serialize(() => {
  // Créer une table
  db.run('CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, nom TEXT)')
  db.run('CREATE TABLE IF NOT EXISTS lenders (id INTEGER PRIMARY KEY, first_name TEXT, last_name TEXT, phone_number TEXT, address TEXT, username TEXT UNIQUE, password TEXT)');
  db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, description TEXT, region TEXT, category_id INTEGER, lender_id INTEGER, FOREIGN KEY (lender_id) REFERENCES lenders(id), FOREIGN KEY (category_id) REFERENCES categories(id))');
  
  // Insérer des données de test
  db.run('INSERT INTO categories (nom) VALUES (?)', ["Divers"]);
  db.run('INSERT INTO categories (nom) VALUES (?)', ["Services"]);
  db.run('INSERT INTO categories (nom) VALUES (?)', ["Outils"]);
  db.run('INSERT INTO categories (nom) VALUES (?)', ["Vehicules"]);

  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['David', 'Lebranche', '0784687655', '12 Rue de la Pipoulette 81000 Albi', 'davlebr', 'motdepasse123'])
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['Géraldine', 'Nakache', '0788451525', '12 Avenue Pipapou 12000 Rodez', 'gerna', 'motdepasse456'])
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['John', 'Doe', '1234567890', '123 Main Street', 'john_doe', 'password123']);
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['Alice', 'Smith', '9876543210', '456 Elm Street', 'alice_smith', 'password456']);
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['Michael', 'Johnson', '5551234567', '789 Oak Avenue', 'michael_johnson', 'password789']);
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['Emily', 'Brown', '2223334444', '101 Pine Road', 'emily_brown', 'passwordabc']);
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['David', 'Martinez', '9998887777', '246 Cedar Lane', 'david_martinez', 'passwordxyz']);
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['Sophia', 'Garcia', '4445556666', '369 Maple Drive', 'sophia_garcia', 'password789']);
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['William', 'Lopez', '6667778888', '777 Birch Street', 'william_lopez', 'password123']);
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['Olivia', 'Lee', '1112223333', '888 Walnut Avenue', 'olivia_lee', 'password456']);
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['James', 'Rodriguez', '7778889999', '999 Pine Lane', 'james_rodriguez', 'passwordabc']);
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['Emma', 'Wang', '3334445555', '222 Cedar Street', 'emma_wang', 'passwordxyz']);
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['Alexander', 'Hernandez', '8889990000', '333 Elm Drive', 'alexander_hernandez', 'password123']);
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['Ava', 'Gomez', '5556667777', '444 Oak Road', 'ava_gomez', 'password456']);
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['Benjamin', 'Perez', '2223334444', '555 Pine Avenue', 'benjamin_perez', 'passwordabc']);
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['Mia', 'Kim', '9990001111', '666 Cedar Lane', 'mia_kim', 'passwordxyz']);
  db.run('INSERT INTO lenders (first_name, last_name, phone_number, address, username, password) VALUES (?, ?, ?, ?, ?, ?)', ['Daniel', 'Nguyen', '3334445555', '777 Elm Street', 'daniel_nguyen', 'password123']);

  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Tondeuse HONDA', 'Je mets à disposition ma tondeuse Honda HRX, équipée de son côté gauche.', 3, 'OCT', 1]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Peinture en intérieur', 'Si besoin, je peux repeindre vos intérieurs.', 2, 'OCT', 2]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Cours particuliers', 'Je donne des cours particuliers de niveau collège', 2, 'PACA', 3]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Conseils en jardinage', 'Vous pouvez me contacter pour avoir des conseils au niveau de votre potager.', 2, 'HF', 4]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 'CRS', 5]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 'GE', 6]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 'CVL', 7]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 'NRM', 8]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 'NRM', 9]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 'NRM', 10]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 'CVL', 11]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 'IDF', 12]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 'PDL', 13]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 'ARA', 14]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 'ARA', 15]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 'ARA', 16]);
  db.run('INSERT INTO products (name, description, category_id, region, lender_id) VALUES (?, ?, ?, ?, ?)', ['Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 2, 'BFC', 17]);
});

// Endpoint pour récupérer tous les produits
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send('Internal Server Error');
    }
    res.json(rows);
  });
});

app.get('/api/products/:zone', (req, res) => {
    const zone = req.params.zone;

    const sql = 'SELECT * FROM products WHERE region = ?';
    db.all(sql, [zone], (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Internal Server Error');
      }
      res.json(rows);
    });
  });

app.get('/api/product/:id', (req, res) => {
    const productId = req.params.id;

    const sql = 'SELECT * FROM products WHERE id = ?'

    db.get(sql, [productId], (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).send('Internal Server Error');
      }
      if (!row) {
        return res.status(404).json({error: 'Product not found'})
      }
      res.json(row);
    });
  });

app.get('/api/lenders/:id', (req, res) => {
    const lenderId = req.params.id;
  
    const sql = 'SELECT * FROM lenders WHERE id = ?';
    db.get(sql, [lenderId], (err, row) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Lender not found' });
      }
      res.json(row);
    });
});

app.get('/api/categories', (req, res) => {
    db.all('SELECT * FROM categories', (err, rows) => {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Internal Server Error');
        }
        res.json(rows);
      });
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
