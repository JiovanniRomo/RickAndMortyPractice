document.addEventListener('DOMContentLoaded', () => {

    //Referencias al DOM
    const cards = document.querySelector('.cards');
    const callButton = document.querySelector('#llamado');
    const deleteHTML = document.querySelector('#borrarLlamado');
    const nombreInput = document.querySelector('.formulario--input #nombre');
    
    callButton.disabled = true;

    //listeners 
    cargarListeners();

    function cargarListeners() {

        deleteHTML.addEventListener('click', () => {
            limpiarHTML();
        });

        nombreInput.addEventListener('blur', validarFormulario);
    };

    //Peticion a la API
    const llamarPersonajes = async (name) => {

        //Llamada a la API utilizando async/await. Extraemos la data y de ahi extraemos los results (los obj con los personajes) y renombramos la variable
        const { data: { results: personajes } } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
        crearCard(personajes);
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
    };

    function validarFormulario(e) {

        if (e.target.value.length > 0) {
            let name = e.target.value;
            name = name.toLowerCase();
            nombreInput.classList.remove('validado-red');
            nombreInput.classList.add('validado-green');
            callButton.disabled = false;

            callButton.addEventListener('click', () => {
                llamarPersonajes(name);
            });

        } else {
            nombreInput.classList.remove('validado-green');
            nombreInput.classList.add('validado-red');
        };
    };
});