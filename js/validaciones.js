export function validar(input){
  //Data set hace referncia a todos los atributs data en el html.
  //Lo que sigue despues es el identificador del data al cual se esta apuntando.
  const tipoDeInput = input.dataset.tipo;
  if(validadores[tipoDeInput]){
    validadores[tipoDeInput](input)
  }
  console.log()
  if(input.validity.valid){
    input.parentElement.classList.remove('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = '';
  }else{
    input.parentElement.classList.add('input-container--invalid');
    input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeDeError(tipoDeInput, input);
  }
}

const tipoDeErrores = ["valueMissing", "typeMismatch", "patternMismatch", "customError"]

const mensajesDeError = {
  nombre: {
    valueMissing: 'Este campo no puede estar vacío',
  },
  email: {
    valueMissing: 'Este campo no puede estar vacío',
    typeMismatch: 'El correo no es valido',
  },
  password: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'La contraseña debe contener al menos 6 caracteres (máximo 12), una letra minúscula, una mayúscula, un número y no puede contener caracteres especiales',
  },
  fechaNacimiento: {
    valueMissing: 'Este campo no puede estar vacío',
    customError: 'Debes tener al menos 18 años de edad',
  },
  numero: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'Ingresa solo números y sin espacios',
  },
  direccion: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'La dirección debe contener entre 10 a 40 caracteres',
  },
  ciudad: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'La ciudad debe contener máximo 40 caracteres',
  },
  estado: {
    valueMissing: 'Este campo no puede estar vacío',
    patternMismatch: 'El estado debe contener máximo 40 caracteres',
  }
}

const validadores = {
  fechaNacimiento: input => validarEdad(input),
}


function mostrarMensajeDeError(tipoDeInput, input){
  let mensaje = '';
  tipoDeErrores.forEach( error => {
    if(input.validity[error]){
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  })
  return mensaje;
}


function validarEdad(input) {
  const fechaNacimiento = new Date(input.value);
  let mensaje = "";
  if (!esMayorDeEdad(fechaNacimiento))
    mensaje = "Debes tener al menos 18 años de edad";
  input.setCustomValidity(mensaje);
}

function esMayorDeEdad(fecha) {
  const fechaActual = new Date();
  const fechaNacimientoUsuario = new Date(
    fecha.getUTCFullYear() + 18,
    fecha.getUTCMonth(),
    fecha.getUTCDate()
  );
  return fechaActual >= fechaNacimientoUsuario;
}
