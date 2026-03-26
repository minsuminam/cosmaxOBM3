import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Brain, Factory, FlaskConical, Lightbulb, Package, PenTool, ArrowRight, ChevronDown } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { GeneratedImage } from './components/GeneratedImage';
import { CosmaxLogo } from './components/CosmaxLogo';

// --- Data ---
export type Lang = 'ko' | 'en' | 'zh' | 'ja';

const processSteps = [
  { id: '01', name: 'Strategy', icon: Lightbulb, desc: "코스맥스는 브랜드와 제품을 위한 명확한 비전을 세우고, 소비자를 정의하며, 목표를 심층적으로 이해한 뒤, 강점을 극대화할 수 있는 브랜드 전략을 제안합니다.\n현재 주목해야 할 트렌드는 물론 고객의 강점을 살린 제품을 만들기 위해 필요한 각 단계별 절차를 안내하고, 각 고객의 특성에 맞춘 성공 경로를 설계합니다." },
  { id: '02', name: 'Brand Concept', icon: Brain, desc: "코스맥스는 전략적 사고를 통해 브랜드의 성격과 이름, 미적 요소와 서사를 포함한 브랜드만의 독창적인 콘셉트를 기획합니다.\n미래지향적이거나 레트로 하거나, 대담하거나, 실용적이거나, 어떤 콘셉트이든 브랜드가 구축될 토대를 마련하고 핵심적인 아이디어를 함께 구체화해 나갑니다." },
  { id: '03', name: 'Design', icon: PenTool, desc: "코스맥스의 디자인팀은 아이디어를 현실로 만들어냅니다. 로고와 아이콘, 색상과 메시지의 톤&매너에 이르기까지 브랜드의 시각적·언어적 정체성을 설계하고 시장에서 돋보이도록 브랜드를 디자인합니다.\n디자인이 완료되면 이를 제품에 적용하고 출시할 수 있도록 지원합니다." },
  { id: '04', name: 'Formulation', icon: FlaskConical, desc: "코스맥스는 업계 최고의 기술, 성분, 피부 전달체 등을 활용해 고객이 원하는 제품, 브랜드 및 사용자에게 적합한 제형을 개발합니다.\n전 세계 1,100여 명의 연구 개발 인력으로 구성된 R&I 팀이 최적의 성분 조합에 대한 전문 지식을 바탕으로 개발한 제형은 뛰어난 품질과 효과를 보장합니다." },
  { id: '05', name: 'Manufacturing', icon: Factory, desc: "글로벌 인프라와 효율적인 프로세스를 토대로 고객의 제품을 신속하게 대량생산합니다. 이는 제품 카테고리별로 특화되고 과학적으로 강화된 시설을 갖추고 있기 때문에 가능한 일입니다.\n코스맥스는 원료 공급업체의 방대한 네트워크, 특허받은 생산 기술, 업계 기준을 뛰어넘는 수많은 인증을 통해 모든 제품군에서 뛰어난 품질을 보장합니다." },
  { id: '06', name: 'Packaging', icon: Package, desc: "코스맥스는 새로운 브랜드의 가치를 극대화하는 아름다운 패키지를 디자인하고 개발해 우수한 제품을 출시할 수 있도록 지원합니다.\n지속 가능한 소재부터 용기의 모양, 제품 라벨과 전달 방식에 이르기까지 모든 요소를 신중하게 고려합니다." }
];

