//CLASE JUGADOR

class Jugador{

    //CONSTRUCTOR
    constructor(color, lienzo, inx, iny, width, height){
        this.color = color;
        this.lienzo = lienzo 
        this.width = width;
        this.height = height;
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

        if(prueba>27 && prueba<this.width-27){

            this.x += nuevaX;
            
        }
    
    }
    moveY(nuevaY){
        let prueba = this.y + nuevaY;

        if(prueba>27 && prueba < this.height-127){
            this.y += nuevaY;
        }
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    setPosicion(x,y){
        this.x=x;
        this.y=y;
    }
}


