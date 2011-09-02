/*
 *  Author: Jose M. Carbonell
 *  Version: 0.2
 *
 *  Tabs for images
 *  Add position and display styles automatically
 *  Supports slideshow of images and tabs behaviour
 *
 *  Requires: jQuery >= 1.4
 *
 *  HTML:
 *     .tabs
 *       #tab1.tab
 *       #tab2.tab
 *       a[href=#tab1].active
 *       a[href=#tab2]
 *
 *
 *  JS:
 *      $('.tabs').imageTabs({width: 500, height: 200, slideshow: 10000});
 *
 *
 *  API:
 *  $.imageTabs()
 *    Initializes the plugin
 *
 *  $.imageTabs('next')
 *    Shows the next slide
 *
 *  $.imageTabs('prev')
 *    Shows the previous slide
 *
 *  $.imageTabs('goTo', index)
 *    Goes to a slide
 *
 *  $.imageTabs('start')
 *    Starts the slideshow
 *
 *  $.imageTabs('stop')
 *    Stops the slideshow
 *
 *
 *  Settings:
 *  width:  integer (default: 500)
 *    Width of the tabs container
 *
 *  height: integer (default: 200)
 *    Height of the tabs container
 *
 *  slideshow: [integer|false] (default:false)
 *    Number of milliseconds for the slideshow to change
 *    False for not starting the slideshow
 *
 *  itemClass: string (default: tab)
 *    Class of the tab elements.
 *
 *
 *  Changelog
 *    0.2
 *    - Allows to set the individual tab class name in order to make multiple image tabs to work altogether
 *    - Adds overflow:hidden to the root element
 *    0.1.1
 *    - Fixed behavior when slideshow option is false
 *    - Fixed HTML documentation
 *    0.1
 *    - Initial version
 *
 */
(function($){

  var methods = {
    init: function(opts){

      return this.each(function(){
        var $this = $(this),
            data = $this.data('imageTabs'),
            settings = {
              'width'         : '500',
              'height'        : '200',
              'slideshow'     : false,
              'itemClass'     : 'tab'
            };
        if (!data){
          $.extend(settings, opts);

          var $tabs = $this.find('.'+settings.itemClass),
              $links = $this.find('a[href^=#'+settings.itemClass+']');

          $(this).data('imageTabs', {
            settings: settings,
            tabs: $tabs,
            links: $links,
            currentTab: 1,
            totalTabs: $tabs.length,
            timer: null
          });

          // CSS init
          $this.css({
                position: 'relative',
                overflow: 'hidden',
                height: settings.height + 'px',
                width: settings.width + 'px'
          });

          $tabs.css({
            position: 'absolute',
            height: settings.height + 'px',
            width: settings.width + 'px'
          }).filter(':not(:first)').hide();

          $links.filter(':first').addClass('active');

          // tab links events
          $links.click(function(evt){
            evt.preventDefault();
            var regExp = new RegExp('#' + settings.itemClass + '(\\d+)$');
            var index = $(this).attr('href').match(regExp)[1];
            index = parseInt(index);
            $this.imageTabs('goTo', index);
          });

          // next links events
          $this.find('a.next').click(function(evt){
            evt.preventDefault();
            $this.imageTabs('next');
          });

          // prev links events
          $this.find('a.prev').click(function(evt){
            evt.preventDefault();
            $this.imageTabs('prev');
          });

          $this.imageTabs('start');
        }
      });
    },

    next: function(){
      var $this = $(this),
          data = $this.data('imageTabs'),
          nextTab = data.currentTab + 1;

      if(nextTab > data.totalTabs) nextTab = 1
      $this.imageTabs('goTo', nextTab);
    },

    prev: function(){
      var $this = $(this),
          data = $this.data('imageTabs'),
          nextTab = data.currentTab - 1;

      if(nextTab < 1) nextTab = data.totalTabs;
      $this.imageTabs('goTo', nextTab);
    },

    goTo: function(index){
      var $this = $(this),
          data = $this.data('imageTabs'),
          settings = data.settings;

      var $id=$('#' + settings.itemClass + index);
      if($id.is(':hidden')){
        $this.find('a[href^=#' + settings.itemClass + ']').removeClass('active');
        $this.find('a[href=#' + settings.itemClass + index + ']').addClass('active');
        $this.find('.' + settings.itemClass + ':visible').fadeOut();
        $id.fadeIn();
      }
      data.currentTab = index;
      $this.imageTabs('start')
    },

    start: function(){
      var $this = $(this),
          data = $this.data('imageTabs'),
          settings = data.settings;

      if(settings.slideshow){
        clearInterval(data.timer);
        data.timer = setInterval(function(){
          $this.imageTabs('next');
        }, settings.slideshow);
      }
    },

    stop: function(){
      var $this = $(this),
          data = $this.data('imageTabs');

      clearInterval(data.timer);
    }
  };

  $.fn.imageTabs = function(method){
    // Method calling logic
    if(methods[method]){
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }else if (typeof method === 'object' || !method){
      return methods.init.apply(this, arguments);
    }else{
      $.error('Method ' + method + ' does not exist on jQuery.tooltip');
    }
  };
})(jQuery);