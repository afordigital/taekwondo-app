import { useState } from "react";
import { Button } from "../common/Button";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const signIn = () => {
    console.log("signIn");
  };

  return (
    <section className="font-manrope w-screen flex item-center justify-center h-screen min-h-dvh bg-[url('/imgs/bg-login.webp')] bg-no-repeat bg-size-[150%] bg-position-[center_top_-5rem]">
      <div className="flex items-center justify-center w-full h-full">
        <form className="flex h-fit w-[90%] flex-col items-center justify-center gap-4 bg-white border border-gray-300 px-4 py-6 rounded-md">
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
              }}
            />
          </label>
          <label className="w-full">
            <p className="sr-only">Contraseña</p>
            <input
              type="password"
              placeholder="Contraseña"
              className="flex items-center w-full h-12 px-4 text-gray-900 border border-gray-300 rounded-md active:border-gray-400"
              onChange={(event) => {
                setFormData({ ...formData, password: event.target.value });
              }}
            />
          </label>
          <Button handleClick={signIn}>Iniciar sesión</Button>
          <footer>
            ¿No tienes cuenta?{" "}
            <span className="underline underline-offset-2">Pídela aquí</span>
          </footer>
        </form>
      </div>
    </section>
  );
};
