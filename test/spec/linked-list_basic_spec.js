var app = app || {};

describe("CurcularLinkedList", function() {
  var linkedList;

  beforeEach(function() {
	  
	var items = ["carrot", "bean", "potato"];
	
    linkedList = new app.LinkedList.LinkedList(items);
  });

  it("ToString() returns the linked list items payload as a comma separated string", function() {
	
    expect(linkedList.ToString()).toEqual("carrot, bean, potato");
  });
  
  it ("First() returns the node at the beginning of the sequence", function() {
  
	expect(linkedList.First().data).toEqual("carrot");
  });
  
  it ("InsertBeginning() adds node to the beginning of the sequences", function() {
  
	var node = {
		data: "newNode"
	};
	
	linkedList.InsertBeginning(node);
	
	expect(linkedList.First().data).toEqual("newNode");
  });
  
  it ("RemoveBeginning() removes the first node in the sequence", function() {
  
	expect(linkedList.First().data).toEqual("carrot");
	
	linkedList.RemoveBeginning();
	
	expect(linkedList.First().data).toEqual("bean");
  });

});
