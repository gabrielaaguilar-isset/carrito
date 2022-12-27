const carrito = document.querySelector('#carrito'),
      listaCurso = document.querySelector('#lista-cursos'),
      contenedorCarrito = document.querySelector('#lista-carrito tbody'),
      vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];


cargarEventListener();

function cargarEventListener(){

    //Cuando agregas un curso presionando "Agregar al Carrito"
    listaCurso.addEventListener('click', agregarCurso);


    //Eliminar un curso
    carrito.addEventListener('click', eliminarCurso);

    //Muestra los curos de localStorange

    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
    } )

    //vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        
        limpiarHTML();
    })
}


//funciones 
function agregarCurso(e){

    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;


        leerDatosCurso(cursoSeleccionado);

    }

 
}

//Eliminar un curso del carrito
function eliminarCurso(e){

    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        //eliminar del arreglo articulosCarrito por el data id 
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        
        carritoHTML(); // Iterar sobre el carrito y mostrar el HTML
    }

}

//Lee el contenido del HTML al que le dimos click y extra la informacion del curso

function leerDatosCurso(curso){

    //crear un objeto con el contenido del curso actual
    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    }

    //Revisa si un elemento ya esta en el carrito

    const existe = articulosCarrito.some(curso => curso.id  === infoCurso.id);
    

    if(existe){
        //actualizamos la cantidad

        const cursos  = articulosCarrito.map(curso => {

            if(curso.id  === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else{
                return curso;
            }
        });

        articulosCarrito = [...cursos];

    }else{
        //agregamos el curso al carrito
         //retorna los objetos que son duplicados
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //Agrega elementos al arreglo del carrito
   
    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el carrito de ocmpras en el html
function carritoHTML(){

    //limpiar el html
    limpiarHTML();

    //Recorre el carriot y genera html
    articulosCarrito.forEach(curso => {

        const row = document.createElement('tr');
        const {imagen, titulo, precio, cantidad, id} = curso; 


       row.innerHTML = `
        <td>
            <img src="${imagen}" width="100" /> 
        </td>
        <td>
            ${titulo}
        </td>
        <td>
             ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id=${id}> X </a>
        </td>
       `; 
       //Agrega en el html del carrito el tbody
       contenedorCarrito.appendChild(row)
    });

    //Agregar el carrito de compras al Storange

    sincronizarStorange();
}

function sincronizarStorange(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}
//Eliminar los curos del tbody

function limpiarHTML(){
    //forma lenta
    // contenedorCarrito.innerHTML = ''; 

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}