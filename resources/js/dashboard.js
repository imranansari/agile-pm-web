function create(template, vars, opts) {
    return setTimeout(function() {
        $container.notify("create", template, vars, opts)
    }, 5000);
}

function displayStoryBoard() {
    var data = {
        phase1: 'Definition',
        phase2: 'Development',
        phase3: 'QA',
        phase4: 'Delivered'

    }

    var source = $('#storyBoardContainer').html();
    var template = Handlebars.compile(source);

    var html = template(data)
    $('#mainContainer').html(html);
}

function addStoryToBoard(data) {

    var source = $('#storyTemplate').html();
    var template = Handlebars.compile(source);

    var html = template(data);
    var phaseName = "story_" + data.phase;
    $('#' + phaseName + ' ul').append(html);
}

function displayEpicStoryBoard() {
    var data = {
        phase1: 'Definition',
        phase2: 'Development',
        phase3: 'QA',
        phase4: 'Delivered'

    }

    var source = $('#epicStoryBoardContainer').html();
    var template = Handlebars.compile(source);

    var html = template(data)
    $('#mainContainer').html(html);

    //create("default", { title:'Story Moved', text:'Movable Story moved from Dev to QA by Homer'});
    create("default", { title:'Story % Complete Updated', text:'Editable story 80% Complete'});
    create("withIcon", { title:'Story Moved', text:'Movable Story moved from Dev to QA by Homer.', icon:'resources/images/Alert.png' }, {
        expires:false
    });

}


function addEpicStoryToBoard(data) {

    var source = $('#epicStoryTemplate').html();
    var template = Handlebars.compile(source);

    var html = template(data);
    var phaseName = "story_" + data.phase;
    $('#' + phaseName + ' ul').append(html);
}

function addStoriesToBoard() {
    var stories = { story : [
        {
            phase: 'Definition',
            storyName: 'Editable Story',
            storyDesc: 'The Story notes should be editable',
            assigned: 'Homer'
        },
        {
            phase: 'QA',
            storyName: 'Movable Story',
            storyDesc: 'The Story should be moveable between phases',
            assigned: 'null'
        },
        {
            phase: 'Definition',
            storyName: 'Commentable Stories',
            storyDesc: 'The Story notes should be commentable',
            assigned: 'Lisa'
        },
        {
            phase: 'QA',
            storyName: 'Movable Story',
            storyDesc: 'The Story should be moveable between phases',
            assigned: 'Homer'
        },
        {
            phase: 'Development',
            storyName: 'Add New Story',
            storyDesc: 'Ability to create a new Story card',
            assigned: 'Homer'
        },
        {
            phase: 'Delivered',
            storyName: 'Assignable Story',
            storyDesc: 'The Story should be assignable',
            assigned: 'Bart'
        }
    ]}

    jQuery.each(stories.story, function() {
        addStoryToBoard(this);
    });
}

function addEpicStoriesToBoard() {
    var stories = { story : [
        {
            phase: 'Definition',
            storyName: 'Editable Story',
            storyDesc: 'The Story notes should be editable',
            assigned: 'Homer',
            storyCount: 10
        },

        {
            phase: 'Definition',
            storyName: 'Movable Story',
            storyDesc: 'The Story should be moveable between phases',
            assigned: 'Homer',
            storyCount: 2
        },
        {
            phase: 'Development',
            storyName: 'Add New Story',
            storyDesc: 'Ability to create a new Story card',
            assigned: 'Homer',
            storyCount: 26
        },
        {
            phase: 'Delivered',
            storyName: 'Assignable Story',
            storyDesc: 'The Story should be assignable',
            assigned: 'Bart',
            storyCount: 8
        }
    ]}

    jQuery.each(stories.story, function() {
        addEpicStoryToBoard(this);
    });
}

