import { Row, Col } from "antd";
import React from "react"
import { LiaShippingFastSolid, LiaMedalSolid } from 'react-icons/lia';
import { BiSupport } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
const logo = '/logo.png';
const logoSaleNoti = '/logoSaleNoti.png';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer>
            <section className="section">
                <div className="bg-section bg-section2 bg-img"></div>
                <div className="section-content footer-bot" >
                    <Row className="row" gutter={24} >
                        <Col className="col" md={6} sm={12} xs={24}>
                            <div className="col-inner">
                                <div className="box">
                                    <div className="img">
                                        <div className="img-inner">
                                            <img className="img-object" src={logo} alt="Logo" />
                                        </div>
                                    </div>
                                    <p className="infoEu text-justify-foot">LUBYBOOK nhận đặt hàng trực tuyến và giao hàng tận nơi hoặc nhận hàng tại tất cả Hệ Thống Nhà Sách Lucy trên toàn quốc</p>
                                    <div className="infoEu connect-foot uppercase-foot text-title-foot"><h3 ><b></b><span >KẾT NỐI VỚI CHÚNG TÔI</span><b></b></h3></div>
                                    <a href="https://www.facebook.com/ttphthao811/" className="fa fa-facebook"></a>
                                    <a href="#" className="fa fa-youtube"></a>
                                    <a href="https://www.instagram.com/ttphthao_/" className="fa fa-instagram"></a>
                                    <div>
                                        <img className="bn46" src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="bn45" />
                                        <img className="bn46" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="bn45" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="col" md={6} sm={12} xs={24}>
                            <div className="col-inner">
                                <div className="box">
                                    <div className="infoEu uppercase-foot text-title-foot"><h3 ><b></b><span >Về LUCYBOOK</span><b></b></h3></div>
                                    <div className="text-line-foot">
                                        <span className="infoEu capitalize-foot">
                                            Giới thiệu LUCYBOOK
                                        </span>
                                    </div>
                                    <div className="text-line-foot">
                                        <span className="infoEu capitalize-foot">
                                            Chính sách bảo mật và lưu trữ thông tin
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="col" md={6} sm={12} xs={24}>
                            <div className="col-inner">
                                <div className="box">
                                    <div className="infoEu uppercase-foot text-title-foot"><h3><b></b><span >Hỗ trợ khách hàng</span><b></b></h3></div>
                                    <div>
                                        <div className="text-line-foot">
                                            <span className="infoEu capitalize-foot">
                                                Hướng dẫn mua hàng
                                            </span>
                                        </div>
                                        <div className="text-line-foot">
                                            <span className="infoEu capitalize-foot">
                                                Phương thức thanh toán
                                            </span>
                                        </div>
                                        <div className="text-line-foot">
                                            <span className="infoEu capitalize-foot">
                                                Chính sách vận chuyển
                                            </span>
                                        </div>
                                        <div className="text-line-foot">
                                            <span className="infoEu capitalize-foot">
                                                Chính sách đổi trả và hoàn tiền
                                            </span>
                                        </div>
                                    </div>
                                    <div className="z1zvpoXspE">
                                        <span className="vYR38dizSG">Thanh Toán</span>
                                        <Row>
                                            <Col >
                                                <img className="bn45" src="https://vudigital.co/wp-content/uploads/2022/12/logo-mastercard-da-thay-doi-nhu-the-nao-trong-hon-50-nam-2.webp" alt="bn45" />
                                            </Col>
                                            <Col >
                                                <img className="bn45" src="https://resources.mynewsdesk.com/image/upload/c_fill,dpr_auto,f_auto,g_auto,q_auto:good,w_1782/oeb5fz6yafjdfm9yehbe" alt="bn45" />
                                            </Col>
                                            <Col >
                                                <img className="bn45" src="https://www.global.jcb/en/about-us/brand-concept/images/index/pic_jcbcard_02.png" alt="bn45" />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col >
                                                <img className="bn45" src="https://www.taichinhz.com/wp-content/uploads/2021/10/zalopay-la-gi.jpg" alt="bn45" />
                                            </Col>
                                            <Col >
                                                <img className="bn45" src="https://inkythuatso.com/uploads/images/2021/12/payoo-logo-inkythuatso-02-15-47-06.jpg" alt="bn45" />
                                            </Col>
                                            <Col >
                                                <img className="bn45" src="https://napas.qltns.mediacdn.vn/479491956813160448/2022/10/14/logo-napas-nen-trong-16657148272251732659720.png" alt="bn45" />
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="col" md={6} sm={12} xs={24}>
                            <div className="col-inner">
                                <div className="box">
                                    <div className="infoEu uppercase-foot text-title-foot"><h3 ><b></b><span >Liên Hệ</span><b></b></h3></div>
                                    <p className="infoEu text-justify-foot"><strong>Hệ Thống Nhà Sách Lucy</strong></p>
                                    <p className="infoEu capitalize-foot"><strong>Địa chỉ chúng tôi</strong></p>
                                    <p className="infoEu text-justify-foot">Số 315 Trường Chinh, Phường Khương Mai, Quận Thanh Xuân, Thành phố Hà Nội</p>
                                    <p className="infoEu capitalize-foot"><strong>Emai chúng tôi</strong></p>
                                    <p className="infoEu">lienhe@lucybook.vn</p>
                                    <p className="infoEu capitalize-foot"><strong>Số điện thoại</strong></p>
                                    <p className="infoEu">0394506681</p>
                                    <p className="infoEu capitalize-foot"><strong>Mã Số Thuế</strong>: 0123456789</p>
                                    <p className="infoEu capitalize-foot"><strong>Ngày hoạt động</strong>: 10/01/2017</p>
                                    <p className="infoEu capitalize-foot"><strong>Nơi cấp</strong>: Hà Nội </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="divider-footer">
                </div>
                <div className="copyright">
                    <strong>© Bản quyền thuộc về Nhà Sách Lucy</strong>
                </div>
            </section>
        </footer >
    )
}

export default Footer;