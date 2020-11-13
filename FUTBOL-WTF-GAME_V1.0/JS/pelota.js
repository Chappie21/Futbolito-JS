//CLASE PELOTA

class Pelota{
    
    //CONSTRUCTOR
    constructor(lienzo, posx, posy, jugador1, jugador2, width, height){

        this.lienzo = lienzo;/*LIENZO DE REFERENCIA*/
        this.golpe = new Audio();
        this.pared = new Audio();

        //SONIDOS DE LA PELOTA
        this.golpe.src = './SONIDOS/golpe.mp3';
        this.pared.src = './SONIDOS/pared.mp3';

        //INDICADORES DE MOVIMIENTO
        this.dx = 0;
        this.dy = 0;
        this.velocidad = 0;

        //POCISION INICIAL
        this.x = posx;
        this.y = posy;

        //LARGO Y ANCHO DEL LIENZO
        this.width = width;
        this.height = height;

        //ESTA AL PENDIENTO O A LA ESCUCHA DEL MOVIMEINTO DE LOS JUGADORESE
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
    }

    //PINTAR LA PELOTA EN LIENZO
    pintar(){
        
        //ESTA A LA ESCUCHA DE ALGUNA COLISION CON LOS JUAGDORES CADA VEZ QUE ES PINTADO
        this.Colision(this.jugador1);
        this.Colision(this.jugador2);
    
        this.lienzo.strokeStyle = "black"; 
        this.lienzo.fillStyle = "rgb(255,255,255)";
        this.lienzo.lineWidth = 3;

        /*
            SI LA VELOCIDAD ADQUIRIDA POR AL PELOTA ES MAYOR A 0 INCIA UN PROCESO DE DIBUJADO DE
            DESPLAZAMIENTO EN CASO DE QUE NO, LA PELOTA SE DIBUJARÁ ESTATICA EN LA ULTIMA POCISION
            ADQUIRIDA
        */
        if(this.velocidad>0){           

            //EN CASO DE COLISION CON LA PARED, SE INVIERTE EL LA DIRECCION DE MOVIMIENTO
            if(this.x<30 || this.x>this.width-27){
                this.dx = -this.dx
                this.pared.play();
            }

            if(this.y<30 || this.y>this.height-127){
                this.dy= -this.dy;
                this.pared.play();
            }

            this.x+=this.dx; this.y+=this.dy;/*SE SUMA LA VELOCIDAD CONSTANTE*/
            
            this.lienzo.beginPath();
            this.lienzo.arc(this.x,this.y,25,0,Math.PI*2,false);
            this.lienzo.stroke();
            this.lienzo.fill();
            this.lienzo.closePath();   

            this.velocidad-=0.6;/*LA VELOCIDAD O TIEMPO DE MOVIMIENTO DISMINUYE -0.6 por CAD CICLO DE DIBUJADO*/

        }else{
            this.lienzo.beginPath();
            this.lienzo.arc(this.x,this.y,25,0,Math.PI*2,false);
            this.lienzo.stroke();
            this.lienzo.fill();
            this.lienzo.closePath();   

            this.dx = 0; this.dy = 0;/*EN CASO DE TERMINAR DE DIBUJAR UN DESPLAZAMIENTO, LA VELOCIDAD CONSTANTE LLEGA A 0*/
        }

    }

    //DETECTA UNA COLISCION CON ALGÚN JUGADOR
    Colision(jugador){

        let dx = this.x - jugador.getX();
        let dy = this.y - jugador.getY();
    
        let distancia = Math.sqrt((dx * dx) + (dy * dy));

        //SI AL DISTANCIA ENTRE LA PELOTA Y EL RESPECTIVO JUAGDOR ES MENOR A 55 DETCTA COLISION
        if(distancia < 55){
            
            this.golpe.play();/*EJECUTA SONIDO DE GOLPE CON EL BALON*/

            //DEPENDIENDO DE DONDE HAYA DADO EL GOLPE EL JUGADOR, LA PELOTA SE MOVERA EN DICHA DIRECCION
            if(jugador.getX() > this.x){
                this.dx = -20;
            }
            if(jugador.getX() < this.x){
                this.dx = 20;
            }
            if(jugador.getY() < this.y){
                this.dy = 20;
            }
            if(jugador.getY() > this.y){
                this.dy = -20;
            }

            this.velocidad = 20; /*AQUIERE UNA VELOCIDAD, LA CUAL TRABAJAREMOS COMO TIEMPO DE DESPLAZAMIENTO*/
        }

    }

    //RETORNAR POCISION X
    getX(){
        return this.x;
    }

    //RETORNAR POCISION Y
    getY(){
        return this.y;
    }

    //ESTABLECER UNA NUEVA POCISION
    setPosicion(x,y){
        this.x=x;
        this.y=y;
        this.velocidad=0;
    }
}