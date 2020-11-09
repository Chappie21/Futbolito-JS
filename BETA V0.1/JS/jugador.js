//CLASE JUGADOR

class Jugador{

    //CONSTRUCTOR
    constructor(color, lienzo, inx, iny){
        this.color = color;
        this.lienzo = lienzo 
        this.x = inx;
        this.y = iny;
    }

    pintar(){
        this.lienzo.beginPath();/*INICIA EL TRAZADO*/
        this.lienzo.fillStyle = this.color;
        this.lienzo.arc(this.x,this.y,30,0,Math.PI*2,false);
        this.lienzo.fill();
        this.lienzo.stroke();
        this.lienzo.closePath();
    }

    moveX(nuevaX){
        this.x+= nuevaX;
    }

    moveY(nuevaY){
        this.y+= nuevaY;
    }

}

//module.exports = Jugador;

