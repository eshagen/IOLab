// // Event hander for calling the SoundCloud API using the user's search query
// function callAPI(query) {
//   $.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
//     {'q': query,
//     'limit': '200'},
//     function(data) {
//       // PUT IN YOUR CODE HERE TO PROCESS THE SOUNDCLOUD API'S RESPONSE OBJECT
//       // HINT: CREATE A SEPARATE FUNCTION AND CALL IT HERE
//       for (i=1; i<=20; i++){
//         if (data[i].artwork_url !== null) {
//           var image = data[i].artwork_url;
//         }
//         else {
//           var image = "404.jpg";
//         }

//         var title = data[i].title;
//         var artist = data[i].user.username;
//         var url = data[i].permalink_url;
//         var div = "<div id='single-result'><p>" + title + "</p>\
//               <p>"+ artist + "</p><img src='"+ image +"'>\
//               <button class='play' id="+url+">Play</button>\
//               <button class='playlist-button'>Add to Playlist</button></div>"

//         $("#search-results").append(div);
//       }
//     },'json'
//   );
// }

// // 'Play' button event handler - play the track in the Stratus player
// function changeTrack(url) {
//   // Remove any existing instances of the Stratus player
//   $('#stratus').remove();

//   // Create a new Stratus player using the clicked song's permalink URL
//   $.stratus({
//       key: "b3179c0738764e846066975c2571aebb",
//       auto_play: true,
//       align: "bottom",
//       links: url
//     });
// }


// $(document).ready(
//     $("#new-search").on('click', function() {
//         // once the document loads, create new item with this function

//         $('#results').empty();
//         var user_input = $('#search-input').val();

//         // append explanatory sentence to div below search box
//         $('#results').append("<p> Showing results for " + user_input + "</p>");

//         callAPI(user_input);
        
//         // clear input box
//         $("#search-input").val("");
//     })
// );






$(document).ready(function(e) {
  $('#search-button').click(function() {
  $('#search-results').empty();         
  var searchString = $('input').val();  
  callAPI(searchString);
  })

 });


function callAPI(query) {
  $.get("https://api.soundcloud.com/tracks?client_id=b3179c0738764e846066975c2571aebb",
    {'q': query,
    'limit': '200'},
    function(data) {
      for (i = 0; i < 20; i++) {
        if (data[i].artwork_url !== null) {
          var image = data[i].artwork_url;
        }
        else {
          var image = "404.jpg";
        }

        var title = data[i].title;
        var artist = data[i].user.username;
        var url = data[i].permalink_url;
        var div = "<div id='single-result'><p>" + title + "</p>\
              <p>"+ artist + "</p><img src='"+ image +"'>\
              <button class='play' id="+url+">Play</button>\
              <button class='playlist-button'>Add to Playlist</button></div>"

        $("#search-results").append(div);
      };
    },'json'
  );
}



$(document).on('click', '.play', function () {
  var url = $(this).attr('id');
  changeTrack(url);
});


$(document).on('click', '.playlist-button', function () {
  var move = $(this).parent().clone();
  move.children().eq(4).html('Remove from Playlist');    
  move.children().eq(4).attr('class', 'remove-button');
  move.append("<button class='up'>Up</button>" + "<button class='down'>Down</button>");  
  $('#playlist').prepend(move);  
});

$(document).on('click', '.up', function(){
  $(this).parent().insertBefore($(this).parent().prev());
})

$(document).on('click', '.remove-button', function(){
  $(this).parent().remove();
})



function changeTrack(url) {

  $('#stratus').remove();


  $.stratus({
      key: "b3179c0738764e846066975c2571aebb",
      auto_play: true,
      align: "bottom",
      links: url
    });


}

$(document).on('click', '.down', function(){
  $(this).parent().insertAfter($(this).parent().next());
})