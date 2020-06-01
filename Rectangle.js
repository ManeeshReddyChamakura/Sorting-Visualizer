function Rectangle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.defaultFillStyle = "#5CC0C7";
    this.finalFillStyle = "";

    this.draw = (context, fillStyle) => {
        let currentFillStyle;
        if (this.finalFillStyle) {
            currentFillStyle = this.finalFillStyle;
        } else {
            currentFillStyle = fillStyle ? fillStyle: this.defaultFillStyle;
        }
        context.fillStyle = currentFillStyle;
        context.fillRect(this.x, this.y, this.width, this.height)
    }
}
