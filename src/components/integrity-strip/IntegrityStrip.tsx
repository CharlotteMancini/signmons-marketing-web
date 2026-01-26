import Typography from '@mui/material/Typography';

const integrityCards = [
  {
    title: 'SMS-Only Canonical Confirmation',
    description: 'Bookings are confirmed only via SMS. Voice never commits jobs—messages do.',
    tone: 'sms',
  },
  {
    title: 'Payment-First Booking Gate',
    description: 'Jobs are accepted only after payment authorization. No unpaid dispatches.',
    tone: 'payment',
  },
  {
    title: 'Fail-Closed Data Rules',
    description: 'If data is missing or ambiguous, the system stops—no guessing, no silent failures.',
    tone: 'failclosed',
  },
  {
    title: 'Tenant Isolation by Design',
    description: 'Every customer runs in a sealed tenant. No shared state, no cross-data access.',
    tone: 'tenant',
  },
];

const IntegrityStrip = () => {
  return (
    <section className="integrity-strip">
      <div className="integrity-grid">
        {integrityCards.map((card) => (
          <div key={card.title} className="integrity-card">
            <div
              className={`integrity-card__icon integrity-card__icon--${card.tone}`}
              aria-hidden="true"
            />
            <Typography variant="subtitle1" className="integrity-card__title">
              {card.title}
            </Typography>
            <Typography variant="body1" className="integrity-card__description">
              {card.description}
            </Typography>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntegrityStrip;
