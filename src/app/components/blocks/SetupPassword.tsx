import React, { useState, ChangeEvent } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import { FaRegCircle, FaCheckCircle } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


interface PasswordValidation {
    upper: boolean;
    lower: boolean;
    number: boolean;
    minSymbols: boolean;
    specialChars: boolean;
}

const SetupPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const navigate = useNavigate();

    // Trạng thái các điều kiện mật khẩu
    const [validation, setValidation] = useState<PasswordValidation>({
        upper: false,
        lower: false,
        number: false,
        minSymbols: false,
        specialChars: false,
    });

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Cập nhật trạng thái validation dựa trên mật khẩu mới
        setValidation({
            upper: /[A-Z]/.test(newPassword),
            lower: /[a-z]/.test(newPassword),
            number: /[0-9]/.test(newPassword),
            minSymbols: newPassword.length >= 8,
            specialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]+/.test(newPassword),
        });
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const isPasswordMatch = password === confirmPassword && password.length > 0;
    const isFormValid =
        isPasswordMatch &&
        isAccepted &&
        Object.values(validation).every(v => v);

    const getValidationIcon = (isValid: boolean) => {
        return isValid
            ? <FaCheckCircle className="text-green-500" />
            : <FaRegCircle className="text-gray-500" />;
    };

    const handleContinue = () => {
        if (isFormValid) {
            toast.success("Password setup successful!");
            navigate("/login");
        } else {
            toast.error("Vui lòng kiểm tra lại thông tin!");
        }
    };

    return (
        <div className="flex  items-center justify-center h-full w-full text-white p-4 font-sans">
            <Toaster position="top-right" />
            <div className="  h-fulll p-8 ">
                {/* Content */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold mb-2">Setup Password</h1>
                    <p className="text-gray-400">Create a secure password for your wallet.</p>
                </div>

                {/* Password Fields */}
                <div className="space-y-4">
                    {/* Create Password Input */}
                    <div className="relative">
                        <label className="block text-gray-400 mb-2">Create Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            className="w-full bg-[#1e2022] text-white rounded-xl px-4 py-3 border border-transparent focus:border-green-500 focus:outline-none transition-all"
                            placeholder="Enter your password"
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-[60%] mt-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </div>

                    {/* Validation */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-gray-400">
                        <span className={`flex items-center space-x-2 ${validation.upper ? 'text-green-500' : 'text-gray-400'}`}>
                            {getValidationIcon(validation.upper)}
                            <span>1 upper letter</span>
                        </span>
                        <span className={`flex items-center space-x-2 ${validation.lower ? 'text-green-500' : 'text-gray-400'}`}>
                            {getValidationIcon(validation.lower)}
                            <span>1 lower letter</span>
                        </span>
                        <span className={`flex items-center space-x-2 ${validation.number ? 'text-green-500' : 'text-gray-400'}`}>
                            {getValidationIcon(validation.number)}
                            <span>1 number</span>
                        </span>
                        <span className={`flex items-center space-x-2 ${validation.minSymbols ? 'text-green-500' : 'text-gray-400'}`}>
                            {getValidationIcon(validation.minSymbols)}
                            <span>8 symbols</span>
                        </span>
                        <span className={`flex items-center space-x-2 ${validation.specialChars ? 'text-green-500' : 'text-gray-400'}`}>
                            {getValidationIcon(validation.specialChars)}
                            <span>special characters</span>
                        </span>
                    </div>

                    {/* Confirm Password Input */}
                    <div className="relative h-[90px]">
                        <label className="block text-gray-400 mb-2">Confirm Password</label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            className={`w-full bg-[#1e2022] text-white rounded-xl px-4 py-3 border transition-all focus:outline-none ${confirmPassword && !isPasswordMatch
                                ? 'border-red-500'
                                : 'border-transparent focus:border-green-500'
                                }`}
                            placeholder="Confirm your password"
                        />
                        <button
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-[55%] mt-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300"
                        >
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                        {confirmPassword && !isPasswordMatch && (
                            <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                        )}
                    </div>

                    {/* Accept terms Checkbox */}
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                        <input
                            type="checkbox"
                            checked={isAccepted}
                            onChange={(e) => setIsAccepted(e.target.checked)}
                            className="form-checkbox h-5 w-5 rounded bg-[#1e2022] border-none text-green-500 transition-all focus:ring-green-500 cursor-pointer"
                        />
                        <div className="flex-1">
                            <span className="block">I have read and agree to the</span>
                            <a href="#" className="text-green-500">Terms of Usage</a> and <a href="#" className="text-green-500">Privacy Policy</a>.
                        </div>
                    </div>
                </div>

                {/* Continue Button */}
                <div className="mt-3">
                    <button
                        onClick={handleContinue}
                        disabled={!isFormValid}
                        className={`w-full py-4 rounded-xl font-bold transition-all ${isFormValid
                            ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            }`}
                    >
                        Continue
                    </button>
                </div>

                {/* Footer */}
                <div className="flex justify-end mt-2">
                    <button className="flex items-center text-gray-400 hover:text-green-500 transition-colors">
                        <span className="mr-2">Support</span>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5L5.45 10.743a1 1 0 001.216 1.514L10 9.288l3.334 2.969a1 1 0 001.216-1.514l-3.682-3.243A1 1 0 0010 7z" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetupPassword;