(function(fb){

    function Game(options){
        this.ctx = options.ctx;
        this.currentTime = 0;
        this.lastTime = new Date();
        this.deltaTime = 0;
        this.imgsList = ['birds','land','sky','pipe1','pipe2'];
        this.isRunning = true;
        this.hero = null;
        this.list = [];
    }

    Game.prototype.init = function(){
        var that = this;

        // 加载所有的图片
        fb.loadImages(this.imgsList,function(imgObjs){

            // 绘制蓝天背景
            for (var i = 0; i < 2; i++) {
                var sky = new FB.Sky({
                    ctx : that.ctx,
                    img : imgObjs['sky'],
                    x : that.ctx.canvas.width * i,
                    y : 0
                });
                that.list.push(sky);
            }
            // 绘制管子
            for (var i = 0; i < 6; i++) {
                var pipe = new FB.Pipe({
                    ctx : that.ctx,
                    topImg : imgObjs['pipe2'],
                    bottomImg : imgObjs['pipe1'],
                    x : imgObjs['pipe2'].width * 3 * i + 500
                });
                that.list.push(pipe);
            }
            // 绘制陆地
            for (var i = 0; i < 4; i++) {
                var land = new FB.Land({
                    ctx : that.ctx,
                    img : imgObjs['land'],
                    x : imgObjs['land'].width * i,
                    y : that.ctx.canvas.height - imgObjs['land'].height
                });
                that.list.push(land);
            }
            
            // 实例化小鸟
            var bird = new FB.Bird({
                ctx : that.ctx,
                img : imgObjs['birds']
            });

            that.hero = bird;

            that.ctx.canvas.onclick = function(){
                that.hero.v = -0.3;
            }

            // 绘制一帧画面
            function render(){
                // 清空画布
                that.ctx.clearRect(0,0,that.ctx.canvas.width,that.ctx.canvas.height);
                // 计算时间（每隔多长时间绘制一次）
                // 当前绘制时间
                that.currentTime = new Date();
                // 两帧之间的时间变化量
                that.deltaTime = that.currentTime - that.lastTime;
                // 当前绘制时间指定为最新时间
                that.lastTime = that.currentTime;

                that.ctx.beginPath();
                // 先绘制背景
                that.list.forEach(function(item){
                    item.draw();
                });

                // 判断小鸟边界
                if(that.hero.y >= that.ctx.canvas.height - imgObjs['land'].height - that.hero.img.height){
                    that.isRunning = false;
                }
                if(that.ctx.isPointInPath(that.hero.x + that.hero.img.width/3,that.hero.y)){
                    that.isRunning = false;
                }

                // 绘制和小鸟
                bird.draw(that.deltaTime);

                if(that.isRunning){
                    requestAnimationFrame(render);
                    // setTimeout(render,500);
                }
            }
            // 启动绘制操作
            render();
        });
    }
    
    FB.Game = Game;
})(FB);