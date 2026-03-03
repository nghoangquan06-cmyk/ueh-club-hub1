import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  Bell as BellIcon, 
  User, 
  Home, 
  BookOpen, 
  History, 
  PlusCircle, 
  Settings, 
  HelpCircle, 
  Globe, 
  MessageSquare, 
  ChevronRight,
  Edit2,
  ExternalLink,
  Users,
  Trophy,
  Heart,
  Music,
  Camera,
  Target,
  Grid,
  Filter,
  X,
  Check,
  Star,
  Award,
  Layers,
  Calendar,
  Zap,
  TrendingUp,
  Sparkles,
  Send,
  MoreHorizontal,
  ThumbsUp,
  Share2,
  MessageCircle,
  Save,
  RotateCcw,
  Compass,
  Briefcase,
  Mic2,
  BarChart3,
  Image as ImageIcon,
  Flame,
  Library, // Icon mới cho Bộ sưu tập
  MapPin,
  Clock,
  ArrowRight,
  Plus,
  Palette,
  Smile,
  Rocket
} from 'lucide-react';

// UEH Identity Colors (Matched to UEH Mekong Logo style)
const UEH_PRIMARY = '#005f6b'; // Teal đậm
const UEH_ACCENT = '#f06400';  // Cam rực

// Dữ liệu mẫu CLB
const INITIAL_CLUB_DATA = [
  {
    id: 'bell',
    name: 'CLB Anh Văn BELL',
    fullName: 'Business English for Learners and Lovers',
    founded: '1995',
    category: 'Học thuật',
    tags: ['tiếng anh', 'học thuật', 'năng động', 'kết nối', 'kỹ năng mềm', 'sự kiện', 'giao lưu quốc tế', 'sinh viên', 'cuộc thi', 'ngoại ngữ'],
    motto: 'Live English – Experience Yourself',
    shortDesc: 'Câu lạc bộ Anh văn lâu đời nhất UEH, cái nôi rèn luyện tiếng Anh chuyên ngành và kỹ năng mềm.',
    longDesc: 'Được thành lập từ năm 1995, BELL Club tự hào là một trong những CLB học thuật lớn mạnh nhất tại UEH. Với sứ mệnh tạo ra môi trường rèn luyện tiếng Anh năng động, BELL không chỉ giúp sinh viên xóa bỏ rào cản ngôn ngữ mà còn trang bị những kỹ năng thực chiến thông qua các dự án lớn. "Live English – Experience Yourself" chính là kim chỉ nam cho mọi hoạt động của chúng tôi suốt gần 3 thập kỷ qua.',
    coreValues: [
      { key: 'B', name: 'Bonding', desc: 'Sự gắn kết bền chặt như gia đình giữa các thế hệ thành viên.' },
      { key: 'E', name: 'English', desc: 'Môi trường sử dụng tiếng Anh chuyên nghiệp và thường xuyên.' },
      { key: 'L', name: 'Learning', desc: 'Tinh thần học hỏi không ngừng từ thực tế và các chuyên gia.' },
      { key: 'L', name: 'Liveliness', desc: 'Sự trẻ trung, nhiệt huyết và sáng tạo trong từng dự án.' }
    ],
    board: [
      { role: 'Chủ nhiệm', name: 'Lê Đoàn Đan Vi', term: '2024 - 2025' },
      { role: 'Phó Chủ nhiệm', name: 'Nguyễn Hà Uyển Chi', term: '2024 - 2025' },
      { role: 'Phó Chủ nhiệm', name: 'Nguyễn Trịnh Lan Phương', term: '2024 - 2025' }
    ],
    stats: [
      { label: 'Hoạt động', value: '29 năm', icon: Calendar, color: 'text-teal-600' },
      { label: 'Thành viên', value: '150+', icon: Users, color: 'text-orange-600' },
      { label: 'Dự án lớn', value: '04/năm', icon: Zap, color: 'text-yellow-600' },
      { label: 'Fanpage', value: '80k+', icon: Globe, color: 'text-blue-500' }
    ],
    departments: [
      { name: 'Ban Chuyên môn (Specialist)', desc: 'Bộ não của CLB - Phụ trách soạn thảo đề thi, nội dung học thuật cho các cuộc thi và workshop.' },
      { name: 'Ban Truyền thông (Communication)', desc: 'Tiếng nói của CLB - Sáng tạo nội dung, thiết kế ấn phẩm và quản lý các kênh mạng xã hội.' },
      { name: 'Ban Nhân sự (HR)', desc: 'Trái tim của CLB - Quản lý thành viên, tuyển dụng và xây dựng văn hóa gắn kết nội bộ.' },
      { name: 'Ban Đối ngoại (External Relations)', desc: 'Cánh tay nối dài - Tìm kiếm tài trợ, kết nối diễn giả và các đối tác doanh nghiệp.' }
    ],
    activities: [
      { name: 'Race for Knowledge (R4K)', desc: 'Cuộc thi học thuật tiếng Anh chuyên ngành Kinh tế quy mô toàn thành phố.' },
      { name: 'EngNet (English Network)', desc: 'Ngày hội kết nối các CLB tiếng Anh trên địa bàn TP.HCM.' },
      { name: 'BELL\'s English Mock Test', desc: 'Kỳ thi thử TOEIC/IELTS với format chuẩn quốc tế.' }
    ],
    website: 'https://www.bellclubueh.net/',
    image: 'https://www.bellclubueh.net/wp-content/uploads/2020/04/LOGO-BELL_Black.png', 
    popular: true 
  },
  {
    id: 'scue',
    name: 'CLB Chứng Khoán SCUE',
    fullName: 'Securities Club of University of Economics',
    founded: '1999',
    category: 'Học thuật',
    tags: ['tài chính', 'chứng khoán', 'đầu tư', 'học thuật', 'phân tích', 'kinh tế', 'thực chiến', 'sàn giao dịch', 'ngân hàng'],
    motto: 'Vững bước nhà đầu tư',
    shortDesc: 'Cái nôi đào tạo những nhà đầu tư tài chính bản lĩnh và chuyên nghiệp tương lai.',
    longDesc: 'SCUE là CLB học thuật hàng đầu về lĩnh vực Tài chính - Chứng khoán tại miền Nam. Nơi sinh viên được trải nghiệm cảm giác đầu tư thực tế "tiền thật - lỗ thật" (qua mô phỏng) và các cuộc thi phân tích đầu tư chuyên sâu.',
    coreValues: [
      { key: 'P', name: 'Professional', desc: 'Chuyên nghiệp trong phân tích.' },
      { key: 'D', name: 'Dynamic', desc: 'Năng động nắm bắt các xu hướng.' }
    ],
    board: [
      { role: 'Chủ nhiệm', name: 'Nguyễn Văn A', term: '2024 - 2025' }
    ],
    stats: [
      { label: 'Hoạt động', value: '25 năm', icon: Calendar, color: 'text-green-600' },
      { label: 'Dự án', value: '15+', icon: Zap, color: 'text-yellow-600' }
    ],
    departments: [
      { name: 'Ban Phân tích', desc: 'Nghiên cứu thị trường và mã cổ phiếu.' },
      { name: 'Ban Sự kiện', desc: 'Tổ chức sàn giao dịch ảo.' }
    ],
    activities: [
      { name: 'Sàn Giao Dịch Ảo (SSE)', desc: 'Sân chơi mô phỏng thị trường chứng khoán thực tế lớn nhất dành cho sinh viên.' },
      { name: 'SCUE Contest', desc: 'Cuộc thi phân tích đầu tư chứng khoán uy tín.' }
    ],
    website: 'https://scue.vn/',
    image: 'https://scue.vn/wp-content/uploads/logo-scue.png', 
    popular: true 
  },
  {
    id: 'a2c',
    name: 'CLB Kế toán - Kiểm toán A²C',
    fullName: 'Accounting and Auditing Club',
    founded: '1999',
    category: 'Học thuật',
    tags: ['kế toán', 'kiểm toán', 'học thuật', 'chuyên nghiệp', 'big4', 'tài chính', 'kỹ năng', 'acca', 'cpa'],
    motto: 'Integrity - Professionalism',
    shortDesc: 'Nơi ươm mầm những tài năng Kế toán - Kiểm toán chuyên nghiệp, cầu nối tới Big4.',
    longDesc: 'A²C là cầu nối vững chắc giữa sinh viên và các doanh nghiệp kiểm toán hàng đầu (Big4). CLB tập trung vào việc trau dồi kiến thức chuyên ngành ACCA/CPA, kỹ năng hành nghề và đạo đức nghề nghiệp.',
    coreValues: [
      { key: 'I', name: 'Integrity', desc: 'Chính trực - Phẩm chất cốt lõi.' },
      { key: 'P', name: 'Professional', desc: 'Chuyên nghiệp trong tác phong.' }
    ],
    board: [],
    stats: [
      { label: 'Hoạt động', value: '25 năm', icon: Calendar, color: 'text-blue-500' }
    ],
    departments: [
      { name: 'Ban Học thuật', desc: 'Xây dựng kiến thức chuyên ngành.' }
    ],
    activities: [
      { name: 'AKKOLOGY', desc: 'Cuộc thi học thuật Kế - Kiểm quy mô toàn thành.' },
      { name: 'CPA Tiềm năng', desc: 'Tìm kiếm ứng viên tài năng cho các firm kiểm toán.' }
    ],
    website: 'https://youth.ueh.edu.vn/',
    image: 'https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/481261593_1055541583277240_2753613095512142357_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeHVMncGQemvsZ4bzxF0M6FzfHCKAzANClR8cIoDMA0KVK_lPYZlgtaad-48K28rDfwj7u0NuAGoqp3aqDkwgdoB&_nc_ohc=3akIyyybidoQ7kNvwHf-G1J&_nc_oc=Adkkha85B5JYxnbR017o-hiBeRxTAmPd4skoK5lYdT35Gpu-pkmcgrFZ9CDNYOSE1kQ&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=VRAudOjMfcqMZ1OW3qUozw&oh=00_Afv62GFaQ44xIbqb3SLhfru6jldD55gzil_r5tDr09EJtQ&oe=69A6D7F6', 
    popular: false
  },
  {
    id: 'scomm',
    name: 'S Communications',
    fullName: 'Nhóm Truyền thông Sinh viên',
    founded: '1999',
    category: 'Truyền thông',
    tags: ['truyền thông', 'sáng tạo', 'năng động', 'kỹ năng', 'nhiếp ảnh', 'video', 'content', 'design', 'marketing', 'báo chí'],
    motto: 'Kết nối - Lan tỏa',
    shortDesc: 'Đơn vị truyền thông sinh viên lớn nhất và đầu tiên tại UEH, "ông trùm" tin tức.',
    longDesc: 'S Communications là "ngôi nhà" của những bạn trẻ đam mê sáng tạo nội dung, nhiếp ảnh, quay phim. Chúng tôi sở hữu các kênh thông tin sinh viên lớn nhất UEH và là đơn vị bảo trợ truyền thông cho hàng loạt sự kiện lớn nhỏ.',
    coreValues: [],
    board: [],
    stats: [
      { label: 'Fanpage', value: '100k+', icon: Users, color: 'text-blue-600' }
    ],
    departments: [
      { name: 'Ban Biên tập', desc: 'Sáng tạo nội dung (Content).' },
      { name: 'Ban Kỹ thuật', desc: 'Chụp ảnh, quay dựng (Production).' }
    ],
    activities: [
      { name: 'Dự án "Chuyện"', desc: 'Chuỗi bài viết/video lan tỏa cảm hứng sống tích cực.' },
      { name: 'UEH Youth Awards', desc: 'Bảo trợ truyền thông độc quyền.' }
    ],
    website: 'https://youth.ueh.edu.vn/',
    image: 'https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/522971826_1177248301111111_8960627657106377087_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeFOQi15L181lQXmNRb0iTzSrFFcUyzlRJKsUVxTLOVEktz-SS5mIxt9sAE9-3xAph_IFE8btjip_w2rYPgGq6XH&_nc_ohc=CEviuN7bsjUQ7kNvwGNA6WU&_nc_oc=AdkV9_PiaWwIiE6QsMdMWuQw7938iGP8Jpiu5KuMgsCa9M1WCnGGwcDy2fOmiPP0HyU&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=jNy_y5CzroO4Buqdf4d44Q&oh=00_Afv6wmd3w1mbQ-PHqSdpamwoLtyPDlbSt_k4Djq_mChWOw&oe=69A6F0B4', 
    popular: false
  },
  {
    id: 'ssg',
    name: 'Nhóm Hỗ trợ Sinh viên SSG',
    fullName: 'Supporting Students Group',
    founded: '2007',
    category: 'Kỹ năng',
    tags: ['hỗ trợ', 'kỹ năng', 'sinh viên', 'tình nguyện', 'đời sống', 'nhà trọ', 'tư vấn', 'thiện nguyện', 'cộng đồng'],
    motto: 'Hỗ trợ - Chia sẻ - Đồng hành',
    shortDesc: 'Người bạn đồng hành tin cậy trong đời sống, nhà trọ và học tập của sinh viên UEH.',
    longDesc: 'SSG chuyên tổ chức các hoạt động hỗ trợ đời sống sinh viên như tư vấn nhà trọ (phần mềm quản lý nhà trọ), rèn luyện kỹ năng mềm và các chương trình thiện nguyện ý nghĩa hướng về cộng đồng.',
    coreValues: [],
    board: [],
    stats: [
      { label: 'Hoạt động', value: '17 năm', icon: Calendar, color: 'text-green-500' }
    ],
    departments: [
      { name: 'Ban Sự kiện', desc: 'Tổ chức các chương trình hỗ trợ.' }
    ],
    activities: [
      { name: 'Tiếp sức mùa thi', desc: 'Hỗ trợ sĩ tử và tân sinh viên nhập học.' },
      { name: 'CHEM Bookshelf', desc: 'Tủ sách chia sẻ tri thức và giáo trình.' }
    ],
    website: 'https://youth.ueh.edu.vn/',
    image: 'https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/481517764_630349586282024_6621808498353344437_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeER8jPWgXqRAcWSZx0P9gr7Nv9B8LRavuE2_0HwtFq-4SfMoJ297iGIB7IpHiQMy65oOdm_JlcFLClTONon5vXn&_nc_ohc=NNg5AsjqfasQ7kNvwEMm862&_nc_oc=AdmOqcFMvk7C0TK2EvtpvfOP0sDvwRr2eTzsutU2GcQjTJ3GInhIa_GApGIcxHVF1rI&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=XhTMSfh4KaDi-LvVZtuQlg&oh=00_Afu5vi2KCQdbyh95hDXQcRMHZ3f59mV0A21rrjhvL9ar0Q&oe=69A6E0CC', 
    popular: false
  },
  {
    id: 'gdt',
    name: 'CLB Giai Điệu Trẻ',
    fullName: 'Giai Dieu Tre Club',
    founded: '2007',
    category: 'Nghệ thuật',
    tags: ['âm nhạc', 'nghệ thuật', 'ca hát', 'biểu diễn', 'vũ đạo', 'nhạc cụ', 'sân khấu', 'sự kiện', 'giải trí'],
    motto: 'Thỏa đam mê - Cháy hết mình',
    shortDesc: 'Sân chơi âm nhạc chuyên nghiệp, nơi các tài năng nghệ thuật tỏa sáng trên sân khấu.',
    longDesc: 'Giai Điệu Trẻ là nơi quy tụ những giọng ca, vũ công và nhạc công tài năng của UEH. CLB thường xuyên tổ chức các đêm nhạc hội quy mô, liveshow hoành tráng và biểu diễn tại các sự kiện lớn của trường.',
    coreValues: [],
    board: [],
    stats: [
      { label: 'Show diễn', value: '100+', icon: Music, color: 'text-purple-500' }
    ],
    departments: [
      { name: 'Đội Hát (Vocal)', desc: 'Đào tạo kỹ thuật thanh nhạc và biểu diễn.' },
      { name: 'Đội Nhảy (Dance)', desc: 'Biên đạo và trình diễn các tiết mục vũ đạo.' },
      { name: 'Đội Nhạc cụ (Band)', desc: 'Chơi nhạc cụ cho các band nhạc acoustic/rock.' }
    ],
    activities: [
      { name: 'GET DOWNTOWN', desc: 'Live Concert thường niên cực "cháy" thu hút hàng ngàn khán giả.' },
      { name: 'Acoustic Night', desc: 'Đêm nhạc giao lưu ấm cúng hàng tháng.' }
    ],
    website: 'https://youth.ueh.edu.vn/',
    image: 'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/634718951_1389067749915796_8225073075027758123_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeG-aKI6V8ghatx1NClneo4-9K2im2MeTxj0raKbYx5PGFxm33-_kg9BCZ_mjm04ZTNeRWen32z3g0eU13ewbUCd&_nc_ohc=Lsfp5_NlzNsQ7kNvwEKJV0m&_nc_oc=Adkkg7frYFoAm3mOKpJ-VB2y_xSUxHBv5Nf55RDpmrOm7VRz-8ub8zzuhY-tZ0eztu0&_nc_zt=23&_nc_ht=scontent.fsgn5-8.fna&_nc_gid=r7MS-r3ASncR9d1N4KIlBw&oh=00_Afus1-yShgQlGXXVhonIGfNw0Hs_fxtHbI9k2EXFJ1LipA&oe=69A6CDC8', 
    popular: false
  },
  {
    id: 'hurea',
    name: 'CLB Nhân sự HuReA',
    fullName: 'Human Resources Association',
    founded: '2002',
    category: 'Học thuật',
    tags: ['nhân sự', 'quản trị', 'kết nối', 'học thuật', 'tuyển dụng', 'đào tạo', 'con người', 'headhunter'],
    motto: 'Passion for People',
    shortDesc: 'Môi trường thực chiến cho sinh viên đam mê lĩnh vực Quản trị Nhân sự (HR).',
    longDesc: 'HuReA là nơi sinh viên được tiếp cận với các kiến thức nhân sự thực tế, quy trình tuyển dụng, C&B và phát triển con người thông qua các workshop, talkshow và cuộc thi chuyên ngành.',
    coreValues: [],
    board: [],
    stats: [
      { label: 'Hoạt động', value: '22 năm', icon: Calendar, color: 'text-pink-500' }
    ],
    departments: [
      { name: 'Ban Nhân sự', desc: 'Thực hành quy trình HR nội bộ.' }
    ],
    activities: [
      { name: 'Decoding HR Matrix', desc: 'Cuộc thi giải mã ma trận nhân sự thực tế.' },
      { name: 'HR Insider', desc: 'Chuỗi bài viết chuyên môn về nghề nhân sự.' }
    ],
    website: 'https://youth.ueh.edu.vn/',
    image: 'https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/622890230_1530042365788758_4216679761357278164_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeGdLl2fDqY83vQ8ks0YiJM4fButq2x76iV8G62rbHvqJbNwc4dscDp4jDrMKcIaQwHoDGtJzxl7ZC_jVst727KT&_nc_ohc=lNEA9dZW2wQQ7kNvwH3OZ8x&_nc_oc=Admdq-LNWoxkWz03imW5mft0uhn6zeutdHR9ExIq1FVjtp069HfYlczl4o4vgN7vj5Q&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=oDvGct2h3UxdqAPfySgKaQ&oh=00_AfsMTQblCmHSIY5Th4BuEYSuywkF8xXdx7jyxqpmaimn5g&oe=69A6D5FB', 
    popular: false
  },
  {
    id: 'ibc',
    name: 'IBC UEH',
    fullName: 'International Business Club',
    founded: '2005',
    category: 'Học thuật',
    tags: ['kinh doanh', 'kết nối', 'học thuật', 'toàn cầu', 'quốc tế', 'ngoại thương', 'case study', 'xuất nhập khẩu', 'logistics'],
    motto: 'Breath of Life',
    shortDesc: 'Nơi đem "hơi thở cuộc sống" vào giảng đường cho sinh viên kinh doanh quốc tế.',
    longDesc: 'IBC tập trung vào việc phát triển tư duy kinh doanh quốc tế, kiến thức ngoại thương và Logistics thông qua các cuộc thi giải case study, tham quan doanh nghiệp và dự án mô phỏng.',
    coreValues: [],
    board: [],
    stats: [
      { label: 'Hoạt động', value: '19 năm', icon: Calendar, color: 'text-teal-600' }
    ],
    departments: [],
    activities: [
      { name: 'I-Knowledge-Globe', desc: 'Đấu trường kiến thức kinh tế và thương mại quốc tế.' }
    ],
    website: 'https://youth.ueh.edu.vn/',
    image: 'https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/451988889_895903925917511_7938160699143163470_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeGHp_ufYpA6A_Cj1ciY2_trNKK8twetO_M0ory3B60784Uh1UOqfNstXtgmU6xcvwFw9mE_wf1dFGhcFaSRd2RK&_nc_ohc=p8K0BxRKZ2AQ7kNvwFNR0zr&_nc_oc=AdlxYWLOEYb0BSpMBV3Asc6Tyx7_75odKFIA6NrtWKwxrTqLMgRU0ruLRoAeFr1_270&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=3c4ygR71Em5ZkdRQ7fIrZQ&oh=00_AfuTYFFAzJIg8jdw_lfEXalXjbdL33VIf9VhQi4Uolbs5A&oe=69A6F5AD', 
    popular: false
  },
  {
    id: 'margroup',
    name: 'Margroup',
    fullName: 'Marketing Group',
    founded: '1994',
    category: 'Học thuật',
    tags: ['marketing', 'sáng tạo', 'học thuật', 'chuyên nghiệp', 'thương hiệu', 'digital', 'event', 'truyền thông', 'agency'],
    motto: 'World Class Marketing',
    shortDesc: 'CLB Marketing danh tiếng với các cuộc thi quy mô toàn quốc, cái nôi của Marketer.',
    longDesc: 'Margroup là cái nôi của những Marketer tài năng, nổi tiếng with sự chuyên nghiệp, tiên phong trong các xu hướng Marketing và tổ chức các sự kiện đình đám. Là nơi bạn hiện thực hóa những ý tưởng táo bạo nhất.',
    coreValues: [],
    board: [],
    stats: [
      { label: 'Hoạt động', value: '30 năm', icon: Calendar, color: 'text-indigo-600' }
    ],
    departments: [],
    activities: [
      { name: 'CMO Council', desc: 'Cuộc thi Marketing uy tín dành cho sinh viên toàn quốc.' }
    ],
    website: 'https://margroup.edu.vn/',
    image: 'https://scontent.fsgn5-14.fna.fbcdn.net/v/t39.30808-6/380815998_707184361440524_8505755883534240904_n.png?stp=dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=53a332&_nc_eui2=AeEYZRPWB1syMXFOVXv4u4MG1HvA07fsHq7Ue8DTt-weruIomj_L2YS_VYQZgf05UTjjP6h41YpaCxoW9pIBgFpW&_nc_ohc=dKJVMgS7eIEQ7kNvwFjmUVu&_nc_oc=Adl-MBuzYjxnUv5Zwg9YryHNKwn9G2wk9BlPD5-6YVOidRJFozk6BJXw4gGBONeiMd4&_nc_zt=23&_nc_ht=scontent.fsgn5-14.fna&_nc_gid=P46PS2HF4C5PA0DLI7LgCQ&oh=00_AfvclNlGe0yjSpLuEDJroZ_nB0eimTrMjyx9EGgmx-apTw&oe=69A6C519', 
    popular: true 
  }
];

