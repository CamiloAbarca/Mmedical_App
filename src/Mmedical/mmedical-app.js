
/**
 * @returns {Object}
 */
const fetchLogin = async () => {

    const res = await fetch('https://mmedical-api-d691032dcc94.herokuapp.com/api/v1/auth/login');
    console.log(res)
}

export const TokenStore = {
    token: ''
};


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const Mmedical = (email, password, error) => {

    const btnLogin = document.getElementById('btnLogin');


    btnLogin.addEventListener('click', function () {
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const errorAlert = document.getElementById('error')

        const data = {
            email: emailValue,
            password: passwordValue
        };

        fetch('https://mmedical-api-d691032dcc94.herokuapp.com/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),

        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Credenciales incorrectas');
                }
            })
            .then(data => {
                console.log(data);
                TokenStore.token = data.token;
                localStorage.setItem('token', data.token);
                window.location.href = './src/Mmedical/home.html';
              })
            .catch(error => {
                console.error(error);
                errorAlert.removeAttribute("hidden");
            });

    });
}


