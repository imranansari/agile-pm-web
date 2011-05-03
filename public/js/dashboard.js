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

    //var source = $('#storyTemplate').html();
    var source = $("script[name=storyTemplate]").html();
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
    create("withIcon", { title:'Story Moved', text:'Movable Story moved from Dev to QA by Homer.', icon:'images/Alert.png' }, {
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

    $('.editEpicNote').live('click', function() {
        var refId = $(this).attr('refId');
        console.log(refId);
        var epicModel = epicModels.get(refId);
        //var epicModel = epicModels.models[0];
        //epicModel.set({storyName:'1.1.1.6'});
        //epicModel.save();
        new EpicController().editEpic(epicModel);
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

    $('#epicMenu:first').click(function() {
        $('#epicMenu .expandedSubMenu').css("display", 'inline');
        $('#storyMenu .expandedSubMenu').css("display", 'none');
    });

    $('#displayEpics').click(function() {
        //displayEpicStoryBoard();
        var epicController = new EpicController();
        epicController.displayEpics();
        //addEpicStoriesToBoard();

        /*        $(function() {
         $(".movable").sortable({
         connectWith: ".movable",
         receive: function(event, ui) {
         console.log('updated : '+ ui.item[0].id);
         //console.log('serial : '+ $(this).find('li').attr('id'));
         //console.log($(this).find('li').parent().serialize());
         console.log($(this).sortable("serialize"));
         epicController.updateEpicLocation($(this).sortable('toArray'), ui.item[0]);
         //console.log($(this).serialize());
         }
         });
         $(".movable").disableSelection();
         });*/
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

        //phase1Collection.create({storyName : 'numi wumi 123.2', phase: 'QA'});
        //phase1Collection.create({storyName : 'numi wumi 123.3', phase: 'Development'});
        console.log('New epic created');
        new EpicController().newEpic();

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