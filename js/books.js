(function () {
 let id = {};
 let name = {};
 let autor = {};
 let read = {};
 let lenguage = {};
 let editorial = {};
 let btnDone = {};
 let btnCancel = {};
 let flexCheckIndeterminate = {};
 let btnSpanish = {};
 let btnEnglish = {};
 let arrBooks = [];
 let book = {
  id: {},
  name: {},
  autor: {},
  read: {},
  lenguage: {},
  editorial: {}
 }

 const inicializar = function () {
  traerDatosRest();
  id = document.getElementById('id');
  name = document.getElementById('name');
  autor = document.getElementById('autor');
  editorial = document.getElementById('editorial').value;
  btnDone = document.getElementById('btnDone');
  btnCancel = document.getElementById('btnCancel');
  asociarEventos();
 }

 const inicializarButtons = function () {
  flexCheckIndeterminate = document.getElementById("flexCheckIndeterminate").checked;
  btnSpanish = document.getElementById("btnSpanish").checked;
  btnEnglish = document.getElementById("btnEnglish").checked;

  if (flexCheckIndeterminate == true) {
   read = document.getElementById("flexCheckIndeterminate").value;
  } else {
   read = "To read";
  }

  if (btnSpanish == true) {
   lenguage = document.getElementById("btnSpanish").value;
  } else if (btnEnglish == true) {
   lenguage = document.getElementById("btnEnglish").value;
  }

  editorial = document.getElementById('editorial').value;

  crearUser();
 }


 const traerDatosRest = async function () {
  var datos = await fetch('https://raw.githubusercontent.com/aherreraj386/Lab-S2/main/books')
   .then(response => response.json())
  arrBooks = datos.map(elemento => {
   return {
    id: elemento.id,
    name: elemento.name,
    autor: elemento.autor,
    read: elemento.read,
    lenguage: elemento.lenguage,
    editorial: elemento.editorial
   }
  })
  cargarDatos();
 }
 function eliminarUsers(e) {
  var control = e.target;
  var arrAux = arrBooks;
  arrBooks = arrAux.filter(e => {
   return e.id !== parseInt(control.id)
  })
  cargarDatos();

 }

 const editarUsers = function (e) {
  var control = e.target;
  arrBooks.forEach(e => {
   if (e.id === parseInt(control.id)) {
    id.value = e.id;
    name.value = e.name;
    autor.value = e.autor;
    read.value = e.read;
    lenguage.value = e.lenguage;
    editorial.value = e.editorial;
    btnDone.innerHTML = 'Salvar';
   }
  })
 }
 const cargarDatos = async function () {
  var tabla = document.getElementById('tbBooks');
  tabla.innerHTML = '';
  await arrBooks.forEach(e => {
   tabla.innerHTML += `
         <tr>
             <td>${e.id}</td>
             <td>${e.name}</td>
             <td>${e.autor}</td>
             <td>${e.read}</td>
             <td>${e.lenguage}</td>
             <td>${e.editorial}</td>
             <td>
                 <button id="${e.id}"  class="btn btn-success btnEdit">Edit</button>
                 <button id="${e.id}"  class="btn btn-danger btnDelete">Delete</button>
             </td>
         </tr>
         `
  })
  var arrEdit = document.getElementsByClassName('btnEdit')
  for (let index = 0; index < arrEdit.length; index++) {
   arrEdit[index].onclick = editarUsers;;

  }
  var arrEliminar = document.getElementsByClassName('btnDelete')
  for (let index = 0; index < arrEliminar.length; index++) {
   arrEliminar[index].onclick = eliminarUsers;;

  }
 }


 const cambiarValor = function (e) {
  var control = e.target;
  book[control.name] =
   (control.type === 'number') ? parseInt(control.value) : control.value;
 }

 const asociarEventos = function () {
  id.onchange = cambiarValor;
  name.onchange = cambiarValor;
  autor.onchange = cambiarValor;
  read.onchange = cambiarValor;
  lenguage.onchange = cambiarValor;
  editorial.onchange = cambiarValor;
  btnDone.onclick = inicializarButtons;
  btnCancel.onclick = cancelarUsers;
 }


 const crearUser = function () {
  if (btnDone.innerHTML === 'Salvar') {
   arrBooks.forEach(e => {
    if (e.id === parseInt(id.value)) {
     e.name = name.value;
     e.autor = autor;
     e.read = read;
     e.lenguage = lenguage;
     e.editorial = editorial;
     btnDone.innerHTML = 'Done';
    }
   })
  } else {
   arrBooks.push({
    id: parseInt(id.value),
    name: name.value,
    autor: autor,
    read: read,
    lenguage: lenguage,
    editorial: editorial
   });
  }
  cargarDatos();
  limpiar();
 }




 const cancelarUsers = function () {
  limpiar();
 }

 const limpiar = function () {
  id.value = '';
  name.value = '';
  autor.value = '';
  read.value = '';
  lenguage.value = '';
  editorial.value = '';
 }
 inicializar();

})()