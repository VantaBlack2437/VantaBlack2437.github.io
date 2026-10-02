import { japaneseLevels } from "../data/portfolio.js";

export default function Japan() {
  return (
    <section className="section wrap" id="japan" aria-labelledby="japan-title">
      <div className="japan-panel">
        <div className="japan-copy">
          <span className="eyebrow">06 / A direction I’m working toward</span>
          <div className="japan-title">
            <h2 id="japan-title">Japan, in the long run.</h2>
            <span className="japanese-mark" lang="ja">日本へ</span>
          </div>
          <p>
            I’m interested in Japan’s robotics research and technology ecosystem. After my
            undergraduate degree, I may pursue a master’s there, depending on opportunities and
            scholarships, or look for an engineering role directly.
          </p>
        </div>
        <div className="japan-details">
          <h3>Japanese · approximate current level</h3>
          <div className="language-levels" aria-label="Self-assessed Japanese levels and goals">
            {japaneseLevels.map(({ level, description, current }) => (
              <div className={`language-level${current ? " current" : ""}`} key={level}>
                <span>{level}</span><small>{description}</small>
              </div>
            ))}
          </div>
          <h3>On the study list</h3>
          <p>Hiragana learned; currently studying Katakana, Kanji, vocabulary, grammar, and listening.</p>
          <h3>Off the clock</h3>
          <p>Japanese language and culture, J-pop, rock, anime, and the films of Makoto Shinkai.</p>
        </div>
      </div>
    </section>
  );
}