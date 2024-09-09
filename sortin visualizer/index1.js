const container = document.querySelector(".data-container");

// Function to generate bars
function generateBars(num = 20) {
    container.innerHTML = ""; // Clear previous bars
    for (let i = 0; i < num; i++) {
        const value = Math.floor(Math.random() * 90) + 10;
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        bar.style.transform = `translateX(${i * 30}px)`;
        const barLabel = document.createElement("label");
        barLabel.classList.add("bar_id");
        barLabel.innerHTML = value;
        bar.appendChild(barLabel);
        container.appendChild(bar);
    }
}

// Function to disable buttons during sorting
function disableButtons() {
    document.getElementById("Button1").disabled = true;
    document.getElementById("Button2").disabled = true;
}

// Function to enable buttons after sorting
function enableButtons() {
    document.getElementById("Button1").disabled = false;
    document.getElementById("Button2").disabled = false;
}

// Selection Sort
async function selectionSort() {
    let bars = document.querySelectorAll(".bar");
    for (let i = 0; i < bars.length; i++) {
        let minIndex = i;
        bars[i].style.backgroundColor = "darkblue";
        for (let j = i + 1; j < bars.length; j++) {
            bars[j].style.backgroundColor = "yellow";
            await new Promise(resolve => setTimeout(resolve, 100));
            let val1 = parseInt(bars[j].childNodes[0].innerHTML);
            let val2 = parseInt(bars[minIndex].childNodes[0].innerHTML);
            if (val1 < val2) {
                if (minIndex !== i) {
                    bars[minIndex].style.backgroundColor = "rgb(24, 190, 255)";
                }
                minIndex = j;
            } else {
                bars[j].style.backgroundColor = "rgb(24, 190, 255)";
            }
        }
        let tempHeight = bars[minIndex].style.height;
        let tempText = bars[minIndex].childNodes[0].innerText;
        bars[minIndex].style.height = bars[i].style.height;
        bars[i].style.height = tempHeight;
        bars[minIndex].childNodes[0].innerText = bars[i].childNodes[0].innerText;
        bars[i].childNodes[0].innerText = tempText;
        await new Promise(resolve => setTimeout(resolve, 100));
        bars[minIndex].style.backgroundColor = "rgb(24, 190, 255)";
        bars[i].style.backgroundColor = "rgb(49, 226, 13)";
    }
    enableButtons();
}// Merge Sort
async function mergeSort() {
    let bars = document.querySelectorAll(".bar");
    await mergeSortHelper(bars, 0, bars.length - 1);
    enableButtons();
}

async function mergeSortHelper(bars, left, right) {
    if (left < right) {
        let mid = Math.floor((left + right) / 2);
        await mergeSortHelper(bars, left, mid);
        await mergeSortHelper(bars, mid + 1, right);
        await merge(bars, left, mid, right);
    }
}

async function merge(bars, left, mid, right) {
    let tempArray = [];
    let i = left;
    let j = mid + 1;
    let k = 0;

    while (i <= mid && j <= right) {
        let val1 = parseInt(bars[i].childNodes[0].innerHTML);
        let val2 = parseInt(bars[j].childNodes[0].innerHTML);
        bars[i].style.backgroundColor = "yellow";
        bars[j].style.backgroundColor = "yellow";
        await new Promise(resolve => setTimeout(resolve, 100));
        if (val1 <= val2) {
            tempArray[k++] = bars[i++];
        } else {
            tempArray[k++] = bars[j++];
        }
    }

    while (i <= mid) {
        tempArray[k++] = bars[i++];
    }

    while (j <= right) {
        tempArray[k++] = bars[j++];
    }

    for (let p = 0; p < tempArray.length; p++) {
        bars[left + p].style.height = tempArray[p].style.height;
        bars[left + p].childNodes[0].innerText = tempArray[p].childNodes[0].innerText;
        await new Promise(resolve => setTimeout(resolve, 100));
        bars[left + p].style.backgroundColor = "rgb(24, 190, 255)";
    }
}

// Quick Sort
async function quickSort() {
    let bars = document.querySelectorAll(".bar");
    await quickSortHelper(bars, 0, bars.length - 1);
    enableButtons();
}

async function quickSortHelper(bars, low, high) {
    if (low < high) {
        let pivot = await partition(bars, low, high);
        await quickSortHelper(bars, low, pivot - 1);
        await quickSortHelper(bars, pivot + 1, high);
    }
}

async function partition(bars, low, high) {
    let pivot = parseInt(bars[high].childNodes[0].innerHTML);
    let i = low - 1;
    for (let j = low; j < high; j++) {
        let val = parseInt(bars[j].childNodes[0].innerHTML);
        if (val < pivot) {
            i++;
            await swap(bars, i, j);
        }
    }
    await swap(bars, i + 1, high);
    return i + 1;
}

// Bubble Sort
async function bubbleSort() {
    let bars = document.querySelectorAll(".bar");
    let n = bars.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            let val1 = parseInt(bars[j].childNodes[0].innerHTML);
            let val2 = parseInt(bars[j + 1].childNodes[0].innerHTML);
            bars[j].style.backgroundColor = "yellow";
            bars[j + 1].style.backgroundColor = "yellow";
            await new Promise(resolve => setTimeout(resolve, 100));
            if (val1 > val2) {
                await swap(bars, j, j + 1);
            }
            bars[j].style.backgroundColor = "rgb(24, 190, 255)";
            bars[j + 1].style.backgroundColor = "rgb(24, 190, 255)";
        }
    }
    enableButtons();
}

// Insertion Sort
async function insertionSort() {
    let bars = document.querySelectorAll(".bar");
    let n = bars.length;
    for (let i = 1; i < n; i++) {
        let key = parseInt(bars[i].childNodes[0].innerHTML);
        let j = i - 1;
        while (j >= 0 && parseInt(bars[j].childNodes[0].innerHTML) > key) {
            bars[j].style.backgroundColor = "yellow";
            bars[j + 1].style.backgroundColor = "yellow";
            bars[j + 1].style.height = bars[j].style.height;
            bars[j + 1].childNodes[0].innerText = bars[j].childNodes[0].innerText;
            j = j - 1;
            await new Promise(resolve => setTimeout(resolve, 100));
            bars[j + 1].style.backgroundColor = "rgb(24, 190, 255)";
        }
        bars[j + 1].style.height = `${key * 3}px`;
        bars[j + 1].childNodes[0].innerText = key;
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    enableButtons();
}


// Function to initiate sorting based on user selection
function sort() {
    disableButtons();
    const selectedMethod = document.getElementById("sortMethod").value;
    switch (selectedMethod) {
        case "SelectionSort":
            selectionSort();
            break;
        case "MergeSort":
            mergeSort();
            break;
        case "QuickSort":
            quickSort();
            break;
        case "BubbleSort":
            bubbleSort();
            break;
        case "InsertionSort":
            insertionSort();
            break;
        default:
            console.error("Invalid sorting method");
            enableButtons();
    }
}

// Initial generation of bars
generateBars();
