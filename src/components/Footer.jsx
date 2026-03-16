import styles from './Footer.module.css'

const logoImg = "/images/footer_logo.png"
const bgImg = "/images/footer_bg.png"
const characterImg = "/images/footer_character.png"

const infoItems = [
  { label: '주소', value: '(06302) 서울 강남구 논현로24길 17, 2층' },
  { label: '전화번호', value: '02-523-1282' },
  { label: '대표메일', value: 'jellyfish@jellyfish-world.com' },
  { label: '사업등록번호', value: '220-88-08657' },
]

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={bgImg} alt="" className={styles.bg} />
      <img src={characterImg} alt="" className={styles.character} />

      <div className={styles.content}>
        <div className={styles.logoWrap}>
          <img src={logoImg} alt="젤리피쉬월드" className={styles.logoImg} />
        </div>

        <div className={styles.links}>
          <a href="#" className={styles.link}>개인정보처리방침</a>
          <a href="#" className={styles.link}>이용약관</a>
        </div>

        <div className={styles.infoList}>
          {infoItems.map((item) => (
            <div key={item.label} className={styles.infoItem}>
              <span className={styles.infoLabel}>{item.label}</span>
              <span className={styles.infoValue}>{item.value}</span>
            </div>
          ))}
        </div>

        <p className={styles.copyright}>© 2010 JELLYFISH WORLD. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  )
}

export default Footer