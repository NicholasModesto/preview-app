var slide = new(Backbone.Model.extend({
  initialize: function(){
    console.log('model initialized');
  },
  currentIndex: null,
  nextIndex: null,
  url: "data/data.txt",
  default: function(){
    console.log("slide model default");
    this.currentIndex = 0;
    slideShow.navigate("//1",{trigger:true});
  },
  getSlide: function(id){
    var index = id - 1;
    // Check to see if the object exists
    if(this.attributes[index] !== undefined){
      this.currentIndex = index;
      this.render(index);
    }else{
      slideView.render.error("No More Slides!");
    }
    this.getNextSlide();
  },
  getNextSlide: function(){
    var nextIndex = this.currentIndex + 1;
    // Check to see if the object exists
    if(this.attributes[nextIndex] !== undefined){
      this.nextIndex = nextIndex;
      this.renderNext(nextIndex);
    }else{
      slideView.renderNext.error("No More Slides!");
    }
  },
  render: function(index){
    var obj = this.attributes[index];
    slideView.render.slide(obj);
  },
  renderNext: function(index){
    var obj = this.attributes[index];
    slideView.renderNext.slide(obj);
  },
}));

var slideView = new(Backbone.View.extend({
  initialize: function(){
    console.log('model view initialized');
  },
  model: slide,
  el: $(document),
  render: {
    slide: function(obj){
      var current = '<a href="#/' + (parseInt(obj.id) + 1) + '">' +
                  '<img src="' + obj.src +
                  '" data-order="' + parseInt(obj.id) + '"></a>';
      $('#current').html(current);
      console.log("view rendered");
    },
    // Insert Method to Render the Next Slide as hidden to "preload" it
    error: function(msg){
      var current = '<h2>' + msg + "</h2>";
      $('#current').html(current);
      console.log("Error view rendered");
    }
  },
  renderNext: {
    slide: function(obj){
      var next = '<a href="#/' + (parseInt(obj.id)) + '">' +
                  '<img src="' + obj.src +
                  '" data-order="' + parseInt(obj.id) + '"></a>';
      $('#next').html(next);
      console.log("view rendered");
    },
    // Insert Method to Render the Next Slide as hidden to "preload" it
    error: function(msg){
      var next = '<h2>' + msg + "</h2>";
      $('#next').html(next);
      console.log("Error view rendered");
    }
  },
}));

var slideShow = new(Backbone.Router.extend({
  routes:{
    '': 'default',
    ':id':'getSlide'
  },
  initialize: function(){
    console.log("router started");
    this.fetchSlides();
  },
  default: function(){
    console.log("default route triggered");
    slide.default();
  },
  fetchSlides: function(){
    slide.fetch({
      success: function(){
        console.log("model data fetched!");
        Backbone.history.start();
      },
      error: function(){
        console.log("model data fetch error!");
        $('#error').html("ERROR!");
      }
    });
  },
  getSlide: function(id){
    console.log("getSlide route triggered");
    slide.getSlide(id);
  }
}));

