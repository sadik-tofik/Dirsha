import React, { createContext, useState, useCallback, ReactNode } from 'react';
import { AppContextType, Language, Translations, AppProviderProps } from '../types';

const translations: Translations = {
  [Language.EN]: {
    // Nav
    nav_market: 'Market',
    nav_bonds: 'Bonds',
    nav_news: 'News',
    nav_chatbot: 'Chatbot',
    // General
    back: 'Back',
    profile: 'Profile',
    coming_soon: 'Coming Soon',
    bid_with_offer: 'Bid with counter-offer',
    // Home
    home_title: 'Welcome to Dirsha',
    home_subtitle: 'Your partner in modern farming.',
    feature_1_title: 'Crop-Specific Advice',
    feature_1_desc: 'Get tailored recommendations for planting, irrigation, pest control, and optimal seasons for crops like wheat, rice, and maize.',
    feature_2_title: 'Weather & Soil Insights',
    feature_2_desc: 'Access localized weather forecasts and get advice on soil health, pH levels, and suitable fertilizers.',
    feature_3_title: 'Government Schemes',
    feature_3_desc: 'Stay informed about available subsidies, loan schemes, and important agricultural policies to support your farm.',
    // Profile
    profile_title: 'My Farm Profile',
    profile_incentive: 'Earn 10 ETB for completing your profile!',
    farm_size: 'Farm Size (in hectares)',
    soil_type: 'Soil Type',
    irrigation_access: 'Irrigation Access',
    family_labor: 'Family Labor Count',
    upload_photos: 'Upload photos of your sorghum growth stages',
    yield_history: 'Last harvest: 1.2 tons/acre',
    ai_feedback_button: 'Get AI Feedback',
    ai_feedback_placeholder: 'Your personalized advice will appear here...',
    save_profile: 'Save Profile',
    // Market
    market_title: 'Market Prices & Trends',
    market_desc: 'Real-time prices to help you decide when and where to sell.',
    // Bonds
    bonds_title: 'Bonds Marketplace',
    bonds_desc: 'Connect directly with buyers and secure fair contracts.',
    filter_crop: 'Filter by Crop',
    filter_location: 'Filter by Location',
    filter_payment: 'Payment Terms',
    price_history: '6-Month Price History',
    blockchain_verified: 'Blockchain-verified data',
    buyer_global_grain: 'Global Grain Co.',
    terms_global_grain: 'Pay 25% upfront for 2-ton teff harvest',
    delivery_global_grain: 'Delivery to Adama by Dec 2024',
    buyer_ethio_exports: 'Ethio Exports',
    terms_ethio_exports: 'Full payment on delivery for 5-ton coffee',
    delivery_ethio_exports: 'Delivery to Addis Ababa by Nov 2024',
    location_adama: 'Adama',
    location_addis: 'Addis Ababa',
    payment_upfront: 'Upfront',
    payment_on_delivery: 'On Delivery',
    // News
    news_title: 'News & Alerts',
    news_desc: 'Stay ahead with the latest market updates and advisories.',
    breaking_news: 'Breaking News',
    news_breaking_content_1: 'Drought warning in Oromia – plant drought-resistant teff (Govt. advisory)',
    price_alerts: 'Price Alerts',
    global_impact: 'Global Impact',
    news_global_impact_content_1: 'Ethiopian sesame demand grows in China, prices expected to rise over the next quarter.',
    crop: 'Crop',
    today_price: 'Today\'s Price',
    weekly_change: 'Weekly Change',
    // Chatbot
    chatbot_placeholder: 'Type your question...',
    // Crop Names
    crop_teff: 'Teff',
    crop_coffee: 'Coffee',
    crop_sesame: 'Sesame',
    crop_maize: 'Maize',
    crop_wheat: 'Wheat',
  },
  [Language.AM]: {
    // Nav
    nav_market: 'ገበያ',
    nav_bonds: 'ቦንዶች',
    nav_news: 'ዜና',
    nav_chatbot: 'ቻትቦት',
    // General
    back: 'ተመለስ',
    profile: 'መገለጫ',
    coming_soon: 'በቅርብ ቀን',
    bid_with_offer: 'በአጸፋዊ ዋጋ ተጫረት',
    // Home
    home_title: 'ወደ ድርሻ እንኳን በደህና መጡ',
    home_subtitle: 'የእርስዎ የዘመናዊ ግብርና አጋር',
    feature_1_title: 'ለሰብል-ተኮር ምክር',
    feature_1_desc: 'እንደ ስንዴ፣ ሩዝ እና በቆሎ ላሉ ሰብሎች ተከላ፣ መስኖ፣ ተባይ መቆጣጠር እና ምርጥ ወቅቶችን በተመለከተ የተዘጋጁ ምክሮችን ያግኙ።',
    feature_2_title: 'የአየር ሁኔታ እና የአፈርዛ অন্তর্দৃষ্টি',
    feature_2_desc: 'የአካባቢ የአየር ሁኔታ ትንበያዎችን ይድረሱ እና በአፈር ጤና፣ በፒኤች ደረጃዎች እና ተስማሚ ማዳበሪያዎች ላይ ምክር ያግኙ።',
    feature_3_title: 'የመንግስት እቅዶች',
    feature_3_desc: 'እርሻዎን ለመደገፍ ስለሚገኙ ድጎማዎች፣ የብድር እቅዶች እና አስፈላጊ የግብርና ፖሊሲዎች መረጃ ያግኙ።',
    // Profile
    profile_title: 'የእኔ እርሻ መገለጫ',
    profile_incentive: 'መገለጫዎን በማጠናቀቅ 10 ብር ያግኙ!',
    farm_size: 'የእርሻ መጠን (በሄክታር)',
    soil_type: 'የአፈር ዓይነት',
    irrigation_access: 'የመስኖ ተደራሽነት',
    family_labor: 'የቤተሰብ የሰው ኃይል ብዛት',
    upload_photos: 'የእርስዎን የሶርጎም እድገት ደረጃዎች ፎቶዎችን ይስቀሉ',
    yield_history: 'የመጨረሻው መከር፡ 1.2 ቶን/ኤከር',
    ai_feedback_button: 'የ AI ግብረመልስ ያግኙ',
    ai_feedback_placeholder: 'የእርስዎ ግላዊ ምክር እዚህ ይታያል...',
    save_profile: 'መገለጫ አስቀምጥ',
    // Market
    market_title: 'የገበያ ዋጋ እና አዝማሚያዎች',
    market_desc: 'መቼ እና የት እንደሚሸጡ ለመወሰን የሚረዱዎት የእውነተኛ ጊዜ ዋጋዎች።',
    // Bonds
    bonds_title: 'የቦንዶች የገበያ ቦታ',
    bonds_desc: 'ከገዥዎች ጋር በቀጥታ ይገናኙ እና ፍትሃዊ ኮንትራቶችን ያረጋግጡ።',
    filter_crop: 'በሰብል ማጣራት',
    filter_location: 'በቦታ ማጣራት',
    filter_payment: 'የክፍያ ውሎች',
    price_history: 'የ6-ወር የዋጋ ታሪክ',
    blockchain_verified: 'በብሎክቼን የተረጋገጠ መረጃ',
    buyer_global_grain: 'ግሎባል ግሬን ኮ.',
    terms_global_grain: 'ለ 2 ቶን የጤፍ ምርት 25% በቅድሚያ ይክፈሉ',
    delivery_global_grain: 'እስከ ታህሳስ 2024 ድረስ ለአዳማ ማድረስ',
    buyer_ethio_exports: 'ኢትዮ ኤክስፖርትስ',
    terms_ethio_exports: 'ለ 5 ቶን ቡና ሙሉ ክፍያ በማስረከብ ላይ',
    delivery_ethio_exports: 'እስከ ህዳር 2024 ድረስ ለአዲስ አበባ ማድረስ',
    location_adama: 'አዳማ',
    location_addis: 'አዲስ አበባ',
    payment_upfront: 'በቅድሚያ',
    payment_on_delivery: 'በማስረከብ ላይ',
    // News
    news_title: 'ዜና እና ማንቂያዎች',
    news_desc: 'በአዳዲስ የገበያ ዝመናዎች እና ምክሮች ቀድመው ይቆዩ።',
    breaking_news: 'ሰበር ዜና',
    news_breaking_content_1: 'በኦሮሚያ የድርቅ ማስጠንቀቂያ – ድርቅን የሚቋቋም ጤፍ ይትከሉ (የመንግስት ምክር)',
    price_alerts: 'የዋጋ ማንቂያዎች',
    global_impact: 'ዓለም አቀፍ ተጽዕኖ',
    news_global_impact_content_1: 'በቻይና የኢትዮጵያ ሰሊጥ ፍላጎት እያደገ ሲሆን በቀጣዩ ሩብ አመት ዋጋው ይጨምራል ተብሎ ይጠበቃል',
    crop: 'ሰብል',
    today_price: 'የዛሬ ዋጋ',
    weekly_change: 'ሳምንታዊ ለውጥ',
     // Chatbot
    chatbot_placeholder: 'ጥያቄዎን ይተይቡ...',
    // Crop Names
    crop_teff: 'ጤፍ',
    crop_coffee: 'ቡና',
    crop_sesame: 'ሰሊጥ',
    crop_maize: 'በቆሎ',
    crop_wheat: 'ስንዴ',
  }
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const t = useCallback((key: string): string => {
    return translations[language][key] || key;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t,
    isProfileOpen,
    setProfileOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};