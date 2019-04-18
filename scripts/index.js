$(function() {
    
    $.each(section_data, function (i, val) {
        var tmpl = $("#tmpl_section").html();
        var output = Mustache.render(tmpl, val);
        $("#div_section").append(output);
    });
    
    $.each($(".progressBarFill"), function (i, val) {
        var str = $(this).text();
        moveProgressBar($(val), str.substring(0, str.length - 1));
    });
    
    //$(".content").toggle();
    $(".more-less").click(function () {
        $(this).parents("section").find(".content").animate({
            left: "+=50",
            height: "toggle"
        });

        if ($(this).hasClass("more")) {
            $(this).text("View less");
            $(this).removeClass("more");
            $(this).addClass("less");
        }
        else if ($(this).hasClass("less")) {
            $(this).text("View more");
            $(this).removeClass("less");
            $(this).addClass("more");
        }
    });
    
    $(".range-field").change(function () {
        $("#div_note").find("p").text("Note: " + calculateGrade());
    });

    // date & time
    setInterval(updateDateAndTime, 1000);
});

function moveProgressBar(bar, targetWidth) {
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
        if (width > targetWidth) {
            clearInterval(id);
        } else {
            bar.width(width++ + "%");
        }
    }
}

function calculateGrade() {
    let grade = 0;
    $(".range-field").each(function (i, value) {
        grade += parseInt($(value).val());
    });
    return Math.round((grade / $(".range-field").length) * 100) / 100;
}

function updateDateAndTime() {
    $.getJSON("http://date.jsontest.com/", function (data) {
        var tmpl = $("#tmpl_date").html();
        var output = Mustache.render(tmpl, data);
        $("#div_date").html(output);
    });
}
