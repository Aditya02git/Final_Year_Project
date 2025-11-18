import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { AppWrapper } from '../layouts/AppWrapper';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get appointment data from navigation state
  const { appointment, selectedDate, selectedTime } = location.state || {};

  // Redirect if no appointment data
  if (!appointment) {
    return (
      <div className="card max-w-2xl mx-auto bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <p className="text-error mb-4">No appointment data found</p>
          <button onClick={() => navigate("/appointment")} className="btn btn-primary">
            Book an Appointment
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    
    try {

      // Add your payment processing logic here
      //Stripe or any other payment gateway integration   
      // For example, calling a payment API
      
      // Simulate payment delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // After successful payment, navigate to confirmation
      navigate("/confirmation", { 
        state: { 
          appointment, 
          selectedDate, 
          selectedTime 
        },
        replace: true // This prevents going back to payment page
      });
    } catch (error) {
      console.error("Payment failed:", error);
      setIsProcessing(false);
      // Handle error (show error message to user)
    }
  };

  return (
    <AppWrapper>
        <div className="card max-w-2xl mx-auto bg-base-100 shadow-xl">
        <div className="card-body">
            <h1 className="card-title text-2xl mb-4">Payment</h1>
            
            <div className="space-y-2 mb-6">
            <p><strong>Counselor:</strong> {appointment.counselorId?.name}</p>
            <p><strong>Amount:</strong> ₹{appointment.paymentAmount || appointment.counselorId?.sessionFee}</p>
            <p><strong>Date:</strong> {selectedDate && new Date(selectedDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {selectedTime}</p>
            </div>

            <button 
            onClick={handlePayment} 
            className="btn btn-primary w-full"
            disabled={isProcessing}
            >
            {isProcessing ? (
                <>
                <Loader className="h-4 w-4 animate-spin mr-2" />
                Processing...
                </>
            ) : (
                'Pay Now'
            )}
            </button>
            
            <button 
            onClick={() => navigate("/appointment")} 
            className="btn btn-outline w-full mt-2"
            disabled={isProcessing}
            >
            Cancel
            </button>
        </div>
        </div>
    </AppWrapper>
  );
};

export default PaymentPage;