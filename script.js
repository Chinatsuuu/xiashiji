const arr = [
    { name: "夏时记招牌奶绿", price: "9.9", img: "signature_milk_tea.jpg", type: "milk", hot: true },
    { name: "薄荷青柠果茶", price: "11.9", img: "mint_lime_tea.jpg", type: "fruit", hot: true },
    { name: "粉桃芝士奶冻", price: "12.9", img: "peach_cheese_jelly.jpg", type: "fruit", hot: true },
    { name: "草莓奶霜", price: "15.9", img: "strawberry_mousse.jpg", type: "fruit", hot: true, boom: true },
    { name: "红豆糯糯鲜奶", price: "10.9", img: "red_bean_milk.jpg", type: "milk" },
    { name: "厚芋泥波波奶", price: "12.9", img: "taro_milk.jpg", type: "milk" },
    { name: "焦糖烤奶", price: "10.5", img: "caramel_milk.jpg", type: "milk" },
    { name: "百香鲜果多多", price: "12.5", img: "passion_fruit_tea.jpg", type: "fruit" },
    { name: "白桃乌龙轻乳", price: "13.9", img: "white_peach_oolong.jpg", type: "fruit" }
];

const hotGoodsGrid = document.getElementById('hotGoodsGrid');
const milkTeaGrid = document.getElementById('milkTeaGrid');
const fruitTeaGrid = document.getElementById('fruitTeaGrid');
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const loginUser = document.getElementById('loginUser');
const regName = document.getElementById('regName');
const musicControl = document.getElementById('musicControl');
const rabBtn = document.getElementById('rabBtn');
const tipBox = document.getElementById('tipBox');
const chatWin = document.getElementById('chatWin');
const chatCon = document.getElementById('chatCon');
const userInput = document.getElementById('userInput');
const previewImg = document.getElementById('previewImg');
const imagePreview = document.getElementById('imagePreview');

const openLoginBtn = document.getElementById('openLoginBtn');
const openRegBtn = document.getElementById('openRegBtn');
const closeAuthBtn = document.getElementById('closeAuthBtn');
const tabLoginBtn = document.getElementById('tabLoginBtn');
const tabRegBtn = document.getElementById('tabRegBtn');
const submitLoginBtn = document.getElementById('submitLoginBtn');
const submitRegBtn = document.getElementById('submitRegBtn');
const closeChatBtn = document.getElementById('closeChatBtn');
const sendChatBtn = document.getElementById('sendChatBtn');

const navItems = document.querySelectorAll('.nav-menu .nav-item');
const pageWraps = document.querySelectorAll('.page-wrap');

