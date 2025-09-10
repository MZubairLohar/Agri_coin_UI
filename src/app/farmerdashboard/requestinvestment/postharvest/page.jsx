"use client";
import { commodityOptions, investmentOptions } from "@/app/content/data";
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
  const [errors, setErrors] = useState({});
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    "Farmer & Farm Details",
    "Harvest Details",
    "Post-Harvest Needs",
    "Financial Requirements",
    "Business Plan",
    "Review & Submit"
  ];

  // Options for dropdowns/multi-selects
  useEffect(() => {
    const userData = getDecodedAuthToken();
    if (userData) {
      console.log("User Info:", userData);
      setUserId(userData?._id || userData?.id);
      
      // Pre-fill user data if available
      setFormData(prev => ({
        ...prev,
        fullName: userData.fullName || prev.fullName,
      }));
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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Farmer & Farm Details validation
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.farmLocation) newErrors.farmLocation = "Farm location is required";
    if (!formData.primaryCommodity) newErrors.primaryCommodity = "Primary commodity is required";
    
    // Investment validation
    if (!formData.totalInvestmentRequired) newErrors.totalInvestmentRequired = "Total investment required is needed";
    if (formData.totalInvestmentRequired && parseFloat(formData.totalInvestmentRequired) <= 0) 
      newErrors.totalInvestmentRequired = "Investment must be greater than 0";
    
    // Terms agreement validation
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must certify the information is accurate";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      return;
    }
    
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

      setIsSubmitted(true);
      setLoading(false);
      
      // Reset form
      setFormData({
        fullName: "",
        usdaFarmNumber: "",
        farmLocation: "",
        totalAcres: "",
        primaryCommodity: "",
        harvestDate: "",
        totalYield: "",
        yieldUnit: "bushels",
        currentStorageMethod: "",
        investmentType: [],
        coldStorageRequired: false,
        coldStorageCapacity: "",
        processingType: "",
        packagingNeeds: "",
        transportationDistance: "",
        marketingChannels: [],
        totalInvestmentRequired: "",
        fundingSources: [],
        existingFacilities: "",
        expectedROI: "",
        targetMarkets: "",
        valueAddedProducts: "",
        sustainabilityPractices: "",
        hasBusinessPlan: false,
        hasFeasibilityStudy: false,
        agreeTerms: false,
      });
      
      // Reset to first section
      setCurrentSection(0);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong, please try again.");
      setLoading(false);
    }
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-2 bg-[#6f9d7e] text-white">
          <h1 className="text-2xl font-bold text-center">Post-Harvest Investment Request</h1>
        </div>
        
        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex justify-between mb-2">
            {sections.map((section, index) => (
              <div 
                key={index} 
                className={`text-xs md:text-sm ${index <= currentSection ? 'text-[#6f9d7e] font-medium' : 'text-gray-400'}`}
              >
                {section.split(' ').map((word, i) => (
                  <div key={i}>{word}</div>
                ))}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-[#6f9d7e] h-2.5 rounded-full transition-all duration-300" 
              style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Section 1: Farmer & Farm Details */}
          {currentSection === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Farmer & Farm Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">USDA Farm Number</label>
                  <input
                    name="usdaFarmNumber"
                    value={formData.usdaFarmNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Farm Location (County, State) *</label>
                  <input
                    name="farmLocation"
                    value={formData.farmLocation}
                    onChange={handleChange}
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.farmLocation ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.farmLocation && <p className="text-red-500 text-xs mt-1">{errors.farmLocation}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Total Farm Acres</label>
                  <input
                    name="totalAcres"
                    type="number"
                    value={formData.totalAcres}
                    onChange={handleChange}
                    min="0"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Primary Commodity *</label>
                  <select
                    name="primaryCommodity"
                    value={formData.primaryCommodity}
                    onChange={handleChange}
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.primaryCommodity ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  >
                    <option value="">Select Commodity</option>
                    {commodityOptions.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                  {errors.primaryCommodity && <p className="text-red-500 text-xs mt-1">{errors.primaryCommodity}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Harvest Details */}
          {currentSection === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Harvest Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Last Harvest Date</label>
                  <input
                    name="harvestDate"
                    type="date"
                    value={formatDateForInput(formData.harvestDate)}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Total Yield</label>
                  <div className="flex">
                    <input
                      name="totalYield"
                      type="number"
                      value={formData.totalYield}
                      onChange={handleChange}
                      min="0"
                      className="w-3/4 border border-gray-300 p-3 rounded-l-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                    />
                    <select
                      name="yieldUnit"
                      value={formData.yieldUnit}
                      onChange={handleChange}
                      className="w-1/4 border-t border-r border-b border-gray-300 p-3 rounded-r-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                    >
                      <option value="bushels">Bushels</option>
                      <option value="tons">Tons</option>
                      <option value="pounds">Pounds</option>
                      <option value="crates">Crates</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Current Storage Method</label>
                  <textarea
                    name="currentStorageMethod"
                    value={formData.currentStorageMethod}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                    placeholder="Describe your current storage facilities/methods"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Post-Harvest Needs */}
          {currentSection === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Post-Harvest Needs</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Investment Type Needed (Select all that apply)
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {investmentOptions.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-start p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <input
                          type="checkbox"
                          name="investmentType"
                          value={option}
                          checked={formData.investmentType.includes(option)}
                          onChange={handleChange}
                          className="h-5 w-5 text-[#6f9d7e] mt-0.5 mr-3"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Cold Storage Capacity Needed (cu. ft.)</label>
                    <input
                      name="coldStorageCapacity"
                      type="number"
                      value={formData.coldStorageCapacity}
                      onChange={handleChange}
                      min="0"
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                      disabled={!formData.investmentType.includes("Cold Storage Facility")}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Processing Type Needed</label>
                    <input
                      type="text"
                      name="processingType"
                      value={formData.processingType}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                      placeholder="e.g., washing, sorting, freezing"
                      disabled={!formData.investmentType.includes("Processing Equipment")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Packaging Needs</label>
                    <input
                      name="packagingNeeds"
                      value={formData.packagingNeeds}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                      placeholder="e.g., vacuum sealing, clamshells"
                      disabled={!formData.investmentType.includes("Packaging Line")}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Average Transportation Distance (miles)</label>
                    <input
                      name="transportationDistance"
                      type="number"
                      value={formData.transportationDistance}
                      onChange={handleChange}
                      min="0"
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                      disabled={!formData.investmentType.includes("Transportation Vehicles")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Target Marketing Channels</label>
                  <textarea
                    name="targetMarkets"
                    value={formData.targetMarkets}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                    placeholder="Farmers markets, grocery chains, restaurants, etc."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Financial Requirements */}
          {currentSection === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Financial Requirements</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Total Investment Required ($) *</label>
                  <input
                    name="totalInvestmentRequired"
                    type="number"
                    value={formData.totalInvestmentRequired}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.totalInvestmentRequired ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.totalInvestmentRequired && <p className="text-red-500 text-xs mt-1">{errors.totalInvestmentRequired}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Expected ROI Timeline (years)</label>
                  <input
                    name="expectedROI"
                    type="number"
                    value={formData.expectedROI}
                    onChange={handleChange}
                    min="0"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Potential Funding Sources (Select all that apply)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {["USDA Grants", "Bank Loan", "Private Investor", "Self-Funding", "Cooperative"].map((source) => (
                      <label
                        key={source}
                        className="flex items-start p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        <input
                          type="checkbox"
                          name="fundingSources"
                          value={source}
                          checked={formData.fundingSources.includes(source)}
                          onChange={() => {
                            const updated = formData.fundingSources.includes(source)
                              ? formData.fundingSources.filter(s => s !== source)
                              : [...formData.fundingSources, source];
                            setFormData(prev => ({
                              ...prev,
                              fundingSources: updated,
                            }));
                          }}
                          className="h-5 w-5 text-[#6f9d7e] mt-0.5 mr-3"
                        />
                        <span className="text-sm">{source}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Existing Post-Harvest Facilities</label>
                  <textarea
                    name="existingFacilities"
                    value={formData.existingFacilities}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                    placeholder="Describe any existing infrastructure you have"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Business Plan */}
          {currentSection === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Business Plan</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Value-Added Products Planned</label>
                  <textarea
                    name="valueAddedProducts"
                    value={formData.valueAddedProducts}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                    placeholder="e.g., jams, frozen produce, pre-cut vegetables"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Sustainability Practices</label>
                  <textarea
                    name="sustainabilityPractices"
                    value={formData.sustainabilityPractices}
                    onChange={handleChange}
                    rows="3"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                    placeholder="Energy efficiency, waste reduction, etc."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex items-start p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <input
                      type="checkbox"
                      name="hasBusinessPlan"
                      checked={formData.hasBusinessPlan}
                      onChange={handleChange}
                      className="h-5 w-5 text-[#6f9d7e] mt-0.5 mr-3"
                    />
                    <span className="text-sm">I have a formal business plan</span>
                  </label>

                  <label className="flex items-start p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <input
                      type="checkbox"
                      name="hasFeasibilityStudy"
                      checked={formData.hasFeasibilityStudy}
                      onChange={handleChange}
                      className="h-5 w-5 text-[#6f9d7e] mt-0.5 mr-3"
                    />
                    <span className="text-sm">I have a feasibility study</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Section 6: Review & Submit */}
          {currentSection === 5 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Review & Submit</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-4">Please review your information before submitting</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Full Name:</span>
                    <span className="font-medium">{formData.fullName || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Farm Location:</span>
                    <span className="font-medium">{formData.farmLocation || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Primary Commodity:</span>
                    <span className="font-medium">{formData.primaryCommodity || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment Types:</span>
                    <span className="font-medium text-right">
                      {formData.investmentType.length > 0 
                        ? formData.investmentType.join(", ") 
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Investment Required:</span>
                    <span className="font-medium">
                      {formData.totalInvestmentRequired 
                        ? `$${parseFloat(formData.totalInvestmentRequired).toLocaleString()}` 
                        : "Not provided"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <label className={`flex items-start p-3 border rounded-lg transition-colors duration-200 ${errors.agreeTerms ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:bg-gray-50'}`}>
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                    className="h-5 w-5 text-[#6f9d7e] mt-0.5 mr-3"
                  />
                  <span className="text-sm">
                    I certify this information is accurate and complete
                  </span>
                </label>
                {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={prevSection}
              disabled={currentSection === 0}
              className={`px-6 py-2 rounded-lg ${currentSection === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Previous
            </button>
            
            {currentSection < sections.length - 1 ? (
              <button
                type="button"
                onClick={nextSection}
                className="px-6 py-2 bg-[#6f9d7e] text-white rounded-lg hover:bg-[#5d8a6d]"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#6f9d7e] text-white rounded-lg hover:bg-[#5d8a6d] disabled:opacity-70 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </>
                ) : "Submit Investment Request"}
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Success Popup */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">Request Submitted</h2>
              <p className="mb-4 text-gray-600">
                Thank you! Your post-harvest investment request has been
                received. A representative will contact you within 3 business
                days.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="bg-[#6f9d7e] text-white px-4 py-2 rounded-lg hover:bg-[#5d8a6d] transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}