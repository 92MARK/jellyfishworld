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
const privacyContent = `
제1조 (개인정보의 처리 목적)
(주)젤리피쉬월드는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
1. 문의 및 상담 처리: 문의사항 확인, 사실조사를 위한 연락·통지, 처리결과 통보 등

제2조 (개인정보의 처리 및 보유 기간)
① (주)젤리피쉬월드는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
- 문의 및 상담 처리: 3년

제3조 (개인정보의 제3자 제공)
(주)젤리피쉬월드는 정보주체의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.

제4조 (개인정보 처리의 위탁)
(주)젤리피쉬월드는 현재 개인정보 처리업무를 위탁하고 있지 않습니다.

제5조 (정보주체의 권리·의무 및 행사방법)
① 정보주체는 (주)젤리피쉬월드에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
② 권리 행사는 (주)젤리피쉬월드에 대해 서면, 전자우편 등을 통하여 하실 수 있으며, (주)젤리피쉬월드는 이에 대해 지체없이 조치하겠습니다.

제6조 (처리하는 개인정보 항목)
(주)젤리피쉬월드는 다음의 개인정보 항목을 처리하고 있습니다.
- 필수항목: 이름, 이메일 주소, 연락처
- 선택항목: 회사명

제7조 (개인정보의 파기)
① (주)젤리피쉬월드는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
② 전자적 파일 형태로 처리된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.

제8조 (개인정보 보호책임자)
① (주)젤리피쉬월드는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
- 개인정보 보호책임자: 대표이사
- 연락처: jellyfish@jellyfish-world.com

제9조 (개인정보 처리방침 변경)
이 개인정보 처리방침은 2024년 1월 1일부터 적용됩니다.
`

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
              {privacyContent.trim().split('\n').map((line, idx) => (
                <p key={idx} className={line.startsWith('제') ? styles.modalHeading : styles.modalText}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Footer