console.log("Welcome to spotify");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let progressBar = document.getElementById("progressBar");
let previous = document.getElementById("previous");
let next = document.getElementById("next");
let currentSongName = document.getElementById("currentSongName");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItems"));
 
let songs = [
    {songName: "Saathiya", filePath: "songs/1.mp3", coverPath: "cover/1.jpeg"},
    {songName: "The Night We met", filePath: "songs/2.mp3", coverPath: "cover/2.jpeg"},
    {songName: "Apocalypse", filePath: "songs/3.mp3", coverPath: "cover/3.jpeg"},
    {songName: "Raja Ji", filePath: "songs/4.mp3", coverPath: "cover/4.jpg"},
    {songName: "End of the Day", filePath: "songs/5.mp3", coverPath: "cover/6.jpeg" },
    {songName: "A.M.", filePath: "songs/6.mp3", coverPath: "cover/8.jpeg"},
    {songName: "Olivia", filePath: "songs/7.mp3", coverPath: "cover/9.jpeg"},
    {songName: "One Thing", filePath: "songs/8.mp3", coverPath: "cover/5.jpg"},
    {songName: "Perfect", filePath: "songs/9.mp3", coverPath: "cover/7.jpeg"},
    {songName: "Steal My Girl", filePath: "songs/10.mp3", coverPath: "cover/10.jpeg"},
]



//handle song
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
const updateCurrentSongDetails = () => {
    currentSongName.innerText = songs[songIndex].songName; 
    gif.src = songs[songIndex].coverPath; 
};
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
});
audioElement.addEventListener('timeupdate',()=>{
        console.log('timeupdate');
        progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
        progressBar.value = progress;
});
progressBar.addEventListener('change',()=>{
        audioElement.currentTime = (progressBar.value*audioElement.duration)/100;
});

const makeAllPlay = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlay();  // Reset all play buttons
        songIndex = index;  // Set the current song index
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = songs[songIndex].filePath;  // Update the audio source dynamically
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        updateCurrentSongDetails();
    });
});
previous.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    makeAllPlay();
    document.getElementsByClassName("songItemPlay")[songIndex].classList.remove('fa-circle-play');
    document.getElementsByClassName("songItemPlay")[songIndex].classList.add('fa-circle-pause');
    updateCurrentSongDetails();
});

// Event listener for the next button
next.addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
    makeAllPlay();
    document.getElementsByClassName("songItemPlay")[songIndex].classList.remove('fa-circle-play');
    document.getElementsByClassName("songItemPlay")[songIndex].classList.add('fa-circle-pause');
    updateCurrentSongDetails();
});
updateCurrentSongDetails();