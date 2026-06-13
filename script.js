const drinksList = [
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

let hotBox = document.getElementById('hotGoodsGrid');
let milkBox = document.getElementById('milkTeaGrid');
let fruitBox = document.getElementById('fruitTeaGrid');

let modalWrap = document.getElementById('authModal');
let loginArea = document.getElementById('loginForm');
let regArea = document.getElementById('registerForm');
let loginInput = document.getElementById('loginUser');
let nickInput = document.getElementById('regName');

let musicIcon = document.getElementById('musicControl');
let rabbitPic = document.getElementById('rabBtn');
let talkBubble = document.getElementById('tipBox');
let chatWindow = document.getElementById('chatWin');
let chatDisplay = document.getElementById('chatCon');
let msgInput = document.getElementById('userInput');

let previewLayer = document.getElementById('imagePreview');
let previewTarget = document.getElementById('previewImg');

let loginBtn = document.getElementById('openLoginBtn');
let regBtn = document.getElementById('openRegBtn');
let closeModalBtn = document.getElementById('closeAuthBtn');
let tabLogin = document.getElementById('tabLoginBtn');
let tabReg = document.getElementById('tabRegBtn');
let submitLogin = document.getElementById('submitLoginBtn');
let submitReg = document.getElementById('submitRegBtn');
let closeChatX = document.getElementById('closeChatBtn');
let sendMsgBtn = document.getElementById('sendChatBtn');

let startDaily = document.getElementById('dailyStartBtn');
let dailyCardsArea = document.getElementById('dailyCardsWrap');
let dailyResultArea = document.getElementById('dailyResultWrap');
let againBtn = document.getElementById('dailyRestartBtn');
let allCards = document.querySelectorAll('.daily-card');
let resultCardDiv = document.getElementById('dailyResultCard');

let navLinks = document.querySelectorAll('.nav-menu .nav-item');
let allPages = document.querySelectorAll('.page-wrap');

let isFlippedLock = false;

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(n => n.classList.remove('active'));
        this.classList.add('active');
        let goto = this.getAttribute('data-target');
        if (goto !== 'page-daily') {
            resetDailyGame();
        }
        allPages.forEach(page => {
            if (page.id === goto) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });
    });
});

function buildCard(item) {
    return `
        <div class="goods-card">
            <div class="goods-img">
                <img src="img/${item.img}" class="zoomable" loading="lazy">
            </div>
            <div class="goods-desc">
                <div class="goods-name">${item.name}</div>
                <div class="goods-price">¥${item.price}</div>
                <button class="btn-solid" style="width:100%; margin-top:14px;">去选购</button>
            </div>
        </div>
    `;
}

let hotHtmlStr = '', milkHtmlStr = '', fruitHtmlStr = '';
drinksList.forEach(drink => {
    if (drink.hot) hotHtmlStr += buildCard(drink);
    if (drink.type === 'milk') milkHtmlStr += buildCard(drink);
    if (drink.type === 'fruit') fruitHtmlStr += buildCard(drink);
});
hotBox.innerHTML = hotHtmlStr;
milkBox.innerHTML = milkHtmlStr;
fruitBox.innerHTML = fruitHtmlStr;

function showModal(which) {
    modalWrap.style.display = 'flex';
    switchTabStyle(which);
}

function switchTabStyle(which) {
    if (which === 'login') {
        loginArea.style.display = 'block';
        regArea.style.display = 'none';
        tabLogin.classList.add('active');
        tabReg.classList.remove('active');
    } else {
        loginArea.style.display = 'none';
        regArea.style.display = 'block';
        tabLogin.classList.remove('active');
        tabReg.classList.add('active');
    }
}

function handleAuth(act) {
    let nameVal = act === 'login' ? loginInput.value.trim() : nickInput.value.trim();
    if (nameVal === '') {
        alert(act === 'login' ? "请填写用户名" : "填写昵称");
        return;
    }
    if (act === 'login') {
        alert(`欢迎回来，${nameVal}。小时虽然态度差，但店里的茶还不错。`);
    } else {
        alert(`${nameVal}，注册成功。小时说：“哼，新人记得守规矩。”`);
    }
    modalWrap.style.display = 'none';
}

loginBtn.addEventListener('click', () => showModal('login'));
regBtn.addEventListener('click', () => showModal('register'));
closeModalBtn.addEventListener('click', () => modalWrap.style.display = 'none');
tabLogin.addEventListener('click', () => switchTabStyle('login'));
tabReg.addEventListener('click', () => switchTabStyle('register'));
submitLogin.addEventListener('click', () => handleAuth('login'));
submitReg.addEventListener('click', () => handleAuth('register'));

