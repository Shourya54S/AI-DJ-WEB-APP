song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
function preload(){
song = loadSound("MATAFAKA.mp3");
}
function setup(){
canvas = createCanvas(450 , 350);
canvas.center();   
video = createCapture(VIDEO);
video.hide();
canvas.position(540 , 300);
poseNet = ml5.poseNet(video , modelLoaded);
poseNet.on('pose' , gotPoses);
}
function draw(){
image(video , 0 , 0 , 500 , 400);   

fill("#00FF00");
stroke("#000000");

if(scoreleftWrist > 0.2){
circle(leftWristX , leftWristY , 20);
InNumberleftWristY = Number(leftWristY);
remove_decimals = floor(InNumberleftWristY);
volume = remove_decimal/500;
document.getElementById("volume").innerHtml = "volume = " + volume;
song.setVolume(volume);
}
}
function play(){
song.play(); 
song.setVolume(1);
song.rate(1);   
}
function stop(){
song.stop();    
}
function modelLoaded(){
console.log('posenet Is Initialized!');    
}
function gotPoses(results){
if(results.length > 0){
console.log(results);
scoreleftWrist = results[0].pose.keypoints[9].score;
console.log("scoreleftWrist = " + scoreleftWrist);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;  
console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);  

rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
}    
}