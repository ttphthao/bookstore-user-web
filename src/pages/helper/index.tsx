import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Anchor, theme, Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const logo = '/logo.png';

interface HelperPropsInterface {
}

const vnpayMethodLen = 51;

const Helper = (props: HelperPropsInterface) => {
    const router = useRouter();
    const { token } = theme.useToken();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: '#fff',
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };


    const items = [
        {
            key: 'about-lucybook',
            href: '#about-lucybook',
            title: <span className="helper-anchor-title">Về LUCYBOOK</span>,
            children: [
                {
                    key: 'lucybook-introduce',
                    href: '#lucybook-introduce',
                    title: <span className="helper-anchor-title">Giới Thiệu Về LUCYBOOK</span>,
                }
            ],
        }
    ];

    return (
        <div>
            <div className="jGuLCEirpK">
                <div className="j85X16YDAP" onClick={() => router.push('/')}>
                    <img className="C5d6e393DV" src={logo} alt="Logo" />
                </div>
            </div>
            <div className="helper-body">
                <div className="helper-anchor">
                    <Anchor
                        items={items}
                    />
                </div>
                <div className="helper-contents">
                    <div>
                        <span id="about-lucybook" className="helper-content-title-par">Về LUCYBOOK</span>
                        <ol className="helper-content-container">
                            <div>
                                <li id="lucybook-introduce" className="helper-content-title-chil">Giới Thiệu Về LUCYBOOK</li>
                                <div>
                                    <p>Nhà Sách lucy được thành lập năm 2024, chuyên kinh doanh: sách quốc văn, ngoại văn,…</p>
                                    <p>Sách quốc văn với nhiều thể loại đa dạng như sách giáo khoa – tham khảo, giáo trình, sách học ngữ, từ điển, sách tham khảo thuộc nhiều chuyên ngành phong phú: văn học, tâm lý – giáo dục, khoa học kỹ thuật, khoa học kinh tế - xã hội, khoa học thường thức, sách phong thủy, nghệ thuật sống, danh ngôn, sách thiếu nhi, truyện tranh, truyện đọc, từ điển, công nghệ thông tin, khoa học – kỹ thuật, nấu ăn, làm đẹp...  của nhiều Nhà xuất bản, nhà cung cấp sách có uy tín như: NXB Trẻ, Giáo Dục, Kim Đồng, Văn hóa -Văn Nghệ, Tổng hợp TP.HCM, Chính Trị Quốc Gia; Công ty Đông A, Nhã Nam, Bách Việt, Alphabook, Thái Hà, Minh Lâm, Đinh Tị, Minh Long, TGM, Sáng Tạo Trí Việt, Khang Việt, Toàn Phúc…</p>
                                    <p>Sách ngoại văn bao gồm: từ điển, giáo trình, tham khảo, truyện tranh thiếu nhi , sách học ngữ, từ vựng, ngữ pháp, luyện thi TOEFL, TOEIC, IELS…được nhập từ các NXB nước ngoài như: Cambridge, Mc Graw-Hill, Pearson Education, Oxford, Macmillan, Cengage Learning…</p>
                                </div>
                            </div>
                        </ol>
                    </div >
                </div>
            </div>
        </div>
    )
}

export default Helper;