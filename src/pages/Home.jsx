import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import Seo from '../components/Seo'

const slides = [
  {
    bg: 'radial-gradient(circle at 70% 0%, #FFEEEFB2 0%, #ffffff 55%)',
    titleColor: '#69313B',
    descColor: '#F54E6B',
    btnBg: '#FF7F89',
    img: '/images/character_pink.webp',
  },
  {
    bg: 'radial-gradient(circle at 70% 0%, #EDFDC2B2 0%, #ffffff 55%)',
    titleColor: '#396B11',
    descColor: '#4E9110',
    btnBg: '#3F7E00',
    img: '/images/character_green.webp',
  },
  {
    bg: 'radial-gradient(circle at 70% 0%, #FFEEB499 0%, #ffffff 55%)',
    titleColor: '#743304',
    descColor: '#A95010',
    btnBg: '#FF9215',
    img: '/images/character_orange.webp',
  },
  {
    bg: 'radial-gradient(circle at 70% 0%, #51E1FF 0%, #ffffff 55%)',
    titleColor: '#014966',
    descColor: '#006086',
    btnBg: '#0087A4',
    img: '/images/character_blue.webp',
  },
]

const Home = () => {
  const [current, setCurrent] = useState(0)
  const [fade, setFade] = useState(true)
  const [displaySlide, setDisplaySlide] = useState(slides[0])
  const timerRef = useRef(null)

  const goNext = useCallback((getNext) => {
    setFade(false)
    setTimeout(() => {
      setCurrent((prev) => {
        const next = typeof getNext === 'function' ? getNext(prev) : getNext
        setDisplaySlide(slides[next])
        return next
      })
      setFade(true)
    }, 400)
  }, [])

  // 타이머 시작 함수
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      goNext((prev) => (prev + 1) % slides.length)
    }, 3000)
  }, [goNext])

  // 마운트시 타이머 시작
  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  // 도트 클릭시 타이머 리셋
  const handleDotClick = (idx) => {
    if (idx === current) return
    goNext(idx)
    startTimer()
  }

  return (
    <div>
      <Seo
        title="홈"
        description="젤리피쉬월드는 디지털교과서, 이러닝, 애니메이션, 일러스트 등 다양한 교육 콘텐츠를 제작하는 전문 회사입니다."
      />

      <section
        className={styles.hero}
        style={{ background: displaySlide.bg }}
      >
        <div className={`${styles.bubble} ${styles.bubble1}`} />
        <div className={`${styles.bubble} ${styles.bubble2}`} />
        <div className={`${styles.bubble} ${styles.bubble3}`} />
        <div className={`${styles.bubble} ${styles.bubble4}`} />

        <div className={`${styles.content} ${fade ? styles.fadeIn : styles.fadeOut}`}>
          <div className={styles.heroLeft}>
            <h1 className={styles.heroTitle} style={{ color: displaySlide.titleColor }}>
              이야기를 만들고<br />
              미래를 디자인해요.
            </h1>
            <p className={styles.heroDesc} style={{ color: displaySlide.descColor }}>
              젤리피쉬월드는 이야기를 만들고<br />
              기술을 바탕으로 애니메이션부터 디지털 콘텐츠까지<br />
              다양하고 크리에이티브한 경험을 만들어드려요.
            </p>
            <Link
              to="/portfolio"
              className={styles.heroBtn}
              style={{ backgroundColor: displaySlide.btnBg }}
            >
              포트폴리오 보러가기 &gt;
            </Link>
          </div>

          <div className={styles.heroRight}>
            <img
              src={displaySlide.img}
              alt="캐릭터"
              className={styles.character}
            />
          </div>
        </div>

        <div className={styles.indicators}>
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`${styles.dot} ${idx === current ? styles.dotActive : ''}`}
              style={idx === current ? { backgroundColor: displaySlide.btnBg } : {}}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home