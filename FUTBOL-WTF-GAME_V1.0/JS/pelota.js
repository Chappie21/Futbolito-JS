class Pelota{
    
    //CONSTRUCTOR
    constructor(lienzo, posx, posy, jugador1, jugador2, width, height){

        this.lienzo = lienzo;/*LIENZO DE REFERENCIA*/
        this.golpe = new Audio();/*OBJETO TIPO PELOTA*/
        this.pared = new Audio();

        //SONIDOS DE LA PELOTA
        this.golpe.src = './SONIDOS/golpe.mp3';
        this.pared.src = './SONIDOS/pared.mp3';

        this.dx = 0;
        this.dy = 0;
        this.velocidad = 0;
        this.x = posx;
        this.y = posy;
        this.width = width;
        this.height = height;
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
    }

    //PINTAR LA PELOTA EN LIENZO
    pintar(){
        
        this.Disparo(this.jugador1);
        this.Disparo(this.jugador2);
    
        this.lienzo.strokeStyle = "black"; 
        this.lienzo.fillStyle = "rgb(255,255,255)";
        this.lienzo.lineWidth = 3;

        
        if(this.velocidad>0){           

            if(this.x<30 || this.x>this.width-27){
                this.dx = -this.dx
                this.pared.play();
            }

            if(this.y<30 || this.y>this.height-127){
                this.dy= -this.dy;
                this.pared.play();
            }

            this.x+=this.dx; this.y+=this.dy;
            
            this.lienzo.beginPath();
            this.lienzo.arc(this.x,this.y,25,0,Math.PI*2,false);
            this.lienzo.stroke();
            this.lienzo.fill();
            this.lienzo.closePath();   

            this.velocidad-=0.6;

        }else{
            this.lienzo.beginPath();
            this.lienzo.arc(this.x,this.y,25,0,Math.PI*2,false);
            this.lienzo.stroke();
            this.lienzo.fill();
            this.lienzo.closePath();   

            this.dx = 0; this.dy = 0;
        }

    }

    Disparo(jugador){

        let dx = this.x - jugador.getX();
        let dy = this.y - jugador.getY();
    
        let distancia = Math.sqrt((dx * dx) + (dy * dy));

        if(distancia < 55){
            
            this.golpe.play();

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

            this.velocidad = 20;
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
        this.velocidad=0;
    }
}