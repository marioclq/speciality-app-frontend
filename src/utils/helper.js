// Expresión regular para validar email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función para validar email
export const validateEmail = (email) => {
  if (!email) {
    return 'El email es requerido';
  }
  if (!emailRegex.test(email)) {
    return 'El email no es válido';
  }
  return '';
};

// Función para validar contraseña
export const validatePassword = (password) => {
  if (!password) {
    return 'La contraseña es requerida';
  }
  if (password.length < 8) {
    return 'La contraseña debe tener al menos 8 caracteres';
  }
  if (!/\d/.test(password)) {
    return 'La contraseña debe contener al menos un número';
  }
  if (!/[a-z]/.test(password)) {
    return 'La contraseña debe contener al menos una letra minúscula';
  }
  if (!/[A-Z]/.test(password)) {
    return 'La contraseña debe contener al menos una letra mayúscula';
  }
  return '';
};

// Función para validar nombre de usuario
export const validateUsername = (username) => {
  if (!username) {
    return 'El nombre de usuario es requerido';
  }
  if (username.length < 3) {
    return 'El nombre de usuario debe tener al menos 3 caracteres';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'El nombre de usuario solo puede contener letras, números y guiones bajos';
  }
  return '';
};

// Función para validar el formulario de inicio de sesión
export const validateLoginForm = (email, password) => {
  const errors = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (emailError) {
    errors.email = emailError;
  }
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
};

// Función para validar el formulario de registro
export const validateRegisterForm = (username, email, password) => {
  const errors = {};
  const usernameError = validateUsername(username);
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);

  if (usernameError) {
    errors.username = usernameError;
  }
  if (emailError) {
    errors.email = emailError;
  }
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
};

// Función para manejar errores de la API
export const handleApiError = (error) => {
  if (error.response) {
    // El servidor respondió con un estado fuera del rango de 2xx
    return error.response.data.message || 'Ocurrió un error en el servidor';
  } else if (error.request) {
    // La petición fue hecha pero no se recibió respuesta
    return 'No se pudo conectar con el servidor. Por favor, intenta de nuevo más tarde.';
  } else {
    // Algo sucedió al configurar la petición que provocó un error
    return 'Ocurrió un error al procesar tu solicitud. Por favor, intenta de nuevo.';
  }
};

// Función para mostrar mensajes de éxito
export const getSuccessMessage = (action) => {
  switch (action) {
    case 'login':
      return 'Has iniciado sesión correctamente.';
    case 'register':
      return 'Te has registrado correctamente. Por favor, verifica tu email.';
    case 'passwordReset':
      return 'Se ha enviado un enlace para restablecer tu contraseña a tu email.';
    default:
      return 'La operación se ha realizado con éxito.';
  }
};