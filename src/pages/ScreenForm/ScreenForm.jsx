import "./ScreenForm.css";
import { useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

//Select
import Select from "react-select";
const options = [
  {
    value: "Web development",
    label: (
      <>
        Web development :<FaHtml5 size={20} /> <FaCss3 size={20} />{" "}
        <FaJs size={20} />
      </>
    ),
  },
  {
    value: "Full Stack",
    label: (
      <>
        Full Stack: <FaReact size={20} /> <AiOutlineDotNet size={20} />{" "}
        <SiPostgresql size={20} />
      </>
    ),
  },
  {
    value: "DataBase",
    label: (
      <>
        DataBase: <FaDatabase size={20} />
      </>
    ),
  },
  {
    value: "Machine Learning",
    label: (
      <>
        Machine Learning: <FaPython size={20} /> <BiMath size={20} />
      </>
    ),
  },
];
//icons
import { TbSchool } from "react-icons/tb";
import {
  FaHtml5,
  FaJs,
  FaCss3,
  FaReact,
  FaDatabase,
  FaPython,
} from "react-icons/fa";
import { AiOutlineDotNet } from "react-icons/ai";
import { SiPostgresql } from "react-icons/si";
import { BiMath } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";

function ScreenForm() {
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [name, setName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [course, setCourse] = useState("");

  const customStyles = {
    control: (base) => ({
      ...base,
      backgroundColor: "#f9f9f9",
      borderRadius: "18px",
      border: "1px solid rgb(98, 0, 255);",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "border-color 0.3s ease-in-out",
      width: "100%",
      paddingLeft: "10px",
    }),
  };

  function telefoneFormatado(telefone) {
    return telefone
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4,5})(\d)/, "$1-$2");
  }
  function formatarCPF(cpf) {
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  function handleCpfChange(event) {
    const formattedCpf = formatarCPF(event.target.value);
    setCpf(formattedCpf);
  }
  function handleTelefoneChange(event) {
    const formattedTelefone = telefoneFormatado(event.target.value);
    setTelefone(formattedTelefone);
  }

  const handleCourseChange = (selectedOption) => {
    setCourse(selectedOption.value);
  };

  async function GetDate(e) {
    try {
      e.preventDefault();
      const data = {
        Name: name,
        LastName: LastName,
        Email: email,
        NumberPhone: telefone,
        NumberIndentification: cpf,
        Course: course,
        DateCreate: new Date().toISOString(),
      };

      const res = await axios.post(
        "https://apiformcouser.onrender.com/api/FormularioCurser/formulario",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Cadastrado com sucesso");
      setCourse("");
      setName("");
      setLastName("");
      setemail("");
      setTelefone("");
      setCpf("");
    } catch (Erro) {
      console.log(Erro);
    }
  }

  return (
    <main>
      <header className="Navbar">
        <TbSchool size={50} />
        <h1>Course Form</h1>
        <TbSchool size={50} />
        <div className="Admin">
          <Link to={"/login"}>
            <RiAdminFill size={50} />
          </Link>

          <span>
            Email:Admin <br /> Senha:Admin
          </span>
        </div>
      </header>
      <div className="MainForm">
        <section>
          <form onSubmit={GetDate}>
            <div className="inputs">
              <label htmlFor="Name">Primeiro Nome</label>
              <input
                type="text"
                id="Name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="LastName">Sobrenome</label>
              <input
                type="text"
                id="LastName"
                placeholder="Optional"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="Email">E-mail</label>
              <input
                type="email"
                id="Email"
                placeholder="test@example.com"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="inputs">
              <label htmlFor="Phone">Telefone</label>
              <input
                type="text"
                id="Phone"
                placeholder="(00)00000-0000"
                value={telefone}
                onChange={handleTelefoneChange}
                maxLength={15}
              />
            </div>
            <div className="inputs">
              <label htmlFor="Cpf">Cpf</label>
              <input
                type="text"
                id="Cpf"
                placeholder="000.000.000-00"
                value={cpf}
                onChange={handleCpfChange}
                maxLength={14}
              />
            </div>
            <div className="Select">
              <label htmlFor="Course">Course</label>
              <Select
                options={options}
                styles={customStyles}
                onChange={handleCourseChange}
              />
            </div>
            <button>Submit</button>
          </form>
        </section>
      </div>
      <Outlet />
    </main>
  );
}

export default ScreenForm;
