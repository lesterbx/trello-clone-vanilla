(function () {

    window.app = window.app || {}
    window.app.Templates = { Home, Board, Modal }

    function Home (boards) {
        return `<header class="shadow header fixed" style="height: 56px">
                    <h3 class="no-margin">Trello Clone</h3>
                </header>
                <main class="vertical-center">
                    <div class="border-radius shadow bg-white w-50 auto-margin">
                        <div class="flex border-bottom padding">
                            <h3 class="no-margin">Boards</h3>
                            <button id="add-board" class="icon-button color-success"><i class="lnr lnr-plus-circle"></i></button>
                        </div>
                        ${  
                            boards.length !== 0 ? 
                            boards.reduce((acc, board) => acc += BoardButton(board), '') : 
                            '<div class="padding color-gray text-center">No boards</div>'
                        }
                        <div class="padding border-top"></div>
                    </div>
                </main>`
    }

    function BoardButton ({id, title}) {
        return `<div class="flex list-button">
                    <button id="remove-board-${id}" class="icon-button color-danger remove-board">
                        <i class="lnr lnr-cross"></i>
                    </button>
                    <button id="open-board-${id}" class="padding flex board-button"> 
                        ${title}
                        <i class="lnr lnr-chevron-right"></i>
                    </button>
                </div>`
    }

    function Board ({id, title, lists}) {
        return `<header class="header shadow">
                    <div class="flex">
                        <button id="back-page" class="icon-button color-gray back-button"><i class="lnr lnr-chevron-left"></i></button>
                        <h3 id="board-title" class="no-margin show">${title}</h3>
                        <input type="text" id="board-title-input" class="hide" value="${title}" placeholder="Title">
                    </div>
                    <div>
                        <button id="help-button" class="icon-button color-info"><i class="lnr lnr-question-circle"></i></button>
                    </div>
                </header>
                <main class="padding row">
                    ${lists.reduce((acc, list) => acc += List(list), '')}
                    <div>
                        <button id="add-list" board="${this.id}" class="icon-button"><i class="lnr lnr-plus-circle"></i></button>
                    </div>
                </main>`
    }

    function List ({id, title, items}) {
        return `<div class="list bg-white shadow border-radius">
                    <div class="header border-bottom">
                        <h4 id="list-${id}-title" class="no-margin show list-title">${title}</h4>
                        <input id="list-${id}-title-input" type="text" class="hide list-title-input" value="${title}" placeholder="Title">
                        <button id="remove-list-${id}" class="icon-button color-danger remove-list"><i class="lnr lnr-cross"></i></button>
                    </div>
                    <div id="items-container-${id}" class="padding items-container">
                        ${items.reduce((acc, item) => acc += Item(item), '')}
                        <button id="add-item-${id}" class="icon-button color-info add-item droppable"><i class="lnr lnr-plus-circle"></i></button>
                    </div>
                </div>`
    }

    function Item ({id, title}) {
        return `<div id="item-${id}-title" class="item show droppable" draggable="true">
                    <p class="no-margin border border-radius">${title}</p>
                </div>
                <textarea id="item-${id}-title-input" class="hide border border-radius item-input">${title}</textarea>`
    }

    function Modal (title, text, hasButtons) {
        return `<div class="modal-container">
                    <div id="modal-bg"></div>
                    <div class="modal border-radius shadow bg-white">
                        <div class="padding">
                            <h4 class="text-center no-margin">${title}</h4>
                        </div>
                        <div class="padding">
                            <p class="no-margin">${text}</p>
                        </div>
                        <div class="flex-right full-width border-top padding">
                        ${hasButtons ? `<button id="no-button" class="link">No</button><button id="yes-button" class="link">Yes</button>` : ''}
                        </div>
                    </div>
                </div>`
    }

})()