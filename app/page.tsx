"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeModal) {
        setActiveModal(null)
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [activeModal])

  const toggleFullscreen = (gameId: string) => {
    const gameContainer = document.getElementById(gameId)
    if (!gameContainer) return

    if (!document.fullscreenElement) {
      gameContainer.requestFullscreen().catch((err) => {
        console.log("Fullscreen request failed:", err)
      })
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <>
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #ffeef8 0%, #ffe0f0 25%, #ffd4eb 50%, #ffc4e8 75%, #ffb3e6 100%);
          color: #4a1942;
          line-height: 1.6;
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        header {
          background: linear-gradient(135deg, #ff69b4, #ff1493, #c71585);
          padding: 40px 20px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(255, 20, 147, 0.4);
          border-radius: 20px;
          margin-bottom: 40px;
          position: relative;
          overflow: hidden;
        }

        header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
          animation: shimmer 6s infinite linear;
        }

        @keyframes shimmer {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        h1 {
          font-size: 3.5rem;
          color: #ffffff;
          text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 255, 255, 0.5);
          margin-bottom: 15px;
          position: relative;
          z-index: 1;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .tagline {
          font-size: 1.3rem;
          color: #ffe0f0;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 1;
          font-weight: 500;
        }

        .game-section {
          background: linear-gradient(145deg, #ffffff, #fff5fb);
          border-radius: 25px;
          padding: 40px;
          margin-bottom: 40px;
          box-shadow: 0 15px 50px rgba(255, 105, 180, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.8);
          border: 3px solid #ffb3e6;
          position: relative;
          overflow: hidden;
        }

        .game-section::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #ff69b4, #ff1493, #c71585, #ff1493, #ff69b4);
          background-size: 200% 100%;
          animation: gradientMove 3s linear infinite;
        }

        @keyframes gradientMove {
          0% { background-position: 0% 0%; }
          100% { background-position: 200% 0%; }
        }

        h2 {
          font-size: 2.2rem;
          color: #c71585;
          margin-bottom: 25px;
          text-align: center;
          font-weight: 700;
          text-shadow: 2px 2px 4px rgba(255, 182, 193, 0.5);
          position: relative;
          padding-bottom: 15px;
        }

        h2::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, transparent, #ff69b4, transparent);
          border-radius: 2px;
        }

        .game-container {
          position: relative;
          width: 100%;
          max-width: 960px;
          margin: 0 auto 30px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(199, 21, 133, 0.4);
          border: 4px solid #ff69b4;
          background: #000;
        }

        .game-container iframe {
          width: 100%;
          height: 600px;
          display: block;
          border: none;
        }

        .fullscreen-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(135deg, #ff69b4, #ff1493);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(255, 20, 147, 0.4);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .fullscreen-btn:hover {
          background: linear-gradient(135deg, #ff1493, #c71585);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 20, 147, 0.6);
        }

        .fullscreen-btn:active {
          transform: translateY(0);
        }

        .fullscreen-btn svg {
          width: 20px;
          height: 20px;
          fill: white;
        }

        .description {
          font-size: 1.15rem;
          line-height: 1.8;
          color: #5a1f52;
          text-align: center;
          margin-bottom: 30px;
          padding: 0 20px;
        }

        .game-details {
          background: linear-gradient(135deg, #fff0f8, #ffe8f5);
          border-radius: 20px;
          padding: 35px;
          margin-top: 30px;
          border: 2px solid #ffb3e6;
          box-shadow: 0 10px 30px rgba(255, 105, 180, 0.2);
        }

        .game-details h3 {
          font-size: 1.8rem;
          color: #c71585;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .game-details p {
          font-size: 1.1rem;
          margin-bottom: 15px;
          color: #5a1f52;
          line-height: 1.8;
        }

        .game-details ul {
          list-style: none;
          padding-left: 0;
        }

        .game-details li {
          padding: 12px 0;
          border-bottom: 1px solid #ffd4eb;
          font-size: 1.05rem;
          color: #5a1f52;
          position: relative;
          padding-left: 30px;
        }

        .game-details li::before {
          content: '💖';
          position: absolute;
          left: 0;
          font-size: 1.2rem;
        }

        .game-details li:last-child {
          border-bottom: none;
        }

        .more-games {
          margin-top: 50px;
        }

        .more-games h2 {
          margin-bottom: 40px;
        }

        .games-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }

        .game-card {
          background: linear-gradient(145deg, #ffffff, #fff5fb);
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 15px 40px rgba(255, 105, 180, 0.25);
          border: 3px solid #ffb3e6;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
        }

        .game-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(255, 20, 147, 0.4);
        }

        .game-card h3 {
          font-size: 1.8rem;
          color: #c71585;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .game-card p {
          font-size: 1.1rem;
          color: #5a1f52;
          margin-bottom: 30px;
          line-height: 1.6;
        }

        .play-btn {
          background: linear-gradient(135deg, #ff69b4, #ff1493);
          color: white;
          border: none;
          padding: 18px 48px;
          border-radius: 15px;
          font-size: 1.3rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(255, 20, 147, 0.4);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .play-btn:hover {
          background: linear-gradient(135deg, #ff1493, #c71585);
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(255, 20, 147, 0.6);
        }

        .play-btn:active {
          transform: translateY(-1px);
        }

        .play-btn svg {
          width: 24px;
          height: 24px;
          fill: white;
        }

        .game-modal {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.95);
          z-index: 10000;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .game-modal.active {
          display: flex;
        }

        .game-modal-content {
          position: relative;
          width: 100%;
          max-width: 1200px;
          height: 90vh;
          background: #000;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(255, 20, 147, 0.6);
          border: 4px solid #ff69b4;
        }

        .game-modal iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .close-modal-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(135deg, #ff1493, #c71585);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          z-index: 10;
          box-shadow: 0 4px 15px rgba(255, 20, 147, 0.6);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .close-modal-btn:hover {
          background: linear-gradient(135deg, #c71585, #8b0a50);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 20, 147, 0.8);
        }

        .close-modal-btn svg {
          width: 20px;
          height: 20px;
          fill: white;
        }

        footer {
          text-align: center;
          padding: 40px 20px;
          margin-top: 60px;
          background: linear-gradient(135deg, #ff69b4, #ff1493);
          border-radius: 20px;
          color: #ffffff;
          box-shadow: 0 10px 40px rgba(255, 20, 147, 0.3);
        }

        footer p {
          font-size: 1.1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.2rem;
            letter-spacing: 1px;
          }

          .tagline {
            font-size: 1.1rem;
          }

          h2 {
            font-size: 1.8rem;
          }

          .game-section {
            padding: 25px 20px;
          }

          .game-container iframe {
            height: 400px;
          }

          .description {
            font-size: 1rem;
          }

          .game-details {
            padding: 25px 20px;
          }

          .games-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .fullscreen-btn {
            padding: 10px 18px;
            font-size: 0.9rem;
            top: 10px;
            right: 10px;
          }

          .fullscreen-btn svg {
            width: 16px;
            height: 16px;
          }

          .game-modal-content {
            height: 85vh;
            border-radius: 15px;
          }

          .close-modal-btn {
            padding: 10px 18px;
            font-size: 1rem;
          }

          .play-btn {
            padding: 15px 36px;
            font-size: 1.1rem;
          }

          .game-card {
            padding: 30px 20px;
            min-height: 250px;
          }

          .game-card h3 {
            font-size: 1.5rem;
          }

          .game-card p {
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 1.8rem;
          }

          .tagline {
            font-size: 1rem;
          }

          h2 {
            font-size: 1.5rem;
          }

          .game-container iframe {
            height: 300px;
          }

          header {
            padding: 30px 15px;
          }

          .container {
            padding: 15px;
          }

          .fullscreen-btn {
            padding: 8px 14px;
            font-size: 0.85rem;
          }

          .game-modal {
            padding: 10px;
          }

          .game-modal-content {
            height: 80vh;
            border-radius: 10px;
          }

          .play-btn {
            padding: 12px 28px;
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="container">
        <header>
          <h1>🎮 Labubu Geometry Dash 🎮</h1>
          <p className="tagline">Jump, Flip, and Dash Through Adorable Geometric Adventures!</p>
        </header>

        <section className="game-section">
          <h2>Play Labubu Geometry Dash Online</h2>
          <p className="description">
            Experience the ultimate rhythm-based platformer featuring everyone's favorite character, Labubu! Navigate
            through challenging geometric obstacles, time your jumps perfectly, and enjoy hours of addictive gameplay in
            this free online game.
          </p>

          <div className="game-container" id="mainGame">
            <button
              className="fullscreen-btn"
              onClick={() => toggleFullscreen("mainGame")}
              aria-label="Toggle Fullscreen"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
              </svg>
              <span>Fullscreen</span>
            </button>
            <iframe
              src="https://html5.gamemonetize.co/qge3r3syyxhvzxjf6cb5oe0rq9bk9uxh/"
              width="960"
              height="600"
              frameBorder="0"
              scrolling="no"
              allow="fullscreen; autoplay; gamepad"
              allowFullScreen
              loading="lazy"
              title="Labubu Geometry Dash Game"
            />
          </div>

          <div className="game-details">
            <h3>About Labubu Geometry Dash</h3>
            <p>
              Labubu Geometry Dash is an exhilarating rhythm-based action platformer that combines the beloved Labubu
              character with intense geometric challenges. This game tests your reflexes, timing, and determination as
              you guide Labubu through a series of increasingly difficult levels filled with spikes, obstacles, and
              gravity-defying jumps.
            </p>
            <p>
              The game features stunning visual effects, synchronized music that enhances the gameplay experience, and a
              progression system that keeps you coming back for more. Whether you're a casual player or a hardcore
              gamer, Labubu Geometry Dash offers the perfect balance of challenge and fun.
            </p>

            <h3>Game Features</h3>
            <ul>
              <li>
                <strong>Adorable Labubu Character:</strong> Play as the cute and lovable Labubu in this exciting
                adventure
              </li>
              <li>
                <strong>Rhythm-Based Gameplay:</strong> Jump and fly to the beat of catchy soundtracks
              </li>
              <li>
                <strong>Challenging Levels:</strong> Navigate through dangerous passages and sharp obstacles
              </li>
              <li>
                <strong>Simple Controls:</strong> Easy to learn, difficult to master - perfect for all skill levels
              </li>
              <li>
                <strong>Stunning Graphics:</strong> Enjoy vibrant colors and smooth animations
              </li>
              <li>
                <strong>Free to Play:</strong> No downloads required - play instantly in your browser
              </li>
              <li>
                <strong>Mobile Friendly:</strong> Fully optimized for both desktop and mobile devices
              </li>
              <li>
                <strong>Addictive Gameplay:</strong> Quick sessions that keep you coming back for more
              </li>
            </ul>

            <h3>How to Play</h3>
            <p>
              <strong>Desktop:</strong> Click or press the spacebar to make Labubu jump. Hold to keep jumping. Navigate
              through obstacles by timing your jumps perfectly with the rhythm of the music.
            </p>
            <p>
              <strong>Mobile:</strong> Tap the screen to jump. Hold your finger down to keep jumping. The intuitive
              touch controls make it easy to play on any device.
            </p>
            <p>
              <strong>Tips:</strong> Practice makes perfect! Learn the patterns of each level, listen to the music for
              timing cues, and don't give up - even the toughest levels can be conquered with patience and skill.
            </p>
          </div>
        </section>

        <section className="game-section more-games">
          <h2>More Exciting Games to Play</h2>
          <p className="description">
            Can't get enough of Labubu? Check out these other amazing games that will keep you entertained for hours!
          </p>

          <div className="games-grid">
            <div className="game-card">
              <h3>Labubu Adventure Quest</h3>
              <p>Join Labubu on an epic adventure through magical worlds filled with puzzles and treasures!</p>
              <button
                className="play-btn"
                onClick={() => setActiveModal("game1")}
                aria-label="Play Labubu Adventure Quest"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Play Now</span>
              </button>
            </div>

            <div className="game-card">
              <h3>Labubu Racing Challenge</h3>
              <p>Race through exciting tracks with Labubu in this fast-paced racing adventure!</p>
              <button
                className="play-btn"
                onClick={() => setActiveModal("game2")}
                aria-label="Play Labubu Racing Challenge"
              >
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Play Now</span>
              </button>
            </div>
          </div>
        </section>

        <footer>
          <p>&copy; 2025 labubugames.games - All Rights Reserved</p>
          <p>Play Labubu Geometry Dash and More Free Online Games!</p>
        </footer>
      </div>

      <div
        className={`game-modal ${activeModal === "game1" ? "active" : ""}`}
        onClick={(e) => e.target === e.currentTarget && setActiveModal(null)}
      >
        <div className="game-modal-content">
          <button className="close-modal-btn" onClick={() => setActiveModal(null)} aria-label="Close Game">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
            <span>Close</span>
          </button>
          <iframe
            src="https://html5.gamemonetize.co/iri6qbxw5iyl4teu4u6tqwh9lgtmeiju/"
            width="960"
            height="540"
            frameBorder="0"
            scrolling="no"
            allow="fullscreen; autoplay; gamepad"
            allowFullScreen
            loading="lazy"
            title="Labubu Adventure Quest"
          />
        </div>
      </div>

      <div
        className={`game-modal ${activeModal === "game2" ? "active" : ""}`}
        onClick={(e) => e.target === e.currentTarget && setActiveModal(null)}
      >
        <div className="game-modal-content">
          <button className="close-modal-btn" onClick={() => setActiveModal(null)} aria-label="Close Game">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
            <span>Close</span>
          </button>
          <iframe
            src="https://html5.gamemonetize.co/klzoqsmeofr7ylbhwhbwy9znj3n4ucsw/"
            width="960"
            height="540"
            frameBorder="0"
            scrolling="no"
            allow="fullscreen; autoplay; gamepad"
            allowFullScreen
            loading="lazy"
            title="Labubu Racing Challenge"
          />
        </div>
      </div>
    </>
  )
}
