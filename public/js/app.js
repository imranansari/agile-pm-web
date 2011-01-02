$(document).ready(function() {
    window.ulog = function(msg) {
        $('#log').append($('<div>' + msg + '</div>'));
    };

    $('#save').click(function() {
        // This doesn't feel completely right..
        epicModels.each(function(epicModel) {
            epicModel.save();
        });
    });

    $('#add').click(function() {
        var epicModel = epicModels.create({storyName:'New item'});
        var view = new View({epicModel:epicModel});
        $('#content').append(view.render().el);
    });
});