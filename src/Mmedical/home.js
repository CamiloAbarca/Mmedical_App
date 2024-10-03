const token = localStorage.getItem('token');

const marca = document.getElementById('marca')
const modelo = document.getElementById('modelo')
const serieEquipo = document.getElementById('serieEquipo')
const fechaIngreso = document.getElementById('fechaIngreso')
const fechaEntrega = document.getElementById('fechaEntrega')
const fechaMantencion = document.getElementById('fechaMantencion')
const detalle = document.getElementById('detalle')
const otroDetalle = document.getElementById('otroDetalle')
const accesorios = document.getElementById('accesorios')
const estado = document.getElementById('estado')
const razonSocial = document.getElementById('razonSocial')
const centroMedico = document.getElementById('centroMedico')
const personaContacto = document.getElementById('personaContacto')
const fono = document.getElementById('fono')
const email = document.getElementById('email')

//Función para agregar equipos a la tabla
function getEquipos() {
  fetch('https://mmedical-api-d691032dcc94.herokuapp.com/api/v1/equipos/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => response.json())
    .then(data => {
      const tablaEquipos = document.getElementById('tablaEquipos');
      tablaEquipos.innerHTML = '';
      data.forEach(equipo => {
        const row = tablaEquipos.insertRow();
        row.innerHTML = `
          <td>${equipo.marca}</td>
          <td>${equipo.modelo}</td>
          <td>${equipo.serieEquipo}</td>
          <td>${formatDate(equipo.fechaIngreso)}</td>
          <td>${formatDate(equipo.fechaEntrega)}</td>
          <td>${equipo.detalle}</td>
          <td>${equipo.estado}</td>
          <td></td>
        `;
        const buttonCell = row.cells[7];
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-primary';
        button.textContent = 'Ver';
        button.addEventListener('click', () => verEquipo(equipo));
        buttonCell.appendChild(button);
      });
    })
    .catch(error => console.error(error));
}


//Función para formatear fechas
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

//Función para ver detalles del equipo
function verEquipo(equipo) {
  var viewModal = document.getElementById('viewModal');
  var modal = new bootstrap.Modal(viewModal);
  modal.show();

  var equipoData = getEquipoData(equipo);
  document.getElementById('id-view').innerHTML = equipoData.id
  document.getElementById('marca-view').innerHTML = equipoData.marca
  document.getElementById('modelo-view').innerHTML = equipoData.modelo
  document.getElementById('fIngreso-view').innerHTML = equipoData.fIngreso
  document.getElementById('fEntrega-view').innerHTML = equipoData.fEntrega
  document.getElementById('fMantencion-view').innerHTML = equipoData.fMantencion
  document.getElementById('detalle-view').innerHTML = equipoData.detalle
  document.getElementById('otroDetalle-view').innerHTML = equipoData.otroDetalle
  document.getElementById('accesorios-view').innerHTML = equipoData.accesorios
  document.getElementById('estado-view').innerHTML = equipoData.estado
  document.getElementById('razonSocial-view').innerHTML = equipoData.razonSocial
  document.getElementById('centroMedico-view').innerHTML = equipoData.centroMedico
  document.getElementById('personaContacto-view').innerHTML = equipoData.personaContacto
  document.getElementById('fono-view').innerHTML = equipoData.fono
  document.getElementById('email-view').innerHTML = equipoData.email
}

function getEquipoData(equipo) {
  var equipoData = {
    id: 'ID: ' + equipo.id,
    marca: 'Marca: ' + equipo.marca,
    modelo: 'Modelo: ' + equipo.modelo,
    fIngreso: 'Fecha Ingreso: ' + formatDate(equipo.fechaIngreso),
    fEntrega: 'Fecha Entrega: ' + formatDate(equipo.fechaEntrega),
    fMantencion: 'Fecha Mantencion: ' + formatDate(equipo.fechaMantencion),
    detalle: 'Detalle: ' + equipo.detalle,
    otroDetalle: 'Otro: ' + equipo.otroDetalle,
    accesorios: 'Accesorios: ' + equipo.accesorios,
    estado: 'Estado: ' + equipo.estado,
    razonSocial: 'Razón Social: ' + equipo.razonSocial,
    centroMedico: 'Centro Medico: ' + equipo.centroMedico,
    personaContacto: 'Persona Contacto: ' + equipo.personaContacto,
    fono: 'Fono: ' + equipo.fono,
    email: 'Email: ' + equipo.email
  };
  return equipoData;
}

//Agrega equipos
function agregarEquipo(event) {
  event.preventDefault()
  const formFields =
  {

    marca: marca.value,
    modelo: modelo.value,
    serieEquipo: serieEquipo.value,
    fechaIngreso: fechaIngreso.value,
    fechaEntrega: fechaEntrega.value,
    fechaMantencion: fechaMantencion.value,
    detalle: detalle.value,
    otroDetalle: otroDetalle.value,
    accesorios: accesorios.value,
    estado: estado.value,
    razonSocial: razonSocial.value,
    centroMedico: centroMedico.value,
    personaContacto: personaContacto.value,
    fono: parseInt(fono.value),
    email: email.value
  }

  fetch('https://mmedical-api-d691032dcc94.herokuapp.com/api/v1/equipos/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(formFields)
  })
    .then(response => response.json())
    .then(() => {
      console.log('Se ha agregado un nuevo equipo: ')
      getEquipos()
    })
    .catch(error => console.error('Error al agregar equipo:', error));
}