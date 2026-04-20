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
    try {
      if (!nome || !idade || !porte) {
        return alert("Preencha todos os campos!");
      }

      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("idade", idade);
      formData.append("porte", porte);

      if (imagem) {
        formData.append("imagem", imagem);
      }

      await axios.post("http://localhost:3001/animais", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Animal cadastrado com sucesso!");

      // 🔄 limpar formulário
      setNome("");
      setIdade("");
      setPorte("");
      setImagem(null);

      // 🔄 limpar input file manualmente
      document.querySelector('input[type="file"]').value = "";

    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar animal");
    }
  };

  return (
    <div className="container">
      <h2 className="titulo-pagina">Cadastrar Animal</h2>

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

      <select value={porte} onChange={e => setPorte(e.target.value)}>
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