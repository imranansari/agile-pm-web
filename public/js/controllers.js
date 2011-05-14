$(document).ready(function() {
    EpicController = Backbone.Controller.extend({
        routes: {
            "newstory": "newStory",
            "display_epics": "displayEpics"
        },

        newStory: function() {
            alert('new story');
        },

        saveEpic: function(formData) {
            var newEpic = epicModels.create(formData);
            console.log(newEpic);
            var updatedModel = epicModels.getByCid(newEpic.cid);
            console.log(updatedModel);
        },

        displayEpics: function() {
            var initData = epicController.getEpicModelsFromService();
            epicModels = new EpicModels;
            epicModels.refresh(initData);

            var dashBoardCollectionView = new UpdatingDashboardCollectionView({
                collection : epicModels,
                childViewConstructor : UpdatingEpicView,
                childViewTagName : "li"
            });
            dashBoardCollectionView.render();
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
            return data;
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

        updateEpicLocation: function(epicsInPhase, updatedEpic) {
            var phaseId = $(updatedEpic).closest(".phasepanel").attr('id');
            var phase = phaseId.substring(phaseId.indexOf("_") + 1);
            console.log(phaseId);
            var modelId = $(updatedEpic).find('.editEpicNote').attr('refid');
            epicModels.get(modelId).set({phase:phase}).save();

            $(epicsInPhase).each(function() {
                console.log(this);
            });
        }
    });

    var epicController = new EpicController();
    Backbone.history.start();
});