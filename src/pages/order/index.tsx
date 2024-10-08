import AddNewShippingInfoModal from '@/components/AddNewShippingInfoModal';
import CustomNotification from '@/components/CustomNotification';
import { RootState } from '@/redux';
import { listProductInCart, saveProductToOrderInfo } from '@/redux/actions/cartAction';
import { addNewOrder, addNewOrderDone, getDeliveryFee } from '@/redux/actions/orderAction';
import { getListShippingInfo } from '@/redux/actions/shippingInfo';
import { useAppDispatch } from '@/redux/hooks';
import { CartInfoInterface } from '@/redux/reducers/cart/interfaces';
import { AddNewOrderPayloadType, GetDeliveryFeePayload } from '@/redux/reducers/order/interfaces';
import { ShippingInfoInterface } from '@/redux/reducers/shippingInfo/interfaces';
import { convertNumberToMoney, convertToDate, generateKey } from '@/utils/lib';
import { ShopOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Divider, Modal, Radio } from 'antd';
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { connect } from 'react-redux';

const baseUrl = process.env.BASE_URL;

interface OrderPageProps {
    listProductInOrderState: CartInfoInterface[] | undefined | null;
    shippingInfoList: ShippingInfoInterface[] | undefined;
    isFetchingShippingInfo: boolean | undefined;
    isErrorShippingInfo: boolean | undefined;
    savingFetching: boolean | undefined;
    addNewStatus: string | undefined;
    isFetchingAdd: boolean | undefined;
    addNewOrderStatus: string | undefined;
    updateStatus: string | undefined;
    paymentLink: string | undefined;
    deliveryFee: number | undefined;
}

