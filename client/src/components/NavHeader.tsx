import { ChevronDownIcon, ChevronRightIcon, MenuIcon, XIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

interface MenuItem {
  title: string;
  description: string;
  image: string;
}

interface MenuCategory {
  label: string;
  items: MenuItem[];
}

const menuData: Record<string, MenuCategory> = {
  Hospedagens: {
    label: "Hospedagens",
    items: [
      {
        title: "Culinária",
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies dictum.",
        image: "/images/nav/menu-culinaria.webp",
      },
      {
        title: "Acomodações",
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies dictum.",
        image: "/images/nav/menu-acomodacoes.webp",
      },
    ],
  },
  Experiências: {
    label: "Experiências",
    items: [
      {
        title: "Pesca Esportiva",
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies dictum.",
        image: "/images/nav/menu-pesca.webp",
      },
      {
        title: "Birdwatching",
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies dictum.",
        image: "/images/nav/menu-birdwatching.webp",
      },
      {
        title: "Ecoturismo",
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies dictum.",
        image: "/images/nav/menu-ecoturismo.webp",
      },
    ],
  },
  Blog: {
    label: "Blog",
    items: [
      {
        title: "Vida Selvagem",
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies dictum.",
        image: "/images/nav/menu-vida-selvagem.webp",
      },
      {
        title: "Sustentabilidade",
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies dictum.",
        image: "/images/nav/menu-sustentabilidade.webp",
      },
    ],
  },
};

const navigationItems = [
  { label: "Início", active: true, hasDropdown: false },
  { label: "Hospedagens", active: false, hasDropdown: true },
  { label: "Experiências", active: false, hasDropdown: true },
  { label: "Nosso impacto", active: false, hasDropdown: false },
  { label: "Contato", active: false, hasDropdown: false },
  { label: "Blog", active: false, hasDropdown: true },
];

interface NavHeaderProps {
  className?: string;
  onMenuStateChange?: (isOpen: boolean) => void;
}

export function NavHeader({ className, onMenuStateChange }: NavHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState<string | null>(null);
  const [desktopActiveDropdown, setDesktopActiveDropdown] = useState<string | null>(null);
  const [languageSwitcherOpen, setLanguageSwitcherOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isDropdownOpen = desktopActiveDropdown !== null && menuData[desktopActiveDropdown] !== undefined;

  const handleDesktopNavEnter = useCallback((label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    if (menuData[label]) {
      setDesktopActiveDropdown(label);
    }
  }, []);

  const handleDesktopNavLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setDesktopActiveDropdown(null);
    }, 200);
  }, []);

  const handleDropdownEnter = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const handleDropdownLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setDesktopActiveDropdown(null);
    }, 200);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setMobileActiveCategory(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        desktopActiveDropdown &&
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setDesktopActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [desktopActiveDropdown]);

  // Notify parent about menu state changes (for blur effects)
  useEffect(() => {
    onMenuStateChange?.(isDropdownOpen || mobileMenuOpen);
  }, [isDropdownOpen, mobileMenuOpen, onMenuStateChange]);

  const mobileMenuItems = mobileActiveCategory
    ? menuData[mobileActiveCategory]?.items ?? []
    : [];

  return (
    <>
      <div
        ref={headerRef}
        className={cn(
          "absolute top-0 left-0 w-full z-20",
          className
        )}
        onMouseLeave={handleDesktopNavLeave}
      >
        <header className={cn(
          "flex flex-col items-center justify-center gap-2 px-5 md:px-8 lg:px-10 py-3 md:py-6 lg:py-8 transition-all duration-300",
          isDropdownOpen && "bg-[rgba(21,34,24,0.9)] backdrop-blur-[10px]"
        )}>
          <nav className="flex max-w-[1360px] items-center justify-between w-full relative">
            <img
              className="w-[104px] md:w-[115px] lg:w-[130.43px] h-auto"
              alt="Logo"
              src="/images/icons/logo.svg"
              data-testid="img-logo"
            />

            <div className="hidden lg:flex items-center gap-1" onMouseLeave={(e) => {
              if (!(e.relatedTarget instanceof Node) || !headerRef.current?.contains(e.relatedTarget)) {
                handleDesktopNavLeave();
              }
            }}>
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  className={`h-auto flex items-center gap-1.5 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                    isDropdownOpen
                      ? desktopActiveDropdown === item.label
                        ? "text-[#f2fcf7]"
                        : "text-[#cfebdd]"
                      : item.active
                        ? "text-[#e3f7ec]"
                        : "text-[#a8cab9]"
                  } font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]`}
                  data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onMouseEnter={() => item.hasDropdown && handleDesktopNavEnter(item.label)}
                  onClick={() => {
                    if (item.hasDropdown) {
                      setDesktopActiveDropdown(desktopActiveDropdown === item.label ? null : item.label);
                    }
                  }}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDownIcon
                      className={`w-5 h-5 transition-transform duration-200 ${
                        desktopActiveDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher
                open={languageSwitcherOpen}
                onOpenChange={setLanguageSwitcherOpen}
              >
                <button
                  className="hidden md:inline-flex items-center gap-1 px-3 py-2.5 text-[#a8cab9] hover:text-[#e3f7ec] transition-colors duration-200 font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]"
                  data-testid="button-language"
                >
                  PT
                  <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${languageSwitcherOpen ? "rotate-180" : ""}`} />
                </button>
              </LanguageSwitcher>

              <Button
                className="bg-[#ac8042] hover:bg-[#8f6a35] text-[#f2fcf7] rounded px-4 py-2 h-auto font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[length:var(--functional-sm-font-size)] tracking-[var(--functional-sm-letter-spacing)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]"
                data-testid="button-reservar-hero"
              >
                Reservar
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-[#e3f7ec]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {mobileMenuOpen ? (
                  <XIcon className="w-7 h-7" />
                ) : (
                  <MenuIcon className="w-7 h-7" />
                )}
              </Button>
            </div>
          </nav>
        </header>

        {isDropdownOpen && (
          <div
            className="hidden lg:block w-full bg-[rgba(21,34,24,0.9)] backdrop-blur-[10px] shadow-[0_8px_24px_-4px_rgba(10,19,12,0.4)]"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <div className="max-w-[1440px] mx-auto px-10 pb-10">
              <div className="flex gap-[32px] h-[316px]">
                {menuData[desktopActiveDropdown!].items.map((item, idx) => (
                  <button
                    key={idx}
                    className="relative w-[316px] h-full rounded-[8px] overflow-hidden group cursor-pointer text-left flex flex-col justify-end"
                    data-testid={`card-menu-desktop-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[8px]">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-[8px]"
                      />
                      <div
                        className="absolute inset-0 rounded-[8px]"
                        style={{ backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0) 31.13%, rgba(0,0,0,0.64) 73.89%), linear-gradient(90deg, rgba(0,0,0,0.16) 0%, rgba(0,0,0,0.16) 100%)" }}
                      />
                    </div>
                    <div className="relative w-full backdrop-blur-[8px] bg-[rgba(255,255,255,0.01)] flex flex-col gap-[12px] p-[16px]">
                      <div className="flex items-center justify-between gap-[16px] pb-[8px] border-b border-[#f2fcf7]">
                        <span
                          className="[font-family:'Playfair_Display',serif] font-medium text-[32px] leading-[48px] text-[#e3f7ec] flex-1 min-w-0"
                          style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
                        >
                          {item.title}
                        </span>
                        <ChevronRightIcon className="w-6 h-6 text-[#e3f7ec] shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                      <p className="[font-family:'Lato',sans-serif] font-normal text-[14px] leading-[20px] text-[#a8cab9]">
                        {item.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col" data-testid="mobile-menu-overlay">
          <div className="absolute inset-0 backdrop-blur-[16px] bg-[rgba(255,255,255,0.01)]" />

          <div className="relative z-10 bg-[rgba(21,34,24,0.9)] backdrop-blur-[10px] flex items-center justify-between px-5 py-3">
            <img
              className="w-[104px] md:w-[115px] h-auto"
              alt="Logo"
              src="/images/icons/logo.svg"
            />
            <div className="flex items-center gap-4">
              <button
                className="hidden md:inline-flex items-center gap-1 px-3 py-2.5 text-[#a8cab9] hover:text-[#e3f7ec] transition-colors duration-200 font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]"
                data-testid="button-language-mobile-menu"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLanguageSwitcherOpen(true);
                }}
              >
                PT
                <ChevronDownIcon className="w-5 h-5" />
              </button>
              <Button
                className="bg-[#ac8042] hover:bg-[#8f6a35] text-[#f2fcf7] rounded px-4 py-2 h-auto font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[length:var(--functional-sm-font-size)] tracking-[var(--functional-sm-letter-spacing)] leading-[var(--functional-sm-line-height)] [font-style:var(--functional-sm-font-style)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(172,128,66,0.4)]"
                data-testid="button-reservar-mobile-menu"
              >
                Reservar
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-[#e3f7ec]"
                onClick={() => setMobileMenuOpen(false)}
                data-testid="button-close-mobile-menu"
              >
                <XIcon className="w-7 h-7" />
              </Button>
            </div>
          </div>

          <div className="relative z-10 flex-1 overflow-y-auto">
            {mobileActiveCategory === null ? (
              <div className="bg-[rgba(21,34,24,0.9)] backdrop-blur-[10px] flex flex-col">
                {navigationItems.filter(item => item.hasDropdown).map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between px-5 py-5 border-b border-[#446354] text-left"
                    onClick={() => setMobileActiveCategory(item.label)}
                    data-testid={`button-mobile-category-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <span className="[font-family:'Lato',sans-serif] font-semibold text-[22px] md:text-[28px] leading-[32px] md:leading-[36px] text-[#e3f7ec]">
                      {item.label}
                    </span>
                    <ChevronRightIcon className="w-6 h-6 text-[#a8cab9]" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="bg-[rgba(21,34,24,0.9)] backdrop-blur-[10px] flex flex-col items-center pb-10">
                <div className="flex flex-col gap-10 w-full max-w-[1440px]">
                  <button
                    className="flex items-center gap-4 p-5 border-b border-[#446354] w-full"
                    onClick={() => setMobileActiveCategory(null)}
                    data-testid="button-mobile-menu-back"
                  >
                    <ArrowLeftIcon className="w-7 h-7 text-[#e3f7ec] flex-shrink-0" />
                    <span className="[font-family:'Lato',sans-serif] font-semibold text-[22px] md:text-[28px] leading-[32px] md:leading-[36px] text-[#e3f7ec]">
                      {mobileActiveCategory}
                    </span>
                  </button>

                  <div className="flex flex-col px-1 max-h-[620px] overflow-y-auto">
                    {mobileMenuItems.map((item, idx) => (
                      <button
                        key={idx}
                        className="flex items-center gap-4 p-4 text-left w-full"
                        data-testid={`button-mobile-submenu-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="w-[108px] h-[108px] md:w-[140px] md:h-[140px] rounded flex-shrink-0 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 flex flex-col gap-3">
                          <div className="flex items-center justify-between gap-4">
                            <span
                              className="[font-family:'Playfair_Display',serif] font-medium text-[22px] md:text-[28px] leading-[32px] md:leading-[36px] text-[#e3f7ec]"
                              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
                            >
                              {item.title}
                            </span>
                            <ChevronRightIcon className="w-6 h-6 text-[#a8cab9] flex-shrink-0" />
                          </div>
                          <p className="[font-family:'Lato',sans-serif] font-normal text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-[#a8cab9]">
                            {item.description}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </>
  );
}
