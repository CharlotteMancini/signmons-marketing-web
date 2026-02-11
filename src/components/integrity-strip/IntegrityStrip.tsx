import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Typography from '@mui/material/Typography';
import { homePageCopy } from '../../data';
import type { MarketingVideoAsset } from '../../types';
import GlassCard from '../ui/GlassCard';

const IntegrityStrip = () => {
  const { integrity } = homePageCopy;
  const localVideo = integrity.videos.find((video) => video.id === 'local-demo');
  const vimeoVideo = integrity.videos.find((video) => video.id === 'vimeo-demo');
  const [primaryCard, secondaryCard] = integrity.cards;

  if (!localVideo || !vimeoVideo || !primaryCard || !secondaryCard) {
    throw new Error('Integrity section data is incomplete.');
  }

  const sectionRef = useRef<HTMLElement | null>(null);
  const videoCardRef = useRef<HTMLDivElement | null>(null);
  const localPlayerRef = useRef<HTMLVideoElement | null>(null);
  const [activeVideo, setActiveVideo] = useState<MarketingVideoAsset['id'] | null>(null);
  const [localNeedsTap, setLocalNeedsTap] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const openVideo = (video: MarketingVideoAsset['id']) => {
    setActiveVideo(video);
    setLocalNeedsTap(video === 'local-demo');
  };

  const closeVideo = () => {
    setActiveVideo(null);
    setLocalNeedsTap(false);
  };

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const target = sectionRef.current;
    const root = document.querySelector('.marketing-root');
    const body = document.body;

    if (!target || !root) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        root.classList.toggle('marketing-root--dark', entry.isIntersecting);
        root.classList.toggle('marketing-root--deep-space', entry.isIntersecting);
        body.classList.toggle('marketing-body--deep-space', entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px 0px -50% 0px' }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
      root.classList.remove('marketing-root--dark');
      root.classList.remove('marketing-root--deep-space');
      body.classList.remove('marketing-body--deep-space');
    };
  }, []);

  useEffect(() => {
    if (activeVideo !== 'local-demo') return;

    const frame = requestAnimationFrame(() => {
      const player = localPlayerRef.current;
      if (!player) {
        return;
      }

      player.muted = false;
      player.volume = 0.9;
      player
        .play()
        .then(() => setLocalNeedsTap(false))
        .catch(() => setLocalNeedsTap(true));
    });

    return () => cancelAnimationFrame(frame);
  }, [activeVideo]);

  return (
    <section className="integrity-strip" ref={sectionRef}>
      <div className="integrity-grid">
        <div
          ref={videoCardRef}
          className="integrity-card integrity-card--video"
          role="button"
          tabIndex={0}
          aria-label={localVideo.ariaLabel}
          onClick={() => openVideo('local-demo')}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openVideo('local-demo');
            }
          }}
        >
          <div className="integrity-card__video">
            <div className="integrity-card__video-title">{localVideo.title}</div>
            {isVisible ? (
              <video
                src={localVideo.src}
                muted
                playsInline
                preload="metadata"
                poster={localVideo.poster}
                aria-hidden="true"
              />
            ) : (
              <img
                src={localVideo.poster}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="integrity-card__video-poster"
              />
            )}
            <div className="integrity-card__video-play-overlay" aria-hidden="true">
              <span className="integrity-card__video-play">▶</span>
            </div>
          </div>
        </div>

        <GlassCard variant="integrity" className="integrity-card integrity-card--text">
          <div className={`integrity-card__icon integrity-card__icon--${primaryCard.tone}`} aria-hidden="true" />
          <Typography variant="subtitle1" className="integrity-card__title">
            {primaryCard.title}
          </Typography>
          <Typography variant="body1" className="integrity-card__description">
            {primaryCard.description}
          </Typography>
        </GlassCard>

        <div
          className="integrity-card integrity-card--video"
          role="button"
          tabIndex={0}
          aria-label={vimeoVideo.ariaLabel}
          onClick={() => openVideo('vimeo-demo')}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openVideo('vimeo-demo');
            }
          }}
        >
          <div className="integrity-card__video">
            <div className="integrity-card__video-title">{vimeoVideo.title}</div>
            {isVisible ? (
              <video
                src={vimeoVideo.src}
                muted
                playsInline
                preload="metadata"
                poster={vimeoVideo.poster}
                aria-hidden="true"
              />
            ) : (
              <img
                src={vimeoVideo.poster}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="integrity-card__video-poster"
              />
            )}
            <div className="integrity-card__video-play-overlay" aria-hidden="true">
              <span className="integrity-card__video-play">▶</span>
            </div>
          </div>
        </div>

        <GlassCard variant="integrity" className="integrity-card integrity-card--text">
          <div className={`integrity-card__icon integrity-card__icon--${secondaryCard.tone}`} aria-hidden="true" />
          <Typography variant="subtitle1" className="integrity-card__title">
            {secondaryCard.title}
          </Typography>
          <Typography variant="body1" className="integrity-card__description">
            {secondaryCard.description}
          </Typography>
        </GlassCard>
      </div>

      {activeVideo && typeof document !== 'undefined'
        ? createPortal(
            <div
              className="integrity-video-overlay"
              onClick={closeVideo}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="integrity-video-modal"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="integrity-video-title">
                  {activeVideo === 'local-demo' ? localVideo.title : vimeoVideo.title}
                </div>
                <button
                  type="button"
                  className="integrity-video-close"
                  onClick={closeVideo}
                  aria-label="Close video"
                >
                  ×
                </button>
                {activeVideo === 'local-demo' ? (
                  <div className="integrity-video-player">
                    <video
                      src={localVideo.src}
                      autoPlay
                      playsInline
                      loop
                      controls
                      ref={localPlayerRef}
                    />
                    {localNeedsTap ? (
                      <button
                        type="button"
                        className="integrity-video-tap"
                        onClick={() => {
                          const player = localPlayerRef.current;
                          if (!player) {
                            return;
                          }
                          player.muted = false;
                          player.volume = 0.9;
                          player
                            .play()
                            .then(() => setLocalNeedsTap(false))
                            .catch(() => setLocalNeedsTap(true));
                        }}
                      >
                        Tap to Play
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <video
                    src={vimeoVideo.src}
                    autoPlay
                    playsInline
                    loop
                    controls
                  />
                )}
              </div>
            </div>,
            document.body
          )
        : null}
    </section>
  );
};

export default IntegrityStrip;
