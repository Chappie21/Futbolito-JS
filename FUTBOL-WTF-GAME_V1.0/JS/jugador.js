//CLASE JUGADOR

class Jugador{

    //CONSTRUCTOR
    constructor(color, lienzo, inx, iny, width, height){

        this.color = color; /*COLOR DEL JUDAOR*/
        this.lienzo = lienzo  /*LIENZO DE REFERENCIA*/

         //DIMENSIONES DEL LIENZO
        this.width = width;
        this.height = height;

        //POCISION INICIAL
        this.x = inx;
        this.y = iny;
    }

    //PINTA AL JUGADOR EN EL LIENZO DE REFERENCIA
    pintar(){

        this.lienzo.beginPath();/*INICIA EL TRAZADO*/

        //DIBUJADO DEL CUERPO
        this.lienzo.fillStyle = this.color;
        this.lienzo.arc(this.x,this.y,30,0,Math.PI*2,false);
        this.lienzo.fill();

        //DIBUJADO DEL CONTORNO
        this.lienzo.lineWidth = 5;
        this.lienzo.stroke();
        this.lienzo.closePath();
    }

    moveX(nuevaX){
        let prueba = this.x + nuevaX;

          //COMPRUEBA SI LA POCISION "X" MÁS LA NUEVA ES POSINLE DE REALIZAR
        if(prueba>27 && prueba<this.width-27){
            this.x += nuevaX;
        }
    
    }
    moveY(nuevaY){
        let prueba = this.y + nuevaY;

        //COMPRUEBA SI LA POCISION "Y" MÁS LA NUEVA ES POSINLE DE REALIZAR
        if(prueba>27 && prueba < this.height-127){
            this.y += nuevaY;
        }
    }
    
    //RETORNA LA POCISION X
    getX(){
        return this.x;
    }

    //RETORNA LA POCISION Y
    getY(){
        return this.y;
    }

    //ESTABLECER UNA POCISION
    setPosicion(x,y){
        this.x=x;
        this.y=y;
    }
}