// Dữ liệu mẫu Bộ Sưu Tập - Chứa COMPONENT Icons, không phải JSX Elements để tránh lỗi
const INITIAL_COLLECTIONS_DATA = [
  { 
    id: 1, 
    title: 'Hội "Săn" Học Bổng', 
    desc: 'Những CLB học thuật "gắt" nhất UEH, lò luyện kỹ năng chinh phục các tập đoàn đa quốc gia.', 
    color: 'bg-blue-600',
    icon: Trophy,
    clubs: ['bell', 'scue', 'ibc']
  },
  { 
    id: 2, 
    title: 'Trạm Sạc "Chữa Lành"', 
    desc: 'Nơi dành cho tâm hồn nghệ sĩ & tình nguyện, cân bằng lại áp lực deadline.', 
    color: 'bg-green-600',
    icon: Heart,
    clubs: ['gdt', 'ssg']
  },
  { 
    id: 3, 
    title: 'Lò Đào Tạo KOLs', 
    desc: 'Truyền thông, MC, sự kiện cực hot. Nơi bạn tỏa sáng và xây dựng thương hiệu cá nhân.', 
    color: 'bg-purple-600',
    icon: Camera,
    clubs: ['scomm', 'margroup']
  },
  { 
    id: 4, 
    title: 'Biệt Đội "Bào" Giải', 
    desc: 'Chuyên trị các cuộc thi Business Case từ cấp trường đến cấp quốc gia.', 
    color: 'bg-red-600',
    icon: Award,
    clubs: ['a2c', 'scue', 'margroup']
  },
  { 
    id: 5, 
    title: 'Khởi Nghiệp & Đổi Mới', 
    desc: 'Dành cho những CEO tương lai, nơi ươm mầm các ý tưởng startup táo bạo.', 
    color: 'bg-orange-500',
    icon: Rocket,
    clubs: ['ibc', 'hurea']
  },
];

