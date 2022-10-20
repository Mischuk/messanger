import { clsx } from 'clsx';
import './Button.styles.scss';

const Button: React.FC<Props> = ({ children, className = '', onClick = () => {} }) => {
    const classNames = clsx('Button', className);

    return (
        <button className={classNames} onClick={onClick}>
            {children}
        </button>
    );
};

interface Props {
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
}

export { Button };
