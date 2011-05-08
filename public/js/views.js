$(document).ready(function() {
// Views represent what should be visible
    displayEpicStoryBoard();

    EpicView = Backbone.View.extend({
        initialize: function() {
            _.bindAll(this, "render");
        },
        render: function() {
            // Redraw - notice that we don't know if this.el is
            // inserted in the DOM or not
            var source = $('#epicStoryTemplate').html();
            var template = Handlebars.compile(source);
            console.log(this.model.toJSON());
            console.log(template(this.model.toJSON()));
            $(this.el).html(template(this.model.toJSON()));
            //$(this.el).html(this.model.toJSON().storyName);

            /*$(this.el).html(_.template('<li><%= storyName %> </li>',
             this.model.toJSON()));*/

            // Returning this.el instead could also be a good idea..
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

            /*$(this.el).html(_.template('<li><%= storyName %> </li>',
             this.model.toJSON()));*/

            // Returning this.el instead could also be a good idea..
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
            //alert(form);
            var formData = $(form).serializeObject();
            console.log(formData);

            // if you send request to server is prob. good idea to set the var and save at the end, in a blur event or in some sync. maintenance timer.
            //this.model.set(tempVModel);
            //this.model.set(formData);
            console.log(this.model.toJSON());
            console.log(this.model.id);
            epicModels.get(this.model.id).set(formData).save();
            //this.model.save();
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

            /*$(this.el).html(_.template('<li><%= storyName %> </li>',
             this.model.toJSON()));*/

            // Returning this.el instead could also be a good idea..
            return this;
        },
        onSubmit: function(e) {
            console.log('changed form');

            var form = '#newEpicStoryForm_1';
            //alert(form);
            var formData = $(form).serializeObject();
            console.log(formData);

            new EpicController().saveEpic(formData);

            //var epicModel = epicModels.create(formData);
            //epicModel.set({storyCount:0});
            //console.log(epicModel.toJSON());
            //epicModel.save();
            //epicModel.fetch();
            try {
                //new EpicController().addEpicToBoard(epicModel);
            } catch(err) {
                console.log(err);
            }

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
