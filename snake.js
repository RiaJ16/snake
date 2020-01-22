	var tecla = 0;
		window.addEventListener( "keydown", function(evento){
	tecla = evento.keyCode;
		}, false );

	var snakex = new Array();
	var snakey = new Array();
	var lienzo;
	var l;
	var mover;
	var temporal;
	var	pausa;
	var puntos;
	var longitud;
	var puntox;
	var puntoy;
	var winSound;
	var pauseSound;
	var bandera;
	var maxPuntos;

window.onload = snake;

function snake(){
	maxPuntos = 150;
	lienzo = document.getElementById("snake");
	l = lienzo.getContext("2d");
	inicializar();
	winSound = document.getElementById("winsound");
	pauseSound = document.getElementById("pausesound");
	bandera = true;
	
	setInterval(function(){
		l.fillStyle = "rgba(0,0,0,0.95)"; //color del fondo con opacidad reducida
		l.fillRect(0,0,lienzo.width,lienzo.height); //se dibuja el fondo
		l.lineWidth = 3; //tamaño de la línea
		l.strokeStyle = "white"; //color de la línea
		l.strokeRect(5,5,lienzo.width-10,lienzo.height-10); //contorno
		
		l.fillStyle = "#ffffff";
		l.font = "20px Verdana";
		l.fillText("Puntos: "+puntos,lienzo.width-175,50);
		l.fillText("Puntuacion maxima: "+maxPuntos,lienzo.width-575,50);
		
		dibujarPunto(puntox,puntoy,'rgba(0,102,102,1)','#99ff99',2);
		
		if(tecla==37&&mover!=2){ //tecla izquierda
			mover=0;
			tecla=0;
		}
		if(tecla==38&&mover!=3){ //tecla arriba
			mover=1;
			tecla=0;
		}
		if(tecla==39&&mover!=0){ //tecla derecha
			mover=2;
			tecla=0;
		}
		if(tecla==40&&mover!=1){ //tecla abajo
			mover=3;
			tecla=0;
		}
		if(tecla==32){ //barra espaciadora
			if(pausa){
				pauseSound.load();
				pauseSound.play();
				mover = temporal;
				pausa=false;
			}
			else{
				pauseSound.load();
				pauseSound.play();
				pausa=true;
				temporal = mover;
			}
			tecla=0;
		}
		
		if(pausa){
			mover = 4;
			l.lineWidth = 3;
			l.font = "70px Verdana";
			l.fillText("Pausa",lienzo.width/2-100,lienzo.height/2);
			l.strokeText("Pausa",lienzo.width/2-100,lienzo.height/2);
		}
		
		switch(mover){
			case 0: moverIzquierda();
					break;
			case 1: moverArriba();
					break;
			case 2: moverDerecha();
					break;
			case 3: moverAbajo();
					break;
			default: mover=4;
		}
	}, 50);
};

function inicializar(){
	mover = 2;
	temporal = 2;
	pausa = false;
	puntos = 0;
	longitud = 3;
	snakex[0] = 5;
	snakey[0] = 130;
	generarPunto();
}

function checarPuntaje(){
	if(puntos>maxPuntos)
		maxPuntos = puntos;
}

function checarPerder(){
	if(snakex[0]>(lienzo.width-25)||snakey[0]>(lienzo.height-25)||snakex[0]<0||snakey[0]<0){
		perder();
	}

	for(i=0;i<longitud;i++){
		if(snakex[0]==snakex[i+1]&&snakey[0]==snakey[i+1]){
			perder();
			break;
		}
	}
};

function perder(){
	for(i=0;i<longitud;i++){
		snakex[i]=-25;
		snakey[i]=-25;
	}
	inicializar();
}

function moverIzquierda(){
	for(i=longitud-1;i>=0;i--){
		snakex[i+1]=snakex[i];
		snakey[i+1]=snakey[i];
	}
	snakex[0]-=25;
	checarPerder();
	checarPunto();
	for(i=0;i<longitud;i++){
		dibujarPunto(snakex[i],snakey[i],'rgba(0,102,102,1)','#99ff99',2);
	}
	l.fillStyle = "#990066";
	l.fillRect(snakex[0],snakey[0],25,25);
	l.strokeRect(snakex[0],snakey[0],25,25);
};

function moverArriba(){
	for(i=longitud-1;i>=0;i--){
		snakex[i+1]=snakex[i];
		snakey[i+1]=snakey[i];
	}
	snakey[0]-=25;
	checarPerder();
	checarPunto();
	for(i=0;i<longitud;i++){
		dibujarPunto(snakex[i],snakey[i],'rgba(0,102,102,1)','#99ff99',2);
	}
	l.fillStyle = "#990066";
	l.fillRect(snakex[0],snakey[0],25,25);
	l.strokeRect(snakex[0],snakey[0],25,25);
};
	
function moverDerecha(){
	for(i=longitud-1;i>=0;i--){
		snakex[i+1]=snakex[i];
		snakey[i+1]=snakey[i];
	}
	snakex[0]+=25;
	checarPerder();
	checarPunto();
	for(i=0;i<longitud;i++){
		dibujarPunto(snakex[i],snakey[i],'rgba(0,102,102,1)','#99ff99',2);
	}
	l.fillStyle = "#990066";
	l.fillRect(snakex[0],snakey[0],25,25);
	l.strokeRect(snakex[0],snakey[0],25,25);
};
	
function moverAbajo(){
	for(i=longitud-1;i>=0;i--){
		snakex[i+1]=snakex[i];
		snakey[i+1]=snakey[i];
	}
	snakey[0]+=25;
	checarPerder();
	checarPunto();
	for(i=0;i<longitud;i++){
		dibujarPunto(snakex[i],snakey[i],'rgba(0,102,102,1)','#99ff99',2);
	}
	l.fillStyle = "#990066";
	l.fillRect(snakex[0],snakey[0],25,25);
	l.strokeRect(snakex[0],snakey[0],25,25);
};

function generarPunto(){
	puntox=Math.floor(Math.random()*(lienzo.width-11));
	puntoy=Math.floor(Math.random()*(lienzo.height-11));
	puntox=puntox-(puntox%25)+5;
	puntoy=puntoy-(puntoy%25)+5;
};

function ganar(){
	generarPunto();
	if(bandera){
		winSound.load();
		winSound.play();
	}
	puntos+=10;
	bandera = true;
}

function dibujarPunto(x,y,color1,color2,linea){
		l.fillStyle = color1;
		l.fillRect(x,y,25,25);
		l.lineWidth = linea;
		l.strokeStyle = color2;
		l.strokeRect(x,y,25,25);
};

function checarPunto(){
	checarPuntaje();
	if(snakex[0]==puntox&&snakey[0]==puntoy){
		ganar();
		longitud++;
	}
}