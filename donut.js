var AsciiDonut = /** @class */ (function () {
    function AsciiDonut() {
        this.canvastag = document.getElementById('canvas');
        this.pretag = document.querySelector(".don");
        this.R1 = 1;
        this.R2 = 2;
        this.K2 = 5;
        this.K1 = 150;
        this.A = 1;
        this.B = 1;
        this.shades = [".", ",", "~", ":", "=", "*", "#", "$", "@"];
    }
    AsciiDonut.prototype.render_canvasDonut = function () {
        //precompute sin/cosin values
        var cosA = Math.cos(this.A);
        var sinA = Math.sin(this.A);
        var cosB = Math.cos(this.B);
        var sinB = Math.sin(this.B);
        this.A += 0.07;
        this.B += 0.03;
        var context = this.canvastag.getContext('2d');
        context.fillStyle = '#000';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        for (var j = 0; j < 6.28; j += 0.3) {
            var ct = Math.cos(j);
            var st = Math.sin(j);
            for (var i = 0; i < 6.28; i += 0.1) {
                var sp = Math.sin(i);
                var cp = Math.cos(i);
                var ox = this.R2 + this.R1 * ct;
                var oy = this.R1 * st;
                var x = ox * (cosB * cp + sinA * sinB * sp) - (oy * sinB * sp);
                var y = ox * (sinB * cp - sinA * cosB * sp) + (oy * cosA * cosB);
                var ooz = 1 / (this.K2 + cosA * ox * sp + sinA * oy);
                var xp = (150 + this.K1 * ooz * x);
                var yp = (120 - this.K1 * ooz * y);
                var L = 0.7 * (cp * ct * sinB - cosA * ct * sp - sinA * st + cosB * (cosA * st - ct * sinA * sp));
                if (L > 0) {
                    var lum_index = L * 8;
                    //context.fillStyle = 'rgba(23,218,1,'+L+')';
                    //context.fillRect(xp, yp, 1.5, 1.5);
                    context.font = "15px Gerogia";
                    context.strokeStyle = "#5EA832";
                    context.strokeText(this.shades[Math.floor(lum_index)], xp, yp);
                }
            }
        }
    };
    ;
    return AsciiDonut;
}());
var TestDonut = new AsciiDonut();
setInterval(function () {
    TestDonut.render_canvasDonut();
}, 50);
