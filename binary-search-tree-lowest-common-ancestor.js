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

function findPath(vertex, target, path) {
    if (vertex === null) {
        return null;
    } else if (vertex.data === target) {
        return path.concat(vertex);
    } else {
        
        const leftPath = findPath(vertex.left, target, path.concat(vertex));
        const rightPath = findPath(vertex.right, target, path.concat(vertex));        
        
        return leftPath ? leftPath : rightPath;
    }
}

function intersection(pathA, pathB) {
    const int = [];
    while(pathA.length > 0 && pathB.length > 0) {
        const vertexA = pathA.shift();
        const vertexB = pathB.shift();
        
        if (vertexA.data === vertexB.data) {
            int.push(vertexA);
        }
    }    
    return int;
}

function diffPaths(paths) {
    const diff = [paths[0]];
    for (let i = 1; i < paths.length; i++) {
        const previousPath = diff[i - 1];
        const currentPath = paths[i];
        
        diff.push(intersection(previousPath, currentPath));
    }
    return diff;
}

function lowestCommonAncestor(tree, targets) {
    const paths = [];
    for (const target of targets) {
        paths.push(findPath(tree.root, target, []));
    }
    
    const diffs = diffPaths(paths);
    
    const finalDiff = diffs[diffs.length - 1];
    
    return finalDiff[finalDiff.length - 1];
}

function processData(input) {
    //Enter your code here
    const inputs = input.split("\n"); 
    const args = inputs.filter((input) => !!input);
    for (let i = 0; i < args.length; i += 3) {
        
        const numNodes = parseInt(args[i]);        
        
        const nodeDatas = (args[i + 1].split(" ")).map((val) => parseInt(val));
    
        const targets = (args[i + 2].split(" ")).map((val) => parseInt(val));
    
        const tree = new Tree(new Node(nodeDatas.shift()));
        
        for (const value of nodeDatas) {
            tree.insert(value);
        }
        
        process.stdout.write(`${lowestCommonAncestor(tree, targets).data}`);
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
