(function () {
    let id = {};
    let name = {};
    let username = {};
    let email = {};
    let phone = {};
    let btnAceptar = {};
    let btnCancelar = {};
    let arrUsers = [];
    let user={
        id:{},
        name:{},
        username:{},
        email:{},
        phone:{}
    }

    const inicializar = function () {
        traerDatosRest();
        id = document.getElementById('id');
        name = document.getElementById('name');
        username = document.getElementById('username');
        email = document.getElementById('email');
        phone = document.getElementById('phone');
        btnAceptar = document.getElementById('btnAceptar');
        btnCancelar = document.getElementById('btnCancelar');
        asociarEventos();

    }

    const traerDatosRest = async function () {
        var datos = await fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
        arrUsers = datos.map(elemento => {
            return {
                id: elemento.id,
                username: elemento.username,
                name: elemento.name,
                email: elemento.email,
                phone: elemento.phone
            }
        })
        cargarDatos();
    }
    function eliminarUsers(e){
        var control = e.target;
        var arrAux = arrUsers;
        arrUsers = arrAux.filter(e=>{
            return e.id!==parseInt(control.id)
        })
        cargarDatos();

    }

    const editarUsers =function(e){
        var control = e.target;
        arrUsers.forEach(e=>{
             if(e.id===parseInt(control.id)){
                 id.value=e.id;
                 name.value=e.name;
                 username.value=e.username;
                 phone.value=e.phone;
                 email.value=e.email;
                 btnAceptar.innerHTML='Salvar';
             }
        })
    }
    const cargarDatos = async function () {
        var tabla = document.getElementById('tbUsers');
        tabla.innerHTML = '';
        await arrUsers.forEach(e => {
            tabla.innerHTML += `
            <tr>
                <td>${e.id}</td>
                <td>${e.name}</td>
                <td>${e.username}</td>
                <td>${e.email}</td>
                <td>${e.phone}</td>
                <td>
                    <button id="${e.id}"  class="btn btn-success btnEditar">Editar</button>
                    <button id="${e.id}"  class="btn btn-danger btnEliminar">Eliminar</button>
                </td>
            </tr>
            `
        })
        var arrEdit=document.getElementsByClassName('btnEditar')
        for (let index = 0; index < arrEdit.length; index++) {
             arrEdit[index].onclick=editarUsers;;
            
        }        
        var arrEliminar=document.getElementsByClassName('btnEliminar')
        for (let index = 0; index < arrEliminar.length; index++) {
            arrEliminar[index].onclick=eliminarUsers;;
           
       }               
    }
    

    const cambiarValor = function(e){
        var control = e.target;                
        user[control.name]= 
        (control.type==='number')?parseInt(control.value):control.value;
    }

    const asociarEventos = function () {
        id.onchange = cambiarValor;
        name.onchange = cambiarValor;
        username.onchange = cambiarValor;
        email.onchange = cambiarValor;
        phone.onchange = cambiarValor;
        btnAceptar.onclick = crearUser;
        btnCancelar.onclick = cancelarUsers;
    }

    
    const crearUser = function () {
        if(btnAceptar.innerHTML==='Salvar'){
            arrUsers.forEach(e=>{
                if(e.id===parseInt(id.value)){                    
                    e.name=name.value;
                    e.username=username.value;
                    e.phone=phone.value;
                    e.email=email.value;
                    btnAceptar.innerHTML='Aceptar';
                }
           })
        }else{
            arrUsers.push(Object.assign({},user));
        }
        
        cargarDatos();
        limpiar();
    }
    const cancelarUsers = function () {
        limpiar();        
    }

    const limpiar=function(){
        id.value='';
        name.value='';
        username.value='';
        phone.value='';
        email.value='';
    }
    inicializar();

})()