import { XMarkIcon, ExclamationTriangleIcon, FireIcon } from '@heroicons/react/24/outline';

const plans = [
  { name: 'Mensal', price: 'R$ 70/mês', value: 70 },
  {
    name: 'Semestral',
    price: 'R$ 150/6 meses',
    value: 150,
    highlight: true,
    badge: '🔥 MAIS VENDIDO',
    economy: 'Economize R$ 270 vs. mensal',
  },
  { name: 'Anual', price: 'R$ 250/ano', value: 250, economy: 'Economize R$ 590 vs. mensal' },
];

function LicenseModal({ isOpen, onClose, service, selectedState, onPlanSelect }) {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-xl p-5 space-y-4 animate-[slideUp_0.25s_ease]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-500 font-semibold">
            <ExclamationTriangleIcon className="w-5 h-5" />
            Acesso Restrito ⚠️
          </div>
          <button aria-label="Fechar" onClick={onClose} className="p-2 rounded-full bg-slate-100">
            <XMarkIcon className="w-5 h-5 text-slate-700" />
          </button>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          Para usar nossos serviços, você precisa de uma licença de acesso. Escolha seu plano:
        </p>

        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm text-slate-800">
          <p className="font-semibold">Serviço selecionado</p>
          <p>{service.name}</p>
          {service.hasState && <p className="text-slate-600">Estado: {selectedState}</p>}
        </div>

        <div className="space-y-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-4 shadow-sm bg-white transition hover:-translate-y-0.5 ${
                plan.highlight ? 'border-highlight/80 bg-highlight/5' : 'border-slate-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-slate-900">{plan.name}</h3>
                    {plan.highlight && (
                      <span className="inline-flex items-center gap-1 bg-highlight text-white text-[11px] font-semibold px-2 py-1 rounded-full">
                        <FireIcon className="w-4 h-4" />
                        {plan.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-primary font-semibold">{plan.price}</p>
                  {plan.economy && <p className="text-xs text-slate-600 mt-1">{plan.economy}</p>}
                </div>
                <button
                  onClick={() => onPlanSelect(plan.name, plan.value)}
                  className={`px-4 py-2 rounded-xl font-semibold shadow transition hover:opacity-90 ${
                    plan.highlight ? 'bg-highlight text-white' : 'bg-primary text-white'
                  }`}
                >
                  {plan.name === 'Mensal' && 'ESCOLHER MENSAL'}
                  {plan.name === 'Semestral' && 'ESCOLHER SEMESTRAL'}
                  {plan.name === 'Anual' && 'ESCOLHER ANUAL'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes slideUp {
            from { transform: translateY(16px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}

export default LicenseModal;