navItems.forEach(nav => {
    nav.addEventListener('click', function() {
        navItems.forEach(n => n.classList.remove('active'));
        this.classList.add('active');

        const targetPageId = this.getAttribute('data-target');

        pageWraps.forEach(page => {
            if (page.id === targetPageId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
    });
});

function createGoodsCard(item) {
    let btnText = '选购';
    if (item.boom) {
        btnText = '爆款推荐';
    } else if (item.hot) {
        btnText = '仙境特饮';
    }
    
    return `
        <div class="goods-card">
            <div class="goods-img">
                <img src="img/${item.img}" class="zoomable" loading="lazy">
            </div>
            <div class="goods-desc">
                <div class="goods-name">${item.name}</div>
                <div class="goods-price">¥${item.price}</div>
                <button class="btn-solid" style="width:100%; margin-top:14px;">${btnText}</button>
            </div>
        </div>
    `;
}

let hotHtml = '';
let milkHtml = '';
let fruitHtml = '';

arr.forEach(product => {
    if (product.hot) {
        hotHtml += createGoodsCard(product);
    }
    if (product.type === 'milk') {
        milkHtml += createGoodsCard(product);
    } else if (product.type === 'fruit') {
        fruitHtml += createGoodsCard(product);
    }
});

hotGoodsGrid.innerHTML = hotHtml;
milkTeaGrid.innerHTML = milkHtml;
fruitTeaGrid.innerHTML = fruitHtml;

function pop(type) {
    authModal.style.display = 'flex';
    switchTab(type);
}

function switchTab(type) {
    if (type === 'login') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        tabLoginBtn.classList.add('active');
        tabRegBtn.classList.remove('active');
    } else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        tabLoginBtn.classList.remove('active');
        tabRegBtn.classList.add('active');
    }
}

function doAuth(type) {
    let username = type === 'login' ? loginUser.value.trim() : regName.value.trim();

    if (username === '') {
        alert(type === 'login' ? "请填写用户名" : "填写昵称");
        return;
    }

    if (type === 'login') {
        alert(`欢迎回来，${username}。小时虽然态度差，但店里的茶还不错。`);
    } else {
        alert(`${username}，注册成功。小时说：“哼，新人记得守规矩。”`);
    }
    authModal.style.display = 'none';
}

openLoginBtn.addEventListener('click', () => pop('login'));
openRegBtn.addEventListener('click', () => pop('register'));
closeAuthBtn.addEventListener('click', () => authModal.style.display = 'none');
tabLoginBtn.addEventListener('click', () => switchTab('login'));
tabRegBtn.addEventListener('click', () => switchTab('register'));
submitLoginBtn.addEventListener('click', () => doAuth('login'));
submitRegBtn.addEventListener('click', () => doAuth('register'));

authModal.addEventListener('click', (e) => {
    if (e.target === authModal) {
        authModal.style.display = 'none';
    }
});

const audio = new Audio('Piano Magic Motive.mp3');
audio.loop = true; 
audio.volume = 0.95;
let isPlay = false;

musicControl.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isPlay) {
        audio.pause();
        isPlay = false;
        musicControl.style.opacity = '0.7';
    } else {
        audio.play().then(() => {
            isPlay = true;
            musicControl.style.opacity = '1';
        }).catch(() => {
            alert('由于浏览器限制，请先点击页面任意位置后再试。');
        });
    }
});

const tips = ["哼，又点我干嘛？本店每一款奶茶都很能打。", "奶茶你随便点，包你满意。", "白桃乌龙轻乳？算你有眼光。", "草莓奶霜是红国王严选。", "可恶的白兔怎么在摸鱼。"];

rabBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const randomIndex = Math.floor(Math.random() * tips.length);
    tipBox.innerText = tips[randomIndex];
    tipBox.style.display = 'block';
    
    const r = rabBtn.getBoundingClientRect();
    const boxWidth = tipBox.offsetWidth;
    tipBox.style.left = `${Math.max(10, r.left - boxWidth - 12)}px`;
    tipBox.style.top = `${Math.min(window.innerHeight - tipBox.offsetHeight - 10, Math.max(10, r.top + r.height / 2 - tipBox.offsetHeight / 2))}px`;
    
    setTimeout(() => { 
        tipBox.style.display = 'none'; 
    }, 3000);
});

rabBtn.addEventListener('dblclick', () => { 
    chatWin.style.display = "flex"; 
});

closeChatBtn.addEventListener('click', () => {
    chatWin.style.display = 'none';
});

