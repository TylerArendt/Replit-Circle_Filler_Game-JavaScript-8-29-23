//TODO
//reset button
//leaderboard

var radius = 0;
var points = 0;
var change = 40;
var lives = 5;
var xCenter;
var yCenter;
var interval;

window.addEventListener('mousemove', (event) => {
  var x = event.clientX - xCenter;
  var y = event.clientY - yCenter;
  radius = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
})

window.onload = draw;

function draw() {
  const canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  xCenter = canvas.width / 2;
  yCenter = canvas.height / 2;
  //gradient for circle
  var grd = context.createRadialGradient(xCenter, yCenter, xCenter / 7, xCenter, yCenter, xCenter);
  grd.addColorStop(0, "red");
  grd.addColorStop(1, "orange");

  var count = 0;
  var enemyRad = Math.random() * yCenter;

  //Timer for updating the canvas every 1ms
  interval = setInterval(function() {
    context.clearRect(0, 0, canvas.height, canvas.width);
  
    //player circle
    context.beginPath();
    context.arc(xCenter, yCenter, radius, 0, 2 * Math.PI, false);
    context.fillStyle = grd;
    context.fill();
    context.closePath();
    
    //AI circle
    context.beginPath();
    context.arc(xCenter, yCenter, enemyRad, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.strokeStyle = '#02340';
    context.stroke();
    context.closePath();

    //points counter
    context.font = "30px Arial";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("Points: " + points, xCenter, canvas.height / 13);
    context.fillText("Lives: " + lives, xCenter, 12 * canvas.height / 13 + 20);

    if (count > change) {
      count = 0;
      change = change - 0.5;

      var diff = Math.abs(radius - enemyRad);
      if (diff <= 6) {
        points = points + 1;
      } else {
        lives = lives - 1
        if (lives < 1) {
          context.font = "30px Arial";
          context.fillStyle = "black";
          context.textAlign = "center";
          context.fillText("Restart?", xCenter, canvas.height / 2);//
          clearInterval(interval);
        }
      }

      enemyRad = Math.random() * yCenter;
    }
    else {
      count = count + 1;
    }

  }, 100);
}
