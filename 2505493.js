const reader = new Html5Qrcode("camera");
let scannerOn = false;

function toggleScanner() {
    scannerOn = !scannerOn;
    if (scannerOn) {
        startScanner();
        mapContainer.style.display = "none";
        btn.innerText = "CANCEL";
    } else {
        stopScanner();
        mapContainer.style.display = "block";
        btn.innerText = "SCAN";
    }
}

function startScanner() {
    reader.start(
        { facingMode: "environment" },
        {},
        function (text) {
    const data = JSON.parse(text);

    // Map marker
    if (data.top && data.left) {
        showMarkerAt(data.top, data.left);
    }

    // Show item in inventory
    if (data.name && data.price !== undefined) {
        displayItem(data);
    }

    toggleScanner();
}
    ).catch(function (err) {
        console.error(err);
    });
}

function stopScanner() {
    reader.stop();
}

function showMarkerAt(top, left) {
    marker.style.top = top;
    marker.style.left = left;
}

function displayItem(item) {
    const container = document.getElementById("inventory");

    const div = document.createElement("div");

    div.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: €${item.price}</p>
        <p>${item.inStock ? "In stock" : "Out of stock"}</p>
    `;

    container.appendChild(div);
}