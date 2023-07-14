
ej.base.enableRipple(true);
var orgId = null;

// Render the TreeView with list data source
var listTreeObj = new ej.navigations.TreeView({
    fields: { dataSource: orgData, id: 'Id', parentID: 'ParentId', text: 'Name', hasChildren: 'HasChild', },
    showCheckBox: false,
    nodeSelected:nodeSelected
});
listTreeObj.appendTo('#treeView');

//Render the MaskedTextBox input element
var mask = new ej.inputs.MaskedTextBox({
    placeholder: "Search an office",
    change: searchNodes
});
mask.appendTo('#mask');

//Change the dataSource for TreeView
function changeDataSource(data) {
    listTreeObj.fields = {
        dataSource: data, id: 'Id', text: 'Name',
        parentID: 'ParentId', hasChildren: 'HasChild'
    }
}

//Filtering the TreeNodes
function searchNodes(args) {
    $('#treeView').show();
    var _text = mask.element.value;
    var predicats = [], _array = [], _filter = [];
    if (_text == "") {
        changeDataSource(orgData);
    }
    else {
        var predicate = new ej.data.Predicate('Name', 'contains', _text, true);
        var filteredList = new ej.data.DataManager(orgData).executeLocal(new ej.data.Query().where(predicate));
        for (var j = 0; j < filteredList.length; j++) {
            _filter.push(filteredList[j]["Id"]);
            var filters = getFilterItems(filteredList[j], orgData);
            for (var i = 0; i < filters.length; i++) {
                if (_array.indexOf(filters[i]) == -1 && filters[i] != null) {
                    _array.push(filters[i]);
                    predicats.push(new ej.data.Predicate('Id', 'equal', filters[i], false));
                }
            }
        }
        if (predicats.length == 0) {
            changeDataSource([]);
        } else {
            var query = new ej.data.Query().where(new ej.data.Predicate.or(predicats));
            var newList = new ej.data.DataManager(orgData).executeLocal(query);
            changeDataSource(newList);
            setTimeout(function () {
                listTreeObj.expandAll();
            }, 400);
        }
    }
}

//Find the Parent Nodes for corresponding childs
function getFilterItems(fList, list) {
    var nodes = [];
    nodes.push(fList["Id"]);
    var query2 = new ej.data.Query().where('Id', 'equal', fList["ParentId"], false);
    var fList1 = new ej.data.DataManager(list).executeLocal(query2);
    if (fList1.length != 0) {
        var pNode = getFilterItems(fList1[0], list);
        for (var i = 0; i < pNode.length; i++) {
            if (nodes.indexOf(pNode[i]) == -1 && pNode[i] != null)
                nodes.push(pNode[i]);
        }
        return nodes;
    }
    return nodes;
}

function nodeSelected(args) {
    //debugger;
    //console.log("The selected organization id: " + this.selectedNodes); // To alert the selected node's id.
    //orgId = this.selectedNodes;    
    orgId = args.nodeData.id;
    var maskObj = document.getElementById('mask').ej2_instances[0];
    maskObj.value = args.nodeData.text;    
    $('#treeView').hide();   

    // reset employee selection
    empId = 0;
    $("#empId").val('');

    if (window.location.pathname.toLowerCase() == '/organization/index') {
        location.href = '/organization/index/' + orgId;
    }
}