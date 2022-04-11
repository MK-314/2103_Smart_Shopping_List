// Canvas Drawing
window.addEventListener('load', () => {
    const context = $('#canvas')[0].getContext('2d');
    const field = $('#field_data').value;
    if (field) {
        const image = new Image();
        image.onload = () => {
            context.drawImage(image, 0, 0);
        };
        image.src = field;
    } else {
        context.fillStyle = "black";
        context.fillRect(0, 0, $('#canvas')[0].width, $('#canvas')[0].height);
    }

    let drawing = false;
    let radius = 10;
    let end = Math.PI * 2;
    let start = 0;

    context.lineWidth = radius * 2;
    context.lineCap = 'round';

    const stroke = (e) => {
        if (drawing) {
            context.fillStyle = "white";
            context.strokeStyle = "white";
            context.lineTo(e.offsetX, e.offsetY);
            context.stroke();
            context.beginPath();
            context.arc(e.offsetX, e.offsetY, radius, start, end);
            context.fill();
            context.beginPath();
            context.moveTo(e.offsetX, e.offsetY);
        }
    }

    const start_drawing = (e) => {
        drawing = true;
        stroke(e);
    }

    const stop_drawing = () => {
        drawing = false;
        context.beginPath();
    }

    $('#canvas')[0].addEventListener('mousedown', start_drawing);
    $('#canvas')[0].addEventListener('mousemove', stroke);
    $('#canvas')[0].addEventListener('mouseup', stop_drawing);

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
document.getElementById("addID2").addEventListener("click", (event) => {
    const sendObject = JSON.stringify({ image: $('#canvas')[0].toDataURL() })
    fetch("http://127.0.0.1:8000/image", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": sendObject
        })
        .then(res => res.json())
        .then(json => {
            // MAIN ATTACHMENT:
            let allResults = JSON.parse(sessionStorage.getItem('allResults'))
            let name = document.getElementById('itemName').value
            let result = json.result
            if (allResults) {
                let index = allResults.length + 2
                allResults.push({ index, name, result })
                sessionStorage.setItem('allResults', JSON.stringify(allResults))
            } else {
                let index = 2
                let newArray = []
                newArray.push({ index, name, result })
                sessionStorage.setItem('allResults', JSON.stringify(newArray))
            }

            window.location.href = './index.html'
            event.preventDefault();
        })
        .catch(err => console.error('error:' + err));
    event.preventDefault();
}, false);