const token = localStorage.getItem('token');
const a = document.getElementById('home')
a.innerHTML=`<h1>Hola Home</h1>`
a.innerHTML=`<h1>Token: </h1><p>${token}</p>`

fetch('https://mmedical-api-d691032dcc94.herokuapp.com/api/v1/equipos/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Aquí puedes procesar los datos y agregarlos a la tabla
    const tablaEquipos = document.getElementById('tablaEquipos');
    data.forEach(equipo => {
      const row = tablaEquipos.insertRow();
      row.innerHTML = `
        <td>${equipo.marca}</td>
        <td>${equipo.modelo}</td>
        <td>${equipo.serieEquipo}</td>
        <td>${equipo.fechaIngreso}</td>
        <td>${equipo.fechaEntrega}</td>
        <td>${equipo.detalle}</td>
        <td>${equipo.idCliente}</td>
        <td><button onclick="verEquipo(${equipo.id})">Ver</button></td>
      `;
    });
  })
  .catch(error => console.error(error));