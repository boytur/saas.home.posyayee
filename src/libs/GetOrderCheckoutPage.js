import Axios from "./Axios";
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe("pk_test_51P9gsXCPTcd3FEc3kKlUTmAeCY9cir69z0dvIVnSAQntGoSI4YnkcqQlkjBqEwofIhQcut970J0Px8hK4nVbAQLv00hgzZXCLb");

const GetOrderCheckoutPage = async (data) => {
    try {

        if (!data) {
            alert("No data for get payment order!");
            return;
        }

        let order_session_id;
        const response = await Axios.get(`/api/payment/get-payment-order/${data.order.order_id}`);

        if (response.status === 200) {
            order_session_id = response.data?.order?.order_session_id;
        } else {
            return;
        }

        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            sessionId: order_session_id,
        });

        if (error) {
            console.error(error);
        }
    }
    catch (err) {
        console.log("Error while getting order session id: ", err);
    }
}

export default GetOrderCheckoutPage;
