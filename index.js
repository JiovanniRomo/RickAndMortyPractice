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

        /* Llamada con axios y sin async/await
            const { data } = await axios.get('https://rickandmortyapi.com/api/character');
            
            const [results] = data;
            .then(response => {
                const personajes = response.data.results;
                crearCard(personajes);
            })
            .catch(err => {
                console.log(err);
            })

            const {results: personajes} = data;
        */


        /* Ejemplo de llamada con fetch
            const response = await fetch('https://rickandmortyapi.com/api/character');
            const resultado = await response.json();

            const {results} = resultado
            console.log(results);
        */


        //Llamada a la API utilizando async/await
        const { data: { results: personajes } } = await axios.get('https://rickandmortyapi.com/api/character');

        crearCard(personajes);

    }


    //Mostrar resultados en el HTML
    function crearCard(personajes) {

        //Asignacion de peropiedades por cada personaje
        personajes.map(personaje => {

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


            //Agregar los nodos al padre
            card.appendChild(img);
            info.appendChild(h2);
            info.appendChild(status);
            info.appendChild(specie);
            card.appendChild(info);
            cards.appendChild(card);

        });
    };

    function limpiarHTML() {
        cards.innerHTML = ''
    };

});