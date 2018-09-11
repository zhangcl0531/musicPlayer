function $(selector) {
    return document.querySelector(selector)
}

var musicList = [];
var currentIndex = 0;
var audio = new Audio();
audio.autoplay = true;
// audio.timeout = 500

getMusicLits(function (list) {
    console.log('list:');
    console.log(list);
    musicList = list;
    loadMusic(musicList[currentIndex]);
    generateList(list)
});


// 获取音乐列表
function getMusicLits(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'music.json', true);
    xhr.onload = function () {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            // console.log(JSON.parse(this.responseText))
            callback(JSON.parse(this.responseText))
        } else {
            console.log('获取数据失败')
        }
    };
    xhr.onerror = function () {
        console.log('网络异常')
    };
    xhr.send()
}

//播放
function loadMusic(musicObj) {
    console.log('begin music', musicObj);
    $('.musicbox .title').innerText = musicObj.title;
    $('.musicbox .auther').innerText = musicObj.auther;
    $('.cover').style.backgroundImage = 'url(' + musicObj.img + ')';
    audio.src = musicObj.src
}

// 方法一：播放时进度条以及时间的展示，可能时间跳动会不均匀
// audio.ontimeupdate = function () {
//     console.log(audio.currentTime);
//     $('.musicbox .progress-now').style.width = (this.currentTime/this.duration)*100 + '%';
//     var min = Math.floor(this.currentTime/60);
//     var sec = Math.floor(this.currentTime)%60 + '';
//     sec = sec.length ===2? sec: '0' + sec; //判断sec是不是2位数，如果不是就在前面加一个0
//     $('.musicbox .time').innerText = min + ':' + sec
// };

// 方法二：播放时进度条以及时间的展示
audio.ontimeupdate = function () {
    // console.log(this.currentTime);
    $('.musicbox .progress-now').style.width = (this.currentTime / this.duration) * 100 + '%'
};

audio.onplay = function () {
    clock = setInterval(function () {
        var min = Math.floor(audio.currentTime / 60);
        var sec = Math.floor(audio.currentTime) % 60 + '';
        sec = sec.length === 2 ? sec : '0' + sec; //判断sec是不是2位数，如果不是就在前面加一个0
        $('.musicbox .time').innerText = min + ':' + sec
    }, 1000)
};
audio.onpause = function () {
    clearInterval(clock)
};
//点击暂停和播放按钮
$('.musicbox .play').onclick = function () {
    if (audio.paused) {
        audio.play();
        this.querySelector('.iconfont').classList.remove('icon-bofang');
        this.querySelector('.iconfont').classList.add('icon-pause')
    } else {
        audio.pause();
        this.querySelector('.iconfont').classList.remove('icon-pause');
        this.querySelector('.iconfont').classList.add('icon-bofang')
    }

};
//下一首
$('.musicbox .forward').onclick = function () {
    currentIndex = (++currentIndex) % musicList.length;
    console.log(currentIndex);
    loadMusic(musicList[currentIndex]);
    if ($('.play .iconfont').classList.contains('icon-bofang')) {
        $('.play .iconfont').classList.remove('icon-bofang');
        $('.play .iconfont').classList.add('icon-pause')
    }
};
//上一首
$('.musicbox .back').onclick = function () {
    currentIndex = (musicList.length + (--currentIndex)) % musicList.length;
    console.log(currentIndex);
    loadMusic(musicList[currentIndex]);
    if ($('.play .iconfont').classList.contains('icon-bofang')) {
        $('.play .iconfont').classList.remove('icon-bofang');
        $('.play .iconfont').classList.add('icon-pause')
    }
};
//进度条
$('.musicbox .bar').onclick = function (e) {
    console.log(e);
    var percent = e.offsetX / parseInt(getComputedStyle(this).width)
    audio.currentTime = audio.duration * percent
};

// 播放完毕自动播放下一曲
audio.onended = function () {
    currentIndex = (++currentIndex) % musicList.length;
    console.log(currentIndex);
    loadMusic(musicList[currentIndex]);
};

// 获取播放列表
function generateList(list) {
    for (ii in list) {
        // console.log(list[ii].title);
        var newli = document.createElement("li");
        var licontent = document.createTextNode(list[ii].title);
        newli.appendChild(licontent);
        $('.list').appendChild(newli);
        if (ii == 0) {
            newli.classList.add('playing')
        }


    }
}

// 点击播放列表
$('.list').onclick = function (e) {
    // 添加播放按钮效果
    var liNodes = document.querySelectorAll('li');
    liNodes.forEach(function (node) {
        if (node.classList.contains('playing')) {
            node.classList.remove('playing')
        }
    });
    console.log(this.index);
    console.log(e.target.innerText);
    e.target.classList.add('playing')

    //修复如果暂停中切换歌曲， 播放按钮不切换成暂停的问题
    if ($('.play .iconfont').classList.contains('icon-bofang')) {
        $('.play .iconfont').classList.remove('icon-bofang');
        $('.play .iconfont').classList.add('icon-pause')
    }

    // 获取点击播放列表的位置
    for (bb in musicList) {
        if (e.target.innerText === musicList[bb].title) {
            loadMusic(musicList[bb])
        }
    }
}
