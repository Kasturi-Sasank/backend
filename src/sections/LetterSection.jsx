import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import SectionEyebrow from '../components/SectionEyebrow'
import FloatingDecor from '../components/FloatingDecor'
import { LETTER_PASSWORD, LETTER_PLACEHOLDER } from '../constants/content'

export default function LetterSection() {
  const [password, setPassword] = useState('')
  const [unlocked, setUnlocked] = useState(false)
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const tryUnlock = (e) => {
    e.preventDefault()
    if (password === LETTER_PASSWORD) {
      setUnlocked(true)
      setError(false)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <section
      className="relative px-4 py-20 pb-32 sm:px-8 overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 15% 15%, #fce7f3 0%, transparent 45%), radial-gradient(circle at 85% 10%, #ddd6fe 0%, transparent 50%), radial-gradient(circle at 80% 90%, #bae6fd 0%, transparent 45%), linear-gradient(180deg, #fff1f2 0%, #fdf4ff 45%, #f0f9ff 100%)',
      }}
    >
      <FloatingDecor emojis={['🧸', '💗', '🌸', '💫', '💕', '✨', '💖', '🎀', '🌷', '💘', '💌', '🌼', '💝', '🧸', '🌹', '💞']} />

      <div className="pointer-events-none absolute left-4 sm:left-8 top-14 sm:top-16 z-0 text-5xl sm:text-7xl opacity-40">
        <motion.span animate={{ rotate: [-8, 6, -8], y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}>
          🧸
        </motion.span>
      </div>
      <div className="pointer-events-none absolute right-4 sm:right-10 top-20 sm:top-24 z-0 text-5xl sm:text-7xl opacity-40">
        <span className="inline-block anim-corner-b">💗</span>
      </div>
      <div className="pointer-events-none absolute left-6 sm:left-12 bottom-20 sm:bottom-24 z-0 text-5xl sm:text-6xl opacity-40">
        <span className="inline-block anim-corner-c">💕</span>
      </div>
      <div className="pointer-events-none absolute right-6 sm:right-14 bottom-16 sm:bottom-20 z-0 text-5xl sm:text-7xl opacity-40">
        <motion.span animate={{ rotate: [6, -8, 6], y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>
          🧸
        </motion.span>
      </div>

      <div className="mx-auto max-w-2xl relative z-10">
        <ScrollReveal className="text-center">
          <SectionEyebrow>no.6 — the small print</SectionEyebrow>
          <h2 className="font-display gradient-heading text-4xl font-extrabold sm:text-5xl">
            p.s. a tiny letter
          </h2>
          <p className="font-hand mt-3 text-lg text-rose-400">
            sealed with love, and a teddy 🧸💌
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} className="mt-10 relative">
          {!unlocked ? (
            <motion.form
              onSubmit={tryUnlock}
              className="relative overflow-hidden rounded-[28px] border-4 border-white/80 p-6 sm:p-8 text-center shadow-2xl"
              style={{
                background:
                  'linear-gradient(145deg, rgba(255,255,255,0.94) 0%, rgba(255,240,250,0.9) 100%)',
                boxShadow:
                  '0 24px 60px rgba(255,105,180,0.22), inset 0 0 0 1px rgba(255,255,255,0.9)',
              }}
              initial={{ y: 20, opacity: 0 }}
              animate={
                shake
                  ? { y: 0, opacity: 1, x: [-8, 8, -6, 6, 0] }
                  : { y: 0, opacity: 1 }
              }
              transition={{ type: 'spring', stiffness: 110, damping: 16 }}
            >
              {/* top bunting */}
              <div className="pointer-events-none absolute -top-1 right-0 left-0 z-10 flex justify-center gap-1 sm:gap-1.5">
                {['#ff9ebb', '#ffd166', '#c9b1ff', '#95e1d3', '#ffb3c6', '#ffe066', '#b8e0ff'].map(
                  (color, i) => (
                    <motion.div
                      key={i}
                      className="h-7 w-6 rounded-b-md shadow sm:h-9 sm:w-8"
                      style={{ background: color }}
                      animate={{ rotate: [-5, 5, -5] }}
                      transition={{ repeat: Infinity, duration: 2 + i * 0.15, delay: i * 0.08 }}
                    />
                  ),
                )}
              </div>

              <div className="pointer-events-none absolute -top-6 -right-5 text-4xl opacity-85 rotate-[10deg]">🎀</div>
              <div className="pointer-events-none absolute -bottom-5 -left-4 text-3xl opacity-85 rotate-[-8deg]">💖</div>
              <div className="pointer-events-none absolute top-16 -left-3 text-2xl opacity-70 rotate-[-15deg]">🧸</div>
              <div className="pointer-events-none absolute bottom-16 -right-3 text-2xl opacity-70 rotate-[14deg]">🌸</div>

              <motion.p
                className="mt-4 mb-1 text-5xl sm:text-6xl"
                animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
              >
                🔐
              </motion.p>

              <p className="font-hand mt-2 text-center text-2xl text-rose-600">
                psst… this letter is locked
              </p>
              <p className="mt-1 text-center text-sm text-rose-400">
                enter the secret word to open it
              </p>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="font-hand mt-6 w-full rounded-2xl border-2 border-rose-200 bg-white px-4 py-3 text-center text-2xl text-rose-700 outline-none focus:border-rose-400"
                autoComplete="off"
              />
              {error && (
                <p className="font-hand mt-2 text-center text-lg text-rose-500">
                  not quite — try again 🥺
                </p>
              )}
              <motion.button
                type="submit"
                className="font-display mt-6 w-full rounded-full bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-400 py-3.5 font-bold text-white shadow-lg shadow-rose-400/40"
                whileHover={{ scale: 1.03, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
              >
                open letter 💌
              </motion.button>
            </motion.form>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, rotateX: -15, y: 30 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ type: 'spring', stiffness: 80, damping: 16 }}
                className="relative"
              >
                {/* washi tape top-left */}
                <div
                  className="pointer-events-none absolute -top-4 left-10 sm:left-16 z-20 h-8 w-28 sm:w-36 rotate-[-8deg] opacity-80"
                  style={{
                    background:
                      'repeating-linear-gradient(45deg, #fbcfe8 0 8px, #f9a8d4 8px 16px)',
                    boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
                  }}
                />
                {/* washi tape top-right */}
                <div
                  className="pointer-events-none absolute -top-4 right-10 sm:right-16 z-20 h-8 w-28 sm:w-36 rotate-[7deg] opacity-80"
                  style={{
                    background:
                      'repeating-linear-gradient(-45deg, #ddd6fe 0 8px, #c4b5fd 8px 16px)',
                    boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
                  }}
                />
                {/* washi tape bottom-left */}
                <div
                  className="pointer-events-none absolute -bottom-3 left-8 sm:left-14 z-20 h-7 w-24 sm:w-32 rotate-[5deg] opacity-75"
                  style={{
                    background:
                      'repeating-linear-gradient(45deg, #fde68a 0 8px, #fcd34d 8px 16px)',
                    boxShadow: '0 3px 8px rgba(0,0,0,0.12)',
                  }}
                />

                {/* teddy sticker top-left corner of paper */}
                <motion.div
                  className="pointer-events-none absolute -top-8 -left-2 sm:-left-5 z-20 text-5xl sm:text-6xl"
                  animate={{ rotate: [-10, 6, -10], y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
                >
                  🧸
                </motion.div>
                {/* heart sticker top-right corner */}
                <div className="pointer-events-none absolute -top-6 -right-2 sm:-right-4 z-20 text-5xl sm:text-6xl opacity-90">
                  <span className="inline-block anim-corner-a">💖</span>
                </div>
                {/* teddy sticker bottom-right */}
                <motion.div
                  className="pointer-events-none absolute -bottom-7 -right-1 sm:-right-3 z-20 text-5xl sm:text-6xl"
                  animate={{ rotate: [8, -6, 8], y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
                >
                  🧸
                </motion.div>
                {/* butterfly sticker bottom-left */}
                <div className="pointer-events-none absolute -bottom-4 -left-1 sm:-left-3 z-20 text-4xl sm:text-5xl opacity-90">
                  <span className="inline-block anim-corner-d">🦋</span>
                </div>
                {/* wax seal */}
                <motion.div
                  className="pointer-events-none absolute top-4 right-6 sm:right-8 z-10 text-4xl sm:text-5xl"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  🔴
                </motion.div>

                {/* polaroid teddy-4 left-top */}
                <motion.div
                  className="pointer-events-none absolute z-30 hidden xl:block"
                  style={{ left: '-92px', top: '5%' }}
                  animate={{ rotate: [-9, 6, -9], y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
                >
                  <div className="relative w-[110px] rotate-[-9deg] rounded-sm bg-white p-2 pb-6 shadow-2xl ring-1 ring-rose-100">
                    <div
                      className="w-full aspect-square rounded-[2px] bg-gradient-to-br from-rose-50 to-violet-50 overflow-hidden"
                      style={{
                        backgroundImage: `url(${new URL('../../teddy-4.jpg', import.meta.url).href})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <p className="font-hand absolute bottom-1 left-0 w-full text-center text-[11px] text-rose-400">
                      mocha 🧸
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="pointer-events-none absolute z-30 hidden lg:block xl:hidden"
                  style={{ left: '-64px', top: '5%' }}
                  animate={{ rotate: [-9, 6, -9], y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
                >
                  <div className="relative w-[88px] rotate-[-9deg] rounded-sm bg-white p-1.5 pb-5 shadow-2xl ring-1 ring-rose-100">
                    <div
                      className="w-full aspect-square rounded-[2px] overflow-hidden"
                      style={{
                        backgroundImage: `url(${new URL('../../teddy-4.jpg', import.meta.url).href})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <p className="font-hand absolute bottom-0.5 left-0 w-full text-center text-[10px] text-rose-400">
                      mocha 🧸
                    </p>
                  </div>
                </motion.div>

                {/* polaroid teddy-6 left lower-mid */}
                <motion.div
                  className="pointer-events-none absolute z-30 hidden xl:block"
                  style={{ left: '-92px', top: '51%' }}
                  animate={{ rotate: [9, -6, 9], y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 7.5, ease: 'easeInOut' }}
                >
                  <div className="relative w-[110px] rotate-[9deg] rounded-sm bg-white p-2 pb-6 shadow-2xl ring-1 ring-amber-100">
                    <div
                      className="w-full aspect-square rounded-[2px] overflow-hidden"
                      style={{
                        backgroundImage: `url(${new URL('../../teddy-6.jpg', import.meta.url).href})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <p className="font-hand absolute bottom-1 left-0 w-full text-center text-[11px] text-amber-500">
                      bujji 💛
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="pointer-events-none absolute z-30 hidden lg:block xl:hidden"
                  style={{ left: '-64px', top: '51%' }}
                  animate={{ rotate: [9, -6, 9], y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 7.5, ease: 'easeInOut' }}
                >
                  <div className="relative w-[88px] rotate-[9deg] rounded-sm bg-white p-1.5 pb-5 shadow-2xl ring-1 ring-amber-100">
                    <div
                      className="w-full aspect-square rounded-[2px] overflow-hidden"
                      style={{
                        backgroundImage: `url(${new URL('../../teddy-6.jpg', import.meta.url).href})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <p className="font-hand absolute bottom-0.5 left-0 w-full text-center text-[10px] text-amber-500">
                      bujji 💛
                    </p>
                  </div>
                </motion.div>

                {/* polaroid teddy-5 right upper-mid */}
                <motion.div
                  className="pointer-events-none absolute z-30 hidden xl:block"
                  style={{ right: '-100px', top: '27%' }}
                  animate={{ rotate: [11, -8, 11], y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                >
                  <div className="relative w-[115px] rotate-[11deg] rounded-sm bg-white p-2 pb-6 shadow-2xl ring-1 ring-violet-100">
                    <div
                      className="w-full aspect-square rounded-[2px] overflow-hidden"
                      style={{
                        backgroundImage: `url(${new URL('../../teddy-5.jpg', import.meta.url).href})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <p className="font-hand absolute bottom-1 left-0 w-full text-center text-[11px] text-violet-400">
                      ur teddy 💕
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="pointer-events-none absolute z-30 hidden lg:block xl:hidden"
                  style={{ right: '-68px', top: '27%' }}
                  animate={{ rotate: [11, -8, 11], y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                >
                  <div className="relative w-[90px] rotate-[11deg] rounded-sm bg-white p-1.5 pb-5 shadow-2xl ring-1 ring-violet-100">
                    <div
                      className="w-full aspect-square rounded-[2px] overflow-hidden"
                      style={{
                        backgroundImage: `url(${new URL('../../teddy-5.jpg', import.meta.url).href})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <p className="font-hand absolute bottom-0.5 left-0 w-full text-center text-[10px] text-violet-400">
                      ur teddy 💕
                    </p>
                  </div>
                </motion.div>

                {/* polaroid teddy-7 right-bottom */}
                <motion.div
                  className="pointer-events-none absolute z-30 hidden xl:block"
                  style={{ right: '-100px', top: '75%' }}
                  animate={{ rotate: [-11, 8, -11], y: [0, -9, 0] }}
                  transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut' }}
                >
                  <div className="relative w-[115px] rotate-[-11deg] rounded-sm bg-white p-2 pb-6 shadow-2xl ring-1 ring-sky-100">
                    <div
                      className="w-full aspect-square rounded-[2px] overflow-hidden"
                      style={{
                        backgroundImage: `url(${new URL('../../teddy-7.jpg', import.meta.url).href})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <p className="font-hand absolute bottom-1 left-0 w-full text-center text-[11px] text-sky-500">
                      bangaram 💙
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="pointer-events-none absolute z-30 hidden lg:block xl:hidden"
                  style={{ right: '-68px', top: '75%' }}
                  animate={{ rotate: [-11, 8, -11], y: [0, -9, 0] }}
                  transition={{ repeat: Infinity, duration: 8.5, ease: 'easeInOut' }}
                >
                  <div className="relative w-[90px] rotate-[-11deg] rounded-sm bg-white p-1.5 pb-5 shadow-2xl ring-1 ring-sky-100">
                    <div
                      className="w-full aspect-square rounded-[2px] overflow-hidden"
                      style={{
                        backgroundImage: `url(${new URL('../../teddy-7.jpg', import.meta.url).href})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <p className="font-hand absolute bottom-0.5 left-0 w-full text-center text-[10px] text-sky-500">
                      bangaram 💙
                    </p>
                  </div>
                </motion.div>

                <div
                  className="letter-paper relative overflow-hidden rounded-lg border border-rose-100 p-8 pt-10 pl-12 shadow-2xl sm:p-10 sm:pl-14"
                  style={{
                    boxShadow:
                      'inset 80px 0 0 -70px rgba(255, 100, 100, 0.35), 0 20px 40px rgba(0,0,0,0.12)',
                  }}
                >
                  {/* hole punch edge */}
                  <div className="absolute top-0 left-0 flex h-full w-8 flex-col justify-around py-8">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="mx-auto h-4 w-4 rounded-full bg-rose-100/80 shadow-inner"
                      />
                    ))}
                  </div>

                  {/* tiny teddy peeking inside top-right of paper */}
                  <div className="absolute top-3 right-16 sm:right-20 text-3xl opacity-80 pointer-events-none">
                    🧸
                  </div>
                  {/* tiny heart pin on left margin */}
                  <div className="absolute left-10 top-28 sm:left-12 sm:top-32 text-2xl pointer-events-none">
                    💗
                  </div>
                  {/* star sparkle mid-left */}
                  <div className="absolute left-10 bottom-48 sm:left-12 sm:bottom-56 text-2xl pointer-events-none">
                    <span className="inline-block anim-corner-c">✨</span>
                  </div>

                  <motion.span
                    className="absolute right-4 bottom-4 text-5xl"
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                  >
                    👫
                  </motion.span>

                  <div className="font-hand space-y-5 text-xl leading-relaxed text-gray-800 sm:text-2xl">
                    <p>
                      <span className="highlight-pink">Happy Birthday Ra Potti Bangaram 🎂💖</span>
                    </p>

                    <p>
                      Nuvvemo ekkado dooram ga untunnav 🥺, naakemo{' '}
                      <span className="highlight-yellow">ninnu kalavali ani undi ra</span> ✨…
                      Naak telsu ivanni neeku chusaka koopam ravocchu ani,{' '}
                      <span className="highlight-pink">kani naa valla kavatlede</span> 💔.
                    </p>

                    <p>
                      Naaku nee meeda{' '}
                      <span className="highlight-yellow">
                        bhoomi meeda evaru pettalenantha prema unde
                      </span>{' '}
                      🌍❤️. <span className="highlight-pink">Naa praanam eh nuvvu</span> 🫀.
                      Nuvv edaina anuko, naa mottham nuvve unnavu 🥹.
                      <span className="highlight-yellow"> Nuv lekunda naa life eh ledu</span> 🌌.
                    </p>

                    <p>
                      Enni rojulu ayina wait chestha ⏳, rojule kaadhu neekosam{' '}
                      <span className="highlight-pink">enni yrs ayina wait chesthane kanna</span> 🤞💕.
                    </p>

                    <p>
                      Asalu neekem chepthe naa prema ardam avthado telidu 🤷‍♂️, kani{' '}
                      <span className="highlight-yellow">
                        ninnu nee life lo nenu preminche antha ekkuvaga evvadu preminchaledu
                      </span>
                      , adi mathram nenu cheppagalanu confirm ga 💯✅.
                    </p>

                    <p>
                      Naa chaala istamaina quality ento telsa ra? 💕{' '}
                      <span className="highlight-pink">Anni istame</span> 🥰, neelo emi negatives eh leve ✨.
                      Entho chinna pillalaga chesthav 🥺, naa bangaram la pedda pedda kallatho bale choosthavu 👀💗.
                    </p>

                    <p>
                      <span className="highlight-yellow">
                        Nee kallalloki choosthene ekkada leni aanandham vasthadi
                      </span>{' '}
                      🌈✨, <span className="highlight-pink">nee chethulu pattukuntene ekkada leni aanandham vasthadi</span> 🤝💖.
                    </p>

                    <p>
                      Naak telsu sarigga lev mana relation ani 😔, i just did all these to let you know that{' '}
                      <span className="highlight-yellow">i love you forever</span> 💘.
                      Em jarigina <span className="highlight-pink">i will be there for you</span>,
                      i will always be there for you 🛡️🤗.
                    </p>

                    <p>
                      Chaala efforts petti chesa kanna 💪, neeku nacchindi ani aasistunna 🙏✨.
                      <span className="highlight-yellow"> I love you soo much kanna.. </span>💕😭
                    </p>

                    <p>
                      Nee life lo nuv em anukunte adi jaragali ani aa devudni baaga korukunta 🙏🌟,
                      nee life lo neeku elanti lotu lekunda chuskunta 🫂.{' '}
                      <span className="highlight-pink">U r always my first priority bujji… </span>🥇💗
                    </p>

                    <p>
                      <span className="highlight-yellow">I love you soo much</span> 💖,
                      once again <span className="highlight-pink">happy birthday bujji</span> 🎉🎂,
                      have a great yr ahead ra kanna 🌈✨🎊
                    </p>

                    <div className="mt-8 pt-6 border-t-2 border-dashed border-rose-200">
                      <p className="text-center">
                        <span className="highlight-yellow">With all my love, always and forever</span> 💕💫
                      </p>
                      <p className="mt-2 text-center text-3xl tracking-wider">
                        💖✨🌹🕊️💫🎀💝🌟💘💞
                      </p>
                      <p className="mt-3 text-right text-rose-500">
                        — Your Bangaram 🥹👫💕
                      </p>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="pointer-events-none absolute -top-4 -right-2 text-4xl"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ delay: 0.3 }}
                >
                  ✨
                </motion.div>
              </motion.div>
            </AnimatePresence>
          )}
        </ScrollReveal>
      </div>
    </section>
  )
}
