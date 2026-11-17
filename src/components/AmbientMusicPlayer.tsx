import React, { useEffect, useRef, useState } from 'react';
import type { ClassicalTrackItem } from '../types/portfolio';
import { MusicNoteIcon, PauseBarsIcon, PlayTriangleIcon, VolumeIcon } from './MuseumIcons';

interface AmbientMusicPlayerProps {
  track: ClassicalTrackItem;
}

interface StoredAudioPrefs {
  volume: number;
  muted: boolean;
}

type AudioStatus = 'loading' | 'playing' | 'paused' | 'blocked' | 'error';

const AUDIO_PREFS_KEY = 'museum-audio-prefs-v1';
const DEFAULT_VOLUME = 0.2;

function readStoredAudioPrefs(): StoredAudioPrefs {
  const fallback: StoredAudioPrefs = { volume: DEFAULT_VOLUME, muted: false };
  try {
    const raw = localStorage.getItem(AUDIO_PREFS_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<StoredAudioPrefs>;
    const validVolume =
      typeof parsed.volume === 'number' && parsed.volume >= 0 && parsed.volume <= 1
        ? parsed.volume
        : DEFAULT_VOLUME;
    const validMuted = typeof parsed.muted === 'boolean' ? parsed.muted : false;
    return { volume: validVolume, muted: validMuted };
  } catch {
    return fallback;
  }
}

/**
 * The site's only audio element. Mounted once in App (outside every section),
 * so moving between sections never restarts or duplicates the music.
 */
export const AmbientMusicPlayer: React.FC<AmbientMusicPlayerProps> = ({ track }) => {
  const [prefs] = useState(readStoredAudioPrefs);
  const [volume, setVolume] = useState<number>(prefs.volume);
  const [muted, setMuted] = useState<boolean>(prefs.muted);
  const [status, setStatus] = useState<AudioStatus>('loading');
  const [panelOpen, setPanelOpen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const isPlaying = status === 'playing';

  useEffect(() => {
    try {
      localStorage.setItem(AUDIO_PREFS_KEY, JSON.stringify({ volume, muted }));
    } catch {
      // Storage can be blocked (private mode); the player still works.
    }
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  const startPlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
    } catch (err) {
      // NotAllowedError = the browser's autoplay policy; anything else is a real failure.
      setStatus(err instanceof DOMException && err.name === 'NotAllowedError' ? 'blocked' : 'error');
    }
  };

  // Try to start once when the site opens. If the browser blocks it, the button asks for a tap.
  useEffect(() => {
    void startPlayback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!panelOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPanelOpen(false);
        buttonRef.current?.focus();
      }
    };
    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setPanelOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [panelOpen]);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      if (status === 'error') audio.load();
      void startPlayback();
    }
  };

  const volumePercent = Math.round(volume * 100);

  const statusText: Record<AudioStatus, string> = {
    loading: 'Loading the music…',
    playing: muted ? 'Playing (muted)' : 'Playing',
    paused: 'Paused',
    blocked: 'Your browser blocked autoplay. Press Play to start the music.',
    error: `${track.title} could not be loaded.`,
  };

  return (
    <div
      ref={containerRef}
      className={`music-float is-${status} ${muted ? 'is-muted' : ''}`}
    >
      <audio
        ref={audioRef}
        src={track.audioUrl}
        preload="metadata"
        loop
        onPlaying={() => setStatus('playing')}
        onPause={() => setStatus((prev) => (prev === 'error' || prev === 'blocked' ? prev : 'paused'))}
        onWaiting={() => setStatus('loading')}
        onError={() => setStatus('error')}
      />

      {panelOpen && (
        <div
          id="music-settings-panel"
          className="music-panel"
          role="region"
          aria-label="Background music settings"
        >
          <p className="music-panel-title">{track.title}</p>
          <p className="music-panel-composer">
            {track.composer}, {track.workSubtitle}
          </p>

          <div className="music-panel-actions">
            <button type="button" className="museum-btn is-solid" onClick={handleTogglePlay}>
              {isPlaying ? <PauseBarsIcon /> : <PlayTriangleIcon />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button
              type="button"
              className="museum-btn"
              aria-pressed={muted}
              onClick={() => setMuted((prev) => !prev)}
            >
              <VolumeIcon muted={muted} />
              <span>{muted ? 'Unmute' : 'Mute'}</span>
            </button>
          </div>

          <div className="music-volume-row">
            <label htmlFor="music-volume">Volume</label>
            <input
              id="music-volume"
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={volume}
              aria-valuetext={`${volumePercent} percent`}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (muted) setMuted(false);
              }}
            />
            <span className="music-volume-value">{volumePercent}%</span>
          </div>

          <p className="music-status" role="status" aria-live="polite">
            {statusText[status]}
          </p>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        className="music-float-button"
        aria-expanded={panelOpen}
        aria-controls="music-settings-panel"
        aria-label={`Background music settings (${statusText[status]})`}
        onClick={() => setPanelOpen((prev) => !prev)}
      >
        <MusicNoteIcon className="ui-icon music-float-icon" />
        <span className="music-float-bars" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>
    </div>
  );
};
