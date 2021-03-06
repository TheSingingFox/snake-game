window.onload = function() {
    const canvas = document.querySelector('#snakeGame')
    const ctx = canvas.getContext('2d')

    // Set game variables
    const boxSize = 16
    const boxAmount = canvas.width / boxSize
    let snake
    let food
    let direction
    let score
    let ableMove
    let game

    document.addEventListener('keydown', (event) => {
        if(event.keyCode == 37 && direction != 'right' && ableMove) direction = 'left'
        if(event.keyCode == 38 && direction != 'down' && ableMove) direction = 'up'
        if(event.keyCode == 39 && direction != 'left' && ableMove) direction = 'right'
        if(event.keyCode == 40 && direction != 'up' && ableMove) direction = 'down'
        if(event.keyCode == 72 && direction != 'right' && ableMove) direction = 'left'
        if(event.keyCode == 75 && direction != 'down' && ableMove) direction = 'up'
        if(event.keyCode == 76 && direction != 'left' && ableMove) direction = 'right'
        if(event.keyCode == 74 && direction != 'up' && ableMove) direction = 'down'
        ableMove = 0
    })

    start()

    const restartButton = document.querySelector('#restart')
    restartButton.addEventListener('click', start)
    
    function update() {
        // Move the snake according to the direction
        switch(direction) {
            case 'left':
                snake[0].x -= boxSize
                break
            case 'right':
                snake[0].x += boxSize
                break
            case 'up':
                snake[0].y -= boxSize
                break
            case 'down':
                snake[0].y += boxSize
                break
        }
        ableMove = 1

        // Prevents the snake from leaving the screen
        if(snake[0].x > canvas.width - boxSize) {
            snake[0].x = 0
        }
        if(snake[0].x < 0) {
            snake[0].x = canvas.width
        }
        if(snake[0].y > canvas.height - boxSize) {
            snake[0].y = 0
        }
        if(snake[0].y < 0) {
            snake[0].y = canvas.height
        }

        // Render the background
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Render the food
        ctx.fillStyle = 'green'
        ctx.fillRect(food.x, food.y, boxSize, boxSize)
    
        // Render the snake
        ctx.fillStyle = 'white'
        for(let i = 0; i < snake.length; i++) {
            ctx.fillRect(snake[i].x, snake[i].y, boxSize - 1, boxSize - 1)
        }

        // Game over when snake collider her head with her tail
        for(let i = 1; i < snake.length; i++) {
            if(snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                gameOver(game)
            }
        }

        // Create the new position of snake head
        const newPosition = {
            x: snake[0].x,
            y: snake[0].y
        }

        // If the snake gets the food
        if(snake[0].x == food.x && snake[0].y == food.y) {
            // Generate new food
            score++
            renderHud(score)
            food = randomCoords()
        } else {
            // Remove the old snake head position
            snake.pop()
        }

        snake.unshift(newPosition)
    }

    function randomCoords() {
        return {
            x: Math.floor(Math.random() * boxAmount) * boxSize,
            y: Math.floor(Math.random() * boxAmount) * boxSize
        }
    }

    function gameOver(game) {
        clearInterval(game)
        ctx.font = "72px VT323"
        let message = "Game Over"
        let textWidth = ctx.measureText(message ).width
        ctx.fillText(message, (canvas.width/2) - (textWidth / 2), 100)
    }

    function renderHud(score) {
        let selfScore = document.querySelector('#selfScore')
        selfScore.innerHTML = score
    }

    function start() {
        // Set snake head position
        snake = [
            {
                x: 32,
                y: 32
            }
        ]
        // Create the food
        food = randomCoords()
        direction = 'right'
        score = 0
        ableMove = 1
        renderHud(score)
        game = setInterval(update, 100)
    }
}
