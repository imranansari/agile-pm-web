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

    $("#edit1").click(function() {

        $("#noteOverLay").overlay({
            closeOnClick: false,
            speed: 'fast',
            effect: 'apple',
            load: true
        });
        $("#noteOverLay").data('overlay').load();
    });

    $(".expandableMenu").click(function(e) {
        $(this).closest("div").children('.expandedMenu').toggleClass('displayClass');
    });

    $(".expandableSubMenu").click(function(e) {
        //$(".expandedMenu").toggleClass('displayClass');
        var expandingSubMenu = $(this).closest("div").children('.expandedSubMenu');
        expandingSubMenu.toggleClass('displayClass');
        //$('.expandedMenu:not(this)').css("display", "none");
        //$('.expandedSubMenu').not(expandingSubMenu).toggleClass('displayClass');
        //$('.expandedMenu').css("display", "inline");
        //alert($("#expandableMenu").attr("id"))
    });

    $("#newTheme").click(function() {

        $("#noteOverLay").overlay({
            closeOnClick: false,
            speed: 'fast',
            effect: 'apple',
            load: true
        });
        $("#noteOverLay").data('overlay').load();
    });

    $("#newStory").click(function() {

        $("#noteOverLay").overlay({
            closeOnClick: false,
            speed: 'fast',
            effect: 'apple',
            load: true
        });
        $("#noteOverLay").data('overlay').load();
    });

});