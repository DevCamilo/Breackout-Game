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