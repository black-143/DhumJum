import React, { useEffect, useState } from "react";
import "./admin-dashboard.css";
import axios from "axios";
import BarChart from "../graphs/bar-chart";

function AdminDashBoard({ responseData }) {
  const [apiData, setApiData] = useState(null);

  const [formData, setFormData] = useState({
    isChargeable: null,
    customAmount: null,
    category6Amount: null,
    category7Amount: null,
    category8Amount: null,
    category9Amount: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://stg.dhunjam.in/account/admin/${responseData.data.id}`
        );
        setApiData(response.data);

        // Set initial values for input fields
        setFormData({
          isChargeable: response.data.data.charge_customers,
          customAmount: response.data.data.amount.category_6,
          category6Amount: response.data.data.amount.category_6,
          category7Amount: response.data.data.amount.category_7,
          category8Amount: response.data.data.amount.category_8,
          category9Amount: response.data.data.amount.category_9,
        });

        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [responseData]);

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  return (
    <form className="admin-dashboard-container">
      {apiData && (
        <>
          <h2 className="heading">
            {apiData.data.name}, {apiData.data.location} on Dhun Jam
          </h2>
          <div className="container">
            <div className="left-side">
              <span>
                Do you want to charge your customers for requesting songs?
              </span>
            </div>
            <div className="right-side">
              <label>
                <input
                  type="radio"
                  name="isChargeable"
                  value="yes"
                  checked={formData.isChargeable === true}
                  onChange={() => handleInputChange("isChargeable", true)}
                  required
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="isChargeable"
                  value="no"
                  checked={formData.isChargeable === false}
                  onChange={() => handleInputChange("isChargeable", false)}
                  required
                />
                No
              </label>
            </div>
          </div>
          <div className="container">
            <div className="left-side">
              <span>Custom song request amount-</span>
            </div>
            <div className="right-side">
              <input
                type="number"
                value={formData.customAmount}
                disabled={!formData.isChargeable}
                onChange={(e) =>
                  handleInputChange("customAmount", e.target.value)
                }
                min={"99"}
              />
            </div>
          </div>
          <div className="container">
            <div className="left-side">
              <span>
                Regular song request amounts, <br /> from high to low-
              </span>
            </div>
            <div className="right-side">
              <div className="options-fields">
                <input
                  type="number"
                  value={formData.category6Amount}
                  disabled={!formData.isChargeable}
                  onChange={(e) =>
                    handleInputChange("category6Amount", e.target.value)
                  }
                  min={"79"}
                />
                <input
                  type="number"
                  value={formData.category7Amount}
                  disabled={!formData.isChargeable}
                  onChange={(e) =>
                    handleInputChange("category7Amount", e.target.value)
                  }
                  min={"59"}
                />
                <input
                  type="number"
                  value={formData.category8Amount}
                  disabled={!formData.isChargeable}
                  onChange={(e) =>
                    handleInputChange("category8Amount", e.target.value)
                  }
                  min={"39"}
                />
                <input
                  type="number"
                  value={formData.category9Amount}
                  disabled={!formData.isChargeable}
                  onChange={(e) =>
                    handleInputChange("category9Amount", e.target.value)
                  }
                  min={"19"}
                />
              </div>
            </div>
          </div>
          {formData.isChargeable === true && (
            <div className="graph-container">
              <h2 className="inr-symbol">₹</h2>
              <BarChart dataElements={formData} />
            </div>
          )}
          <button
            type="submit"
            className="save-button"
            disabled={
              formData.customAmount < 99 ||
              formData.category6Amount < 79 ||
              formData.category7Amount < 59 ||
              formData.category8Amount < 39 ||
              formData.category9Amount < 19
            }
          >
            Save
          </button>
        </>
      )}
    </form>
  );
}

export default AdminDashBoard;
