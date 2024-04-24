const { useSesion } = require("@/hooks/useSesion");

const NoAccount = ({ message }) => {
  const defaultMessage = "Necesitas una cuenta para esta sección xd";
  const { login, signUp } = useSesion();
  return (
    <div className="flex justify-center items-center h-[400px] flex-col">
      <h2 className="text-xl">{message || defaultMessage}</h2>
      <p>
        <span
          className="text-cyan-600 font-semibold cursor-pointer"
          onClick={login}
        >
          Inicia sesion
        </span>{" "}
        o{" "}
        <span
          className="text-cyan-600 font-semibold cursor-pointer"
          onClick={signUp}
        >
          Registrate
        </span>
      </p>
    </div>
  );
};

export default NoAccount