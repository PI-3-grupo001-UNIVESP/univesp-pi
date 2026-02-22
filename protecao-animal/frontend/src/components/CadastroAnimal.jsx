/*
  Página de cadastro de animais disponíveis
*/

import { useState } from "react";
import axios from "axios";

export default function CadastroAnimal() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [porte, setPorte] = useState("");
  const [imagem, setImagem] = useState(null);

  const cadastrar = async () => {
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("idade", idade);
    formData.append("porte", porte);
    formData.append("imagem", imagem);

    await axios.post("http://localhost:3001/animais", formData);

    alert("Animal cadastrado!");
  };

  return (
    <div className="container">
      <h2>Cadastrar Animal</h2>

      <input
        placeholder="Nome"
        value={nome}
        onChange={e => setNome(e.target.value)}
      />

      <input
        placeholder="Idade"
        value={idade}
        onChange={e => setIdade(e.target.value)}
      />

      <select onChange={e => setPorte(e.target.value)}>
        <option value="">Selecione o porte</option>
        <option>Pequeno</option>
        <option>Médio</option>
        <option>Grande</option>
      </select>

      <input
        type="file"
        onChange={e => setImagem(e.target.files[0])}
      />

      <br />
      <button className="primary" onClick={cadastrar}>
        Salvar
      </button>
    </div>
  );
}
