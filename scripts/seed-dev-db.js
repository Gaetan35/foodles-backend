const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');

const connectionString =
  'postgresql://postgres@localhost:5432/foodles_backend_development';
const pool = new Pool({
  connectionString,
});

const clients = [
  { id: uuidv4(), email: 'jean.dupont@mail.com', credit: 50 },
  { id: uuidv4(), email: 'jane.doe@mail.com', credit: 20 },
  { id: uuidv4(), email: 'michel.martin@mail.com', credit: 10 },
];

const products = [
  {
    id: uuidv4(),
    description: 'Aiguillettes de poulet au miel et nouilles soba aux legumes',
    price: 4.9,
    imageUrl:
      'https://drive.google.com/uc?export=view&id=13Py7jpfO4h73amVj0GyEZwqHiDrHPR_7',
    stock: 5,
  },
  {
    id: uuidv4(),
    description:
      'Aiguillettes de poulet au miel semoule epicee et carottes roties',
    price: 6.9,
    imageUrl:
      'https://drive.google.com/uc?export=view&id=1s9x5FwpgRqNQKv4Yr-0niAstcfM82gpr',
    stock: 10,
  },
  {
    id: uuidv4(),
    description: 'Poulet coco curry ecrase patate douce',
    price: 4.9,
    imageUrl:
      'https://drive.google.com/uc?export=view&id=12fSpEZIVThB0bKfn0tUkqkPoe28NIud6',
    stock: 1,
  },
];

const main = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS client (
    id UUID PRIMARY KEY,
    email TEXT,
    credit FLOAT
  )`);
  await pool.query(
    'CREATE TABLE IF NOT EXISTS product (id UUID PRIMARY KEY, description TEXT, price FLOAT, imageUrl TEXT, stock INT, CONSTRAINT stock_nonnegative CHECK (stock >= 0))',
  );

  await pool.query('DELETE FROM client');
  const createClientsPromises = clients.map((client) =>
    pool.query('INSERT INTO client (id, email, credit) VALUES ($1, $2, $3)', [
      client.id,
      client.email,
      client.credit,
    ]),
  );
  await Promise.all(createClientsPromises);

  await pool.query('DELETE FROM product');
  const createProductsPromises = products.map((product) =>
    pool.query(
      'INSERT INTO product (id, description, price, imageUrl, stock) VALUES ($1, $2, $3, $4, $5)',
      [
        product.id,
        product.description,
        product.price,
        product.imageUrl,
        product.stock,
      ],
    ),
  );
  await Promise.all(createProductsPromises);
  await pool.end();
  console.log('Database seeding is done');
};

main();
