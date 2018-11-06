// import files in mongo
load('scripts/data/fruits.js', 'scripts/data/legumes.js', 'scripts/data/recettes.js', 'scripts/data/users.js');

// DataBase Name
db = db.getSiblingDB('avocado');

// Collections Names 
db.users.insert(users);
db.products.insert(fruits);
db.products.insert(legumes);
db.recettes.insert(recettes);