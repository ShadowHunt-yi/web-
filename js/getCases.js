import { ajax, baseUrl } from "./ajax.js"
var res = {}
ajax({
    method: 'get',
    url: 'js/case.json',
    async: false,
    success: function(response, e) {
        res = JSON.parse(response).cases
        sessionStorage.setItem('caseSum', res.length);
    }
})
console.log(res)
var casesbox = document.getElementById('cases')
var code = ''

for (let i = 0; i < res.length; i++) {
    code += `<ul class="item-content">
        <li class="td-chk fl">
            <div class="td-inner">
                <input type="checkbox" class="choose">
            </div>
        </li>
        <li class="td-item fl">
            <div class="td-inner fl">
                <img src='${res[i].imgSrc}'>
            </div>
            <div class="item-info">${res[i].name}
            </div>
        </li>
        <li class="td-price fl"> ${res[i].price+'.00'}</li>
        <li class="td-amount fl">
            <div class="td-inner">
                <a href="#" class="btn td-sub fl">-</a>
                <input type="text" value="1" class=" inpt fl">
                <a href="#" class="btn td-add fl">+</a>
            </div>
        </li>
        <li class="td-sum fl">
            <div class="td-inner">${res[i].price+'.00'} </div>
        </li>
        <li class="td-caozuo fl">
            <a href="#" class="a">删除</a>
        </li>
    </ul>`
}

casesbox.innerHTML = code