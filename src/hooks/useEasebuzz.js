import { initiateEasebuzzPayment } from "../services/easebuzzService";

const useEasebuzz = () => {
  const startEasebuzzPayment = async (orderData) => {
    try {
      const response = await initiateEasebuzzPayment(orderData);
      if (response.status === 1 && response.paymentUrl) {
        // window.open(response.paymentUrl, "_blank", "width=600,height=700");
        return { success: true, data: response };
      } else {
        return { success: false, error: response.msg };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return { startEasebuzzPayment };
};

export default useEasebuzz;
