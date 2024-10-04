document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('searchInput');
    const resultList = document.getElementById('resultList');
    const spinner = document.querySelector('.spinner-border');
    let elementos = [];

    // Mostrar el spinner al cargar
    spinner.style.display = 'block';

    // cargar elementos
    fetch('elementos.js')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo JSON');
            }
            return response.json();
        })
        .then(data => {
            elementos = data;
          
            spinner.style.display = 'none';
          
            mostrarResultados(elementos);
        })
        .catch(error => {
            console.error('Error cargando los elementos:', error);
            
            // Ocultar el spinner en caso de error
            spinner.style.display = 'none';
        });

    function mostrarResultados(resultados) {
        resultList.innerHTML = '';
        if (resultados.length === 0) {
            resultList.innerHTML = '<li class="list-group-item">No se encontraron resultados</li>';
            return;
        }
        resultados.forEach(elemento => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = `${elemento.nombre} - ${elemento.descripcion} (Categoría: ${elemento.categoria})`;
            resultList.appendChild(li);
        });
    }

    searchInput.addEventListener('input', () => {
        if (elementos.length === 0) {
            return; 
        
        }

        const query = searchInput.value.toLowerCase();
        const resultadosFiltrados = elementos.filter(elemento => 
            elemento.nombre.toLowerCase().includes(query) || 
            elemento.categoria.toLowerCase().includes(query)
        );
        mostrarResultados(resultadosFiltrados);
    });
});
