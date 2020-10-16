const div = dom.find('#test>.red')[0] // 获取对应的元素
dom.style(div, 'color', 'red') // 设置 div.style.color

const divList = dom.find('.red') // 获取多个 div.red 元素
dom.each(divList, (n) => console.log(n)) // 遍历 divList 里的所有元素



// <div id="test">
//     <div class="red">hi</div>
// <div class="red">hi</div>
// <div class="red">hi</div>
// <div class="red">hi</div>
// <div class="red">hi</div>
// </div>

const test=dom.find('#test')[0]
dom.delegateEvent(test,'#test .red','click',()=>{
    console.log('我被点击了')
})