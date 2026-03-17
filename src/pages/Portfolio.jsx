import { useState, useEffect, useRef } from 'react'
import styles from './Portfolio.module.css'
import Seo from '../components/Seo'

const categories = ['전체', '이러닝 이북', '이러닝 디지털 콘텐츠', '일러스트', '애니메이션', '캐릭터']

// ✅ checkImageExists를 맨 위로!
const checkImageExists = (src) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(true)
    img.onerror = () => resolve(false)
    img.src = src
  })
}

const PortfolioCard = ({ item, onClick }) => (
  <div className={styles.card} onClick={() => onClick(item)}>
    <div className={styles.cardThumb}>
      <img
        src={`/images/portfolio/${item.folder}/img1.png`}
        alt={item.title}
      />
    </div>
    <p className={styles.cardTitle}>{item.title}</p>
  </div>
)

const CategorySection = ({ category, items, onItemClick, expanded, onToggle }) => {
  const displayItems = expanded ? items : items.slice(0, 3)

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>{category}</h2>
        {items.length > 3 && (
          <button className={styles.moreBtn} onClick={() => onToggle(category)}>
            {expanded ? '접기 ∧' : '더보기 >'}
          </button>
        )}
      </div>
      <div className={styles.cardGrid}>
        {displayItems.map(item => (
          <PortfolioCard key={item.id} item={item} onClick={onItemClick} />
        ))}
      </div>
    </div>
  )
}

const DetailImages = ({ folder, title }) => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const folderRef = useRef(folder)

  useEffect(() => {
    folderRef.current = folder

    const loadImages = async () => {
      const validImages = []

      for (let i = 1; i <= 100; i++) {
        if (folderRef.current !== folder) break

        const src = `/images/portfolio/${folder}/img${i}.png`
        const exists = await checkImageExists(src)

        if (exists) {
          validImages.push(src)
        } else {
          break
        }
      }

      if (folderRef.current === folder) {
        setImages(validImages)
        setLoading(false)
      }
    }

    setTimeout(() => {
      setImages([])
      setLoading(true)
      loadImages()
    }, 0)

  }, [folder])

  return (
    <div className={styles.detailImages}>
      {loading && <p className={styles.loadingText}>이미지 불러오는 중...</p>}
      {images.map((img, idx) => (
        <img key={idx} src={img} alt={`${title} ${idx + 1}`} className={styles.detailImg} />
      ))}
    </div>
  )
}

const DetailView = ({ item, onBack }) => {
  const isAnimationOrCharacter = item.categoryKey === 'animation' || item.categoryKey === 'character'

  const getMeta = () => {
    if (isAnimationOrCharacter) {
      return [
        { label: '프로젝트 기간', value: item.duration },
        { label: '수량', value: item.quantity },
        { label: '형식', value: item.format },
      ]
    }
    return [
      { label: '프로젝트 기간', value: item.duration },
      { label: '제작 환경', value: item.environment },
      { label: '형식', value: item.format },
    ]
  }

  return (
    <div className={styles.detail}>
      <div className={styles.detailHeader}>
        <button className={styles.backBtn} onClick={onBack}>
          ← 목록으로
        </button>
        <div className={styles.detailTitleWrap}>
          <h2 className={styles.detailTitle}>{item.title}</h2>
          {item.year && <span className={styles.detailYear}>{item.year}</span>}
        </div>
        <div className={styles.detailMeta}>
          {getMeta().map((meta) =>
            meta.value ? (
              <div key={meta.label} className={styles.detailMetaItem}>
                <span className={styles.detailMetaLabel}>{meta.label}</span>
                <span className={styles.detailMetaValue}>{meta.value}</span>
              </div>
            ) : null
          )}
        </div>
        <div className={styles.detailDivider} />
      </div>
      <DetailImages folder={item.folder} title={item.title} />
    </div>
  )
}

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState([])
  const [activeCategory, setActiveCategory] = useState('전체')
  const [selectedItem, setSelectedItem] = useState(null)
  const [expandedCategories, setExpandedCategories] = useState({})

  useEffect(() => {
    fetch('/data/portfolio.json')
      .then(res => res.json())
      .then(data => setPortfolioData(data))
      .catch(err => console.error('포트폴리오 데이터 로드 실패:', err))
  }, [])

  const filteredData = activeCategory === '전체'
    ? portfolioData
    : portfolioData.filter(item => item.category === activeCategory)

  const groupedData = categories.slice(1).reduce((acc, cat) => {
    const items = portfolioData.filter(item => item.category === cat)
    if (items.length > 0) acc[cat] = items
    return acc
  }, {})

  const handleItemClick = (item) => {
    setSelectedItem(item)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const toggleExpand = (category) => {
    setExpandedCategories(prev => ({ ...prev, [category]: !prev[category] }))
  }

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat)
    setSelectedItem(null)
    setExpandedCategories({})
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const handleBack = () => {
    setSelectedItem(null)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div>
      <Seo
        title="포트폴리오"
        description="젤리피쉬월드의 다양한 교육 콘텐츠 포트폴리오를 확인해보세요."
      />

      <section className={styles.hero}>
        <img src="/images/portfolio_bg.png" alt="" className={styles.heroBg} />
        <h1 className={styles.heroTitle}>포트폴리오</h1>
      </section>

      <div className={styles.tabWrap}>
        <div className={styles.tabList}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`${styles.tabBtn} ${activeCategory === cat ? styles.tabBtnActive : ''} ${cat === '전체' ? styles.tabBtnSmall : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className={styles.tabLine} />
      </div>

      <div className={styles.content}>
        {selectedItem ? (
          <DetailView item={selectedItem} onBack={handleBack} />
        ) : activeCategory === '전체' ? (
          <div className={styles.allView}>
            {Object.entries(groupedData).map(([cat, items]) => (
              <CategorySection
                key={cat}
                category={cat}
                items={items}
                onItemClick={handleItemClick}
                expanded={expandedCategories[cat] || false}
                onToggle={toggleExpand}
              />
            ))}
          </div>
        ) : (
          <div className={styles.categoryView}>
            <div className={styles.cardGrid}>
              {filteredData.map(item => (
                <PortfolioCard key={item.id} item={item} onClick={handleItemClick} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Portfolio