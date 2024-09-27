document.addEventListener("DOMContentLoaded", function () {

  function getAPIMenu(done) {
    // Hacer una petición a la API
    const results = fetch("https://apiyummy.pythonanywhere.com/api/v1/entrantes/");
    
    results
      .then((response) => response.json())
      .then((data) => {
        done(data);
      })
      .catch((error) => {
        console.error("Error al obtener la petición a la Api", error);
      });
  }

  getAPIMenu((data) => {
    // Crear el bloque HTML
    data.forEach((menu) => {
      const contenedor = document.createRange().createContextualFragment(
        `
          <div class="anuncio" data-id="${menu.id}">
              <div class="contenido-anuncio">
                  <h3>${menu.titulo}</h3>
                  <p class="alturamin">${menu.descripcion}</p>
              </div>
          </div>
        `
      );

      const contenedorAnuncios = document.querySelector(".contenedor-anuncios");
      contenedorAnuncios.appendChild(contenedor);
    });
  });
});
