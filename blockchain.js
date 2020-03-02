function hash_public(){
  const exec = require('child_process').exec;
  var yourscript = exec('sh src/config/2tmp.sh',(error, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
      if (error !== null) {
          console.log(`exec error: ${error}`);
      }
  });

  const readline1 = require("readline"),
              fs1 = require("fs"),
  NOMBRE_ARCHIVO1 = 'tmp1.txt';
  let hapub2 = "0";
  let lector1 = readline1.createInterface({input: fs1.createReadStream(NOMBRE_ARCHIVO1)});
           o=0;
  lector1.on("line", linea => {
    if (o==0){
       hapub2 = linea;
       console.log("hash:", hapub2);
    }
    o=o+1;
    return hapub2;
  });
}

function datos_estudiantes(id_estud,Val_hash,Val_nombre,id_gen){
  console.log('datos estudiantes blockchain')
  console.log(id_estud+' '+Val_hash+' '+Val_nombre+' '+id_gen);
}

function datos_candidatos(id_candi,Can_hash,Can_nombre,id_gen){
    console.log('datos candidatos blockchain')
    console.log(id_candi+' '+Can_hash+' '+Can_nombre+' '+id_gen);
}

  module.exports = {
      "hash_public": hash_public,
      "datos_estudiantes": datos_estudiantes
  }
