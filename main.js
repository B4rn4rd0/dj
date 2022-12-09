song = "";

function preload(){
    song = loadSound("music.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet foi inicializado');
}

function gotPoses(results)
{
    if(results.lenght > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

    }
}

function draw() {
    Image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);

        if(rightWrist >0 && rightWrist<= 100)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 0.5x";
            song.rate(0.5);
        }
        else if(rightWrist >100 && rightWrist <= 200)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 1x";
            song.rate(1);
        }
        else if(rightWrist > 200 && rightWrist <= 300)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 1.5x";
            song.rate(1.5);
        }
        else if(rightWrist > 300 && rightWrist <= 400)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 2x";
            song.rate(2);
        }
        else if(rightWrist > 400)
        {
            document.getElementById("speed").innerHTML = "Velocidade = 2.5x";
            song.rate(2.5);
        }
    }

    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        inNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(inNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }

}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
