const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/yevana', {useMongoClient: true});
const Van = require('../models/Van');

// Iteration #1
const vehiculoData =   [{
  name: 'Vios',
  description:  'Coqueta y acogedora cámper ideal para escapadas de finde semana para parejas. 4 Plazas de viaje. Cama para 2 de 110x190. Techo solar practicable para tener un hotel de infinitas estrellas.',
  features:{
  motor:'1200cc',
  pax: 5,
  beds:2,
  fuel:'Gasolina'
  }
},
{
name: 'Vios',
description:  'Coqueta y acogedora cámper ideal para escapadas de finde semana para parejas. 4 Plazas de viaje. Cama para 2 de 110x190. Techo solar practicable para tener un hotel de infinitas estrellas.',
features:{
motor:'500cc',
pax: 5,
beds:1,
fuel:'Diesel'
}
}];

Vehiculo.create(vehiculoData, (err, docs) => {
    if (err) {
      throw err;
    }
  
    docs.forEach((dro) => {
      console.log(dro.name)
    });
    mongoose.connection.close();
  });



