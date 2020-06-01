function MergeSort(canvas, numbersSlider, width) {
    this.canvas = canvas;
    this.canvasHeight = undefined;
    this.canvasWidth = width;
    this.rectangles = [];
    this.pointer1Index = -1; this.pointer2Index=-1;
    this.n=0;
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
        this.n = this.rectangles.length;
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
        await this.mergeSort(this.rectangles, 0, this.n - 1);
        if (this.stopExecution) {
            return;
        }
        this.draw();
        for (let rectangle of this.rectangles) {
            if (this.stopExecution) {
                return;
            }
            rectangle.finalFillStyle = "green";
            this.draw();
            await sleep(10);
        }
        console.log('merge sorting ended')
    };

    this.mergeSort = async (arr, low, high) => {
        if (low < high) {
            let mid = Math.floor((high - low)/2) + low ;
            await this.mergeSort(arr, low, mid);
            await this.mergeSort(arr, mid+1, high);
            await this.merge(arr, low, mid, high);
        }
    };

    this.merge = async (arr, low, mid, high) => {
        let temp = [];
        let i=low, j=mid+1;
        while (i <= mid && j <= high) {
            this.pointer1Index=i;
            this.pointer2Index=j;
            this.draw();
            if (this.stopExecution) {
                return;
            }
            await sleep(this.time);          
            if (arr[i].height < arr[j].height) {
                temp.push(arr[i]);
                i++;
            } else {
                temp.push(arr[j]);
                j++;
            }
        }
        if (this.stopExecution) {
            return;
        }
        this.pointer1Index=this.pointer2Index=-1;
        while (i <= mid) {
            temp.push(arr[i]);
            i++;
        }
        while (j <= high) {
            temp.push(arr[j]);
            j++;
        }
        if (this.stopExecution) {
            return;
        }
        for (let k=0; k<temp.length; k++) {
            let x = arr[low+k].x;
            let height = temp[k].height;
            let y = this.canvasHeight - height;
            arr[low+k] = new Rectangle(x, y, this.barWidth, height);
            if (this.stopExecution) {
                return;
            }
        }
    };

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