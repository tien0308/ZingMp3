const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const PLAYER_STORAGE_KEY = "MUSIC_PLAYER";
const main = $(".main");
const audio = $("#audio");
const songList = $(".songs-list");
const cdThumb = $(".cd");
const cdImg = $(".cd-img");
const cdSinger = $(".cd-singer");
const cdName = $(".cd-name");
const cdPlaylist = $(".cd-playlist");
const playBtn = $$(".btn-play");
const nextBtns = $$(".btn-next");
const prevBtns = $$(".btn-prev");
const repeatBtns = $$(".btn-repeat");
const randomBtns = $$(".btn-random");
const volumeBtn = $(".volume-icon");

const progressList = $$(".progress");
const circles = $$(".circle");
const lineCurrents = $$(".line-current");

const progressVolume = $(".progress-volume");
const lineVolumeCurrent = $(".line-volume-current");
const circleVolume = $(".circle-volume");

const timeLefts = $$(".time-left");
const timeRights = $$(".time-right");
const timeTotal = $(".time-total");
const playBtnList = $(".icon-play");

// Mobile
const headingOnMobile = $(".heading-on-mobile");
const cdOnMobile = $(".cd-on-mobile");
const cdThumbOnMobile = $(".cd-thumb-on-mobile");
const mobileIconHide = $(".mobile-icon-hide");

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  isMute: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  arrSongs: [],
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  songs: [
    {
      name: "Vỡ",
      singer: "Đức Phúc",
      path: "./music/song1.mp3",
      image: "./img/song1.jpg",
    },

    {
      name: "Gửi Ngàn Lời Yêu",
      singer: "Hồng Dương",
      path: "./music/song2.mp3",
      image: "./img/song2.jpg",
    },

    {
      name: "À Lôi",
      singer: "Double2T,Masew",
      path: "./music/song3.mp3",
      image: "./img/song3.jpg",
    },

    {
      name: "Xứng Đôi Cưới Thôi",
      singer: "Lê Thiện Hiếu",
      path: "./music/song4.mp3",
      image: "./img/song4.jpg",
    },

    {
      name: "Yêu Nhau Nhé Bạn Thân ",
      singer: "Phạm Đình Thái Ngân",
      path: "./music/song5.mp3",
      image: "./img/song5.jpg",
    },

    {
      name: "Phụ Tình",
      singer: "Trịnh Đình Quang",
      path: "./music/song6.mp3",
      image: "./img/song6.jpg",
    },

    {
      name: "Rượu Mừng Hóa Người Dưng",
      singer: "TLong",
      path: "./music/song7.mp3",
      image: "./img/song7.jpg",
    },

    {
      name: "Phía Cuối Con Đường",
      singer: "Thùy Chi, M4U",
      path: "./music/song8.mp3",
      image: "./img/song8.jpg",
    },

    {
      name: "Đơn Giản Anh Yêu Em",
      singer: "Hồ Quốc Việt",
      path: "./music/song9.mp3",
      image: "./img/song9.jpg",
    },

    {
      name: "Ngoài 30",
      singer: "Thái Học",
      path: "./music/song10.mp3",
      image: "./img/song10.jpg",
    },

    {
      name: "Cha Và Con Gái",
      singer: "Thùy Chi",
      path: "./music/song11.mp3",
      image: "./img/song11.jpg",
    },
  ],
  render: function () {
    var htmls = this.songs.map(function (song, index) {
      return `<div class="song${
        app.currentIndex === index ? " active" : ""
      } is-flex" data-index="${index}">
                            <div class="song-left is-flex">
                                <div class="thumb show-hide-play" data-index="${index}" style="background-image: url('${song.image}')">
                                   <img src="./img/icon-playing.gif" alt="" class="gif-playing">
                                   <svg class="icon-play-list" fill="#fff" height="24px" width="24px" version="1.1" id="Capa_1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 17.804 17.804"
                                            xml:space="preserve">
                                            <g>
                                                <g id="c98_play">
                                                    <path d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313
			c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04
			c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z" />
                                                </g>
                                                <g id="Capa_1_78_">
                                                </g>
                                            </g>
                                        </svg>
                                </div>
                                <div class="song-body">
                                    <h3 class="song-name">${song.name}</h3>
                                    <p class="song-singer">${song.singer}</p>
                                </div>
                            </div>
                            <div class="time-total time-total-${index}">
                                <span>00:00</span>
                            </div>
                            <div class="song-option">
                                <i class="fa-regular fa-heart"></i>
                                <i class="fas fa-ellipsis-h"></i>
                            </div>
                        </div>`;
    });
    songList.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    var lastValueVolume = 1;
    console.log(lastValueVolume);

    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000,
      iterations: Infinity,
    });

    const cdPlaylistAnimate = cdPlaylist.animate(
      [{ transform: "rotate(360deg)" }],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );

    const cdOnMobileAnimate = cdOnMobile.animate(
      [{ transform: "rotate(360deg)" }],
      {
        duration: 20000,
        iterations: Infinity,
      }
    );

    cdThumbAnimate.pause();
    cdPlaylistAnimate.pause();
    cdOnMobileAnimate.pause();

    playBtn[0].onclick = PlayFunc;
    playBtn[1].onclick = PlayFunc;

    function PlayFunc() {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }

      // Song play
      audio.onplay = function () {
        app.isPlaying = true;
        main.classList.add("is-playing");
        cdThumbAnimate.play();
        cdPlaylistAnimate.play();
        cdOnMobileAnimate.play();
      };

      // Song pause
      audio.onpause = function () {
        app.isPlaying = false;
        main.classList.remove("is-playing");
        cdThumbAnimate.pause();
        cdPlaylistAnimate.pause();
        cdOnMobileAnimate.pause();
      };

      // Bài hát đang chạy
      audio.ontimeupdate = function () {
        if (audio.duration) {
          const progressPercent = (audio.currentTime / audio.duration) * 100;

          progressList[0].value = progressPercent;
          progressList[1].value = progressPercent;
          circles[0].style.left = `calc(${progressPercent}% - 4px)`;
          circles[1].style.left = `calc(${progressPercent}% - 4px)`;
          lineCurrents[0].style.width = progressPercent + "%";
          lineCurrents[1].style.width = progressPercent + "%";

          timeLefts[0].innerHTML = app.convertTime(audio.currentTime);
          timeLefts[1].innerHTML = app.convertTime(audio.currentTime);
        }
      };

      // Khi tua bài hát
      progressList.forEach(function (progress) {
        progress.oninput = function () {
          audio.currentTime = (progress.value * audio.duration) / 100;
        };
      });

      // Thay đổi âm lượng
      progressVolume.oninput = function () {
        audio.volume = progressVolume.value / 100;
        lineVolumeCurrent.style.width = audio.volume * 100 + "%";
        circleVolume.style.left = `calc(${audio.volume * 100}% - 4px)`;

        lastValueVolume = audio.volume;

        if (audio.volume === 0) {
          volumeBtn.classList.toggle("mute", true);
          app.isMute = true;
        } else {
          volumeBtn.classList.toggle("mute", false);
          app.isMute = false;
        }
      };

      // Khi bài hát kết thúc
      audio.onended = function () {
        if (app.isRepeat) {
          audio.play();
        } else {
          app.nextSong();
          PlayFunc();
          audio.play();
          app.render();
          app.scrollToActiveSong();
          app.loadTotal();
        }
      };

      // Lắng nghe hành vi click vào playlist

      songList.onclick = function (e) {
        const thumbEl = e.target.closest(".song:not(.active)");
        const optionEl = e.target.closest(".fa-ellipsis-h");
        const favariteEl = e.target.closest(".fa-heart");
        if (!optionEl && !favariteEl) {
          if (thumbEl) {
            app.currentIndex = Number(thumbEl.getAttribute("data-index"));
            app.loadCurrentSong();
            PlayFunc();
            audio.play();
            setTimeout(function () {
              app.render();
              app.loadTotalTime();
            }, 100);
          }
        }
        if (optionEl) {
          alert("Nhạc hay thì cho mình xin một tym !");
        }

        PlayFunc();

        nextBtns.forEach(function (nextBtn) {
          nextBtn.onclick = function () {
            app.nextSong();
            PlayFunc();
            audio.play();
            app.render();
            app.scrollToActiveSong();
            app.loadTotalTime();
            setTimeout(function () {
              app.render();
              app.loadTotalTime();
            }, 100);
          };
        });

        prevBtns.forEach(function (prevBtn) {
          prevBtn.onclick = function () {
            app.prevSong();
            audio.play();
            app.render();
            app.loadTotalTime();
            setTimeout(function () {
              app.render();
              app.loadTotalTime();
            }, 100);
          };
        });

        randomBtns.forEach(function (randomBtn) {
          randomBtn.onclick = function () {
            app.isRandom = !app.isRandom;
            randomBtn.classList.toggle("active", app.isRandom);
            app.setConfig("isRandom", app.isRandom);
            console.log(app.isRandom);
          };
        });

        repeatBtns.forEach(function (repeatBtn) {
          repeatBtn.onclick = function () {
            app.isRepeat = !app.isRepeat;
            repeatBtn.classList.toggle("active", app.isRepeat);
            app.setConfig("isRepeat", app.isRepeat);
            console.log(app.isRepeat);
          };
        });

        volumeBtn.onclick = function () {
          if (app.isMute) {
            app.setConfig("isMute", !app.isMute);
            audio.volume = lastValueVolume;
            lineVolumeCurrent.style.width = audio.volume * 100 + "%";
            circleVolume.style.left = `calc(${audio.volume * 100}% - 4px)`;
          } else {
            audio.volume = 0;
            app.setConfig("isMute", !app.isMute);
            lineVolumeCurrent.style.width = audio.volume * 100 + "%";
            circleVolume.style.left = `calc(${audio.volume * 100}% - 4px)`;
          }
          volumeBtn.classList.toggle("mute", !app.isMute);
          app.isMute = !app.isMute;
        };
      };

      playBtnList.onclick = function (e) {
        const isShowHidePlay = $(".show-hide-play");
        isShowHidePlay.classList.toggle("is-show");
      };
    }
  },
  nextSong: function () {
    if (app.isRandom) {
      app.endRandomSong();
      app.playRandomSong();
    } else {
      app.currentIndex++;
      if (app.currentIndex >= app.songs.length) {
        app.currentIndex = 0;
      }
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    if (app.isRandom) {
      app.endRandomSong();
      app.playRandomSong();
    } else {
      app.currentIndex--;
      if (app.currentIndex < 0) {
        app.currentIndex = app.songs.length - 1;
      }
    }
    app.loadCurrentSong();
    this.loadTotalTime();
  },
  playRandomSong: function () {
    do {
      this.currentIndex = Math.floor(Math.random() * app.songs.length);
    } while (app.arrSongs.includes(this.currentIndex));
    this.loadCurrentSong();
  },
  convertTime: function (time) {
    var mins = Math.floor(time / 60);
    var secs = Math.floor(time % 60);
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (secs < 10) {
      secs = "0" + secs;
    }
    return `${mins}:${secs}`;
  },
  loadCurrentSong: function () {
    cdName.innerHTML = this.currentSong.name;
    cdSinger.innerHTML = this.currentSong.singer;
    cdImg.src = this.currentSong.image;
    audio.src = this.currentSong.path;
    // headingOnMObile.innerHTML = this.currentSong.name;
    cdThumbOnMobile.style.backgroundImage = `url('${this.currentSong.image}')`;
    this.loadTimeRight();
  },
  loadTimeRight: function () {
    audio.onloadedmetadata = function () {
      timeRights[0].innerHTML = app.convertTime(audio.duration);
      timeRights[1].innerHTML = app.convertTime(audio.duration);
    };
  },
  loadTotalTime: function () {
    const listMusic = $$(".song");
    const lengthOfSongsList = listMusic.length;

    for (let i = 0; i < lengthOfSongsList; i++) {
      let audio = document.createElement("audio");
      audio.src = app.songs[i].path;
      audio.onloadedmetadata = function () {
        let totalTimeEl = listMusic[i].querySelector(`.time-total-${i} span`);
        console.log(audio.src, audio.duration, totalTimeEl);
        totalTimeEl.innerHTML = app.convertTime(audio.duration);
      };
    }
  },
  endRandomSong: function () {
    app.arrSongs.push(app.currentIndex);
    if (app.arrSongs.length === app.songs.length) {
      app.arrSongs = [];
    }
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
    randomBtns[0].classList.toggle("active", app.isRandom);
    randomBtns[1].classList.toggle("active", app.isRandom);
    repeatBtns[0].classList.toggle("active", app.isRepeat);
    repeatBtns[1].classList.toggle("active", app.isRepeat);
  },
  start: function () {
    this.loadConfig();
    this.defineProperties();
    this.loadTotalTime();
    this.loadCurrentSong();
    this.handleEvents();
    this.render();
  },
};

app.start();
