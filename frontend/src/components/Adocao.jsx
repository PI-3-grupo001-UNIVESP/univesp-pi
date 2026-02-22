/*
  Aqui são as configurações da página do Adotante, que deve ser preenchido pelo
  voluntário do abrigo, sendo o acesso restrito ao admin,
  OBS: precisa configurar que, ao ser adotado, o animal muda de status 
  e isso deve ser sobreescrito na base
*/

import { useEffect, useState } from "react";
import axios from "axios";

export default function Adocao() {
  const [animais, setAnimais] = useState([]);
  const [animalId, setAnimalId] = useState("");
  const [nomeAdotante, setNomeAdotante] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/animais")
      .then(res => setAnimais(res.data.filter(a => a.status !== "adotado")));
  }, []);

  const registrar = async () => {
    await axios.post("http://localhost:3001/adocoes", {
      animal_id: animalId,
      nome_adotante: nomeAdotante
    });

    alert("Adoção registrada!");
  };

  return (
    <div className="container">
      <h2>Registrar Adoção</h2>

      <select onChange={e => setAnimalId(e.target.value)}>
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