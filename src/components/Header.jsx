import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Header.module.css'

const navItems = [
  { path: '/about', label: '회사 이야기' },
  { path: '/portfolio', label: '포트폴리오' },
  { path: '/contact', label: '문의' },
]

// ✅ 스크롤 초기화 함수
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'instant' })
}

const Header = () => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  const closeMenu = () => {
    setMenuOpen(false)
    scrollToTop()  // ← 모바일 메뉴 닫을 때도 스크롤 초기화
  }

  const handleNavClick = () => {
    setMenuOpen(false)
    scrollToTop()  // ← 메뉴 클릭시 스크롤 초기화
  }

  return (
    <header className={styles.header}>
      {/* 로고 - 클릭시 스크롤 초기화 */}
      <Link to="/" className={styles.logo} onClick={scrollToTop}>
        <img src="/images/logo.webp" alt="젤리피쉬월드" className={styles.logoImg} />
      </Link>

      {/* 데스크탑 네비게이션 */}
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.navLink} ${location.pathname === item.path ? styles.navLinkActive : ''}`}
            onClick={scrollToTop}  // ← 클릭시 스크롤 초기화
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* 햄버거 버튼 */}
      <button
        className={styles.hamburger}
        onClick={toggleMenu}
        aria-label="메뉴"
      >
        <span className={`${styles.bar} ${menuOpen ? styles.bar1Open : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.bar2Open : ''}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.bar3Open : ''}`} />
      </button>

      {/* 모바일 메뉴 */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${styles.mobileNavLink} ${location.pathname === item.path ? styles.mobileNavLinkActive : ''}`}
            onClick={handleNavClick}  // ← 클릭시 메뉴 닫고 스크롤 초기화
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* 모바일 오버레이 */}
      {menuOpen && (
        <div className={styles.overlay} onClick={closeMenu} />
      )}
    </header>
  )
}

export default Header