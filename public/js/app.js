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

    $('#testSub').click(function(){
       alert($.toJSON($('#testForm').serializeObject()));
    });
});

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};