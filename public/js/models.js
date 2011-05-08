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


// Create a 'Models' instance, and give it a dataset we can play with
    /*    var initData = [
     {
     id: '1',
     phase: 'Definition',
     storyName: 'Editable Story',
     storyDesc: 'The Story notes should be editable',
     assigned: 'Homer'
     },
     {
     id: '2',
     phase: 'QA',
     storyName: 'Movable Story',
     storyDesc: 'The Story should be moveable between phases',
     assigned: 'null'
     },
     {
     id: '3',
     phase: 'Definition',
     storyName: 'Commentable Stories',
     storyDesc: 'The Story notes should be commentable',
     assigned: 'Lisa'
     },
     {
     id: '4',
     phase: 'QA',
     storyName: 'Movable Story',
     storyDesc: 'The Story should be moveable between phases',
     assigned: 'Homer'
     },
     {
     id: '5',
     phase: 'Development',
     storyName: 'Add New Story',
     storyDesc: 'Ability to create a new Story card',
     assigned: 'Homer'
     },
     {
     id: '5',
     phase: 'Delivered',
     storyName: 'Assignable Story',
     storyDesc: 'The Story should be assignable',
     assigned: 'Bart'
     }
     ];

     models = new Models(initData);*/
});