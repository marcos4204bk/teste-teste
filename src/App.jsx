import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import ServiceList from './components/ServiceList';
import LicenseModal from './components/LicenseModal';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const PIXEL_ID = '1444712979358187';

const services = [
  { name: 'Consulta RENAVAM', price: 'R$ 1,10', icon: 'document' },
  { name: 'Base Estadual Online', price: 'R$ 1,70', icon: 'globe-alt' },
  { name: 'Base Nacional Online', price: 'R$ 1,80', icon: 'globe' },
  { name: 'Comunicado de Venda', price: 'R$ 15,00', icon: 'megaphone' },
  { name: 'APTV-e (Intenção de Venda)', price: 'R$ 10,00', icon: 'chat-bubble-left-right' },
  { name: 'Emitir CRLV-e', price: 'R$ 9,50', icon: 'identification', hasState: true },
  { name: 'Leilão', price: 'R$ 7,00', icon: 'scale' },
  { name: 'Consulta Completa', price: 'R$ 18,00', icon: 'magnifying-glass-circle' },
  { name: 'Agregados', price: 'R$ 2,10', icon: 'link' },
  { name: 'Gravame', price: 'R$ 1,80', icon: 'lock-closed' },
  { name: 'Sinistro', price: 'R$ 3,20', icon: 'shield-check' },
  { name: 'Multas', price: 'R$ 1,30', icon: 'ticket' },
  { name: 'IPVA', price: 'R$ 1,10', icon: 'banknotes' },
];

const states = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

const planRedirects = {
  Mensal: 'https://chk.eduzz.com/39VEQZY5WR',
  Semestral: 'https://chk.eduzz.com/Z0B5ANQ3WA',
  Anual: 'https://chk.eduzz.com/39ZQDOYE9E',
};

const initialErrors = { name: '', email: '', password: '' };

function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(initialErrors);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedState, setSelectedState] = useState('SP');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const formValid = useMemo(
    () =>
      name.trim().length >= 2 &&
      /\S+@\S+\.\S+/.test(email) &&
      password.length >= 6,
    [name, email, password]
  );

  // Facebook Pixel tracking
  const loadPixel = () => {
    if (window.fbq) return;

    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */

    window.fbq('init', PIXEL_ID);
  };

  const trackEvent = (name, params = {}) => {
    if (window.fbq) {
      window.fbq('track', name, params);
    }
  };

  useEffect(() => {
    loadPixel();
    trackEvent('PageView');
  }, []);

  useEffect(() => {
    // Fire PageView on each screen render
    trackEvent('PageView');
  }, [isSignedUp]);

  const validateForm = () => {
    const newErrors = { ...initialErrors };
    if (name.trim().length < 2) newErrors.name = 'Nome deve ter ao menos 2 caracteres.';
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Informe um email válido.';
    if (password.length < 6) newErrors.password = 'Senha deve ter ao menos 6 caracteres.';
    setErrors(newErrors);
    return Object.values(newErrors).every((msg) => msg === '');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    trackEvent('CompleteRegistration');
    setIsSignedUp(true);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    trackEvent('ViewContent', { content_name: service.name });
    setIsModalOpen(true);
    trackEvent('InitiateCheckout', { content_name: service.name });
  };

  const handlePlanClick = (plan, value) => {
    trackEvent('AddPaymentInfo', { content_name: plan, value });
    setToastMessage('Redirecionando para pagamento…');
    setTimeout(() => {
      window.location.href = planRedirects[plan];
    }, 600);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const trustBullets = [
    'Rápido',
    'Mobile',
    'Acesso por licença',
  ];

  return (
    <div className="max-w-screen-sm mx-auto min-h-screen bg-slate-50 text-slate-900">
      {!isSignedUp ? (
        <main className="px-5 py-10 flex flex-col items-center text-center space-y-8">
          <div className="space-y-2">
            <div className="text-primary text-2xl font-bold">Power Buscas</div>
            <p className="text-slate-600 text-sm">Crie sua conta e visualize os serviços disponíveis</p>
          </div>

          <form
            className="w-full bg-white rounded-2xl shadow-sm p-5 space-y-4 border border-slate-100"
            onSubmit={handleSignup}
          >
            <div className="text-left space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="name">
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Seu nome"
                minLength={2}
                required
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div className="text-left space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="voce@email.com"
                required
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            <div className="text-left space-y-2">
              <label className="text-sm font-semibold text-slate-700" htmlFor="password">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Mínimo 6 caracteres"
                minLength={6}
                required
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={!formValid}
              className="w-full bg-primary text-white rounded-xl py-3 font-semibold shadow hover:opacity-90 transition disabled:opacity-60"
            >
              Criar Conta Gratuita
            </button>

            <p className="text-xs text-slate-500">Sem cartão. Acesso imediato aos serviços.</p>
          </form>

          <div className="grid grid-cols-3 gap-3 w-full">
            {trustBullets.map((item) => (
              <div
                key={item}
                className="flex items-center justify-center gap-1 bg-white border border-slate-100 rounded-xl py-3 text-sm text-slate-700 shadow-sm"
              >
                <CheckCircleIcon className="w-5 h-5 text-success" />
                {item}
              </div>
            ))}
          </div>
        </main>
      ) : (
        <div className="pb-20">
          <Header />
          <main className="px-5 pt-6 space-y-3">
            <div>
              <h1 className="text-lg font-semibold text-slate-900">Serviços disponíveis</h1>
              <p className="text-sm text-slate-600">Toque em um serviço para liberar acesso</p>
            </div>

            <ServiceList
              services={services}
              states={states}
              selectedState={selectedState}
              onStateChange={setSelectedState}
              onServiceSelect={handleServiceClick}
            />
          </main>

          <LicenseModal
            isOpen={isModalOpen}
            onClose={closeModal}
            service={selectedService}
            selectedState={selectedState}
            onPlanSelect={handlePlanClick}
          />
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-4 py-3 rounded-full shadow-lg text-sm fade-in">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
