var app = app || {};

//Todo Collection

var TodoList = Backbone.Collection.extend({
    
    //使用的数据模型
    model: app.Todo,

    //保存所有的数据到localStorage里
    localStorage: new Backbone.LocalStorage('todos-backbone'),

    //返回一个已完成todo项
    completed: function(){
        return this.filter(function(todo){
            return todo.get('completed');
        });
    },

    //返回一个未完成todo项
    remaining: function(){
        return this.without.apply( this, this.completed() );
    },


    //实现一个序列产生器
    nextOrder: function(){
        if( !this.length ){
            return 1;
        }
        return this.last().get('order') + 1;
    },

    //通过插入顺序（order）进行排序
    comparator: function(todo){
        return todo.get('order');
    }

});

app.Todos = new TodoList();

//其中 filter without last 是混入到 Backbone.Collection 的 Underscore 方法