const OrderPage = (props: OrderPageProps) => {
    const router = useRouter();

    const {
        listProductInOrderState,
        shippingInfoList,
        isFetchingShippingInfo,
        isErrorShippingInfo,
        savingFetching,
        addNewStatus,
        isFetchingAdd,
        addNewOrderStatus,
        updateStatus,
        paymentLink,
        deliveryFee,
    } = props;

    const dispatch = useAppDispatch();

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [selectedShippingInfo, setSelectedShippingInfo] = useState<number>(0);
    const [isOpenChangeAddressModal, setIsOpenChangeAddressModal] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>('cod');
    const [totalWeight, setTotalWeight] = useState<number>(0);
    const esimatedDate1 = convertToDate(moment().add(3, 'days').toString());
    const esimatedDate2 = convertToDate(moment().add(5, 'days').toString());

    const openChangeAddressModal = () => setIsOpenChangeAddressModal(true);
    const closeChangeAddressModal = () => setIsOpenChangeAddressModal(false);

    const [onChangingShippingInfoValues, setOnChangingShippingInfoValues] = useState<ShippingInfoInterface>();

    useEffect(() => {
        if (!savingFetching && (!listProductInOrderState || !listProductInOrderState.length))
            router.push('/cart');
        else {
            let tmp = 0;
            let tmpW = 0;
            listProductInOrderState?.forEach(item => {
                item.product.forEach(prod => {
                    tmp += (prod.price * prod.amount);
                    tmpW += prod.weight;
                })
            });
            setTotalPrice(tmp);
            setTotalWeight(tmpW);
        }
    }, []);

    useEffect(() => {
        if (totalWeight !== 0 && totalPrice !== 0 && shippingInfoList?.length) {
            const payload: GetDeliveryFeePayload = {
                weight: totalWeight,
                price: totalPrice,
                provine: shippingInfoList![selectedShippingInfo].provine,
                city: shippingInfoList![selectedShippingInfo].city,
            }
            dispatch(getDeliveryFee(payload));
        }
    }, [selectedShippingInfo, totalWeight, totalPrice]);

    useEffect(() => {
        if (!isFetchingShippingInfo && !isErrorShippingInfo && shippingInfoList) {
            if (!shippingInfoList?.length) {
                openAddNewModal();
            }
        }
    }, [isFetchingShippingInfo, isErrorShippingInfo]);

    useEffect(() => {
        if (!isFetchingAdd && addNewStatus === 'success') {
            dispatch(getListShippingInfo());
        }
    }, [isFetchingAdd, addNewStatus]);

    useEffect(() => {
        if (!isFetchingAdd && (updateStatus === 'success' || updateStatus === 'fail')) {
            setOnChangingShippingInfoValues(undefined);
            dispatch(getListShippingInfo());
        }
    }, [isFetchingAdd, updateStatus]);

    const changeSelectedShippingInfo = (index: number) => {
        setSelectedShippingInfo(index);
    }

    const onCloseAddNewModal = () => {
        openChangeAddressModal();
    }

    const onOpenAddNewModal = () => {
        closeChangeAddressModal();
    }

    const [addNewModalVisible, setAddNewModalVisible] = useState<boolean>(false);
    const openAddNewModal = () => {
        setAddNewModalVisible(true);
        onOpenAddNewModal();
    }

    const closeAddNewModal = () => {
        setOnChangingShippingInfoValues(undefined);
        setAddNewModalVisible(false);
        onCloseAddNewModal();
    }

    const submitOrder = () => {
        if (shippingInfoList) {
            const tmp: string[] = [];

            listProductInOrderState?.forEach(item => {
                item.product.forEach(prod => {
                    tmp.push(prod.cartId);
                })
            })

            const payload: AddNewOrderPayloadType = {
                carts: tmp,
                paymentMethod: paymentMethod,
                shippingInfo: shippingInfoList[selectedShippingInfo]._id,
            }
            dispatch(addNewOrder(payload));
        }
    }

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isVisible && paymentMethod === 'cod') {
            const timeout = setTimeout(() => {
                setIsVisible(false);
                router.push('/user/purchase');
                dispatch(saveProductToOrderInfo(null));
            }, 2000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isVisible]);

    useEffect(() => {
        if (addNewOrderStatus === 'success') {
            if (paymentMethod === 'cod') {
                setIsVisible(true);
                dispatch(listProductInCart());
                dispatch(addNewOrderDone());
            } else {
                window.location.replace(paymentLink!);
            }
        }
    }, [addNewOrderStatus]);

    const onClickUpdateShippingInfo = (address: ShippingInfoInterface) => {
        setOnChangingShippingInfoValues(address);
        setAddNewModalVisible(true);
    }

    const onChangePaymentMethod = (event: any) => {
        setPaymentMethod(event.target.id);
    }

    return (
        <div className='order-container'>
            <CustomNotification visible={isVisible} message='Đặt hàng thành công' />
            <div className='info-container'>
                <div className='warehouse-container'>
                    {
                        listProductInOrderState?.map((item, index) => {
                            const { warehouse, product } = item;
                            return (
                                <div className='product-list-card' key={`product-list-card-${index}`}>
                                    <div className='warehouse-title'>
                                        <ShopOutlined style={{ marginRight: 5 }} />{`${warehouse.name} - ${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}
                                    </div>
                                    <div>
                                        {
                                            product.map((prod, idx) => {
                                                return (
                                                    <div className='product-info-contaianer' key={`product-info-contaianer-${idx}`}>
                                                        <div className='image-and-name-container'>
                                                            <img
                                                                src={`${baseUrl}image/${prod.image[0]}`}
                                                                className='product-image-order'
                                                            />
                                                            <div className='BlCC9FBT6v text-div'>
                                                                <b>{prod.name}</b><br />
                                                                <span className='text-details'>{`${prod.group1 ? prod.group1 : ''} ${prod.group2 ? `- ${prod.group2}` : ''}`}</span>
                                                            </div>
                                                        </div>
                                                        <div className='delivery-info text-div'>
                                                            <b>Giao Hàng Tiêu Chuẩn</b><br />
                                                            <b className='text-details'>Dự Kiến Giao Hàng</b><br />
                                                            <span className='text-details'>{esimatedDate1} - {esimatedDate2}</span>
                                                        </div>
                                                        <div className='price-info'>
                                                            <div className='text-div'>
                                                                <span className='price-text'>{convertNumberToMoney(prod.price * prod.amount)}<span className='price-unit'>đ</span></span>
                                                                <span className='text-details amount-text'>Số lượng: {prod.amount}</span>
                                                            </div>
                                                        </div>
                                                        {/* Mobile */}
                                                        <div className='image-and-name-container-mobile'>
                                                            <img
                                                                src={`${baseUrl}image/${prod.image[0]}`}
                                                                className='product-image-order'
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className='text-div-mobile'>
                                                                <b>{prod.name}</b><br />
                                                                <span className='text-details'>{`${prod.group1 ? prod.group1 : ''} ${prod.group2 ? `- ${prod.group2}` : ''}`}</span>
                                                            </div>
                                                            <div className='price-info-mobile'>
                                                                <div className='text-div'>
                                                                    <span className='price-text'>{convertNumberToMoney(prod.price * prod.amount)}<span className='price-unit'>đ</span></span>
                                                                    <span className='text-details amount-text'>Số lượng: {prod.amount}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='delivery-info-mobile text-div'>
                                        <b>Giao Hàng Tiêu Chuẩn</b>
                                        <span className='text-details'>{esimatedDate1} - {esimatedDate2}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='shipping-info-container'>
                    <b className='div-title'>Thông Tin Đặt Hàng</b>
                    <div className='shipping-info-details'>
                        <div className='vqC4TXlArw'>
                            <b>Số điện thoại: </b><span>{shippingInfoList && shippingInfoList[selectedShippingInfo]?.phone_number ? shippingInfoList[selectedShippingInfo].phone_number : ''}</span>
                            <a className='Mvlh4jRsdn' onClick={openChangeAddressModal}>Thay đổi</a>
                        </div>
                        {
                            shippingInfoList && shippingInfoList[selectedShippingInfo] &&
                            <div className='RiZ4CNRqQq'>
                                <div>
                                    <b>Name: </b><span>{shippingInfoList[selectedShippingInfo].name}</span>
                                </div>
                                <div className='dAcMCpjFUn'>
                                    <b>Address: </b>
                                    <span>
                                        {`${shippingInfoList[selectedShippingInfo].address},  
                                        ${shippingInfoList[selectedShippingInfo].ward},  
                                        ${shippingInfoList[selectedShippingInfo].provine}, 
                                        ${shippingInfoList[selectedShippingInfo].city}, 
                                        ${shippingInfoList[selectedShippingInfo].country}`}
                                    </span>
                                </div>
                                <div>
                                    <a className='iJD5wJxFlP' onClick={openChangeAddressModal}>Thay đổi</a>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className='payment-method-container'>
                    <b className='div-title'>Hình Thức Thanh Toán</b>
                    <div className='payment-list-container'>
                        <label className="CzKUFTbefV">
                            <input type="radio" name="payment-method" id="cod" checked={paymentMethod === 'cod'} onChange={onChangePaymentMethod} />
                            <span className="EB1bsExZU5"></span>
                            <img className='TbjUwLIbnv' src='/cod.png' />
                            <div className='zFUqXK1YDj'>
                                <span>COD</span><br />
                                <span>Thanh toán khi nhận hàng</span>
                            </div>
                        </label>
                        <label className="CzKUFTbefV">
                            <input type="radio" name="payment-method" id="appota" checked={paymentMethod === 'appota'} onChange={onChangePaymentMethod} />
                            <span className="EB1bsExZU5"></span>
                            <img className='TbjUwLIbnv1' src='/vnpay.png' />
                            <div className='zFUqXK1YDj'>Thanh toán bằng mã QR</div>
                        </label>
                    </div>
                </div>
            </div>
            <div className='payment-confirm-container'>
                <div className='payment-info'>
                    <div className='order-price-box'>
                        <b>Tổng Chi Phí Đơn Đặt Hàng:</b>
                        <div className='LOD6EzA8EK'>
                            <span>Tạm Tính:</span>
                            <span>{convertNumberToMoney(totalPrice)}<span className='price-unit'>đ</span></span>
                        </div>
                        <div className='LOD6EzA8EK'>
                            <span>Phí Giao Hàng:</span>
                            <span>{convertNumberToMoney(deliveryFee!)}<span className='price-unit'>đ</span></span>
                        </div>
                        <div className='payment-info-divider'></div>
                        <div className='LOD6EzA8EK'>
                            <span>Tổng:</span>
                            <span className='ZJWWuQvKvI'>{convertNumberToMoney(totalPrice + deliveryFee!)}<span className='price-unit'>đ</span></span>
                        </div>
                    </div>
                    <div className='confirm-order-button-container'>
                        <Button className='confirm-order-button' onClick={submitOrder}>Đặt Hàng</Button>
                    </div>
                </div>
            </div>

            <ChangeAddressModal
                visible={isOpenChangeAddressModal}
                addressList={shippingInfoList}
                onCancel={closeChangeAddressModal}
                selectedShippingInfo={selectedShippingInfo}
                changeSelectedShippingInfo={changeSelectedShippingInfo}
                openAddNewModal={openAddNewModal}
                onClickUpdateShippingInfo={onClickUpdateShippingInfo}
            />

            <AddNewShippingInfoModal
                visible={addNewModalVisible}
                onCancel={closeAddNewModal}
                canCancel={(shippingInfoList && shippingInfoList?.length > 0)}
                initialValues={onChangingShippingInfoValues}
            />
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        listProductInOrderState: state?.cartReducer?.listProductInOrder,
        shippingInfoList: state?.shippingInfoReducer?.shippingInfoList,
        isFetchingShippingInfo: state?.shippingInfoReducer?.isFetching,
        isErrorShippingInfo: state?.shippingInfoReducer?.error,
        savingFetching: state?.cartReducer?.savingFetching,
        addNewStatus: state?.shippingInfoReducer?.addNewStatus,
        updateStatus: state?.shippingInfoReducer?.updateStatus,
        isFetchingAdd: state?.shippingInfoReducer?.isFetchingAdd,
        addNewOrderStatus: state?.orderReducer?.addNewOrderStatus,
        paymentLink: state?.orderReducer?.paymentLink,
        deliveryFee: state?.orderReducer?.deliveryFee,
    };
};

export default connect(mapStateToProps)(OrderPage);

interface ChangeAddressModalProps {
    visible: boolean;
    addressList: ShippingInfoInterface[] | undefined;
    onCancel: () => void;
    selectedShippingInfo: number;
    changeSelectedShippingInfo: (index: number) => void;
    openAddNewModal: () => void;
    onClickUpdateShippingInfo: (address: ShippingInfoInterface) => void;
}

const ChangeAddressModal = (props: ChangeAddressModalProps) => {
    const {
        visible,
        addressList,
        onCancel,
        selectedShippingInfo,
        changeSelectedShippingInfo,
        openAddNewModal,
        onClickUpdateShippingInfo,
    } = props;
    const [tmpSelectedShippingInfo, setTmpSelecetedShippingInfo] = useState<number>(selectedShippingInfo);

    const onOk = () => {
        changeSelectedShippingInfo(tmpSelectedShippingInfo);
        onCancel();
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '1e1e1e',
                    borderRadius: 2,
                },
            }}
        >
            <Modal
                open={visible}
                centered title="Địa Chỉ Của Tôi"
                onCancel={onCancel}
                zIndex={999999}
                className='address-select-modal'
                closeIcon={null}
                onOk={onOk}
            >
                <div className='JkmdZcHSNB'>
                    {
                        addressList?.map((address, index) => (
                            <div key={`q9tE43GnWt-${index}`} className='osD86dX5Nr'>
                                <div className='blYGQciNev'>
                                    <div className='hNnjB1jR8E'>
                                        <Radio
                                            id="zRoCIH1eYW"
                                            className='ayEpHa7zTE'
                                            checked={index === tmpSelectedShippingInfo}
                                            onClick={() => { setTmpSelecetedShippingInfo(index) }}
                                        />
                                    </div>
                                    <div>
                                        <div className='HAhjsDFKTh'>
                                            <span>{address.name}</span><Divider type='vertical' /><span>{address.phone_number}</span>
                                        </div>
                                        <div className='b7oniqAKaH'>
                                            <span>{`${address.address}, ${address.ward}, ${address.provine}, ${address.city}, ${address.country}`}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='PALD3GsXaZ'>
                                    <a onClick={() => onClickUpdateShippingInfo(address)} className='u2Y7P47hIZ'>Chỉnh Sửa</a>
                                    {
                                        address.default &&
                                        <div className='nq6AR8yAWr'>
                                            Mặc định
                                        </div>
                                    }
                                </div>
                            </div>
                        ))
                    }
                    <Button className='PFM0aWTFfs' onClick={openAddNewModal}>
                        <div className='C2JSxaKtaa'>
                            <BsPlusLg style={{ marginRight: 5 }} /><span>Thêm Địa Chỉ Mới</span>
                        </div>
                    </Button>
                </div>
            </Modal>
        </ConfigProvider>
    )
}