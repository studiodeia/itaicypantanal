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
      <div className="flex max-w-[1440px] items-end justify-center gap-[100px] px-16 py-[100px] w-full">
        <div className="flex items-center justify-between flex-1">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="inline-flex flex-col items-start justify-center gap-2"
            >
              {stat.hasIcon ? (
                <div className="flex w-[174px] items-center gap-3">
                  <div className="flex items-center justify-center flex-1 font-display-lg font-[number:var(--display-lg-font-weight)] text-[#e3f7ec] text-[length:var(--display-lg-font-size)] tracking-[var(--display-lg-letter-spacing)] leading-[var(--display-lg-line-height)] [font-style:var(--display-lg-font-style)]">
                    {stat.value}
                  </div>
                  <img
                    className="w-16 h-16"
                    alt="Rating icon"
                    src="/figmaAssets/rating-icon.svg"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center self-stretch font-display-lg font-[number:var(--display-lg-font-weight)] text-[#e3f7ec] text-[length:var(--display-lg-font-size)] leading-[var(--display-lg-line-height)] tracking-[var(--display-lg-letter-spacing)] [font-style:var(--display-lg-font-style)]">
                  {stat.value}
                </div>
              )}
              <div
                className={`flex items-center justify-center ${
                  stat.hasIcon ? "w-fit whitespace-nowrap" : "self-stretch"
                } font-lead-md font-[number:var(--lead-md-font-weight)] text-[#a8cab9] text-[length:var(--lead-md-font-size)] tracking-[var(--lead-md-letter-spacing)] leading-[var(--lead-md-line-height)] [font-style:var(--lead-md-font-style)]`}
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
