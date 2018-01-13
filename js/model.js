(function () {

    window.app = window.app || {}
    window.app.Model = Model

    function Model() {
        this.boards = []
    }

    Model.prototype.uid = function () {
        return Array(5).fill().map(i => Math.floor(Math.random() * (10 - 0)) + 0).join('')
    }

    Model.prototype.addBoard = function (board) {
        this.boards.push(board)
    }

    Model.prototype.addList = function (boardID, list) {
        this.getBoard(boardID).lists.push(list)
    }

    Model.prototype.addItem = function (listID, item) {
        this.getList(listID).items.push(item)
    }

    Model.prototype.insertItem = function (listID, item, position){
        this.getList(listID).items = this.getList(listID).items.slice(0, position).concat(item).concat(this.getList(listID).items.slice(position))
    }

    Model.prototype.getBoards = function () {
        return this.boards
    }

    Model.prototype.getBoard = function (boardID) {
        return this.boards.find(board => board.id == boardID)
    }

    Model.prototype.getList = function (listID) {
        return this.getListBoard(listID).lists.find(list => list.id == listID)
    }

    Model.prototype.getListBoard = function (listID) {
        return this.boards.find(board => board.lists.find(list => list.id == listID))
    }

    Model.prototype.getItem = function (itemID) {
        return this.getItemList(itemID).items.find((item) => item.id == itemID)
    }
    
    Model.prototype.getItemList = function (itemID) {
        let itemList
        this.boards.forEach(board => {
            board.lists.forEach(list => {
                list.items.forEach(item  => {
                    if(item.id == itemID){
                        itemList = list
                    }      
                })
            })
        })
        return itemList
    }

    Model.prototype.updateBoardTitle = function (boardID, title){
        this.getBoard(boardID).title = title
    }

    Model.prototype.updateListTitle = function (listID, title){
        this.getList(listID).title = title
    }

    Model.prototype.updateItemTitle = function (itemID, title){
        this.getItem(itemID).title = title
    }
        
    Model.prototype.removeBoard = function (boardID) {
        this.boards.splice(this.getBoardIndex(boardID), 1)
    }

    Model.prototype.removeList = function (listID) {
        this.getListBoard(listID).lists.splice(this.getListIndex(listID), 1)
    }

    Model.prototype.removeItem = function (itemID) {
        this.getItemList(itemID).items.splice(this.getItemIndex(itemID), 1)
    }

    Model.prototype.getBoardIndex = function (boardID) {
        return this.boards.findIndex(board => board.id === boardID)
    }

    Model.prototype.getListIndex = function (listID) {
        return this.getListBoard(listID).lists.findIndex(list => list.id == listID)
    }

    Model.prototype.getItemIndex = function (itemID) {
        return this.getItemList(itemID).items.findIndex((item) => item.id == itemID)
    }
/*
    Model.prototype.getBoardsCount = function () {
        return this.boards.length
    }

    Model.prototype.getListsCount = function () {
        return this.boards.reduce((sum, board) => sum += board.lists.length, 0)
    }

    Model.prototype.getItemsCount = function () {
        return this.boards.reduce((sum, board) => sum += board.lists.reduce((sumI, list) => sumI += list.items.length, 0), 0)
    }
*/
})()