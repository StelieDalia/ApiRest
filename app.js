var express = require("express")
var mysql = require("mysql")
var app = express()

app.use(express.json())

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
})


con.connect((err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log('connexion établie');
    }
})


app.get('/', (req, res)=>{
    res.send('Hello Stelie');
})

// Lister les chaussures enregistrer dans la base de données;
app.get('/api/chaussures', (req, res)=>{
    
    con.query('SELECT * FROM chaussures',(err,result)=>{
        if(err) res.status(500).send(err)
        
        res.status(200).json(result)
    })
})


//Ajouter les chaussures dans la base de données;
app.post('/api/chaussures', (req, res)=>{
    const id_marque = req.body.id_marque;
    const taille = req.body.taille;
    const couleur = req.body.couleur;
    const prix = req.body.prix;
    const nom_chaussure = req.body.nom_chaussure;

    
    con.query('INSERT INTO chaussures VALUES(NULL,?,?,?,?,?)',[id_marque,taille,couleur,prix,nom_chaussure],(err,result)=>{
        if(err)
    {
        console.log(err)
    }else{
        res.send('POSTED');
    }
    })
})

//Ajouter des marques de chaussures dans la base de données
app.post('/api/marque', (req, res)=>{
    const marque = req.body.marque;
    const logo= req.body.logo;
    
    
    con.query('INSERT INTO marque VALUES(NULL,?,?)',[marque,logo],(err,result)=>{
        if(err)
    {
        console.log(err)
    }else{
        res.send('POSTED');
    }
    })
})



app.listen(3001, (err)=>{
    if(err)
    {
        console.log(err)
    }else{
        console.log('on port 3001');
    }
})