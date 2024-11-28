import axios from "axios";

import React from "react";
import Card from "./Card";

const Home = () => {
  const chackoutHandler = async (amount) => {
    const { data } = await axios.post("http://localhost:4000/api/order", {
      amount,
    });

    const {
      data: { keyId },
    } = await axios.get("http://localhost:4000/api/getkey");

    const options = {
      key: keyId, // Enter the Key ID generated from the Dashboard
      amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Jatin Raval",
      description: "Test Transaction",
      image: "https://res.cloudinary.com/dzkd5zwnz/image/upload/v1729594898/milan/1729594895072-jatinProfile.jpg",
      order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "http://localhost:4000/api/paymentVerification",
      prefill: {
        name: "Jatin Raval",
        email: "Jatin@example.com",
        contact: "7887788778",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#EB3E56",
      },
    };
    const razor = new Razorpay(options);
    razor.open();
  };

  return (
    <>
      <h2 className="text-center text-5xl font-bold mb-10">Product List</h2>
      <div className="flex justify-center items-center">
        <Card
          chackoutHandler={chackoutHandler}
          amount={5000}
          image="https://th.bing.com/th/id/OIP.yaxfsfMeCPqMQx-s2FHGRQHaFf?pid=ImgDet&rs=1"
        />
        <Card
          chackoutHandler={chackoutHandler}
          amount={6000}
          image="https://th.bing.com/th/id/OIP.wIX0BanzjbbmuUgLy6VJ6QHaHa?pid=ImgDet&rs=1"
        />
      </div>
    </>
  );
};

export default Home;
