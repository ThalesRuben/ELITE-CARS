const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Simulando um banco de dados com um arquivo JSON
const dbFilePath = './users.json';

// Função para ler os dados do arquivo
const readUsersFromFile = () => {
    if (!fs.existsSync(dbFilePath)) {
        return [];
    }
    const data = fs.readFileSync(dbFilePath);
    return JSON.parse(data);
};

// Função para escrever os dados no arquivo
const writeUsersToFile = (users) => {
    fs.writeFileSync(dbFilePath, JSON.stringify(users, null, 2));
};

// Rota para registrar um novo usuário
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const users = readUsersFromFile();

    // Verifica se o usuário já existe
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'Usuário já existe.' });
    }

    // Adiciona o novo usuário
    users.push({ email, password });
    writeUsersToFile(users);
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
});

// Rota para login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsersFromFile();

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.status(200).json({ message: 'Login bem-sucedido.' });
    } else {
        res.status(401).json({ message: 'Email ou senha incorretos.' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
