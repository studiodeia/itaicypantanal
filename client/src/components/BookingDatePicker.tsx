import { useState, useCallback } from "react";
import { CalendarIcon } from "@/lib/icons";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { enUS } from "date-fns/locale/en-US";
import { es } from "date-fns/locale/es";
import { ChevronLeft, ChevronRight } from "@/lib/icons";
import { GoldButton } from "@/components/pantanal/buttons/GoldButton";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { goToCloudbedsBooking } from "@/lib/booking/cloudbeds";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/i18n/context";
import { t } from "@/i18n/ui-strings";

interface BookingDatePickerProps {
  className?: string;
  variant?: "hero" | "cta";
}

const dayPickerClassNames = {
  months: "flex flex-col sm:flex-row gap-4",
  month: "space-y-4",
  caption: "flex justify-center pt-1 relative items-center",
  caption_label: "[font-family:'Playfair_Display',serif] font-medium text-base text-[#e3f7ec]",
  nav: "space-x-1 flex items-center",
  nav_button:
    "h-7 w-7 bg-transparent border border-[#446354] rounded-md p-0 text-[#a8cab9] hover:text-[#e3f7ec] hover:border-[#a8cab9] transition-colors duration-200 inline-flex items-center justify-center",
  nav_button_previous: "absolute left-1",
  nav_button_next: "absolute right-1",
  table: "w-full border-collapse space-y-1",
  head_row: "flex",
  head_cell:
    "text-[#a8cab9] rounded-md w-9 font-normal text-[0.8rem] [font-family:'Lato',sans-serif]",
  row: "flex w-full mt-2",
  cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
  day: "h-9 w-9 p-0 font-normal text-[#e3f7ec] [font-family:'Lato',sans-serif] hover:bg-[#263a30] rounded-md transition-colors duration-200 inline-flex items-center justify-center aria-selected:opacity-100 cursor-pointer",
  day_range_end: "day-range-end",
  day_selected:
    "bg-[#ac8042] text-[#f2fcf7] hover:bg-[#8f6a35] focus:bg-[#ac8042]",
  day_today: "border-b-2 border-[#ac8042] text-[#e3f7ec]",
  day_outside:
    "text-[#446354] aria-selected:bg-[#ac8042]/30 aria-selected:text-[#a8cab9]",
  day_disabled: "text-[#446354] opacity-50 cursor-not-allowed",
  day_range_middle:
    "aria-selected:bg-[#ac8042]/20 aria-selected:text-[#e3f7ec]",
  day_hidden: "invisible",
};

