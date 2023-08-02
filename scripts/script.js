'use strict';

function searchItem(pageNum) {
    const sort = document.getElementById('form').sort.value;
    const search = document.getElementById('form').word.value;
    const genre = document.getElementById('form').select.value;
    const minPrice = document.getElementById('form').minPrice.value;
    const maxPrice = document.getElementById('form').maxPrice.value;
    let ngWord = document.getElementById('form').ngword.value;
    let nitem = "";
    if(ngWord != "") {
        nitem = "&NGKeyword=" + ngWord;
    }

(async () => {
        const url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?format=json&applicationId=1050118187675753318&formatVersion=2&keyword="+search+"&genreId="+genre+"&sort="+sort+"&page="+(pageNum+1)+"&minPrice="+minPrice+"&maxPrice="+maxPrice+nitem;
        const res = await fetch(url);
        let json;
        try {
            if (res.ok) {
                json = await res.json();
                console.log(json);
                console.log(url);
                let allItem = "";
                for (let i = 0; i < json.Items.length; i++) {
                    const product = json.Items[i];
                    let allItemParts =
                        `<li><a href="` +
                        product.itemUrl +
                        `" target="_blank" class="productLink link-` +
                        (i + 1) +
                        `">
                        <img src="` +
                        product.mediumImageUrls[0] +
                        `" alt="` +
                        product.itemName +
                        `" class="productImage">
                        <p class="productName">` +
                        product.itemName +
                        `</p>
                        <p class="productPrice">` +
                        product.itemPrice.toLocaleString() +
                        `<span>円</span></p>
                        </a></li>`;
                    allItem += allItemParts;
                }
                document.getElementById("rakutenItem").innerHTML = allItem;

                let allPage =
        `<div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-primary" onclick="searchItem(0)">最初へ</button>
        </div>
        <div class="btn-group" role="group">`;

        let allPageParts = "";
        for(let i = 0; i < json.pageCount && i < 10; i++) {
            if(pageNum < 5){
                allPageParts = 
                `<button type="button" class="btn btn-outline-primary" onclick="searchItem(` + i + `)">` + (i+1) + `</button>`;
                allPage += allPageParts;
            } else if(pageNum+i < json.pageCount + 5){
                allPageParts = 
                `<button type="button" class="btn btn-outline-primary" onclick="searchItem(` + (pageNum+i-5) + `)">` + (pageNum+i-4) + `</button>`;
                allPage += allPageParts;
            }
        }

        allPage +=
        `</div>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-primary" onclick="searchItem(` + (json.pageCount-1)  + `)">最後へ</button>
        </div>`;

        document.getElementById("pageItem").innerHTML = allPage;
        // 検索結果の出力
        document.getElementById('output').textContent = `「${search}」の検索結果：${json.count}件`;
            } else {
                throw new Error(res.status);
            }
        } catch (e) {
            console.error(e);
            window.alert(e);
        }
    })();
}

/*
var xhr = new XMLHttpRequest();
xhr.open('get', 'URLはココ');
xhr.send();
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText);
    }
}
*/