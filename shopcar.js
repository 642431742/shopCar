// var carlist = [
//     {id:12345,status:false,pic:'https://img14.360buyimg.com/n7/jfs/t1/187574/10/32552/165003/63da381fFda8cbd11/ec8e72f7e9b270d8.jpg',name:'迪奥',price:399,number:3,total:16},
//     {id:67890,status:false,pic:'https://img10.360buyimg.com/n7/jfs/t1/181580/24/32020/498332/63dd52a1F33f08965/e5050a241a9ed3c7.png',name:'爱马仕',price:301234,number:1,total:5},
//     {id:99123,status:false,pic:'https://img12.360buyimg.com/n7/jfs/t1/87528/13/36177/69070/63dccbeeFdd2b5b16/ead6aaad9c75813f.jpg',name:'skII',price:1500,number:1,total:20},
// ]

// 

var newCarlist = JSON.parse(window.localStorage.getItem('carlist')) || [
  { id: 123456, status: 'false', pic: 'https://img11.360buyimg.com/n7/jfs/t1/168845/23/34111/144306/63da50d0F3c99f2c7/ac467d63b4124e82.jpg', name: '杰士邦-安全帽', price: 139, number: 2, total: 500 },
  { id: 123457, status: 'false', pic: 'https://img13.360buyimg.com/jdcms/s150x150_jfs/t1/207811/30/23624/114745/62b12ff1E50adc372/132b194f5614f780.jpg.avif', name: '刚泰丰田 AVALON亚洲龙', price: 279800, number: 1, total: 15 },
  { id: 123458, status: 'false', pic: 'https://img12.360buyimg.com/n1/jfs/t1/53931/34/22807/95330/63c216feFb0d80402/a27099340f715839.jpg', name: '新日（Sunra）折叠电动车', price: 1999.9, number: 1, total: 5 },
];
// 数组[元素][id] = 12345 
// find 
// 
var contentbox = document.querySelector('.content');
// alert(newCarlist)
bindHTML();
function bindHTML(){
    // console.log(newCarlist);
    // console.log(JSON.parse(window.localStorage.getItem('carlist')));
    // 提前把 总件数  多少个被选中的 总价 
    var totalSelect=0,totalNumber=0,totalPrice = 0;
    //加载数据
    newCarlist.forEach(function(item){
        if(item.status){
            totalNumber += item.number;
            totalPrice += item.number * item.price;
            totalSelect++;
        }
    });
        //组装字符串 

    var str = `
        <div class="top">
            <input type="checkbox" class="toggleAll" ${totalSelect == newCarlist.length?'checked':''}> 全选
            </div>
        <ul>
        `;

    newCarlist.forEach(function(item){
            str +=`
            <li>
            <div class="status">
              <input type="checkbox" class="toggle" data-id="${ item.id }" ${item.status?'checked':''}>
            </div>
            <div class="show">
              <img src="${item.pic}" alt="">
            </div>
            <div class="title">
                ${item.name}
            </div>
            <div class="price">
              ￥ ${item.price.toFixed(2)}
            </div>
            <div class="number">
              <button class="subbtn" data-id="${item.id}" >-</button>
              <input type="text" value="${item.number}">
              <button class="addbtn" data-id="${item.id}">+</button>
            </div>
            <div class="sub">
              ￥ ${(item.price * item.number).toFixed(2)}
            </div>
            <div class="destory">
              <button class="del" data-id="${item.id}">删除</button>
            </div>
          </li>
            `
    })
    // alert(totalNumber)
    str += ` </ul>
        <div class="bottom">
          <div class="totalNum">
            总件数 : ${totalNumber}
          </div>
          <div class="btns">
            <button class="clear">清空购物车</button>
            <button class="buy" data-price=${totalPrice} ${totalSelect==0?'disabled':''} >去结算</button>
            <button class="removeSelected" ${totalSelect==0?'disabled':''}>删除所有已选中</button>
          </div>
          <div class="totalPrice">
            总价格 : ￥ <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>`
    // console.log(contentbox);

    contentbox.innerHTML = str
    // 用户如果修改了数据 更新到localStorage中
    window.localStorage.setItem('carlist',JSON.stringify(newCarlist));
}



// 事件委托
// 1.全选按钮
contentbox.addEventListener('click',function(e){
   //判断点击的是否 是全选按钮
   if(e.target.className== 'toggleAll'){
    newCarlist.forEach(function(item){
        item.status = e.target.checked;
    })
    bindHTML();
   } 


// 清空购物车 

  //判断点击的是否 是全选按钮
  if(e.target.className== 'clear'){
   newCarlist.length = 0;
   bindHTML();
  } 


// 去结算  


  //判断点击的是否 是全选按钮
  if(e.target.className== 'buy'){
   var price = e.target.dataset.price-0;
    alert('总价为'+price);
    bindHTML();
  } 



//删除已经选中 

  //判断点击的是否 是全选按钮
  if(e.target.className== 'removeSelected'){
    // for(var i=0;i<newCarlist.length;i++){
    //     if(newCarlist[i].status){
    //         newCarlist.splice(i,1);
    //         i--;
    //     }
    // }
    newCarlist = newCarlist.filter(function(item){
        return !item.status;
    })
 
   bindHTML();

  }
// 每一项的 + 


if(e.target.className== 'addbtn'){
     // 商品的id 已经在渲染数据的时候 绑定到了按钮上
      // 我门先获取id 找到id对应的商品对象
      // 让这个对象的number--
      var id = e.target.dataset.id-0;//获取id 
      // alert(id);
      var info = newCarlist.find(function(item){
          return item.id == id;
      })
      // console.log(info);
      if(info.number >=info.total) return
      info.number++
      bindHTML();
  }




//每一项的 - 


  if(e.target.className== 'subbtn'){
      // 商品的id 已经在渲染数据的时候 绑定到了按钮上
      // 我门先获取id 找到id对应的商品对象
      // 让这个对象的number--
      var id = e.target.dataset.id-0;//获取id 
      // alert(id);
      var info = newCarlist.find(function(item){
          return item.id == id;
      })
      // console.log(info);
      if(info.number <=1 ) return  //购物车数量>1 才能--
      info.number--;

      bindHTML();
  }
   



// 每一项元素前面的复选框  


    if(e.target.className == 'toggle'){
        var id = e.target.dataset.id-0; //获取对应的id
        //根据id找到对应的商品对象
        var info = newCarlist.find(function(item){
            return item.id == id;
        })
        // 点击状态 取反 
        info.status = !info.status;
        // 重新渲染页面
        bindHTML();
    }


  if(e.target.className == 'del'){
    var id = e.target.dataset.id - 0;
    // alert(id);
    //找到对象  
    var info = newCarlist.find(function(item){
      return item.id == id;
    })
    console.log(info)
  
    //咨询是否确定删除 
  
    if(!confirm(`确定删除${info.name}么?`)){
      return
    }
    // 删除
    // 留下没有被选中的 = 删除 选中的 
    newCarlist = newCarlist.filter(function(item){
      return item.id != id;
    })
  
    bindHTML();
  }

})
