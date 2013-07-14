function assignToggleIDs(current, toggleClass) {
    var nonDeprecatedSection = $(current).prev();

    // add toggleClasses (and replace "deprecated" with "hide")
    $(current).removeClass("deprecated").addClass("hide").addClass(toggleClass);
    nonDeprecatedSection.addClass(toggleClass);
}

function toggleSection(button) {
    var sectionClass = "toggleClass" + button.id.replace("toggleID", "");

    // toggle sections
    $("." + sectionClass).each(function() {
        if ($(this).hasClass("hide")) {
            $(this).removeClass("hide");
        }
        else {
            $(this).addClass("hide");
        }
    });

    // toggle button
    if ($("#" + button.id).hasClass("icon-backward")) {
        $("#" + button.id).removeClass("icon-backward").addClass("icon-forward");
    }
    else {
        $("#" + button.id).removeClass("icon-forward").addClass("icon-backward");
    }
}

function addDeprecationLinks() {
    var deprecatedSections = $(".deprecated");

    $.each(deprecatedSections, function() {
        var sectionName = $(this).find("h2").first().text().toLowerCase().replace(/[^\w]/, "").replace("(deprecated)", "").trim();
        var toggleClass = "toggleClass-" + sectionName;
        var toggleID    = "toggleID-" + sectionName;

        assignToggleIDs(this, toggleClass);

        // add buttons
        var toggleButton = "<button id='" + toggleID + "' class='icon-backward' title='Toggle between current and deprecated info'></button>";
        $("." + toggleClass).first().before(toggleButton);

        // assign button handler
        $("#" + toggleID).first().on("click", function() { toggleSection(this); });
    });

}

$(document).ready(addDeprecationLinks);