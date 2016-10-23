/*
    A doubly linked list implementation for tracking player turn order
*/

var app = app || {};

app.DataStructures = (function() {

    function DoublyLinkedList(items) {
        
        this.list = items;

        var i;

        for (i = 0; i < items.length; i ++) {


        }
    }

    function DoublyLinkedList_First() {
        
        return this.list[0];
    }

    function DoublyLinkedList_Last() {
        
        return this.list[this.list.length - 1];
    }

    function DoublyLinkedList_InsertBefore(node, toInsert) {

        var leadingPortion;
        var trailingPortion;

        var targetNodeIndex = this.list.indexOf(node);

        if (!targetNodeIndex > -1)
            throw "InsertBefore failed. Node not found in linked list";

        trailingPortion = this.list.slice(targetNodeIndex, this.list.length - 1 - targetNodeIndex);

        this.list.push(toInsert);
        this.list = this.list.concat(trailingPortion);
    }

    function DoublyLinkedList_InsertAfter(node, toInsert) {

    }

    function DoublyLinkedList_AddToEnd(toInsert) {

    }

    function DoublyLinkedList_Remove(node) {

    }

    function DoublyLinkedList_Next(node) {

    }

    function DoublyLinkedList_Prev(node) {

    }

    function DoublyLinkedList_ToString() {

        return this.list.toString();
    }

    DoublyLinkedList.prototype.First = DoublyLinkedList_First;
    DoublyLinkedList.prototype.Last = DoublyLinkedList_Last;
    DoublyLinkedList.prototype.InsertBefore = DoublyLinkedList_InsertBefore;
    DoublyLinkedList.prototype.InsertAfter = DoublyLinkedList_InsertAfter;
    DoublyLinkedList.prototype.AddToEnd = DoublyLinkedList_AddToEnd;
    DoublyLinkedList.prototype.Remove = DoublyLinkedList_Remove;
    DoublyLinkedList.prototype.Next = DoublyLinkedList_Next;
    DoublyLinkedList.prototype.Prev = DoublyLinkedList_Prev;
    DoublyLinkedList.prototype.ToString = DoublyLinkedList_ToString;

    return {
        DoublyLinkedList : DoublyLinkedList
    };
})();