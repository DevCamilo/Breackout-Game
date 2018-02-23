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
	
	// Se crea la funcion para dibujar la bola
	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, ballRadius, 0, Math.PI*2);
		ctx.fill();
		ctx.closePath();
	}
	
	//Se crea la funcion para dibujar la barra
	function drawPaddle() {
		ctx.beginPath();
		ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
		ctx.fill();
		ctx.closePath();
	}	
	
	// Se crea la funcion para dibujar los bloques
	function drawBricks() {
		for(c=0; c<brickColumnCount; c++) {
			for(r=0; r<brickRowCount; r++) {
				if(bricks[c][r].status == 1) {
					var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
					var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
					bricks[c][r].x = brickX;
					bricks[c][r].y = brickY;
					ctx.beginPath();
					ctx.rect(brickX, brickY, brickWidth, brickHeight);
					ctx.fill();
					ctx.closePath();
				}
			}
		}
	}
	
	// Se crea la funcion que pone todo en pantalla
	function draw() {
		// Borra el frame anterior para dar la ilucion de movimiento
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// Se llama la funcion de dibujar bola para que constantemente la esté pintando en pantalla
		drawBall();
		// Se llama la funcion de dibujar barra para que constantemente la esté pintando en pantalla
		drawPaddle();
		// Se llama la funcion de dibujar los bloques para que constantemente la esté pintando en pantalla
		drawBricks();
		// Detecta una colisiones
		collisionDetection();
		// Muestra el contador de puntos del jugador
		drawScore();
		// Muestra el contador de vidas del jugador
		drawLives();
		// Se le da la direccion del movimiento a la bola
		x += dx;
		y += dy;
		// Se validan las colisiones de la bola con las paredes y las barras
		if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
			dx = -dx;
		}
		if(y + dy < ballRadius) {
			dy = -dy;
		} else if(y + dy > canvas.height-ballRadius) {
			// Se valida si la bola chocó con la barra
			if(x > paddleX && x < paddleX + paddleWidth) {
				dy = -dy;
				// De lo contrario se resta una vida 
			} else {
				lives--;
				if(!lives) {
				alert("GAME OVER");
				document.location.reload();
				}
				else {
					x = canvas.width/2;
					y = canvas.height-30;
					dx = 2;
					dy = -2;
					paddleX = (canvas.width-paddleWidth)/2;
				}
			}
		}
		// Se valida el movimiento de la barra segun los teclas oprimidas
		if(rightPressed && paddleX < canvas.width-paddleWidth) {
			paddleX += 7;
		}
		else if(leftPressed && paddleX > 0) {
			paddleX -= 7;
		}
		
		// Esta parte es la que permite la animasion mas limpia
		requestAnimationFrame(draw);
	}
	
	// Se declaran los eventos que miran las teclas oprimidas
	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);
	
	// Se valida el evento en el que se oprime la tecla
	function keyDownHandler(e) {
		if(e.keyCode == 39) {
			rightPressed = true;
		}
		else if(e.keyCode == 37) {
			leftPressed = true;
			}
		}
	// Se valida el evento en el que se suelta la tecla
	function keyUpHandler(e) {
		if(e.keyCode == 39) {
			rightPressed = false;
		}
		else if(e.keyCode == 37) {
			leftPressed = false;
		}
	}	
	
	// Esta es una forma muy rudimentaria por la cual se detecta una colision con un ladrillo,
	// lo que la hace muy rudimentaria es su tiempo de reaccion, pues recorre todo la matriz bidemensional
	// y puede que cuando pase por un ladrillo este haya sido golpeado milisegundos despues asi que puede salir errores
	function collisionDetection() {
		for(c=0; c<brickColumnCount; c++) {
			for(r=0; r<brickRowCount; r++) {
				var b = bricks[c][r];
				if(b.status == 1) {
					// Se añade el -10 para restar el radio de la bola y que el choque sea mas limpio
					if(x - 10 > b.x && x - 10 < b.x+brickWidth && y - 10 > b.y && y - 10 < b.y+brickHeight) {
						dy = -dy;
						b.status = 0;
						score++;
						// Detecta si se han roto todos los ladrillos
						if(score == brickRowCount*brickColumnCount) {
							alert("YOU WIN, CONGRATULATIONS!");
							document.location.reload();
						}
					}
				}
			}
		}
	}
	
	// Esta funsion se encarga de dibujar en patalla el puntaje del jugador
	function drawScore(){
		ctx.font = "16px Arial";
		ctx.fillText("Score: "+score, 8, 20);
	}
	
	// Esta funsion se encarga de dibujar en pantalla las vidas del jugador
	function drawLives() {
		ctx.font = "16px Arial";
		ctx.fillText("Lives: "+lives, canvas.width-65, 20);
	}
	
	// Se ejecuta todo el programa
	draw();