modalWrap.addEventListener('click', (e) => {
    if (e.target === modalWrap) modalWrap.style.display = 'none';
});

let bgMusic = new Audio('Piano Magic Motive.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.95;
let musicPlaying = false;

musicIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    if (musicPlaying) {
        bgMusic.pause();
        musicPlaying = false;
        musicIcon.style.opacity = '0.7';
    } else {
        bgMusic.play().then(() => {
            musicPlaying = true;
            musicIcon.style.opacity = '1';
        }).catch(() => {
            alert('由于浏览器限制，请先点击页面任意位置后再试。');
        });
    }
});

let randomPhrases = ["哼，又点我干嘛？本店每一款奶茶都很能打。", "奶茶你随便点，包你满意。", "白桃乌龙轻乳？算你有眼光。", "草莓奶霜是红国王严选。", "可恶的白兔怎么在摸鱼。"];

rabbitPic.addEventListener('click', (e) => {
    e.stopPropagation();
    let idx = Math.floor(Math.random() * randomPhrases.length);
    talkBubble.innerText = randomPhrases[idx];
    talkBubble.style.display = 'block';
    let rect = rabbitPic.getBoundingClientRect();
    let bw = talkBubble.offsetWidth;
    talkBubble.style.left = `${Math.max(10, rect.left - bw - 12)}px`;
    talkBubble.style.top = `${Math.min(window.innerHeight - talkBubble.offsetHeight - 10, Math.max(10, rect.top + rect.height / 2 - talkBubble.offsetHeight / 2))}px`;
    setTimeout(() => { talkBubble.style.display = 'none'; }, 3000);
});

rabbitPic.addEventListener('dblclick', () => { chatWindow.style.display = "flex"; });
closeChatX.addEventListener('click', () => { chatWindow.style.display = 'none'; });

const replyMap = [
    { keys: ["吉祥物"], ans: "什么？白兔对外说我是吉祥物？" },
    { keys: ["疯帽子", "疯帽"], ans: "疯帽子那家伙整天摆弄茶壶，脾气古怪，不过茶会倒是挺能撑场面。说起来，疯帽子和白兔居然有点交情，不可思议。" },
    { keys: ["红国王"], ans: "（左瞧右看，凑近小声道）红国王啊……脾气不小，动不动就“砍头”挂嘴边。他最喜欢玫瑰，谁要是碰他的玫瑰园，哼，自求多福。白兔先生是效忠于红国王的，欸，我这些话你可不要跟他们说啊。" },
    { keys: ["爱丽丝"], ans: "爱丽丝？那个误闯仙境的小姑娘……倒是比大多数人都勇敢，眼光也不错，只有她懂我的热巧克力泡面（感动)" },
    { keys: ["柴郡猫", "柴郡"], ans: "那只柴郡猫啊，说话云里雾里的。不过那家伙居然也喜欢面包蘸辣椒酱，哼，品味倒是不赖。懒得跟她多聊。" },
    { keys: ["白兔先生", "白兔"], ans: "哼，那个白兔先生？管得宽，规矩多，不过……店里能这么顺，还多亏她。算是勉强佩服一下吧。" },
    { keys: ["小时可爱","你好可爱","你真可爱","你很可爱"], ans: "可、可爱……哼，你要意是真想夸我，就买杯店里的奶茶，比夸我一百句管用。" },
    { keys: ["黑暗料理"], ans: "黑暗料理？那是你们不懂欣赏……（小声嘟囔）算了，跟你们说也说不清楚。有这闲工夫，不如去买杯草莓奶霜，那可是红国王认可的好东西。" },
    { keys: ["凑企鹅"], ans: "什么凑企鹅？听不懂……（不耐烦）我是小时！算了，你是刚从疯帽子茶会出来吗？要不要来杯招牌奶绿清醒一下？" },
    { keys: ["夏日谈", "中二王朝"], ans: "嗯？好熟悉，（恍惚）白兔似乎说她梦到过一个......没什么。" },
    { keys: ["夏予筱", "筱筱"], ans: "筱......？总觉得在哪听过。" },
    { keys: ["茶会", "茶话会"], ans: "疯帽子想办一场永不结束的茶会，谁谁知道在想什么。你要去参加的话注意一点，有些人出来像喝了假酒一样，我寻思办的也不是酒场啊。" },
    { keys: ["门店"], ans: "茂名总店文创街，广州大学城，湛江凤凰乐园。去喝就知道了。" },
    { keys: ["加盟"], ans: "档口3.8万起，标准店7.8万，具体政策去加盟页面。" },
    { keys: ["优惠"], ans: "优惠看公众号。" },
    { keys: ["价格"], ans: "本店奶茶价格在8至16之间。" },
    { keys: ["奶茶"], ans: "鲜奶鲜果茶，童叟无欺。" },
    { keys: ["小时"], ans: "本兔就是小时。自家奶茶我闭眼推荐。" },
    { keys: ["面包蘸辣酱", "面包蘸辣椒酱"], ans: "哼，那是我最爱的吃法，你有意见？" },
    { keys: ["奶绿"], ans: "招牌奶绿是店里的元老，清爽不腻。" },
    { keys: ["草莓"], ans: "本店草莓奶霜可是赢得了红国王的喜爱（得意）。" },
    { keys: ["脾气"], ans: "我脾气好着呢。" },
    { keys: ["你好", "您好"], ans: "嗯。有事直说，关于奶茶我都能答.", exact: true }
];

