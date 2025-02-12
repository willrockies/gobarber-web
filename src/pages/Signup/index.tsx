import React, { useRef } from "react";
import { FiLogIn, FiMail, FiLock, FiUser, FiArrowLeft } from "react-icons/fi";

import logoImg from "../../assets/Logon.svg";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core"; // Import FormHandles for ref typing

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, Background } from "./styles";

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null); // Correctly typed ref

  // Use correct typing for the form data, if possible
  function handleSubmit(data: Record<string, any>): void {
    console.log(data); // Log form data when submitted
  }

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit} initialData={{ name: "" }} placeholder={""} onPointerEnterCapture={""} onPointerLeaveCapture={""}>
          <h1>Faça seu cadastro</h1>

          <Input icon={FiUser} name="name" placeholder="Nome" />
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input icon={FiLock} name="password" type="password" placeholder="Senha" />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="Login">
          <FiArrowLeft />
          Voltar para o login
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
