
var app = app || {};

app.LibraryView = Backbone.View.extend({
    el: '#books',

    events: {
        'click #add': 'addBook',
    },

    initialize: function(initialBooks){
        this.collection = new app.Library( initialBooks );
        this.collection.fetch({reset: true});
        this.render();

        this.listenTo(this.collection, 'add', this.renderBook );
        this.listenTo(this.collection, 'reset', this.render );
    },

    render: function(){
        this.collection.each(function(item){
            this.renderBook( item );
        }, this);
    },

    renderBook: function(item){
        var bookView = new app.BookView({
            model: item
        });
        this.$el.append( bookView.render().el );
    },

    addBook: function(e){
        e.preventDefault();

        var formData = {};

        $('#addBook>div').find('input').each(function(i, el){
            var key = el.id,
                value = $(el).val();
            if( value != '' ){

                if(key === 'keywords'){
                    formData[key] = [];
                    _.each( value.split(' '), function(keyword){
                        formData[key].push({'keyword': keyword});
                    });
                }else if(key === 'releaseDate'){
                    formData[key] = $('#releaseDate').datepicker('getDate').getTime();
                }else{
                    formData[key] = $(el).val();
                }
                
                $(el).val('');
            }
        });

        // this.collection.add( new app.Book(formData) );
        this.collection.create( formData );
    }

});