import { useState } from 'react'
import styles from './Footer.module.css'

const logoImg = "/images/footer_logo.webp"
const bgImg = "/images/footer_bg.webp"
const characterImg = "/images/footer_character.webp"

const infoItems = [
  { label: '주소', value: '(06302) 서울 강남구 논현로24길 17, 2층' },
  { label: '전화번호', value: '02-523-1282' },
  { label: '대표메일', value: 'jellyfish@jellyfish-world.com' },
  { label: '사업등록번호', value: '220-88-08657' },
]

// 개인정보처리방침 내용
const privacyContent = `  제1조(목적)
  (주)젤리피쉬월드(이하 '회사'라고 함)는 회사가 제공하고자 하는 서비스(이하 '회사 서비스')를 이용하는 개인(이하 '이용자' 또는 '개인')의 정보(이하 '개인정보')를 보호하기 위해, 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률(이하 '정보통신망법') 등 관련 법령을 준수하고, 서비스 이용자의 개인정보 보호 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침(이하 '본 방침')을 수립합니다.

  제2조(개인정보 처리의 원칙)
  개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의 개인정보를 수집할 수 있으며 수집된 개인정보는 개인의 동의가 있는 경우에 한해 제3자에게 제공될 수 있습니다. 단, 법령의 규정 등에 의해 적법하게 강제되는 경우 회사는 수집한 이용자의 개인정보를 사전에 개인의 동의 없이 제3자에게 제공할 수도 있습니다.

  제3조(본 방침의 공개)
    1. 회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록 회사 홈페이지 첫 화면 또는 첫 화면과의 연결화면을 통해 본 방침을 공개하고 있습니다.
    2. 회사는 제1항에 따라 본 방침을 공개하는 경우 글자 크기, 색상 등을 활용하여 이용자가 본 방침을 쉽게 확인할 수 있도록 합니다.

  제4조(본 방침의 변경)
    1. 본 방침은 개인정보 관련 법령, 지침, 고시 또는 정부나 회사 서비스의 정책이나 내용의 변경에 따라 개정될 수 있습니다.
    2. 회사는 제1항에 따라 본 방침을 개정하는 경우 다음 각 호 하나 이상의 방법으로 공지합니다.
      가. 회사가 운영하는 인터넷 홈페이지의 첫 화면의 공지사항란 또는 별도의 창을 통하여 공지하는 방법
      나. 서면·모사전송·전자우편 또는 이와 비슷한 방법으로 이용자에게 공지하는 방법
    3. 회사는 제2항의 공지는 본 방침 개정의 시행일로부터 최소 7일 이전에 공지합니다. 다만, 이용자 권리의 중요한 변경이 있을 경우에는 최소 30일 전에 공지합니다.

  제5조(회사 서비스 제공을 위한 정보)
  회사는 이용자에게 회사의 서비스를 제공하기 위하여 다음과 같은 정보를 수집합니다.
    1. 필수 수집 정보: 이메일 주소, 이름 및 연락처

  제6조(개인정보 수집 방법)
  회사는 다음과 같은 방법으로 이용자의 개인정보를 수집합니다.
    1. 이용자가 회사의 홈페이지에 자신의 개인정보를 입력하는 방식
    2. 어플리케이션 등 회사가 제공하는 홈페이지 외의 서비스를 통해 이용자가 자신의 개인정보를 입력하는 방식
    3. 이용자가 고객센터의 상담, 게시판에서의 활동 등 회사의 서비스를 이용하는 과정에서 이용자가 입력하는 방식

  제7조(개인정보의 이용)
  회사는 개인정보를 다음 각 호의 경우에 이용합니다.
    1. 공지사항의 전달 등 회사운영에 필요한 경우
    2. 이용문의에 대한 회신, 불만의 처리 등 이용자에 대한 서비스 개선을 위한 경우
    3. 회사의 서비스를 제공하기 위한 경우
    4. 법령 및 회사 약관을 위반하는 회원에 대한 이용 제한 조치, 부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을 주는 행위에 대한 방지 및 제재를 위한 경우
    5. 신규 서비스 개발을 위한 경우

  제8조(개인정보의 보유 및 이용기간)
    1. 회사는 이용자의 개인정보에 대해 개인정보의 수집·이용 목적 달성을 위한 기간 동안 개인정보를 보유 및 이용합니다.
    2. 전항에도 불구하고 회사는 내부 방침에 의해 서비스 부정이용기록은 부정 가입 및 이용 방지를 위하여 회원 탈퇴 시점으로부터 최대 1년간 보관합니다.

  제20조(회사의 개인정보 보호 책임자 지정)
  가. 개인정보 보호 책임자
    1) 성명: 백운용
    2) 직책: 부장
    3) 전화번호: 02-523-1282
    4) 이메일: woondori77@nate.com

부칙
제1조 본 방침은 2026.01.31.부터 시행됩니다.`

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false)

  return (
    <>
      <footer className={styles.footer}>
        <img src={bgImg} alt="" className={styles.bg} />
        <img src={characterImg} alt="" className={styles.character} />

        <div className={styles.content}>
          <div className={styles.logoWrap}>
            <img src={logoImg} alt="젤리피쉬월드" className={styles.logoImg} />
          </div>

          <div className={styles.links}>
            <button
              className={styles.link}
              onClick={() => setShowPrivacy(true)}
            >
              개인정보처리방침
            </button>
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

      {/* 개인정보처리방침 팝업 */}
      {showPrivacy && (
        <div className={styles.modalOverlay} onClick={() => setShowPrivacy(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>개인정보처리방침</h2>
              <button
                className={styles.modalClose}
                onClick={() => setShowPrivacy(false)}
              >
                ✕
              </button>
            </div>
            <div className={styles.modalBody}>
              <pre className={styles.modalText}>{privacyContent.trim()}</pre>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Footer