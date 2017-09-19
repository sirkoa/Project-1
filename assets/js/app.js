$(document).ready(function () {

  // SOME INITIAL VARIABLES TO GET YOU STARTED AND OUR API QUERY PATHS
  var tweetResults;
  var tweetURL = "https://rcb-api.herokuapp.com/twitter-search/";
  var watsonUrl = "https://rcb-api.herokuapp.com/watson";
  var unsplashUrl = "https://api.unsplash.com/photos/random?client_id=f34feb729b3f4dcb2170102dfa3191bcd6765d61a6a1ac4e291d3f9a338ee4cc"

  // WRITE A FUNCTION CALLED getTweets THAT TAKES IN ONE ARGUMENT FOR YOUR SEARCH TERM
  function getTweets(searchTerm) {
    // USE THE TWEETURL VARIABLE AND CONCATENATE THE SEARCH TERM ARGUMENT YOU PASS THROUGH IT TO CREATE AN AJAX "GET" REQUEST
         $.ajax({
          url: tweetURL + searchTerm,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
              // IN THE .DONE() FUNCTION...

    // 1) EMPTY OUT THE #TWEETS DIV


    // 2) CONSOLE.LOG() THE RESPONSE DATA TO SEE HOW YOU'LL PRINT OUT TWEETS


    // 3) CHECK AND MAKE SURE THERE ARE RESULTS
      // If no results, write "Sorry there are no tweets" to #tweet-term
 
      // Else write the term you're displaying tweets for to #tweet-term


    // 4) LOOP OVER RETURNED TWEETS AND CREATE THEM IN CARDS (LOOK AT BOOTSTRAP V4 DOCS) WITH THE FOLLOWING DATA...
      // Check if tweet at [i] is in English (check results for .lang). If it's in English, do the following

      // Using jQuery, create a new Div. Assign that div the classes "card" and "tweet"

      // Create another div and add class "card-body"

      // Create a <h4>, add class "card-title" to it. Then add the user's name to it with .text() (find user's name in returned tweet object)
      // Append card title <h4> to the div with "card-body" you created prior

      // Create a <h6>, add classes "card-subtitle" "mb-2" "text-muted" to it. Then add tweet's created_at time (you'll need to parse the time out through Moment first) using .text()
      // HINT: pass created_at time through moment().format("dddd, MMMM Do YYYY, h:mm:ss a") to get proper time format
      // Append card subtitle <h6> to the div with "card-body" you created prior

      // Create a <p>, add class "card-text" to it. Then add tweet's "text" to it using .text()
      // Append it to "card-body" div

      // Create a <button>, add classes "btn" "btn-block" "btn-ouline-dark" "analyze" to it. Then add .text() to it saying something like "Tonalyze It!"
      // Append button to "card-body" div

      // Append "card-body" to div you created first (the one with "card tweet" as classes)

      // Append that first div to #tweets in DOM
          $("#tweets").empty();
            console.log(response);
          if (response.statuses[0] === "") {
            $("#tweet-term").text("sorry there are no tweets");
          }
          else{
            $("#tweet-term").text(searchTerm);
          }

          for (var i = 0; i < response.statuses.length; i++) {
                  var tweetSection = $("<div>");
                  tweetSection.addClass("tweet card");

                  var cardBody = $("<div>");
                  cardBody.addClass("card-body cardbg");

                  var tweetUser = $("<h4>");
                  tweetUser.addClass("card-title");
                  tweetUser.text(response.statuses[i].user.name);
                  cardBody.append(tweetUser); 

                  var tweetTime = $("<h6>");
                  tweetTime.addClass("card-subtitle mb-2 text-muted");
                  tweetTime.text(moment(response.statuses[i].created_at).format("dddd, MMMM Do YYYY, h:mm:ss a"));
                  cardBody.append(tweetTime);

                  var tweetText = $("<p>");
                  tweetText.addClass("card-text");
                  tweetText.text(response.statuses[i].text);
                  cardBody.append(tweetText);

                  var emotion = $("<button>");
                  emotion.addClass("btn btn-block btn-dark analyze");
                  emotion.text("Tonalyze it!");
                  cardBody.append(emotion);

                  tweetSection.append(cardBody);

                  $("#tweets").append(tweetSection);



          }
        });
  }
  // END getTweets()

  // =======================================================

  // CREATE FUNCTION TO CHANGE BACKGROUND IMAGE IN TOP AREA CALLED changeBg. This doesn't need any arguments.
  function changeBg() {

    // USE THE UNSPLASHURL VARIABLE TO CREATE AN AJAX "GET" REQUEST

    // INSIDE .DONE() FUNCTION
     $.ajax({
          url: unsplashUrl,
          method: "GET"
        }).done(function(response){
          console.log(response)
          $(".heading").css({"backgroundImage" : "url(" + response.urls.full + ")"}).attr("data-title", response.user.name);

        })


      // 1) CONSOLE.LOG() RESPONSE TO MAKE SURE YOU KNOW WHERE THE IMAGE URL YOU NEED IS

      // 2) SELECT .HEADING CLASS FROM DOM AND CHAIN THE FOLLOWING METHODS ONTO IT:

        // .css({"backgroundImage" : "url(" + urlToUnsplashImage + ")"})

        // .attr("data-title", username of photographer)

  }

  // END getTweets()

  // =======================================================



  // CLICK THIS TO RUN changeBg FUNCTION AND CHANGE BACKGROUND
  $("#background-change").on("click", changeBg);
  // =======================================================

  // CREATE CLICK EVENT TIED TO FORM SUBMIT BUTTON IN HTML (hint: don't forget to pass event as an argument and do event.preventDefault())
  // INSIDE OF CLICK EVENT:

  $("#submit").on("click", function(event){
    event.preventDefault();
  var tweet = $("#searchterm").val();
  $("#searchterm").val("");
  getTweets(tweet);
  });
  

    // 1) Grab search term from input box you created in HTML 
    // 2) Empty out that box so next search doesn't require you manually deleting the words/terms
    // 3) Pass search term you got from input box into getTweets() function


  // END Click Event()

  // =======================================================


  // Click on a tweet and trigger Watson Tone Analysis of it
  $(document).on("click", ".analyze", function () {

    // WHAT DO YOU THINK IS HAPPENING HERE?
    var tweetContent = $(this).siblings(".card-text").text();

    // AND HERE?
    var tweetCard = $(this).parent();

    // WE HAVEN'T DONE THIS YET, SO TRY AND LEARN IT AND BE AHEAD OF EVERYONE ELSE! 
    // Pass object into GET request
    var requestObj = {
      tweetContent: tweetContent,
    }

    // Using "data" this time to pass information
    $.ajax({
      url: watsonUrl,
      method: "GET",
      data: requestObj
    }).done(function (response) {
      console.log(response)
      // 1) CONSOLE.LOG() RETURNED DATA SO YOU KNOW WHAT YOU'RE WORKING WITH
      var toneScore = response.document_tone.tone_categories[0].tones
      // 2) IN THE CONSOLE.LOG() RESPONSE, FIND THE PERTINENT DATA WE NEED TO USE (CATEGORIES -> TONES ARRAY) AND STORE IT INTO A VARIABLE SO WE DON'T HAVE TO KEEP REFERENCING A LONG PATH


      // 3) CREATE A <ul> TAG AND ADD CLASSES "list-group list-group-flush" (LOOK THIS UP IN BOOTSTRAP V4)
      var listgroup = $("<ul>")
      listgroup.addClass("list-group list-group-flush")


      // 4) LOOP OVER RETURNED TONES ARRAY (WHICH YOU STORED INTO A VARIABLE) AND FOR EACH ITERATION OF THE LOOP...
      for (var i = 0; i < toneScore.length; i++){
        
        console.log(toneScore[i])

        var tweetScore = Math.round(toneScore[i].score * 100)

        var toneName = toneScore[i].tone_name

        // Get the tone's score and multiply it by 100 (to get it out of decimal and into a real percentage) and store it into a variable

        // Get the tone's name and store it into a variable

        // Append a <li> tag to the list-group <ul> you created prior and give that <li> a class of "list-group-item" and include the tone's name and tone's score inside of it
        listgroup.append("<li class='list-group-item'>" + toneName + ": " + tweetScore + "</li>")
      // 5) Now that all scores are appended to the <ul>, append the <ul> to tweetCard (refer to the top of the .done function)
      tweetCard.append(listgroup)
  }
  })
 })
  // set bg on load
  changeBg();
  // init search
  getTweets("javascript");
})
  

  // END Click Event()

  // =======================================================



