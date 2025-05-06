"use client";
import FarmerLayout from "@/components/maincomp/FarmerLayout";
import { useState } from "react";
import "cally";

export default function Preharvest() {
  const [formData, setFormData] = useState({
    fullName: "",
    ssn: "",
    dob: "",
    phone: "",
    email: "",
    residentialAddress: "",
    mailingAddress: "",
    citizenshipStatus: "",
    businessName: "",
    entityType: "",
    ein: "",
    usdaFarmNumber: "",
    farmLocation: "",
    yearsInOperation: "",
    annualIncome: "",
    previousLoans: "",
    landStatus: "",
    landSize: "",
    crops: [],
    areaPerCrop: "",
    irrigationType: "",
    equipmentOwned: "",
    soilType: "",
    practices: "",
    loanAmount: "",
    loanPurpose: "",
    loanTerm: "",
    loanType: "",
    disbursementDate: "",
    expectedYield: "",
    repaymentSource: "",
    cropInsurance: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
    creditScore: "",
    agree: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCropsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
    setFormData((prev) => ({ ...prev, crops: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    setIsSubmitted(true);
  };

  return (
    <FarmerLayout>
      <div className="text-black min-h-screen flex justify-center items-center px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-4xl">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#6f9d7e]">
              Pre-Harvest Loan Application
            </h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h1>Full Name</h1>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label>SSN</label>
                  <input
                    name="ssn"
                    value={formData.ssn}
                    onChange={handleChange}
                    placeholder="123-45-6789"
                    className="w-full border p-2 rounded"
                    required
                  />
                 
                </div>

                <div>
                  <label>Date of Birth</label>
                  <input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label>Phone</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 555-5555"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@email.com"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label>Residential Address</label>
                  <input
                    name="residentialAddress"
                    value={formData.residentialAddress}
                    onChange={handleChange}
                    placeholder="123 Main St"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label>Mailing Address</label>
                  <input
                    name="mailingAddress"
                    value={formData.mailingAddress}
                    onChange={handleChange}
                    placeholder="(Optional)"
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label>Citizenship</label>
                  <select
                    name="citizenshipStatus"
                    onChange={handleChange}
                    className="w-full border py-2.5 px-2 rounded"
                    required
                  >
                    <option value="">Select</option>
                    <option value="US Citizen">US Citizen</option>
                    <option value="Permanent Resident">
                      Permanent Resident
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label>Business Name</label>
                  <input
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Doe Farms LLC"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label>Entity Type</label>
                  <select
                    name="entityType"
                    onChange={handleChange}
                    className="w-full border py-2.5 px-2 rounded"
                  >
                    <option value="">Select</option>
                    <option value="Sole Proprietorship">
                      Sole Proprietorship
                    </option>
                    <option value="LLC">LLC</option>
                    <option value="Corporation">Corporation</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label>EIN</label>
                  <input
                    name="ein"
                    value={formData.ein}
                    onChange={handleChange}
                    placeholder="12-3456789"
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label>USDA Farm #</label>
                  <input
                    name="usdaFarmNumber"
                    value={formData.usdaFarmNumber}
                    onChange={handleChange}
                    placeholder="123456"
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label>Farm Location</label>
                  <input
                    name="farmLocation"
                    value={formData.farmLocation}
                    onChange={handleChange}
                    placeholder="Iowa, Polk County"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label>Years in Operation</label>
                  <input
                    name="yearsInOperation"
                    value={formData.yearsInOperation}
                    onChange={handleChange}
                    placeholder="5"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label>Annual Income ($)</label>
                  <input
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    placeholder="50000"
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label>Previous Loans</label>
                  <input
                    name="previousLoans"
                    value={formData.previousLoans}
                    onChange={handleChange}
                    placeholder="Yes - USDA 2022"
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label>Land Status</label>
                  <select
                    name="landStatus"
                    onChange={handleChange}
                    className="w-full border py-2.5 px-2 rounded"
                  >
                    <option value="">Select</option>
                    <option value="Owned">Owned</option>
                    <option value="Leased">Leased</option>
                  </select>
                </div>
                <div>
                  <label>Land Size (acres)</label>
                  <input
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleChange}
                    placeholder="150"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label>Crops</label>
                  <select
                    name="crops"
                    onChange={handleChange}
                    className="w-full border py-2.5 px-2 rounded"
                  >
                    <option value="">Select</option>
                    <option value="Corn">Corn</option>
                    <option value="Soybean">Soybean</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Rice">Rice</option>
                    <option value="Vegetables">Vegetables</option>
                  </select>
                </div>

                <div>
                  <label>Area per Crop</label>
                  <input
                    name="areaPerCrop"
                    value={formData.areaPerCrop}
                    onChange={handleChange}
                    placeholder="50 Corn, 30 Soy"
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label>Irrigation Type</label>
                  <input
                    name="irrigationType"
                    value={formData.irrigationType}
                    onChange={handleChange}
                    placeholder="Drip/Sprinkler"
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label>Equipment Owned</label>
                  <input
                    name="equipmentOwned"
                    value={formData.equipmentOwned}
                    onChange={handleChange}
                    placeholder="Tractor, Seeder"
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label>Soil Type</label>
                  <input
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleChange}
                    placeholder="Loamy"
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div className="">
                  <label>Farming Practices</label>
                  <input
                    name="practices"
                    value={formData.practices}
                    onChange={handleChange}
                    placeholder="Organic / Conventional"
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label>Loan Amount ($)</label>
                  <input
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    placeholder="10000"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label>Purpose</label>
                  <input
                    name="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={handleChange}
                    placeholder="Buy Tractor"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label>Term (months)</label>
                  <input
                    name="loanTerm"
                    value={formData.loanTerm}
                    onChange={handleChange}
                    placeholder="24"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label>Loan Type</label>
                  <input
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleChange}
                    placeholder="Operating"
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label>Disbursement Date</label>
                  <input
                    name="disbursementDate"
                    type="date"
                    value={formData.disbursementDate}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label>Expected Yield</label>
                  <input
                    name="expectedYield"
                    value={formData.expectedYield}
                    onChange={handleChange}
                    placeholder="100 tons / $20K"
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label>Repayment Source</label>
                  <input
                    name="repaymentSource"
                    value={formData.repaymentSource}
                    onChange={handleChange}
                    placeholder="Crop sales"
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label>Crop Insurance</label>
                  <select
                    name="cropInsurance"
                    onChange={handleChange}
                    className="w-full border py-2.5 px-2 rounded"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label>Bank Name</label>
                  <input
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="Bank of America"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label>Account Number</label>
                  <input
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="123456789"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label>Routing Number</label>
                  <input
                    name="routingNumber"
                    value={formData.routingNumber}
                    onChange={handleChange}
                    placeholder="111000025"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label>Credit Score</label>
                  <input
                    name="creditScore"
                    value={formData.creditScore}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              <div className="pt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    required
                  />
                  <span>I certify the information is accurate.</span>
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="w-full mt-4 bg-[#6f9d7e]  text-[#FFE990] px-6 py-3 rounded hover:bg-[#FFE990] hover:text-[#6f9d7e] transition duration-200 ease-in-out"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>

        {isSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">
                Application Submitted
              </h2>
              <p className="mb-4">
                Thank you! Your loan application has been submitted
                successfully.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#6f9d7e] text-[#FFE990] px-4 py-2 rounded  hover:bg-[#FFE990] hover:text-[#6f9d7e] transition duration-200 ease-in-out"

              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </FarmerLayout>
  );
}
