document.addEventListener("DOMContentLoaded", function () {
  const apiURLs = {
    entrantes: "https://apiyummy.pythonanywhere.com/api/v1/entrantes/",
    principales: "https://apiyummy.pythonanywhere.com/api/v1/principales/",
    postre: "https://apiyummy.pythonanywhere.com/api/v1/postre/",
    bebida: "https://apiyummy.pythonanywhere.com/api/v1/bebida/",
    precio: "https://apiyummy.pythonanywhere.com/api/v1/precio/",
  };

  // Función genérica para obtener datos de cualquier API
  function getMenuData(url, callback) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) =>
        console.error("Error al obtener datos de la API:", error)
      );
  }

  // Función para generar la lista de menús
  function createMenuList(items, containerClass) {
    const container = document.querySelector(containerClass);
    if (container) {
      items.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.textContent = item.titulo;

        // Solo agrega la descripción si no es bebidas
        if (containerClass !== ".ul-bebidas") {
          const description = document.createElement("p");
          description.classList.add("description");
          description.textContent = item.descripcion;
          listItem.appendChild(description); // Agrega la descripción al li
        }

        container.appendChild(listItem); // Agrega el elemento al ul
      });
    }
  }

  // Obtener y mostrar Entrantes
  getMenuData(apiURLs.entrantes, (data) => {
    createMenuList(data, ".ul-entrantes");
  });

  // Obtener y mostrar Platos Principales
  getMenuData(apiURLs.principales, (data) => {
    createMenuList(data, ".ul-principales");
  });

  // Obtener y mostrar Postres
  getMenuData(apiURLs.postre, (data) => {
    createMenuList(data, ".ul-postres");
  });

  // Obtener y mostrar Bebidas (sin descripción)
  getMenuData(apiURLs.bebida, (data) => {
    createMenuList(data, ".ul-bebidas");
  });

  // Obtener y mostrar el Precio
  getMenuData(apiURLs.precio, (data) => {
    const priceElement = document.querySelector(".precio-texto");
    if (priceElement && data.length > 0) {
      priceElement.textContent = `Precio: ${data[0].precio} €`;
    }
  });

  // Después de cargar el contenido del menú:
  // const footer = document.querySelector("footer");
  // footer.style.display = "block";
});
