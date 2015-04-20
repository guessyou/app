var app = app || {};

//The application
//负责处理新todo项的创建已初始todo列表的渲染

app.AppView = Backbone.View.extend({

    //保存一个DOM元素的引用
    el: '#todoapp',

    //构建一个模板对象
    statsTemplate: _.template( $('#stats-template').html() ),

    events: {
        'keypress #new-todo': 'createOnEnter',
        'click #clear-completed': 'clearCompleted',
        'click #toggle-all': 'toggleAllComplete'
    },

    //初始化
    initialize: function(){
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$('#new-todo');
        this.$footer = this.$('#footer');
        this.$main = this.$('#main');

        //委托给TodoView视图进行处理，无需担心add reset这两个操作
        this.listenTo(app.Todos, 'add', this.addOne);
        this.listenTo(app.Todos, 'reset', this.addAll);

        this.listenTo(app.Todos, 'change:completed', this.filterOne);
        this.listenTo(app.Todos, 'filter', this.filterAll);
        this.listenTo(app.Todos, 'all', this.render);

        app.Todos.fetch();
    },

    render: function(){
        var completed = app.Todos.completed().length;
        var remaining = app.Todos.remaining().length;

        if( app.Todos.length ){
            this.$main.show();
            this.$footer.show();

            this.$footer.html(this.statsTemplate({
                completed: completed,
                remaining: remaining
            }));

            this.$('#filters li a')
                .removeClass('selected')
                .filter('[href="#/'+ (app.TodoFilter || '') + '"]')
                .addClass('selected');
        }else{
            this.$main.hide();
            this.$footer.hide();
        }

        this.allCheckbox.checked = !remaining;
    },

    //add事件触发时，调用addOne()，
    //创建一个TodoView实例，并进行渲染，然后附加到页面的todo列表里
    addOne: function(todo){
        var view = new app.TodoView({ model: todo });
        $('#todo-list').append( view.render().el );
    },

    //reset事件触发时(从localStorage加载todo数据，批量更新集合时)，调用addAll()，
    //并对当前集合的所有todo项进行迭代，然后触发每个todo项的addOne()方法
    addAll: function(){
        this.$('#todo-list').html('');
        app.Todo.each(this.addOne, this);//此处this指AppView
    },

    filterOne: function(todo){
        todo.trigger('visible');
    },

    filterAll: function(){
        app.Todos.each(this.filterOne, this);
    },

    //返回一个由新todo项title order completed组成的对象字面量
    //注意：此方法通过events哈希绑定，所以this指向的是试图，而不是DOM元素
    newAttributes: function(){
        return {
            title: this.$input.val().trim(),
            order: app.Todos.nextOrder(),
            completed: false
        };
    },

    //敲回车创建一个新的Todo模型，并将它保存到localStorage中，
    //清空input，以便创建下一个todo项
    createOnEnter: function(e){
        if( e.which !== ENTER_KEY || !this.$input.val().trim() ){
            return;
        }

        app.Todos.create( this.newAttributes() );
        this.$input.val('');
    },

    //当用户选中clear-completed复选框，删除todo俩表里所有标记已完成的todo项
    clearCompleted: function(){
        _.invoke(app.Todos.completed(), 'destroy');
        return false;
    },

    //通过选中toggle-all，允许用户将todo列表中的所有todo项都标记为已完成
    toggleAllComplete: function(){
        var completed = this.allCheckbox.checked;
        app.Todos.each(function(todo){
            todo.save({
                'completed': completed
            });
        });
    }

});