
let dom = []
function patch(oldArr, newArr) {
    dom = []
    oldArr.forEach(item => {
        dom.push(item)
    })
    diff(oldArr, newArr)
}

function diff(oldArr, newArr) {
    let oldStartIndex = 0
    let oldEndIndex = oldArr.length - 1
    let newStartIndex = 0
    let newEndIndex = newArr.length - 1
    let oldStartNode = oldArr[oldStartIndex]
    let oldEndNode = oldArr[oldEndIndex]
    let startNode = newArr[newStartIndex]
    let endNode = newArr[newEndIndex]
    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if (!oldStartNode) {
            oldStartNode = oldArr[++oldStartIndex]
            continue
        }
        if (!oldEndNode) {
            oldEndNode = oldArr[--oldEndIndex]
            continue
        }
        if (!startNode) {
            startNode = newArr[++newStartIndex]
            continue
        }
        if (!endNode) {
            endNode = newArr[--newEndIndex]
            continue
        }
        if (oldStartNode === startNode) {
            console.log(startNode + '保持不变', dom)
            oldStartNode = oldArr[++oldStartIndex]
            startNode = newArr[++newStartIndex]
        } else if (oldStartNode === endNode) {
            moveAfter(dom, oldStartNode, oldEndNode)
            console.log(endNode + '->' + oldEndNode +'后面', dom)

            oldStartNode = oldArr[++oldStartIndex]
            endNode = newArr[--newEndIndex]
            
        } else if (oldEndNode === startNode) {
            moveBefore(dom, oldEndNode, oldStartNode)
            console.log(oldEndNode + '->' + oldStartNode +'前面',dom)

            oldEndNode = oldArr[--oldEndIndex]
            startNode = newArr[++newStartIndex]
            
        } else if (oldEndNode === endNode) {
            console.log(endNode + '保持不变', dom)
            oldEndNode = oldArr[--oldEndIndex]
            endNode = newArr[--newEndIndex]
        } else {
            let index = findIndex(oldArr, startNode)
            if (index > -1) {
                oldArr[index] = undefined
                moveBefore(dom, startNode, oldStartNode)
                console.log(startNode + '->' + oldStartNode + '前面 ', dom)
            } else {
                dom.splice(findIndex(dom, oldStartNode), 0, startNode)
                console.log(`dom[${oldStartIndex + 1}] 插入` + startNode, dom)
            }
            startNode = newArr[++newStartIndex]
        }
    }
    if (newEndIndex >= newStartIndex) {
        for (let i = 1; i <= newEndIndex - newStartIndex + 1; i++) {
            console.log(`dom[${newStartIndex}] 插入 ` + newArr[newStartIndex])
            dom.splice(newStartIndex, 0, newArr[newStartIndex])
            newStartIndex++
        }
    } else if (oldEndIndex >= oldStartIndex){
        let s = findIndex(dom, oldStartNode)
        let e = findIndex(dom, oldEndNode)
        dom.splice(s, e - s + 1)
        console.log(`${s} ~ ${e} 删除`)
    }
    console.log('最后结果: ',dom)
}

function findIndex (arr, e) {
    let index = -1
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] === e) {
            index = i
            break
        }
    }
    return index
}

function moveAfter(arr, a, b) {
    if (a == b) return
    let a1 = findIndex(arr, a)
    arr.splice(a1, 1)
    let b1 = findIndex(arr, b)
    arr.splice(b1 + 1, 0, a)
}

function moveBefore(arr, a, b) {
    if (a == b) return
    let a1 = findIndex(arr, a)
    arr.splice(a1, 1)
    arr.splice(findIndex(arr, b), 0, a)
}

patch(['a', 'b', 'c'], ['a', 'd', 'c', 'b'])
console.log(" ----------------------")
patch(['a', 'b', 'd', 'e', 'c'], ['c', 'g', 'f', 'e'])
console.log(" ----------------------")
patch(['a','c', 'e', 'z', 'g', 'h', 'b'], ['z', 'h', 'g', 'b', 'a', 'e', 'c'])
