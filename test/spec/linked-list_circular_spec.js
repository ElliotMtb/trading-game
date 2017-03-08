var app = app || {};

describe("CurcularLinkedList", function() {
  var linkedList;

  beforeEach(function() {
	  
	var items = ["apple", "orange", "banana"];
	
    linkedList = new app.CircularLinkedList.CircularLinkedList(items);
  });

  it("ToString() returns the linked list items payload as a comma separated string", function() {
	
    expect(linkedList.ToString()).toEqual("apple, orange, banana");
  });
  
  it ("Last() returns the node at the end of the sequence", function() {
  
	  expect(linkedList.Last().data).toEqual("banana");
  });
  
  it ("First() returns the node at the beginning of the sequence", function() {
  
	  expect(linkedList.First().data).toEqual("apple");
  });
  
  it ("The last node shall point to the first node", function() {
	  
	  expect(linkedList.Last().next.data).toEqual("apple");
  });
  
  it ("The first node shall point to the last node", function() {
    
    expect(linkedList.First().prev.data).toEqual("banana");
  });

  it ("AddToEnd() adds node to the end of the sequences", function() {
  
    var node = {
      data: "newNode"
    };
    
    linkedList.AddToEnd(node);
    
    expect(linkedList.Last().data).toEqual("newNode");
  });

   it ("AddToEnd() properly reconnects next and prev", function() {
  
    var node = {
      data: "newNode"
    };
    
    expect(linkedList.Last().prev.next.data).toEqual("banana");
    expect(linkedList.Last().next.data).toEqual("apple");
    expect(linkedList.First().prev.data).toEqual("banana");

    linkedList.AddToEnd(node);

    expect(linkedList.Last().prev.next.data).toEqual("newNode");
    expect(linkedList.Last().next.data).toEqual("apple");
    expect(linkedList.First().prev.data).toEqual("newNode");

  });
  
  it ("RemoveFirst() removes the first node in the sequence", function() {
  
    expect(linkedList.First().data).toEqual("apple");
    
    linkedList.RemoveFirst();
    
    expect(linkedList.First().data).toEqual("orange");
  });

  it ("RemoveFirst() properly reconnects next and prev", function() {

    expect(linkedList.First().next.prev.data).toEqual("apple");
    expect(linkedList.First().prev.data).toEqual("banana");
    expect(linkedList.Last().next.data).toEqual("apple");
    
    linkedList.RemoveFirst();

    expect(linkedList.First().next.prev.data).toEqual("orange");
    expect(linkedList.First().prev.data).toEqual("banana");
    expect(linkedList.Last().next.data).toEqual("orange");
    
  });

});
