                                                       MICROSOFT ENGAGE 2020









                                                 ENTERTAINING THE CREW: TIC TAC TOE
                                                         Technical Report












                                                    Aditi Khandelwal*, Aditi Rai#
                                                        Undergraduate Students
                                                 Indian Institute of Technology, Delhi
                                     (*: Department of Electrical Engineering, aditi184@gmail.com)
                                   (#: Department of Mathematics and Computing, milirai26@gmail.com)




Introduction:  We built a web application to entertain our crew by engaging them in playing an unbeatable Tic Tac Toe Game. We used minimax algorithm to build the web app. JavaScript, HTML and CSS were used. We hope our brilliant scientists don’t get bored in their journey of reaching the Red Planet.


Architecture of our Application:




      



Workflow:

 



About the files 
1.	Index.html: This html file has the basic layout of our application and some buttons. We have styled the app using CSS.
2.	Style.css: This has the code to make our web application look appealing to the user.
3.	Options.js: It contains the code for creating buttons and recording the user’s choices of playing the games. If a user doesn’t select a button required for a match, the button glows red. Play button works only when the user has selected all the buttons required for a match. When the play button is hit, function init is called. This is the main function of our code, where the minimax algorithm is implemented. Control moves to init function in the game.js file.
4.	Game.js: Here the canvas is selected where the game has to be played. It creates all the variables required for implementing the minimax algorithm. When the user selects noob level, then the minimax algorithm is implemented in such a way that it will always make the user win. When the user selects pro level, it becomes an unbeatable game. 
5.	Img Folder: It contains all the images that we used in our web application.
(All the variable and functions names are self-explanatory as well as required comments have been added to understand the code.)





Our Novelty
1.	Introduced levels: noob and pro.
2.	Introduced tic tac toe game with a different board size: 4×4 and 5×5.
3.	Introduced a feature to choose the opponent. Now the game can be played with a human competitor too. 
4.	Introduced the choice of symbol for the user. 
5.	Details we added for User Interface/User Experience:
(1)	Created zero cross symbol and Match Draw photo using Adobe Photoshop.
(2)	Added another human cartoon when match is against human.
(3)	Added animation details on winning.
(4)	Added show game over, winner display feature and play again button when a match is complete.
(5)	When someone wins a match, the winning moves gets highlighted on the tic tac toe board.
(6)	Automatically the play button gets hidden, when the user hits play.
(7)	The level button gets hidden when a user chooses to play against a human.




Future Steps that can be added to our app:
1)	Use of Web Workers to make the 4*4 and 5*5 moves faster.
2)	Introduction of choice for the starting player.



Challenges we faced and our Take Home Lessons from this project:
1)	We were new to web application development. We got a taste of how applications are developed (Full Stack Development).
2)	Understood how AI based minimax algorithm can be used for making games like tic tac toe, chess, etc.
3)	Learned new programming languages: JS.
4)	Learned to work on front end also this time. 
5)	Understood cloud services, and how we can deploy our app so that it can be made available for the masses.
6)	Understood how differently JavaScript works than other programming languages, for it being a single threaded language.
7)	Understood the concepts like web-workers, webpack, servers, APIs, etc.



References:
1)	https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/#:~:text=Minimax%20is%20a%20kind%20of,%2C%20Mancala%2C%20Chess%2C%20etc.
2)	https://www.javatpoint.com/mini-max-algorithm-in-ai
3)	https://towardsdatascience.com/how-a-chess-playing-computer-thinks-about-its-next-move-8f028bd0e7b1
4)	https://www.youtube.com/watch?v=trKjYdBASyQ&vl=en
5)	https://www.youtube.com/watch?v=JN6-OphA_VE
6)	https://www.youtube.com/watch?v=KU9Ch59-4vw
7)	https://www.youtube.com/watch?v=6ELUvkSkCts

