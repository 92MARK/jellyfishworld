import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import styles from './Contact.module.css'
import Seo from '../components/Seo'

const privacyPolicy = `제1조(목적)
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

const privacyConsent = `(주)젤리피쉬월드(이하 '회사'라고 합니다)는 개인정보보호법 등 관련 법령상의 개인정보보호 규정을 준수하며 귀하의 개인정보보호에 최선을 다하고 있습니다. 회사는 개인정보보호법에 근거하여 다음과 같은 내용으로 개인정보를 수집 및 처리하고자 합니다.

다음의 내용을 자세히 읽어보시고 모든 내용을 이해하신 후에 동의 여부를 결정해주시기 바랍니다.

제1조(회사 서비스 제공을 위한 정보)
회사는 이용자에게 회사의 서비스를 제공하기 위하여 다음과 같은 정보를 수집합니다.
[필수 수집 정보] : 이메일 주소, 이름 및 연락처

제2조(개인정보 보유 및 이용 기간)
1. 수집한 개인정보는 수집·이용 동의일로부터 보관 및 이용합니다.
2. 개인정보 보유기간의 경과, 처리목적의 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.

제3조(동의 거부 관리)
귀하는 본 안내에 따른 개인정보 수집·이용에 대하여 동의를 거부할 권리가 있습니다. 다만, 귀하가 개인정보 동의를 거부하시는 경우에 서비스 이용의 제한의 불이익이 발생할 수 있음을 알려드립니다.

