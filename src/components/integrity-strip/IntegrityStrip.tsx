import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Typography from '@mui/material/Typography';

const demoVideo = {
  title: 'LET AI WORK FOR YOU!',
  src: '/media/signmons-demo-vimeo.mp4',
  poster: '/media/signmons-demo-vimeo-poster.png',
};

const localVideo = {
  title: 'NO LOST CALLS = MORE MONEY!',
  src: '/media/signmons-demo-local.mp4',
  poster: '/media/signmons-demo-local-poster-v3.png',
};

const integrityCards = [
  {
    title: 'Paid Before Dispatch',
    description: 'Jobs start only after payment approval.',
    tone: 'payment',
  },
  {
    title: 'Isolated Customer Data',
    description: 'No shared data between accounts.',
    tone: 'tenant',
  },
];

const IntegrityStrip = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoCardRef = useRef<HTMLDivElement | null>(null);
  const localPlayerRef = useRef<HTMLVideoElement | null>(null);
  const [activeVideo, setActiveVideo] = useState<'local' | 'vimeo' | null>(null);
  const [localNeedsTap, setLocalNeedsTap] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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

    if (!target || !root) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        root.classList.toggle('marketing-root--dark', entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '0px 0px -50% 0px' }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeVideo !== 'local') {
      setLocalNeedsTap(false);
      return;
    }

    setLocalNeedsTap(true);

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
          aria-label="Play Signmons demo video"
          onClick={() => setActiveVideo('local')}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setActiveVideo('local');
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

        <div className="integrity-card integrity-card--text">
          <div
            className={`integrity-card__icon integrity-card__icon--${integrityCards[0].tone}`}
            aria-hidden="true"
          />
          <Typography variant="subtitle1" className="integrity-card__title">
            {integrityCards[0].title}
          </Typography>
          <Typography variant="body1" className="integrity-card__description">
            {integrityCards[0].description}
          </Typography>
        </div>

        <div
          className="integrity-card integrity-card--video"
          role="button"
          tabIndex={0}
          aria-label="Play Signmons demo video"
          onClick={() => setActiveVideo('vimeo')}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setActiveVideo('vimeo');
            }
          }}
        >
          <div className="integrity-card__video">
            <div className="integrity-card__video-title">{demoVideo.title}</div>
            {isVisible ? (
              <video
                src={demoVideo.src}
                muted
                playsInline
                preload="metadata"
                poster={demoVideo.poster}
                aria-hidden="true"
              />
            ) : (
              <img
                src={demoVideo.poster}
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

        <div className="integrity-card integrity-card--text">
          <div
            className={`integrity-card__icon integrity-card__icon--${integrityCards[1].tone}`}
            aria-hidden="true"
          />
          <Typography variant="subtitle1" className="integrity-card__title">
            {integrityCards[1].title}
          </Typography>
          <Typography variant="body1" className="integrity-card__description">
            {integrityCards[1].description}
          </Typography>
        </div>
      </div>

      {activeVideo && typeof document !== 'undefined'
        ? createPortal(
            <div
              className="integrity-video-overlay"
              onClick={() => setActiveVideo(null)}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="integrity-video-modal"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="integrity-video-title">
                  {activeVideo === 'local' ? localVideo.title : demoVideo.title}
                </div>
                <button
                  type="button"
                  className="integrity-video-close"
                  onClick={() => setActiveVideo(null)}
                  aria-label="Close video"
                >
                  ×
                </button>
                {activeVideo === 'local' ? (
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
                    src={demoVideo.src}
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
