import { useState } from "react";
import { SectionWrapper } from "../hoc";

const Domain = () => {
  const [domainName, setDomainName] = useState("");
  const [availability, setAvailability] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  const checkDomainAvailability = async () => {
    setLoading(true);
    const apiKey = import.meta.env.VITE_APP_GODADDY_API_KEY;
    const apiSecret = import.meta.env.VITE_APP_GODADDY_SECRET;
    const apiUrl = `https://api.godaddy.com/v1/domains/available?domain=${domainName}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `sso-key ${apiKey}:${apiSecret}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch domain availability");
      }
      const data = await response.json();
      console.log(data);
      setAvailability(data.available);
    } catch (error) {
      console.error("Error checking domain availability:", error);
      setAvailability(false);
    } finally {
      setLoading(false);
    }
  };

  const handleFindDomain = () => {
    if (domainName) {
      checkDomainAvailability();
    }
  };

  return (
    <div className="w-full py-20 bg-gradient-to-r from-black to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Secure Your Domain Now
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Unlock your digital potential with our domain registration service. Your
            domain is your unique online identity, your digital storefront in the
            vast landscape of the internet.
          </p>
        </div>

        <div className="mt-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-2 shadow-xl border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="my-website.com"
                  className="flex-1 px-6 py-4 text-lg bg-transparent border-none outline-none text-black placeholder-gray-500"
                  value={domainName}
                  onChange={(e) => setDomainName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleFindDomain()}
                />
                <button
                  className="px-8 py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleFindDomain}
                  disabled={loading || !domainName}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Checking...
                    </div>
                  ) : (
                    "Find Domain"
                  )}
                </button>
              </div>
            </div>

            {availability !== null && (
              <div className={`mt-4 p-4 rounded-xl ${
                availability 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    availability ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <span className="font-semibold">
                    {availability ? "Domain available!" : "Domain not available."}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-white">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Instant Check</h3>
            <p className="text-sm text-gray-300">Real-time domain availability</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Secure Registration</h3>
            <p className="text-sm text-gray-300">Safe and reliable domain services</p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Fast Setup</h3>
            <p className="text-sm text-gray-300">Quick domain configuration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Domain);
