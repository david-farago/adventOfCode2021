const {strictEqual} = require("assert");
const example1 = 'start-A,start-b,A-c,A-b,b-d,A-end,b-end';
const example2 = 'dc-end,HN-start,start-kj,dc-start,dc-HN,LN-dc,HN-end,kj-sa,kj-HN,kj-dc';
const example3 = 'fs-end,he-DX,fs-he,start-DX,pj-DX,end-zg,zg-sl,zg-pj,pj-he,RW-he,fs-DX,pj-RW,zg-RW,start-pj,he-WI,zg-he,pj-fs,start-RW';
const input = 'mj-TZ,start-LY,TX-ez,uw-ez,ez-TZ,TH-vn,sb-uw,uw-LY,LY-mj,sb-TX,TH-end,end-LY,mj-start,TZ-sb,uw-RR,start-TZ,mj-TH,ez-TH,sb-end,LY-ez,TX-mt,vn-sb,uw-vn,uw-TZ';

function parseGraph(input) {
    const parsedInput = input.split(',').map(s => s.split('-'))
    let graph = {neighbours: {}};

    parsedInput.forEach(([from, to]) => {
        if (!graph.neighbours[from]) {
            graph.neighbours[from] = [];
        }
        graph.neighbours[from].push(to)
        if (!graph.neighbours[to]) {
            graph.neighbours[to] = [];
        }
        graph.neighbours[to].push(from);
    });

    return graph;
}

function partOne(input) {
    const graph = parseGraph(input);
    let paths = [];

    function lengthenPath(pathSoFar) {
        const lastPathNode = pathSoFar[pathSoFar.length - 1]
        graph.neighbours[lastPathNode].forEach(neighbour => {
            let newPath = pathSoFar.concat(neighbour);
            if (neighbour === 'end') {
                paths.push(newPath);
            } else if (neighbour !== 'start') {
                if (/[A-Z]/.test(neighbour) || !pathSoFar.includes(neighbour)) {
                    lengthenPath(newPath);
                }
            }
        })
    }

    lengthenPath(['start'])

    return paths.length;
}

strictEqual(partOne(example1), 10);
strictEqual(partOne(example2), 19);
strictEqual(partOne(example3), 226);
console.log(partOne(input))
