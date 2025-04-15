interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return <div style={{ color: 'red' }}>{message}</div>;
};

export default ErrorAlert;
