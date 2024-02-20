function particleImpulse(pos, angle, spread) {

  var p = {
    // transparency gradient
    color:[
      [255,255,255,255],
      [255,255,255,180],
      [255,255,255,100],
      [255,255,255,50]
    ],
    // random spread of the particles around the angle
    angle: [angle+spread,angle-spread], 
    lifetime:4, 
    limit:6, 
    gravity:0,
    speed:10,
    size:[4,8],
    sizePercent:0.9
  };
  return new Fountain(null, p, pos[0], pos[1]); //origin for the Fountain
}

function particleExplosion(pos) { 
  var p={// transparency gradient
    color:[
      [255,255,255,255],
      [255,255,255,180],
      [255,255,255,100],
      [255,255,255,50]
    ],
    // random spread of the particles around the angle
    angle: [0,360], 
    lifetime:20, 
    limit:7, 
    gravity:0,
    speed:3,
    size:[6,14],
    sizePercent:0.97
  };
  return new Fountain(null, p, pos[0], pos[1]); //origin for the Fountain

}
function drawParticles() {
  // iterate over the particles array
  // start from the end to avoid problems with the splice function
  for (let i = particles.length - 1; i >= 0; i--) {
    push()
    particles[i].CreateN();
    particles[i].Draw();
    particles[i].Step();
    pop()
    // remove the particle if it's done
    if (particles[i].done) {
      particles.splice(i, 1);
    }
  }
}