class AsciiDonut{
    private canvastag = document.getElementById('canvas') as HTMLCanvasElement;
    private pretag = document.querySelector(".don");
   
    private R1 = 1;
    private R2 = 2;
    private K2 = 5;
    private K1 = 150;
    private A = 1;
    private B = 1;

    private shades: string[] = [".", ",", "~",":", "=", "*", "#", "$", "@"];

    constructor(){

    }

    render_canvasDonut() {
        //precompute sin/cosin values
        var cosA: number = Math.cos(this.A);
        var sinA: number = Math.sin(this.A);
        var cosB: number = Math.cos(this.B);
        var sinB: number = Math.sin(this.B);

        this.A += 0.07;
        this.B += 0.03;

        var context = this.canvastag.getContext('2d');
        context.fillStyle = '#000';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        for(var j=0; j<6.28; j+=0.3){
            var ct = Math.cos(j);
            var st = Math.sin(j);
            for(var i=0;i<6.28;i+=0.1){
                var sp = Math.sin(i);
                var cp = Math.cos(i);
                var ox = this.R2  + this.R1 * ct;
                var oy = this.R1 * st;

                var x = ox * (cosB * cp + sinA * sinB * sp) - (oy * sinB * sp);
                var y = ox * (sinB * cp - sinA * cosB * sp) + (oy * cosA * cosB);
                var ooz = 1/(this.K2 + cosA * ox * sp + sinA * oy);
                var xp = (150 + this.K1 * ooz * x);
                var yp = (120 - this.K1 * ooz * y);

                var L = 0.7 * (cp * ct * sinB - cosA * ct * sp - sinA * st + cosB * (cosA * st - ct * sinA * sp));
                if(L > 0){
                    var lum_index = L*8
                    //context.fillStyle = 'rgba(23,218,1,'+L+')';
                    //context.fillRect(xp, yp, 1.5, 1.5);
                    context.font = "15px Gerogia";
                    context.strokeStyle = "#5EA832";
                    context.strokeText(this.shades[Math.floor(lum_index)], xp, yp);
                }
            }
        }
    };
}


var TestDonut = new AsciiDonut();
setInterval(function(){
    TestDonut.render_canvasDonut();
}, 50);