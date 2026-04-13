/*
  Aqui são as configurações da página do Adotante, que deve ser preenchido pelo
  voluntário do abrigo, sendo o acesso restrito ao admin,
  OBS: ao ser adotado, o animal muda de status 
  e isso deve ser sobreescrito na base
*/

/*
  Página de registro de adoção
*/

import { useEffect, useState } from "react";
import axios from "axios";

export default function Adocao() {
  const [animais, setAnimais] = useState([]);
  const [animalId, setAnimalId] = useState("");
  const [nomeAdotante, setNomeAdotante] = useState("");

  const carregarAnimais = () => {
    axios.get("http://localhost:3001/animais")
      .then(res =>
        setAnimais(res.data.filter(a => a.status !== "adotado"))
      );
  };

  useEffect(() => {
    carregarAnimais();
  }, []);

  const registrar = async () => {
    try {
      if (!animalId || !nomeAdotante) {
        return alert("Preencha todos os campos!");
      }

      await axios.post("http://localhost:3001/adocoes", {
        animal_id: animalId,
        nome_adotante: nomeAdotante
      });

      alert("Adoção registrada com sucesso!");

      setAnimalId("");
      setNomeAdotante("");

      // 🔄 Atualiza lista automaticamente
      carregarAnimais();

    } catch (error) {
      console.error(error);
      alert("Erro ao registrar adoção");
    }
  };

  return (
    <div className="container">
      <h2 className="titulo-pagina">Registrar Adoção</h2>

      <select value={animalId} onChange={e => setAnimalId(e.target.value)}>
        <option value="">Selecione o animal</option>
        {animais.map(a => (
          <option key={a.id} value={a.id}>
            {a.nome}
          </option>
        ))}
      </select>

      <input
        placeholder="Nome do adotante"
        value={nomeAdotante}
        onChange={e => setNomeAdotante(e.target.value)}
      />

      <br />

      <button className="primary" onClick={registrar}>
        Registrar
      </button>
    </div>
  );
}