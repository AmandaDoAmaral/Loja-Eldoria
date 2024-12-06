const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const users = [
  { email: 'user1@example.com', password: bcrypt.hashSync('password1', 10) },
  { email: 'user2@example.com', password: bcrypt.hashSync('password2', 10) },
  { email: 'user3@example.com', password: bcrypt.hashSync('password3', 10) },
];

// Chave secreta para gerar o JWT
const JWT_SECRET = 'sua_chave_secreta_aqui';
cors
// Endpoint de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  // Gerar o token JWT
  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login bem-sucedido!', token });
});

// Middleware para proteger rotas
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(403).json({ message: 'Acesso negado.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido.' });
    }
    req.user = user;
    next();
  });
}

// Exemplo de rota protegida
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Conteúdo protegido', user: req.user });
});

app.listen(port, () => console.log(`API rodando na porta ${port}.`));
