$(function() {
    
    // variable 'user' is visible only in this block of document.ready
    user = {
        firstname: "Bob",
        lastname: "Kelso",
        group: "13"
    }

    renderUserInfo(user);
    renderSections();
    fillProgressBars();

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
        $("#nb_note").text("Nombre de Note: " + numberOfGrades());
        $("#note").text("Note: " + calculateGrade());
    });

    // set date & time update rate to one second
    setInterval(updateDateAndTime, 1000);
});


function renderUserInfo(user){
    var tmpl = $("#tmpl_user_info").html();
    var output = Mustache.render(tmpl, user);
    $("#div_user_info").append(output);
}

function renderSections() {
    $.each(section_data, function (i, val) {
        var tmpl = $("#tmpl_section").html();
        var output = Mustache.render(tmpl, val);
        $("#div_section").append(output);
    });
}

function fillProgressBars(){
    $.each($(".progressBarFill"), function (i) {
        var nb = $(this).find('strong').text();
        if (nb < 5) {
            $(this).html('<strong>' + nb + '</strong>');
        }
        else if (nb < 35) {
            $(this).html('<strong>' + nb + '</strong> %');
        }
        moveProgressBar($(this), nb);
        if (nb == 100) {
            // we remove class d-none of bootstrap bc compatibility issue with jquery
            // we go up 2 parents in the DOM then acces the previous sibling, and  thenfind the class "div_note"
            $(this).parent().parent().prev().find(".div_note").removeClass("d-none");
        }
    });
}

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

function numberOfGrades() {
    let nb_grade = 0;
    $(".range-field").each(function (i, value) {
        if(!$(this).parent().parent().parent().hasClass("d-none")) {
            nb_grade++;
        }
    });
    return nb_grade;
}

function calculateGrade() {
    // variables 'grade' only visible in function calculateGrade
    let grade = 0;
    $(".range-field").each(function (i, value) {
        if(!$(this).parent().parent().parent().hasClass("d-none")) {
            grade += parseInt($(value).val());
        }
    });
    return Math.round((grade / numberOfGrades()) * 100) / 100;
}

// ajax call for getting date & time (note: time is GMT-2)
function updateDateAndTime() {
    $.getJSON("http://date.jsontest.com/", function (data) {
        var tmpl = $("#tmpl_date").html();
        var output = Mustache.render(tmpl, data);
        $("#div_date").html(output);
    });
}