const INITIAL_DISCUSS_DATA = [
  {
    id: 1,
    user: 'KinhTe_Boi',
    avatar: 'K',
    time: '2 giờ trước',
    tag: 'Tuyển dụng',
    content: 'Mọi người ơi, CLB BELL còn đang tuyển thành viên nòng cốt không ạ? Mình lỡ đợt vừa rồi rồi...',
    likes: 12,
    comments: 5
  },
  {
    id: 2,
    user: 'GenZ_UEH',
    avatar: 'G',
    time: '5 giờ trước',
    tag: 'Review',
    content: 'Review cho mấy bạn K50: CLB IBC cực kỳ xịn cho những ai muốn đi theo mảng Case Study nhé. Team support rất nhiệt tình luôn!',
    likes: 45,
    comments: 18
  },
  {
    id: 3,
    user: 'AnhVăn_Lover',
    avatar: 'A',
    time: 'Hôm qua',
    tag: 'Thảo luận',
    content: 'Kỳ thi thử EngNet sắp tới format có khó hơn năm ngoái không các tiền bối BELL ơi?',
    likes: 8,
    comments: 3
  },
  {
    id: 4,
    user: 'Marketing_K50',
    avatar: 'M',
    time: '12 giờ trước',
    tag: 'Sự kiện',
    content: 'Cuộc thi CMO của Margroup năm nay có cho phép thi theo nhóm lẻ không mọi người?',
    likes: 21,
    comments: 7
  }
];

