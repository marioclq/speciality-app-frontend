import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  validateLoginForm,
  validateEmail,
  validatePassword,
  validateUsername,
  validateRegisterForm,
  handleApiError,
  getSuccessMessage,
} from "../../utils/helper";

// Componente de input reutilizable
const Input = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  isPassword = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center border-b border-gray-300 py-2">
      <span className="text-gray-400 mr-3">{icon}</span>
      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-gray-400 focus:outline-none"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

// Componente de botón reutilizable
const Button = ({ children, onClick, className }) => (
  <button
    onClick={onClick}
    className={`bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline hover:from-blue-600 hover:to-indigo-700 transition duration-300 ${className}`}
  >
    {children}
  </button>
);

// Componente principal de autenticación
const Autenticacion = () => {
  const [activeTab, setActiveTab] = useState("iniciar");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(email, password);
    if (Object.keys(validationErrors).length === 0) {
      // Aquí iría la lógica para enviar los datos al servidor
      // Por ahora, solo mostraremos un mensaje de éxito
      setSuccessMessage(getSuccessMessage("login"));
    } else {
      setErrors(validationErrors);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const validationErrors = validateRegisterForm(username, email, password);
    if (Object.keys(validationErrors).length === 0) {
      // Aquí iría la lógica para enviar los datos al servidor
      // Por ahora, solo mostraremos un mensaje de éxito
      setSuccessMessage(getSuccessMessage("register"));
    } else {
      setErrors(validationErrors);
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 overflow-hidden">
        <div className="text-2xl font-bold mb-6 text-center text-gray-800">
          {activeTab === "iniciar" ? "Bienvenido de vuelta" : "Únete a APP"}
        </div>

        <div className="flex mb-6">
          <button
            onClick={() => setActiveTab("iniciar")}
            className={`flex-1 py-2 transition duration-300 ${
              activeTab === "iniciar"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => setActiveTab("registrar")}
            className={`flex-1 py-2 transition duration-300 ${
              activeTab === "registrar"
                ? "text-blue-600 border-b-2 border-blue-600 font-medium"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Registrarse
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {successMessage && (
              <div className="text-green-600 mt-2">{successMessage}</div>
            )}
            {activeTab === "iniciar" ? (
              <form onSubmit={handleLogin}>
                <Input
                  icon="✉️"
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}

                <Input
                  icon="🔒"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isPassword={true}
                />

                <div className="flex items-center justify-between mt-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Recordarme
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-500 hover:text-blue-700 transition duration-300"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Button className="w-full mt-6">Iniciar Sesión</Button>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <Input
                  icon="👤"
                  type="text"
                  placeholder="Nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.username}
                  </div>
                )}
                <Input
                  icon="✉️"
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
                <Input
                  icon="🔒"
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isPassword={true}
                />
                {errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
                <div className="flex justify-center space-x-4 mt-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Hombre</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Mujer</span>
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Al registrarte, aceptas nuestros{" "}
                  <a
                    href="#"
                    className="text-blue-500 hover:text-blue-700 transition duration-300"
                  >
                    términos y condiciones
                  </a>
                </p>
                <Button className="w-full mt-6">Registrarse</Button>
              </form>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Autenticacion;
