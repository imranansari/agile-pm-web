$(document).ready(function() {
    displayEpicStoryBoard();

    EpicView = Backbone.View.extend({
        events: {
            "click .editEpicNote":  "edit"
        },
        initialize: function() {
            _.bindAll(this, "render");
        },

        edit: function() {
            new EpicController().editEpic(this.model);
        },

        render: function() {
            var source = $('#epicStoryTemplate').html();
            var template = Handlebars.compile(source);
            console.log(this.model.toJSON());
            console.log(template(this.model.toJSON()));
            $(this.el).html(template(this.model.toJSON()));
            return this;
        }
    });

    UpdatingEpicView = EpicView.extend({
        initialize : function(options) {
            this.render = _.bind(this.render, this);
            this.model.bind('change:storyName', this.render);
            this.model.bind('change:storyDesc', this.render);
            console.log(this.model);
        }
    });

    EpicEditView = UpdatingEpicView.extend({
        events: {
            "submit form" : "onSubmit",
            "click #deleteEpicStory":  "destroy",
            "click #saveEpicStory":  "update"
        },
        initialize: function() {
            _.bindAll(this, 'contentChanged');
            this.inputContent = this.$('input.content');
            console.log(this.inputContent.valueOf());
        },
        render: function() {
            var source = $('#editableEpicStoryDlg').html();
            var template = Handlebars.compile(source);
            $(this.el).html(template(this.model.toJSON()));

            return this;
        },

        destroy: function() {
            console.log(this.model.toJSON().storyName);
            console.log(this.model.toJSON()._id);
            this.model.destroy();
        },

        update: function() {
            console.log('changed form');

            var form = '#editableEpicStoryForm_' + this.model.toJSON()._id;
            var formData = $(form).serializeObject();
            console.log(formData);

            console.log(this.model.toJSON());
            console.log(this.model.id);
            epicModels.get(this.model.id).set(formData).save();
        }
    });

    NewEpicView = Backbone.View.extend({
        events: {
            "submit form" : "onSubmit"
        },
        initialize: function() {
            _.bindAll(this, 'contentChanged');
            this.inputContent = this.$('input.content');
            console.log(this.inputContent.valueOf());
        },
        render: function() {
            var source = $('#newEpicDlg').html();
            var template = Handlebars.compile(source);
            $(this.el).html(template({id:"1"}));

            return this;
        },
        onSubmit: function(e) {
            console.log('changed form');

            var form = '#newEpicStoryForm_1';
            var formData = $(form).serializeObject();
            console.log(formData);

            new EpicController().saveEpic(formData);

            return false;
        }
    });


    /*var epicController = new EpicController();
     var initData = epicController.getEpicModelsFromService();
     phase1Collection = new EpicModels;
     phase1Collection.refresh(initData);

     var phaseOneView = new UpdatingCollectionView({
     collection : phase1Collection,
     childViewConstructor : UpdatingDonutView,
     childViewTagName : "li",
     el : $('#story_Definition ul')[0]
     });
     phaseOneView.render();*/

});

//$('#story_Definition ul')[0]
// Create view instances for every model
/*views = models.map(function(model) {
 var view = new EpicView({model: model});
 //$('#epic_p1').append(view.render().el);
 return view;
 });*/
