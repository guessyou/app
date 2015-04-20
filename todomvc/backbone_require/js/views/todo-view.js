var app = app || {};

//Todo Item View
//TodoView实例将和当个独立的todo记录相关联。Todo实例负责编辑、更新和销毁相关的todo项。

app.TodoView = Backbone.View.extend({

    tagName: 'li',

    template: _.template( $('#item-template').html() ),

    events: {
        'click .toggle': 'toggleCompleted',
        'dbclick label': 'edit',
        'click .destroy': 'clear',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },

    initialize: function(){
        //监听Todo模型的change事件，todo更新时，应用程序会重新渲染试图
        //注意：Todo模型是通过AppView在arguments参数传递进来的，并且在this.model上自动可用
        this.listenTo(this.model, 'change', this.render);

        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    },

    render: function(){
        this.$el.html( this.template( this.model.toJSON() ) );

        this.$el.toggleClass( 'completed', this.model.get('completed') );
        this.toggleVisible();

        this.$input = this.$('.edit');
        return this;
    },

    toggleVisible: function(){
        this.$el.toggleClass( 'hidden', this.isHidden() )
    },

    isHidden: function(){
        return this.model.get('completed') ?
                app.TodoFilter === 'active' :
                app.TodoFilter === 'completed';
    },

    toggleCompleted: function(){
        this.model.toggle();
    },

    edit: function(){
        this.$el.addClass('editing');
        this.$input.focus();
    },

    close: function(){
        var value = this.$input.val().trim();

        if(value){
            this.model.save({title: value});
        }else{
            this.clear();
        }

        this.$el.removeClass('editing');
    },

    updateOnEnter: function(e){
        if( e.which === ENTER_KEY ){
            this.close();
        }
    },

    clear: function(){
        this.model.destroy();
    },

});