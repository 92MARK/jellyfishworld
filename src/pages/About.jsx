import { useState, useEffect, useRef, forwardRef } from 'react'
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
      '젤리피쉬월드 설립',
      '이러닝 콘텐츠 개발 시작',
      '첫 교육부 프로젝트 수주',
      '모바일 콘텐츠 사업 시작',
      '주요 교육 출판사와 협력',
    ]
  },
  {
    period: '2013 - 2015',
    items: [
      'E-BOOK 플랫폼 개발',
      '애니메이션 사업부 신설',
      '국정교과서 삽화 제작',
      '모바일 게임 출시',
      '해외 수출 시작',
    ]
  },
  {
    period: '2016 - 2018',
    items: [
      '디지털교과서 사업 확장',
      '캐릭터 디자인팀 신설',
      'TV 애니메이션 제작',
      'CF/홍보영상 제작',
      '파트너사 50개 돌파',
    ]
  },
  {
    period: '2019 - 2021',
    items: [
      '온라인 콘텐츠 플랫폼 런칭',
      'HTML5 게임 개발',
      '비상/지학사 등 대형 출판사 협력',
      '코로나 대응 이러닝 콘텐츠 제작',
      '캐릭터 라이선싱 사업 확대',
    ]
  },
  {
    period: '2022',
    items: [
      '22개정 교육과정 대응',
      '디지털교과서 대규모 수주',
      '아이스크림미디어 협력',
      '국립특수교육원 프로젝트',
    ]
  },
  {
    period: '2023',
    items: [
      '2D 애니메이션 시리즈 제작',
      '교원그룹 리틀키즈 협력',
      '미래엔 디지털 콘텐츠 제작',
      '일러스트 QR 콘텐츠 개발',
    ]
  },
  {
    period: '2024',
    items: [
      '홈페이지 리뉴얼',
      '포트폴리오 플랫폼 구축',
      '새로운 캐릭터 IP 개발',
      'AI 기반 콘텐츠 연구 시작',
    ]
  },
  {
    period: '2025',
    items: [
      '차세대 디지털교과서 개발',
      '글로벌 파트너십 확대',
      '새로운 서비스 런칭 예정',
    ]
  },
]

// 고객사 로고 데이터
const clientLogos = [
  { img: '/images/clients/visang.png', name: '비상교육' },
  { img: '/images/clients/chunjae.png', name: '천재교육' },
  { img: '/images/clients/jihaksa.png', name: '지학사' },
  { img: '/images/clients/miraen.png', name: '미래엔' },
  { img: '/images/clients/wink.png', name: 'Wink' },
  { img: '/images/clients/iscream.png', name: 'i-Scream' },
  { img: '/images/clients/chunjae2.png', name: '천재교과서' },
  { img: '/images/clients/pinkfong.png', name: '핑크퐁' },
  { img: '/images/clients/goodnavers.png', name: '구네이버스' },
  { img: '/images/clients/redpen.png', name: '빨간펜' },
  { img: '/images/clients/cong.png', name: '콩' },
  { img: '/images/clients/hansol.png', name: '한솔교육' },
]

// 3줄 모두 전체 로고 - 줄마다 시작 순서 다르게
const clientRows = [
  [...clientLogos],
  [...clientLogos.slice(5), ...clientLogos.slice(0, 5)],
  [...clientLogos.slice(8), ...clientLogos.slice(0, 8)],
]

// 연혁 아이템 컴포넌트
const HistoryItem = forwardRef(({ period, items, fixedHeight }, ref) => {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`${styles.historyItem} ${hovered ? styles.historyItemHovered : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.historyPeriod}>{period}</div>
      <div className={styles.historyDot} />

      {/* 영역은 항상 최대 높이로 고정 */}
      <div
        className={styles.historyContentWrap}
        style={{ height: fixedHeight > 0 ? `${fixedHeight}px` : 'auto' }}
      >
        {/* 콘텐츠 박스 - ref로 높이 측정 */}
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
  const contentRefs = useRef([])

  // 마운트 후 모든 콘텐츠 높이 측정해서 최대값 고정
  useEffect(() => {
    // requestAnimationFrame으로 DOM 렌더링 완료 후 측정
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

        const options = {
          center: coords,
          level: 3,
        }
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
      <Seo
        title="회사 이야기"
        description="2008년 설립된 젤리피쉬월드의 이야기를 소개합니다."
      />

      {/* 히어로 */}
      <section className={styles.hero}>
        <img src="/images/about_bg.png" alt="" className={styles.heroBg} />
        <h1 className={styles.heroTitle}>회사 이야기</h1>
      </section>

      {/* 우리는 이런 일을 해요 */}
      <section className={styles.serviceSection}>
        <h2 className={styles.sectionTitle}>우리는 이런 일을 해요.</h2>
        <p className={styles.sectionDesc}>
          이러닝부터 게임까지 폭넓게 각 분야의 최고 전문가와 함께
          <br />
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
        <div className={styles.historyWrap}>
          <div className={styles.historyLine} />
          <div className={styles.historyList}>
            {history.map((h, idx) => (
              <HistoryItem
                key={h.period}
                period={h.period}
                items={h.items}
                fixedHeight={fixedHeight}
                ref={(el) => {
                  contentRefs.current[idx] = el;
                }}
              />
            ))}
          </div>
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
          (06302) 서울 강남구 논현로24길 17, 2층 (주)젤리피쉬월드
          <br />
          (지하철 3호선 4번 출구 700m)
        </p>
        <div id="kakao-map" className={styles.map} />
      </section>
    </div>
  );
}

export default About