const FILTER_TAGS = ['học thuật', 'tiếng anh', 'kinh doanh', 'truyền thông', 'tình nguyện', 'kết nối', 'ca hát', 'năng động', 'sáng tạo', 'tài chính', 'nhân sự', 'nghệ thuật'];

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <div 
    onClick={onClick}
    className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-all rounded-xl mb-1 ${
      active 
        ? 'bg-[#f06400] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,0.3)] translate-x-0.5 border border-black/20' 
        : 'hover:bg-[#004b55] text-slate-200 hover:text-white hover:translate-x-1'
    }`}
  >
    <Icon size={20} strokeWidth={active ? 2.5 : 2} />
    <span className={`text-sm ${active ? 'font-bold uppercase tracking-tight' : 'font-medium'}`}>{label}</span>
  </div>
);

// Component hiển thị Placeholder Image khi chưa có ảnh
const ClubImage = ({ src, alt, className, isLogo = false }) => {
  if (!src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-slate-100 text-slate-400 ${className}`}>
        <ImageIcon size={32} className="mb-2 opacity-30" />
        <span className="text-[10px] font-bold uppercase text-center px-2 text-slate-500">{alt || 'Hình ảnh'}</span>
      </div>
    );
  }
  const fitClass = isLogo ? 'object-contain p-2' : 'object-cover';
  return (
    <img src={src} alt={alt} className={`${className} ${fitClass} bg-white transition-all duration-300`} />
  );
};

