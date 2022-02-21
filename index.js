const express = require('express');
const { path } = require('express/lib/application');
const fs = require('fs/promises');

const PORT = process.env.PORT || 8080;

const app = express();

app.engine('cte', async(path , options, callback)=>{
    try{
        const content = await fs.readFile(path, 'utf-8');
        const renderdHtml = content
        .replace('^^titulo$$', `${options.titulo}`)
        .replace('^^mensaje$$', `${options.mensaje}`)
        .replace('^^autor$$', `${options.autor}`)
        .replace('^^version$$', `${options.version}`)
        return callback(null, renderdHtml);

    }
    catch (error){
        return callback (new Error (error));
    }

});


app.set('views' , './views');
app.set('view engine' ,  'cte');

app.get('/cte1' , (req , res) =>{
    res.render('plantilla', {
        titulo: "Cien años de soledad",
        mensaje:"lo maximo",
        autor: "Gabo",
        version: "137.6.7",
    })
})

app.listen(PORT , ()=>{
    console.log('Server is up and running');
})