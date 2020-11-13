var lienzo;
const velocidad = 20;

//JUGADORES
var p1;
var p2;
var pelota;
var width;
var height;

//MANEJO DEL TECLADO
var teclas = [];
//MENJO DE SONIDOS
var golazo = ['./SONIDOS/gol1.mp3', './SONIDOS/gol2.mp3', './SONIDOS/gol3.mp3', './SONIDOS/gol4.mp3'];
var finpar = ['./SONIDOS/fin_1.mp3','./SONIDOS/fin_2.mp3', './SONIDOS/empate.mp3'];
//MARCADOR DE GOLES
var puntos = [0,0];
//TEMPORIZADOR
var temp = new Date(180000);

var cont = 0;

window.onload = () =>{

    lienzo = document.getElementById("lienzo").getContext("2d");
    width = document.getElementById("lienzo").width;
    height = document.getElementById("lienzo").height;

    window.onkeydown = presionar;
    window.onkeyup = presionar;


    //SE CREAN LOS DOS JUGADORES*/
    p1 = new Jugador("blue" , lienzo, 100, 440, width, height);
    p2 = new Jugador("red", lienzo, 1500, 440,  width, height);

    //SE GENERA LA PELOTA
    pelota = new Pelota(lienzo, 800, 440, p1, p2, width, height);

    let musica = new Audio();

    musica.src = "./SONIDOS/musica.mp3";

    musica.play();

    /*INICIA UN CICLO .setInterval()*/
    id = setInterval(Actualizar,20); /*VARIABLE DECLARADA DE FORMA GLOBAL*/
}

function presionar(evento){

    switch(evento.type){

        case "keydown":
            teclas[evento.keyCode] = true;
        break;

        case "keyup":
            teclas[evento.keyCode] = false;
        break;
    }

}

function mover(){

    /*WASD JUGADOR 1*/
    if (teclas && teclas[68]) {p1.moveX(velocidad); }
    if (teclas && teclas[65]) {p1.moveX(-velocidad);}
    if (teclas && teclas[87]) {p1.moveY(-velocidad);}
    if (teclas && teclas[83]) {p1.moveY(velocidad); }

    /*DIRECIONALES JUGADOR 2*/
    if (teclas && teclas[37]) {p2.moveX(-velocidad);}
    if (teclas && teclas[39]) {p2.moveX(velocidad); }
    if (teclas && teclas[38]) {p2.moveY(-velocidad);}
    if (teclas && teclas[40]) {p2.moveY(velocidad); }
    

}

function Actualizar(){
    
    /*
        SE COMPRUEBA SI EL TIEMPO ES MENOR A 0, EN CASO DE SERLO, TERMINA EL JUEGO
        SI NO, CONTINUA EL PROCESO DE CICLADO, DIBUJADO, MOVIMIENTO Y TIEMPO
    */
    if(temp.getMinutes()<=0 && temp.getSeconds()<=0){
        let son = new Audio();
        son.src = './SONIDOS/silbato.mp3';

        clearInterval(id);/*SE TERMINA EL CICLO DE INTERVALOS*/

        son.play();
        Final();
    }else{
        if(Gol()){
            pelota.setPosicion(800,440);
            p1.setPosicion(100,440);
            p2.setPosicion(1500,440);
        }
    
        mover();/*SE ACTUALIZA LA POCISION DE LOS JUGADORES*/
        lienzo.clearRect(0,0,width,height);/*SE BORRA EL CAMBAS*/
        Barra_y_Campo();
        Contador();
        Temporizador();
        pelota.pintar();
        p1.pintar();
        p2.pintar();
    }

}   

