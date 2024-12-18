import { Modal } from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { API } from "@/config/APIs";
import { useAuth } from "@/context/authContext";

const PaymentModels = ({
  batch,
  setBatch,
  currentStudent,
  setCurrentStudent,
  addPaymentsModel,
  setAddPaymentsModel,
  setUpdatePaymentsModel,
  updatePaymentsModel,
  from = "all-students",
}) => {
  const [auth] = useAuth();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [currentPaymentId, setCurrentPaymentId] = useState();

  const [completed, setCompleted] = useState(false);
  const [amount, setAmount] = useState(0);
  const [comment, setComment] = useState("");
  const [batchId, setBatchId] = useState("");

  const [paymentLoading, setPaymentLoading] = useState(false);

  const addPayments = async (e) => {
    e.preventDefault();

    try {
      if (!amount || !comment) {
        return toast.error("Fields are required**");
      }

      setPaymentLoading(true);

      const payload = {
        amount,
        comment,
        completed,
      };

      const { data } = await axios.put(`${API}/lms/add/${currentStudent._id}/${batch._id}/payments`, payload);

      if (data.ok) {
        if (from === "all-students") {
          setCurrent((prevCurrent) => ({
            ...prevCurrent,
            payments: [...prevCurrent.payments, { amount, comment, completed, batch: batchId }],
          }));
        } else if (from === "batches") {
          const updatedEnrolledStudents = batch.enrolledStudents.map((student) => {
            if (student._id === currentStudent._id) {
              return {
                ...student,
                payments: [
                  ...student.payments,
                  {
                    completed,
                    amount,
                    comment,
                    addBy: auth?.user?._id,
                    batch: {
                      _id: batch._id,
                    },
                  },
                ],
              };
            }
            return student;
          });

          setBatch((prevBatch) => ({
            ...prevBatch,
            enrolledStudents: updatedEnrolledStudents,
          }));
        }

        toast.success("Payment is added successfully");

        setPaymentLoading(false);
        setAmount(0);
        setCompleted(false);
        setComment("");
        setBatchId("");
      }
    } catch (error) {
      setPaymentLoading(false);
      console.log(error);
    }
  };

  const updatePayment = async () => {
    try {
      if (!amount || !comment) {
        return toast.error("Fields are required**");
      } else {
        setPaymentLoading(true);
        const { data } = await axios.put(`${API}/lms/update/${currentStudent._id}/${currentPaymentId}/${batch?._id}/payments`, {
          amount,
          comment,
          completed,
        });
        if (data.ok) {
          setPaymentLoading(false);
          toast.success("Added");
          setAmount(0);
          setComment("");
          setCompleted(false);

          if (from === "all-students") {
            setCurrent((prevCurrent) => ({
              ...prevCurrent,
              payments: [...prevCurrent.payments, { completed, amount, comment }],
            }));
          } else if (from === "batches") {
            console.log("running...");
            const updatedData = {
              comment,
              completed,
              amount,
              batch: { _id: batchId },
            };

            const updatedEnrolledStudents = batch.enrolledStudents.map((student) => {
              if (student._id === currentStudent._id) {
                const updatedPayments = student.payments.map((payment) => {
                  if (payment.batch._id === batch._id) {
                    return {
                      ...payment,
                      ...updatedData,
                    };
                  }
                  return payment;
                });

                return {
                  ...student,
                  payments: updatedPayments,
                };
              }
              return student;
            });

            setBatch((prevBatch) => ({
              ...prevBatch,
              enrolledStudents: updatedEnrolledStudents,
            }));
          }
        }
      }
    } catch (error) {
      setPaymentLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    let studentPayment = currentStudent && currentStudent.payments?.find((x) => x.batch._id === batch._id);
    if (studentPayment) {
      setBatchId(batch._id);
      setAmount(studentPayment.amount);
      setComment(studentPayment.comment);
      setCompleted(studentPayment.completed);
      setCurrentPaymentId(studentPayment._id);
    }
  }, [currentStudent, currentStudent.payments, batch?._id]);

  return (
    <>
      <Modal title={`Add Payments`} centered open={addPaymentsModel} onOk={addPayments} onCancel={() => setAddPaymentsModel(false)} width={500}>
        {paymentLoading && <p>loading...</p>}
        <form onSubmit={addPayments}>
          <div className="my-2">
            <label>Amount</label>
            <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="my-2">
            <label>Comment</label>
            <input type="text" className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} />
          </div>

          <div className="d-flex justify-content-start align-items-center gap-3 my-2">
            <label>Is Complete?</label>
            <input type="checkbox" checked={completed} onChange={(e) => setCompleted(!completed)} />
          </div>

          {currentStudent?.completedBatches?.length > 0 && (
            <div className="form-group py-2">
              <label> Select From Completed Batches </label>
              <select value={batchId} onChange={(e) => setBatchId(e.target.value)} className="form-control" name="batchId">
                <option>* Select From Completed Batches</option>
                {from === "all-students"
                  ? batch?.completedBatches?.map((x, index) => (
                      <option key={index} value={x._id}>
                        {x.title}
                      </option>
                    ))
                  : batch?.completedBatches?.map((x, index) => (
                      <option key={index} value={x}>
                        {x}
                      </option>
                    ))}
              </select>
            </div>
          )}
        </form>
      </Modal>

      {/* update payments */}
      <Modal title={`Update Payment`} centered open={updatePaymentsModel} onOk={updatePayment} onCancel={() => setUpdatePaymentsModel(false)} width={500}>
        {paymentLoading && <p>loading...</p>}
        <form onSubmit={updatePayment}>
          <div className="my-2">
            <label>Amount</label>
            <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className="my-2">
            <label>Comment</label>
            <input type="text" className="form-control" value={comment} onChange={(e) => setComment(e.target.value)} />
          </div>

          <div className="d-flex justify-content-start align-items-center gap-3 my-2">
            <label>Is Complete?</label>
            <input type="checkbox" checked={completed} onChange={(e) => setCompleted(!completed)} />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default PaymentModels;
