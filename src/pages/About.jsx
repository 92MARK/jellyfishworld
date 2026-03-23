import { useState, useEffect, useRef, forwardRef, useCallback } from 'react'
import styles from './About.module.css'
import Seo from '../components/Seo'

// 서비스 데이터
const services = [
  {
    bg: '/images/service_elearning_bg.webp',
    img: '/images/service_elearning.webp',
    title: '이러닝',
    desc: ['웹사이트용 교육 콘텐츠', '교육 콘텐츠(Mobile)', 'E-PUB/ E-BOOK(Mobile)', '교과서 전자책등(USB)'],
    imgStyle: { width: '130px', height: '130px', marginTop: '0px', marginLeft: '0px' }
  },
  {
    bg: '/images/service_illust_bg.webp',
    img: '/images/service_illust.webp',
    title: '일러스트',
    desc: ['교육 콘텐츠 삽화', '교과서 전자책등 삽화', '애니메이션 삽화'],
    imgStyle: { width: '130px', height: '130px', marginTop: '0px', marginLeft: '0px' }
  },
  {
    bg: '/images/service_animation_bg.webp',
    img: '/images/service_animation.webp',
    title: '애니메이션',
    desc: ['TV 시리즈 애니메이션', '극장용 애니메이션', '웹/모바일 애니메이션', 'CF/홍보영상물'],
    imgStyle: { width: '130px', height: '130px', marginTop: '0px', marginLeft: '0px' }
  },
  {
    bg: '/images/service_character_bg.webp',
    img: '/images/service_character.webp',
    title: '캐릭터',
    desc: ['캐릭터 기획·디자인', '캐릭터 라이선싱', '이모티콘 기획·제작', '캐릭터 굿즈'],
    imgStyle: { width: '130px', height: '130px', marginTop: '0px', marginLeft: '0px' }
  },
  {
    bg: '/images/service_game_bg.webp',
    img: '/images/service_game.webp',
    title: '게임',
    desc: ['Mobile JAVA 게임', 'Mobile HTML5 게임', '모바일 앱'],
    imgStyle: { width: '130px', height: '130px', marginTop: '0px', marginLeft: '0px' }
  },
]

