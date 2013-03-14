var jaspi = jaspi || {};
jaspi.gui = {};

(function (exports) {
    
    var Class = jaspi.classes.Class;
    
    exports.Element = function (options) {
        var self = $('<div></div>');
        if (options.elem) {
            if (typeof options.elem === 'string') {
                self = $(options.elem);
            } else {
                self = options.elem;
            }
        }
        self.context = {};
        
        // Interface ===========================================================
        
        self.render = function (context) {
            self.context = context || self.context;
            self.html(self.template(self.context));
            return self.html();
        };
        
        self.setTemplate = function (template) {
            self.template = Handlebars.compile(template.trim());
        };
        
        self.setContext = function (context) {
            self.context = context;
        };
        
        self.setContent = function (template, context) {
            self.setTemplate(template);
            self.context = context || self.context;
            self.render();
        };
        
        // Realization =========================================================
        
        if (options.template) {
            self.setTemplate(options.template);
        }
        
        if (options.context) {
            self.context = options.context;
            self.html(self.template(self.context));
        }
        
        return self;
    };
    
    exports.Slider = function (options) {
        var self = exports.Element(options);
        
        // Interface ===========================================================
        
        self.addSlide = function (name, content) {
            self.slides[name] = content;
        };
        
        self.slide = function (name) {
            if (!self.slides.hasOwnProperty(name)) { return; }
            self.empty();
            self.append(self.slides[name]);
        };
        
        self.setHashContent = function () {
            var name = location.hash.slice(1).toLowerCase();
            self.slide(name);
        };
        
        self.bindHash = function () {
            $(window).bind('hashchange', self.setHashContent);
        };
        
        self.unbindHash = function () {
            $(window).unbind('hashchange', self.setHashContent);
        };
        
        // Realization =========================================================
        
        self.slides = {};
        
        return self;
    };
    
}(jaspi.gui, jQuery));