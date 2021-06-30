class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();

    //write code to add a note here
    if(allContestants !== undefined){
      var display = 230;
      fill("blue");
      textSize(20);
      text("*NOTE: Contestant Who Anwered Correct is in Green Color!*",650,500);
      text("Result of the Quiz",350,0);
    }

    //write code to highlight contest who answered correctly
    for (var plr in allContestants) {
      var correctAns = "3";
        if(correctAns === allContestants[plr].answer) {
            fill ("green");
          }
          else {
            fill ("red");
          }
          display+=20;
          textSize(15);
          text(allContestants[plr].name+  ":" + allContestants[plr].answer,120,display);
      }
    
  }

}
