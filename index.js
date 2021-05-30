document.addEventListener('DOMContentLoaded', () => {

    //Referencias al DOM
    const cards = document.querySelector('.cards');
    const callButton = document.querySelector('#llamado');
    const deleteHTML = document.querySelector('#borrarLlamado');
    const nombreInput = document.querySelector('.formulario--input #nombre');
    const personajeInput = document.querySelector('#personajeInput');
    const formulario = document.querySelector('.formulario--input');

    callButton.disabled = true;

    //Llenamos las opciones del personajeInput por si el usuario busca un personaje comun 
    cargarPersonajesForm();


    //listeners 
    cargarListeners();

    function cargarListeners() {

        deleteHTML.addEventListener('click', () => {
            limpiarHTML();
        });

        nombreInput.addEventListener('blur', validarFormulario);

        personajeInput.addEventListener('blur', (e) => {
            const personajeBusqueda = e.target.value;
            callButton.disabled = false;

            callButton.addEventListener('click', () => {
                llamarPersonajes(personajeBusqueda);
            });
        });
    };

    //Peticion a la API
    const llamarPersonajes = async (name) => {

        //Limpiamos el HTML en caso de que el usuario haya consultado un personaje antes
        limpiarHTML();

        //Cuando el usuario realiza una busqueda, guardamos el nombre en el localStorage para que no se pierda si cierra la pagina


        try {
            //Llamada a la API utilizando async/await. Extraemos la data y de ahi extraemos los results (los obj con los personajes) y renombramos la variable
            const { data: { results: personajes } } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
            if (personajes) {
                crearCard(personajes);
                localStorage.setItem('personaje', name);
            };

        } catch (error) {
            generarError(error);
        }
    };

    //Funcion para informar de un error al usuario
    function generarError(error) {

        limpiarHTML();

        const divError = document.createElement('div');
        const errorMensaje = document.createElement('p');
        errorMensaje.textContent = error;
        divError.appendChild(errorMensaje);

        cards.appendChild(divError);
    };

    //Rellena las opciones por defecto del input select
    async function cargarPersonajesForm() {
        const { data: { results } } = await axios.get(`https://rickandmortyapi.com/api/character`);

        results.forEach(character => {
            const { name } = character;
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            personajeInput.appendChild(option);
        });
    };

    //Si el usuario realizo una busqueda, traemos ese personaje y lo volvemos a mostrar
    const personajeStorage = localStorage.getItem('personaje');
    if (personajeStorage) {
        llamarPersonajes(personajeStorage);
    };


    //Mostrar resultados en el HTML
    function crearCard(personajes) {

        //Asignacion de peropiedades por cada personaje
        personajes.map(personaje => {

            const { location: { name: planeta }, episode } = personaje;

            //crear el contenedor padre card
            const card = document.createElement('div');
            card.classList.add('card');

            //Crear el contenedor de informacion del personaje
            const info = document.createElement('div');
            info.classList.add('info');


            //Creando y asignando la info de cada personaje
            info.innerHTML = `
                <img src="${personaje.image}" alt="${personaje.name}" />
                <h2>${personaje.name}</h2>
                <p>${personaje.status}</p>
                <p>Specie: ${personaje.species}</p>
                <p>Lives in: ${planeta}</p>
                <p>Have been in ${episode.length} episodes</p>
            `;


            //Agregar los nodos al padre
            card.appendChild(info);
            cards.appendChild(card);

        });
    };

    function limpiarHTML() {
        cards.innerHTML = '';

        //Si el usuario busca otro personaje o limpia la busqueda, eliminamos la busqueda anterior del localStorage
        localStorage.removeItem('personaje');
        formulario.reset();
    };

    function validarFormulario(e) {

        if (e.target.value.length > 0) {
            let name = e.target.value;
            name = name.toLowerCase();
            e.target.classList.remove('validado-red');
            e.target.classList.add('validado-green');
            callButton.disabled = false;

            callButton.addEventListener('click', () => {
                llamarPersonajes(name);
            });

        } else {
            e.target.classList.remove('validado-green');
            e.target.classList.add('validado-red');
        };
    };

});