export function BookingDatePicker({ className, variant = "hero" }: BookingDatePickerProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const { lang } = useLanguage();
  const dateLocale = lang === "en" ? enUS : lang === "es" ? es : ptBR;

  const handleSearch = useCallback(() => {
    if (!dateRange?.from) {
      setPopoverOpen(true);
      return;
    }

    goToCloudbedsBooking({
      checkIn: dateRange.from,
      checkOut: dateRange.to,
      utmContent:
        variant === "hero"
          ? "booking_datepicker_hero"
          : "booking_datepicker_cta",
    });
  }, [dateRange, variant]);

  const datePlaceholder = t("booking", "datePlaceholder", lang);
  const checkInLabel = dateRange?.from
    ? format(dateRange.from, "dd/MM/yyyy")
    : datePlaceholder;

  const checkOutLabel = dateRange?.to
    ? format(dateRange.to, "dd/MM/yyyy")
    : datePlaceholder;

  if (variant === "hero") {
    return (
      <div className={cn("flex flex-col w-full gap-4", className)}>
        {/* CHECK-IN / CHECK-OUT two-column inputs */}
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <div
              className="grid grid-cols-2 gap-3 cursor-pointer"
              role="group"
              aria-label={t("booking", "selectAriaLabel", lang)}
              data-testid="trigger-datepicker"
            >
              {/* CHECK-IN */}
              <div className="flex flex-col gap-1.5 px-3 py-2.5 border border-[#446354] rounded-md hover:border-[#a8cab9] transition-colors duration-200">
                <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#9ca3af] [font-family:'Lato',sans-serif]">
                  CHECK-IN
                </span>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#e3f7ec] flex-shrink-0" />
                  <span className="text-sm text-[#e3f7ec] [font-family:'Lato',sans-serif] leading-none">
                    {checkInLabel}
                  </span>
                </div>
              </div>

              {/* CHECK-OUT */}
              <div className="flex flex-col gap-1.5 px-3 py-2.5 border border-[#446354] rounded-md hover:border-[#a8cab9] transition-colors duration-200">
                <span className="text-[10px] font-bold tracking-[1.5px] uppercase text-[#9ca3af] [font-family:'Lato',sans-serif]">
                  CHECK-OUT
                </span>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#e3f7ec] flex-shrink-0" />
                  <span className="text-sm text-[#e3f7ec] [font-family:'Lato',sans-serif] leading-none">
                    {checkOutLabel}
                  </span>
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 border border-[#446354] bg-[#152218] rounded-lg shadow-[0_20px_40px_-10px_rgba(21,34,24,0.5)]"
            align="start"
            sideOffset={8}
          >
            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                setDateRange(range);
                if (range?.from && range?.to) {
                  setPopoverOpen(false);
                }
              }}
              numberOfMonths={2}
              locale={dateLocale}
              disabled={{ before: new Date() }}
              showOutsideDays
              className="p-4"
              classNames={dayPickerClassNames}
              components={{
                IconLeft: ({ className: iconClassName, ...props }) => (
                  <ChevronLeft className={cn("h-4 w-4", iconClassName)} {...props} />
                ),
                IconRight: ({ className: iconClassName, ...props }) => (
                  <ChevronRight className={cn("h-4 w-4", iconClassName)} {...props} />
                ),
              }}
            />
          </PopoverContent>
        </Popover>

        {/* Full-width CTA button */}
        <GoldButton
          className="w-full h-[52px] tracking-[1.5px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          onClick={handleSearch}
          data-testid="button-buscar-datas"
        >
          {t("booking", "checkAvailabilityBtn", lang)}
        </GoldButton>
      </div>
    );
  }

  // CTA variant (original layout)
  const displayText = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "dd/MM/yyyy")}  —  ${format(dateRange.to, "dd/MM/yyyy")}`
      : `${format(dateRange.from, "dd/MM/yyyy")}  —  ${t("booking", "selectCheckout", lang)}`
    : t("booking", "selectDates", lang);

  return (
    <div
      className={cn(
        "flex flex-col w-full gap-0",
        className
      )}
    >
      <div className="flex flex-row items-center justify-between gap-0 w-full py-2 pr-2 pl-5 glass-card-hero">
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              className="inline-flex items-center gap-2 md:gap-3.5 cursor-pointer"
              data-testid="trigger-datepicker"
            >
              <CalendarIcon className="w-5 h-5 md:w-7 md:h-7 text-[#e3f7ec]" />
              <span className="font-functional-md font-[number:var(--functional-md-font-weight)] text-[#e3f7ec] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] whitespace-nowrap [font-style:var(--functional-md-font-style)]">
                {displayText}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 border border-[#446354] bg-[#152218] rounded-lg shadow-[0_20px_40px_-10px_rgba(21,34,24,0.5)]"
            align="start"
            sideOffset={8}
          >
            <DayPicker
              mode="range"
              selected={dateRange}
              onSelect={(range) => {
                setDateRange(range);
                if (range?.from && range?.to) {
                  setPopoverOpen(false);
                }
              }}
              numberOfMonths={2}
              locale={dateLocale}
              disabled={{ before: new Date() }}
              showOutsideDays
              className="p-4"
              classNames={dayPickerClassNames}
              components={{
                IconLeft: ({ className: iconClassName, ...props }) => (
                  <ChevronLeft className={cn("h-4 w-4", iconClassName)} {...props} />
                ),
                IconRight: ({ className: iconClassName, ...props }) => (
                  <ChevronRight className={cn("h-4 w-4", iconClassName)} {...props} />
                ),
              }}
            />
          </PopoverContent>
        </Popover>

        <GoldButton
          className="w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          onClick={handleSearch}
          disabled={!dateRange?.from}
          data-testid="button-buscar-datas"
        >
          {t("booking", "searchDates", lang)}
        </GoldButton>
      </div>
    </div>
  );
}
