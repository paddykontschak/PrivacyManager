import { AlbacrossLoader } from "./scriptLoaders/AlbacrossLoader";
import { FacebookPixelLoader } from "./scriptLoaders/FacebookPixelLoader";
import { GoogleAdsLoader } from "./scriptLoaders/GoogleAdsLoader";
import { GoogleAnalyticsLoader } from "./scriptLoaders/GoogleAnalyticsLoader";
import { GoogleAnalyticsOverTagManagerLoader } from "./scriptLoaders/GoogleAnalyticsOverTagManagerLoader";
import { GoogleTagManagerLoader } from "./scriptLoaders/GoogleTagManagerLoader";
import { GoogleRemarketingLoader } from "./scriptLoaders/GoogleRemarketingLoader";
import { HotJarLoader } from "./scriptLoaders/HotJarLoader";
import { LeadForensicsLoader } from "./scriptLoaders/LeadForensicsLoader";
import { MatelsoLoader } from "./ScriptLoaders/MatelsoLoader";
import { MouseFlowLoader } from "./scriptLoaders/MouseFlowLoader";
import { PiwikLoader } from "./scriptLoaders/PiwikLoader";
import { WiredMindsLoader } from "./scriptLoaders/WiredMindsLoader";

export const PRIVACY_MANAGER_ALL_SCRIPT_LOADERS_MAP = {
    albacross: AlbacrossLoader,
    facebookPixel: FacebookPixelLoader,
    googleAds: GoogleAdsLoader,
    googleAnalytics: GoogleAnalyticsLoader,
    googleAnalyticsOverTagManager: GoogleAnalyticsOverTagManagerLoader,
    googleTagManager: GoogleTagManagerLoader,
    googleRemarketing: GoogleRemarketingLoader,
    hotJar: HotJarLoader,
    leadForensics: LeadForensicsLoader,
    matelso: MatelsoLoader,
    mouseFlow: MouseFlowLoader,
    piwik: PiwikLoader,
    wiredMinds: WiredMindsLoader,
};
