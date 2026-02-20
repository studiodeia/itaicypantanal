import { Suspense, lazy } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MotionProvider } from "@/components/MotionProvider";
import { LanguageProvider } from "@/i18n/context";
import { Analytics } from "@vercel/analytics/react";

const Desktop = lazy(() =>
  import("@/pages/Desktop").then((module) => ({ default: module.Desktop })),
);
const Acomodacoes = lazy(() =>
  import("@/pages/Acomodacoes").then((module) => ({
    default: module.Acomodacoes,
  })),
);
const Culinaria = lazy(() =>
  import("@/pages/Culinaria").then((module) => ({ default: module.Culinaria })),
);
const Pesca = lazy(() =>
  import("@/pages/Pesca").then((module) => ({ default: module.Pesca })),
);
const BirdWatching = lazy(() =>
  import("@/pages/BirdWatching").then((module) => ({
    default: module.BirdWatching,
  })),
);
const Ecoturismo = lazy(() =>
  import("@/pages/Ecoturismo").then((module) => ({
    default: module.Ecoturismo,
  })),
);
const Blog = lazy(() =>
  import("@/pages/Blog").then((module) => ({ default: module.Blog })),
);
const BlogArticlePage = lazy(() =>
  import("@/pages/blog/BlogArticlePage").then((module) => ({
    default: module.BlogArticlePage,
  })),
);
const Contato = lazy(() =>
  import("@/pages/contato").then((module) => ({ default: module.Contato })),
);
const NossoImpacto = lazy(() =>
  import("@/pages/NossoImpacto").then((module) => ({
    default: module.NossoImpacto,
  })),
);
const Privacidade = lazy(() =>
  import("@/pages/Privacidade").then((module) => ({
    default: module.Privacidade,
  })),
);
const BirdCatalogPage = lazy(() =>
  import("@/pages/birdwatching/BirdCatalogPage").then((module) => ({
    default: module.BirdCatalogPage,
  })),
);
const BirdSpeciesPage = lazy(() =>
  import("@/pages/birdwatching/BirdSpeciesPage").then((module) => ({
    default: module.BirdSpeciesPage,
  })),
);
const Regiao = lazy(() =>
  import("@/pages/Regiao").then((module) => ({ default: module.Regiao })),
);
const NotFound = lazy(() => import("@/pages/not-found"));
const ChatWidget = lazy(() =>
  import("@/components/chat/ChatWidget").then((module) => ({
    default: module.ChatWidget,
  })),
);
const PanelLoginPage = lazy(() =>
  import("@/pages/panel/PanelLoginPage").then((module) => ({
    default: module.PanelLoginPage,
  })),
);
const PanelHomePage = lazy(() =>
  import("@/pages/panel/PanelHomePage").then((module) => ({
    default: module.PanelHomePage,
  })),
);
const PanelAdminPage = lazy(() =>
  import("@/pages/panel/PanelAdminPage").then((module) => ({
    default: module.PanelAdminPage,
  })),
);

function RouterFallback() {
  return (
    <div
      className="min-h-screen w-full bg-[#152218]"
      aria-busy="true"
      data-testid="route-loading"
    />
  );
}

function Router() {
  return (
    <Suspense fallback={<RouterFallback />}>
      <Switch>
        {/* Add pages below */}
        <Route path="/" component={Desktop} />
        <Route path="/acomodacoes" component={Acomodacoes} />
        <Route path="/culinaria" component={Culinaria} />
        <Route path="/pesca" component={Pesca} />
        <Route path="/observacao-de-aves" component={BirdWatching} />
        <Route path="/observacao-de-aves/catalogo" component={BirdCatalogPage} />
        <Route path="/observacao-de-aves/catalogo/:slug" component={BirdSpeciesPage} />
        <Route path="/ecoturismo" component={Ecoturismo} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:categorySlug/:slug" component={BlogArticlePage} />
        <Route path="/contato" component={Contato} />
        <Route path="/nosso-impacto" component={NossoImpacto} />
        <Route path="/regiao" component={Regiao} />
        <Route path="/politica-de-privacidade" component={Privacidade} />
        <Route path="/painel/login" component={PanelLoginPage} />
        <Route path="/painel/admin" component={PanelAdminPage} />
        <Route path="/painel" component={PanelHomePage} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function AppContent() {
  const [location] = useLocation();
  const hideChatWidget = location.startsWith("/painel");

  return (
    <>
      <Toaster />
      <Router />
      {!hideChatWidget && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}
      <Analytics />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <MotionProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </QueryClientProvider>
      </MotionProvider>
    </LanguageProvider>
  );
}

export default App;
