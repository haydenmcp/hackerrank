function higherFrequency(nodeA, nodeB) {
    return nodeA.data.frequency > nodeB.data.frequency;
}

function internalNode(node) {
    return node.data === null;
}

function assigned(node) {
    return node !== null;
}

function swap(nodeA, nodeB) {
    const tmp = nodeA;
    nodeA = nodeB;
    nodeB = tmp;
}

class Tree {
    constructor() {
        this.root = new InternalNode();
    }
    
    insert(value) {
        
        let node = new Node(value);
        
        const queue = [this.root];
        while(queue.length > 0) {
            const prospectiveParent = queue.shift();
            
            if (prospectiveParent[0] === null) {
                prospectiveParent[0] = node;
                break;
            }
            
            if (prospectiveParent[1] === null) {
                prospectiveParent[1] = node;
                break;
            }
            
            if (!internalNode(prospectiveParent[0])) {
                if (!!prospectiveParent[0] && higherFrequency(node, prospectiveParent[0])) {
                    swap(node, prospectiveParent[0]);     
                }
            } else {
                queue.push(prospectiveParent[0]);
            }
            
            if (!internalNode(prospectiveParent[1])) {
                if (!!prospectiveParent[1] && higherFrequency(node, prospectiveParent[1])) {
                    swap(node, prospectiveParent[1]);     
                }
            } else {
                queue.push(prospectiveParent[1]);   
            }
            
            if (!internalNode(prospectiveParent[0]) && !internalNode(prospectiveParent[1])) {
                let intNode = new InternalNode();
                const leafNode = prospectiveParent[1];
                intNode[1] = leafNode;
                leafNode[1] = leafNode[0] = null;
                
                prospectiveParent[1] = intNode;
                                
                queue.push(prospectiveParent[1]); 
            }
        }        
    }
}

class Node {
    constructor(data, zero = null, one = null) {
        this.data = data;
        this[0] = zero;
        this[1] = one;
    }
}

class InternalNode extends Node {
    constructor() {
        super(null);
    }
}

function analyzeFrequencies(str) {
    const frequencies = {};
    for (const char of str) {
        if (!frequencies[char]) {
            frequencies[char] = 0;
        }
        
        frequencies[char] += 1;
    }
    return frequencies;    
}

function constructHuffmanTree(frequencies) {
    
    const tree = new Tree();   
    for (const [char, frequency] of Object.entries(frequencies)) {        
        tree.insert({char, frequency});
    }
        
    return tree;
}

function huffmanTree(str) {
    const frequencies = analyzeFrequencies(str);    
    return constructHuffmanTree(frequencies);
}

function processData(input) {
    //Enter your code here    
    const tree = huffmanTree(input);
    
    const encodedString = huffmanEncode(input, tree);
    
    process.stdout.write(huffmanDecode(encodedString, tree));
}

function findPath(char, node, path) {
    if (node === null) {
        return null;        
    } else if (node?.data?.char === char) {
        return path;
    } else {
        
        const zeroPath = findPath(char, node[0], path.concat(0));
        const onePath = findPath(char, node[1], path.concat(1));
        
        return zeroPath ? zeroPath : onePath;
    }
}

function encodeCharacter(char, huffmanTree) {
    return findPath(char, huffmanTree.root, []);
}

function huffmanEncode(str, huffmanTree) {
    
    let bits = [];
    for (const char of str) {        
        bits = bits.concat(encodeCharacter(char, huffmanTree));
    }
    
    return bits;
}

function huffmanDecode(bits, huffmanTree) {
    
    let str = "";
    let currentVertex = huffmanTree.root;
    while(bits.length > 0) {
        const next = bits.shift();
        
        currentVertex = currentVertex[next];
        
        if (currentVertex.data !== null) {
            str = str.concat(currentVertex.data.char);
            currentVertex = huffmanTree.root;
        }
    }    
    
    return str;
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
