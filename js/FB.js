(function(window){
    var FB = {}
    // 加载所有的图片
    FB.loadImages = function(arr,callback){
        // 记录加载成功的图片数量
        var total = 0;
        var imgList = {};
        arr.forEach(function(item){
            var img = new Image();
            img.src = './imgs/' + item + '.png';
            imgList[item] = img;
            img.onload = function(){
                total++;
                if(total == arr.length){
                    // 如果所有的图片都加载成功就调用回调函数
                    callback(imgList);
                }
            }
        });
    }  
    window.FB = FB;
})(window)