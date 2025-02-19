import { Container } from "./styles";
import { PropsWithChildren } from "react";
interface TooltipProps {
    title: string;
    className?: string;
}

const Tooltip: React.FC<PropsWithChildren<TooltipProps>> = ({
    title,
    className = '',
    children,
}) => {
    return (
        <Container className={className}>
            {children}
            <span>{title}</span>
        </Container>
    );
};

export default Tooltip;