// 연혁 데이터
const history = [
  {
    period: '2008 - 2012',
    items: [
      '(주) 젤리피쉬월드 설립',
      'NIIED \'한국어교육\' etc 교재 영어 ver. 제작',
      '천재교육 \'초등 영어 교과서 전자책등\' 제작',
      '동아출판 \'중학 한문 교과서 전자책등\' 제작',
      'MSS \'혁신우수기업\' 수상',
      'MSS \'지식서비스창업활성화유공\'포상',
      '말레이시아 Funcel 그룹 MOU 체결',
      '중국 흥상컴퍼니 애니메이션 공동 제작',
      'KBS 2TV <키오카> 애니메이션 제작',
      '프랑스TV 애니메이션 \'Kind of Magic\' 제작',
      '창작 애니메이션 \'동방의별\' 기획·제작',
    ]
  },
  {
    period: '2013 - 2015',
    items: [
      '서울특별시 \'여성기업상\' 수상',
      'KBIZ \'중소기업상\' 수상',
      'MOEL \'일학습병행제\' 업체 선정',
      '팜팩토리 TV 애니메이션 \'열이벙벙유령대소동\' 파일럿 제작',
      '(주) 천재교육 밀크티 \'초등\' etc 콘텐츠 제작',
      '(주) 교원 \'초등과학\' etc 콘텐츠제작',
      'KODA 홍보 영상 제작',
      'KIBO 벤처기업 인증',
      'EBS 애니메이션 \'쓰담쓰담동물원\' 메인 프로덕션',
      '(주) 와이즈캠프 \'초등국어\' etc 콘텐츠 제작',
      '넥스트스튜디오 TV 애니메이션 \'꾸아꾸아\' 프리프로 제작',
      'NISE \'초등과학, 수학 교과서 전자책등\' 제작',
      'KBS 2TV 애니메이션 \'키오카\' 시즌 2 제작',
      'NIIED \'한국어교육\' 교재 중국어 ver. etc 제작',
      '(주) 미래엔 \'고등영어 교과서 전자책등\' 제작',
      '(주) 동아출판 \'중등영어 교과서 전자책등\' 제작',
    ]
  },
  {
    period: '2016 - 2018',
    items: [
      '(주) 천재교육 \'초등 미술, 중등 도덕, 고등 일본어, 중국어 교과서 전자책등\' 제작',
      '(주) 미래엔 \'중등 영어, 중등 중국어 교과서 전자책등\' 제작',
      '(주) 윤선생 \'Jungle Beat\' 애니메이션 콘텐츠 제작',
      '(주) 단비교육 \'윙크 수학\' 애니메이션 콘텐츠 제작',
      '(주) 핑크퐁 \'공주동화\' 애니메이션 콘텐츠 제작',
      'NISE \'초등 수학,국어 교과서 전자책등\' 제작',
      '(주) 스템에듀 유아/초등 etc 콘텐츠 제작',
      'TIPA \'여성창업활성화 과제\' 수행',
      '(주) 비상교육 \'국정초등과학\' etc 게임 제작',
    ]
  },
  {
    period: '2019 - 2021',
    items: [
      'KIRD \'과학기술 연구개발관리 총론\' etc 디지털북 제작',
      'KOCCA 캐릭터 개발 \'비바정글\' etc 지원사업 수행',
      '(주) 와이즈캠프 \'초등 국어\' etc 콘텐츠 제작',
      '(주) 굿네이버스 \'학교 폭력 예방\' 애니메이션 콘텐츠 제작',
      '(주) 비상교육 \'초등 교사자료\' 애니메이션 콘텐츠 제작',
      '(주) 비상M러닝 \'초등 국어\', \'도서관\', \'누리와캠\' etc 콘텐츠 제작',
      '(주) 천재교육 \'국어, 고등 영어, 일본어, 중국어, 도덕\', etc 전자책등 제작',
      '(주) 윤선생 \'Yoon\'s Grammar Advanced\' 애니메이션 콘텐츠 제작',
      '(주) 아이스크림 15개정 초등 수학 3~6학년 교과서 전자책등\' 제작',
      '(주) 금성출판사 프리스쿨 콘텐츠 제작',
      '(주) 미래엔 \'사이트 워드\' 애니메이션 콘텐츠 제작',
      '(주) 교원 \'도요새\' 애니메이션 콘텐츠 제작',
      '교원 \'2D, 유아 English\' 애니메이션 콘텐츠 제작',
    ]
  },
  {
    period: '2022',
    items: [
      '(주) 교원 \'2D, 그림자 극장 4종\' 애니메이션 콘텐츠 제작',
      '(주) 교원 \'2D, 출동또롱이탐정\' 애니메이션 콘텐츠 제작',
      '(주) 교원 \'2D, AIREDPEN 초등 (국, 수, 사, 과)\' 애니메이션 콘텐츠 제작',
      '(주) 교원 \'2D, 뿌뿌까오 중국어\', \'중국어 문법\' 애니메이션 콘텐츠 제작',
      '(주) 천재 해법 \'송, 찬트\' 애니메이션 콘텐츠 제작',
      '(주) 한솔_S-TF 프로토 HTML5 콘텐츠 제작',
      '(주) 굿네이버스 교육 영상 4종 제작',
      '(주) 비상 \'글빼 도서관\' etc 콘텐츠 제작',
      '(주) 윤선생 \'Yoon\'s Step Up Reading\' 애니메이션 콘텐츠 제작',
    ]
  },
  {
    period: '2023',
    items: [
      '(주) 비상 \'받아쓰기\' etc 콘텐츠 제작',
      '(주) 비상 \'메타카드 2종\' etc 콘텐츠 제작',
      '(주) 비상 \'두두 잉글리시 그래머\' 애니메이션 콘텐츠 제작',
      '(주) 비상 \'두두 잉글리시 리스닝\' 애니메이션 콘텐츠 제작',
      '(주) 미래엔 \'초코팝 영어\' etc 콘텐츠 제작',
      '(주) 윤선생 \'My Friend Toby!\' 애니메이션 콘텐츠 제작',
      '(주) 교원 \'꼬잉꼬잉 북시네마\' 애니메이션 콘텐츠 제작',
      '(주) 아이스크림미디어 \'초등수학 3-4 교과서 전자책등\' 제작',
      '(주) 천재교과서 \'중등 생활 일본어 교과서 전자책등\' 제작',
      '(주) 미래엔 \'초등 영어 3-4 교과서 전자책등\' 제작',
    ]
  },
  {
    period: '2024',
    items: [
      '(주) 비상 \'국어 진도 1-2\' etc 콘텐츠 제작',
      '(주) 비상 \'두두 잉글리시 AI 스픽온 초급\' etc 콘텐츠 제작',
      '(주) 천재교과서 \'중등 도덕1,2 교과서 전자책등\' 제작',
      '(주) 지학사 \'중1 영어 교과서 전자책등\' 제작',
      '(주) 교원 \'2D 도요새 중국어 워드스토리\' 애니메이션 콘텐츠 제작',
      '(주) 교원 \'2D 리틀키즈영어\' 애니메이션 콘텐츠 제작',
      '(주) 아이스크림미디어 \'초등수학 5-6 교과서 전자책등\' 제작',
      '(주) 비상 \'초등 교사자료\' 애니메이션 콘텐츠 제작',
    ]
  },
  {
    period: '2025',
    items: [
      '(주) 비상 \'국어 진도 3-4\' etc 콘텐츠 제작',
      '(주) 비상 \'영어 진도 3-4\' etc 콘텐츠 제작',
      '(주) 아이스크림미디어 \'초등수학, 과학, 영어, 실과 QR 콘텐츠 제작',
      '(주) 지학사 \'AI디지털교과서 중1 영어\' etc 콘텐츠 제작',
      '(주) 지학사 \'중2 영어 교과서 전자책등\' 제작',
      '(주) 비상 \'두두 잉글리시 AI 스픽온 중급\' etc 콘텐츠 제작',
      '(주) 비상 \'맞춤법 바로쓰기\' etc 콘텐츠 제작',
      '국립특수교육원 특수교과 \'초등 과학5-6\' 삽화, 전자책등 제작',
      '(주) 비상 \'초등, 중등 교사자료\' 애니메이션 콘텐츠 제작',
    ]
  },
]

