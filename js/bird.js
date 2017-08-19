(function(fb){

    function Bird(options){
        this.img = options.img;
        this.ctx = options.ctx;
        this.x = 100;
        this.y = 100;
        this.index = 0;
        this.g = 0.0005;
        this.v = 0;
        this.maxSpeed = 0.5;
        this.maxAngle = Math.PI / 4;
    }
    // 绘制一帧画面
    Bird.prototype.draw = function(deltaTime){
        // 保存之前的坐标系状态
        this.ctx.save();
        // 平移坐标系原点到小鸟的中心
        this.ctx.translate(this.x + this.img.width/3/2,this.y + this.img.height/2);
        
        // 根据两帧之间的时间间隔计算小鸟垂直方向移动的距离
        // h = v * t + g * t * t / 2; 自由落体位移公式
        var h = this.v * deltaTime + this.g * deltaTime * deltaTime / 2;
        // 计算当前小鸟的垂直向下的速度
        this.v += this.g * deltaTime;
        // 计算当前小鸟的canvas垂直方向坐标
        this.y += h;
        // 控制小鸟精灵图的位置

        // 当前角度/当前速度 = 最大角度/最大速度
        // 当前角度 = 最大角度/最大速度 * 当前速度
        var currentAngle = this.maxAngle / this.maxSpeed * this.v;
        if(currentAngle > this.maxAngle){
            // 如果当前角度大于最大角度，就固定为最大角度
            currentAngle = this.maxAngle;
        }
        // 选择坐标系
        this.ctx.rotate(currentAngle);

        // 绘制小鸟
        this.ctx.drawImage(this.img,52 * this.index,0,52,45,-this.img.width/6,-this.img.height/2,52,45);

        this.index++;
        this.index = this.index % 3;
        this.ctx.restore();
    }

    fb.Bird = Bird;
    
})(FB);