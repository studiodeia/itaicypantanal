import { CalendarIcon, ChevronDownIcon, ChevronRightIcon, MenuIcon, XIcon, ArrowLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useRef, useCallback } from "react";

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
        image: "/figmaAssets/menu-culinaria.jpg",
      },
      {
        title: "Acomodações",
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies dictum.",
        image: "/figmaAssets/menu-acomodacoes.jpg",
      },
    ],
  },
  Experiências: {
    label: "Experiências",
    items: [
      {
        title: "Pesca Esportiva",
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies dictum.",
        image: "/figmaAssets/img.png",
      },
      {
        title: "Birdwatching",
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies dictum.",
        image: "/figmaAssets/img-1.png",
      },
      {
        title: "Ecoturismo",
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies dictum.",
        image: "/figmaAssets/menu-ecoturismo.jpg",
      },
    ],
  },
  Blog: {
    label: "Blog",
    items: [
      {
        title: "Vida Selvagem",
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies dictum.",
        image: "/figmaAssets/image.png",
      },
      {
        title: "Sustentabilidade",
        description: "Lorem ipsum dolor sit amet consectetur. Ultricies dictum.",
        image: "/figmaAssets/image-2.png",
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

export const PantanalHeroSection = (): JSX.Element => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActiveCategory, setMobileActiveCategory] = useState<string | null>(null);
  const [desktopActiveDropdown, setDesktopActiveDropdown] = useState<string | null>(null);
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

  const mobileMenuItems = mobileActiveCategory
    ? menuData[mobileActiveCategory]?.items ?? []
    : [];

  return (
    <section className="relative flex flex-col h-[844px] md:h-[680px] lg:h-[740px] items-center justify-end w-full z-[11] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-300 ${
          isDropdownOpen ? "blur-[8px] scale-105" : ""
        }`}
        data-testid="video-hero-background"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
      </video>

      <div className={`absolute inset-0 z-[1] transition-all duration-300 ${
        isDropdownOpen
          ? "bg-[rgba(21,34,24,0.7)] backdrop-blur-[8px]"
          : "bg-[linear-gradient(0deg,rgba(21,34,24,0.5)_0%,rgba(21,34,24,0)_100%),linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0)_100%),linear-gradient(0deg,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.32)_100%)]"
      }`} />

      <div
        ref={headerRef}
        className={`absolute top-0 left-0 w-full z-20 transition-colors duration-300 ${
          isDropdownOpen ? "bg-[#263a30]" : ""
        }`}
        onMouseLeave={handleDesktopNavLeave}
      >
        <header className="flex flex-col items-center justify-center gap-2 px-5 md:px-8 lg:px-10 py-3 md:py-6 lg:py-8">
          <nav className="flex max-w-[1360px] items-center justify-between w-full relative">
            <img
              className="w-[104px] md:w-[115px] lg:w-[130.43px] h-auto"
              alt="Logo"
              src="/figmaAssets/logo.svg"
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
              <Button
                variant="ghost"
                className="hidden md:flex text-[#a8cab9] font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]"
                data-testid="button-language"
              >
                PT
                <ChevronDownIcon className="w-5 h-5 md:w-7 md:h-7" />
              </Button>

              <Button
                className="bg-[#ac8042] text-[#f2fcf7] rounded font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]"
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
            className="hidden lg:block w-full bg-[#263a30]"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <div className="max-w-[1360px] mx-auto px-10 pt-4 pb-10">
              <div className="flex gap-6">
                {menuData[desktopActiveDropdown!].items.map((item, idx) => (
                  <button
                    key={idx}
                    className="relative flex-1 max-w-[440px] h-[280px] rounded-lg overflow-hidden group cursor-pointer text-left"
                    data-testid={`card-menu-desktop-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-lg" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                      <div className="flex items-center gap-3">
                        <span
                          className="[font-family:'Playfair_Display',serif] font-medium text-[22px] leading-[32px] text-[#f2fcf7]"
                          style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
                        >
                          {item.title}
                        </span>
                        <ChevronRightIcon className="w-5 h-5 text-[#f2fcf7] transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                      <p className="[font-family:'Lato',sans-serif] font-normal text-[16px] leading-[24px] text-[#cfebdd]">
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

          <div className="relative z-10 bg-[#263a30] flex items-center justify-between px-5 py-3">
            <img
              className="w-[104px] md:w-[115px] h-auto"
              alt="Logo"
              src="/figmaAssets/logo.svg"
            />
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="hidden md:flex text-[#a8cab9] font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]"
                data-testid="button-language-mobile-menu"
              >
                PT
                <ChevronDownIcon className="w-5 h-5 md:w-7 md:h-7" />
              </Button>
              <Button
                className="bg-[#ac8042] text-[#f2fcf7] rounded font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] [font-style:var(--functional-md-font-style)]"
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
              <div className="bg-[#263a30] flex flex-col">
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
              <div className="bg-[#263a30] flex flex-col items-center pb-10">
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

      <div className="relative z-[2] flex flex-col lg:flex-row max-w-[1440px] items-end justify-end gap-[48px] lg:gap-[100px] px-5 md:px-8 lg:px-16 py-[48px] md:py-12 lg:py-[100px] w-full flex-1">
        <div className="flex flex-col items-start justify-end gap-5 lg:gap-0 lg:h-[260px] lg:justify-between flex-1 overflow-hidden">
          <h1 className="font-display-lg font-[number:var(--display-lg-font-weight)] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] text-[#e3f7ec] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)] max-w-[592px]" data-testid="text-hero-heading" style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}>
            O Pantanal como você nunca sentiu.
          </h1>

          <p className="font-body-md font-[number:var(--body-md-font-weight)] text-[length:var(--body-md-font-size)] leading-[var(--body-md-line-height)] text-[#e3f7ec] tracking-[var(--body-md-letter-spacing)] [font-style:var(--body-md-font-style)] max-w-[592px]" data-testid="text-hero-subtitle">
            Elegância essencial em harmonia com o bioma. Uma experiência de
            imersão autêntica, sem excessos e sem concessões.
          </p>
        </div>

        <Card className="w-full lg:w-[522px] bg-[rgba(10,19,12,0.2)] rounded-lg backdrop-blur-[2.0px] backdrop-brightness-[110%] [-webkit-backdrop-filter:blur(2.0px)_brightness(110%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_1px_rgba(0,0,0,0.13),inset_-1px_0_1px_rgba(0,0,0,0.11)] border-0" data-testid="card-booking">
          <CardContent className="flex flex-col items-start gap-5 md:gap-6 lg:gap-10 p-4 md:p-6 lg:p-8">
            <div className="flex flex-col items-start gap-4 w-full">
              <h2 className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-[#e3f7ec] text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)]" data-testid="text-booking-heading" style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}>
                Procure por uma data especial
              </h2>

              <p className="[font-family:'Lato',Helvetica] font-normal text-[#a8cab9] text-base leading-6 lg:text-[length:var(--body-sm-font-size)] lg:leading-[var(--body-sm-line-height)]" data-testid="text-booking-description">
                Elegância essencial em harmonia com o bioma. Uma experiência de
                imersão autêntica, sem
              </p>
            </div>

            <div className="hidden md:flex h-12 md:h-14 items-center justify-between pl-3 md:pl-5 pr-2 py-2 w-full bg-[#0a130b33] rounded-lg">
              <div className="flex items-center gap-2 md:gap-3.5">
                <CalendarIcon className="w-5 h-5 md:w-7 md:h-7 text-[#e3f7ec]" />

                <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] whitespace-nowrap [font-style:var(--functional-md-font-style)]" data-testid="text-date-range">
                  23/04/2025 - 24/05/2025
                </span>
              </div>

              <Button className="bg-[#ac8042] rounded text-[#f2fcf7] font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] whitespace-nowrap [font-style:var(--functional-md-font-style)]" data-testid="button-buscar-datas">
                Buscar datas
              </Button>
            </div>

            <Button size="lg" className="flex md:hidden w-full bg-[#ac8042] rounded-md text-[#f2fcf7] [font-family:'Lato',Helvetica] font-semibold" data-testid="button-buscar-datas-mobile">
              Buscar datas
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
