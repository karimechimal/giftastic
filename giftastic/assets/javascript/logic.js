
var gifArray = [
    "dog", "cat", "dolphin", "shark", "fish","bird", "tucan", "tiger", "lion"
];

function displayGif() {

    var gifSearch = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + gifSearch;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {
   
        var result = response.data;
        $("#gifSelection").empty();
        for (j = 0; j < 10; j++) {
            var rating = $("<p>").text("Rating: " + result[j].rating);
            var imgDiv = $("<div>").addClass("gifContentBox col-md-4");
            var imgContainer = $("<div>").addClass("imgContainer");
            var image = $("<img>")
                .attr("src", result[j].images.fixed_height_still.url)
                .data("animated", result[j].images.fixed_height.url)
                .data("still", result[j].images.fixed_height_still.url)
                .attr("data-state", "still");
            imgContainer.append(image);
            imgContainer.append(rating);
            imgDiv.append(imgContainer);
            $('#gifSelection').prepend(imgDiv);
        };

        $("img").on("click", function() {
            var gifData = $(this).attr("data-state");
            console.log(this);
            if (gifData === "still") {
                $(this).attr("src", $(this).data("animated"));
                $(this).attr("data-state", "animated");
            } else if (gifData === "animated") {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            };
        }); 

    }); 

} 

function renderButtons() {

    $("#gifRow").empty();
    for (var i = 0; i < gifArray.length; i++) {

        var a = $("<button>");
        a.addClass("gif-btn btn btn-info");
        a.attr("data-name", gifArray[i]);
        a.text(gifArray[i]);
        $("#gifRow").append(a);
    }
} 

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var gif = $("#gif-input").val().trim().toLowerCase();
    gifArray.push(gif);
    $("input[type=text]").val("");
    renderButtons();
});

$('#gif-input').on("keypress", function(event) {
    if (event.which === 13) {
        $(this).attr("disabled", "disabled");
        event.preventDefault();
        var gif = $("#gif-input").val().trim().toLowerCase();
        gifArray.push(gif);
        $(this).removeAttr("disabled");
        $("input[type=text]").val("");
    } 
    renderButtons();
});

$(document).on("click", ".gif-btn", displayGif);

renderButtons();