// 고객사 로고 데이터
const clientLogos = [
  { img: '/images/clients/visang.webp', name: '비상교육' },
  { img: '/images/clients/chunjae.webp', name: '천재교육' },
  { img: '/images/clients/jihaksa.webp', name: '지학사' },
  { img: '/images/clients/miraen.webp', name: '미래엔' },
  { img: '/images/clients/wink.webp', name: 'Wink' },
  { img: '/images/clients/iscream.webp', name: 'i-Scream' },
  { img: '/images/clients/chunjae2.webp', name: '천재교과서' },
  { img: '/images/clients/pinkfong.webp', name: '핑크퐁' },
  { img: '/images/clients/goodnavers.webp', name: '구네이버스' },
  { img: '/images/clients/redpen.webp', name: '빨간펜' },
  { img: '/images/clients/cong.webp', name: '콩' },
  { img: '/images/clients/hansol.webp', name: '한솔교육' },
]

// 3줄 모두 전체 로고 - 줄마다 시작 순서 다르게
const clientRows = [
  [...clientLogos],
  [...clientLogos.slice(5), ...clientLogos.slice(0, 5)],
  [...clientLogos.slice(8), ...clientLogos.slice(0, 8)],
]

// 화면 크기 감지 훅 삭제 - CSS로만 제어

