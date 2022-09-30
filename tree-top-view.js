
function lessThanOrEqual(nodeA, nodeB) {
    return nodeA.data <= nodeB.data;
}

function greaterThan(nodeA, nodeB) {
    return nodeA.data > nodeB.data;
}

class Tree {
    constructor(rootNode) {
        this.root = rootNode;
    }
    
    insert(value) {
        
        const node = new Node(value);
        
        const queue = [this.root];
        while(queue.length > 0) {
            const prospectiveParent = queue.shift();
            
            if (lessThanOrEqual(node, prospectiveParent)) {
                if(prospectiveParent.left === null) {
                    prospectiveParent.left = node;
                    break;
                } else {
                    queue.push(prospectiveParent.left);
                }
            } else if (greaterThan(node, prospectiveParent)) {
                if(prospectiveParent.right === null) {
                    prospectiveParent.right = node;
                    break;
                } else {
                    queue.push(prospectiveParent.right);
                }
            }
        }
        
        
    }
}

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

function processData(input) {
    const inputs = input.split("\n"); 
    const args = inputs.filter((input) => !!input);
    for (let i = 0; i < args.length; i += 2) {
        
        const numNodes = parseInt(args[i]);        
        
        const nodeDatas = (args[i + 1].split(" ")).map((val) => parseInt(val));
    
        const tree = new Tree(new Node(nodeDatas.shift()));
        
        for (const value of nodeDatas) {
            tree.insert(value);
        }
        
        process.stdout.write(`${topView(tree).map((vertex) => vertex.data)}`.replaceAll(',', ' '));
    }
}

function topView(tree) {

    if (!tree || !tree.root) return [];    
    
    let leftMagnitude = 0;
    let rightMagnitude = 0;
    const _topView = [{vertex: tree.root, magnitude: 0}];
    const queue = [{vertex: tree.root, height: 0}];
    while(queue.length > 0) {
        const node = queue.shift();
        
        if (node.height < leftMagnitude) {
            leftMagnitude = node.height;
            _topView.push({ vertex: node.vertex, magnitude: node.height});
        } else if (node.height > rightMagnitude) {
            rightMagnitude = node.height;
            _topView.push({ vertex: node.vertex, magnitude: node.height});
        }
        
        if (!!node.vertex.right) {
            queue.push({vertex: node.vertex.right, height: node.height + 1});   
        }
        
        if (!!node.vertex.left) {
            queue.push({vertex: node.vertex.left, height: node.height - 1});   
        }                
    }
    
    return _topView.sort((a, b) => a.magnitude - b.magnitude).map((val) => val.vertex);
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
