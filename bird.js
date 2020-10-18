let score = 0;
let birdLeft; 
let birdHeight;
let gravity;

$(document).ready(function() {
    let bird = $(".bird");
    birdLeft = $(".bird").offset().left;
    birdHeight = $(".bird").height()/2;
    gravity = 10;
    console.log(birdHeight);

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

        if(birdBottom <= Math.round($(window).height() - frameTop - Math.round($(".frame").height()) - 5)){
            clearInterval(movePipe);
            clearInterval(start);
            clearInterval(trackPipe);
            alert("Game over");
                
        }
    }


    let checkPipeCollision = () => {
        let birdTop = Math.round($(".bird").offset().top);
        let birdBottom = $(window).height() - Math.round(birdTop + $(".bird").height());

        let pipeLeft = $(pipes[0]).offset().left;

        // Check whether pipe encountered or not
        if(birdLeft > pipeLeft && birdLeft < (pipeLeft + pipeWidth)){

            // Check whether it is between the height
            
            if((birdTop - frameTop + 5) < $(pipes[0]).height()){
                console.log("Upper pipe collision");
                document.removeEventListener('keydown', checkKey);
                clearInterval(movePipe);
                clearInterval(trackPipe);
                // alert("Game over");
            }

            if(birdTop + birdHeight > $(pipes[1]).offset().top){
                console.log("Lower pipe collision");
                // clearInterval(start);
                document.removeEventListener('keydown', checkKey);
                clearInterval(movePipe);
                clearInterval(trackPipe);
                // alert("Game Over");
            }

        }
    }

    let showScore = () => {
        document.getElementById("score").innerHTML = "Score : " + score;
    }

    let start = setInterval(() => {
        fall();
    }, gravity);

    document.addEventListener('keydown', checkKey);

});