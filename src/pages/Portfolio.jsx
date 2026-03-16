import { useState } from 'react'
import styles from './Portfolio.module.css'
import Seo from '../components/Seo'

const imgBg = "https://www.figma.com/api/mcp/asset/a6dc6dab-0df1-4e91-863d-9f9550012932"

const categories = ['전체', '이러닝 이북', '이러닝 디지털 콘텐츠', '일러스트', '애니메이션', '캐릭터']

const portfolioData = [
  {
    category: '이러닝 이북',
    items: [
      { img: "https://www.figma.com/api/mcp/asset/ee2cc272-8612-4a49-b747-862b7bc0e1d0", title: '국립특수교육원 22개정 국정 교과 초등학교 과학 5·6학년' },
      { img: "https://www.figma.com/api/mcp/asset/9884f73e-38c6-416c-845f-ce9cbd9681ac", title: '지학사 중학교 2학년 영어' },
      { img: "https://www.figma.com/api/mcp/asset/4e0b03e8-d5ac-404a-a1a9-5556787a0374", title: '아이스크림 미디어 수학 3·4학년' },
    ]
  },
  {
    category: '이러닝 디지털 콘텐츠',
    items: [
      { img: "https://www.figma.com/api/mcp/asset/7e5cb6ba-c7dc-416d-b790-5e06cdce008d", title: '비상 온리원 22개정 6학년 국어 1학기 진도' },
      { img: "https://www.figma.com/api/mcp/asset/63446232-8259-4f12-9a07-78a629ca227f", title: '비상 온리원 22개정 5·6학년 사회 1학기 진도' },
      { img: "https://www.figma.com/api/mcp/asset/d935150c-d38b-42fd-a886-6c6b3c1ce735", title: '비상 온리원 22개정 5학년 영어 1학기 진도' },
    ]
  },
  {
    category: '일러스트',
    items: [
      { img: "https://www.figma.com/api/mcp/asset/fb678a2d-5f41-4f4c-bc86-06cbd3f6c37b", title: '국립특수교육원 22개정 국정 초등학교 5·6학년 과학 교과서 삽화' },
      { img: "https://www.figma.com/api/mcp/asset/dfb49ffc-8e0a-47b4-8d88-436d83aa5073", title: '아이스크림 과학 5·6학년 QR' },
      { img: "https://www.figma.com/api/mcp/asset/0288be27-a643-4bc5-9fe0-6f38c107b553", title: '국립특수교육원 22개정 국정 교과 중등·고등 정보 통신' },
    ]
  },
  {
    category: '애니메이션',
    items: [
      { img: "https://www.figma.com/api/mcp/asset/0847ee97-f03c-40e1-82b2-909741ef1c36", title: '비상 영어 5·6학년 Chant & Song' },
      { img: "https://www.figma.com/api/mcp/asset/8586a0fe-62d9-4495-9e09-4ab6c05d72da", title: '교원 리틀키즈 2D 시리즈' },
      { img: "https://www.figma.com/api/mcp/asset/1600495a-d34a-4897-ae31-1537531d541a", title: '교원 도요새 중국어 시리즈' },
    ]
  },
  {
    category: '캐릭터',
    items: [
      { img: "https://www.figma.com/api/mcp/asset/afe54c8c-34ea-45a4-b28f-64cc1e265f19", title: '비상 "영어 교사 자료 SONG, CHANT 애니메이션" 캐릭터' },
      { img: "https://www.figma.com/api/mcp/asset/16aa5c41-f29d-4d31-acb5-3823fe354b0f", title: '교원 "리틀 키즈 2D 애니메이션" 캐릭터' },
      { img: "https://www.figma.com/api/mcp/asset/e284f332-d88e-4029-85e8-75365f9d2b71", title: '미래엔 디지털 초코 "리스닝 & 스피킹 애니메이션" 캐릭터' },
    ]
  },
]

const PortfolioCard = ({ img, title }) => (
  <div className={styles.card}>
    <div className={styles.cardThumb}>
      <img src={img} alt={title} />
    </div>
    <p className={styles.cardTitle}>{title}</p>
  </div>
)

const CategorySection = ({ category, items }) => (
  <div className={styles.section}>
    <div className={styles.sectionHeader}>
      <p className={styles.sectionTitle}>{category}</p>
      <button className={styles.sectionMore} style={{ visibility: 'hidden' }}>더보기 &gt;</button>
    </div>
    <div className={styles.cardList}>
      {items.map((item, idx) => (
        <PortfolioCard key={idx} img={item.img} title={item.title} />
      ))}
    </div>
  </div>
)

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('전체')

  const filteredData = activeCategory === '전체'
    ? portfolioData
    : portfolioData.filter(d => d.category === activeCategory)

  return (
    <div className={styles.wrap}>
      <Seo
        title="포트폴리오"
        description="젤리피쉬월드의 다양한 교육 콘텐츠 포트폴리오를 확인해보세요."
        keywords="교육콘텐츠 포트폴리오, 디지털교과서, 이러닝, 애니메이션"
      />

      {/* 히어로 */}
      <section className={styles.hero}>
        <img src={imgBg} alt="배경" className={styles.heroBg} />
        <p className={styles.heroTitle}>포트폴리오</p>
      </section>

      {/* 탭 */}
      <div className={styles.tabWrap}>
        <div className={styles.tabList}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${styles.tabBtn} ${cat === '전체' ? styles.tabBtnSmall : ''} ${activeCategory === cat ? styles.tabBtnActive : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className={styles.tabLine} />
      </div>

      {/* 목록 */}
      <div className={styles.portfolioList}>
        {filteredData.map((section) => (
          <CategorySection
            key={section.category}
            category={section.category}
            items={section.items}
          />
        ))}
      </div>
    </div>
  )
}

export default Portfolio