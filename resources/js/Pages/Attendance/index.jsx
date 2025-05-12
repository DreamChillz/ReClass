import React, { useState, useEffect } from "react";
import styles from "./Billing.module.css";
import { Printer, Trash, X } from "lucide-react";
import AppLayout from "@/Layouts/AppLayout";

export default function Attendance() {
  const [transactions, setTransactions] = useState([]); // Store transaction data
  const [transactionCount, setTransactionCount] = useState(0); // Store total count
  const [statusFilter, setStatusFilter] = useState(""); // Store selected status
  const [selectedTransaction, setSelectedTransaction]=useState(null);


  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // Formatting date function
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { timeZone: "Asia/Kuala_Lumpur" });
  }

  //Filter Transactions
  const filteredTransactions = transactions.filter(
    (transaction) =>
      statusFilter === "" || transaction.payment_status === statusFilter
  );



   // For Select All Function
  const [SelectAll, setSelectAll] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState({});

  const handleSelectAll = (event) => {
      const isChecked = event.target.checked;
      setSelectAll(isChecked);
  
      const updatedTransaction = {};
      currentTransactions.forEach(transaction => {
        updatedTransaction[transaction.transaction_id] = isChecked;
      });
  
      setSelectedTransactions(updatedTransaction);
  };

  const handleSelectTransactions = (event, transaction_id) => {
      const isChecked = event.target.checked;
  
      setSelectedTransactions((prev) => {
          const updatedTransaction = { ...prev, [transaction_id]: isChecked };
  
          const allSelected = Object.values(updatedTransaction).every((val) => val === true);
          setSelectAll(allSelected);
  
          return updatedTransaction;
      });
  };

  // Bottom Page Function
  const [currentPage, setCurrentPage] = useState(1);
  const transactionPerPage = 9;

  const totalPages = Math.ceil(transactionCount / transactionPerPage);
  const startIndex = (currentPage - 1) * transactionPerPage;
  const endIndex = startIndex + transactionPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.billingContent}>
      {/* top row function for table */}
      <div className={styles.billingFunction}>
        <h3>
          All Billing&nbsp;&nbsp;
          <span className={styles.transactionCount}>({transactionCount})</span>
        </h3>

        {/* dropdown sort by */}
        <div className={styles.billingActions}>
          <select
            className={styles.statusFilter}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="" disabled hidden>
              Filter By
            </option>
            <option value="">All</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
          <button className={styles.deleteTransactionButton} onClick={() => handleDeleteClick(null)}>Delete Selected</button>
        </div>
      </div>

      {/*transaction table */}
      <table className={styles.transactionTable}>
        <thead>
          <tr>
            <th className={styles.checkboxuserid}>
              <div className={styles.checkboxContainer}>
                <input type="checkbox" checked={SelectAll} onChange={handleSelectAll} />
                <span>Transaction ID</span>
              </div>
            </th>
            <th>User ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentTransactions.map((transaction) => (
            <tr key={transaction.transaction_id}>
              <td className={styles.checkboxuserid}>
                <div className={styles.checkboxContainer}>
                  <input type="checkbox" checked={selectedTransactions[transaction.transaction_id] || false} onChange={(e) => handleSelectTransactions(e, transaction.transaction_id)} />
                  <span>{transaction.transaction_id}</span>
                </div>
              </td>

              <td>{transaction.user_id}</td>
              <td>{transaction.description}</td>
              <td>${transaction.amount}</td>
              <td>{formatDate(transaction.payment_date) || "—"}</td>
              <td
                className={
                  transaction.payment_status === "Paid"
                    ? styles.paid
                    : transaction.payment_status === "Overdue"
                      ? styles.overdue
                      : styles.pending
                }
              >
                {transaction.payment_status}
              </td>
              <td>
                <button className={styles.printButton} onClick={() => handlePrintClick(transaction)}>
                  <Printer size={20} />
                </button>
                <button
                  className={styles.trashButton}
                  onClick={() => handleDeleteClick(transaction.transaction_id)}
                >
                  <Trash size={20} />
                </button>

                {
                  showPrintOverlay && selectedTransaction && (
                    <PrintOverlay
                      show={showPrintOverlay}
                      onClose={() => { setShowPrintOverlay(false) }}
                      transactionData={selectedTransaction}
                    />
                  )
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {/* pages under table */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? styles.active : ""}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

Attendance.layout = page => <AppLayout>{page}</AppLayout>

