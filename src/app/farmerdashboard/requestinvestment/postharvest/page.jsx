"use client";
import { commodityOptions, investmentOptions } from "@/app/content/data";
import FarmerLayout from "@/components/maincomp/FarmerLayout";
import { getDecodedAuthToken } from "@/content/data";
import { useEffect, useState } from "react";

export default function PostHarvest() {
  const [formData, setFormData] = useState({
    // Section 1: Farmer & Farm Details
    fullName: "",
    usdaFarmNumber: "",
    farmLocation: "",
    totalAcres: "",
    primaryCommodity: "",

    // Section 2: Harvest Details
    harvestDate: "",
    totalYield: "",
    yieldUnit: "bushels", // default
    currentStorageMethod: "",

    // Section 3: Post-Harvest Needs
    investmentType: [], // multi-select
    coldStorageRequired: false,
    coldStorageCapacity: "",
    processingType: "",
    packagingNeeds: "",
    transportationDistance: "",
    marketingChannels: [],

    // Section 4: Financial Requirements
    totalInvestmentRequired: "",
    fundingSources: [],
    existingFacilities: "",
    expectedROI: "",

    // Section 5: Business Plan
    targetMarkets: "",
    valueAddedProducts: "",
    sustainabilityPractices: "",

    // Section 6: Supporting Documents
    hasBusinessPlan: false,
    hasFeasibilityStudy: false,
    agreeTerms: false,
  });
  const [userId, setUserId] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Options for dropdowns/multi-selects
  useEffect(() => {
    const userData = getDecodedAuthToken();
    // console.log("userData", userData);
    if (userData) {
      console.log("User Info:", userData);
      setUserId(userData?._id || userData?.id);
    } else {
      console.log("No valid token found");
    }
  }, []);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "investmentType") {
        const updated = formData.investmentType.includes(value)
          ? formData.investmentType.filter((item) => item !== value)
          : [...formData.investmentType, value];
        setFormData((prev) => ({ ...prev, investmentType: updated }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Post-Harvest Form Data:", formData);
  //   setIsSubmitted(true);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...formData, userId };
    console.log("Form Data:", payload);
    try {
      const res = await fetch("/api/farmer/postHarvest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await res.json();
      console.log("Server Response:", data);

      // setIsSubmitted(true);
      setLoading(true);
      setFormData({
        fullName: "",
        usdaFarmNumber: "",
        farmLocation: "",
        totalAcres: "",
        primaryCommodity: "",

        // Section 2: Harvest Details
        harvestDate: "",
        totalYield: "",
        yieldUnit: "bushels", // default
        currentStorageMethod: "",

        // Section 3: Post-Harvest Needs
        investmentType: [], // multi-select
        coldStorageRequired: false,
        coldStorageCapacity: "",
        processingType: "",
        packagingNeeds: "",
        transportationDistance: "",
        marketingChannels: [],

        // Section 4: Financial Requirements
        totalInvestmentRequired: "",
        fundingSources: [],
        existingFacilities: "",
        expectedROI: "",

        // Section 5: Business Plan
        targetMarkets: "",
        valueAddedProducts: "",
        sustainabilityPractices: "",

        // Section 6: Supporting Documents
        hasBusinessPlan: false,
        hasFeasibilityStudy: false,
        agreeTerms: false,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong, please try again.");
    }
  };

  return (
    <FarmerLayout>
      <div className="text-black min-h-screen flex justify-center items-center px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-xl shadow-2xl w-full max-w-4xl">
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#6f9d7e]">
              Post-Harvest Investment Request
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label>Full Name</label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label>USDA Farm Number</label>
                  <input
                    name="usdaFarmNumber"
                    value={formData.usdaFarmNumber}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label>Farm Location (County, State)</label>
                  <input
                    name="farmLocation"
                    value={formData.farmLocation}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label>Total Farm Acres</label>
                  <input
                    name="totalAcres"
                    type="number"
                    value={formData.totalAcres}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div className="md:col-span-2">
                  <label>Primary Commodity</label>
                  <select
                    name="primaryCommodity"
                    value={formData.primaryCommodity}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  >
                    <option value="">Select Commodity</option>
                    {commodityOptions.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label>Last Harvest Date</label>
                  <input
                    name="harvestDate"
                    type="date"
                    value={formData.harvestDate}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label>Total Yield</label>
                  <div className="flex">
                    <input
                      name="totalYield"
                      type="number"
                      value={formData.totalYield}
                      onChange={handleChange}
                      className="w-3/4 border p-2 rounded-l"
                    />
                    <select
                      name="yieldUnit"
                      value={formData.yieldUnit}
                      onChange={handleChange}
                      className="w-1/4 border-t border-r border-b p-2 rounded-r"
                    >
                      <option value="bushels">Bushels</option>
                      <option value="tons">Tons</option>
                      <option value="pounds">Pounds</option>
                      <option value="crates">Crates</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label>Current Storage Method</label>
                  <textarea
                    name="currentStorageMethod"
                    value={formData.currentStorageMethod}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Describe your current storage facilities/methods"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2">
                    Investment Type Needed (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {investmentOptions.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          name="investmentType"
                          value={option}
                          checked={formData.investmentType.includes(option)}
                          onChange={handleChange}
                          className="h-4 w-4 text-green-600"
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label>Cold Storage Capacity Needed (cu. ft.)</label>
                    <input
                      name="coldStorageCapacity"
                      type="number"
                      value={formData.coldStorageCapacity}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                      disabled={
                        !formData.investmentType.includes(
                          "Cold Storage Facility"
                        )
                      }
                    />
                  </div>

                  {/* <div>
                    <label>Processing Type Needed</label>
                    <input
                      name="processingType"
                      value={formData.processingType}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                      placeholder="e.g., washing, sorting, freezing"
                      disabled={
                        !formData.investmentType.includes(
                          "Processing Equipment"
                        )
                      }
                    />
                  </div> */}
                  <div>
                    <label>Processing Type Needed</label>
                    <input
                      type="text"
                      name="processingType"
                      value={formData.processingType}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                      placeholder="e.g., washing, sorting, freezing"
                      disabled={
                        !(Array.isArray(formData.investmentType)
                          ? formData.investmentType.includes(
                              "Processing Equipment"
                            )
                          : formData.investmentType === "Processing Equipment")
                      }
                    />
                  </div>

                  <div>
                    <label>Packaging Needs</label>
                    <input
                      name="packagingNeeds"
                      value={formData.packagingNeeds}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                      placeholder="e.g., vacuum sealing, clamshells"
                      disabled={
                        !formData.investmentType.includes("Packaging Line")
                      }
                    />
                  </div>

                  <div>
                    <label>Average Transportation Distance (miles)</label>
                    <input
                      name="transportationDistance"
                      type="number"
                      value={formData.transportationDistance}
                      onChange={handleChange}
                      className="w-full border p-2 rounded"
                      disabled={
                        !formData.investmentType.includes(
                          "Transportation Vehicles"
                        )
                      }
                    />
                  </div>
                </div>

                <div>
                  <label>Target Marketing Channels</label>
                  <textarea
                    name="targetMarkets"
                    value={formData.targetMarkets}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Farmers markets, grocery chains, restaurants, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label>Total Investment Required ($)</label>
                  <input
                    name="totalInvestmentRequired"
                    type="number"
                    value={formData.totalInvestmentRequired}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>

                <div>
                  <label>Expected ROI Timeline (years)</label>
                  <input
                    name="expectedROI"
                    type="number"
                    value={formData.expectedROI}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div className="md:col-span-2">
                  <label>Potential Funding Sources</label>
                  <div className="flex flex-wrap gap-4">
                    {[
                      "USDA Grants",
                      "Bank Loan",
                      "Private Investor",
                      "Self-Funding",
                      "Cooperative",
                    ].map((source) => (
                      <label
                        key={source}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          name="fundingSources"
                          value={source}
                          checked={formData.fundingSources.includes(source)}
                          onChange={() => {
                            const updated = formData.fundingSources.includes(
                              source
                            )
                              ? formData.fundingSources.filter(
                                  (s) => s !== source
                                )
                              : [...formData.fundingSources, source];
                            setFormData((prev) => ({
                              ...prev,
                              fundingSources: updated,
                            }));
                          }}
                          className="h-4 w-4 text-green-600"
                        />
                        <span>{source}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label>Existing Post-Harvest Facilities</label>
                  <textarea
                    name="existingFacilities"
                    value={formData.existingFacilities}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Describe any existing infrastructure you have"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label>Value-Added Products Planned</label>
                  <textarea
                    name="valueAddedProducts"
                    value={formData.valueAddedProducts}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="e.g., jams, frozen produce, pre-cut vegetables"
                  />
                </div>

                <div>
                  <label>Sustainability Practices</label>
                  <textarea
                    name="sustainabilityPractices"
                    value={formData.sustainabilityPractices}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    placeholder="Energy efficiency, waste reduction, etc."
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="hasBusinessPlan"
                      checked={formData.hasBusinessPlan}
                      onChange={handleChange}
                      className="h-4 w-4 text-green-600"
                    />
                    <span>I have a formal business plan</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      name="hasFeasibilityStudy"
                      checked={formData.hasFeasibilityStudy}
                      onChange={handleChange}
                      className="h-4 w-4 text-green-600"
                    />
                    <span>I have a feasibility study</span>
                  </label>
                </div>
              </div>

              <div className="pt-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                    className="h-4 w-4 text-green-600"
                  />
                  <span>
                    I certify this information is accurate and complete
                  </span>
                </label>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="w-full mt-4 bg-[#6f9d7e]  text-[#FFE990] px-6 py-3 rounded hover:bg-[#FFE990] hover:text-[#6f9d7e] transition duration-200 ease-in-out"
                >
                  {loading ? "loading.." : "Submit Investment Request"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {isSubmitted && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-semibold mb-4">Request Submitted</h2>
              <p className="mb-4">
                Thank you! Your post-harvest investment request has been
                received. A representative will contact you within 3 business
                days.
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
