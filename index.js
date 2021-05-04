window.addEventListener('load', () => {


    //Referencias al DOM
    const cards = document.querySelector('.cards');
    const callButton = document.querySelector('#llamado');
    const deleteHTML = document.querySelector('#borrarLlamado');


    //listeners 
    cargarListeners();

    function cargarListeners() {
        callButton.addEventListener('click', () => {
            llamarPersonajes();
        });

        deleteHTML.addEventListener('click', () => {
            limpiarHTML();
        })
    };

    //Peticion a la API
    const llamarPersonajes = async () => {

        //Llamada a la API utilizando async/await. Extraemos la data y de ahi extraemos los results (los obj con los personajes) y renombramos la variable
        const { data: { results: personajes } } = await axios.get('https://rickandmortyapi.com/api/character');
        crearCard(personajes);

    };


    //Mostrar resultados en el HTML
    function crearCard(personajes) {

        //Asignacion de peropiedades por cada personaje
        personajes.map(personaje => {

            const {location: {name: planeta}} = personaje;

            //crear el contenedor padre card
            const card = document.createElement('div');
            card.classList.add('card');

            //Crear la imagen del personaje
            const img = document.createElement('img');
            img.src = personaje.image;
            img.alt = personaje.name;

            //Crear el contenedor de informacion del personaje
            const info = document.createElement('div');
            info.classList.add('info');


            //Creando y asignando la info de cada personaje
            const h2 = document.createElement('h2');
            h2.textContent = personaje.name;

            const status = document.createElement('p');
            status.textContent = `Status: ${personaje.status}`;

            const specie = document.createElement('p');
            specie.textContent = `Specie: ${personaje.species}`

            const planet = document.createElement('p');
            planet.textContent = `Lives in: ${planeta}`

            //Agregar los nodos al padre
            card.appendChild(img);
            info.appendChild(h2);
            info.appendChild(status);
            info.appendChild(specie);
            info.appendChild(planet);
            card.appendChild(info);
            cards.appendChild(card);

        });
    };

    function limpiarHTML() {
        cards.innerHTML = ''
    };

});