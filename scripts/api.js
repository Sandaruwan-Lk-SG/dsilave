/**
 * API Base URL Management
 * * මෙම ගොනුව මගින් Railway මත Deploy කළ Backend Server එකේ URL එක
 * සියලුම Frontend API Call සඳහා සපයයි.
 */

// 🔴 Production URL (Railway URL) - ඔබ විසින් සපයන ලද්දකි
const BASE_API_URL = "https://dsilave-production.up.railway.app/api"; 

// 🔵 Local Testing සඳහා (Backend local එකේ Run කරන්නේ නම්)
// const BASE_API_URL = "http://localhost:4000/api"; 


/**
 * සම්පූර්ණ API URL එකක් ලබා දෙයි.
 * * @param {string} endpoint - API endpoint (උදා: /auth/login, /leave)
 * @returns {string} - සම්පූර්ණ URL
 */
export const getApiUrl = (endpoint) => {
    // '/auth/login' වැනි endpoint එකක් සඳහා:
    // https://dsilave-production.up.railway.app/api/auth/login ලබා දෙයි.
    return `${BASE_API_URL}${endpoint}`; 
};

/**
 * ආරක්ෂිත API ඉල්ලීම් සඳහා අවශ්‍ය Authorization Header එක සපයයි.
 * * @returns {object} Headers object
 */
export const getAuthHeaders = () => {
    // localStorage එකෙන් JWT Token එක ලබා ගනී (Login වූ පසු සුරැකූ)
    const token = localStorage.getItem('authToken'); 
    
    // සියලුම ආරක්ෂිත API Call සඳහා JWT Token එක Header එකට එක් කරයි.
    if (token) {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // JWT Standard
        };
    } else {
        // Token එකක් නොමැති නම්, Content-Type පමණක් යවයි.
        return {
            'Content-Type': 'application/json'
        };
    }
};

/**
 * ආරක්ෂිතව දත්ත යැවීමට පොදු fetch ශ්‍රිතයක්
 * (උදාහරණයක් ලෙස මෙය භාවිතා කළ හැක)
 *
 * @param {string} endpoint 
 * @param {string} method 
 * @param {object} body 
 * @returns {Promise<Response>}
 */
export const fetchApi = (endpoint, method = 'GET', body = null) => {
    const url = getApiUrl(endpoint);
    const headers = getAuthHeaders();
    
    const config = {
        method,
        headers,
        // GET සහ HEAD හැර අනෙකුත් method සඳහා පමණක් body එක එක් කරයි.
        body: body ? JSON.stringify(body) : undefined 
    };

    if (method === 'GET' || method === 'HEAD') {
        delete config.body;
    }

    return fetch(url, config);
};
