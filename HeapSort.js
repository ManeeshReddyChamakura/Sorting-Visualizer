function HeapSort(canvas, numbersSlider, width) {
    this.canvas = canvas;
    this.canvasHeight = undefined;
    this.canvasWidth = width;
    this.rectangles = [];
    this.pointer1Index = -1; this.pointer2Index=-1;
    this.barGap = 10;
    this.barWidth = undefined;
    this.numbersSlider = numbersSlider;
    this.pointer1FillStyle = "#09087F";
    this.pointer2FillStyle = "#F21905";
    this.time = 10;
    this.stopExecution = false;


    this.init = () => {
        this.rectangles = [];
        //let temp = Math.floor(window.innerWidth/10)*10;
        this.canvasHeight = 500;
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;        
        this.context = this.canvas.getContext('2d');
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.pointer1Index = -1;
        this.pointer2Index = -1;
        this.stopExecution = false;
        this.generateRectangles();
        this.draw();
    };

    this.generateRectangles = () => {
        this.barWidth = Math.floor(this.canvasWidth/this.numbersSlider.value) - this.barGap;
        let x = 0, width=this.barWidth, height=Math.floor(Math.random() * this.canvasHeight)+1, gap=this.barGap, y=this.canvasHeight - height;
        while (x+ width < this.canvasWidth) {
            let rectangle = new Rectangle(x, y, width, height);
            this.rectangles.push(rectangle);
            x += width + gap;
            height = Math.floor(Math.random() * this.canvasHeight) + 1;
            y = this.canvasHeight - height;
        }  
    };

    this.draw = (callback) => {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        for (let i=0; i<this.rectangles.length; i++) {
            if (i == this.pointer1Index) {
                this.rectangles[i].draw(this.context, this.pointer1FillStyle);
            } else if (i == this.pointer2Index) {
                this.rectangles[i].draw(this.context, this.pointer2FillStyle);
            } else {
                this.rectangles[i].draw(this.context);
            }
        }
        if (typeof callback === "function") {
            callback();
        }
    };

    this.initiateSorting = async () => {
        this.stopExecution = false;
        this.pointer1Index = this.pointer2Index = -1;
        for (let rectangle of this.rectangles) {
            rectangle.finalFillStyle = "";
        }
        await this.heapSort(this.rectangles);
        if (this.stopExecution) {
            return;
        }
        this.draw();
        console.log('heap sorting ended')
    };

    this.heapSort = async (array) => {
        let n = array.length;
        for (let i=Math.floor(n/2)-1; i>=0; i--) {
            await this.heapify(array, i, n);
            if (this.stopExecution) {
                return;
            }
        }
        for (let i=n-1; i>=0; i--) {
            this.swap(array, 0, i);
            array[i].finalFillStyle = "green";
            this.draw();
            if (this.stopExecution) {
                return;
            }
            await sleep(this.time);
            await this.heapify(array, 0, i);
        }
        this.pointer1Index = this.pointer2Index = -1;
    };
      
    this.heapify = async (array, i, n) => {
        let largest = i;
        let left = 2*i + 1;
        let right = 2*i + 2;
        if (left < n && array[left].height > array[largest].height) {
            largest = left;
        }
        if (right < n && array[right].height > array[largest].height) {
            largest = right;
        }
        if (this.stopExecution) {
            return;
        }
        if (largest != i) {
            this.pointer1Index=largest;
            this.pointer2Index=i;
            this.draw();
            if (this.stopExecution) {
                this.pointer1Index = this.pointer2Index = -1;
                return;
            }
            await sleep(this.time);
            this.swap(array, i, largest);
            await this.heapify(array, largest, n);
        }
        this.pointer1Index = this.pointer2Index = -1;
    }


    this.swap = (arr, i, j) => {
        let tempHeight = arr[i].height;
        arr[i].height = arr[j].height;
        arr[j].height = tempHeight;
        arr[i].y = this.canvasHeight - arr[i].height;
        arr[j].y = this.canvasHeight - arr[j].height;
    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    this.setTime = (time) => {
        this.time = time;
    };

    this.changeInput = async () => {
        this.stopExecution = true;
        await sleep(10);
        this.init();
    };

    this.reset = async () => {
        this.stopExecution = true;
        await sleep(10);        
    };

}