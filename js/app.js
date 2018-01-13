(function(){

    function App(){
        this.model = new window.app.Model()
        this.view = new window.app.View(this.model)
        this.controller = new window.app.Controller(this.model, this.view)
        this.view.render()
    }

    var app = new App()

})()