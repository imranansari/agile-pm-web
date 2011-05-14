$(document).ready(function() {
// Models represent your data
    EpicModel = Backbone.Model.extend({
        idAttribute: "_id",
        defaults : {
            storyName : "This is the story",
            phase : "Definition",
            storyCount : "0"
        }
    });

// Collections represent a list of models (typically a query on a server)
    EpicModels = Backbone.Collection.extend({url:'http://localhost:4567/epic',
        model:EpicModel});
});