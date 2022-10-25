import { clsx } from 'clsx';
import './Button.styles.scss';

const Button: React.FC<Props> = ({
    children,
    className = '',
    onClick = () => {},
    isLoading = false,
    disabled = false,
}) => {
    const classNames = clsx('Button', className);

    return (
        <button className={classNames} onClick={onClick} disabled={disabled}>
            <span className={clsx('Button__text', { 'is-hidden': isLoading })}>
                {children}
            </span>
            {isLoading && (
                <div className='Button__loader'>
                    <div className='lds-ring'>
                        <div />
                        <div />
                        <div />
                        <div />
                    </div>
                </div>
            )}
        </button>
    );
};

interface Props {
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
    isLoading?: boolean;
    disabled?: boolean;
}

export { Button };
