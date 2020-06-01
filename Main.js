let canvas = document.getElementById('mycanvas');
let numbersSlider = document.getElementById('numbers-slider');
let timeSelect = document.getElementById('mySelect');
let sortLabel = document.getElementById('sort-label');
//let numberCanvas = document.getElementById('mycanvas2');
document.getElementById("defaultOption").selected = "true";
numbersSlider.max = 100;
numbersSlider.value = "50";
let marginLeft = "50px";

let sort = new BubbleSort(canvas, numbersSlider, window.innerWidth - 100);
canvas.style.marginLeft = marginLeft;
sort.setTime(parseInt(timeSelect.options[timeSelect.selectedIndex].text));
sort.init();

let bubbleBtn = document.getElementById('bubble-btn');
bubbleBtn.onclick = async () => {
    await sort.reset();
    sort = new BubbleSort(canvas, numbersSlider, window.innerWidth - 100);
    sort.setTime(parseInt(timeSelect.options[timeSelect.selectedIndex].text));
    sort.init();
    sortLabel.innerHTML = "Bubble Sort";
    canvas.style.marginLeft = marginLeft;
};
let quickBtn = document.getElementById('quick-btn');
quickBtn.onclick = async () => {
    await sort.reset();
    sort = new QuickSort(canvas, numbersSlider, window.innerWidth - 100);
    sort.setTime(parseInt(timeSelect.options[timeSelect.selectedIndex].text));
    sort.init();
    sortLabel.innerHTML = "Quick Sort";
    canvas.style.marginLeft = marginLeft;
};
let mergeBtn = document.getElementById('merge-btn');
mergeBtn.onclick = async () => {
    await sort.reset();
    sort = new MergeSort(canvas, numbersSlider, window.innerWidth - 100);
    sort.setTime(parseInt(timeSelect.options[timeSelect.selectedIndex].text));
    sort.init();
    sortLabel.innerHTML = "Merge Sort";
    canvas.style.marginLeft = marginLeft;
};
let heapBtn = document.getElementById('heap-btn');
heapBtn.onclick = async () => {
    await sort.reset();
    sort = new HeapSort(canvas, numbersSlider, window.innerWidth - 100);
    sort.setTime(parseInt(timeSelect.options[timeSelect.selectedIndex].text));
    sort.init();
    sortLabel.innerHTML = "Heap Sort";
    canvas.style.marginLeft = marginLeft;
};

let startSort = document.getElementById('start-sort');
startSort.onclick = () => {
    sort.initiateSorting();
};


numbersSlider.oninput = () => {
    sort.changeInput();
};

timeSelect.oninput = () => {
    let newTime = parseInt(timeSelect.options[timeSelect.selectedIndex].text);
    sort.setTime(newTime);
};