import React, {useCallback, useRef} from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from '@unform/web';
import { FormHandles } from "@unform/core";

import * as Yup from 'yup'

import logoImg from "../../assets/Logon.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Container, Content, Background } from "./styles";
import getValidationErrors from "../../utils/getValidationErrors";
const SignIn: React.FC = () => {

    const formRef = useRef<FormHandles>(null); // Correctly typed ref
    
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail valido'),
        password: Yup.string().required('Senha obrigatorio')
      });
      await schema.validate(data, {
        abortEarly: false,
      });

    } catch (err) {
      if (err instanceof Yup.ValidationError) {

        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
      }
    }
  }, []);

    return (
        <Container>
            <Content>
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

                <a href="/teste">
                    <FiLogIn />
                    Criar Conta
                </a>
            </Content>
            <Background />
        </Container>
    )
}
export default SignIn;