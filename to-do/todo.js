const fs = require('fs');
const colors = require('colors');

let listadotodo = [];

const guardarDb = () => {
    let data = JSON.stringify(listadotodo);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('Error:cambio no almacenado'), err;
        console.log('cambio guardado con exito!');
    });
}

const cargarDb = () => {
    //si todo sale bien obtengo la db json
    try {
        listadotodo = require('../db/data.json')
    } catch (error) { //en caso de no haber ningun registro en la db json inicializo la db como un json vacio valido []
        listadotodo = [];
    }
}

const creartarea = (descripcion) => {
    cargarDb();
    const resultado = listadotodo.find(element => element.descripcion === descripcion);
    if (resultado) {
        return `${resultado.descripcion} ya se encuentra en la lista`
    } else {
        let todo = {
            descripcion,
            completado: false
        }
        listadotodo.push(todo);
        guardarDb();
        return todo;
    }
}

const getListado = (busqueda) => {
    cargarDb();
    if (!busqueda) {
        return listadotodo;
    } else {
        const arr = listadotodo.filter(tarea => tarea.descripcion === busqueda);
        if (arr == false) {
            return [];
        } else {
            return arr;
        }
    }

}
const actualizar = (descripcion, completado = true) => {
    cargarDb();
    let index = listadotodo.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadotodo[index].completado = completado;
        guardarDb();
        return true;
    } else {
        return false;
    }
}
const borrar = (descripcion) => {
    cargarDb();
    let index = listadotodo.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadotodo.splice(index, 1);
        guardarDb();
        return `${descripcion} ha sido borrado con exito`.green;
    } else {
        return `Error al tratar de borrar ${descripcion}`.red;
    }
}

const listar = (listado) => {
    if (listado == false) {
        console.log(`No se encontraron tareas con esa descripcion`.red);
    } else {
        for (const tarea of listado) {
            console.log('========Por Hacer=========='.green);
            console.log(tarea.descripcion);
            console.log('Estado:', tarea.completado);
            console.log('==========================='.green);
        }
    }
}


module.exports = {
    creartarea,
    getListado,
    actualizar,
    borrar,
    listar
}