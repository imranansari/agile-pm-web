function create(template, vars, opts) {
    return setTimeout(function() {
        $container.notify("create", template, vars, opts)
    }, 5000);
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

$(function() {

    $(function() {

        $(".movable").sortable({
            connectWith: ".movable"
        });
        $(".movable").disableSelection();

    });


    $('.editEpicNote').live('click', function() {
        var refId = $(this).attr('refId');
        console.log(refId);
        var epicModel = epicModels.get(refId);
        new EpicController().editEpic(epicModel);
    });

    $(".expandableMenu").click(function(e) {
        $(this).closest("div").children('.expandedMenu').toggleClass('displayClass');
    });


    $('#epicMenu:first').click(function() {
        $('#epicMenu .expandedSubMenu').css("display", 'inline');
        $('#storyMenu .expandedSubMenu').css("display", 'none');
    });

    $('#displayEpics').click(function() {
        var epicController = new EpicController();
        epicController.displayEpics();

        $(function() {
            $(".movable").sortable({
                connectWith: ".movable",
                receive: function(event, ui) {
                    console.log('updated : ' + ui.item[0].id);
                    //console.log('serial : '+ $(this).find('li').attr('id'));
                    //console.log($(this).find('li').parent().serialize());
                    console.log($(this).sortable("serialize"));
                    epicController.updateEpicLocation($(this).sortable('toArray'), ui.item[0]);
                    //console.log($(this).serialize());
                }
            });
            $(".movable").disableSelection();
        });
    });

    $("#newEpic").click(function() {
        new EpicController().newEpic();
    });

});

$(function() {
    $container = $("#container").notify({ stack:'below' });

});