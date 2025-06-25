import {React, useState, useEffect} from "react";
import "./SeeFormWithAdmin.css";
import { Link } from "react-router-dom";
import axios from "axios";

function SeeFormWithAdmin() {

  const [alunos, setAlunos] = useState([]);
  const [alunosFiltrados, setAlunosFiltrados] = useState("");
  const [alunosFiltradosPorCurso, setAlunosFiltradosPorCurso] = useState("");
  async function buscarAlunos() {
    const response = await axios.post("https://apiformcouser.onrender.com/api/FormularioCurser/BuscarAlunos",
      {
        NomeDoAluno: alunosFiltrados,
        Curso: alunosFiltradosPorCurso 
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setAlunos(response.data); 
  }

  useEffect(() => {
    if (alunosFiltrados.length > 0 || alunosFiltradosPorCurso.trim().length > 0) {
      buscarAlunos();
    }else{
      buscarAlunos();
    }
  }, [alunosFiltrados, alunosFiltradosPorCurso]);

  return (
    <div className="SeeFormWithAdminContainer">
      <header>
        <h1><Link to="/">Alunos Cadastradas</Link></h1>
      </header>
      <section>
        <div className="FormWithAdmin">
          <form>
            <div className="Inputs">
              <label htmlFor="Name">Nome Do Aluno</label>
              <input type="text" name="Name" id="Name" onChange={(e) => setAlunosFiltrados(e.target.value)} />
            </div>
            <div className="Inputs">
              <label htmlFor="Course">Curso</label>
              <select name="Course" id="Course" onChange={(e) => setAlunosFiltradosPorCurso(e.target.value)}>
                <option value="">Selecione</option>
                <option value="Web development">Web development</option>
                <option value="Full Stack">Full Stack</option>
                <option value="DataBase">DataBase</option>
                <option value="Machine">Machine Learning</option>
              </select>
            </div>
          </form>
          <div className="ResultSearch">
            <table border={1}>
              <thead>
                <tr>
                  <th>Nome Do Aluno</th>
                  <th>Telefone</th>
                  <th>Email</th>
                  <th>CPF</th>
                  <th>Curso</th>
                </tr>
              </thead>
              {alunos.map((aluno) => (
                <tbody key={aluno.id}>
                  <tr>
                    <td>{aluno.name}</td>
                    <td>{aluno.numberPhone}</td>
                    <td>{aluno.email}</td>
                    <td>{aluno.numberIndentification}</td>
                    <td>{aluno.course}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SeeFormWithAdmin;
