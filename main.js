import { Mmedical } from './src/Mmedical/mmedical-app';
import './login.css'

document.querySelector('#app').innerHTML = `
  <div>
    <div class="card">
      <section class="vh-100">
        <div class="container-fluid h-custom">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mmedical.cl/wp-content/uploads/2018/02/webbb2222.jpeg"
                class="img-fluid" alt="Sample image">
            </div>
          <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>
              <h1>Bienvenido</h1>
              </br>

          

          <!-- Email input -->
          <div data-mdb-input-init class="form-outline mb-4">
            <input type="email" id="email" class="form-control form-control-lg"
              placeholder="Ingrese email valido" />
            <label class="form-label" for="email_label">Email</label>
          </div>

          <!-- Password input -->
          <div data-mdb-input-init class="form-outline mb-3">
            <input type="password" id="password" class="form-control form-control-lg"
              placeholder="Ingrese Password" />
            <label class="form-label" for="password_label">Password</label>
          </div>

          <!--Alert-->
            <div id="error" class="alert alert-danger" role="alert" hidden>
              Credenciales incorrectas.
            </div>
          <!--fin alert-->

          <!-- Button login -->
          <div class="text-center text-lg-start mt-4 pt-2">
            <button id="btnLogin" type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem;">Ingresar</button>
          </div>

        </form>
      </div>
    </div>
  </div>
  <div
    class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-danger">
    <!-- Copyright -->
    <div class="text-white mb-3 mb-md-0">
      Copyright © Camilo Abarca 2024. Todos los derechos reservados.
    </div>
    <!-- Copyright -->
  </div>
</section>
    </div>
  </div>

  
`;



const email = document.querySelector('#email')
const password = document.querySelector('#password')
const error = document.querySelector('#error')
Mmedical(email, password, error)

