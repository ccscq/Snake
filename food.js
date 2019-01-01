/**
 *Create by scq
 */
//自调用函数---食物的

(function (){
    var elements=[];//食物数组
    //定义食物构造函数
    function Food(x,y,width,height,color){
        this.x=x||0;
        this.y=y||0;
        this.width=width||20;
        this.height=height||20;
        this.color=color||"green";
    }

    //为食物原型添加初始化方法
    Food.prototype.init=function(map){
        //删除食物
        remove();

        //创建div
        var div=document.createElement("div");
        map.appendChild(div);
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.backgroundColor=this.color;

        //脱离文档刘
        div.style.position="absolute";
        //随机取横纵坐标
        this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;
        this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        div.style.left=this.x+"px";
        div.style.top=this.y+"px";
        //把div加入到数组elements中
        elements.push(div);
    }

    //私有函数--删除食物
    function remove(){
        for(var i=0;i<elements.length;i++){
            var ele=elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    }

    window.Food=Food;

}());