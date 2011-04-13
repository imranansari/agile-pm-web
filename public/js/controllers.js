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
            if (typeof epicModels == "undefined") {
                var initData = epicController.getEpicModelsFromService();
                epicModels = new EpicModels(initData);
            }

            // Create view instances for every model
            epicViews = epicModels.map(function(epicModel) {
                var view = new EpicView({id: 'epic_' + epicModel.id, model: epicModel});

                var phaseName = "story_" + epicModel.toJSON().phase;
                //console.log(view.render().el);
                $('#' + phaseName + ' ul').append(view.render().el);
                //$('#epic_p1').append();
                return view;
            });
        },

        getEpicModelsFromService: function() {
            var data;
            $.ajax({
                url: '/epic',
                type: 'GET',
                dataType : 'json',
                async: false,
                success: function(dataFromService) {
                    data = dataFromService;
                }});

            var updatedData = epicController.massageDataForMongoDb(data);
            return updatedData;
        },

        massageDataForMongoDb: function(data) {
            var updatedData = new Array();
            $(data).each(function() {
                var updatedEpic = this;
                updatedEpic.id = this._id;
                updatedData.push(updatedEpic);
            });
            return updatedData;
        },

        editEpic: function(editEpicModel) {
            console.log(editEpicModel.toJSON().phase);
            var epicEditView = new EpicEditView({model: editEpicModel});

            $('#lightBoxContent').html(epicEditView.render().el);

            $("#lightBoxContent").lightbox_me({
                closeClick: false,
                overlaySpeed:50,
                closeSelector:".closeNote",
                appearEffect:'fadeIn',
                overlayDisappearSpeed: 0
            });
        },

        newEpic: function() {
            var newEpicView = new NewEpicView();

            $('#lightBoxContent').html(newEpicView.render().el);

            $("#lightBoxContent").lightbox_me({
                closeClick: false,
                overlaySpeed:50,
                closeSelector:".closeNote",
                appearEffect:'fadeIn',
                overlayDisappearSpeed: 0
            });
        },

        addEpicToBoard: function(epicModel) {
            var view = new EpicView({model: epicModel});

            var phaseName = "story_QA";
            $('#' + phaseName + ' ul').append(view.render().el);
            //epicModel.save();
        },

        updateEpicLocation: function(epicsInPhase, updatedEpic) {
            var phaseId = $(updatedEpic).closest(".phasepanel").attr('id');
            console.log(phaseId);
            $(epicsInPhase).each(function() {
                console.log(this);
            });
        }

    });

    var epicController = new EpicController();
    Backbone.history.start();
});