const dict = [
    { k: ["吉祥物"], r: "什么？白兔对外说我是吉祥物？" },
    { k: ["疯帽子", "疯帽"], r: "疯帽子那家伙整天摆弄茶壶，脾气古怪，不过茶会倒是挺能撑场面。说起来，疯帽子和白兔居然有点交情，不可思议。" },
    { k: ["红国王"], r: "（左瞧右看，凑近小声道）红国王啊……脾气不小，动不动就“砍头”挂嘴边。他最喜欢玫瑰，谁要是碰他的玫瑰园，哼，自求多福。白兔先生是效忠于红国王的，欸，我这些话你可不要跟他们说啊。" },
    { k: ["爱丽丝"], r: "爱丽丝？那个误闯仙境的小姑娘……倒是比大多数人都勇敢，眼光也不错，只有她懂我的热巧克力泡面（感动)" },
    { k: ["柴郡猫", "柴郡"], r: "那只柴郡猫啊，说话云里雾里的。不过那家伙居然也喜欢面包蘸辣椒酱，哼，品味倒是不赖。懒得跟她多聊。" },
    { k: ["白兔先生", "白兔"], r: "哼，那个白兔先生？管得宽，规矩多，不过……店里能这么顺，还多亏她。算是勉强佩服一下吧。" },
    { k: ["小时可爱","你好可爱","你真可爱","你很可爱"], r: "可、可爱……哼，你要意是真想夸我，就买杯店里的奶茶，比夸我一百句管用。" },
    { k: ["黑暗料理"], r: "黑暗料理？那是你们不懂欣赏……（小声嘟囔）算了，跟你们说也说不清楚。有这闲工夫，不如去买杯草莓奶霜，那可是红国王认可的好东西。" },
    { k: ["凑企鹅"], r: "什么凑企鹅？听不懂……（不耐烦）我是小时！算了，你是刚从疯帽子茶会出来吗？要不要来杯招牌奶绿清醒一下？" },
    { k: ["夏日谈", "中二王朝"], r: "嗯？好熟悉，（恍惚）白兔似乎说她梦到过一个......没什么。" },
    { k: ["夏予筱", "筱筱"], r: "筱......？总觉得在哪听过。" },
    { k: ["茶会", "茶话会"], r: "疯帽子想办一场永不结束的茶会，谁知道在想什么。你要去参加的话注意一点，有些人出来像喝了假酒一样，我寻思办的也不是酒场啊。" },
    { k: ["门店"], r: "茂名总店文创街，广州大学城，湛江凤凰乐园。去喝就知道了。" },
    { k: ["加盟"], r: "档口3.8万起，标准店7.8万，具体政策去加盟页面。" },
    { k: ["优惠"], r: "优惠看公众号。" },
    { k: ["价格"], r: "本店奶茶价格在8至16之间。" },
    { k: ["奶茶"], r: "鲜奶鲜果茶，童叟无欺。" },
    { k: ["小时"], r: "本兔就是小时。自家奶茶我闭眼推荐。" },
    { k: ["面包蘸辣酱", "面包蘸辣椒酱"], r: "哼，那是我最爱的吃法，你有意见？" },
    { k: ["奶绿"], r: "招牌奶绿是店里的元老，清爽不腻。" },
    { k: ["草莓"], r: "本店草莓奶霜可是赢得了红国王的喜爱（得意）。" },
    { k: ["脾气"], r: "我脾气好着呢。" },
    { k: ["你好", "您好"], r: "嗯。有事直说，关于奶茶我都能答.", ex: true }
];

function goChat() {
    const v = userInput.value.trim();
    if (v === "") return;
    
    chatCon.innerHTML += `<div class="msg-right">${v}</div>`;
    chatCon.scrollTop = chatCon.scrollHeight;
    
    let hit = null;
    for (let i = 0; i < dict.length; i++) {
        const item = dict[i];
        if (item.ex) {
            if (v === item.k[0] || v === item.k[1]) {
                hit = item;
                break;
            }
        } else {
            for (let j = 0; j < item.k.length; j++) {
                if (v.includes(item.k[j])) {
                    hit = item;
                    break;
                }
            }
            if (hit) break;
        }
    }
    
    setTimeout(() => {
        let reply = "啧，问清楚点。比如加盟、优惠、门店. ";
        if (hit) reply = hit.r;
        chatCon.innerHTML += `<div class="msg-left">${reply}</div>`;
        chatCon.scrollTop = chatCon.scrollHeight;
    }, 130);
    
    userInput.value = "";
}

sendChatBtn.addEventListener('click', () => goChat());
userInput.addEventListener('keydown', (e) => { 
    if (e.key === 'Enter') goChat(); 
});

imagePreview.addEventListener('click', () => {
    imagePreview.style.display = 'none';
});

document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('zoomable')) { 
        previewImg.src = e.target.src; 
        imagePreview.style.display = 'flex'; 
    }
});

document.getElementById('joinSubmitBtn')?.addEventListener('click', () => {
    alert('意向提交成功，白兔先生会尽快联络您！');
    document.querySelectorAll('#page-join .input-base').forEach(el => el.value = '');
});

document.getElementById('sendMailBtn')?.addEventListener('click', () => {
    alert('信函已寄出');
    const txt = document.querySelector('.textarea-message');
    if (txt) txt.value = '';
});