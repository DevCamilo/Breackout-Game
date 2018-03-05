var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	
	// (x , y) dan la ubicacion de la bola en el mapa 
	var x = canvas.width/2;
	var y = canvas.height-30;
	
	// (dx , dy) dan la orientación que tomará la bola
	var dx = 2;
	var dy = -2;
	
	// Se asigna el radio de la bola
	var ballRadius = 10;
	
	// Se asigna las caracteristicas de la barra
	var paddleHeight = 10;
	var paddleWidth = 75;
	var paddleX = (canvas.width-paddleWidth)/2;
	
	// Se generan las variables de control para la barra
	var rightPressed = false;
	var leftPressed = false;
	
	// Se declaran las variables correspondientes a los ladrillos
	var brickRowCount = 3;
	var brickColumnCount = 5;
	var brickWidth = 75;
	var brickHeight = 20;
	var brickPadding = 10;
	var brickOffsetTop = 30;
	var brickOffsetLeft = 30;
	
	// Se hace una matriz bidimencional para almacenar los ladrillos,
	// donde (c) serán las columnas que a su vez tendran filas (r) donde estarán los ladrillos,
	// cada ladrillo se representará con las posiciones (x) e (y) en las que se dibujarán
	var bricks = [];
	for(c=0; c<brickColumnCount; c++) {
		bricks[c] = [];
		for(r=0; r<brickRowCount; r++) {
			bricks[c][r] = { x: 0, y: 0 , status: 1};
		}
	}
	
	// Se genera una variable que almacene el puntaje
	var score = 0;
	
	// Se asignan las vidas al jugador
	var lives = 3;