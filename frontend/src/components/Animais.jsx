/*
  Página da lista de animais disponíveis para adoação
*/

import { useEffect, useState } from "react";
import axios from "axios";
import PageWrapper from "./PageWrapper";

export default function Animais() {
  const [animais, setAnimais] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/animais")
      .then(res => setAnimais(res.data));
  }, []);

  const disponiveis = animais.filter(a => a.status === "disponivel");
  const adotados = animais.filter(a => a.status === "adotado");

  return (
    <PageWrapper>
    <div className="container">
      
      {/* ===== DISPONÍVEIS ===== */}
      <h2 className="titulo-pagina">🐾 Animais Disponíveis para Adoção</h2>

      <div className="grid">
        {disponiveis.map(animal => (
          <div className="card" key={animal.id}>
            
            {animal.imagem && (
              <img
                src={`http://localhost:3001/uploads/${animal.imagem}`}
                alt={animal.nome}
              />
            )}

            <h3>{animal.nome}</h3>
            <p>{animal.idade} anos</p>
            <p className="status disponivel">Disponível</p>
          </div>
        ))}
      </div>

      {/* ===== ADOTADOS ===== */}
      {adotados.length > 0 && (
        <>
          <h2 className="titulo-pagina" style={{marginTop: "60px"}}>
            ❤️ Já Adotados
          </h2>

          <div className="grid">
            {adotados.map(animal => (
              <div className="card adotado" key={animal.id}>
                
                {animal.imagem && (
                  <img
                    src={`http://localhost:3001/uploads/${animal.imagem}`}
                    alt={animal.nome}
                  />
                )}

                <h3>{animal.nome}</h3>
                <p>{animal.idade} anos</p>
                <p className="status adotado">Adotado</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </PageWrapper>
  );
}