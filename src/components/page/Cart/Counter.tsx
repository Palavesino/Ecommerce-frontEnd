import React from "react";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import "./Counter.css";
import { useCart } from "../../../context/CartContext";
import { Product } from "../../../interface/Product";
interface CounterProps {
  width?: number;
  height?: number;
  quantity: number;
  item?: Product;
}
const Counter: React.FC<CounterProps> = ({ width, height, item, quantity }) => {
  const { addToCart, decreaseCartQuantity } = useCart();
  return (
    <>
      <div
        className="div-counter"
        style={{
          width: `${width ? (width * 100) / 12 : ""}%`,
          height: `${height ? (height * 100) / 12 : ""}%`,
        }}
      >
        <button
          type="button"
          className="circle-Remove"
          onClick={() => {
            if (item) {
              decreaseCartQuantity(item);
            }
          }}
        >

          <IoMdRemove className="icon-Remove" />
        </button>
        <span className="counter">{quantity}</span>
        <button type="button" className="circle-Add"
          onClick={() => {
            if (item) {
              addToCart(item);
            }
          }}
        >
          <IoMdAdd className="icon-Add" />
        </button>
      </div>
    </>
  );
};

export default Counter;
