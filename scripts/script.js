'use strict';

// 楽天リクエストURLから楽天市場の商品情報を取得
//$rakutenUrl = "&sort=".$url_sort."&page=".$page.;

function sortall() {
    const sort = document.getElementById('form').sort.value;
    const search = document.getElementById('form').word.value;
    const genre = document.getElementById('form').select.value;

    $.ajax({
        url: 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601',
        type: 'GET',
        data: {
            'applicationId': '1050118187675753318',
            'formatVersion': 2,
            'genreId': genre,
            'keyword': search,
            'sort': sort,
            //'page': 0,
        }
    })

    .done(function(data) {
        console.log(data);
        let allItem = "";
        for (let i = 0; i < data.Items.length; i++) {
            const product = data.Items[i];
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
            <button type="button" class="btn btn-outline-primary" onclick="pageJump(0)">最初へ</button>
        </div>
        <div class="btn-group" role="group">`;

        let allPageParts = "";
        for(let i = 0; i < data.pageCount && i < 10; i++) {
                allPageParts = 
                `<button type="button" class="btn btn-outline-primary" onclick="pageJump(` + i + `)">` + (i+1) + `</button>`;
                allPage += allPageParts;
        }

        allPage +=
        `</div>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-primary" onclick="pageJump(` + (data.pageCount-1)  + `)">最後へ</button>
        </div>`;

        document.getElementById("pageItem").innerHTML = allPage;
    })
    .fail(function() {
        window.alert('読み込みエラー');
    });
}

document.getElementById('form').onsubmit = function(event) {
    event.preventDefault();
    const search = document.getElementById('form').word.value;
    const genre = document.getElementById('form').select.value;
    const sort = document.getElementById('form').sort.value;
    
    //ファイルの読み込み
    $.ajax({
        url: 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601',
        type: 'GET',
        data: {
            'applicationId': '1050118187675753318',
            'formatVersion': 2,
            'genreId': genre,
            'keyword': search,
            'sort': sort,
        }
    })

    .done(function(data) {
        console.log(data);
        let allItem = "";
        for (let i = 0; i < data.Items.length; i++) {
            const product = data.Items[i];
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
            <button type="button" class="btn btn-outline-primary" onclick="pageJump(0)">最初へ</button>
        </div>
        <div class="btn-group" role="group">`;

        let allPageParts = "";
        for(let i = 0; i < data.pageCount && i < 10; i++) {
                allPageParts = 
                `<button type="button" class="btn btn-outline-primary" onclick="pageJump(` + i + `)">` + (i+1) + `</button>`;
                allPage += allPageParts;
        }

        allPage +=
        `</div>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-primary" onclick="pageJump(` + (data.pageCount-1)  + `)">最後へ</button>
        </div>`;

        document.getElementById("pageItem").innerHTML = allPage;
        // 検索結果の出力
        document.getElementById('output').textContent = `「${search}」の検索結果：${data.count}件`;
    })
    .fail(function() {
        window.alert('読み込みエラー');
    });

};

function pageJump(pageNum) {
    const sort = document.getElementById('form').sort.value;
    const search = document.getElementById('form').word.value;
    const genre = document.getElementById('form').select.value;

    $.ajax({
        url: 'https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601',
        type: 'GET',
        data: {
            'applicationId': '1050118187675753318',
            'formatVersion': 2,
            'genreId': genre,
            'keyword': search,
            'sort': sort,
            'page': pageNum + 1,
        }
    })

    .done(function(data) {
        console.log(data);
        let allItem = "";
        for (let i = 0; i < data.Items.length; i++) {
            const product = data.Items[i];
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
            <button type="button" class="btn btn-outline-primary" onclick="pageJump(0)">最初へ</button>
        </div>
        <div class="btn-group" role="group">`;

        let allPageParts = "";
        for(let i = 0; i < data.pageCount && i < 10; i++) {
            if(pageNum < 5){
                allPageParts = 
                `<button type="button" class="btn btn-outline-primary" onclick="pageJump(` + i + `)">` + (i+1) + `</button>`;
                allPage += allPageParts;
            }
            else if(pageNum+i < data.pageCount + 5){
                allPageParts = 
                `<button type="button" class="btn btn-outline-primary" onclick="pageJump(` + (pageNum+i-5) + `)">` + (pageNum+i-4) + `</button>`;
                allPage += allPageParts;
            }
        }

        allPage +=
        `</div>
        <div class="btn-group" role="group">
            <button type="button" class="btn btn-outline-primary" onclick="pageJump(` + (data.pageCount-1)  + `)">最後へ</button>
        </div>`;

        document.getElementById("pageItem").innerHTML = allPage;
    })
    .fail(function() {
        window.alert('読み込みエラー');
    });
}