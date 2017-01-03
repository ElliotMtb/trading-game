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
  
  it ("AddToEnd() adds node to the end of the sequences", function() {
  
	var node = {
		data: "newNode"
	};
	
	linkedList.AddToEnd(node);
	
	expect(linkedList.Last().data).toEqual("newNode");
  });
  
  it ("RemoveFirst() removes the first node in the sequence", function() {
  
	expect(linkedList.First().data).toEqual("apple");
	
	linkedList.RemoveFirst();
	
	expect(linkedList.First().data).toEqual("orange");
  });

});
