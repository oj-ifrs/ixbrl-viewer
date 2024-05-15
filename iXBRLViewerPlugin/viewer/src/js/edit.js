import { viewerUniqueId } from './util.js';
import { Fact } from './fact.js';
import { debug } from 'webpack';

export class Editor {

    async addTag (reportIndex, selection, viewer, reportSet) {
        const range = selection.getRangeAt(0);
        const firstNode = range.startContainer;
        const lastNode = range.endContainer;
        const n = surroundSelectionWith(selection, document.createElement('ix:nonFraction'))        
        const vuid = viewerUniqueId(reportIndex, n.getAttribute("id"));

        let nodes = viewer._findOrCreateWrapperNode(n);
        nodes.addClass("ixbrl-element-nonfraction");

        viewer._addIdToNode(nodes.first(), vuid);
        const docIndex = viewer._currentDocumentIndex;
        let ixn = viewer._getOrCreateIXNode(vuid, nodes, docIndex);
        viewer._docOrderItemIndex.addItem(vuid, docIndex);

        viewer.showItemById(vuid);
        debugger;
        reportSet._ixNodeMap[vuid] = ixn;
        reportSet.setIXNodeMap(this._ixNodeMap);
        report = reportSet.reports[reportIndex]
        const factData = {
            "a": {
             "c": null,
             "e": null,
             "p": null
            },
            "v": null
           }
        reportSet._items[vuid] = new Fact(report, vuid, factData);
    }
}


function surroundSelectionWith(selection, wrapper) {
    //const selection = window.getSelection()
    const range = selection.getRangeAt(0).cloneRange()

    if (range.endOffset - range.startOffset > 0) {
      
      wrapper.id = crypto.randomUUID() 
      wrapper.setAttribute('style', 'color: red; backgroundColor: transparent;')

      console.log('range', range)

      range.surroundContents(wrapper)
      selection.removeAllRanges()
      return wrapper;
    }
    return null
}


// Get array of outermost elements that are, in document order,
// between the two argument nodes (exclusively).
//
function getElementsBetweenTree(start, end) {
  var ancestor= getCommonAncestor(start, end);

  var before= [];
  while (start.parentNode!==ancestor) {
      var el= start;
      while (el.nextSibling)
          before.push(el= el.nextSibling);
      start= start.parentNode;
  }

  var after= [];
  while (end.parentNode!==ancestor) {
      var el= end;
      while (el.previousSibling)
          after.push(el= el.previousSibling);
      end= end.parentNode;
  }
  after.reverse();

  while ((start= start.nextSibling)!==end)
      before.push(start);
  return before.concat(after);
}

// Get the innermost element that is an ancestor of two nodes.
//
function getCommonAncestor(a, b) {
    var parents= $(a).parents().andSelf();
    while (b) {
        var ix= parents.index(b);
        if (ix!==-1)
            return b;
        b= b.parentNode;
    }
    return null;
}