window.onload = function() {
   
    //Variables
    let audioArray = ["songs/Benny%20Blanco%20Halsey%20&%20Khalid-Eastside.mp3",
    
                 "songs/Alan%20Walker,%20Ava%20Max%20-%20Alone,%20Pt.%20II.mp3","songs/Diplo_-_Revolution_feat_Faustix_Imanos_and_Kai_Official_Music_Video%5BSaveFrom.online%5D.mp3","songs/Ed%20Sheeran%20-%20Perfect%20[Mw%20Hits].mp3","songs/Loud%20Luxury%20Ft.%20Brando-Body.mp3","songs/Ava%20Max%20-%20Sweet%20but%20Psycho.mp3","songs/Shawn%20Mendes-Treat%20You%20Better.mp3"];
    let imgArray = ["img/eastside.jpg","img/external-content.duckduckgo.com.jpg","img/re.jpg","img/Ed-Sheeran-Divide Cover.jpg","img/body.jpg","img/Cover%20Ava%20Max%20-%20Sweet%20but%20Psycho.jpg","img/treat%20u%20better.jpg"];
    
    let nameArray = ["Eastside","Alone Pt.2","Revolution","Perfect","Body","Sweet but Psycho","Treat You Better"];
    
    let artistArray = ["Benny Blanco, Halsey & Khalid", "Alan Walker ft.Ava Max", "Diplo ft. Kai & Faustix Imanos","Ed Sheeran", "Loud Luxury ft. Brando","Ava max", "Shawn Mendes"];
const showcase  =  document.querySelector('.display');    
const display = document.querySelector('.display_inner');
//const =  document.querySelector('.display_inner');
//const
let button = document.querySelectorAll('.play')[0];
let active = false;
let songDisplay = document.querySelector('.currentSong');
let seekBar = document.querySelector('input[type=range]');
let seek,stop;
let listView = document.querySelector('.listView');
    

//DOM creating object for upper display
    
function createMusic(music,image,name,artist){
    this.music = music;
    this.image = image;
    this.name = name;
    this.artist = artist;
    }
    createMusic.prototype.createPlayer = function(){
        const playerArray = [];
        for(i in this.music){
            const player =          document.createElement("AUDIO");
            player.className="audio";
            player.setAttribute('src',this.music[i]);
            playerArray.push(player)
            display.appendChild(playerArray[i]);
        }
    return playerArray;
    }
    createMusic.prototype.createImg = function(){
    let imgArray = [];
        for(j in this.image){
            let img = document.createElement("IMG");
            img.className="play_img";
            img.setAttribute('src',this.image[j]);  
            imgArray.push(img);
            display.appendChild(imgArray[j]);
        }
    
    return imgArray;
    }
    createMusic.prototype.Title = function(){
    let titleArray = [];
    for(j in this.name){
        let title = document.createElement("P");
        title.className="music_title";
        title.innerText = this.name[j];
        titleArray.push(title);
        }
    return titleArray;
    }

    createMusic.prototype.list = function(){
        let li , songName, artistName, breakLine,thumb;
        let lisArray = [];
        let listView = document.querySelector('.listView');    
        let uList =  document.createElement('UL');
        uList.className = 'uList';
        
        for (let i in this.artist){
            li = document.createElement('LI');
            songName = document.createElement('P');
            artistName = document.createElement('P');
            breakLine = document.createElement('br');
            thumb  = document.createElement('img');
            
            li.className = "list";
            songName.className = "title";
            artistName.className = "artist";
            thumb.className = "thumb";
           
            songName.innerText = this.name[i];
            artistName.innerText = this.artist[i];
            thumb.src = this.image[i];
            
            li.appendChild(songName);
            li.appendChild(artistName);
            li.appendChild(thumb);
            lisArray.push(li);
            uList.appendChild(li);
        }
    listView.appendChild(uList)
    return lisArray;
}
mainPlayer.prototype = Object.create(createMusic.prototype);

mainPlayer.prototype.constructor = mainPlayer;

Object.defineProperty(mainPlayer.prototype,'constructor', 
    {value:mainPlayer,
    enumerable:true,
    writable:true});

//main MusicPlayer object

function mainPlayer(music,image,name,artist){
    createMusic.call(this,music,image,name,artist);
}

               let stage = []; 
    
mainPlayer.prototype.imgPlaying = function(j){
  
    stage.push(j)
    stage.length >2?stage.splice(0,1):console.log(stage);
    
    console.log(active);
    console.log(stage);
    if(active == false){
            active = true;
            this.music[j].play();
            button.setAttribute('class',' fa fa-pause-circle-o play');
            songDisplay.innerText =`${this.artist[j].childNodes[0].innerText} -> ${this.artist[j].childNodes[1].innerText}`;
            return active;}
    else if (active == true){
        this.music[stage[0]].pause();
        this.music[j].play();
        button.setAttribute('class',' fa fa-pause-circle-o play');
        songDisplay.innerText =`${this.artist[j].childNodes[0].innerText} -> ${this.artist[j].childNodes[1].innerText}`;
        
        return active;
    }
    
  
    
}
mainPlayer.prototype.utility = function(j){
    console.log(active);
    if(active == false && stage.length == 0){
        console.log(this.music[j]);
        active = true;
        this.music[0].play();   
        button.setAttribute('class',' fa fa-pause-circle-o play');
        this.music.onended = function(){console.log(this.music[j]);}
    }
        else if(active == true && stage.length > 0){
        active = false;
        this.music[j].pause();   
        button.setAttribute('class',' fa fa-play-circle-o play');
        }
    
    else{active = true;
        this.music[j].play();   
        button.setAttribute('class',' fa fa-pause-circle-o play');}
    
}
mainPlayer.prototype.seekable = function(j){
    let presentSong = this.music[j];
    if(active == true){
        try{
            seekBar.max = presentSong.duration;
            presentSong.onchange = function(){stopSeek()}
             seek = setInterval(function(){
            seekBar.value = presentSong.currentTime;}
        ,1000);
            function stopSeek(){
                console.log(presentSong)
                clearInterval(seek);
                seekBar.value = 0;
            }
            
            seekBar.onchange = function(){
                presentSong.currentTime =seekBar.value;
                seekBar.value = presentSong.currentTime;
            }
            
        }catch(err){
            console.log(err);
        }
    }
}
//--------------------------------------------------------------//

const play = new createMusic(audioArray,imgArray,nameArray,artistArray);

const player = new mainPlayer(play.createPlayer(),play.createImg(),play.Title(),play.list());
    let im = document.querySelectorAll('.play_img');
    let list = document.querySelectorAll('.list');
    for(let j in audioArray){
    im[j].onclick =function(){player.imgPlaying(j);
                              clearInterval(seek);
                              player.seekable(j);
                     showcase.setAttribute('id','big-display');
                     im[j].setAttribute('id','big-img');
                        display.style.transform=`translateX(-${im[j].getBoundingClientRect().x -110}px)`;
                              if(stage.length > 1){
                     im[stage[0]].removeAttribute('id','big-img');
                        display.style.transform=`translateX(none)`;
                                  console.log(display.getClientRects());
                              }
                              
                              
    button.onclick = function(){player.utility(j);}
                             }
    list[j].onclick =function(){player.imgPlaying(j);
                              player.seekable(j);
                              console.log(stage);
    button.onclick = function(){player.utility(j);}
                             }
    
    button.onclick = function(){player.utility(j);}
    }
   



    
}