본인은 위의 동의서 내용을 충분히 숙지하였으며, 위와 같이 개인정보를 수집·이용하는데 동의합니다.`

const Contact = () => {
  const [form, setForm] = useState({
    from_name: '',
    from_agency: '',
    from_email: '',
    from_number: '',
    from_deadline: '',
    from_amount: '',
    message: '',
  })
  const [errors, setErrors] = useState({})
  const [privacyChecked, setPrivacyChecked] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const nameRef = useRef(null)
  const agencyRef = useRef(null)
  const emailRef = useRef(null)
  const numberRef = useRef(null)
  const messageRef = useRef(null)
  const privacyRef = useRef(null)
  const consentRef = useRef(null)

  // 우선순위 순서
  const fieldOrder = [
    'from_name',
    'from_agency',
    'from_email',
    'from_number',
    'message',
    'privacy',
    'consent',
  ]

  const handleChange = (e) => {
    const { name, value } = e.target

    // 문의 내용 1000자 초과 입력 막기
    if (name === 'message' && value.length > 1000) return

    // 연락처 숫자/하이픈만 허용
    if (name === 'from_number') {
      const onlyNumbersAndHyphen = value.replace(/[^0-9-]/g, '')
      setForm({ ...form, [name]: onlyNumbersAndHyphen })
      setErrors((prev) => ({ ...prev, [name]: '' }))
      return
    }

    setForm({ ...form, [name]: value })
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const newErrors = {}

    if (!form.from_name.trim()) newErrors.from_name = '성명을 입력해주세요'
    if (!form.from_agency.trim()) newErrors.from_agency = '소속/직책을 입력해주세요'
    if (!form.from_email.trim()) {
      newErrors.from_email = '이메일을 입력해주세요'
    } else if (!emailRegex.test(form.from_email)) {
      newErrors.from_email = '이메일 형식이 올바르지 않습니다'
    }
    if (!form.from_number.trim()) newErrors.from_number = '연락처를 입력해주세요'
    if (!form.message.trim()) newErrors.message = '문의 내용을 입력해주세요'
    if (form.message.length > 1000) newErrors.message = '문의 내용은 1000자 이내로 입력해주세요'
    if (!privacyChecked) newErrors.privacy = '개인정보처리방침을 확인해주세요'
    if (!consentChecked) newErrors.consent = '개인정보 수집 및 이용에 동의해주세요'

    return newErrors
  }

const refMap = {
  from_name: nameRef,
  from_agency: agencyRef,
  from_email: emailRef,
  from_number: numberRef,
  message: messageRef,
  privacy: privacyRef,
  consent: consentRef,
}

const scrollToFirstError = (newErrors) => {
  for (const field of fieldOrder) {
    if (newErrors[field] && refMap[field]?.current) {
      refMap[field].current.scrollIntoView({ behavior: 'smooth', block: 'center' })
      refMap[field].current.focus?.()
      break
    }
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validate()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      // 매번 스크롤 동작하도록 setTimeout으로 DOM 업데이트 후 실행
      setTimeout(() => scrollToFirstError(newErrors), 0)
      return
    }

    setLoading(true)
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.from_name,
          from_email: form.from_email,
          from_number: form.from_number || '미입력',
          from_agency: form.from_agency || '미입력',
          from_deadline: form.from_deadline || '미입력',
          from_amount: form.from_amount || '미입력',
          message: form.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setSuccess(true)
      setForm({
        from_name: '', from_agency: '', from_email: '',
        from_number: '', from_deadline: '', from_amount: '', message: ''
      })
      setPrivacyChecked(false)
      setConsentChecked(false)
      setErrors({})
    } catch (err) {
      console.error(err)
      setErrors({ submit: '전송 중 오류가 발생했습니다. 다시 시도해주세요.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Seo
        title="문의"
        description="젤리피쉬월드에 교육 콘텐츠 제작을 문의해주세요."
      />

      <section className={styles.hero}>
        <img src="/images/contact_bg.png" alt="" className={styles.heroBg} />
        <h1 className={styles.heroTitle}>문의</h1>
      </section>

      <section className={styles.content}>
        <div className={styles.formWrap}>
          {success ? (
            <div className={styles.successBox}>
              <p className={styles.successIcon}>✅</p>
              <p className={styles.successTitle}>문의가 접수되었습니다!</p>
              <p className={styles.successDesc}>
                빠른 시일 내에 연락드리겠습니다 😄
              </p>
              <button
                className={styles.successBtn}
                onClick={() => setSuccess(false)}
              >
                새 문의 작성
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
              {/* 성명 + 소속/직책 */}
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>
                    성명 <span className={styles.required}>*</span>
                  </label>
                  <input
                    ref={nameRef}
                    type="text"
                    name="from_name"
                    value={form.from_name}
                    onChange={handleChange}
                    placeholder="성명을 입력해 주세요."
                    className={`${styles.input} ${errors.from_name ? styles.inputError : ""}`}
                  />
                  {errors.from_name && (
                    <p className={styles.fieldError}>{errors.from_name}</p>
                  )}
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>
                    소속/직책 <span className={styles.required}>*</span>
                  </label>
                  <input
                    ref={agencyRef}
                    type="text"
                    name="from_agency"
                    value={form.from_agency}
                    onChange={handleChange}
                    placeholder="소속/직책을 입력해 주세요."
                    className={`${styles.input} ${errors.from_agency ? styles.inputError : ""}`}
                  />
                  {errors.from_agency && (
                    <p className={styles.fieldError}>{errors.from_agency}</p>
                  )}
                </div>
              </div>

              {/* 이메일 + 연락처 */}
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>
                    이메일 <span className={styles.required}>*</span>
                  </label>
                  <input
                    ref={emailRef}
                    type="email"
                    name="from_email"
                    value={form.from_email}
                    onChange={handleChange}
                    placeholder="이메일 주소를 입력해 주세요."
                    className={`${styles.input} ${errors.from_email ? styles.inputError : ""}`}
                  />
                  {errors.from_email && (
                    <p className={styles.fieldError}>{errors.from_email}</p>
                  )}
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>
                    연락처 <span className={styles.required}>*</span>
                  </label>
                  <input
                    ref={numberRef}
                    type="tel"
                    name="from_number"
                    value={form.from_number}
                    onChange={handleChange}
                    placeholder="숫자와 하이픈만 입력해 주세요. (예: 010-1234-5678)"
                    className={`${styles.input} ${errors.from_number ? styles.inputError : ""}`}
                  />
                  {errors.from_number && (
                    <p className={styles.fieldError}>{errors.from_number}</p>
                  )}
                </div>
              </div>

              {/* 제작 일정 + 예산 범위 */}
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>제작 일정</label>
                  <input
                    type="text"
                    name="from_deadline"
                    value={form.from_deadline}
                    onChange={handleChange}
                    placeholder="기한을 입력해 주세요."
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>예산 범위</label>
                  <input
                    type="text"
                    name="from_amount"
                    value={form.from_amount}
                    onChange={handleChange}
                    placeholder="정해진 예산이 있다면 입력해 주세요."
                    className={styles.input}
                  />
                </div>
              </div>

              {/* 문의 내용 */}
              <div className={styles.field}>
                <label className={styles.label}>
                  문의 내용 <span className={styles.required}>*</span>
                  <span className={`${styles.charCount} ${form.message.length >= 900 ? styles.charCountWarn : ""} ${form.message.length >= 1000 ? styles.charCountMax : ""}`}>
                    {form.message.length}/1000
                  </span>
                </label>
                <textarea
                  ref={messageRef}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="내부 일정이나 참고 내용 등을 함께 적어 주시면 더 자세한 안내를 받으실 수 있습니다."
                  rows={8}
                  className={`${styles.textarea} ${errors.message ? styles.textareaError : ""}`}
                />
                {errors.message && (
                  <p className={styles.fieldError}>{errors.message}</p>
                )}
              </div>

              {/* 개인정보처리방침 */}
              <div className={styles.policyWrap}>
                <p className={styles.policyTitle}>개인정보처리 방침</p>
                <div className={styles.policyBox}>
                  <pre className={styles.policyText}>{privacyPolicy}</pre>
                </div>
                <label
                  ref={privacyRef}
                  className={`${styles.checkLabel} ${errors.privacy ? styles.checkLabelError : ""}`}
                  tabIndex={-1}
                >
                  <input
                    type="checkbox"
                    checked={privacyChecked}
                    onChange={(e) => {
                      setPrivacyChecked(e.target.checked);
                      setErrors((prev) => ({ ...prev, privacy: "" }));
                    }}
                    className={styles.checkbox}
                  />
                  개인정보처리 방침을 모두 확인했어요.
                </label>
                {errors.privacy && (
                  <p className={styles.fieldError}>{errors.privacy}</p>
                )}
              </div>

              {/* 개인정보 수집 이용 동의 */}
              <div className={styles.policyWrap}>
                <p className={styles.policyTitle}>
                  <span className={styles.required}>(필수)</span> 개인정보 수집
                  이용 동의서
                </p>
                <div className={styles.policyBox}>
                  <pre className={styles.policyText}>{privacyConsent}</pre>
                </div>
                <label
                  ref={consentRef}
                  className={`${styles.checkLabel} ${errors.consent ? styles.checkLabelError : ""}`}
                  tabIndex={-1}
                >
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={(e) => {
                      setConsentChecked(e.target.checked);
                      setErrors((prev) => ({ ...prev, consent: "" }));
                    }}
                    className={styles.checkbox}
                  />
                  개인정보 수집 및 이용에 동의해요.
                </label>
                {errors.consent && (
                  <p className={styles.fieldError}>{errors.consent}</p>
                )}
              </div>

              {errors.submit && <p className={styles.error}>{errors.submit}</p>}

              <div className={styles.btnWrap}>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={loading}
                >
                  {loading ? "전송 중..." : "문의하기"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

export default Contact