import {
  DocumentTextIcon,
  GlobeAltIcon,
  GlobeAsiaAustraliaIcon,
  MegaphoneIcon,
  ChatBubbleLeftRightIcon,
  IdentificationIcon,
  ScaleIcon,
  MagnifyingGlassCircleIcon,
  LinkIcon,
  LockClosedIcon,
  ShieldCheckIcon,
  TicketIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
  document: DocumentTextIcon,
  'globe-alt': GlobeAltIcon,
  globe: GlobeAsiaAustraliaIcon,
  megaphone: MegaphoneIcon,
  'chat-bubble-left-right': ChatBubbleLeftRightIcon,
  identification: IdentificationIcon,
  scale: ScaleIcon,
  'magnifying-glass-circle': MagnifyingGlassCircleIcon,
  link: LinkIcon,
  'lock-closed': LockClosedIcon,
  'shield-check': ShieldCheckIcon,
  ticket: TicketIcon,
  banknotes: BanknotesIcon,
};

function ServiceList({ services, onServiceSelect, states, selectedState, onStateChange }) {
  return (
    <div className="space-y-3">
      {services.map((service) => {
        const Icon = iconMap[service.icon] || DocumentTextIcon;
        return (
          <button
            key={service.name}
            className="w-full text-left bg-white rounded-2xl border border-slate-100 shadow-sm px-4 py-4 flex items-center justify-between hover:-translate-y-0.5 transition transform"
            onClick={() => onServiceSelect(service)}
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Icon className="w-5 h-5" />
              </span>
              <div>
                <p className="font-semibold text-sm text-slate-900">{service.name}</p>
                <p className="text-primary font-bold">{service.price}</p>
              </div>
            </div>
            {service.hasState && (
              <select
                value={selectedState}
                onChange={(e) => {
                  e.stopPropagation();
                  onStateChange(e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
                className="border border-slate-200 rounded-lg px-3 py-2 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ServiceList;