// 데스크탑 연혁 아이템
const HistoryItem = forwardRef(({ period, items, fixedHeight, isActive, onHover, onLeave }, ref) => {
  const hovered = isActive

  return (
    <div
      className={`${styles.historyItem} ${hovered ? styles.historyItemHovered : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={styles.historyPeriod}>{period}</div>
      <div className={styles.historyDot} />
      <div
        className={styles.historyContentWrap}
        style={{ height: fixedHeight > 0 ? `${fixedHeight}px` : 'auto' }}
      >
        <div
          ref={ref}
          className={`${styles.historyContent} ${hovered ? styles.historyContentVisible : ''}`}
        >
          {items.map((item, idx) => (
            <p key={idx} className={styles.historyContentItem}>· {item}</p>
          ))}
        </div>
      </div>
    </div>
  )
})
HistoryItem.displayName = 'HistoryItem'

// 모바일 아코디언 아이템 - openIdx로 제어
const HistoryItemMobile = ({ period, items, isOpen, onToggle }) => {
  return (
    <div className={`${styles.historyItemMobile} ${isOpen ? styles.historyItemMobileOpen : ''}`}>
      <button className={styles.historyMobileHeader} onClick={onToggle}>
        <span className={styles.historyMobilePeriod}>{period}</span>
        <span className={`${styles.historyMobileArrow} ${isOpen ? styles.historyMobileArrowOpen : ''}`}>▾</span>
      </button>
      <div className={`${styles.historyMobileContent} ${isOpen ? styles.historyMobileContentOpen : ''}`}>
        <ul className={styles.historyMobileList}>
          {items.map((item, idx) => (
            <li key={idx} className={styles.historyMobileItem}>· {item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// 고객사 슬라이드 행 컴포넌트
const ClientRow = ({ logos, reverse }) => {
  const repeatedLogos = [...logos, ...logos, ...logos, ...logos]

  return (
    <div className={styles.clientRowWrap}>
      <div className={`${styles.clientTrack} ${reverse ? styles.clientTrackReverse : ''}`}>
        {repeatedLogos.map((client, idx) => (
          <div key={idx} className={styles.clientLogo}>
            <img src={client.img} alt={client.name} />
          </div>
        ))}
      </div>
    </div>
  )
}

const About = () => {
  const [fixedHeight, setFixedHeight] = useState(0)
  const [activeIdx, setActiveIdx] = useState(0)
  const [openMobileIdx, setOpenMobileIdx] = useState(null)  // ← 추가!
  const contentRefs = useRef([])
  const timerRef = useRef(null)

  // 자동 순환 타이머
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % history.length)
    }, 2000)
  }, [])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  // 마우스오버시 타이머 멈춤
  const handleHover = (idx) => {
    setActiveIdx(idx)
    if (timerRef.current) clearInterval(timerRef.current)
  }

  // 마우스리브시 타이머 재시작
  const handleLeave = () => {
    startTimer()
  }

  // 마운트 후 모든 콘텐츠 높이 측정해서 최대값 고정
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      let max = 0
      contentRefs.current.forEach((el) => {
        if (!el) return
        const prevOpacity = el.style.opacity
        const prevTransform = el.style.transform
        const prevVisibility = el.style.visibility
        el.style.opacity = '1'
        el.style.transform = 'none'
        el.style.visibility = 'hidden'
        const h = el.scrollHeight
        el.style.opacity = prevOpacity
        el.style.transform = prevTransform
        el.style.visibility = prevVisibility
        if (h > max) max = h
      })
      if (max > 0) setFixedHeight(max + 32)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  // 카카오맵 초기화
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return
    const container = document.getElementById('kakao-map')
    if (!container) return
    const geocoder = new window.kakao.maps.services.Geocoder()
    geocoder.addressSearch('서울 강남구 논현로24길 17', (result, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x)
        const options = { center: coords, level: 3 }
        const map = new window.kakao.maps.Map(container, options)
        const marker = new window.kakao.maps.Marker({ position: coords })
        marker.setMap(map)
        const infowindow = new window.kakao.maps.InfoWindow({
          content: '<div style="padding:8px 12px;font-size:14px;font-weight:700;">젤리피쉬월드</div>',
        })
        infowindow.open(map, marker)
      }
    })
  }, [])

  return (
    <div>
      <Seo title="회사 이야기" description="2008년 설립된 젤리피쉬월드의 이야기를 소개합니다." />

      {/* 히어로 */}
      <section className={styles.hero}>
        <img src="/images/about_bg.webp" alt="" className={styles.heroBg} />
        <h1 className={styles.heroTitle}>회사 이야기</h1>
      </section>

      {/* 우리는 이런 일을 해요 */}
      <section className={styles.serviceSection}>
        <h2 className={styles.sectionTitle}>우리는 이런 일을 해요.</h2>
        <p className={styles.sectionDesc}>
          이러닝부터 게임까지 폭넓게 각 분야의 최고 전문가와 함께<br />
          완성도 높은 콘텐츠를 제작해요.
        </p>
        <div className={styles.serviceList}>
          {services.map((service) => (
            <div key={service.title} className={styles.serviceItem}>
              <div
                className={styles.serviceImgWrap}
                style={{ backgroundImage: `url(${service.bg})` }}
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className={styles.serviceImg}
                  style={service.imgStyle}
                />
              </div>
              <p className={styles.serviceTitle}>{service.title}</p>
              <div className={styles.serviceDesc}>
                {service.desc.map((d, idx) => (
                  <p key={idx}>{d}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 성장 이야기 (연혁) */}
      <section className={styles.historySection}>
        <h2 className={styles.sectionTitle}>젤리피쉬월드의 성장 이야기</h2>
        <p className={styles.sectionDesc}>
          하나씩 쌓아온 시간들이 경험으로 증명된 성장 과정을 보여 드려요.
        </p>

        {/* 데스크탑: 자동순환 + hover 타임라인 */}
        <div className={styles.historyWrap}>
          <div className={styles.historyLine} />
          <div className={styles.historyList}>
            {history.map((h, idx) => (
              <HistoryItem
                key={h.period}
                period={h.period}
                items={h.items}
                fixedHeight={fixedHeight}
                isActive={activeIdx === idx}
                onHover={() => handleHover(idx)}
                onLeave={handleLeave}
                ref={(el) => { contentRefs.current[idx] = el }}
              />
            ))}
          </div>
        </div>

        {/* 모바일: 아코디언 타임라인 */}
        <div className={styles.historyMobileWrap}>
          {history.map((h, idx) => (
            <HistoryItemMobile
              key={`mob-${h.period}`}
              period={h.period}
              items={h.items}
              isOpen={openMobileIdx === idx}
              onToggle={() => setOpenMobileIdx(prev => prev === idx ? null : idx)}
            />
          ))}
        </div>
      </section>

      {/* 고객사 */}
      <section className={styles.clientSection}>
        <h2 className={styles.sectionTitle}>젤리피쉬월드와 함께해요.</h2>
        <p className={styles.sectionDesc}>
          다양한 파트너사와 함께 교육의 가치를 콘텐츠로 전하고 있어요.
        </p>
        <div className={styles.clientSlider}>
          {clientRows.map((row, idx) => (
            <ClientRow key={idx} logos={row} reverse={idx % 2 === 1} />
          ))}
        </div>
      </section>

      {/* 찾아오시는 길 */}
      <section className={styles.mapSection}>
        <h2 className={styles.sectionTitle}>찾아오시는 길</h2>
        <p className={styles.sectionDesc}>
          (06302) 서울 강남구 논현로24길 17, 2층 (주)젤리피쉬월드<br />
          (지하철 3호선 4번 출구 700m)
        </p>
        <div id="kakao-map" className={styles.map} />
      </section>
    </div>
  )
}

export default About