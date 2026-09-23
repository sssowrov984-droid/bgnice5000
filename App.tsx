import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { WinGoGame } from './components/WinGoGame';
import { K3Game } from './components/K3Game';
import { FiveDGame } from './components/FiveDGame';
import { TrxGame } from './components/TrxGame';
import { AviatorGame } from './components/AviatorGame';
import { AviatorXGame } from './components/AviatorXGame';
import { DepositView } from './components/DepositView';
import { WithdrawView } from './components/WithdrawView';
import { WalletView } from './components/WalletView';
import { SafeView } from './components/SafeView';
import { PromotionView } from './components/PromotionView';
import { ActivityView } from './components/ActivityView';
import { VipView } from './components/VipView';
import { AccountView } from './components/AccountView';
import { SettingsView } from './components/SettingsView';
import { GameHistoryView } from './components/GameHistoryView';
import { LiveChatView } from './components/LiveChatView';
import { AdminPanel } from './components/AdminPanel';
import { AnnouncementModal } from './components/AnnouncementModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';
import { SplashScreen } from './components/SplashScreen';
import { SiteMaintenanceView } from './components/SiteMaintenanceView';
import { AdminAuthModal } from './components/AdminAuthModal';
import { FloatingLiveChatFAB } from './components/FloatingLiveChatFAB';
import { NotificationModal } from './components/NotificationModal';

type ExtendedTab = TabType | 'settings' | 'gameHistory' | 'support';

