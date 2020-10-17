let score = 0;

$(document).ready(function() {
    let bird = $(".bird");


    // A function to emulate gravity
    let fall = () => {
        let top = Math.round($(".bird").offset().top);
        let bottom = $(window).height() - Math.round(top + $(".bird").height());
        
        if(bottom > Math.round($(window).height() - frameTop - Math.round($(".frame").height()) - 5))
            $(bird).css("top", top + 1.5);

        checkBottomCollision();
        checkPipeCollision();
        showScore();
    }

    // Space bar key to jump
    let checkKey = (event) => {
        if(event.keyCode === 32){
            let birdTop = Math.round($(".bird").offset().top);
            let newHeight = (birdTop - 70);

            // console.log(newHeight);
            if(newHeight > frameTop)
                while(birdTop !== newHeight){
                    $(".bird").css("top", birdTop);
                    birdTop -= 2;
                }
        }
    }


    let checkBottomCollision = () => {
        let top = Math.round($(".bird").offset().top);
        let birdBottom = $(window).height() - Math.round(top + $(".bird").height());

        if(birdBottom === Math.round($(window).height() - frameTop - Math.round($(".frame").height()) + 5)){
            clearInterval(movePipe);
            clearInterval(start);
            clearInterval(trackPipe);
            alert("Game over");
                
        }
    }


    let checkPipeCollision = () => {
        let birdTop = Math.round($(".bird").offset().top);
        let birdBottom = $(window).height() - Math.round(birdTop + $(".bird").height());

        let birdLeft = Math.round($(".bird").offset().left);
        let pipeLeft = Math.round($(pipes[0]).offset().left);

        // Check whether pipe encountered or not
        if(birdLeft > pipeLeft && birdLeft > (pipeLeft + pipeWidth)){
            // console.log("Inside Pipe");

            // Check whether it is between the height
            // console.log(Math.round($(pipes[1]).offset().top));
            
            if((birdTop - frameTop + 5) < Math.round($(pipes[0]).height())){
                clearInterval(start);
                clearInterval(movePipe);
                clearInterval(trackPipe);
                alert("Game over");
            }

            if(birdTop + 30 > Math.round($(pipes[1]).offset().top)){
                clearInterval(start);
                clearInterval(movePipe);
                clearInterval(trackPipe);
                alert("Game Over");
            }

        }
    }

    let showScore = () => {
        document.getElementById("score").innerHTML = "Score : " + score;
    }

    let start = setInterval(() => {
        fall();
    }, 10);

    document.addEventListener('keydown', checkKey);

});