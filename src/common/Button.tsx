export const Button = ({
  children,
  handleClick,
  disabled,
  type
}: {
  children: React.ReactNode;
  handleClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      type={type || 'button'}
      className={`w-full h-12 px-4 py-2 font-medium text-white rounded-md bg-primary-500 hover:phover-500 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  );
};
