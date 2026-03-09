 /*
  Aqui fica asconfigurações da página Area de Administrador
*/

import { useState } from "react";
import CadastroAnimal from "./CadastroAnimal";
import Adocao from "./Adocao";
import Dashboard from "./Dashboard";

export default function AdminArea() {
  const [secao, setSecao] = useState("cadastro");

  return (
    <div className="container">
      <h2 className="titulo-pagina">Área do Administrador</h2>

      <div style={{ marginBottom: "30px" }}>
        <button className="primary" onClick={() => setSecao("cadastro")}>
          Cadastro de Animais
        </button>

        <button
          className="primary"
          style={{ marginLeft: "15px" }}
          onClick={() => setSecao("adocao")}
        >
          Registrar Adoção
        </button>

        <button
          className="primary"
          style={{ marginLeft: "15px" }}
          onClick={() => setSecao("dashboard")}
        >
          Dashboard
        </button>
      </div>

      {secao === "cadastro" && <CadastroAnimal />}
      {secao === "adocao" && <Adocao />}
      {secao === "dashboard" && <Dashboard />}
    </div>
  );
}