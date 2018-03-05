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
	
	// Se ejecuta todo el programa
	draw();