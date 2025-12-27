import { useState } from 'react';
import { Button } from '../common/Button';
import { isValidEmail } from '../utils/isValidEmail';
import { Eye, EyeOff } from 'lucide-react';
import { authClient } from '../../lib/auth-client';

type LoginProps = {
  onLoginSuccess: () => void;
};

export const Login = ({ onLoginSuccess }: LoginProps) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isFormValid =
    isValidEmail(formData.email) && formData.password.length > 0;

  const signIn = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError(
          result.error.message ||
            'Credenciales incorrectas. Inténtalo de nuevo.'
        );
      } else {
        onLoginSuccess();
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Ha ocurrido un error al iniciar sesión. Inténtalo de nuevo.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="font-manrope w-screen flex item-center justify-center h-screen min-h-dvh bg-[url('/imgs/bg-login.webp')] bg-no-repeat bg-size-[150%] bg-position-[calc(50%+30px)_center]">
      <div className="flex items-center justify-center w-full h-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isFormValid) {
              signIn();
            }
          }}
          className="flex h-fit w-[90%] flex-col items-center justify-center gap-4 bg-white border border-gray-300 px-4 py-6 rounded-md"
        >
          <div className="flex flex-col items-center w-full gap-2">
            <img src="/imgs/logo.webp" width={72} alt="logo escuela" />
            <h1 className="text-3xl font-bold">Iniciar sesión</h1>
            <p className="leading-5 text-center text-gray-500 text-md">
              Inicia sesión en tu cuenta de Taekwondo de la escuela RAM
            </p>
          </div>
          <label className="w-full">
            <p className="sr-only">Correo electrónico</p>
            <input
              type="email"
              className="flex items-center w-full h-12 px-4 text-gray-900 border border-gray-300 rounded-md active:border-gray-400"
              placeholder="Correo electrónico"
              onChange={(event) => {
                setFormData({ ...formData, email: event.target.value });
                setError(null);
              }}
              value={formData.email}
              disabled={isLoading}
            />
          </label>
          <label className="relative w-full">
            <p className="sr-only">Contraseña</p>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              className="flex items-center w-full h-12 px-4 pr-12 text-gray-900 border border-gray-300 rounded-md active:border-gray-400"
              onChange={(event) => {
                setFormData({ ...formData, password: event.target.value });
                setError(null);
              }}
              value={formData.password}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700 focus:outline-none"
              aria-label={
                showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
              }
              disabled={isLoading}
            >
              {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            </button>
          </label>
          {error && (
            <div className="w-full p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
              {error}
            </div>
          )}
          <Button
            handleClick={signIn}
            type="submit"
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
          <footer>
            ¿No tienes cuenta?{' '}
            <span className="underline underline-offset-2">Pídela aquí</span>
          </footer>
        </form>
      </div>
    </section>
  );
};
