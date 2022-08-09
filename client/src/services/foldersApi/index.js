import Api from './Api'

export default {
    // getFolders: async function() {
    //     return [
    //         {
    //             name: 'Programación',
    //             notes: [
    //                 {
    //                     name: 'Clase 1',
    //                     content: '<h1>Notas de programación 1</h1>'
    //                 },
    //                 {
    //                     name: 'Clase 2',
    //                     content: '<h1>Segunda clase</h1>'
    //                 },
    //             ]
    //         },
    //         {
    //             name: 'UADE',
    //             notes: [
    //                 {
    //                     name: 'Notitas',
    //                     content: '<h1>Notas de UADE</h1>'
    //                 }
    //             ]
    //         },
    //         {
    //             name: 'Videojuegos II',
    //             notes: [
    //                 {
    //                     name: 'Intro',
    //                     // content: '<h1>Notas de Videojuegos II</h1> <ol><li>Primero</li><li>Segundo</li></ol>'
    //                     content: `<h1><i style=""><font color="#f00000">Notas de Videojuegos II</font></i></h1> <ol><li><font color="#2254c9"><b>Primero</b></font></li><li><font color="#2254c9"><b>Segundo</b></font></li></ol><div><font color="#f00000"><b><br></b></font></div><div style="text-align: center;"><font color="#ffffff"><b>Este es un título</b></font></div><div style="text-align: center;"><font color="#ffffff"><b><br></b></font></div><div style="text-align: center;"><font color="#ffffff"><b><br></b></font></div><input type="checkbox"><font color="#ffffff">&nbsp;Mi checklist!</font>`
    //                 }
    //             ]
    //         },
    //     ]
    // }

    getFolders: async function() {
        return await Api().get('/')
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    createFolder: async function(body) {
        return await Api().post('/', body)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    },

    deleteFolder: async function(id) {
        return await Api().delete('/' + id)
        .then(res => {
            return res
        })
        .catch(err => {
            return err
        })
    }
}