function BubbleSort(currentCanvas, slider, width) {  
    this.rectangles = [];
    this.pointer1FillStyle = "#09087F";
    this.pointer2FillStyle = "#F21905";
    this.canvasWidth = width;
    this.canvasHeight = 0;
    this.context = undefined;
    this.barGap = 10;
    this.barWidth = undefined;
    this.pointer1Index = -1;
    this.pointer2Index = -1;
    this.time = 3;
    this.bubbleTimeout= undefined;
    this.singelTimeout = undefined;
    this.i=0;this.j=0;
    this.canvas = currentCanvas;
    this.numbersSlider = slider;
    // this.numberCanvas = numberCanvas;
    // this.numberContext = undefined;

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    this.init = () => {
        this.rectangles = [];        
        this.canvasHeight = "550";
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        // this.numberCanvas.width = this.canvasWidth;
        // this.numberCanvas.height = "100";
        // this.numberContext = this.numberCanvas.getContext("2d");
        this.context = this.canvas.getContext('2d');
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.pointer1Index = -1;
        this.pointer2Index = -1;
        this.i=0;
        this.j=0;
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
        // this.numberContext.clearRect(0, 0, this.canvasWidth, this.numberCanvas.height);
        for (let i=0; i<this.rectangles.length; i++) {
            if (i == this.pointer1Index) {
                this.rectangles[i].draw(this.context, this.pointer1FillStyle);
            } else if (i == this.pointer2Index) {
                this.rectangles[i].draw(this.context, this.pointer2FillStyle);
            } else {
                this.rectangles[i].draw(this.context);
            }
            // this.numberContext.font = 'italic 10px sans-serif';;
            // this.numberContext.fillText(this.rectangles[i].height+"", this.rectangles[i].x, 10);
        }
        if (typeof callback === "function") {
            callback();
        }
    };

    this.initiateSorting = () => {
        this.pointer1Index = this.pointer2Index = -1;
        this.i = this.j = 0;
        for (let rectangle of this.rectangles) {
            rectangle.finalFillStyle = "";
        }
        this.bubbleSort();
    };

    this.bubbleSort = () => {
        this.bubbleTimeout = setTimeout(() => {
            this.pointer1Index = this.j; 
            this.pointer2Index = this.j+1;
            this.draw(() => {
                if (this.rectangles[this.j].height > this.rectangles[this.j+1].height) {
                    let tempHeight = this.rectangles[this.j].height;
                    this.rectangles[this.j].height = this.rectangles[this.j+1].height;
                    this.rectangles[this.j+1].height = tempHeight;
                    this.rectangles[this.j].y = this.canvasHeight- this.rectangles[this.j].height;
                    this.rectangles[this.j+1].y = this.canvasHeight - this.rectangles[this.j+1].height;
                }            
                if (this.j == this.n - this.i - 2) {
                    this.rectangles[this.j+1].finalFillStyle = "green";
                    this.j = 0;
                    this.i++;
                    if (this.i == this.n - 1) {
                        console.log('reached')
                        this.singleTimeout = setTimeout(() => {
                            this.rectangles[0].finalFillStyle = "green";
                            this.draw();
                        }, this.time);
                        return;
                    }
                } else {
                    this.j++;
                }
                this.bubbleSort();
            });
        }, this.time);
    };

    this.changeInput = () => {
        clearTimeout(this.bubbleTimeout);
        clearTimeout(this.singleTimeout);
        this.pointer1Index=-1;this.pointer2Index=-1;
        this.init()
        this.draw()
    };

    this.reset = async () => {
        clearTimeout(this.bubbleTimeout);
        clearTimeout(this.singleTimeout);
        this.pointer1Index=-1;this.pointer2Index=-1;
        this.i=0;
        this.j=0;this.n=0;
    };

    this.setTime = (time) => {
        this.time = time;
    };


}