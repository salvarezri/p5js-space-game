# Space Game

## Description
This is a simple game made with p5js library, the game is about a spaceship that needs to avoid the asteroids.

## How to run
This repo constains p5js library included, so you can run it by opening the index.html file in your browser.

## Where should I edit the code?
in src you can put any file or folder you want, but the main file is sketch.js
to add a js file, you need to include it in the index.html file like this:
```html
<script src="src/yourfile.js"></script>
```
otherwhise the code its no accesible from others files.

## Interesting libraries to work with
I find some libraries that can be useful to work with, looks simple and easy to use, here are some of them and where to find the documentation:
-  collitions: p5.collide2D (https://github.com/bmoren/p5.collide2D?tab=readme-ov-file) 
- user interface: fez-ui (https://github.com/zturtledog/fez-ui/tree/main)
- particles and effects : cook-js (https://github.com/bobcgausa/cook-js)
- sound: built-in p5.sound library

especially the collitions library, it so simple, and the particles library can be useful to make some effect, for example, when the spaceship is destroyed, when the spaceship is moving or when an asteroid is destroyed.

## if I want to add a library?
You can add a library by downloading the library and putting it in the lib folder, then you need to add the script tag in the index.html file, like this:
```html
<script src="./lib/lib.name.js"></script>
```
I already added the p5js library to lib folder and added the script tag in the index.html file. The other libraries I mentioned before are in the lib folder, but the script tag is not added, so you can add it if you want to use them.
## What is done?
- The spaceship can move and have some inertia.
- the background with stars is done
## What is missing?
- The asteroids
- The collitions
- The score
- The game UI
- The sound
- The effects