const t = {
  ko: {
    whatIsObmDesc: "브랜드 기획, 연구 개발부터 패키징,\n생산까지 모든 과정을 고객과 함께하며 쉽고\n빠르게 시장에 진입하도록 지원",
    whatWeOfferOBM: "OBM: 브랜딩 전문가가 처음부터 끝까지 전과정을 관리하며 시장에 출시할 수 있는 제품과 브랜드를 완벽하게 제작",
    whatWeOfferODM: "ODM: 과학자가 만들고 소비자가 원하는 것을 기반으로 혁신적인 포뮬러와 최적화된 패키징 제공",
    whatWeDoSubtitle: "브랜드 기획 및 디자인부터 제형 개발, 제조, 마케팅에 이르기까지 뷰티 비즈니스의 엔드투엔드 통합.\n고객의 아이디어를 실질적인 시장 기회와 지속 가능한 비즈니스 성과로 전환합니다.",
    processSteps: [
      { id: '01', name: 'Strategy', desc: "코스맥스는 브랜드와 제품을 위한 명확한 비전을 세우고, 소비자를 정의하며, 목표를 심층적으로 이해한 뒤, 강점을 극대화할 수 있는 브랜드 전략을 제안합니다.\n현재 주목해야 할 트렌드는 물론 고객의 강점을 살린 제품을 만들기 위해 필요한 각 단계별 절차를 안내하고, 각 고객의 특성에 맞춘 성공 경로를 설계합니다." },
      { id: '02', name: 'Brand Concept', desc: "코스맥스는 전략적 사고를 통해 브랜드의 성격과 이름, 미적 요소와 서사를 포함한 브랜드만의 독창적인 콘셉트를 기획합니다.\n미래지향적이거나 레트로 하거나, 대담하거나, 실용적이거나, 어떤 콘셉트이든 브랜드가 구축될 토대를 마련하고 핵심적인 아이디어를 함께 구체화해 나갑니다." },
      { id: '03', name: 'Design', desc: "코스맥스의 디자인팀은 아이디어를 현실로 만들어냅니다. 로고와 아이콘, 색상과 메시지의 톤&매너에 이르기까지 브랜드의 시각적·언어적 정체성을 설계하고 시장에서 돋보이도록 브랜드를 디자인합니다.\n디자인이 완료되면 이를 제품에 적용하고 출시할 수 있도록 지원합니다." },
      { id: '04', name: 'Formulation', desc: "코스맥스는 업계 최고의 기술, 성분, 피부 전달체 등을 활용해 고객이 원하는 제품, 브랜드 및 사용자에게 적합한 제형을 개발합니다.\n전 세계 1,100여 명의 연구 개발 인력으로 구성된 R&I 팀이 최적의 성분 조합에 대한 전문 지식을 바탕으로 개발한 제형은 뛰어난 품질과 효과를 보장합니다." },
      { id: '05', name: 'Manufacturing', desc: "글로벌 인프라와 효율적인 프로세스를 토대로 고객의 제품을 신속하게 대량생산합니다. 이는 제품 카테고리별로 특화되고 과학적으로 강화된 시설을 갖추고 있기 때문에 가능한 일입니다.\n코스맥스는 원료 공급업체의 방대한 네트워크, 특허받은 생산 기술, 업계 기준을 뛰어넘는 수많은 인증을 통해 모든 제품군에서 뛰어난 품질을 보장합니다." },
      { id: '06', name: 'Packaging', desc: "코스맥스는 새로운 브랜드의 가치를 극대화하는 아름다운 패키지를 디자인하고 개발해 우수한 제품을 출시할 수 있도록 지원합니다.\n지속 가능한 소재부터 용기의 모양, 제품 라벨과 전달 방식에 이르기까지 모든 요소를 신중하게 고려합니다." }
    ],
    processHoverText: "프로세스 단계에 마우스를 올려 상세 내용을 확인하세요.",
    solutionsHeader: {
      title: "Our Solutions",
      desc1: "서비스를 '처음부터 함께 만드는 방식'과 '준비된 자산을 활용하는 방식' 중 선택",
      desc2: "고객사의 특성과 상황에 맞춘 선택으로 효율적 운영 가능",
      build: "Build your brand",
      select: "Select your service"
    },
    solutionsData: [
      {
        label: "의미",
        build: "코스맥스 OBM과 처음부터 설계하는 방식",
        select: "이미 축적된 자산을 활용해 빠르게 전개하는 방식"
      },
      {
        label: "진행\n과정",
        build: "시장분석 → 브랜드 전략 → 네이밍 → 제형 개발 →\n디자인 개발 → 생산",
        select: "인벤토리 선택 → 브랜드 구체화 → 제형 적용 →\n디자인 보완 → 생산"
      },
      {
        label: "개발\n기간",
        build: "국내 진행 기준, 최소 10개월\n신규브랜드로 해외 등록까지 진행 시, 약 2년 소요",
        select: "국내 진행 기준, 약 5개월"
      },
      {
        label: "추천\n대상",
        build: "브랜드의 독창성이 중요한 고객사\n처음부터 전략적으로 선택하고 싶은 고객사",
        select: "시장 출시 속도가 중요한 고객사\n예산 효율성이 중요한 고객사"
      }
    ],
    expertise: [
      {
        title: "당신의 브랜드에 최적화된\n전담 기획 조직 구축",
        desc: "브랜드 방향성과 성장 전략에 부합하는 전담\n마케팅 조직을 구축하여, 브랜드 운영 전반에\n필요한 핵심 기능을 체계적으로 지원"
      },
      {
        title: "컨셉 기획부터 디자인, 상품개발까지\n전 과정 컨설팅",
        desc: "단순한 실행 조직을 넘어, 브랜드 전략 수립부터\n캠페인 기획, 콘텐츠 개발, 채널 운영, 성과 분석에\n이르기까지 전 과정을 유기적으로 연결하는\n맞춤형 마케팅 체계를 설계"
      },
      {
        title: "브랜드 기획부터 권리화까지 연결하는\n통합 OBM 솔루션을 제공",
        desc: "디자인 기획과 상표권 개발 역량을 기반으로 브랜드의 차별화된 자산 구축을 지원하며, 다양한 레퍼런스 인벤토리를 활용해 완성도 높은 브랜드 개발 프로세스를 제공합니다."
      }
    ],
    successCasesTitle: "OBM Success Case",
    viewCase: "View Case",
    pillars: [
      { title: "Created by Cosmax.\nDesigned for you.", desc: "브랜드명과 제품명, 비주얼\n아이덴티티, 제형 개발, 생산은\n물론 마케팅 전략을 포함한 전체\n프로세스를 체계적이고\n정밀하게 설계", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800" },
      { title: "Beauty from\nstart to finish", desc: "연구부터 제품 콘셉트, 완성된\n브랜드에 이르기까지 전체 뷰티\n파이프라인에 걸쳐 파트너를\n지원", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
      { title: "The future of Beauty", desc: "제품의 90%가 자체 R&I 센터\n에서 개발되었고 항상 최적화,\n개선, 창조를 위한 새로운\n방법을 모색", image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800" },
      { title: "Your vision\nOur technology", desc: "코스맥스의 파트너는\n코스맥스에서만 독점적으로\n업계 최고의 포뮬러 제공", image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800" }
    ],
    cases: [
      { 
        name: "LOTTE HOTELS", 
        subName: "Emissary.73 / Depaysmo", 
        desc: ["국내 최대 호텔 체인 어매니티 브랜드 및 상품 개발", "글로벌 NO.1 향료사와 공동 개발한 프리미엄 퍼퓸드 어매니티"], 
        prompt: "A product photography of two white pump bottles with gold text 'EMISSARY.73', one standing on a dark grey box, the other standing next to it. The bottles are labeled 'ENRICHING CREAM SHAMPOO' and 'ENRICHING CREAM TREATMENT'. Dark background, studio lighting."
      },
      { name: "Danmir (단미르)", subName: "", desc: ["국가유산청 궁능유적본부, 국가유산진흥원과 공동 연구 개발", "한국 전통 향기를 복원하는 코스맥스 특허기술 Scenteritage® 적용"], image: "https://m.intelrior.com/web/product/big/202402/160227e09a5a21874f32fdf06e98419a.png" },
      { name: "reii reii", subName: "", desc: ["글로벌 인지도를 보유한 박막례 할머니 IP 기반 브랜드 인큐베이팅", "한국적인 자연 원료와 전문 연구진의 솔루션을 담아낸 즐거움과 위트가 넘치는 스킨케어 브랜드"], image: "https://media.bunjang.co.kr/product/263843896_1_1724590464_w360.jpg" },
      { name: "florevida", subName: "", desc: ["삼성물산 에버랜드의 뷰티 브랜드. 에버로즈의 향기와 생명력을 담은 라이프스타일 프래그런스 브랜드"], image: "https://www.cosinkorea.com/data/photos/20240937/art_17259462623283_5161e6.jpg" },
      { name: "WONDERMIS", subName: "", desc: ["코스맥스 특허 Starenol™ 독점 사용프리미엄 브랜드 기획", "세계 4위 인구의 인니시장 내 파급력있는 메가 인플루언서 브랜드 런칭"], image: "https://id-live-01.slatic.net/p/0f1be9ecf084bb5eca01dbc1998a8d97.jpg" },
      { name: "PURCELL", subName: "HIGH DOSE", desc: ["코스맥스 소재랩과 함께 마이크로바이옴 독점 원료 개발", "mL당 20억 마리 프로바이오틱스가 선사하는 장벽 초월 PIXCELL BIOM™ 원료 메인 소구"], image: "https://m.ceoscoredaily.com/photos/2023/12/29/2023122916012917850_l.png" }
    ]
  },
  en: {
    whatIsObmDesc: "We support our clients through every step of the process — from brand planning & design, R&I, packaging, to manufacturing — enabling fast and seamless market entry",
    whatWeOfferOBM: "OBM: From concept to launch — our branding experts build your product and brand, fully ready for market.",
    whatWeOfferODM: "ODM: Scientist-crafted, consumer-driven — innovative formulas paired with optimized packaging.",
    whatWeDoSubtitle: "End-to-end integration of the beauty business—from brand planning and design to formulation development, manufacturing, and marketing.\nTransforming client ideas into tangible market opportunities and sustainable business outcomes.",
    processSteps: [
      { id: '01', name: 'Strategy', desc: "COSMAX establishes a clear vision for the brand and product, defines the consumer, deeply understands the goals, and proposes a brand strategy that maximizes strengths.\nWe guide the necessary steps to create products that leverage the customer's strengths as well as current trends, designing a success path tailored to each customer's characteristics." },
      { id: '02', name: 'Brand Concept', desc: "Through strategic thinking, COSMAX plans a unique concept for the brand, including its personality, name, aesthetic elements, and narrative.\nWhether futuristic, retro, bold, or practical, we lay the foundation for the brand and materialize core ideas together." },
      { id: '03', name: 'Design', desc: "COSMAX's design team brings ideas to life. From logos and icons to colors and the tone & manner of messages, we design the brand's visual and verbal identity to stand out in the market.\nOnce the design is complete, we support applying it to the product for launch." },
      { id: '04', name: 'Formulation', desc: "COSMAX develops formulations suitable for the product, brand, and user desired by the customer, utilizing industry-leading technology, ingredients, and skin delivery systems.\nFormulations developed by the R&I team, consisting of over 1,100 R&D personnel worldwide based on expertise in optimal ingredient combinations, guarantee outstanding quality and effectiveness." },
      { id: '05', name: 'Manufacturing', desc: "Based on global infrastructure and efficient processes, we rapidly mass-produce customer products. This is possible because we have specialized and scientifically enhanced facilities for each product category.\nCOSMAX guarantees outstanding quality in all product lines through a vast network of raw material suppliers, patented production technologies, and numerous certifications that exceed industry standards." },
      { id: '06', name: 'Packaging', desc: "COSMAX designs and develops beautiful packaging that maximizes the value of new brands, supporting the launch of excellent products.\nFrom sustainable materials to the shape of the container, product labels, and delivery methods, every element is carefully considered." }
    ],
    processHoverText: "Hover over a process step to see details.",
    solutionsHeader: {
      title: "Our Solutions",
      desc1: "Choose between 'building together from scratch' and 'utilizing prepared assets'",
      desc2: "Efficient operation possible through choices tailored to the client's characteristics and situation",
      build: "Build your brand",
      select: "Select your service"
    },
    solutionsData: [
      {
        label: "Meaning",
        build: "Designing from scratch with COSMAX OBM",
        select: "Deploying rapidly using already accumulated assets"
      },
      {
        label: "Process",
        build: "Market Analysis → Brand Strategy → Naming → Formulation Development →\nDesign Development → Production",
        select: "Inventory Selection → Brand Materialization → Formulation Application →\nDesign Refinement → Production"
      },
      {
        label: "Dev.\nPeriod",
        build: "Minimum 10 months based on domestic progress\nTakes about 2 years for overseas registration as a new brand",
        select: "About 5 months based on domestic progress"
      },
      {
        label: "Target",
        build: "Clients who value brand originality\nClients who want to make strategic choices from the beginning",
        select: "Clients who prioritize speed to market\nClients who prioritize budget efficiency"
      }
    ],
    expertise: [
      {
        title: "Establishment of a dedicated\nplanning team tailored to your brand",
        desc: "Dedicated marketing team aligned to your brand — structured support for every core operational function."
      },
      {
        title: "Full-process consulting from concept\nto product development",
        desc: "A tailored marketing system seamlessly connecting strategy, campaigns, content, design and performance."
      },
      {
        title: "One integrated OBM solution\nfrom brand planning to trademark",
        desc: "From design to brand trademark — building distinctive assets through a refined development process."
      }
    ],
    successCasesTitle: "OBM Success Case",
    viewCase: "View Case",
    pillars: [
      { title: "Created by COSMAX.\nDesigned for you.", desc: "From brand & product naming, visual identity, and formulation to production and marketing strategy — every detail, precisely engineered.", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800" },
      { title: "Beauty from\nstart to finish", desc: "From research to product concept to a complete brand — we've got your back across the entire beauty pipeline.", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
      { title: "The future of Beauty", desc: "90% developed in our own R&I Center — always pushing the boundaries to optimize, improve, and create.", image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800" },
      { title: "Your vision\nOur technology", desc: "Our partners gain exclusive access to industry-leading formulas available only through Cosmax.", image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800" }
    ],
    cases: [
      { 
        name: "LOTTE HOTELS", 
        subName: "Emissary.73 / Depaysmo", 
        desc: ["Built the amenity brand for Korea's No.1 hotel chain.", "Premium perfumed amenities co-developed with the global No.1 fragrance house."], 
        prompt: "A product photography of two white pump bottles with gold text 'EMISSARY.73', one standing on a dark grey box, the other standing next to it. The bottles are labeled 'ENRICHING CREAM SHAMPOO' and 'ENRICHING CREAM TREATMENT'. Dark background, studio lighting."
      },
      { name: "Danmir", subName: "", desc: ["Developed with Korea's national heritage authorities — the Royal Palaces and Tombs Center and Korea Heritage Service Foundation.", "Featuring Cosmax's patented Scenteritage® technology that restores traditional Korean fragrances."], image: "https://m.intelrior.com/web/product/big/202402/160227e09a5a21874f32fdf06e98419a.png" },
      { name: "reii reii", subName: "", desc: ["Incubating a brand powered by the globally beloved Korea Grandma IP.", "A fun and witty skincare brand infused with Korean natural ingredients and expert R&D solutions."], image: "https://media.bunjang.co.kr/product/263843896_1_1724590464_w360.jpg" },
      { name: "florevida", subName: "", desc: ["A beauty brand by Samsung C&T Everland. A lifestyle fragrance brand capturing the scent and vitality of Ever Rose."], image: "https://www.cosinkorea.com/data/photos/20240937/art_17259462623283_5161e6.jpg" },
      { name: "WONDERMIS", subName: "", desc: ["Premium brand planning with exclusive use of Cosmax's patented Starenol™ ingredient.", "Launching a mega-influencer brand with massive impact in Indonesia, the world's 4th most populous market."], image: "https://id-live-01.slatic.net/p/0f1be9ecf084bb5eca01dbc1998a8d97.jpg" },
      { name: "PURCELL", subName: "HIGH DOSE", desc: ["Co-developed exclusive microbiome ingredients in partnership with Cosmax Material Lab.", "Key selling point: PIXCELL BIOM™ — a barrier-transcending ingredient delivering 2 billion probiotics per mL."], image: "https://m.ceoscoredaily.com/photos/2023/12/29/2023122916012917850_l.png" }
    ]
  },
  zh: {
    whatIsObmDesc: "从研发到生产、品牌策划、包装，\n与客户携手共进，助力快速轻松进入市场。",
    whatWeOfferOBM: "OBM: 从概念到发布 — 我们的品牌专家打造您的产品和品牌，完全准备好进入市场。",
    whatWeOfferODM: "ODM: 科学家精心制作，以消费者为导向 — 创新的配方搭配优化的包装。",
    whatWeDoSubtitle: "从品牌策划和设计到配方开发、制造和营销的美容业务端到端整合。\n将客户的创意转化为切实的市场机遇和可持续的业务成果。",
    processSteps: [
      { id: '01', name: 'Strategy', desc: "COSMAX establishes a clear vision for the brand and product, defines the consumer, deeply understands the goals, and proposes a brand strategy that maximizes strengths.\nWe guide the necessary steps to create products that leverage the customer's strengths as well as current trends, designing a success path tailored to each customer's characteristics." },
      { id: '02', name: 'Brand Concept', desc: "Through strategic thinking, COSMAX plans a unique concept for the brand, including its personality, name, aesthetic elements, and narrative.\nWhether futuristic, retro, bold, or practical, we lay the foundation for the brand and materialize core ideas together." },
      { id: '03', name: 'Design', desc: "COSMAX's design team brings ideas to life. From logos and icons to colors and the tone & manner of messages, we design the brand's visual and verbal identity to stand out in the market.\nOnce the design is complete, we support applying it to the product for launch." },
      { id: '04', name: 'Formulation', desc: "COSMAX develops formulations suitable for the product, brand, and user desired by the customer, utilizing industry-leading technology, ingredients, and skin delivery systems.\nFormulations developed by the R&I team, consisting of over 1,100 R&D personnel worldwide based on expertise in optimal ingredient combinations, guarantee outstanding quality and effectiveness." },
      { id: '05', name: 'Manufacturing', desc: "Based on global infrastructure and efficient processes, we rapidly mass-produce customer products. This is possible because we have specialized and scientifically enhanced facilities for each product category.\nCOSMAX guarantees outstanding quality in all product lines through a vast network of raw material suppliers, patented production technologies, and numerous certifications that exceed industry standards." },
      { id: '06', name: 'Packaging', desc: "COSMAX designs and develops beautiful packaging that maximizes the value of new brands, supporting the launch of excellent products.\nFrom sustainable materials to the shape of the container, product labels, and delivery methods, every element is carefully considered." }
    ],
    processHoverText: "将鼠标悬停在流程步骤上以查看详细信息。",
    solutionsHeader: {
      title: "Our Solutions",
      desc1: "在“从头开始共同构建”和“利用准备好的资产”之间进行选择",
      desc2: "根据客户的特点和情况进行选择，实现高效运营",
      build: "Build your brand",
      select: "Select your service"
    },
    solutionsData: [
      {
        label: "意义",
        build: "与 COSMAX OBM 从头开始设计",
        select: "利用已积累的资产快速部署"
      },
      {
        label: "流程",
        build: "市场分析 → 品牌战略 → 命名 → 配方开发 →\n设计开发 → 生产",
        select: "库存选择 → 品牌具体化 → 配方应用 →\n设计完善 → 生产"
      },
      {
        label: "开发\n周期",
        build: "以国内进度为准，至少 10 个月\n作为新品牌进行海外注册约需 2 年",
        select: "以国内进度为准，约 5 个月"
      },
      {
        label: "推荐\n对象",
        build: "重视品牌原创性的客户\n希望从一开始就进行战略选择的客户",
        select: "重视上市速度的客户\n重视预算效率的客户"
      }
    ],
    expertise: [
      {
        title: "为您量身定制的\n专属策划团队",
        desc: "从品牌营销和设计开发开始，\n支持产品开发和进军全球市场的品牌成长合作伙伴关系。"
      },
      {
        title: "从概念策划到设计、产品开发的\n全过程咨询",
        desc: "COSMAX OBM服务系统而精确地设计整个流程，包括品牌和产品名称、视觉识别、配方开发、生产，以及营销战略和促销活动。"
      },
      {
        title: "提供从品牌策划到权利化的\n综合OBM解决方案",
        desc: "基于设计策划和商标权开发能力，支持品牌差异化资产的构建，并利用各种参考库存提供高完成度的品牌开发流程。"
      }
    ],
    successCasesTitle: "OBM 成功案例",
    viewCase: "查看案例",
    pillars: [
      { title: "Beauty from start to finish", desc: "涵盖从研究到产品概念再到成品品牌的整个美容管道的合作伙伴关系。", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800" },
      { title: "Beyond product development", desc: "具备从产品策划到包装设计的全方位设计能力。\n持续确保设计库存。", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
      { title: "The future of Beauty", desc: "在扩大商标组合的同时，持续推进相关服务的高度化。", image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800" },
      { title: "Your vision. Our technology.", desc: "由全球1,100多名研发人员组成的R&I团队，基于对最佳成分组合的专业知识开发配方。", image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800" }
    ],
    cases: [
      { 
        name: "LOTTE HOTELS", 
        subName: "Emissary.73 / Depaysmo", 
        desc: ["韩国最大连锁酒店的洗浴用品品牌及产品开发", "与全球第一香精公司共同开发的高级香水洗浴用品"], 
        prompt: "A product photography of two white pump bottles with gold text 'EMISSARY.73', one standing on a dark grey box, the other standing next to it. The bottles are labeled 'ENRICHING CREAM SHAMPOO' and 'ENRICHING CREAM TREATMENT'. Dark background, studio lighting."
      },
      { name: "Danmir", subName: "", desc: ["与国家遗产厅宫能遗迹本部、国家遗产振兴院共同研发", "应用COSMAX恢复韩国传统香气的专利技术Scenteritage®"], image: "https://m.intelrior.com/web/product/big/202402/160227e09a5a21874f32fdf06e98419a.png" },
      { name: "reii reii", subName: "", desc: ["基于具有全球知名度的朴末礼奶奶IP的品牌孵化", "通过超越世代和国界的全球创作者内容，在数字平台上推广韩国传统美容配方"], image: "https://media.bunjang.co.kr/product/263843896_1_1724590464_w360.jpg" },
      { name: "florevida", subName: "", desc: ["三星物产爱宝乐园的美容品牌", "蕴含Ever Rose香气和生命力的生活方式香氛品牌，推出身体、手部、头发等24个SKU"], image: "https://www.cosinkorea.com/data/photos/20240937/art_17259462623283_5161e6.jpg" },
      { name: "WONDERMIS", subName: "", desc: ["通过在世界人口第四大国印尼市场推出具有影响力的超级网红品牌，策划基于COSMAX技术的高端品牌", "Nagita Slavina (歌手/演员) - Instagram 7610万，YouTube 2620万，TikTok 1530万粉丝"], image: "https://id-live-01.slatic.net/p/0f1be9ecf084bb5eca01dbc1998a8d97.jpg" },
      { name: "PURCELL", subName: "", desc: ["与COSMAX材料实验室共同开发独家微生物组原料，主打每毫升含20亿益生菌、超越屏障的PIXCELL BIOM™原料"], image: "https://m.ceoscoredaily.com/photos/2023/12/29/2023122916012917850_l.png" }
    ]
  },
  ja: {
    whatIsObmDesc: "研究開発から生産、ブランド企画、パッケージングまで\nすべての過程をお客様と共にし、\n簡単かつ迅速な市場参入を支援します。",
    whatWeOfferOBM: "OBM: コンセプトから立ち上げまで — 当社のブランディング専門家が製品とブランドを構築し、市場に投入する準備を完全に整えます。",
    whatWeOfferODM: "ODM: 科学者が作り、消費者が求める — 革新的なフォーミュラと最適化されたパッケージング。",
    whatWeDoSubtitle: "ブランド企画・デザインから処方開発、製造、マーケティングに至るまで、美容ビジネスのエンドツーエンドの統合。\nクライアントのアイデアを具体的な市場機会と持続可能なビジネス成果に変えます。",
    processSteps: [
      { id: '01', name: 'Strategy', desc: "COSMAX establishes a clear vision for the brand and product, defines the consumer, deeply understands the goals, and proposes a brand strategy that maximizes strengths.\nWe guide the necessary steps to create products that leverage the customer's strengths as well as current trends, designing a success path tailored to each customer's characteristics." },
      { id: '02', name: 'Brand Concept', desc: "Through strategic thinking, COSMAX plans a unique concept for the brand, including its personality, name, aesthetic elements, and narrative.\nWhether futuristic, retro, bold, or practical, we lay the foundation for the brand and materialize core ideas together." },
      { id: '03', name: 'Design', desc: "COSMAX's design team brings ideas to life. From logos and icons to colors and the tone & manner of messages, we design the brand's visual and verbal identity to stand out in the market.\nOnce the design is complete, we support applying it to the product for launch." },
      { id: '04', name: 'Formulation', desc: "COSMAX develops formulations suitable for the product, brand, and user desired by the customer, utilizing industry-leading technology, ingredients, and skin delivery systems.\nFormulations developed by the R&I team, consisting of over 1,100 R&D personnel worldwide based on expertise in optimal ingredient combinations, guarantee outstanding quality and effectiveness." },
      { id: '05', name: 'Manufacturing', desc: "Based on global infrastructure and efficient processes, we rapidly mass-produce customer products. This is possible because we have specialized and scientifically enhanced facilities for each product category.\nCOSMAX guarantees outstanding quality in all product lines through a vast network of raw material suppliers, patented production technologies, and numerous certifications that exceed industry standards." },
      { id: '06', name: 'Packaging', desc: "COSMAX designs and develops beautiful packaging that maximizes the value of new brands, supporting the launch of excellent products.\nFrom sustainable materials to the shape of the container, product labels, and delivery methods, every element is carefully considered." }
    ],
    processHoverText: "プロセスステップにカーソルを合わせると詳細が表示されます。",
    solutionsHeader: {
      title: "Our Solutions",
      desc1: "「ゼロから一緒に作る方法」と「準備された資産を活用する方法」から選択",
      desc2: "顧客の特性と状況に合わせた選択で効率的な運営が可能",
      build: "Build your brand",
      select: "Select your service"
    },
    solutionsData: [
      {
        label: "意味",
        build: "COSMAX OBMとゼロから設計する方法",
        select: "すでに蓄積された資産を活用して迅速に展開する方法"
      },
      {
        label: "進行\n過程",
        build: "市場分析 → ブランド戦略 → ネーミング → 処方開発 →\nデザイン開発 → 生産",
        select: "インベントリ選択 → ブランド具体化 → 処方適用 →\nデザイン補完 → 生産"
      },
      {
        label: "開発\n期間",
        build: "国内進行基準、最低10ヶ月\n新規ブランドとして海外登録まで進行する場合、約2年所要",
        select: "国内進行基準、約5ヶ月"
      },
      {
        label: "推薦\n対象",
        build: "ブランドの独創性が重要な顧客\n最初から戦略的に選択したい顧客",
        select: "市場投入のスピードが重要な顧客\n予算効率が重要な顧客"
      }
    ],
    expertise: [
      {
        title: "あなたのブランドに最適化された\n専任企画組織の構築",
        desc: "ブランドマーケティングとデザイン開発をはじめ、\n商品開発からグローバル市場進出まで支援するブランド成長パートナーシップ。"
      },
      {
        title: "コンセプト企画からデザイン、商品開発までの\n全過程コンサルティング",
        desc: "COSMAX OBMサービスは、ブランド名と製品名、ビジュアルアイデンティティ、剤形開発、生産はもちろん、マーケティング戦略とプロモーションを含むプロセス全体を体系的かつ精密に設計します。"
      },
      {
        title: "ブランド企画から権利化まで繋ぐ\n統合OBMソリューションを提供",
        desc: "デザイン企画と商標権開発の能力を基盤に、ブランドの差別化された資産構築を支援し、多様なリファレンスインベントリを活用して完成度の高いブランド開発プロセスを提供します。"
      }
    ],
    successCasesTitle: "OBM 成功事例",
    viewCase: "ケースを見る",
    pillars: [
      { title: "Beauty from start to finish", desc: "研究から製品コンセプト、完成したブランドに至るまで、ビューティーパイプライン全体にわたるパートナーシップ。", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=800" },
      { title: "Beyond product development", desc: "製品企画からパッケージデザインまで網羅できるデザイン能力を保有。\nデザインインベントリを継続的に確保。", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" },
      { title: "The future of Beauty", desc: "商標権ポートフォリオを拡大する一方、関連サービスの高度化を持続的に推進。", image: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?auto=format&fit=crop&q=80&w=800" },
      { title: "Your vision. Our technology.", desc: "全世界1,100人以上の研究開発陣で構成されたR&Iチームが、最適な成分の組み合わせに関する専門知識を基にフォーミュラを開発。", image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800" }
    ],
    cases: [
      { 
        name: "LOTTE HOTELS", 
        subName: "Emissary.73 / Depaysmo", 
        desc: ["国内最大のホテルチェーンのアメニティブランドおよび商品開発", "グローバルNO.1の香料会社と共同開発したプレミアムパフュームアメニティ"], 
        prompt: "A product photography of two white pump bottles with gold text 'EMISSARY.73', one standing on a dark grey box, the other standing next to it. The bottles are labeled 'ENRICHING CREAM SHAMPOO' and 'ENRICHING CREAM TREATMENT'. Dark background, studio lighting."
      },
      { name: "Danmir", subName: "", desc: ["国家遺産庁宮陵遺跡本部、国家遺産振興院との共同研究開発", "韓国の伝統的な香りを復元するコスマックスの特許技術Scenteritage®を適用"], image: "https://m.intelrior.com/web/product/big/202402/160227e09a5a21874f32fdf06e98419a.png" },
      { name: "reii reii", subName: "", desc: ["グローバルな認知度を持つパク・マンレおばあちゃんのIPベースのブランドインキュベーティング", "世代・国境を越えたグローバルクリエイターコンテンツにより、デジタルプラットフォームベースで韓国の伝統的なビューティーレシピを拡散"], image: "https://media.bunjang.co.kr/product/263843896_1_1724590464_w360.jpg" },
      { name: "florevida", subName: "", desc: ["サムスン物産エバーランドのビューティーブランド", "エバーローズの香りと生命力を込めたライフスタイルフレグランスブランドとして、ボディ＆ハンド＆ヘアなど24SKUを発売"], image: "https://www.cosinkorea.com/data/photos/20240937/art_17259462623283_5161e6.jpg" },
      { name: "WONDERMIS", subName: "", desc: ["世界第4位の人口を抱えるインドネシア市場で影響力のあるメガインフルエンサーブランドの立ち上げにより、コスマックスの技術に基づくプレミアムブランドを企画", "Nagita Slavina (歌手/俳優) - Instagram 7610万、YouTube 2620万、TikTok 1530万フォロワー"], image: "https://id-live-01.slatic.net/p/0f1be9ecf084bb5eca01dbc1998a8d97.jpg" },
      { name: "PURCELL", subName: "", desc: ["コスマックス素材ラボと共にマイクロバイオーム独占原料を開発し、1mLあたり20億個のプロバイオティクスがもたらす障壁超越PIXCELL BIOM™原料をメインに訴求"], image: "https://m.ceoscoredaily.com/photos/2023/12/29/2023122916012917850_l.png" }
    ]
  }
};

// --- Components ---

function LanguageSwitcher({ lang, setLang }: { lang: Lang, setLang: (l: Lang) => void }) {
  const langs: { code: Lang, label: string }[] = [
    { code: 'ko', label: 'Korean' },
    { code: 'en', label: 'English' },
    { code: 'zh', label: 'Chinese' },
    { code: 'ja', label: 'Japanese' }
  ];
  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white/80 backdrop-blur-md p-2 rounded-full shadow-sm border border-gray-100">
      {langs.map(l => (
        <button
          key={l.code}
          onClick={() => setLang(l.code)}
          className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${lang === l.code ? 'bg-[#0A2540] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string, key?: string | number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const bgY = useTransform(scrollY, [0, 1000], ['0%', '20%']);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);

  React.useEffect(() => {
    spotX.set(window.innerWidth / 2);
    spotY.set(window.innerHeight / 2);
  }, [spotX, spotY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) * 2 - 1);
    mouseY.set((clientY / innerHeight) * 2 - 1);
    spotX.set(clientX);
    spotY.set(clientY);
  };

  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);
  const smoothSpotX = useSpring(spotX, springConfig);
  const smoothSpotY = useSpring(spotY, springConfig);

  const imageX = useTransform(smoothMouseX, [-1, 1], ['-3%', '3%']);
  const imageY = useTransform(smoothMouseY, [-1, 1], ['-3%', '3%']);

  const spotlightBackground = useMotionTemplate`radial-gradient(circle 800px at ${smoothSpotX}px ${smoothSpotY}px, rgba(0,0,0,0), rgba(0,0,0,0.7))`;

  return (
    <section 
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
    >
      {/* Background Video with Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]"
      >
        <motion.div
          style={{ x: imageX, y: imageY }}
          className="w-full h-full"
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="https://a.storyblok.com/f/288782/x/54eb2e00e0/250808_cosmax-brand-film_for-web.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>

      {/* Interactive Spotlight Overlay */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: spotlightBackground }}
      />
      
      {/* Dark gradient at bottom for smooth transition to next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#F8F9FA] to-transparent z-0 pointer-events-none"></div>

      {/* Center Vertical Text and Logo */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center gap-6"
      >
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/80 z-10 pointer-events-none"
      >
        <ChevronDown size={28} />
      </motion.div>
    </section>
  );
}

function WhatIsOBM({ currentT }: { currentT: any }) {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-bold text-[#0A2540] mb-8 leading-tight">
            What is OBM?
          </h2>
          <ul className="space-y-4 text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
            <li className="flex items-start">
              <span className="mr-3 mt-2 w-2 h-2 bg-[#0A2540] rounded-full flex-shrink-0"></span>
              <span>{currentT.whatIsObmDesc}</span>
            </li>
          </ul>
        </FadeIn>
        
        <div className="relative h-[600px]">
          <FadeIn delay={0.2} className="absolute top-0 right-0 w-4/5 h-2/3 z-10">
            <div className="w-full h-full border-8 border-[#F8F9FA] shadow-2xl overflow-hidden bg-white p-2">
              <GeneratedImage 
                prompt="A person from behind, wearing a white shirt, sketching cosmetic compact designs (powder cases) on a large sheet of paper with a black pen. The desk is covered with sketches of cosmetic packaging. Bright, professional photography, shallow depth of field."
                alt="Brand Planning and Collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.4} className="absolute bottom-0 left-0 w-4/5 h-2/3 z-20">
            <div className="w-full h-full border-8 border-[#C1A68D] shadow-2xl overflow-hidden bg-white p-2">
              <GeneratedImage 
                prompt="A person in a white lab coat looking through a professional Olympus microscope in a laboratory setting. The person's hands in white gloves are adjusting the microscope stage. Clean, bright, professional laboratory photography, shallow depth of field."
                alt="R&D and Manufacturing"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function BuildingBrands({ currentT }: { currentT: any }) {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeIn>
          <h2 className="text-5xl md:text-7xl font-bold text-[#0A2540] mb-16">Our Expertise</h2>
        </FadeIn>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {currentT.expertise.map((item: any, idx: number) => {
            const titleParts = item.title.split('\n');
            return (
              <FadeIn delay={0.1 * (idx + 1)} key={idx}>
                <div className="bg-gray-100 p-8 h-full flex flex-col">
                  <h3 className="text-2xl font-bold text-[#0A2540] mb-4 text-center">
                    {titleParts[0]}
                    {titleParts.length > 1 && (
                      <>
                        <br/>
                        <span className="text-[#E31837]">{titleParts.slice(1).join('\n')}</span>
                      </>
                    )}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mt-4 whitespace-pre-line">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FadeIn delay={0.4}>
            <div className="h-64 overflow-hidden">
              <GeneratedImage 
                prompt="A high-quality, professional corporate photograph representing a brand growth partnership. A diverse team of creative professionals and business strategists collaborating in a modern, bright, minimalist office."
                alt="Brand Growth Partnership"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div className="h-64 overflow-hidden">
              <GeneratedImage 
                prompt="A high-quality photograph of a person using a laptop with AI graphics overlaid, representing data analysis and strategy."
                alt="AI Strategy"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.6}>
            <div className="h-64 overflow-hidden">
              <GeneratedImage 
                prompt="A high-quality photograph of a cosmetic product being tested or developed in a clean, modern setting."
                alt="Product Development"
                className="w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function WhatWeDo({ currentT }: { currentT: any }) {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <FadeIn>
        <h2 className="text-5xl md:text-7xl font-bold text-[#0A2540] mb-8">What We Do</h2>
        <p className="text-xl text-gray-700 mb-16 whitespace-pre-line leading-relaxed max-w-4xl">
          {currentT.whatWeDoSubtitle}
        </p>
      </FadeIn>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {currentT.pillars.map((pillar: any, idx: number) => (
          <FadeIn key={pillar.title} delay={idx * 0.15} className="group h-full">
            <div className="bg-white border-2 border-[#C1A68D] h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#C1A68D] m-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#C1A68D] m-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#C1A68D] m-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#C1A68D] m-1 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="h-48 overflow-hidden">
                <img 
                  src={pillar.image} 
                  alt={pillar.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-[#0A2540] mb-4 leading-tight">
                  {pillar.title}
                </h3>
                <div className="w-12 h-1 bg-[#C1A68D] mb-4"></div>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                  {pillar.desc}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Process({ currentT }: { currentT: any }) {
  const containerRef = useRef(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section className="py-32 bg-[#FFFDF9] overflow-hidden border-y border-[#C1A68D]/30" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
        <FadeIn>
          <h2 className="text-4xl md:text-6xl font-bold text-[#0A2540] mb-4">What We Offer</h2>
          <ul className="space-y-2 text-xl text-gray-700 mt-8">
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-1.5 h-1.5 bg-[#0A2540] rounded-full flex-shrink-0"></span>
              <span>{currentT.whatWeOfferOBM}</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-2 w-1.5 h-1.5 bg-[#0A2540] rounded-full flex-shrink-0"></span>
              <span>{currentT.whatWeOfferODM}</span>
            </li>
          </ul>
        </FadeIn>
      </div>
      
      <div className="relative py-24 overflow-hidden">
        <motion.div 
          style={{ x }}
          className="flex justify-center items-center min-w-max px-12 md:px-24"
        >
          {currentT.processSteps.map((step: any, idx: number) => (
            <div 
              key={idx} 
              className={`relative flex flex-col items-center group cursor-pointer ${idx !== 0 ? '-ml-12 md:-ml-16' : ''}`}
              onMouseEnter={() => setHoveredStep(idx)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              {/* Top Line to next circle */}
              {idx < currentT.processSteps.length - 1 && (
                <div className="absolute top-0 left-1/2 w-[9rem] md:w-[11rem] h-[1px] bg-[#111] z-0"></div>
              )}
              
              {/* Bottom Line to next circle */}
              {idx >= 3 && idx < currentT.processSteps.length - 1 && (
                <div className="absolute bottom-0 left-1/2 w-[9rem] md:w-[11rem] h-[1px] bg-[#E5E5E5] z-0"></div>
              )}

              {/* Top Dot */}
              <div className="absolute top-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#111] z-20"></div>
              
              {/* Bottom Dot */}
              {idx >= 3 && (
                <div className="absolute bottom-[-3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E5E5E5] z-20"></div>
              )}

              {/* OBM Badge */}
              {idx === 0 && (
                <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#111] text-white flex items-center justify-center text-xs font-bold z-30">
                  OBM
                </div>
              )}

              {/* ODM Badge */}
              {idx === 4 && (
                <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#E5E5E5] text-[#111] flex items-center justify-center text-xs font-bold z-30">
                  ODM
                </div>
              )}

              {/* Circle */}
              <motion.div 
                animate={{ 
                  scale: hoveredStep === idx ? 1.05 : 1,
                  backgroundColor: hoveredStep === idx ? '#0A2540' : 'transparent',
                  borderColor: hoveredStep === idx ? '#0A2540' : '#111',
                  boxShadow: hoveredStep === idx ? '0 20px 25px -5px rgba(10, 37, 64, 0.2), 0 10px 10px -5px rgba(10, 37, 64, 0.1)' : 'none'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`w-48 h-48 md:w-60 md:h-60 rounded-full border flex items-center justify-center relative z-10 overflow-hidden`}
              >
                {/* Inner Faint Circle for 4, 5, 6 */}
                {idx >= 3 && (
                  <div className={`absolute w-[90%] h-[90%] rounded-full border transition-colors duration-300 ${hoveredStep === idx ? 'border-white/20' : 'border-[#E5E5E5]'} z-0`}></div>
                )}
                
                <span className={`text-base md:text-lg font-medium z-20 text-center px-4 relative transition-colors duration-300 ${hoveredStep === idx ? 'text-white' : 'text-[#111]'}`}>
                  {step.name}
                </span>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-16 h-48 flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {hoveredStep !== null ? (
            <motion.div
              key={hoveredStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-gray-700 text-base md:text-lg leading-relaxed whitespace-pre-line"
            >
              <h3 className="text-2xl font-bold text-[#0A2540] mb-4">{currentT.processSteps[hoveredStep].name}</h3>
              {currentT.processSteps[hoveredStep].desc}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-400 text-lg italic"
            >
              {currentT.processHoverText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ImageSlider({ images, alt, viewCaseText }: { images: string[], alt: string, viewCaseText: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 1500); // Change image every 1.5 seconds
    } else {
      setCurrentIndex(0); // Reset to first image when not hovered
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <div 
      className="relative h-64 overflow-hidden mb-6 bg-gray-100 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
        <span className="text-white font-bold tracking-widest uppercase border border-white px-4 py-2 backdrop-blur-sm">{viewCaseText}</span>
      </div>
      
      {/* Slider indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {images.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-white' : 'w-1.5 bg-white/50'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SuccessCases({ currentT }: { currentT: any }) {
  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9IiNlNWU3ZWIiLz48L3N2Zz4=')]">
      <FadeIn>
        <h2 className="text-5xl md:text-7xl font-bold text-[#0A2540] mb-16 inline-block pr-8">{currentT.successCasesTitle}</h2>
      </FadeIn>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentT.cases.map((item: any, idx: number) => (
          <FadeIn key={item.name} delay={idx * 0.1} className="group">
            <div className="bg-white p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full flex flex-col">
              {item.prompt ? (
                <div className="relative h-64 overflow-hidden mb-6 bg-gray-100">
                  <GeneratedImage 
                    prompt={item.prompt} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-bold tracking-widest uppercase border border-white px-4 py-2 backdrop-blur-sm">{currentT.viewCase}</span>
                  </div>
                </div>
              ) : item.images ? (
                <ImageSlider images={item.images} alt={item.name} viewCaseText={currentT.viewCase} />
              ) : (
                <div className="relative h-64 overflow-hidden mb-6 bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-bold tracking-widest uppercase border border-white px-4 py-2 backdrop-blur-sm">{currentT.viewCase}</span>
                  </div>
                </div>
              )}
              <div className="flex-grow">
                <div className="inline-block bg-gray-100 px-4 py-2 rounded-sm mb-4">
                  <h3 className="text-xl font-bold text-[#0A2540]">{item.name}</h3>
                  {item.subName && <p className="text-sm text-gray-500 mt-1">{item.subName}</p>}
                </div>
                <ul className="space-y-3">
                  {item.desc.map((line: string, i: number) => (
                    <li key={i} className="flex items-start text-sm text-gray-600 leading-relaxed">
                      <span className="mr-2 mt-1.5 w-1 h-1 bg-[#C1A68D] rounded-full flex-shrink-0"></span>
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0A2540] text-white py-12 border-t-4 border-[#C1A68D]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-light tracking-[0.3em] mb-2">COSMAX</h2>
          <p className="text-gray-400 text-sm">The science of beauty.</p>
        </div>
        <div className="text-sm text-gray-400 text-center md:text-right">
          <p>CONFIDENTIAL DOCUMENT</p>
          <p className="mt-2">&copy; {new Date().getFullYear()} COSMAX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function OurSolutions({ currentT }: { currentT: any }) {
  const [hoveredCol, setHoveredCol] = useState<'build' | 'select' | null>(null);

  return (
    <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <FadeIn>
        <div className="border-b border-red-600 pb-4 mb-8">
          <h2 className="text-4xl md:text-5xl font-medium text-black">{currentT.solutionsHeader.title}</h2>
        </div>
        <ul className="space-y-2 text-lg text-black mb-16 font-medium">
          <li className="flex items-center">
            <span className="mr-2 w-1 h-1 bg-black rounded-full flex-shrink-0"></span>
            <span>{currentT.solutionsHeader.desc1}</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 w-1 h-1 bg-black rounded-full flex-shrink-0"></span>
            <span>{currentT.solutionsHeader.desc2}</span>
          </li>
        </ul>
      </FadeIn>

      <div className="w-full overflow-x-auto pb-12 pt-4">
        <div className="min-w-[800px] flex flex-col gap-4 relative" onMouseLeave={() => setHoveredCol(null)}>
          {/* Header Row */}
          <div className="flex gap-4">
            <div className="w-24 flex-shrink-0"></div>
            <div
              className={`flex-1 text-center py-4 text-xl font-bold rounded-xl transition-all duration-500 cursor-pointer ${
                hoveredCol === 'build'
                  ? 'bg-[#0A2540] text-white shadow-xl scale-[1.02] z-10'
                  : hoveredCol === 'select'
                  ? 'bg-[#808080] text-white/70 opacity-60'
                  : 'bg-[#808080] text-white hover:bg-[#666666]'
              }`}
              onMouseEnter={() => setHoveredCol('build')}
            >
              {currentT.solutionsHeader.build}
            </div>
            <div
              className={`flex-1 text-center py-4 text-xl font-bold rounded-xl transition-all duration-500 cursor-pointer ${
                hoveredCol === 'select'
                  ? 'bg-[#0A2540] text-white shadow-xl scale-[1.02] z-10'
                  : hoveredCol === 'build'
                  ? 'bg-[#808080] text-white/70 opacity-60'
                  : 'bg-[#808080] text-white hover:bg-[#666666]'
              }`}
              onMouseEnter={() => setHoveredCol('select')}
            >
              {currentT.solutionsHeader.select}
            </div>
          </div>

          {/* Rows */}
          {currentT.solutionsData.map((row: any, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              className="flex gap-4"
            >
              <div className="w-24 flex-shrink-0 bg-[#F8F9FA] border border-gray-200 flex items-center justify-center font-bold text-[#0A2540] rounded-xl shadow-sm py-6 text-center whitespace-pre-line">
                {row.label}
              </div>
              <div
                className={`flex-1 flex items-center justify-center text-center rounded-xl py-6 px-6 leading-relaxed whitespace-pre-line transition-all duration-500 cursor-pointer ${
                  hoveredCol === 'build'
                    ? 'bg-white text-[#0A2540] shadow-xl scale-[1.02] z-10 border-2 border-[#0A2540]/10 font-medium'
                    : hoveredCol === 'select'
                    ? 'bg-[#F2F2F2] text-gray-400 opacity-60'
                    : 'bg-[#F2F2F2] text-black hover:bg-[#E8E8E8]'
                }`}
                onMouseEnter={() => setHoveredCol('build')}
              >
                {row.build}
              </div>
              <div
                className={`flex-1 flex items-center justify-center text-center rounded-xl py-6 px-6 leading-relaxed whitespace-pre-line transition-all duration-500 cursor-pointer ${
                  hoveredCol === 'select'
                    ? 'bg-white text-[#0A2540] shadow-xl scale-[1.02] z-10 border-2 border-[#0A2540]/10 font-medium'
                    : hoveredCol === 'build'
                    ? 'bg-[#F2F2F2] text-gray-400 opacity-60'
                    : 'bg-[#F2F2F2] text-black hover:bg-[#E8E8E8]'
                }`}
                onMouseEnter={() => setHoveredCol('select')}
              >
                {row.select}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompanyWatermark() {
  return (
    <div className="fixed top-4 left-4 z-50 flex items-center bg-white/90 backdrop-blur-md px-4 py-3 rounded-full shadow-sm border border-gray-200/50">
      <CosmaxLogo className="h-5 w-auto" textColor="#1A1A1A" />
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>('ko');
  const currentT = t[lang];

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-sans selection:bg-[#C1A68D] selection:text-white">
      <CompanyWatermark />
      <LanguageSwitcher lang={lang} setLang={setLang} />
      <Hero />
      <WhatIsOBM currentT={currentT} />
      <WhatWeDo currentT={currentT} />
      <Process currentT={currentT} />
      <BuildingBrands currentT={currentT} />
      <SuccessCases currentT={currentT} />
      <OurSolutions currentT={currentT} />
      <Footer />
    </div>
  );
}
