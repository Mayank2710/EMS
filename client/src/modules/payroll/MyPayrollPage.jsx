import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../shared/layouts/DashboardLayout";

import {
  getPayrolls,
  downloadPayslip,
} from "../../features/payrollApi";

import "./MyPayrollPage.css";

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

function MyPayrollPage() {
  const [
    payrolls,
    setPayrolls,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const loadPayrolls =
    async () => {
      try {
        const response =
          await getPayrolls();

        setPayrolls(
          response.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadPayrolls();
  }, []);

  const handleDownload =
    async (id) => {
      try {
        await downloadPayslip(
          id
        );
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Failed to download payslip"
        );
      }
    };

  return (
    <DashboardLayout>
      <div className="my-payroll-page">
        <h1>
          My Payroll
        </h1>

        {loading ? (
          <div className="empty-state">
            Loading payrolls...
          </div>
        ) : payrolls.length ===
          0 ? (
          <div className="empty-state">
            No payroll records found.
          </div>
        ) : (
          <div className="my-payroll-list">
            {payrolls.map(
              (
                payroll
              ) => (
                <div
                  key={
                    payroll._id
                  }
                  className="my-payroll-card"
                >
                  <h3>
                    {
                      MONTHS.find(
                        (
                          month
                        ) =>
                          month.value ===
                          payroll.month
                      )?.label
                    }{" "}
                    {payroll.year}
                  </h3>

                  <p>
                    <strong>
                      Basic Salary:
                    </strong>{" "}
                    ₹
                    {Number(
                      payroll.basicSalary
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <p>
                    <strong>
                      Bonus:
                    </strong>{" "}
                    ₹
                    {Number(
                      payroll.bonus
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <p>
                    <strong>
                      Deduction:
                    </strong>{" "}
                    ₹
                    {Number(
                      payroll.deduction
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <p>
                    <strong>
                      Net Salary:
                    </strong>{" "}
                    ₹
                    {Number(
                      payroll.netSalary
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <div
                    className={`status ${
                      payroll.status?.toLowerCase()
                    }`}
                  >
                    {payroll.status}
                  </div>

                  <button
                    className="download-btn"
                    onClick={() =>
                      handleDownload(
                        payroll._id
                      )
                    }
                  >
                    Download Payslip
                  </button>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default MyPayrollPage;