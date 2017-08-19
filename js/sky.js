(function(fb){

    function Sky(options){
        this.ctx = options.ctx;
        this.img = options.img;
        this.x = options.x;
        this.y = options.y;
        this.speed = 3;
    }

    Sky.prototype.draw = function(){
        this.x -= this.speed;
        if(this.x <= -this.img.width){
            // 当前背景图片将要离开画布，此时要把该背景重新放到画布的右边
            this.x += this.img.width * 2;
        }
        this.ctx.drawImage(this.img,this.x,this.y);
    }

    fb.Sky = Sky;
    
})(FB);