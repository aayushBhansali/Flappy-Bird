let frameTop;
let frameBottom;
let pipes = [];
let pipeWidth;
let movePipe;
let trackPipe;
let speed = 5;
let pSpeed = 1800;
let count = 0;

$("document").ready(function(){

    pipeWidth = 10;
    let frameStart = Math.round($(".frame").offset().left);
    let frameEnd = Math.round(frameStart + $(".frame").width());

    frameTop = Math.round($(".frame").offset().top);
    frameBottom = Math.round(frameTop + $(".frame").height());


    // Function to generate integers in a given range
    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    // Generate pipes
    const generatePipes = () => {
        let start = Math.round($(".frame").width() + $(".frame").offset().left - pipeWidth);
        let frame = document.getElementsByClassName("frame")[0];

        let heightRef = randomInteger(10, frameBottom/2)

        // Add a pipe at the top
        let topPipe = document.createElement("div");
        topPipe.setAttribute("class", "pipe-top");
        $(topPipe).css("width", "5%");
        $(topPipe).css("left", start + "px");
        $(topPipe).css("height", heightRef);
        $(topPipe).css("top", frameTop+5);

        // Add a pipe at the bottom
        let bottomPipe = document.createElement("div");
        bottomPipe.setAttribute("class", "pipe-bottom");
        $(bottomPipe).css("width", "5%");
        $(bottomPipe).css("left", start + "px");
        $(bottomPipe).css("height", frameBottom - heightRef - 300);
        $(bottomPipe).css("bottom", Math.round($(window).height() - frameTop - Math.round($(".frame").height()) - 5));

        // Append both pipe to frame
        frame.append(topPipe);
        frame.append(bottomPipe);

        pipes.push(topPipe);
        pipes.push(bottomPipe);

        pipeWidth = Math.round($(".pipe-top").width());
        let origin = frameEnd - pipeWidth;
        $(topPipe).css("left", origin + "px");
        $(bottomPipe).css("left", origin + "px");
    }


    // Remove pipe from DOM
    const removePipe = () => {
        let topPipes = document.getElementsByClassName("pipe-top");
        $(".pipe-top")[0].remove();
        $(".pipe-bottom")[0].remove();
        score += 10;
        
        if(score % 50 == 0){
            score += 10;
            speed -= 1;
            pSpeed -= 200;

            if(speed < 1) speed = 1;

            if(pSpeed < 1200) pSpeed = 1200;

            clearInterval(movePipe);
            clearInterval(trackPipe);

            trackPipe = setInterval(() => {
                generatePipes();
            }, pSpeed);
            
            movePipe = setInterval(() => {
                movePipes();
            }, speed);

 
            
            
        };
    }


    // Motion of pipes
    const movePipes = () => {

        // Used for the smooth ending of pipes
        if(parseInt($(pipes[0]).css("left")) < Math.round($(".frame").offset().left + 5)){
            let w1 = Math.round($(pipes[0]).width()) - 1;
            let w2 = Math.round($(pipes[1]).width()) - 1;

            for(let i = 2; i < pipes.length; i++){
                let initLeft = parseInt($(pipes[i]).css("left"));
                $(pipes[i]).css("left", initLeft - 1);
            }
            $(pipes[0]).css("width", w1 + "px");
            $(pipes[1]).css("width", w2 + "px");
            
            if(w1 < 1){
                pipes.shift();
                pipes.shift();
                removePipe();
            }
                
        }

        else {
            for(let i = 0; i < pipes.length; i++){
                let initLeft = parseInt($(pipes[i]).css("left"));
                $(pipes[i]).css("left", initLeft - 1);
            }
        }
    }

    generatePipes();

    // Interval for moving pipes
    movePipe = setInterval(() => {
        movePipes();
    }, speed);


    trackPipe = setInterval(() => {
        generatePipes()
    }, pSpeed);
})