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
      const cuerpoTabla = document.getElementById('cuerpoTabla');
      cuerpoTabla.innerHTML = '';
      data.forEach(equipo => {
        const row = cuerpoTabla.insertRow();
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

        // Botón para ver detalles del equipo
        const buttonDetails = document.createElement('button');
        buttonDetails.type = 'button';
        buttonDetails.className = 'btn btn-primary';
        buttonDetails.textContent = 'Detalles Equipo';
        buttonDetails.addEventListener('click', () => verEquipo(equipo));
        buttonCell.appendChild(buttonDetails);

        // Botón para ver detalles de facturación
        const buttonBilling = document.createElement('button');
        buttonBilling.type = 'button';
        buttonBilling.className = 'btn btn-success';
        buttonBilling.textContent = 'Detalles Facturación';
        buttonBilling.style.marginLeft = '1%';
        buttonBilling.addEventListener('click', () => verFacturacion(equipo));
        buttonCell.appendChild(buttonBilling);
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

  const btnEliminar = document.getElementById('btnEliminar');
  btnEliminar.onclick = (event) => eliminarEquipo(event, equipo.id);

  document.getElementById('btnImprimir').addEventListener('click', function () {
    var modalContent = viewModal.innerHTML;
    var printWindow = window.open('', '', 'height=800,width=1100');
    printWindow.document.write('<html><head><title>Detalles del Equipo</title></head><body>');
    printWindow.document.write(modalContent);
    printWindow.document.write('</body></html>');
    printWindow.print();
    printWindow.close();
  });
}

//Función para ver detalles de la facturación
function verFacturacion(equipo) {
  var viewModal = document.getElementById('viewModalFact');
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

  document.getElementById('btnImprimir').addEventListener('click', function () {
    var modalContent = viewModal.innerHTML;
    var printWindow = window.open('', '', 'height=800,width=1100');
    printWindow.document.write('<html><head><title>Detalles del Equipo</title></head><body>');
    printWindow.document.write(modalContent);
    printWindow.document.write('</body></html>');
    printWindow.print();
    printWindow.close();
  });
}

//Funcipon que trae los datos para verlos en Detalles
function getEquipoData(equipo) {
  const equipoData = {
    id: '<b>ID: </b>' + equipo.id,
    marca: '<b>Marca: </b>' + equipo.marca,
    modelo: '<b>Modelo: </b>' + equipo.modelo,
    fIngreso: '<b>Fecha Ingreso: </b>' + formatDate(equipo.fechaIngreso),
    fEntrega: '<b>Fecha Entrega: </b>' + formatDate(equipo.fechaEntrega),
    fMantencion: '<b>Fecha Mantencion: </b>' + formatDate(equipo.fechaMantencion),
    detalle: '<b>Detalle: </b>' + equipo.detalle,
    otroDetalle: '<b>Otro: </b>' + equipo.otroDetalle,
    accesorios: '<b>Accesorios: </b>' + equipo.accesorios,
    estado: '<b>Estado: </b>' + equipo.estado,
    razonSocial: '<b>Razón Social: </b>' + equipo.razonSocial,
    centroMedico: '<b>Centro Medico: </b>' + equipo.centroMedico,
    personaContacto: '<b>Persona Contacto: </b>' + equipo.personaContacto,
    fono: '<b>Fono: </b>' + equipo.fono,
    email: '<b>Email: </b>' + equipo.email
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
      getEquipos()
    })
    .catch(error => console.error('Error al agregar equipo:', error));
}

//Eliminar equipo
function eliminarEquipo(event, equipoId) {
  event.preventDefault();

  const confirmacion = confirm("¿Estás seguro de que deseas eliminar este equipo?");
  if (!confirmacion) return;

  fetch(`https://mmedical-api-d691032dcc94.herokuapp.com/api/v1/equipos/${equipoId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al eliminar el equipo');
      }
      getEquipos(); // Volver a cargar la lista de equipos
    })
    .catch(error => console.error('Error al eliminar equipo:', error));
}