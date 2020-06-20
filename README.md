# Selfhacked Logic Games

The app is built 3 main page components:
* Instructions: gives the user instructions for how to play the game (this page is dynamic).
* Game: This page contains the different challenges (this page is dynamic).
* Done: this is the final "Thank You" pages that is showed o the user one they run out of time for the task.

To control which game/challenge is currently "Active", we can change the "challenge" state, in the "GameInfo" provider. Currenntly there are only two games:
* 0: Would make "Double Trouble" our active game.
* 1: Would make "Grammatical Reasoning" our active game.

In the Game Info provider, we also keep track of:
* Sound: on/off.
* Instructions: visible/hidden.
* Is Playing: is the game currently in progress.
* Is Done: is the game finished (show the thank you page).
* Score: the socre of the current game session.

## Game Page

The game page is divided into 2 parts:
- Sidebar:
    - time: this tile shows the user how much time they have left to finish the task. This is where we set the time and play relevant sounds (10 seconds left & game is done)
    - Score: this tile shows the user their current score.
    - Sound: this tile has a button where the user can turn the sound on/off.

- Content:
     - Both games.
     - Start screen: we set a 4 seconds countdown here (3, 2, 1, go). When it is done, we set isPlaying to true and start the game. 
        - Play button - the screen the user sees before they start the game.
        - Countdown - the 3, 2, 1, Go! Countdown before the game begins. We play the countdown sounds from there.
    

## Games Logic

### Double Trouble

With double trouble, the aim for the user is to pick the color-name that describes best the color of the challange-word we've presented them with. We don't care about the meaning of the challange-word or the color of the color-names.

Accross the game, we define that both for actual color and for meaning

0 = red

1 = blue

When the user takes a pick, we chack if the value of the color in the challange-word is equal to the value of the meaning in the color-name (the one they chose). If it is, then that was a succesfull choice.


### Grammatical Reasoning

With Grammatical Reasoning, we present the user with an illusration of a square and a circle. Sometimes, randomally, the circle would be contained inside the square and sometimes vice versa.

We also present the user with a statement, that describes the relationship between the two shapes. Ultimetaly, all combinatations say that either the circle is bigger than the square or vice versa.

The user's goal is to state whether the statement is true or false.

To achieve that, We set the whole test as one object, with these values:
1. "illustration" holds the values that define the drawing. The first element in both arrays represents the values of the outer shape, and he second of the inner shape.
2. "first" holds the value of the first shape that is introduced in the statement (e.g. "Circle is...").
3. "last" holds the value of the last shape that is introduced in the statement (e.g. "... than square.").
4. "relatioship" holds the relation between the two shapes, and is picked randomally form the relationships array (e.g. "... is encapsulated by ...").

To check if the user was right in their guese or not, we first check if the statement itself is correct or not, and than compare it to what the user chose.

If the first shape in the illustration.shapes array is 0, meaning a circle, then we know that the circle is the bigger shape in the current test. Thus, for the statement to be true, then either the relatioship should suggest 
"bigger" (value of 1), with the "first" shape being circle as well, or it should suggest "smaller" (values of 0), with the "first" shape being a square.
For a square, we follow the same logic but reversed.