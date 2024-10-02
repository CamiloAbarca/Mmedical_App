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
        button.addEventListener('click', () => verEquipo(equipo.id));
        buttonCell.appendChild(button);
      });
    })
    .catch(error => console.error(error));
}



function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
}

function verEquipo(id) {
  console.log('Se está viendo', id)
}


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