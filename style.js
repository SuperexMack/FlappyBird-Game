// console.log("what is going on dude")

// now from below we are going to make a canvas and we will insert drawing inside the canvas


// alert("Press Space Bar to play the game and refresh the site to play the game again")


let play = document.getElementById("play")

function playGame(){
    window.location.reload()
}



document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        playGame();
    }
});

let board ;
let drawingBoxHeight = 600;
let drawingBoxWidth = 600;
let context;

let birdHeight = 50;
let birdWidth = 50;
let birdX = drawingBoxWidth/8;
let birdY = drawingBoxWidth/2;
let birdPhoto;
let TopPipeImage;
let BottomPipeImage;
let score = 0;

// here we are going to create some code for the pipes

let PipeArray = [];
let pipeWidth = 70;
let pipeHeight = 400;
let PipeX = drawingBoxWidth;
let PipeY = 0; // this is 0 because the top of the pipe is stucked to the top of the canvas
let PipeVelocityX = -2;
let BirdUpVelocity = 0;
let downToEarthVelocity = 0.5
let gameOver = false;


// now we are going to make a object in which there will be all the properties of the bird so that we don't need to call the long text all the time

let birdProperty = {
    x : birdX,
    y : birdY,
    BirdY : birdHeight,
    BirdX : birdWidth,
}

// now we had created all the important stuufs so it is the time to make a drawing of all the present element in the main canvas

window.onload = function(){
    board = document.getElementById("board");
    // now we are going to create the image height and we are going to insert the bird inside the box
    board.height = drawingBoxHeight;
    board.width = drawingBoxWidth;
    context = board.getContext("2d");
     
    // now we are going to insert the bird inside the canvas box

    
    birdPhoto = new Image();
    birdPhoto.src = "./cimage.png";
    birdPhoto.onload = function(){
    context.drawImage(birdPhoto , birdProperty.x , birdProperty.y , birdProperty.BirdX , birdProperty.BirdY);
    }

    TopPipeImage = new Image();
    TopPipeImage.src = "./Top.png";
    
    BottomPipeImage = new Image();
    BottomPipeImage.src = "./Bottom.png";

    requestAnimationFrame(main);
    setInterval(pipeiscoming , 1500)
    document.addEventListener("keypress" , birdMove)


}



function main(){
    requestAnimationFrame(main);

    if(gameOver){
        return
    }

    // using the below line we are going to clear the previous board or we can say previous canvas so that when the bird move forward then no 2 canvas collide with each other
    context.clearRect(0,0,board.width,board.height);

    // now after the canvas got passed we are going to make 
    BirdUpVelocity += downToEarthVelocity
    birdProperty.y = Math.max(BirdUpVelocity+birdProperty.y , 0)
    context.drawImage(birdPhoto , birdProperty.x , birdProperty.y , birdProperty.BirdX , birdProperty.BirdY);

    // logic of game when bird fall down
    if(birdProperty.y > board.height){
        gameOver = true;
    }



    // now here we are going to call the pipes so that we can see the pipes and pipes will arrive with a speed and that speed we are going to set
    for(let i = 0 ; i <PipeArray.length ; i++){
        let pipeo = PipeArray[i];
        pipeo.X += PipeVelocityX
        context.drawImage(pipeo.imgT , pipeo.X , pipeo.Y , pipeo.width , pipeo.Height);

        if(!pipeo.passed && birdProperty.x>pipeo.X + pipeo.width){
            score += 0.5;
            pipeo.passed = true
        }




        if(detectCollision(birdProperty , pipeo)){
            gameOver = true;
        }
    }

    context.fillStyle = "red";
    context.font = "40px Lucida Sans"
    context.fillText(score , 5 , 45)

    if(gameOver){
        context.fillText("Game Over 😞" , 5 , 90)
    }
    if(gameOver){
        context.fillText(`Your score is ${score}` , 5 , 150) // first one is for right and second one is for top
    }

}

function pipeiscoming(){

     
    if(gameOver){
        return
    }

    let randomPipeY = PipeY - pipeHeight/4 - Math.random()*(pipeHeight/2)
    let openingSpace = board.height/4;

    let ToppipeInfo = {
        imgT:TopPipeImage,
        X:PipeX,
        Y : randomPipeY,
        Height: pipeHeight,
        width : pipeWidth,
        passed : false
    }
    
    PipeArray.push(ToppipeInfo);

    let BottompipeInfo = {
        imgT:BottomPipeImage,
        X:PipeX,
        Y : randomPipeY + pipeHeight + openingSpace,
        Height: pipeHeight,
        width : pipeWidth,
        passed : false
    }
    
    PipeArray.push(BottompipeInfo);

}



function birdMove(e){
    if(e.code == "Space" || e.code == "ArrowUp"){
        BirdUpVelocity = -6;//any random value
    }
}


function detectCollision(a, b) {
    if(a.x < b.X + b.width && a.x + a.BirdX > b.X &&   a.y < b.Y + b.Height &&  a.y + a.BirdY > b.Y){
        return true;
    }
    else{
        false;
    }
}