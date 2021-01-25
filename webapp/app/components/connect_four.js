import Ember from "ember";

function deepClone(state) {
  /* Implements the deepClone function */
  var new_state = [];
  for (var idx1 = 0; idx1 < state.length; idx1++) {
    new_state.push(state[idx1].slice(0));
  }
  return new_state;
}

function check_game_winner(state) {
  /* check_game_winner is called by check_winner when a counter 
  is played to see if the payer or computer has won the game
   */

  var patterns = [
    /* Vertical Patterns Combinations */
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3]
    ],
    [
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4]
    ],
    [
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5]
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3]
    ],
    [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4]
    ],
    [
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5]
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
      [2, 3]
    ],
    [
      [2, 1],
      [2, 2],
      [2, 3],
      [2, 4]
    ],
    [
      [2, 2],
      [2, 3],
      [2, 4],
      [2, 5]
    ],
    [
      [3, 0],
      [3, 1],
      [3, 2],
      [3, 3]
    ],
    [
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4]
    ],
    [
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5]
    ],
    [
      [4, 0],
      [4, 1],
      [4, 2],
      [4, 3]
    ],
    [
      [4, 1],
      [4, 2],
      [4, 3],
      [4, 4]
    ],
    [
      [4, 2],
      [4, 3],
      [4, 4],
      [4, 5]
    ],
    [
      [5, 0],
      [5, 1],
      [5, 2],
      [5, 3]
    ],
    [
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4]
    ],
    [
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5]
    ],
    [
      [6, 0],
      [6, 1],
      [6, 2],
      [6, 3]
    ],
    [
      [6, 1],
      [6, 2],
      [6, 3],
      [6, 4]
    ],
    [
      [6, 2],
      [6, 3],
      [6, 4],
      [6, 5]
    ],


    /* Horizontal Patterns Combinations*/
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    [
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
    ],
    [
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ],
    [
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
    ],
    [
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
    ],
    [
      [3, 1],
      [4, 1],
      [5, 1],
      [6, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
      [3, 2],
    ],
    [
      [1, 2],
      [2, 2],
      [3, 2],
      [4, 2],
    ],
    [
      [2, 2],
      [3, 2],
      [4, 2],
      [5, 2],
    ],
    [
      [3, 2],
      [4, 2],
      [5, 2],
      [6, 2],
    ],
    [
      [0, 3],
      [1, 3],
      [2, 3],
      [3, 3],
    ],
    [
      [1, 3],
      [2, 3],
      [3, 3],
      [4, 3],
    ],
    [
      [2, 3],
      [3, 3],
      [4, 3],
      [5, 3],
    ],
    [
      [3, 3],
      [4, 3],
      [5, 3],
      [6, 3],
    ],
    [
      [0, 4],
      [1, 4],
      [2, 4],
      [3, 4],
    ],
    [
      [1, 4],
      [2, 4],
      [3, 4],
      [4, 4],
    ],
    [
      [2, 4],
      [3, 4],
      [4, 4],
      [5, 4],
    ],
    [
      [3, 4],
      [4, 4],
      [5, 4],
      [6, 4],
    ],
    [
      [0, 5],
      [1, 5],
      [2, 5],
      [3, 5],
    ],
    [
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
    ],
    [
      [2, 5],
      [3, 5],
      [4, 5],
      [5, 5],
    ],
    [
      [3, 5],
      [4, 5],
      [5, 5],
      [6, 5],
    ],

    /* Diagonal Patterns Combinations*/
    [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
    [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
    [
      [0, 2],
      [1, 3],
      [2, 4],
      [3, 5],
    ],
    [
      [3, 0],
      [2, 1],
      [1, 2],
      [0, 3]
    ],
    [
      [4, 0],
      [3, 1],
      [2, 2],
      [1, 3]
    ],
    [
      [3, 1],
      [2, 2],
      [1, 3],
      [0, 4]
    ],
    [
      [5, 0],
      [4, 1],
      [3, 2],
      [2, 3]
    ],
    [
      [4, 1],
      [3, 2],
      [2, 3],
      [1, 4]
    ],
    [
      [3, 2],
      [2, 3],
      [1, 4],
      [0, 5]
    ],
    [
      [5, 1],
      [4, 2],
      [3, 3],
      [2, 4]
    ],
    [
      [4, 2],
      [3, 3],
      [2, 4],
      [1, 5]
    ],
    [
      [3, 3],
      [4, 2],
      [5, 1],
      [6, 0]
    ],
    [
      [5, 2],
      [4, 3],
      [3, 4],
      [2, 5]
    ],
    [
      [3, 4],
      [4, 3],
      [5, 2],
      [6, 1]
    ],
    [
      [3, 5],
      [4, 4],
      [5, 3],
      [6, 2]
    ],
    [
      [6, 3],
      [5, 2],
      [4, 1],
      [3, 0]
    ],
    [
      [6, 4],
      [5, 3],
      [4, 2],
      [3, 1]
    ],
    [
      [5, 3],
      [4, 2],
      [3, 1],
      [2, 0]
    ],
    [
      [5, 3],
      [4, 2],
      [3, 1],
      [2, 0]
    ],
    [
      [6, 5],
      [5, 4],
      [4, 3],
      [3, 2]
    ],
    [
      [5, 4],
      [4, 3],
      [3, 2],
      [2, 1]
    ],
    [
      [4, 3],
      [3, 2],
      [2, 1],
      [1, 0]
    ],
    [
      [5, 5],
      [4, 4],
      [3, 3],
      [2, 2]
    ],
    [
      [4, 4],
      [3, 3],
      [2, 2],
      [1, 1]
    ],
    [
      [3, 3],
      [2, 2],
      [1, 1],
      [0, 0]
    ],
    [
      [4, 5],
      [3, 4],
      [2, 3],
      [1, 2]
    ],
    [
      [3, 4],
      [2, 3],
      [1, 2],
      [0, 1]
    ],
    [
      [3, 5],
      [2, 4],
      [1, 3],
      [0, 2]
    ],
  ];

  /*
    The section below displays a for loop implementation where it checks all the 
    pattern combinations above to see if there is a winning pattern that the player 
    has created. 
    
    If there is a pattern that matches te patterns used by the player or computer then 
    the patterns will be checked by check_winner, and would confirm if the player wins.
  */

  for (var pidx = 0; pidx < patterns.length; pidx++) {
    var pattern = patterns[pidx];
    var winner = state[pattern[0][0]][pattern[0][1]];
    if (winner) {
      for (var idx = 1; idx < pattern.length; idx++) {
        if (winner != state[pattern[idx][0]][pattern[idx][1]]) {
          winner = undefined;
          break;
          /* If the patterns in the for loop dont meet the appropiate parameters then the 
          loop will break and begin again.*/
        }
      }
      if (winner) {
        return winner;
      }
    }
  }
  /*
    This section deals with the parameters required to check if the 
    game is a draw or not. This is done by relying on a for loop wich 
    loops every square to check if there are still any approach
    that can be taken. If not then the game will be declared a draw.
    */
  var draw = true;
  for (var x = 0; x <= 6; x++) {
    for (var y = 0; y <= 5; y++) {
      if (!state[x][y]) {
        return undefined;
      }
    }
  }
  return "";
}

export default Ember.Component.extend({
  /*
     The four lines bellows create creates the different variables for other game states.
     The playing variable checks if the player is playing.
     The displayScreen variable is for the UI display of the game.
     The winner variable is applied when the player meets the perequites to win the game.
     The draw variable is applied when the player draws when playing against the other player.
   */
  playing: false,
  displayScreen: true,
  winner: undefined,
  draw: false,

  /* The following code section works to create and draw the board of 
  the game which will rely on drawing the board with a wide implementation 
  of graphics. */

  /* This line creates the stage for the application */
  didInsertElement: function () {
    var stage = new createjs.Stage(this.element.querySelector("#stage"));
    /* This section draws the board for implementing the design of the web 
    application */
    var board = new createjs.Shape();
    var graphics = board.graphics;
    graphics.beginFill("#ff1493");

    /* Vertical lines Section - This section works to draw the graphics and 
    coordinates for the Vertical lines*/
    graphics.drawRect(0, 0, 297, 2);
    graphics.drawRect(0, 50, 297, 2);
    graphics.drawRect(0, 100, 297, 2);
    graphics.drawRect(0, 150, 297, 2);
    graphics.drawRect(0, 200, 297, 2);
    graphics.drawRect(0, 250, 297, 2);
    graphics.drawRect(0, 300, 297, 2);

    /* Horizontal lines Section - This section works to draw the graphics and 
    coordinates for the Horizontal lines*/
    graphics.drawRect(0, 0, 4, 300);
    graphics.drawRect(40, 0, 4, 300);
    graphics.drawRect(82, 0, 4, 300);
    graphics.drawRect(124, 0, 4, 300);
    graphics.drawRect(166, 0, 4, 300);
    graphics.drawRect(208, 0, 4, 300);
    graphics.drawRect(250, 0, 4, 300);
    graphics.drawRect(292, 0, 4, 300);

    /* The following 5 lines of code implements padding around the board for 
    improving UI Design */
    board.x = 30;
    board.y = 40;
    board.alpha = 0;
    this.set("board", board);
    stage.addChild(board);

    /* This section creates the markers variable with the further implementation 
    of arrays */
    var markers = {
      Blue: [],
      Green: [],
    };

    /* 
    This section implements a for loop to loop over all the graphics acroos the board. 
    21 Was the apporpiate amount required to implement the correct number of loops to fill all the squares. 
    */
    for (var x = 0; x < 21; x++) {
      /* This section creates the markers variable with the further implementation of arrays */
      var playerMarker = new createjs.Shape();

      /* This section creates the circle for Player O which will draw a cirlce in green. */
      graphics = playerMarker.graphics;
      graphics.beginFill("#1DB954");
      graphics.drawCircle(0, 0, 17.5);
      graphics.endFill();
      playerMarker.visible = false;
      stage.addChild(playerMarker);
      markers.Green.push(playerMarker);

      /* This section creates the circle for Player O which will draw a cirlce in blue. */
      var computerMarker = new createjs.Shape();
      graphics = computerMarker.graphics;
      graphics.beginFill("#77a2d1");
      graphics.drawCircle(0, 0, 17.5);
      graphics.endFill();
      computerMarker.visible = false;
      stage.addChild(computerMarker);
      markers.Blue.push(computerMarker);
    }
    this.set("markers", markers);
    this.set("stage", stage);
    createjs.Ticker.addEventListener("tick", stage);
  },

  click: function (ev) {
    /*
       The first if statement is is used to call the playing and winner variables
    */
    var component = this;
    if (component.get("playing") && !component.get("winner")) {
      /*
          The second if statement sets out the areas in the board where the player can click. 
      */
      if (
        ev.offsetX >= 40 &&
        ev.offsetY >= 40 &&
        ev.offsetX < 340 &&
        ev.offsetY < 340
      ) {
        var x = Math.floor((ev.offsetX - 40) / 42);
        var y = 5;
        var state = component.get("state");
        while (state[x][y] == "Blue" || state[x][y] == "Green") {
          y = y - 1;
        }

        /* The following Section works to implement coordinates according to the 
        appropiate squares within the board */
        if (y >= 0) {
          state[x][y] = "Blue";
          var move_count = component.get("moves")["Blue"];
          var marker = component.get("markers")["Blue"][move_count];
          marker.visible = true;
          marker.x = 50 + x * 42;
          marker.y = 70 + y * 50;

          /* The following Section checks the wether the player is the winner and 
          then updates the stage */
          component.check_winner();
          component.get("stage").update();
          component.get("moves")["Blue"] = move_count + 1;

          /* This section implements code that adds a splayer AI into the game.*/

          setTimeout(function () {
            if (!component.get("winner") && !component.get("draw")) {
              var move = component.computer_move(state);

              state[move.x][move.y] = "Green";
              marker = component.get("markers")["Green"][move_count];
              move_count = component.get("moves")["Green"][move_count];

              marker.visible = true;

              marker.x = 50 + move.x * 42;
              marker.y = 70 + move.y * 50;
              component.get("moves")["Green"] = move_count + 1;

              component.get("stage").update();

              component.check_winner();
            }
          });
        }
      }
    }
  },

  /* 
    This section implements the function to check the winner. To achieve this,
    the state and winner varriables are used to check wether the player won or 
    if there is a draw. If neither parameter are met, the game will continue.
  */
  check_winner: function () {
    var state = this.get("state");
    var winner = check_game_winner(state);
    if (winner !== undefined) {
      if (winner === "") {
        this.set("draw", true);
      } else {
        this.set("winner", winner);
      }
    }
  },

  /* 
    This section implements further functionality to the AI, which helps the AI to identify 
    empty squares to calculate possible moves and then sends out the information to the deep clone.
  */

  computer_move: function (state) {
    /*
      This code loops over the state matrix and for each square in the state it checks if its
      undefined. If they are undefined a new move object will be created and give it an x, y and
      score properties to help specify which square each move represents.
     */
    function minimax(state, limit, player) {
      var moves = [];
      if (limit > 0) {
        for (var idx2 = 5; idx2 >= 0; idx2--) {
          for (var idx1 = 0; idx1 <= 6; idx1++) {
            if (state[idx1][idx2] === undefined) {
              var move = {
                x: idx1,
                y: idx2,
                state: deepClone(state),
                score: 0,
              };
              move.state[idx1][idx2] = player;

              if (limit === 1 || check_game_winner(move.state) !== undefined) {
                if (check_game_winner(move.state) !== undefined) {
                  var winner = check_game_winner(move.state);
                  if (winner === "Green") {
                    move.score = 1000;
                  } else if (winner === "Blue") {
                    move.score = -1000;
                  }
                }
              } else {
                move.moves = minimax(
                  move.state,
                  limit - 1,
                  player == "Blue" ? "Green" : "Blue"
                );
                /*
                  The function will then loop over the potential moves and pick the on with the highest score
                  which its assigned to the move object.
                */
                var score = undefined;
                for (var idx3 = 0; idx3 < move.moves.length; idx3++) {
                  if (score === undefined) {
                    score = move.moves[idx3].score;
                  } else if (player === "Blue") {
                    score = Math.max(score, move.moves[idx3].score);
                  } else if (player === "Green") {
                    score = Math.min(score, move.moves[idx3].score);
                  }
                }
                move.score = score;
              }
              moves.push(move);
            }
          }
        }
      }
      return moves;
    }

    /*
    The following section attempts to find any free square to place counter move by looping over every space.
    */
    var moves = minimax(state, 2, "Green");
    var max_score = undefined;
    var move = undefined;
    for (var idx = 0; idx < moves.length; idx++) {
      if (max_score === undefined || moves[idx].score > max_score) {
        max_score = moves[idx].score;
        move = {
          x: moves[idx].x,
          y: moves[idx].y,
        };
      }
    }
    return move;
  },

  actions: {
    /* The following section outlines the different action components implemented for the project. */

    start: function () {
      /* 
      The start function sets out the different parameters and 
      code that will diplay all the various graphics and functions
      to make the board and its interactive features display.
      */
      var board = this.get("board");
      board.alpha = 0;
      if (this.get("playing")) {
        var markers = this.get("markers");
        for (var idx = 0; idx < 5; idx++) {
          createjs.Tween.get(markers.Blue[idx]).to({
              y: 600,
            },
            1000
          );
          createjs.Tween.get(markers.Green[idx]).to({
              y: 600,
            },
            1000
          );
        }
        createjs.Tween.get(board).wait(1000).to({
            alpha: 1,
          },
          1000
        );
      } else {
        createjs.Tween.get(board).to({
            alpha: 1,
          },
          1000
        );
      }
      this.set("playing", true);
      this.set("winner", undefined);
      this.set("draw", undefined);
      /* 
      The following bit sets the states of each grid square to undefined as to note it as being clear.
    */
      this.set("state", [
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
        [undefined, undefined, undefined, undefined, undefined, undefined],
      ]);

      /* 
      Sets the moves for Blue and Green to zero
      */
      this.set("moves", {
        Blue: 0,
        Green: 0,
      });

      /* 
      Sets the markers for Blue and Green to false
      */
      this.set("player", "Blue");
      var call_markers = this.get("markers");
      for (var idx4 = 0; idx4 < 42; idx4++) {
        call_markers.Blue[idx].visible = false;
        call_markers.Green[idx].visible = false;
      }
    },
    /* 
      The save-highscore function implements the code that saves and stores Alias and Score of every player.
    */
    "save-highscore": function () {
      var action = this.get("on-save-highscore");
      if (action !== undefined) {
        action(this.get("player_name"), this.get("guesses"));
      }
    },
  },
});
