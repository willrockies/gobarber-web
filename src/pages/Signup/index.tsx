import React from "react";

import { FiLogIn, FiMail, FiLock, FiUser, FiArrowLeft } from "react-icons/fi"

import logoImg from "../../assets/Logon.svg";

import Input from "../../components/Input";
import Button from "../../components/Button";

import { Container, Content, Background } from "./styles";

const SignUp: React.FC = () => (
    <Container>
        <Background />
        <Content>
            <img src={logoImg} alt="GoBarber" />

            <form>
                <h1>Faça seu cadastro</h1>

                <Input icon={FiUser} name="name" placeholder="Nome"></Input>
                <Input icon={FiMail} name="email" placeholder="E-mail"></Input>
                <Input icon={FiLock} name="password" type="password" placeholder="Senha"></Input>

                <Button type="submit">
                    Cadastrar
                </Button>


            </form>


            <a href="Login">
                <FiArrowLeft />
                Voltar para o login
            </a>

        </Content>

    </Container>
)

export default SignUp;