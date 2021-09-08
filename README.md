# The Arnold Game
> An Arnold Schwarzenegger memory game for the 90's kid in you.
> View live at (https://www.thearnoldgame.com).

## Table of Contents
* [General Info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Todo List](#todo-list)
* [Known Issues](#known-issues)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## General Info
Hopefully this makes you laugh and pull out a classic Arnold flick or a set of dumbbells. The game is Safe For Work (SFW) and contains no profanity, though Arnold can be a bit rude at times. Functional on mobile devices. Requires audio enabled.

## Technologies
* HTML5
* CSS3
* ES6
* jQuery - 3.5.1

## Features
* A limit-break rewarding fast memory recall.
* A difficulty mode - "Party Mode".
* Customizable color changing user interface.
* High scores and past scores.
* Playable on any device.

![Example screenshot](/images/readme/arnold-game.png)
![Example screenshot](/images/readme/arnold-game-color.png)
![Example screenshot](/images/readme/arnold-game-mobile.png)

## To-do List:
* Improve mobile/flexible layout.
* Add "times played" counter.
* Add a database for user login and global high-scores.
* "Party Mode" should activate all color changing elements.
* Refine and expand arnold sound-banks. Need some from "True Lies". 
* Ensure color shifts during "Party Mode" or challenge conditions are different enough to clearly change from previous color value.
* Color shift to dark colors look bad under the button's slight gloss effect.
* Possibly add a mode only accessible from the command-line enabling Arnold NSFW sound-banks.

## Known Issues
* The first time a new soundbank is played there is a slight delay during the first playback.
* Error in meter-fill-bar where multiple color change states occur simultaneously. Cannot reproduce yet.
* Can't get color square audio to stop playing on gameover. 
* Arnold span tag is too large, needs to be refactored as button and appropriate style applied throughout queries.
* Meter should reset at 999 to prevent display error.
* On select low-tier mobile phones, certain color change elements transition suddenly, ignoring the 7 second animation.

## Status
Project is: _in production_.

## Inspiration and Thanks
A special thank you to Mr. Schwarzenegger for all the great memories and inspiration! You've helped keep me healthy and made me laugh many times. Arnold Presses FTW!
Thanks to 101soundboards.com for providing the download links to these great sound-clips.

## Contact
Created by Ash Thomas (https://www.ashthomasweb.com/) - feel free to contact me!