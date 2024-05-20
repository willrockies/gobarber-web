import React from "react";

import { FiLogIn } from "react-icons/fi"

import logoImg from "../../assets/Logon.svg";
import { Container, Content, Background } from "./styles";

const SignIn: React.FC = () => (
    <Container>
        <Content>
            <img src={logoImg} alt="GoBarber" />

            <form>
                <h1>Faça seu logon</h1>

                <input placeholder="E-mail"></input>
                <input type="password" placeholder="Senha"></input>

                <button type="submit">
                    Entrar
                </button>
                <a href="forgot"> Esqueci Minha senha</a>
            </form>

            <a href="">
                <FiLogIn />

                Criar Conta
            </a>
        </Content>
        <Background />
    </Container>
)

export default SignIn;