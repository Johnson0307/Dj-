var pulsoDireitoX = 0
var pulsoDireitoY = 0
var pulsoEsquerdoX = 0
var pulsoEsquerdoY = 0
var scoreRight = 0
var scoreLeft = 0

var som = ""             
function preload() {
 som = loadSound('music.mp3')
}

function setup() {
canvas  =  createCanvas(600, 400)
canvas.center()
video = createCapture(VIDEO)
video.hide()
posenet = ml5.poseNet(video, modelload)
posenet.on('pose', gotposes)
}

function modelload() {
    console.log('Modelo Carregdo')
}

function gotposes(results) {
    if(results.length > 0) {
      pulsoDireitoX = results[0].pose.rightWrist.x
      pulsoDireitoY = results[0].pose.leftWrist.y - 50
      pulsoEsquerdoX = results[0].pose.leftWrist.x
      pulsoEsquerdoY = results[0].pose.rightWrist.y
      scoreRight = results[0].pose.keypoints[10].score - 50
      scoreLeft = results[0].pose.keypoints[9].score
    }
}
function draw() {
    image(video, 0, 0, 600, 400)
    fill('#8B4513')
    stroke('black')
    if(scoreRight > 0.2){
    circle(pulsoDireitoX, pulsoDireitoY, 20)
    if(pulsoDireitoY > 0 && pulsoDireitoY <= 100)
    {
        document.getElementById('velocidade').innerHTML = '0.5x'
        som.rate(0.5)
    }
    if(pulsoDireitoY > 100 && pulsoDireitoY <= 200)
    {
        document.getElementById('velocidade').innerHTML = '1x'
        som.rate(1)
    }
    if(pulsoDireitoY > 200 && pulsoDireitoY <= 300)
    {
        document.getElementById('velocidade').innerHTML = '1.5x'
        som.rate(1.5)
    }
    if(pulsoDireitoY > 300)
    {
        document.getElementById('velocidade').innerHTML = '2x'
        som.rate(2)
    }
    }
    if(scoreLeft > 0.2) {
        circle(pulsoEsquerdoX, pulsoEsquerdoY, 20)
        volume = floor(pulsoEsquerdoY)/500
        volume = floor(volume * 10)
        document.getElementById('volume').innerHTML = volume
        som.setVolume(volume)
    }
    }
    function play() {
        som.play()
        som.setVolume(1)
        som.rate(1)
    }