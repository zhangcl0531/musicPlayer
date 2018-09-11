# 音乐播放器
## 功能
1.实现暂停播放功能；\n
2.实现上一首下一首功能；\n
3.实现切换音乐时自动切换背景图片；\n
4.实现拖动进度条快进；\n
5.实现点击播放列表播放音乐；\n

## API
### 属性
#### audioObject
创建或者获取的audio对象
<audio id="music" src=""></audio>
var audioObject = new Audio()

#### audioObject.play()
开始播放

#### audioObject.pause()
暂停播放

#### audioObject.autoPlay
设置或者获取自动播放状态
audioObject.autoPlay = true  //设置为自动播放，下次更换 audioObject.src 后会自动播放音乐
audioObject.autoPlay = false //设置不自动播放
console.log(audioObject.autoPlay)

#### audioObject.src
设置或者获取音乐地址
audioObject.src = "http://xxx.mp3"
console.log(audioObject.src)

#### audioObject.volume
设置或者获取音量，最大值为1，0为静音
audioObject.volume = 0.5
audioObject.volume = 1
console.log(audioObject.volume)

#### audioObject.loop
设置或者获取循环状态
audioObject.loop = true
console.log(audioObject.loop)

#### audioObject.duration
获取音乐长度，单位为秒

console.log(audioObject.duration)


#### audioObject.currentTime
设置或者获取播放时间

console.log(audioObject.currentTime)

#### audioObject.ended
判断音乐是否播放完毕，只读属性

