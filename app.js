const argv = require('./config/yargs').argv;
const todo = require('./to-do/todo');
const colors = require('colors');

const comando = argv._[0];
switch (comando) {
    case 'crear':
        console.log(todo.creartarea(argv.descripcion));
        break;
    case 'listar':
        let listado = todo.getListado(argv.busqueda);
        todo.listar(listado)
        break;
    case 'modificar':
        console.log(todo.actualizar(argv.descripcion, argv.status));
        break;
    case 'borrar':
        console.log(todo.borrar(argv.descripcion));
        break;
    default:
        console.log('comando no reconocido');
        break;
}