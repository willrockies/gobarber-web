import React, { useCallback, useRef } from "react";
import { FiLogIn, FiMail, FiLock, FiUser, FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core"; // Import FormHandles for ref typing

import * as Yup from 'yup';

import logoImg from "../../assets/Logon.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";

import getValidationErrors from "../../utils/getValidationErrors";
import api from "../../services/api";
import { useToast } from "../../hooks/toast";
import { Container, Content, Background, AnimationContainer } from "./styles";


const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null); // Correctly typed ref
  const { addToast } = useToast();
  const navigate = useNavigate();

  // Use correct typing for the form data, if possible
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        email: Yup.string().required('E-mail obrigatorio').email('Digite um e-mail valido'),
        password: Yup.string().required('Senha obrigatorio').min(6, 'No mínimo 6 digitos')
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);
      navigate('/');
      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode fazer seu logon no GoBarber',
      })

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);
        return;
      }
      // disparar um toast 
      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer cadastro, Tente novamente.',
      });
    }
  }, [addToast, navigate]);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit} initialData={{ name: "" }} placeholder={""} onPointerEnterCapture={""} onPointerLeaveCapture={""}>
            <h1>Faça seu cadastro</h1>

            <Input icon={FiUser} name="name" placeholder="Nome" />
            <Input icon={FiMail} name="email" placeholder="E-mail" />
            <Input icon={FiLock} name="password" type="password" placeholder="Senha" />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para o login
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
