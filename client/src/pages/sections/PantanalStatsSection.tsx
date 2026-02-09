export const PantanalStatsSection = (): JSX.Element => {
  const stats = [
    {
      value: "2000+",
      label: "HÓSPEDES SATISFEITOS",
    },
    {
      value: "166+",
      label: "AVES AVISTADAS",
    },
    {
      value: "15+",
      label: "ANOS DE EXPERIÊNCIA",
    },
    {
      value: "4.9",
      label: "AVALIAÇÃO MÉDIA",
      hasIcon: true,
    },
  ];

  return (
    <section className="bg-[#263a30] flex flex-col items-center w-full">
      <div className="flex max-w-[1440px] items-end justify-center px-5 md:px-8 lg:px-16 py-12 md:py-16 lg:py-[100px] w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-0 items-center justify-between flex-1 lg:flex lg:items-center lg:justify-between">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center md:items-start md:text-left justify-center gap-2"
              data-testid={`stat-${index}`}
            >
              {stat.hasIcon ? (
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex items-center justify-center font-display-lg font-[number:var(--display-lg-font-weight)] text-[#e3f7ec] text-[length:var(--display-lg-font-size)] tracking-[var(--display-lg-letter-spacing)] leading-[var(--display-lg-line-height)] [font-style:var(--display-lg-font-style)]">
                    {stat.value}
                  </div>
                  <img
                    className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16"
                    alt="Rating icon"
                    src="/figmaAssets/rating-icon.svg"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center font-display-lg font-[number:var(--display-lg-font-weight)] text-[#e3f7ec] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]">
                  {stat.value}
                </div>
              )}
              <div
                className="flex items-center justify-center font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)] text-center md:text-left whitespace-nowrap"
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
