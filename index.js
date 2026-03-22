import { useState, useEffect } from "react";

export default function Home() {
  const [codigo, setCodigo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [estoque, setEstoque] = useState({});
  const [logado, setLogado] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("estoque");
    if (data) setEstoque(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("estoque", JSON.stringify(estoque));
  }, [estoque]);

  const login = () => {
    if (user === "admin" && pass === "1020") {
      setLogado(true);
    } else {
      alert("Login inválido");
    }
  };

  const entrada = () => {
    setEstoque({
      ...estoque,
      [codigo]: (estoque[codigo] || 0) + parseInt(quantidade),
    });
  };

  const saida = () => {
    setEstoque({
      ...estoque,
      [codigo]: (estoque[codigo] || 0) - parseInt(quantidade),
    });
  };

  if (!logado) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Galva App</h1>
        <input placeholder="Usuário" onChange={e => setUser(e.target.value)} /><br/><br/>
        <input placeholder="Senha" type="password" onChange={e => setPass(e.target.value)} /><br/><br/>
        <button onClick={login}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Galva App Controle de Paletes</h1>

      <input placeholder="Código" value={codigo} onChange={e => setCodigo(e.target.value)} /><br/><br/>
      <input placeholder="Quantidade" type="number" value={quantidade} onChange={e => setQuantidade(e.target.value)} /><br/><br/>

      <button onClick={entrada}>Entrada</button>
      <button onClick={saida}>Saída</button>

      <h2>Estoque</h2>
      {Object.entries(estoque).map(([cod, qtd]) => (
        <div key={cod}>{cod}: {qtd}</div>
      ))}
    </div>
  );
}