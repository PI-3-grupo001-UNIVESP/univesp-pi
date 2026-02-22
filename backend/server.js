require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const multer = require("multer");
const path = require("path");

const app = express();

const XLSX = require("xlsx");
const fs = require("fs");

// ===============================
// CONFIGURAÇÕES BÁSICAS
// ===============================

app.use(cors());
app.use(express.json());

// Permitir acesso público às imagens
app.use("/uploads", express.static("uploads"));

// ===============================
// CONEXÃO COM BANCO
// ===============================

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ===============================
// CONFIGURAÇÃO DO MULTER (UPLOAD)
// ===============================

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// ===============================
// ROTAS
// ===============================

// TESTE API
app.get("/", (req, res) => {
  res.send("API Proteção Animal funcionando!");
});

// LISTAR ANIMAIS
app.get("/animais", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM animais ORDER BY id DESC");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar animais");
  }
});

// CADASTRAR ANIMAL COM IMAGEM + EXCEL
app.post("/animais", upload.single("imagem"), async (req, res) => {
  try {
    const { nome, idade, porte } = req.body;
    const imagem = req.file ? req.file.filename : null;

    // =========================
    // 1️ SALVAR NO BANCO
    // =========================
    await pool.query(
      "INSERT INTO animais (nome, idade, porte, status, imagem) VALUES ($1,$2,$3,'disponivel',$4)",
      [nome, idade, porte, imagem]
    );

    // =========================
    // 2️ GARANTIR PASTA RELATORIOS
    // =========================
    const pastaRelatorios = "./relatorios";
    if (!fs.existsSync(pastaRelatorios)) {
      fs.mkdirSync(pastaRelatorios);
    }

    const filePath = "./relatorios/animais.xlsx";

    let dados = [];

    // =========================
    // 3️ SE EXCEL EXISTIR, LER
    // =========================
    if (fs.existsSync(filePath)) {
      const workbook = XLSX.readFile(filePath);
      const sheet = workbook.Sheets["Animais"];
      if (sheet) {
        dados = XLSX.utils.sheet_to_json(sheet);
      }
    }

    // =========================
    // 4️ ADICIONAR NOVO REGISTRO
    // =========================
    dados.push({
      Nome: nome,
      Idade: idade,
      Porte: porte,
      Status: "disponivel",
      Imagem: imagem
    });

    // =========================
    // 5️ RECRIAR PLANILHA
    // =========================
    const novaPlanilha = XLSX.utils.json_to_sheet(dados);
    const novoArquivo = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(novoArquivo, novaPlanilha, "Animais");

    XLSX.writeFile(novoArquivo, filePath);

    res.json({ message: "Animal cadastrado e salvo no Excel!" });

  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao cadastrar animal");
  }
});

// LOGIN SIMPLES ADMIN
app.post("/login", (req, res) => {
  const { usuario, senha } = req.body;

  if (usuario === "admin" && senha === "1234") {
    return res.json({ autenticado: true });
  }

  return res.status(401).json({ autenticado: false });
});

// ===============================
// INICIAR SERVIDOR
// ===============================

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});