function MainAppContent() {
  const { isAdmin, setIsAdmin, settings, user, authLoading, toast, showToast, isGameActive, setIsGameActive } = useApp();
  const [activeTab, setActiveTab] = useState<ExtendedTab>('home');
  const [announcementOpen, setAnnouncementOpen] = useState(settings.showAnnouncement ?? true);
  const [authOpen, setAuthOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [adminAuthOpen, setAdminAuthOpen] = useState(false);

  // Synchronize isGameActive state with activeTab
  const isCurrentGameTab =
    activeTab === 'wingo' ||
    activeTab === 'k3' ||
    activeTab === 'fiveD' ||
    activeTab === 'trx' ||
    activeTab === 'aviator' ||
    activeTab === 'aviatorX';

  useEffect(() => {
    setIsGameActive(isCurrentGameTab);
  }, [isCurrentGameTab, setIsGameActive]);

  // Strictly URL-only Admin Entry (e.g. typing #admin, ?admin=true, or /admin in browser address bar)
  // Absolutely no buttons, tap gestures, or UI elements on user pages can trigger this.
  useEffect(() => {
    const handleUrlCheck = () => {
      const hash = (window.location.hash || '').toLowerCase();
      const search = (window.location.search || '').toLowerCase();
      const path = (window.location.pathname || '').toLowerCase();
      if (
        hash === '#admin' ||
        hash === '#/admin' ||
        search.includes('admin=true') ||
        search.includes('admin=portal') ||
        search === '?admin' ||
        path.endsWith('/admin')
      ) {
        setAdminAuthOpen(true);
      }
    };

    handleUrlCheck();
    window.addEventListener('hashchange', handleUrlCheck);
    window.addEventListener('popstate', handleUrlCheck);
    return () => {
      window.removeEventListener('hashchange', handleUrlCheck);
      window.removeEventListener('popstate', handleUrlCheck);
    };
  }, []);

  // Prompt Sign Up / Login if user is not authenticated (only after splash completes)
  useEffect(() => {
    if (!showSplash && !authLoading && !user) {
      setAuthOpen(true);
    }
  }, [showSplash, authLoading, user]);

  // Reset scroll to top on tab change so every page opens strictly at the top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    const scrollables = document.querySelectorAll('.overflow-y-auto, .overflow-auto, main');
    scrollables.forEach((el) => {
      el.scrollTop = 0;
    });
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    });
  }, [activeTab]);

  // Auto-exit game if admin turns off game while player is actively on that screen
  useEffect(() => {
    const gameKeys = ['wingo', 'k3', 'fiveD', 'trx', 'aviator', 'aviatorX'] as const;
    if (gameKeys.includes(activeTab as any)) {
      const isEnabled = settings?.enabledGames?.[activeTab as (typeof gameKeys)[number]] !== false;
      if (!isEnabled) {
        showToast('⚠️ This game is temporarily offline for maintenance by admin.', 'warning');
        setActiveTab('home');
      }
    }
  }, [settings?.enabledGames, activeTab]);

  const handleNavigate = (tab: ExtendedTab) => {
    // If user is not authenticated and attempts to open protected sections, trigger auth modal
    if (!user && tab !== 'home') {
      setAuthOpen(true);
      return;
    }

    // Game ON/OFF check: block access if turned OFF by admin
    const gameKeys = ['wingo', 'k3', 'fiveD', 'trx', 'aviator', 'aviatorX'] as const;
    if (gameKeys.includes(tab as any)) {
      const isEnabled = settings?.enabledGames?.[tab as (typeof gameKeys)[number]] !== false;
      if (!isEnabled) {
        showToast('⚠️ This game is currently offline for maintenance by admin.', 'warning');
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    setActiveTab(tab);
  };

  // If in admin mode, show the full Admin Command Center
  if (isAdmin) {
    return (
      <>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        <AdminPanel />
        <Toast toast={toast} onClose={() => showToast('', 'info')} />
      </>
    );
  }

  // If site is in maintenance mode and user is not admin
  if (settings?.isMaintenanceMode && !isAdmin) {
    return (
      <>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
        <SiteMaintenanceView />
        <AdminAuthModal
          isOpen={adminAuthOpen}
          onClose={() => {
            setAdminAuthOpen(false);
            if (window.location.hash || window.location.search) {
              window.history.replaceState(null, '', window.location.pathname);
            }
          }}
          onSuccess={() => {
            setAdminAuthOpen(false);
            setIsAdmin(true);
          }}
        />
        <Toast toast={toast} onClose={() => showToast('', 'info')} />
      </>
    );
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <div className="w-full min-h-screen bg-[#29303d] flex justify-center selection:bg-[#2196f3] selection:text-white overflow-x-hidden">
        <div className="w-full sm:max-w-md min-h-screen bg-[#f7f8fc] text-slate-800 font-sans flex flex-col justify-between relative overflow-x-hidden shadow-none sm:shadow-2xl">
        {/* Dynamic Views */}
        <div className="flex-1">
        {activeTab === 'home' && (
          <>
            <Header onOpenNotification={() => setNotificationOpen(true)} />
            <HomeView
              onNavigate={handleNavigate}
              onOpenAnnouncement={() => setAnnouncementOpen(true)}
              onOpenAuth={() => setAuthOpen(true)}
            />
          </>
        )}

        {activeTab === 'wingo' && (
          <WinGoGame
            onDepositClick={() => handleNavigate('deposit')}
            onWithdrawClick={() => handleNavigate('withdraw')}
            onBack={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'k3' && (
          <K3Game
            onDepositClick={() => handleNavigate('deposit')}
            onWithdrawClick={() => handleNavigate('withdraw')}
            onBack={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'fiveD' && (
          <FiveDGame
            onDepositClick={() => handleNavigate('deposit')}
            onWithdrawClick={() => handleNavigate('withdraw')}
            onBack={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'trx' && (
          <TrxGame
            onDepositClick={() => handleNavigate('deposit')}
            onWithdrawClick={() => handleNavigate('withdraw')}
            onBack={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'aviator' && (
          <AviatorGame
            onDepositClick={() => handleNavigate('deposit')}
            onBack={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'aviatorX' && (
          <AviatorXGame
            onDepositClick={() => handleNavigate('deposit')}
            onBack={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'deposit' && <DepositView onBack={() => handleNavigate('home')} />}

        {activeTab === 'withdraw' && <WithdrawView onBack={() => handleNavigate('home')} />}

        {activeTab === 'wallet' && (
          <WalletView
            onNavigateDeposit={() => handleNavigate('deposit')}
            onNavigateWithdraw={() => handleNavigate('withdraw')}
            onBack={() => handleNavigate('home')}
          />
        )}

        {activeTab === 'safe' && <SafeView onBack={() => handleNavigate('home')} />}

        {activeTab === 'activity' && <ActivityView onNavigate={handleNavigate} />}

        {activeTab === 'vip' && (
          <VipView
            onBack={() => handleNavigate('account')}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'promotion' && <PromotionView />}

        {activeTab === 'account' && (
          <AccountView
            onNavigate={handleNavigate}
            onOpenAuth={() => setAuthOpen(true)}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView onBack={() => handleNavigate('account')} />
        )}

        {activeTab === 'gameHistory' && (
          <GameHistoryView onBack={() => handleNavigate('account')} />
        )}

        {activeTab === 'support' && (
          <LiveChatView onBack={() => handleNavigate('account')} />
        )}
      </div>

      {/* Persistent Bottom Nav Bar (hidden in active sub-games, deposit, withdraw, settings, game history, vip, and support) */}
      {activeTab !== 'deposit' &&
        activeTab !== 'withdraw' &&
        activeTab !== 'settings' &&
        activeTab !== 'gameHistory' &&
        activeTab !== 'support' &&
        activeTab !== 'vip' &&
        !isCurrentGameTab && (
          <BottomNav
            activeTab={activeTab as TabType}
            setActiveTab={(t) => handleNavigate(t)}
          />
        )}

      {/* Popups & Notifications */}
      <AnnouncementModal
        isOpen={announcementOpen}
        onClose={() => setAnnouncementOpen(false)}
      />

      {/* Force Login/Registration modal for unauthenticated users */}
      <AuthModal
        isOpen={authOpen || (!authLoading && !showSplash && !user && !isAdmin)}
        onClose={() => {
          if (user) setAuthOpen(false);
        }}
        onSuccess={() => {
          setAuthOpen(false);
          setActiveTab('home');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
        canClose={!!user}
      />

      {/* Strict URL-only Admin Authentication (never accessible by clicking on user pages) */}
      <AdminAuthModal
        isOpen={adminAuthOpen}
        onClose={() => {
          setAdminAuthOpen(false);
          if (window.location.hash || window.location.search) {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        onSuccess={() => {
          setAdminAuthOpen(false);
          setIsAdmin(true);
        }}
      />

      {/* Real-time Notification Modal for Login, Deposit & Withdraw Alerts */}
      <NotificationModal
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
        onNavigate={(tab) => {
          setNotificationOpen(false);
          handleNavigate(tab as ExtendedTab);
        }}
      />

      <Toast toast={toast} onClose={() => showToast('', 'info')} />
      {/* Live Chat FAB: completely hidden when inside any game or full support view */}
      {!isGameActive && !isCurrentGameTab && activeTab !== 'support' && (
        <FloatingLiveChatFAB />
      )}
      </div>
    </div>
    </>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;
