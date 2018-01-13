(function () {

    window.app = window.app || {}
    window.app.View = View

    function View(model) {
        this.model = model
        this.templates = window.app.Templates
    }

    View.prototype.render = function (page, args) {
        if (page === 'Home') {
            document.querySelector('content').innerHTML = this.templates.Home(args.boards)
        } else if (page === 'Board') {
            let scrolled = document.querySelector('main') && document.querySelector('main').scrollLeft
            document.querySelector('content').innerHTML = this.templates.Board(args.board)
            document.querySelector('main').scrollLeft = scrolled || 0
        }
    }

    View.prototype.addEvent = function (elementID, event, func) {
        document.getElementById(elementID).addEventListener(event, func)
    }

    View.prototype.getElement = function (selector){
        return document.querySelector(selector)
    }

    View.prototype.getElements = function (selector){
        return document.querySelectorAll(selector)
    }

    View.prototype.showTitleInput = function (textID, inputID) {
        document.getElementById(textID).className = document.getElementById(textID).className.replace('show', 'hide')
        document.getElementById(inputID).className = document.getElementById(inputID).className.replace('hide', 'show')
        document.getElementById(inputID).focus()
    }

    View.prototype.setInputError = function (inputID) {
        this.querySelector('#'+inputID).className +=  this.getElement('#'+inputID).className.includes('input-error') ? '' : ' input-error'
    }

    View.prototype.setBackground = function () {
        document.querySelector('body').style.background = this.randomGradient()
    }

    View.prototype.showHelp = function () {
        this.showModal('Help', `You can edit a board name or a list name by clicking on it. <br>
                                To edit an item click on it, and to remove it leave it empty. <br>
                                You can also drag and drop the items to move them around.`)
    }

    View.prototype.showModal = function (title, text, hasButtons, action) {
        let modal = document.createElement('DIV')
        modal.innerHTML = this.templates.Modal(title, text, hasButtons)
        document.querySelector('content').appendChild(modal)
        this.addEvent('modal-bg', 'click', () => this.closeModal())
        if(hasButtons && action){
            this.addEvent('yes-button', 'click', () => action())
            this.addEvent('no-button', 'click', () => this.closeModal())
        }
    }

    View.prototype.closeModal = function () {
        document.querySelector('.modal-container').remove()
    }
    
    View.prototype.randomGradient = function () {
        var colors = [{
                light: 'rgba(0, 255, 0, 0.7)',
                dark: 'rgba(0, 0, 255, 0.7)'
            },
            {
                light: 'rgba(255, 255, 0, 0.7)',
                dark: 'rgba(255, 0, 0, 0.7)'
            },
            {
                light: 'rgba(0, 247, 255, 0.5)',
                dark: 'rgba(106, 0, 255, 0.8)'
            }
        ]
        let rand = Math.floor(Math.random() * (colors.length - 0));
        return `linear-gradient(160deg, ${colors[rand].light}, ${colors[rand].dark})`
    }
    
})()