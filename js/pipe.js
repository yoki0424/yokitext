(function(fb){
    function Pipe(options){
        this.topImg = options.topImg;
        this.bottomImg = options.bottomImg;
        this.ctx = options.ctx;
        this.speed = 3;
        this.x = options.x;
        this.topY = 0;
        this.bottomY = 0;
        this.spaceHeight = 200;
        this.initHeight();
    }

    Pipe.prototype.draw = function(){
        this.x -= this.speed;
        if(this.x <= -this.topImg.width * 3){
            this.x += this.topImg.width * 3 * 6;
        }
        this.ctx.drawImage(this.topImg,this.x,this.topY);
        this.ctx.drawImage(this.bottomImg,this.x,this.bottomY);
        // 初始化路径，用来判断碰撞
        this.initPath();
    }

    // 初始化管子的高度
    Pipe.prototype.initHeight = function(){
        this.topY = -(Math.random() * 80 + 200);
        this.bottomY = this.topY + this.topImg.height + this.spaceHeight;
    }
    // 绘制管子的路径
    Pipe.prototype.initPath = function(){
        this.ctx.rect(this.x,this.topY,this.topImg.width,this.topImg.height);
        this.ctx.rect(this.x,this.bottomY,this.bottomImg.width,this.bottomImg.height);
    }

    fb.Pipe = Pipe;
})(FB);