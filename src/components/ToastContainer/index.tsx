import React from "react"
import { useTransition } from 'react-spring';

import { Container } from "./styles"

import { ToastMessage } from "../../hooks/toast";
import Toast from "./Toast";

interface ToastContainerProps {
    messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
    const messagesWithTransitions = useTransition(
        messages, {
        from: { right: '-120%', opacity: 0 },
        enter: { right: '0%', opacity: 1 },
        leave: { right: '-120%', opacity: 0 },
        keys: message => message.id,
    });

    return (
        <Container>
            {messagesWithTransitions((props, item, { key }) => (
                <Toast key={key} message={item} style={props} />
            ))}

        </Container>

    );
}

export default ToastContainer;