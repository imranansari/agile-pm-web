$(document).ready(function() {
    var initData = [
        {
            id: '1',
            phase: 'Definition',
            storyName: 'Editable Story',
            storyDesc: 'The Story notes should be editable',
            assigned: 'Homer',
            storyCount: 10
        },
        {
            id: '2',
            phase: 'QA',
            storyName: 'Movable Story',
            storyDesc: 'The Story should be moveable between phases',
            assigned: 'Marge',
            storyCount: 5
        },
        {
            id: '3',
            phase: 'Definition',
            storyName: 'Commentable Stories',
            storyDesc: 'The Story notes should be commentable',
            assigned: 'Lisa',
            storyCount: 20
        },
        {
            id: '4',
            phase: 'QA',
            storyName: 'Movable Story 2',
            storyDesc: 'The Story should be moveable between phases',
            assigned: 'Homer',
            storyCount: 2
        },
        {
            id: '5',
            phase: 'Development',
            storyName: 'Add New Story',
            storyDesc: 'Ability to create a new Story card',
            assigned: 'Homer',
            storyCount: 5
        },
        {
            id: '6',
            phase: 'Delivered',
            storyName: 'Assignable Story',
            storyDesc: 'The Story should be assignable',
            assigned: 'Bart',
            storyCount: 0
        }
    ];
    EpicController = Backbone.Controller.extend({

        routes: {
            "newstory":                 "newStory",
            "display_epics":        "displayEpics"
        },

        newStory: function() {
            alert('new story');
        },

        displayEpics: function() {
            epicModels = new EpicModels(initData);
            // Create view instances for every model
            epicViews = epicModels.map(function(epicModel) {
                var view = new EpicView({model: epicModel});

                var phaseName = "story_" + epicModel.toJSON().phase;
                $('#' + phaseName + ' ul').append(view.render().el);
                //$('#epic_p1').append();
                return view;
            });
        }

    });

    new EpicController();
    Backbone.history.start();
});