# Homework 4: L-systems - Morgan Herrmann
#### moher@seas.upenn.edu
### DEMO LINK - https://morganherrmann.github.io/lsystem/

## L-System Classes and Drawing Rules

- For my turtle class, each turtle has a current state- including rotation, scale, and a stack of turtle states. Functions included in the turtle class allow a user to rotate in the X/Y/Z directions based on random values.  I chose the rotations to primarily occur in the X and Z direction, and slightly less likely in the Y direction, to mimic the upward growth of a vine/tentacle looking plant. I also included a wildcard function that is called infrequently, but introduces a totally random rotation to the plant.  The scale of the leaves is also a trait directly modifiable by the user.

- My Turtle State class uses quaternions to actually rotate the current orientations, change the level of iterations, and modify the position of the current leaf.  I also included functions here to generate the translation matrix alongside the inverse as well.

#### Drawing Rules -  
My L System contains the following DRAW rules. In the form (CHARACTER ENCOUNTERED, PROBABILITY, FUNCTION)
 * 'A', 1, pir, ---> draw a piranha plant monster.
 * 'B', 1, leaflet, ----> draw a leaf.
 * '[', 0.50, rotZ, ----> rotate Z
 * ']', 0.50, rotNegZ, ----> rotate -Z
 * '[', 0.10, rotX, ------ rotate X
 * ']', 0.10, rotNegX, ------> Rotate -X
 * '[', 0.40, left, ---------> Twist Left XYZ
 *  ']', 0.40, right, -------> Twist right XYZ

#### Expansion Rules
The expansion rules I used are as follows.  Note that brackets always match to themselves, and letters map to new strings. To promote upward growth, I included B --> BBBB at a low probability to encourage a spurt of upward growth without being too prominent. These rules are in the form (KEY CHARACTER, MAPPED STRING, PROBABILITY).
['[','[', 1.0],
[']',']', 1.0],
['B', 'BBBB', 0.20],
['B', 'B[AA]BB', 0.65],
['B', 'B', 0.15],
['A', 'B[A]A', 0.4],
['A', 'BA', 0.1],
['A', 'B[A][A]A', 0.5]

Map<string, Map<number, string>> is the format I used to store this information, to store each character with its accumulated probability and expansion string.


#### Instance Render
I had a bit of trouble with the instance rendering- but was able to generate translation matrices in order to generate the VBO Data.  In my TurtleState.ts class I was able to generate those functions. I applied this to each turtle state in order to create the mat 4 fir translations - but did not end up using the instanced-frag/vert shader.

### Required Atrributes 
  - Growing in 3D - As you can see from the provided images, the plants growth occurs in the XYZ directions for a more realistic look.
  - Branch decoration - I incorporated a 3D pirhana plant OBJ file from Free 3D to use on several of the randomly generated leaves.
  - Organic variation - There is a completely random element that determines the growth and scale influence on the leaves.  For example, though a function may rotate the plant by 10 degrees, random values influence variation from exactly 10 degrees, so that every call to a rotation function does not produce the same result.  This applies to scale as well.
  - Background - Ocean/Sky waves! http://glslsandbox.com/e#22429.6 this noise was my source, which I modified to make appear like procedural blue waves that follow a cosine curve.
  - A flavorful twist ~~~~ It'sa Mario! I chose to make the plant growing out of the Super Mario setting and look a bit like a monster arm growing out of the pipes.

### Interactive Atrributes
 - Scale of Leaves.
 - Color of piranhas, leaves, and pipes are all modifiable.
 - Number of iterations! See 1-4. Note that 4 may take a little longer than the others.
  - To see these updates , please make your changes and click the UPDATE button on top of the GUI.

## Extra Credit
- visual polish!!!  I made my own 3D models and animated them for this project.  The question blocks, pipes, ground, and leaves are my own OBJ files which I exported from Maya, and imported by parsing the file.  I also made separate shaders for the ground and question blocks so that they could float up and down, similar to the game.
