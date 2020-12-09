const descripcion = {
    demand: true,
    alias: 'd'
}
const busqueda = {
    default: "",
    demand: true,
    alias: 'b'
}
const status = {
    demand: true,
    alias: 's',
    default: true
}
const argv = require('yargs')
    .command('crear', 'crear una nueva tarea', { descripcion })
    .command('borrar', 'Borra una tarea', { descripcion })
    .command('listar', 'enlista todas las tareas', { busqueda })
    .command('modificar', 'modificar status de una tarea', {
        descripcion,
        status
    })
    .help()
    .argv
module.exports = {
    argv
}