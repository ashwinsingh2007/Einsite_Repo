var test = function() {
    var temp = $("#test").html();
    var output = $('#see');
    var html = Mustache.render(temp, null);
    output.html(html);
}