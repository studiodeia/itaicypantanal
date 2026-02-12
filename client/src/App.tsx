import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MotionProvider } from "@/components/MotionProvider";
import NotFound from "@/pages/not-found";

import { Desktop } from "@/pages/Desktop";
import { Acomodacoes } from "@/pages/Acomodacoes";
import { Culinaria } from "@/pages/Culinaria";
import { Pesca } from "@/pages/Pesca";
import { BirdWatching } from "@/pages/BirdWatching";
import { Ecoturismo } from "@/pages/Ecoturismo";
import { Blog } from "@/pages/Blog";
import { BlogArticlePage } from "@/pages/blog/BlogArticlePage";
import { Contato } from "@/pages/contato";
import { NossoImpacto } from "@/pages/NossoImpacto";
import { Privacidade } from "@/pages/Privacidade";
import { BirdCatalogPage } from "@/pages/birdwatching/BirdCatalogPage";
import { BirdSpeciesPage } from "@/pages/birdwatching/BirdSpeciesPage";

function Router() {
  return (
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
      <Route path="/politica-de-privacidade" component={Privacidade} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <MotionProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </MotionProvider>
  );
}

export default App;
