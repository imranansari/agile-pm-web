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
            "newstory": "newStory",
            "display_epics": "displayEpics"
        },

        newStory: function() {
            alert('new story');
        },

        /*        displayEpics: function() {
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
         return view;
         });
         }*/

        saveEpic: function(formData) {
            var newEpic = epicModels.create(formData);
            console.log(newEpic)
            //newEpic.refresh();
            var updatedModel = epicModels.getByCid(newEpic.cid);
            console.log(updatedModel);
            //updatedMpdel.refresh();
            //console.log(updatedMpdel);
            //console.log(newEpic);
            /*         var newEpic = new EpicModel();
             newEpic.save(formData, {
             success: function(saved_epic, data) {
             console.log(saved_epic);
             }});*/


            //var updatedEpic = newEpic.save();
            //console.log(updatedEpic.toJSON());
        },

        displayEpics: function() {
            if (typeof epicModels == "undefined" || epicModels.length == 0) {
                //var initData = epicController.getEpicModelsFromService();
                //epicModels = new EpicModels();
                //phase1Collection.refresh(initData);
                //phase1Collection.fetch();
                //phase1Collection.create({name : 'numi wumi'});
            }

            var initData = epicController.getEpicModelsFromService();
            epicModels = new EpicModels;
            epicModels.refresh(initData);

            var dashBoardCollectionView = new UpdatingDashboardCollectionView({
                collection : epicModels,
                childViewConstructor : UpdatingEpicView,
                childViewTagName : "li",
                el : $('#story_Definition ul')[0]
            });
            dashBoardCollectionView.render();

            //phase1Collection.create({storyName : 'numi wumi 123.1'});
            //$("#story_QA ul").append('<li>Message Center</li>');
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

            //var updatedData = epicController.massageDataForMongoDb(data);
            return data;
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
            var phase = phaseId.substring(phaseId.indexOf("_")+1);
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