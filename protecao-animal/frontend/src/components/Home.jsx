/*
  Homepage
*/

import PageWrapper from "./PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <div className="hero">
        <div className="hero-text">
          <h1>Nossa história</h1>
          <p>
            Somos uma ONG sem fins lucrativos que atua no resgate,
            cuidado e encaminhamento responsável de cães e gatos
            abandonados para um novo lar.
          </p>
        </div>

        <img
          src="/img/logo.png"
          alt="Animais"
          className="logo-img"
        />
      </div>
    </PageWrapper>
  );
}