export default function App() {
  const [view, setView] = useState('home'); 
  const [clubData, setClubData] = useState(INITIAL_CLUB_DATA); 
  const [collections, setCollections] = useState(INITIAL_COLLECTIONS_DATA);
  const [discussions, setDiscussions] = useState(INITIAL_DISCUSS_DATA); // Dùng state cho discussions
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Explore');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [randomClubs, setRandomClubs] = useState([]); 
  const [selectedTags, setSelectedTags] = useState([]); // Giữ lại state để dùng cho bộ lọc ở Home

  const [isCreatingCollection, setIsCreatingCollection] = useState(false);
  const [newCollectionData, setNewCollectionData] = useState({
    title: '',
    desc: '',
    color: 'bg-blue-600',
    icon: Rocket,
    clubs: []
  });

  const [editForm, setEditForm] = useState(null);
  const [newPost, setNewPost] = useState('');

  // Khởi tạo danh sách ngẫu nhiên
  useEffect(() => {
    const shuffled = [...clubData].sort(() => 0.5 - Math.random());
    setRandomClubs(shuffled.slice(0, 4));
  }, [clubData]);

  const selectedClub = useMemo(() => 
    clubData.find(c => c.id === selectedClubId), 
  [clubData, selectedClubId]);

  const filteredClubs = useMemo(() => {
    let list = clubData;

    // Logic lọc theo Tab
    if (activeTab === 'Explore') {
      list = randomClubs; 
    } else if (activeTab === 'Most Popular') {
      list = list.filter(c => c.popular);
    } 

    // Logic lọc tìm kiếm và tags
    if (searchQuery || selectedTags.length > 0) {
        list = clubData.filter(club => {
          const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              club.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
          const matchesTags = selectedTags.length === 0 || 
                             selectedTags.some(t => club.tags.includes(t.toLowerCase())); // Ensure case insensitive matching
          return matchesSearch && matchesTags;
        }); 
    }
    return list;
  }, [searchQuery, activeTab, clubData, randomClubs, selectedTags]);

  const navigateToClub = (id) => {
    setSelectedClubId(id);
    setView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const startEditing = () => {
    if (selectedClub) {
      setEditForm({...selectedClub});
      setView('edit');
    }
  };

  const saveClubChanges = () => {
    if (editForm) {
      setClubData(prev => prev.map(c => c.id === editForm.id ? editForm : c));
      setView('details');
    }
  };

  const navigateToHome = () => {
    setView('home');
    setSearchQuery('');
  };

  const handleExploreClick = () => {
    if (activeTab === 'Explore') {
        const shuffled = [...clubData].sort(() => 0.5 - Math.random());
        setRandomClubs(shuffled.slice(0, 4));
    }
    setActiveTab('Explore');
  };

  const handleSaveCollection = () => {
    if (newCollectionData.title && newCollectionData.clubs.length > 0) {
      setCollections([{ id: Date.now(), ...newCollectionData }, ...collections]);
      setIsCreatingCollection(false);
      setNewCollectionData({ title: '', desc: '', color: 'bg-blue-600', icon: Rocket, clubs: [] });
    }
  };

  const toggleClubSelection = (clubId) => {
    setNewCollectionData(prev => {
      const isSelected = prev.clubs.includes(clubId);
      return {
        ...prev,
        clubs: isSelected 
          ? prev.clubs.filter(id => id !== clubId)
          : [...prev.clubs, clubId]
      };
    });
  };

  // Fix lỗi toggleTag không hoạt động
  const toggleTag = (tag) => {
     const normalizedTag = tag.toLowerCase();
     setSelectedTags(prev => 
       prev.includes(normalizedTag) 
         ? prev.filter(t => t !== normalizedTag) 
         : [...prev, normalizedTag]
     );
  };

  // Xử lý đăng bài thảo luận
  const handlePostDiscussion = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      user: 'Sinh Viên UEH',
      avatar: 'U',
      time: 'Vừa xong',
      tag: 'Thảo luận',
      content: newPost,
      likes: 0,
      comments: 0
    };
    setDiscussions([post, ...discussions]);
    setNewPost('');
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-[#1a1a1a] font-sans selection:bg-[#f06400] selection:text-white overflow-hidden">
      {/* Sidebar - UEH Teal Theme */}
      <aside className={`bg-[${UEH_PRIMARY}] border-r-4 border-black transition-all duration-300 overflow-y-auto fixed md:relative z-40 h-full shadow-2xl`} style={{ backgroundColor: UEH_PRIMARY, width: isSidebarOpen ? '18rem' : '0', opacity: isSidebarOpen ? 1 : 0 }}>
        <div className="p-6 border-b border-white/10">
          <h1 onClick={navigateToHome} className="text-3xl font-black text-[#f06400] cursor-pointer uppercase italic tracking-tighter leading-none drop-shadow-md">
            Wiki <span className="text-white">CLB</span>
          </h1>
          <div className="mt-3 text-[10px] font-bold text-teal-100 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block">
            UEH HUB • 2026
          </div>
        </div>

        <nav className="p-4 space-y-6">
          <div>
            <div className="text-[10px] font-bold text-teal-200 px-4 py-2 uppercase tracking-[0.2em] mb-1 opacity-70">Duyệt nhanh</div>
            <SidebarItem icon={Home} label="Trang chủ" active={view === 'home'} onClick={navigateToHome} />
            <SidebarItem icon={TrendingUp} label="Phổ biến" active={activeTab === 'Most Popular' && view === 'home'} onClick={() => {navigateToHome(); setActiveTab('Most Popular');}} />
            <SidebarItem icon={Library} label="Bộ Sưu Tập" active={view === 'collections'} onClick={() => setView('collections')} />
          </div>

          <div>
            <div className="text-[10px] font-bold text-teal-200 px-4 py-2 uppercase tracking-[0.2em] mb-1 opacity-70">Cộng đồng</div>
            <SidebarItem icon={MessageSquare} label="Thảo luận" active={view === 'discuss'} onClick={() => setView('discuss')} />
            <SidebarItem icon={History} label="Gần đây" />
            <SidebarItem icon={PlusCircle} label="Đóng góp" />
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="h-16 bg-white/95 backdrop-blur-md border-b-2 border-black flex items-center justify-between px-6 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`p-2 hover:bg-[${UEH_PRIMARY}] hover:text-white border-2 border-black rounded-xl transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none`}>
              <Menu size={20} />
            </button>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#f06400] transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Tìm CLB..."
                className="pl-10 pr-10 py-2.5 bg-slate-50 border-2 border-black rounded-xl w-48 sm:w-72 md:w-96 text-sm font-bold focus:bg-white transition-all outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:ring-2 focus:ring-[#f06400]/20 placeholder:text-slate-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 border-2 border-black rounded-xl hover:bg-[#f06400] hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none relative text-slate-700">
              <BellIcon size={20} />
            </button>
            <div className={`w-10 h-10 border-2 border-black bg-[${UEH_PRIMARY}] text-white rounded-xl flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden`} style={{ backgroundColor: UEH_PRIMARY }}>
              <User size={20} />
            </div>
          </div>
        </header>

        {/* Views */}
        <div className="flex-1">
          {view === 'home' && (
            <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="relative bg-gradient-to-r from-[#005f6b] to-[#f06400] border-4 border-black p-8 md:p-12 rounded-[32px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden text-white flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="relative z-10 text-center md:text-left">
                  <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none mb-3 drop-shadow-md">UEH CLUB HUB</h2>
                  <p className="text-base font-bold bg-white/20 backdrop-blur-md px-6 py-2 rounded-full inline-block border border-white/30 shadow-sm">Khám phá & Kết nối Cộng đồng</p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-15 rotate-12 scale-125 pointer-events-none">
                  <Sparkles size={180} />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white border-2 border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col">
                  <div className="flex border-b-2 border-black p-2 bg-slate-50">
                    <button 
                      onClick={handleExploreClick}
                      className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-xl border-2 ${activeTab === 'Explore' ? 'bg-[#005f6b] text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'text-slate-500 border-transparent hover:text-[#005f6b] hover:bg-slate-100'}`}
                    >
                      Khám phá
                    </button>
                    <button 
                      onClick={() => setActiveTab('Most Popular')}
                      className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-xl border-2 ${activeTab === 'Most Popular' ? 'bg-[#005f6b] text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'text-slate-500 border-transparent hover:text-[#005f6b] hover:bg-slate-100'}`}
                    >
                      Phổ biến
                    </button>
                    <button 
                      onClick={() => setActiveTab('All')}
                      className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all rounded-xl border-2 ${activeTab === 'All' ? 'bg-[#005f6b] text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'text-slate-500 border-transparent hover:text-[#005f6b] hover:bg-slate-100'}`}
                    >
                      Tất cả CLB
                    </button>
                  </div>

                  <div className="p-5 border-b-2 border-black bg-[#f06400]/10">
                    <div className="flex flex-wrap gap-2">
                      {FILTER_TAGS.map(tag => (
                        <button 
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform active:scale-95 ${selectedTags.includes(tag.toLowerCase()) ? 'bg-[#f06400] text-white' : 'bg-white text-slate-600 hover:bg-orange-50'}`}
                        >
                          {selectedTags.includes(tag.toLowerCase()) && <Check size={12} strokeWidth={4} className="inline mr-1" />}
                          #{tag.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1 content-start">
                    {filteredClubs.map(club => (
                      <div key={club.id} onClick={() => navigateToClub(club.id)} className="group relative bg-white border-2 border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(240,100,0,1)] hover:border-[#f06400] transition-all cursor-pointer hover:-translate-y-1">
                        <div className="w-full h-40 bg-slate-100 rounded-xl overflow-hidden border-2 border-black mb-4 group-hover:border-[#f06400] transition-colors relative">
                          <ClubImage src={club.image} alt={club.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                          {/* Popular Badge */}
                          {club.popular && (
                            <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-lg border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wider flex items-center gap-1 z-10">
                              <Flame size={12} fill="white" /> Phổ biến
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <span className="text-[10px] font-bold uppercase bg-[#005f6b] text-white px-2 py-1 rounded italic leading-none border border-black inline-block">{club.category}</span>
                          <h4 className="font-black text-lg text-slate-800 group-hover:text-[#f06400] truncate leading-none uppercase tracking-tight">{club.name}</h4>
                          <p className="text-xs text-slate-500 font-bold italic line-clamp-1">"{club.motto}"</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sidebar: Recent Discussions - Chiếm 1 phần */}
                <div className="lg:col-span-1">
                  <div className="bg-white border-2 border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden h-fit sticky top-24">
                    <div className="p-5 bg-[#005f6b] text-white flex justify-between items-center border-b-2 border-black">
                      <div className="flex items-center space-x-2">
                        <MessageCircle size={20} className="text-[#f06400]" />
                        <h3 className="text-sm font-black uppercase tracking-widest italic">Thảo luận sôi nổi</h3>
                      </div>
                      <button onClick={() => setView('discuss')} className="text-xs font-bold uppercase tracking-widest hover:text-[#f06400] transition-colors flex items-center space-x-1">
                        <span>Xem tất cả</span><ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="p-5 space-y-4">
                      {discussions.slice(0, 3).map(post => (
                        <div key={post.id} className="p-4 border-2 border-black rounded-xl hover:bg-orange-50 transition-all cursor-pointer bg-white shadow-sm flex items-start space-x-3">
                          <div className="w-10 h-10 shrink-0 bg-[#f06400] text-white border border-black rounded-lg flex items-center justify-center font-black text-sm italic shadow-sm">{post.avatar}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">{post.user} • {post.time}</span>
                              <span className="text-[9px] font-bold bg-teal-100 text-teal-800 px-1.5 rounded border border-teal-200">#{post.tag}</span>
                            </div>
                            <p className="text-xs font-bold text-slate-700 line-clamp-2">{post.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {view === 'collections' && (
            <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
              <button onClick={() => setView('home')} className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-[#f06400] bg-white px-4 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 transition-all">
                <ChevronRight size={16} className="rotate-180" /> <span>Trang chủ</span>
              </button>

              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase leading-none text-[#005f6b]">Bộ Sưu Tập</h2>
                <p className="text-base font-bold text-slate-600 max-w-xl mx-auto">Những danh sách CLB "cực phẩm" được tuyển chọn theo từng chủ đề thú vị!</p>
              </div>

              {!isCreatingCollection && (
                <div className="flex justify-center">
                  <button onClick={() => setIsCreatingCollection(true)} className="flex items-center gap-2 bg-[#f06400] text-white px-6 py-3 rounded-2xl font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all uppercase text-sm">
                    <PlusCircle size={20} /> Tạo bộ sưu tập mới
                  </button>
                </div>
              )}

              {isCreatingCollection && (
                <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-in slide-in-from-top-4 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black text-[#005f6b] uppercase italic">Tạo bộ sưu tập mới</h3>
                    <button onClick={() => setIsCreatingCollection(false)} className="text-slate-400 hover:text-red-500"><X size={24} /></button>
                  </div>
                  <div className="space-y-4">
                    <input className="w-full bg-slate-50 border-2 border-black rounded-xl p-3 font-bold text-sm outline-none focus:ring-2 focus:ring-[#f06400]" placeholder="Tên bộ sưu tập..." value={newCollectionData.title} onChange={(e) => setNewCollectionData({...newCollectionData, title: e.target.value})} />
                    <textarea className="w-full bg-slate-50 border-2 border-black rounded-xl p-3 font-medium text-sm outline-none focus:ring-2 focus:ring-[#f06400] min-h-[80px]" placeholder="Mô tả ngắn..." value={newCollectionData.desc} onChange={(e) => setNewCollectionData({...newCollectionData, desc: e.target.value})} />

                    <div>
                      <label className="block text-xs font-bold uppercase mb-2 text-slate-600">Chọn CLB vào bộ sưu tập</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 bg-slate-50 rounded-xl border-2 border-black">
                        {clubData.map(club => (
                          <div 
                            key={club.id} 
                            onClick={() => toggleClubSelection(club.id)}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer border-2 transition-all ${newCollectionData.clubs.includes(club.id) ? 'bg-white border-[#f06400] shadow-sm' : 'border-transparent hover:bg-slate-200'}`}
                          >
                            <div className={`w-4 h-4 border-2 border-black rounded flex items-center justify-center ${newCollectionData.clubs.includes(club.id) ? 'bg-[#f06400]' : 'bg-white'}`}>
                              {newCollectionData.clubs.includes(club.id) && <Check size={10} color="white" strokeWidth={4} />}
                            </div>
                            <span className="text-xs font-bold truncate text-slate-700">{club.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button onClick={handleSaveCollection} disabled={!newCollectionData.title || newCollectionData.clubs.length === 0} className="bg-[#005f6b] text-white px-6 py-2.5 rounded-xl font-black uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed">Lưu Bộ Sưu Tập</button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {collections.map(col => (
                  <div key={col.id} className="group bg-white border-2 border-black rounded-3xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer hover:-translate-y-1 relative overflow-hidden">
                    <div className={`absolute top-0 right-0 p-10 opacity-10 rotate-12 scale-150 ${col.color.replace('bg-', 'text-')}`}>
                      {col.icon && <col.icon size={120} />}
                    </div>
                    <div className="relative z-10">
                      <div className={`w-12 h-12 ${col.color} text-white border-2 border-black rounded-xl flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mb-4`}>
                        {col.icon && <col.icon size={24} />}
                      </div>
                      <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2 text-[#005f6b]">{col.title}</h3>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed mb-4">{col.desc}</p>
                      <div className="space-y-2 border-t-2 border-slate-100 pt-4">
                        {col.clubs.map(clubId => {
                          const club = INITIAL_CLUB_DATA.find(c => c.id === clubId);
                          return club ? (
                            <div key={clubId} onClick={(e) => { e.stopPropagation(); navigateToClub(club.id); }} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-200 transition-all">
                              <div className="w-8 h-8 rounded-lg bg-slate-200 overflow-hidden border border-black shadow-sm"><ClubImage src={club.image} alt={club.name} className="w-full h-full" isLogo={true} /></div>
                              <span className="text-xs font-bold uppercase text-slate-700 hover:text-[#f06400] transition-colors">{club.name}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EDIT VIEW */}
          {view === 'edit' && editForm && (
            <div className="p-6 md:p-10 max-w-4xl mx-auto animate-in fade-in duration-300">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-black italic uppercase tracking-tighter text-[#005f6b]">Biên tập Wiki: <span className="text-[#f06400]">{editForm.name}</span></h2>
                <div className="flex gap-4">
                  <button onClick={() => setView('details')} className="px-5 py-2.5 bg-slate-200 font-bold rounded-xl hover:bg-slate-300 transition-colors text-sm text-slate-700">Hủy</button>
                  <button onClick={saveClubChanges} className="px-7 py-2.5 bg-[#f06400] text-white font-black rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center gap-2 text-sm">
                    <Save size={16} /> Lưu thay đổi
                  </button>
                </div>
              </div>

              <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-8">
                <div>
                  <label className="block text-xs font-bold uppercase mb-3 text-[#005f6b]">Tên đầy đủ</label>
                  <input 
                    className="w-full bg-slate-50 border-2 border-black rounded-xl p-4 font-bold text-base outline-none focus:ring-2 focus:ring-[#f06400] text-slate-800"
                    value={editForm.fullName}
                    onChange={(e) => setEditForm({...editForm, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-3 text-[#005f6b]">Slogan (Motto)</label>
                  <input 
                    className="w-full bg-slate-50 border-2 border-black rounded-xl p-4 font-bold text-base outline-none focus:ring-2 focus:ring-[#f06400] text-slate-800"
                    value={editForm.motto}
                    onChange={(e) => setEditForm({...editForm, motto: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-3 text-[#005f6b]">Mô tả chi tiết</label>
                  <textarea 
                    className="w-full bg-slate-50 border-2 border-black rounded-xl p-4 font-medium text-base outline-none focus:ring-2 focus:ring-[#f06400] min-h-[180px] text-slate-800 leading-relaxed"
                    value={editForm.longDesc}
                    onChange={(e) => setEditForm({...editForm, longDesc: e.target.value})}
                  />
                </div>
                <div className="p-5 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800 font-bold italic">
                  * Lưu ý: Mọi chỉnh sửa sẽ được kiểm duyệt bởi cộng đồng trước khi áp dụng chính thức (trong phiên bản demo này, thay đổi sẽ áp dụng ngay lập tức).
                </div>
              </div>
            </div>
          )}

          {/* DISCUSS VIEW */}
          {view === 'discuss' && (
            <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
              {/* Header Discuss */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                   <button onClick={() => setView('home')} className="bg-white p-2.5 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none hover:bg-slate-50">
                     <ChevronRight size={20} className="rotate-180" />
                   </button>
                   <h2 className="text-4xl font-black italic tracking-tighter uppercase leading-none border-b-4 border-[#f06400] pr-4 pb-1 text-[#005f6b]">Diễn đàn</h2>
                </div>
                <span className="text-sm font-bold text-slate-500 italic">2.4k sinh viên đang trực tuyến</span>
              </div>

              <div className="bg-white border-2 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 border-2 border-black bg-[#f06400] rounded-xl flex items-center justify-center font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-white text-lg">U</div>
                  <textarea className="flex-1 bg-slate-50 border-2 border-black rounded-xl p-4 text-sm font-medium outline-none focus:bg-white focus:ring-2 focus:ring-[#f06400] transition-all min-h-[100px] text-slate-800" placeholder="Bạn đang muốn hỏi gì hoặc chia sẻ gì về CLB UEH?" value={newPost} onChange={(e) => setNewPost(e.target.value)}></textarea>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <button className="p-2.5 border-2 border-black rounded-xl hover:bg-slate-100 transition-all shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-slate-600"><Camera size={16} /></button>
                    <button className="p-2.5 border-2 border-black rounded-xl hover:bg-slate-100 transition-all shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-slate-600"><Zap size={16} /></button>
                  </div>
                  <button onClick={handlePostDiscussion} className="bg-[#005f6b] text-white font-black px-8 py-2.5 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all flex items-center space-x-2 text-sm"><span>Đăng bài</span><Send size={16} /></button>
                </div>
              </div>
              <div className="space-y-6">
                {discussions.map(post => (
                  <div key={post.id} className="bg-white border-2 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 border-2 border-black bg-[#005f6b] text-white rounded-lg flex items-center justify-center font-black italic text-sm">{post.avatar}</div>
                        <div><h4 className="text-sm font-black uppercase tracking-tight text-[#005f6b]">{post.user}</h4><span className="text-xs font-bold text-slate-400 italic">{post.time}</span></div>
                      </div>
                      <span className="bg-[#f06400]/10 text-[#f06400] px-3 py-1 rounded text-[10px] font-black uppercase border border-[#f06400]/30">#{post.tag}</span>
                    </div>
                    <p className="text-base font-medium text-slate-700 leading-relaxed mb-6">{post.content}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex space-x-6">
                        <button className="flex items-center space-x-2 text-slate-400 hover:text-[#f06400] transition-colors"><ThumbsUp size={16} /><span className="text-xs font-black">{post.likes}</span></button>
                        <button className="flex items-center space-x-2 text-slate-400 hover:text-[#005f6b] transition-colors"><MessageSquare size={16} /><span className="text-xs font-black">{post.comments}</span></button>
                        <button className="flex items-center space-x-2 text-slate-400 hover:text-green-500 transition-colors"><Share2 size={16} /></button>
                      </div>
                      <button className="text-slate-300 hover:text-black transition-colors"><MoreHorizontal size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CLUB DETAILS VIEW */}
          {view === 'details' && selectedClub && (
            <div className="p-6 md:p-10 max-w-7xl mx-auto animate-in fade-in duration-500 space-y-8">
              <button onClick={() => setView('home')} className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-[#f06400] bg-white px-4 py-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-0.5">
                <ChevronRight size={16} className="rotate-180" /> <span>Quay lại</span>
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-8">
                  <div className="bg-white border-2 border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <div className="h-56 md:h-72 bg-[#005f6b] relative border-b-2 border-black">
                      <ClubImage src={selectedClub.image} className="w-full h-full opacity-60 mix-blend-overlay" alt="cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#005f6b] via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 p-8 md:p-12 flex items-end space-x-6">
                        <div className="w-24 h-24 md:w-36 md:h-36 bg-white border-2 border-black rounded-2xl overflow-hidden shadow-xl transform -rotate-2 flex items-center justify-center p-2">
                          <ClubImage src={selectedClub.image} alt={selectedClub.name} className="max-w-full max-h-full" isLogo={true} />
                        </div>
                        <div className="mb-2">
                          <h1 className="text-3xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none drop-shadow-lg">{selectedClub.name}</h1>
                          <p className="text-base md:text-xl text-[#f06400] font-black italic mt-2 leading-none opacity-100 drop-shadow-md">"{selectedClub.motto}"</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 md:p-12 space-y-12">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2 self-center">Tags:</span>
                        {selectedClub.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-lg text-[10px] font-bold border-2 border-black bg-slate-50 text-slate-600 uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">#{tag}</span>
                        ))}
                      </div>

                      <div className="bg-slate-50 border-2 border-black rounded-2xl p-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-lg font-medium leading-relaxed italic text-[#005f6b]"><span className="bg-[#f06400] text-white px-2 py-0.5 not-italic uppercase text-xs font-black mr-2 rounded-sm border border-black">WIKI BIO:</span> {selectedClub.shortDesc}</p>
                      </div>

                      <section>
                        <h3 className="text-2xl font-black border-b-4 border-[#f06400] inline-block mb-6 pr-6 uppercase tracking-tight italic text-[#005f6b]">Hành trình</h3>
                        <p className="text-slate-700 leading-relaxed text-base font-medium">{selectedClub.longDesc}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                          {selectedClub.coreValues.map((val, idx) => (
                            <div key={idx} className="p-6 bg-white border-2 border-black rounded-xl hover:shadow-[3px_3px_0px_0px_rgba(240,100,0,1)] transition-all hover:-translate-y-1">
                              <div className="w-10 h-10 bg-[#f06400] text-white border border-black rounded-lg flex items-center justify-center font-black mb-3 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-base italic">{val.key.replace(/\d+/g, '')}</div>
                              <h4 className="font-black text-[#005f6b] uppercase text-xs leading-tight">{val.name}</h4>
                              <p className="text-[10px] text-slate-500 font-bold mt-1.5 leading-tight italic">{val.desc}</p>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Departments Section */}
                      <section>
                        <h3 className="text-2xl font-black border-b-4 border-[#f06400] inline-block mb-6 pr-6 uppercase tracking-tight italic text-[#005f6b]">Phòng ban</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {selectedClub.departments && selectedClub.departments.map((dep, idx) => (
                            <div key={idx} className="p-4 bg-slate-50 border border-black rounded-2xl flex items-start space-x-4 hover:bg-white transition-colors shadow-sm">
                              <div className="p-2.5 bg-white border border-black rounded-xl text-[#f06400] shrink-0 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                                <Layers size={20} strokeWidth={3} />
                              </div>
                              <div>
                                <h4 className="font-black text-[#005f6b] uppercase text-xs tracking-widest">{dep.name}</h4>
                                <p className="text-[10px] text-slate-500 font-bold mt-1 leading-tight">{dep.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Activities Section - Đảm bảo hiển thị cho BELL và tất cả các CLB */}
                      <section>
                        <h3 className="text-2xl font-black border-b-4 border-[#f06400] inline-block mb-6 pr-6 uppercase tracking-tight italic text-[#005f6b]">Hoạt động tiêu biểu</h3>
                        <div className="grid grid-cols-1 gap-5">
                          {selectedClub.activities && selectedClub.activities.length > 0 ? (
                            selectedClub.activities.map((act, i) => (
                              <div key={i} className="p-6 bg-[#005f6b] text-white border-2 border-black rounded-2xl relative overflow-hidden group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform duration-500">
                                    <Trophy size={100} />
                                  </div>
                                  <div className="relative z-10">
                                    <h4 className="font-black text-xl text-[#f06400] mb-2 flex items-center gap-2 uppercase italic">
                                      <Star size={20} fill="currentColor" /> {act.name}
                                    </h4>
                                    <p className="text-sm font-bold text-teal-50 leading-relaxed">{act.desc}</p>
                                  </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-slate-500 italic text-sm">Chưa có thông tin về hoạt động.</p>
                          )}
                        </div>
                      </section>

                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white border-2 border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                    <div className="bg-[#005f6b] text-white p-4 text-center">
                      <h4 className="font-black uppercase tracking-widest italic text-sm text-[#f06400]">INFOBOX</h4>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-2 border-b-2 border-black bg-slate-50">
                      {selectedClub.stats && selectedClub.stats.map((stat, i) => (
                        <div key={i} className="bg-white border border-black p-3 rounded-xl text-center shadow-sm">
                          {stat.icon && <stat.icon className={`mx-auto mb-1.5 ${stat.color}`} size={18} strokeWidth={3} />}
                          <div className="text-base font-black tracking-tighter leading-none text-[#005f6b]">{stat.value}</div>
                          <div className="text-[9px] font-bold uppercase text-slate-400 mt-1">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="p-6 space-y-8">
                      <div className="space-y-4">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-1">Ban thường trực</div>
                        {selectedClub.board && selectedClub.board.map((m, i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <div className="w-9 h-9 border border-black bg-[#f06400]/10 rounded-lg flex items-center justify-center font-black text-xs text-[#f06400] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">{m.role && (m.role.includes('Chủ nhiệm') || m.role.includes('President')) ? 'P' : 'VP'}</div>
                            <div>
                              <p className="text-[9px] font-bold text-slate-500 uppercase leading-none">{m.role}</p>
                              <p className="text-xs font-black text-[#005f6b] leading-tight italic">{m.name}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4 pt-4 border-t border-slate-100">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase">
                          <span className="text-slate-400">Established</span>
                          <span className="italic text-[#005f6b] font-black">{selectedClub.founded}</span>
                        </div>
                        <a href={selectedClub.website} target="_blank" rel="noreferrer" className="w-full py-3 bg-[#005f6b] text-white rounded-xl font-black text-center text-[10px] uppercase flex items-center justify-center space-x-2 shadow-[2px_2px_0px_0px_rgba(240,100,0,1)] hover:bg-[#004b55] transition-colors">
                          <span>Website</span><ExternalLink size={14} strokeWidth={3} />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div onClick={startEditing} className="bg-[#005f6b] border-2 border-black rounded-3xl p-6 text-white relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer group hover:bg-[#004b55] transition-all">
                    <div className="absolute -top-10 -right-10 text-white/5 group-hover:rotate-12 transition-transform duration-500"><Edit2 size={180} /></div>
                    <h4 className="text-base font-black italic mb-2 uppercase text-[#f06400]">Sửa Wiki</h4>
                    <p className="text-[10px] text-teal-100 font-bold mb-4 leading-relaxed">Phát hiện thông tin chưa chuẩn? Hãy giúp cộng đồng cập nhật ngay.</p>
                    <button className="w-full py-2.5 bg-white text-[#005f6b] font-black rounded-xl border border-black text-[10px] uppercase shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2">Biên tập ngay</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="mt-auto mb-8 px-10 text-center animate-in fade-in duration-1000 border-t border-black/5 pt-8">
          <p className="text-xs text-slate-400 font-black uppercase tracking-[0.4em]">UEH CLUB WIKI • DESIGNED FOR GEN Z • 2026</p>
        </footer>
      </main>
    </div>
  );
}