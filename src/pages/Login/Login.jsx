import { useState } from "react";
import "./Login.css";
import axios from "axios";

import { FaRegUserCircle } from "react-icons/fa";

export default function Login() {
  function efeectClick(e) {
    e.preventDefault();
    const som = new Audio("Sound/Click.mp3");
    som.play();
  }

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://apiformcouser.onrender.com/api/AutenticacaoLogin/login",
        {
          Email: email,
          Senha: senha,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Login realizado com sucesso");
      const token = response.data.token;
      localStorage.setItem("token", token);
      window.location.href = "SeeFormWithAdmin";
    } catch (error) {
      alert("Erro ao fazer login");
      console.error(error);
    }
  }
  return (
    <div className="Container">
      <form onSubmit={login}> 
        <FaRegUserCircle size={80} className="icon" />
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
        />
        <button >Entrar</button>
      </form>
    </div>
  );
}
