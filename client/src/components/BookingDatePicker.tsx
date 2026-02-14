import { useState, useCallback } from "react";
import { CalendarIcon } from "@/lib/icons";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { ChevronLeft, ChevronRight } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { goToCloudbedsBooking } from "@/lib/booking/cloudbeds";
import { cn } from "@/lib/utils";

interface BookingDatePickerProps {
  className?: string;
  variant?: "hero" | "cta";
}

export function BookingDatePicker({ className, variant = "hero" }: BookingDatePickerProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [popoverOpen, setPopoverOpen] = useState(false);

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

  const displayText = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "dd/MM/yyyy")}  —  ${format(dateRange.to, "dd/MM/yyyy")}`
      : `${format(dateRange.from, "dd/MM/yyyy")}  —  Selecione`
    : "Selecionar datas de estadia";

  return (
    <div
      className={cn(
        "flex flex-col w-full",
        variant === "hero" ? "gap-3" : "gap-0",
        className
      )}
    >
      {variant === "hero" && (
        <span className="font-functional-sm font-[number:var(--functional-sm-font-weight)] text-[#ac8042] text-[length:var(--functional-sm-font-size)] leading-[var(--functional-sm-line-height)] tracking-[1.5px] uppercase">
          Sistema Premium All-Inclusive
        </span>
      )}
      <div
        className={cn(
          "flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 w-full",
          variant === "hero"
            ? "h-12 md:h-14 pl-3 md:pl-5 pr-2 py-2 bg-[rgba(10,19,12,0.2)] rounded-lg"
            : "p-4 sm:py-2 sm:pr-2 sm:pl-5 glass-card-hero",
        )}
      >
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
            locale={ptBR}
            disabled={{ before: new Date() }}
            showOutsideDays
            className="p-4"
            classNames={{
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
            }}
            components={{
              IconLeft: ({ className: iconClassName, ...props }) => (
                <ChevronLeft
                  className={cn("h-4 w-4", iconClassName)}
                  {...props}
                />
              ),
              IconRight: ({ className: iconClassName, ...props }) => (
                <ChevronRight
                  className={cn("h-4 w-4", iconClassName)}
                  {...props}
                />
              ),
            }}
          />
        </PopoverContent>
      </Popover>

      <Button
        className="h-auto px-4 py-2 bg-[#ac8042] hover:bg-[#8f6a35] rounded text-[#f2fcf7] font-functional-md font-[number:var(--functional-md-font-weight)] text-[length:var(--functional-md-font-size)] tracking-[var(--functional-md-letter-spacing)] leading-[var(--functional-md-line-height)] whitespace-nowrap [font-style:var(--functional-md-font-style)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:opacity-90 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        onClick={handleSearch}
        disabled={!dateRange?.from}
        data-testid="button-buscar-datas"
      >
        Buscar datas
      </Button>
      </div>
    </div>
  );
}

