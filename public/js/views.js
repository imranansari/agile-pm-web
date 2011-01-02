$(document).ready(function() {
// Views represent what should be visible
    EpicView = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, "render");
        },
        render: function() {
            // Redraw - notice that we don't know if this.el is
            // inserted in the DOM or not
            var source = $('#epicStoryTemplate').html();
            var template = Handlebars.compile(source);
            $(this.el).html(template(this.model.toJSON()));

            /*$(this.el).html(_.template('<li><%= storyName %> </li>',
             this.model.toJSON()));*/

            // Returning this.el instead could also be a good idea..
            return this;
        }
    });
});

// Create view instances for every model
/*views = models.map(function(model) {
 var view = new EpicView({model: model});
 //$('#epic_p1').append(view.render().el);
 return view;
 });*/