function Barra_y_Campo(){

    lienzo.beginPath();

    //BARRA
    lienzo.fillStyle = "rgba(0,0,0,0.6)";
    lienzo.fillRect(0,900,width,100);

    //CESPED
    lienzo.fillStyle = "rgb(102,180,0)";
    let v = 100;

    for(let i=120; i<1600; i+=250){
        lienzo.fillRect(i,20,v,860);
    }

    //BORDE
    lienzo.strokeStyle = "white";
    lienzo.strokeRect(20,20,width-40,860);

    lienzo.moveTo(800,880);
    lienzo.lineTo(800,20);
    lienzo.stroke();
    lienzo.closePath();

    lienzo.beginPath();
    lienzo.arc(800,440,150,0,2*Math.PI,false);
    lienzo.stroke();
    lienzo.strokeRect(20,305,100,300);
    lienzo.strokeRect(20,200,300,500);
    lienzo.strokeRect(width-320,200,300,500);
    lienzo.strokeRect(20,305,100,300);
    lienzo.strokeRect(width-120,305,100,300);
    
    lienzo.beginPath()
    lienzo.arc(320,450,100,(-Math.PI/2),(Math.PI/2),false);
    lienzo.stroke();
    lienzo.closePath();

    lienzo.beginPath()
    lienzo.arc(width-320,450,100,(Math.PI/2),(-Math.PI/2),false);
    lienzo.stroke();
    lienzo.closePath();

    lienzo.closePath();
}


function Gol(){

    let num = Math.floor(Math.random() * 4);

    let sonido = new Audio();
    sonido.src = golazo[num];

    if(pelota.getX()<30 && (pelota.getY()>305 && pelota.getY()<605)){
        sonido.play(); puntos[1]++;
        return true;
    }else if(pelota.getX()>width-30 && (pelota.getY()>305 && pelota.getY()<605)){
        sonido.play(); puntos[0]++;
        return true;
    }

    return false;
}

function Contador(){
    lienzo.font = "bold 65px Verdana";

    lienzo.beginPath();

    lienzo.fillText(puntos[0], 145,975);
    lienzo.fillText(puntos[1], 1400,975);
}

//TEMPORIZADOR
function Temporizador(){

    if(cont == 50){
        temp.setSeconds(temp.getSeconds() - 1);
        cont = 0;
    }else{
        cont++;
    }

    lienzo.beginPath();
    console.log("si");
    lienzo.fillText(temp.getMinutes()+":"+temp.getSeconds(), 730,975);
}

//PANTALLA FINAL
function Final(){

    /*SE GENERA UN OBJETO DEL TIUPO AUDIO EL CUAL REPREDUCIERA UNO DE LOS POSIBLES FINALES*/
    let finson = new Audio();
    finson.src = finpar[Math.floor(Math.random() * 2)];

    /*SE COLOCA UNA PANTALLA COLOR NEGRO OPACO*/
    lienzo.fillStyle = "rgba(0,0,0,0.8)";
    lienzo.fillRect(0,0,width,1000);

    /*MENSAJE DE QUE SE HA ACABADO EL TIEMPO*/
    lienzo.fillStyle = "rgb(102,180,0)";
    lienzo.fillText("¡SE HA ACABADO EL TIEMPO!", 270,200);

    lienzo.fillStyle = "rgb(200,180,0)";

    /*
        DEPENDINDO DEL FINAL DEL PARTIDO  DA UN MENSAJE DIFERENTE
        EN CASO DE EMPATE, TOMA EL 3ER AUDIO DEL ARREGLO Y LO REPRDOCUE
    */
    if(puntos[0] == puntos [1]){
        lienzo.fillText("EMPATE", 650,450);

        p1.setPosicion(720,500);
        p1.pintar();

        p2.setPosicion(870,500);
        p2.pintar();
        
        finson.src = finpar[2];
        finson.play();
    }else if(puntos[0]>puntos[1]){
        lienzo.fillText("¡HA GANADO EL JUGADOR AZUL!", 220,410);

        p1.setPosicion(800,500);
        p1.pintar();

        finson.play();
    }else{
        lienzo.fillText("¡HA GANADO EL JUGADOR ROJO!", 220,410);

        p2.setPosicion(800,500);
        p2.pintar();

        finson.play();
    }

    /*MENSAJE PARA LOS JUGADORES EN CASO DE QUERE VOLVER A JUGAR*/
    lienzo.fillStyle = "rgb(102,180,0)";
    lienzo.fillText("F5 JUGAR OTRA VEZ", 450,800);
}