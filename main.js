const $ = document.querySelector.bind(document);

//dom
const box = $('.box');
const aciertos = $('.aciertos');
const movimientos = $('.movimientos');
const tiempo = $('.tiempo');
const msg = $('.msg');
const nivel = $('.nivel');


//contenido de las cartas
const par = [
  '🙂', '🙂',
  '😉', '😉',
  '😎', '😎',
  '😍', '😍',
  '😏', '😏',
  '😁', '😁',
  '🤯', '🤯',
  '❤️', '❤️'
];

const aleatorio = par.sort(()=>(
  Math.random() - 0.5
));

//variables del juego
let carta1 = null;
let carta2 = null;
let temporizador = null;
let temp = false;
let cuentaReg = 45;
let contador = 0;
let contAciertos = 0;
let contMovimientos = 0;
let contNivel = 0;



//creación de botones (cards)
const cartas = Array.from({length: 16}, (_, i)=>{
  
  const carta = document.createElement('BUTTON');
  
  carta.setAttribute('id', aleatorio[i]);
  
  box.appendChild(carta);
  
  return carta;
  
});

//iniciar partida
const iniciar = () => {
  temporizador = setInterval(() => {
    
    tiempo.innerText = `Quedan: ${--cuentaReg}s`;
    
    if(cuentaReg === 0) { 
      clearInterval(temporizador);
      msg.innerText = 'Intentalo de nuevo 😉';
      cartas.forEach((ele) => {
        ele.disabled = true;
        ele.innerText = ele.id;
      });
      setTimeout(() => {
        if(confirm('¿Quieres volver a jugar?')){
          estadoInicial();
        }
      }, 3000);
    }
    
  }, 1000);
}

const estadoInicial = () => {
  
  carta1 = null;
  carta2 = null;
  contador = 0;
  contAciertos = 0;
  contMovimientos = 0;
  temp = false;
  
  aciertos.innerText = `Aciertos: 0`;
  movimientos.innerText = `Movimientos: 0`;
  
  cartas.forEach((ele) => {
    ele.innerText = '';
    ele.disabled = false;
  });
}

const subirNivel = () => {
  
  setTimeout(estadoInicial, 3000);
  
  const niveles = [
    'Nivel: 1',
    'Nivel: 2',
    'Nivel: 3',
    'Nivel: 4',
    'Nivel: 5'
  ];
  
  if(contNivel === 0){
    nivel.innerText = niveles[contNivel];
    cuentaReg = 45;
    tiempo.innerText = `Tiempo: ${cuentaReg}s`;
  }else if(contNivel === 1) {
    nivel.innerText = niveles[contNivel];
    cuentaReg = 40;
    tiempo.innerText = `Tiempo: ${cuentaReg}s`;
  }else if(contNivel === 2){
    nivel.innerText = niveles[contNivel];
    cuentaReg = 35;
    tiempo.innerText = `Tiempo: ${cuentaReg}s`;
  }else if(contNivel === 3) {
    nivel.innerText = niveles[contNivel];
    cuentaReg = 30;
    tiempo.innerText = `Tiempo: ${cuentaReg}s`;
  }else if(contNivel === 4) {
    nivel.innerText = niveles[contNivel];
    cuentaReg = 25;
    tiempo.innerText = `Tiempo: ${cuentaReg}s`;
  } else {
    alerta("Superaste todos los niveles");
    return;
  }
  contNivel++;
}

//lógica del juego
const voltearCarta = () => {
  
  box.addEventListener('click', event => {
    event.preventDefault();
    
    contador++;
    
    if(!temp) {
      iniciar();
      msg.innerText = 'No te distraigas 🧐';
      temp = true;
    }
    
    if(contador === 1){
      
      const index = cartas.indexOf(event.target);
      carta1 = cartas[index];
      
      carta1.innerText = carta1.id;
      carta1.disabled = true;
      
    }else if(contador === 2){
      
      const index = cartas.indexOf(event.target);
      carta2 = cartas[index];
      
      carta2.innerText = carta2.id;
      carta2.disabled = true;
      
      movimientos.innerText = `Movimientos: ${++contMovimientos}`;
      
       if(carta1.id == carta2.id){
          aciertos.innerText = `Aciertos: ${++contAciertos}`;
          contador = 0;
          
          if(contAciertos === 8){
            clearInterval(temporizador);
            msg.innerText = '¡Lo has logrado 🥰!';
            
            subirNivel();
            
          }
          
        }else{
          
          setTimeout(() => {
            carta1.innerText = '';
            carta2.innerText = '';
            carta1.disabled = false;
            carta2.disabled = false;
            contador = 0;
          }, 800);
          
        }
     }
  });
}

window.onload = voltearCarta;
