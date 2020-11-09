//const Jugador = require("./jugador");

//import {Jugador} from './jugador'

var lienzo;
const velocidad = 10;

//JUGADORES
var p1;
var p2;

//MANEJO DEL TECLADO
var teclas = [];

window.onload = () =>{

    lienzo = document.getElementById("lienzo").getContext("2d");

    window.onkeydown = presionar;
    window.onkeyup = presionar;

    //SE CREAN LOS DOS JUGADORES*/
    p1 = new Jugador("blue" , lienzo, 100, 400);
    p2 = new Jugador("red", lienzo, 1100, 400);

    p1.Preveer(p2); p2.Preveer(p1);


    /*INICIA UN CICLO .setInterval()*/
    setInterval(Actualizar,20);
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

    mover();/*SE ACTUALIZA LA POCISION DE LOS JUGADORES*/

    lienzo.clearRect(0,0,1200,800);/*SE BORRA EL CAMBAS*/

    //SE VUELVE A PINTAR CADA JUGADOR*/
    p1.pintar();
    p2.pintar();
}   


//OTRA PARTE DEL CODIGO
class Jugador{

    //CONSTRUCTOR
    constructor(color, lienzo, inx, iny){
        this.color = color;
        this.lienzo = lienzo 
        this.x = inx;
        this.y = iny;
    }

    Preveer(jugador){
        this.jugador2 = jugador;
    }

    pintar(){
        this.lienzo.beginPath();/*INICIA EL TRAZADO*/
        this.lienzo.fillStyle = this.color;
        this.lienzo.arc(this.x,this.y,30,0,Math.PI*2,false);
        this.lienzo.fill();

        this.lienzo.lineWidth = 5;
        this.lienzo.stroke();
        this.lienzo.closePath();
    }

    moveX(nuevaX){
        let prueba = this.x + nuevaX;

        if(prueba>27 && prueba<1177){
            this.x += nuevaX;
        }
    
    }

    moveY(nuevaY){
        let prueba = this.y + nuevaY;
        if(prueba>27 && prueba < 777){
            this.y += nuevaY;
        }
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

}