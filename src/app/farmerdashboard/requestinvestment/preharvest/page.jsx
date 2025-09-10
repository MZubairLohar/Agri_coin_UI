"use client";
import { useEffect, useState } from "react";
import { getDecodedAuthToken } from "@/content/data";

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
  
  const [userId, setUserId] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentSection, setCurrentSection] = useState(0);

  const sections = [
    "Personal Information",
    "Business Details",
    "Farm Information",
    "Loan Details",
    "Bank Information"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCropsChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((o) => o.value);
    setFormData((prev) => ({ ...prev, crops: selected }));
  };
  
  useEffect(() => {
    const userData = getDecodedAuthToken();
    if (userData) {
      console.log("User Info:", userData);
      setUserId(userData?._id || userData?.id);
    } else {
      console.log("No valid token found");
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    // Personal information validation
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.ssn || !/^\d{3}-\d{2}-\d{4}$/.test(formData.ssn)) 
      newErrors.ssn = "Valid SSN is required (format: XXX-XX-XXXX)";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.phone || !/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(formData.phone))
      newErrors.phone = "Valid phone number is required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.residentialAddress) newErrors.residentialAddress = "Residential address is required";
    if (!formData.citizenshipStatus) newErrors.citizenshipStatus = "Citizenship status is required";
    
    // Business details validation
    if (!formData.businessName) newErrors.businessName = "Business name is required";
    if (!formData.farmLocation) newErrors.farmLocation = "Farm location is required";
    if (!formData.yearsInOperation) newErrors.yearsInOperation = "Years in operation is required";
    
    // Farm information validation
    if (!formData.landSize) newErrors.landSize = "Land size is required";
    
    // Loan details validation
    if (!formData.loanAmount) newErrors.loanAmount = "Loan amount is required";
    if (!formData.loanPurpose) newErrors.loanPurpose = "Loan purpose is required";
    if (!formData.loanTerm) newErrors.loanTerm = "Loan term is required";
    
    // Bank information validation
    if (!formData.bankName) newErrors.bankName = "Bank name is required";
    if (!formData.accountNumber) newErrors.accountNumber = "Account number is required";
    if (!formData.routingNumber || !/^\d{9}$/.test(formData.routingNumber)) 
      newErrors.routingNumber = "Valid 9-digit routing number is required";
    
    // Agreement validation
    if (!formData.agree) newErrors.agree = "You must certify the information is accurate";
    
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
    
    try {
      const res = await fetch("/api/farmer/preHarvest", {
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
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong, please try again.");
      setLoading(false);
    }
  };

  const formatSSN = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 9)}`;
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handleSSNChange = (e) => {
    const formattedValue = formatSSN(e.target.value);
    setFormData(prev => ({ ...prev, ssn: formattedValue }));
  };

  const handlePhoneChange = (e) => {
    const formattedValue = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, phone: formattedValue }));
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

  return (
    <div className="min-h-screen text-black py-4 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-2 bg-[#6f9d7e] text-white">
          <h1 className="text-2xl font-bold text-center">Pre-Harvest Loan Application</h1>
        </div>
        
        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex justify-between mb-2">
            {sections.map((section, index) => (
              <div 
                key={index} 
                className={`text-sm ${index <= currentSection ? 'text-[#6f9d7e] font-medium' : 'text-gray-400'}`}
              >
                {section}
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
          {/* Personal Information Section */}
          {currentSection === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">SSN *</label>
                  <input
                    name="ssn"
                    value={formData.ssn}
                    onChange={handleSSNChange}
                    placeholder="123-45-6789"
                    maxLength="11"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.ssn ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.ssn && <p className="text-red-500 text-xs mt-1">{errors.ssn}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Date of Birth *</label>
                  <input
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.dob ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Phone *</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="(555) 555-5555"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@email.com"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Citizenship *</label>
                  <select
                    name="citizenshipStatus"
                    value={formData.citizenshipStatus}
                    onChange={handleChange}
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.citizenshipStatus ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  >
                    <option value="">Select</option>
                    <option value="US Citizen">US Citizen</option>
                    <option value="Permanent Resident">Permanent Resident</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.citizenshipStatus && <p className="text-red-500 text-xs mt-1">{errors.citizenshipStatus}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Residential Address *</label>
                  <input
                    name="residentialAddress"
                    value={formData.residentialAddress}
                    onChange={handleChange}
                    placeholder="123 Main St"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.residentialAddress ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.residentialAddress && <p className="text-red-500 text-xs mt-1">{errors.residentialAddress}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Mailing Address</label>
                  <input
                    name="mailingAddress"
                    value={formData.mailingAddress}
                    onChange={handleChange}
                    placeholder="(If different from residential address)"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Business Details Section */}
          {currentSection === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Business Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Business Name *</label>
                  <input
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Doe Farms LLC"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.businessName ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.businessName && <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Entity Type</label>
                  <select
                    name="entityType"
                    value={formData.entityType}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Sole Proprietorship">Sole Proprietorship</option>
                    <option value="LLC">LLC</option>
                    <option value="Corporation">Corporation</option>
                    <option value="Partnership">Partnership</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">EIN</label>
                  <input
                    name="ein"
                    value={formData.ein}
                    onChange={handleChange}
                    placeholder="12-3456789"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">USDA Farm #</label>
                  <input
                    name="usdaFarmNumber"
                    value={formData.usdaFarmNumber}
                    onChange={handleChange}
                    placeholder="123456"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Farm Location *</label>
                  <input
                    name="farmLocation"
                    value={formData.farmLocation}
                    onChange={handleChange}
                    placeholder="Iowa, Polk County"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.farmLocation ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.farmLocation && <p className="text-red-500 text-xs mt-1">{errors.farmLocation}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Years in Operation *</label>
                  <input
                    name="yearsInOperation"
                    value={formData.yearsInOperation}
                    onChange={handleChange}
                    placeholder="5"
                    type="number"
                    min="0"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.yearsInOperation ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.yearsInOperation && <p className="text-red-500 text-xs mt-1">{errors.yearsInOperation}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Annual Income ($)</label>
                  <input
                    name="annualIncome"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    placeholder="50000"
                    type="number"
                    min="0"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Previous Loans</label>
                  <input
                    name="previousLoans"
                    value={formData.previousLoans}
                    onChange={handleChange}
                    placeholder="Yes - USDA 2022"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Farm Information Section */}
          {currentSection === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Farm Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Land Status</label>
                  <select
                    name="landStatus"
                    value={formData.landStatus}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Owned">Owned</option>
                    <option value="Leased">Leased</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Land Size (acres) *</label>
                  <input
                    name="landSize"
                    value={formData.landSize}
                    onChange={handleChange}
                    placeholder="150"
                    type="number"
                    min="0"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.landSize ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.landSize && <p className="text-red-500 text-xs mt-1">{errors.landSize}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Crops</label>
                  <select
                    name="crops"
                    multiple
                    value={formData.crops}
                    onChange={handleCropsChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent h-32"
                  >
                    <option value="Corn">Corn</option>
                    <option value="Soybean">Soybean</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Rice">Rice</option>
                    <option value="Vegetables">Vegetables</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple crops</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Area per Crop</label>
                  <input
                    name="areaPerCrop"
                    value={formData.areaPerCrop}
                    onChange={handleChange}
                    placeholder="50 Corn, 30 Soy"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Irrigation Type</label>
                  <input
                    name="irrigationType"
                    value={formData.irrigationType}
                    onChange={handleChange}
                    placeholder="Drip/Sprinkler"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Equipment Owned</label>
                  <input
                    name="equipmentOwned"
                    value={formData.equipmentOwned}
                    onChange={handleChange}
                    placeholder="Tractor, Seeder"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Soil Type</label>
                  <input
                    name="soilType"
                    value={formData.soilType}
                    onChange={handleChange}
                    placeholder="Loamy"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Farming Practices</label>
                  <input
                    name="practices"
                    value={formData.practices}
                    onChange={handleChange}
                    placeholder="Organic / Conventional"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Loan Details Section */}
          {currentSection === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Loan Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Loan Amount ($) *</label>
                  <input
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    placeholder="10000"
                    type="number"
                    min="0"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.loanAmount ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.loanAmount && <p className="text-red-500 text-xs mt-1">{errors.loanAmount}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Purpose *</label>
                  <input
                    name="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={handleChange}
                    placeholder="Buy Tractor"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.loanPurpose ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.loanPurpose && <p className="text-red-500 text-xs mt-1">{errors.loanPurpose}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Term (months) *</label>
                  <input
                    name="loanTerm"
                    value={formData.loanTerm}
                    onChange={handleChange}
                    placeholder="24"
                    type="number"
                    min="0"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.loanTerm ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.loanTerm && <p className="text-red-500 text-xs mt-1">{errors.loanTerm}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Loan Type</label>
                  <input
                    name="loanType"
                    value={formData.loanType}
                    onChange={handleChange}
                    placeholder="Operating"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Disbursement Date</label>
                  <input
                    name="disbursementDate"
                    type="date"
                    value={formData.disbursementDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Expected Yield</label>
                  <input
                    name="expectedYield"
                    value={formData.expectedYield}
                    onChange={handleChange}
                    placeholder="100 tons / $20K"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Repayment Source</label>
                  <input
                    name="repaymentSource"
                    value={formData.repaymentSource}
                    onChange={handleChange}
                    placeholder="Crop sales"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Crop Insurance</label>
                  <select
                    name="cropInsurance"
                    value={formData.cropInsurance}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Bank Information Section */}
          {currentSection === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold border-b pb-2">Bank Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Bank Name *</label>
                  <input
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    placeholder="Bank of America"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.bankName ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.bankName && <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Account Number *</label>
                  <input
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="123456789"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.accountNumber && <p className="text-red-500 text-xs mt-1">{errors.accountNumber}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Routing Number *</label>
                  <input
                    name="routingNumber"
                    value={formData.routingNumber}
                    onChange={handleChange}
                    placeholder="111000025"
                    maxLength="9"
                    className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent ${errors.routingNumber ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                  {errors.routingNumber && <p className="text-red-500 text-xs mt-1">{errors.routingNumber}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Credit Score</label>
                  <input
                    name="creditScore"
                    value={formData.creditScore}
                    onChange={handleChange}
                    placeholder="Optional"
                    className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-[#6f9d7e] focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2 pt-4">
                  <label className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={formData.agree}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                    <span className="text-sm">I certify the information is accurate. *</span>
                  </label>
                  {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree}</p>}
                </div>
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
                ) : "Submit Application"}
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
              <h2 className="text-xl font-semibold mb-2">Application Submitted</h2>
              <p className="mb-4 text-gray-600">
                Thank you! Your loan application has been submitted successfully.
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