function sendChat() {
    let q = msgInput.value.trim();
    if (q === "") return;
    chatDisplay.innerHTML += `<div class="msg-right">${q}</div>`;
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
    let matched = null;
    for (let rule of replyMap) {
        if (rule.exact) {
            if (q === rule.keys[0] || q === rule.keys[1]) {
                matched = rule;
                break;
            }
        } else {
            for (let kw of rule.keys) {
                if (q.includes(kw)) {
                    matched = rule;
                    break;
                }
            }
            if (matched) break;
        }
    }
    setTimeout(() => {
        let replyText = "啧，问清楚点。比如加盟、优惠、门店. ";
        if (matched) replyText = matched.ans;
        chatDisplay.innerHTML += `<div class="msg-left">${replyText}</div>`;
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }, 130);
    msgInput.value = "";
}

sendMsgBtn.addEventListener('click', () => sendChat());
msgInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendChat(); });

previewLayer.addEventListener('click', () => { previewLayer.style.display = 'none'; });
document.body.addEventListener('click', (e) => {
    if (e.target.classList.contains('zoomable')) {
        previewTarget.src = e.target.src;
        previewLayer.style.display = 'flex';
    }
});

document.getElementById('joinSubmitBtn')?.addEventListener('click', () => {
    alert('意向提交成功，白兔先生会尽快联络您！');
    document.querySelectorAll('#page-join .input-base').forEach(el => el.value = '');
});
document.getElementById('sendMailBtn')?.addEventListener('click', () => {
    alert('信函已寄出');
    let txtarea = document.querySelector('.textarea-message');
    if (txtarea) txtarea.value = '';
});

let investSide = document.querySelectorAll('.invest-sidebar-item');
let investBlocks = document.querySelectorAll('.invest-content-block');
investSide.forEach(side => {
    side.addEventListener('click', function() {
        investSide.forEach(s => s.classList.remove('active'));
        this.classList.add('active');
        let targetBlock = this.getAttribute('data-target');
        investBlocks.forEach(block => {
            if (block.id === targetBlock) {
                block.classList.add('active');
            } else {
                block.classList.remove('active');
            }
        });
    });
});

function resetDailyGame() {
    dailyCardsArea.style.display = 'none';
    dailyResultArea.style.display = 'none';
    allCards.forEach(card => {
        card.classList.remove('flipped');
        card.querySelector('.daily-card-front').innerHTML = '';
    });
    isFlippedLock = false;
    startDaily.style.display = 'inline-block';
}

startDaily.addEventListener('click', () => {
    resetDailyGame();
    dailyCardsArea.style.display = 'block';
    startDaily.style.display = 'none';
});

allCards.forEach(card => {
    card.addEventListener('click', () => {
        if (isFlippedLock) return;
        if (card.classList.contains('flipped')) return;
        let randomDrink = drinksList[Math.floor(Math.random() * drinksList.length)];
        let frontDiv = card.querySelector('.daily-card-front');
        frontDiv.innerHTML = `
            <img src="img/${randomDrink.img}" class="zoomable" loading="lazy" style="width:100%; height:100%; object-fit:cover;">
        `;
        card.classList.add('flipped');
        isFlippedLock = true;
        setTimeout(() => {
            dailyResultArea.style.display = 'block';
            resultCardDiv.innerHTML = buildCard(randomDrink);
        }, 600);
    });
});

againBtn.addEventListener('click', () => {
    resetDailyGame();
});