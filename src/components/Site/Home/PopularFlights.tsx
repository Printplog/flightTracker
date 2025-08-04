import SectionPadding from "@/layouts/SectionPadding";

interface Flight {
  from: string;
  to: string;
  img: string;
}


const flights: Flight[] = [
  {
    from: "London",
    to: "Lisbon",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    from: "London",
    to: "Athens",
    img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80",
  },
  {
    from: "Toronto",
    to: "Vancouver",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
  },
  {
    from: "London",
    to: "Málaga",
    img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
  },
  {
    from: "London",
    to: "Milan",
    img: "https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&w=400&q=80",
  },
  {
    from: "Bangkok",
    to: "Chiang Mai",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80",
  },
  {
    from: "London",
    to: "Tirana",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    from: "London",
    to: "Faro",
    img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
  },
  {
    from: "London",
    to: "Larnaca",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    from: "London",
    to: "Istanbul",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
  },
  {
    from: "Chiang Mai",
    to: "Bangkok",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    from: "London",
    to: "Bucharest",
    img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=400&q=80",
  },
  {
    from: "London",
    to: "New York",
    img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80",
  },
];

function chunkArray(arr: Flight[], size: number): Flight[][] {
  const result: Flight[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export default function PopularFlights() {
  // 3 columns, 5 rows (as in the image)
  const columns = chunkArray(flights, Math.ceil(flights.length / 3));

  return (
    <SectionPadding className="bg-muted/40 rounded-2xl p-6 py-10 mt-10 ">
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">
        Popular flights
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {columns.map((col, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-3">
            {col.map((flight) => (
              <div
                key={flight.from + flight.to}
                className="flex items-center bg-card rounded-xl shadow-sm border hover:shadow-md transition group cursor-pointer p-3"
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                  <img
                    src={flight.img}
                    alt={`${flight.from} to ${flight.to}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">
                        {flight.from}
                      </span>
                      <svg
                        className="w-4 h-4 text-muted-foreground"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                      <span className="text-sm font-medium text-foreground">
                        {flight.to}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Popular
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Multiple airlines
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </SectionPadding>
  );
}

