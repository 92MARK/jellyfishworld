import { Helmet } from 'react-helmet-async'

const Seo = ({ title, description, keywords }) => {
  const siteName = '젤리피쉬월드'
  const defaultDescription = '디지털교과서, 이러닝, 애니메이션, 일러스트 전문 교육 콘텐츠 제작 회사입니다'
  const defaultKeywords = '젤리피쉬월드, 교육콘텐츠, 디지털교과서, 이러닝, 애니메이션, 일러스트까지'

  return (
    <Helmet>
      {/* 기본 */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name='description' content={description || defaultDescription} />
      <meta name='keywords' content={keywords || defaultKeywords} />

      {/* OG 태그 (SNS 공유용) */}
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:title' content={title ? `${title} | ${siteName}` : siteName} />
      <meta property='og:description' content={description || defaultDescription} />

      {/* 검색엔진 설정 */}
      <meta name='robots' content='index, follow' />
      <meta name='author' content={siteName} />
    </Helmet>
  )
}

export default Seo