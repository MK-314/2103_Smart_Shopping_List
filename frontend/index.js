$('#createPage').on('click', function() {
    window.location.href = './create.html'
})

window.addEventListener('load', () => {
    // let result = sessionStorage.getItem('res')
    // let itemName = sessionStorage.getItem('name')
    let allResults = JSON.parse(sessionStorage.getItem('allResults'))
    console.log(JSON.stringify(allResults));
    if (allResults) {
        for (const i in allResults) {
            let id1 = createElem("main-content", "div", null, "onerow")
            let id2 = createElem(id1, "div", null, "box-class-item")
            let id3 = createElem(id2, "div", null, "box-index")
            let id7 = createElem(id3, "i", null, "bi bi-check-square")
            document.getElementById(id7).setAttribute("style", "font-size: 1.7rem; color: cornflowerblue;")
            let id4 = createElem(id3, "p", allResults[i].index, "default-text")
            let id5 = createElem(id2, "div", null, "box-for-text")
            let id6 = createElem(id5, "p", `${allResults[i].name} \xa0\xa0  ${allResults[i].result} \xa0\xa0\xa0\xa0 lb`, "default-text")
        }
    }
});

function createElem(parentId, typeOfElem, text, attributes) {
    let newid = Math.floor(Math.random() * 1000000000000)
    let myparent = document.getElementById(parentId)
    let elem = document.createElement(typeOfElem);
    if (text) {
        elem.innerText = text
    }
    if (attributes) {
        elem.setAttribute("class", attributes);
    }
    elem.setAttribute("id", newid);
    myparent.appendChild(elem);
    return newid
}
$('#removeItem').on('click', function() {
    let allResults = JSON.parse(sessionStorage.getItem('allResults'))
    console.log(JSON.stringify(allResults));
    if (allResults) {
        allResults.pop()
        sessionStorage.setItem('allResults', JSON.stringify(allResults))
    }
    window.location.href = './index.html'
})