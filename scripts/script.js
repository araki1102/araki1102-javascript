'use strict';

// document.getElementById('searchBar').style.visibility = "hidden";
document.getElementById('pageItem').style.visibility = "hidden";

function searchItem(pageNum) {
    const sort = document.getElementById('form').sort.value;
    const search = document.getElementById('form').word.value;
    const genre = document.getElementById('form').select.value;
    const minPrice = document.getElementById('form').minPrice.value;
    const maxPrice = document.getElementById('form').maxPrice.value;
    const ngWord = document.getElementById('form').ngword.value;
    let nitem = "";
    if(ngWord != "") {
        nitem = "&NGKeyword=" + ngWord;
    }
    const display = document.getElementById('form').display.value;
    let displayParts = 0;
    let allItem = "";
    const pages = parseInt(document.getElementById('form').page.value) || 0;
    let ranking = "";
    let rankList = [];
    const rankingValue = 5;
    const timer = 300, Timer = 100 * display;
    const itemDisplay = 10;

    (async () => {
    itemTable : for (let pageRotate = 0; pageRotate < display; pageRotate++) {
        const url = "https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?format=json&applicationId=1050118187675753318&formatVersion=2&keyword="+search+"&genreId="+genre+"&sort="+sort+"&page="+((pages*display)+1+pageRotate)+"&minPrice="+minPrice+"&maxPrice="+maxPrice+nitem+"&hits=10";
        const res = await fetch(url);
        let json;
        try {
            if (res.ok) {
                json = await res.json();
                console.log(json);
                console.log(url);
                document.getElementById('searchBar').style.visibility = "visible";
                
                // 検索ボタンの連打防止
                const btn = document.getElementById('searchBtn');
                btn.disabled = true;
                setTimeout(() => { btn.disabled = false; }, Timer);

                // 検索結果の出力
                document.getElementById('output').textContent = `「${search}」の検索結果：${json.count}件`;
                document.getElementById('recommend').textContent = `あなたへのおすすめ商品`;

                // ページ数の表示
                document.getElementById('pageItem').style.visibility = "visible";
                const pageCountAll = Math.floor(json.pageCount/display);
                let allPage =
                `<select name="page" class="formcontrol col" onchange="searchItem(` + pages*display + `)">`;
                let allPageParts = "";
                for(let i = 0; i < pageCountAll; i++) {
                    allPageParts = 
                        `<option value="` + i + `">` + (i+1) + `</option>`;
                    allPage += allPageParts;
                }
                allPage +=
                `</select>`;
                document.getElementById("pageItem").innerHTML = allPage;
            
                // 商品の表示
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
                        displayParts++;

                        // ランキングの設定
                        const nowRank = product.reviewAverage * product.reviewCount;
                        rankList.push({key: nowRank, element: allItemParts});

                        if (display*itemDisplay == displayParts) {
                            document.getElementById('rakutenItem').innerHTML = allItem;

                            rankList.sort((a, b)=>{
                                return b.key - a.key
                            })
                            for (let i = 0; i < rankingValue; i++) {
                                ranking += rankList[i].element;
                            }
                            document.getElementById('rakutenRanking').innerHTML = ranking;
                            
                            break itemTable;
                        }
                }
                document.getElementById("rakutenItem").innerHTML = allItem;

                // 0.3秒の待機時間
                await new Promise(resolve => setTimeout(resolve, timer))

            } else {
                throw new Error(res.status);
            }
        } catch (e) {
            if (search == "") {
                document.getElementById('output').textContent = "検索キーワードが空欄です。キーワードを入力して検索してください。";
            }
            if (minPrice > maxPrice) {
                document.getElementById('output').textContent = "最高金額が最低金額を上回るように金額設定してください。";
            }
            console.error(e);
        }
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