import React from 'react';
import SectionPadding from '../../../layouts/SectionPadding';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  description: string;
  image: string;
}

export default function TeamSection(): React.JSX.Element {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "DAVID ANDERSON",
      position: "CO-FOUNDER",
      description: "David, a co-founder at MyCargoLane, leads with a commitment to innovation and customer satisfaction. His strategic vision ensures that MyCargoLane provides top-notch shipping solutions.",
      image: "/api/placeholder/200/200"
    },
    {
      id: 2,
      name: "SOPHIE WALKER",
      position: "CO-FOUNDER",
      description: "Sophie, a co-founder of MyCargoLane, is dedicated to ensuring the smooth operation of our shipping services. Her attention to detail and customer-centric approach drive the success of MyCargoLane.",
      image: "/api/placeholder/200/200"
    },
    {
      id: 3,
      name: "RYAN CARTER",
      position: "CO-FOUNDER",
      description: "Ryan, a co-founder at MyCargoLane, brings expertise and passion to the world of logistics. His dedication to efficiency and customer satisfaction sets the standard for our shipping services.",
      image: "/api/placeholder/200/200"
    },
    {
      id: 4,
      name: "EMMA RODRIGUEZ",
      position: "OPERATIONS MANAGER",
      description: "Emma oversees daily operations at MyCargoLane, ensuring seamless coordination between departments. Her exceptional organizational skills and problem-solving abilities keep our logistics running smoothly.",
      image: "/api/placeholder/200/200"
    },
    {
      id: 5,
      name: "MICHAEL CHEN",
      position: "HEAD OF CUSTOMER SERVICE",
      description: "Michael leads our customer service team with dedication and empathy. His commitment to resolving client concerns quickly and effectively has earned MyCargoLane an outstanding customer satisfaction record.",
      image: "/api/placeholder/200/200"
    },
    {
      id: 6,
      name: "SARAH THOMPSON",
      position: "LOGISTICS COORDINATOR",
      description: "Sarah manages the complex web of shipping routes and delivery schedules. Her analytical approach and attention to detail ensure that every package reaches its destination on time and in perfect condition.",
      image: "/api/placeholder/200/200"
    }
  ];

  return (
    <SectionPadding className="bg-white py-30">
      <div className="">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 tracking-wide">
            OUR STAFF
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Meet the Dedicated Team Behind Your Seamless Shipping Experience.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="bg-white rounded-lg border border-gray-100 p-8 text-center hover:shadow-lg transition-shadow duration-300"
            >
              {/* Profile Image */}
              <div className="mb-6">
                <div className="w-24 h-24 text-[30px] flex justify-center items-center mx-auto rounded-full overflow-hidden bg-gray-200">
                  {member.name[0]}
                </div>
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>

              {/* Position */}
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                {member.position}
              </p>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-sm">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionPadding>
  );
}