
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

function write(tree) {
    if (!tree || !tree.root) return '';
    
    const stack = [tree.root];
    while(stack.length > 0) {
        const node = stack.pop();
        
        process.stdout.write(`${node.data} `);
        
        if (!!node.right) {
            stack.push(node.right);
        }
        
        if (!!node.left) {
            stack.push(node.left);
        }
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
        
        write(tree);
    }
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
