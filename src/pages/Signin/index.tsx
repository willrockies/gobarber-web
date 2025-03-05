import React, { useCallback, useRef } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from '@unform/web';
import { FormHandles } from "@unform/core";
import { Link } from "react-router-dom"
import * as Yup from 'yup'
import { useAuth } from "../../hooks/auth";
import { useToast } from "../../hooks/toast";
import logoImg from "../../assets/Logon.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Content, Background, AnimationContainer } from "./styles";
import getValidationErrors from "../../utils/getValidationErrors";

interface SignFormData {
    email: string;
    password: string;
}


const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null); // Correctly typed ref
    const { signIn } = useAuth();
    const { addToast } = useToast();
    const handleSubmit = useCallback(
        async (data: SignFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail valido'),
                    password: Yup.string().required('Senha obrigatorio')
                });
                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn({
                    email: data.email,
                    password: data.password
                });

            } catch (err) {
                if (err instanceof Yup.ValidationError) {

                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);
                    return;
                }
                // disparar um toast 
                addToast({
                    type: 'error',
                    title: 'Erro na autenticação',
                    description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
                });
            }
        }, [signIn, addToast]);

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit} initialData={{ name: "" }} placeholder={""} onPointerEnterCapture={""} onPointerLeaveCapture={""}>
                        <h1>Faça seu logon</h1>

                        <Input icon={FiMail} name="email" placeholder="E-mail"></Input>
                        <Input icon={FiLock} name="password" type="password" placeholder="Senha"></Input>

                        <Button type="submit">
                            Entrar
                        </Button>
                        <a href="forgot"> Esqueci minha senha</a>
                    </Form>

                    <Link to="/signup">
                        <FiLogIn />
                        Criar Conta
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />

        </Container >
    )
}
export default SignIn;