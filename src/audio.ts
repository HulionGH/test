class SoundTrack {
  track: HTMLAudioElement;

  constructor(url: string) {
    this.track = new Audio(url);
  }

  playAudio() {
    this.track.play();
  }

  pauseAudio() {
    this.track.pause();
  }

  isPlaying() {
    if (!this.track.paused) {
      return true;
    }
  }
}
export default SoundTrack;
