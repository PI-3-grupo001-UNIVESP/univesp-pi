/*
  Página de login do Admin que vai aparecer ao clicar na área do administrador
*/

import { useState } from "react";
import axios from "axios";

export default function Login({ setLogado }) {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const entrar = async () => {
    try {
      const res = await axios.post("http://localhost:3001/login", {
        usuario,
        senha
      });

      if (res.data.autenticado) {
        setLogado(true);
      }
    } catch {
      alert("Usuário ou senha incorretos");
    }
  };

  return (
    <div className="container">
      <h2>Login Administrador</h2>

      <input
        placeholder="Usuário"
        value={usuario}
        onChange={e => setUsuario(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={e => setSenha(e.target.value)}
      />

      <br />

      <button className="primary" onClick={entrar}>
        Entrar
      </button>
    </div>
  );
}