import { Table, Image, Button } from "react-bootstrap"
import { RxCross2 } from "react-icons/rx";
import { useCart } from "../../../context/CartContext";
import { BsCartXFill, BsCartCheckFill } from "react-icons/bs";
import { useState } from "react";
import Counter from "./Counter";
import "./CartTable.css"
import OrderForm from "../../order/OrderForm";

const CartTable = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const total = cart.reduce((acc, item) => acc + item.subtotal, 0);
    const [showModal, setShowModal] = useState(false);
    const handleClick = async () => {
        setShowModal(true);
    };




    return (
        <>
            <Table responsive className='cart-Table'>
                <tbody>
                    {cart.map((product, index) => (
                        <tr key={index}>
                            <th className="image-header">
                                {
                                    (product.item.imageUrl) ? (<Image className="image-table" src={product.item.imageUrl} thumbnail />)
                                        : <Image className="image-table" src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500" thumbnail />

                                }
                            </th>
                            <th className="name">
                                {product.item.denomination}
                            </th>
                            <th className="counter">

                                <Counter
                                    width={15}
                                    quantity={product.quantity || 1}
                                    item={product.item}
                                />
                            </th>
                            <th className="price">
                                {`$${product.item.price.sellPrice}`}
                            </th>
                            <th className="remove">
                                <button
                                    type="button"
                                    className="circle-Remove-th"
                                    onClick={() => {
                                        removeFromCart(product.item);
                                    }}
                                >
                                    <RxCross2 className="image-remove" />
                                </button>
                            </th>
                        </tr>
                    ))}
                    {cart.length > 0 ? (
                        <tr>
                            <th className="clear"><BsCartXFill onClick={() => clearCart()} className="shopping-clear-cart-icon" /></th>
                            <th colSpan={2} className="total">Total</th>
                            <th colSpan={2} className="price-total">{`$${total}`}</th>
                        </tr>

                    ) : (
                        <tr>
                            <th colSpan={5} className="empty-cart-message">
                                <Button href="/" className="button-addProduct">
                                    Agregue un Producto al Carrito ⮕
                                </Button>
                            </th>
                        </tr>
                    )}
                </tbody>
            </Table>
            {cart.length > 0 && (
                <div className="div-button-buyProduct">
                    <Button className="button-buyProduct" onClick={handleClick} >
                        Comprar Productos <BsCartCheckFill className="shopping-buy-cart-icon" />
                    </Button>
                </div>
            )}
            
            {showModal && (
                <OrderForm show={showModal} setShowModal={setShowModal} />
            )}
        </>
    );
}

export default CartTable;