$(function() {
    /*$(".sortable").sortable({
     revert: true,
     helper: "clone"
     });
     $("#draggable").draggable({
     connectToSortable: ".sortable",
     helper: "clone",
     revert: "true"
     });*/

    $(function() {
        /* $("#sortable1, #sortable2").sortable({
         connectWith: ".connectedSortable"
         }).disableSelection();*/

        $(".movable").sortable({
            connectWith: ".movable"
        });
        $(".movable").disableSelection();

    });

    /*  $(".editNote").click(function() {

     $("#noteOverLay").overlay({
     closeOnClick: false,
     speed: 'fast',
     effect: 'apple',
     load: true
     });
     $("#noteOverLay").data('overlay').load();
     });*/

    $('.editNote').live('click', function() {

        var data = {
            storyName: "Kanban Dashboard",
            storyDesc : "As a ProjectAdmin I should be able to move any cards on my project",
            calc: function() {
                return 2 + 4;
            }
        }

        var source = $('#editableStoryDlg').html();
        var template = Handlebars.compile(source);

        var html = template(data)
        $('#lightBoxContent').html(html);

        $("#lightBoxContent").lightbox_me({
            closeClick: false,
            overlaySpeed:50,
            closeSelector:".closeNote",
            appearEffect:'fadeIn',
            overlayDisappearSpeed: 0
        });
    });

    $(".expandableMenu").click(function(e) {
        $(this).closest("div").children('.expandedMenu').toggleClass('displayClass');
    });

    /*  $(".expandableSubMenu").click(function(e) {
     //$(".expandedMenu").toggleClass('displayClass');
     // var expandingSubMenu = $(this).closest("div").children('.expandedSubMenu');
     //expandingSubMenu.toggleClass('displayClass');
     //$('.expandedMenu:not(this)').css("display", "none");
     //$('.expandedSubMenu').not(expandingSubMenu).toggleClass('displayClass');
     //$('.expandedSubMenu').not(expandingSubMenu).css("display", 'none');
     //$('.expandedMenu').css("display", "inline");
     //alert($("#expandableMenu").attr("id"))
     });*/

    $('#epicMenu').click(function() {
        $('#epicMenu .expandedSubMenu').css("display", 'inline');
        $('#storyMenu .expandedSubMenu').css("display", 'none');

        displayEpicStoryBoard();
        addEpicStoriesToBoard();

        $(function() {
            $(".movable").sortable({
                connectWith: ".movable"
            });
            $(".movable").disableSelection();

        });
    });

    $('#storyMenu').click(function() {
        $('#storyMenu .expandedSubMenu').css("display", 'inline');
        $('#epicMenu .expandedSubMenu').css("display", 'none');

        displayStoryBoard();
        addStoriesToBoard();

        $(function() {
            $(".movable").sortable({
                connectWith: ".movable"
            });
            $(".movable").disableSelection();

        });

    });

    $("#newEpic").click(function() {

        var data = {
            test: 'test1'
        }

        var source = $('#newEpicDlg').html();
        var template = Handlebars.compile(source);

        var html = template(data)
        $('#lightBoxContent').html(html);

        $("#lightBoxContent").lightbox_me({
            closeClick: false,
            overlaySpeed:50,
            closeSelector:".closeNote",
            appearEffect:'fadeIn',
            overlayDisappearSpeed: 0
        });

    });

    $("#newStory").click(function() {

        var data = {
            test: 'test2'

        }
        var source = $('#newStoryDlg').html();
        var template = Handlebars.compile(source);

        var html = template(data)
        $('#lightBoxContent').html(html);

        $("#lightBoxContent").lightbox_me({
            closeClick: false,
            overlaySpeed:50,
            closeSelector:".closeNote",
            appearEffect:'fadeIn',
            overlayDisappearSpeed: 0
        });
    });

});

$(function() {
    // initialize widget on a container, passing in all the defaults.
    // the defaults will apply to any notification created within this
    // container, but can be overwritten on notification-by-notification
    // basis.
    $container = $("#container").notify({ stack:'below' });

});