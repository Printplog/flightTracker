import Marquee from "react-fast-marquee";

export default function Companies() {
  const logos: string[] = Array.from(
    { length: 16 },
    (_, index) => `/p${index + 1}.png`
  ).filter((_, index) => (index + 1) % 4 !== 0); // Skip every 4th image

  return (
    <section className="w-full">
      <div className="mx-auto max-w-5xl">
        <h3 className="mb-6 text-center text-sm font-medium text-muted-foreground">
          Trusted by logistics leaders
        </h3>

        <div className="relative marquee overflow-hidden">
          {/* <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-background to-transparent" /> */}

          <div className="mask-l-from-80% mask-r-from-80%">
            <Marquee autoFill pauseOnHover speed={50} className="[--gap:3rem]">
              <div className="flex items-center gap-12 mr-12">
                {logos.map((src, idx) => (
                  <img
                    key={`${src}-${idx}`}
                    src={src}
                    alt={`Logo ${idx + 1}`}
                    className="h-10 w-auto opacity-80 transition-opacity hover:opacity-100"
                    draggable={false}
                  />
                ))}
              </div>
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}
